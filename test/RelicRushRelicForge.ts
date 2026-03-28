import { expect } from "chai";
import { network } from "hardhat";

describe("RelicRushRelicForge", function () {
  it("forges a relic when the correct fee is paid", async function () {
    const { ethers } = await network.connect();
    const [deployer, player] = await ethers.getSigners();
    const forgeFee = ethers.parseEther("0.001");

    const forge = await ethers.deployContract("RelicRushRelicForge", [
      deployer.address,
    ]);
    await forge.waitForDeployment();

    await expect(
      forge
        .connect(player)
        .forgeRandomRelic("forge-artifact-1", "ipfs://forge-1", {
          value: forgeFee,
        }),
    )
      .to.emit(forge, "RelicForged")
      .withArgs(player.address, 1n, "forge-artifact-1", "ipfs://forge-1");

    expect(await forge.ownerOf(1n)).to.equal(player.address);
    expect(await forge.artifactIdByTokenId(1n)).to.equal("forge-artifact-1");
  });

  it("reverts when fee is insufficient", async function () {
    const { ethers } = await network.connect();
    const [deployer, player] = await ethers.getSigners();

    const forge = await ethers.deployContract("RelicRushRelicForge", [
      deployer.address,
    ]);
    await forge.waitForDeployment();

    await expect(
      forge
        .connect(player)
        .forgeRandomRelic("forge-artifact-2", "ipfs://forge-2", {
          value: ethers.parseEther("0.0001"),
        }),
    ).to.be.revertedWithCustomError(forge, "InsufficientForgeFee");
  });

  it("allows owner to update forge fee", async function () {
    const { ethers } = await network.connect();
    const [deployer] = await ethers.getSigners();
    const newFee = ethers.parseEther("0.005");

    const forge = await ethers.deployContract("RelicRushRelicForge", [
      deployer.address,
    ]);
    await forge.waitForDeployment();

    await expect(forge.connect(deployer).setForgeFee(newFee))
      .to.emit(forge, "ForgeFeeUpdated")
      .withArgs(ethers.parseEther("0.001"), newFee);

    expect(await forge.forgeFee()).to.equal(newFee);
  });

  it("refunds excess payment", async function () {
    const { ethers } = await network.connect();
    const [deployer, player] = await ethers.getSigners();
    const forgeFee = ethers.parseEther("0.001");
    const overpay = ethers.parseEther("0.01");

    const forge = await ethers.deployContract("RelicRushRelicForge", [
      deployer.address,
    ]);
    await forge.waitForDeployment();

    const balanceBefore = await ethers.provider.getBalance(player.address);

    const tx = await forge
      .connect(player)
      .forgeRandomRelic("forge-artifact-3", "ipfs://forge-3", {
        value: overpay,
      });
    const receipt = await tx.wait();
    const gasUsed = receipt!.gasUsed * receipt!.gasPrice;

    const balanceAfter = await ethers.provider.getBalance(player.address);
    // balance should decrease by forgeFee + gas, NOT the full overpay
    const spent = balanceBefore - balanceAfter;
    expect(spent).to.be.lessThan(overpay + gasUsed);
  });
});

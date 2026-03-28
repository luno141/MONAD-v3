import { expect } from "chai";
import { network } from "hardhat";

describe("RelicRushRunLedger", function () {
  it("records a run and updates bestScore", async function () {
    const { ethers } = await network.connect();
    const [player] = await ethers.getSigners();

    const ledger = await ethers.deployContract("RelicRushRunLedger");
    await ledger.waitForDeployment();

    await expect(ledger.connect(player).recordRun(1, 150))
      .to.emit(ledger, "RunRecorded")
      .withArgs(player.address, 1, 150);

    expect(await ledger.bestScore(player.address)).to.equal(150);
    expect(await ledger.runCount(player.address)).to.equal(1);

    const run = await ledger.getRun(player.address, 0);
    expect(run.floorReached).to.equal(1);
    expect(run.score).to.equal(150);
  });

  it("updates bestScore only when a higher score is recorded", async function () {
    const { ethers } = await network.connect();
    const [player] = await ethers.getSigners();

    const ledger = await ethers.deployContract("RelicRushRunLedger");
    await ledger.waitForDeployment();

    await ledger.connect(player).recordRun(1, 200);
    await ledger.connect(player).recordRun(2, 100);
    await ledger.connect(player).recordRun(3, 350);

    expect(await ledger.bestScore(player.address)).to.equal(350);
    expect(await ledger.runCount(player.address)).to.equal(3);
  });

  it("reverts when score is zero", async function () {
    const { ethers } = await network.connect();
    const [player] = await ethers.getSigners();

    const ledger = await ethers.deployContract("RelicRushRunLedger");
    await ledger.waitForDeployment();

    await expect(
      ledger.connect(player).recordRun(1, 0),
    ).to.be.revertedWith("Score must be positive");
  });
});

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title RelicRushRelicForge
/// @notice On-chain relic forge where players pay a fee to mint a random premium artifact.
/// @dev    Randomness is demo-grade only (block-based). NOT suitable for production
///         value-bearing randomness — acceptable for hackathon / MVP demo.
contract RelicRushRelicForge is ERC721URIStorage, Ownable, ReentrancyGuard {
    error InsufficientForgeFee();
    error RefundFailed();

    uint256 public forgeFee = 0.001 ether;
    uint256 public nextTokenId = 1;

    mapping(uint256 => string) public artifactIdByTokenId;
    mapping(string => uint256) public tokenIdByArtifactId;

    event RelicForged(
        address indexed owner,
        uint256 indexed tokenId,
        string indexed artifactId,
        string tokenURI
    );

    event ForgeFeeUpdated(uint256 oldFee, uint256 newFee);

    constructor(address initialOwner)
    ERC721("KHANFLICT Forged Relics", "KFR")
        Ownable(initialOwner)
    {}

    /// @notice Forge a new random relic by paying the forge fee.
    /// @param artifactId  Unique identifier for this artifact instance.
    /// @param tokenURI    Metadata URI for the forged relic.
    /// @return tokenId    The minted token ID.
    function forgeRandomRelic(
        string calldata artifactId,
        string calldata tokenURI
    ) external payable nonReentrant returns (uint256 tokenId) {
        if (msg.value < forgeFee) revert InsufficientForgeFee();

        tokenId = nextTokenId;
        nextTokenId += 1;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        artifactIdByTokenId[tokenId] = artifactId;
        tokenIdByArtifactId[artifactId] = tokenId;

        emit RelicForged(msg.sender, tokenId, artifactId, tokenURI);

        // Refund excess payment
        if (msg.value > forgeFee) {
            (bool refunded, ) = payable(msg.sender).call{
                value: msg.value - forgeFee
            }("");
            if (!refunded) revert RefundFailed();
        }
    }

    /// @notice Owner can update forge fee.
    function setForgeFee(uint256 newFee) external onlyOwner {
        uint256 oldFee = forgeFee;
        forgeFee = newFee;
        emit ForgeFeeUpdated(oldFee, newFee);
    }

    /// @notice Owner can withdraw accumulated forge fees.
    function withdraw() external onlyOwner {
        (bool success, ) = payable(owner()).call{value: address(this).balance}(
            ""
        );
        require(success, "Withdraw failed");
    }
}

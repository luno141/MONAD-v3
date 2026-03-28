// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/// @title RelicRushRunLedger
/// @notice Lightweight on-chain ledger for recording successful dungeon runs on Monad.
///         Designed for minimal gas so it can be called after every run.
contract RelicRushRunLedger {
    struct RunSummary {
        uint32 floorReached;
        uint32 score;
        uint32 timestamp;
    }

    mapping(address => RunSummary[]) public runs;
    mapping(address => uint32) public bestScore;

    event RunRecorded(
        address indexed player,
        uint32 floorReached,
        uint32 score
    );

    /// @notice Record a completed dungeon run for the caller.
    /// @param floorReached The dungeon floor (room) the player reached.
    /// @param score        The total score earned during the run.
    function recordRun(uint32 floorReached, uint32 score) external {
        require(score > 0, "Score must be positive");

        runs[msg.sender].push(
            RunSummary(floorReached, score, uint32(block.timestamp))
        );

        if (score > bestScore[msg.sender]) {
            bestScore[msg.sender] = score;
        }

        emit RunRecorded(msg.sender, floorReached, score);
    }

    /// @notice Return the number of runs recorded for a given player.
    function runCount(address player) external view returns (uint256) {
        return runs[player].length;
    }

    /// @notice Return a specific run by index for a given player.
    function getRun(
        address player,
        uint256 index
    ) external view returns (RunSummary memory) {
        require(index < runs[player].length, "Index out of bounds");
        return runs[player][index];
    }
}

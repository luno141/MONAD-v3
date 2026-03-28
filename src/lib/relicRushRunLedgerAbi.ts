export const RELIC_RUSH_RUN_LEDGER_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "player",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "floorReached",
        "type": "uint32"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "score",
        "type": "uint32"
      }
    ],
    "name": "RunRecorded",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "bestScore",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "player",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getRun",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint32",
            "name": "floorReached",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "score",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "timestamp",
            "type": "uint32"
          }
        ],
        "internalType": "struct RelicRushRunLedger.RunSummary",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "floorReached",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "score",
        "type": "uint32"
      }
    ],
    "name": "recordRun",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "player",
        "type": "address"
      }
    ],
    "name": "runCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "runs",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "floorReached",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "score",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "timestamp",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

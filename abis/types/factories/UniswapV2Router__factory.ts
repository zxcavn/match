/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  UniswapV2Router,
  UniswapV2RouterInterface,
} from "../UniswapV2Router";

const _abi = [
  {
    type: "constructor",
    stateMutability: "nonpayable",
    inputs: [
      {
        type: "address",
        name: "_factory",
        internalType: "address",
      },
      {
        type: "address",
        name: "_WETH",
        internalType: "address",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    name: "WETH",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      {
        type: "uint256",
        name: "amountA",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountB",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "liquidity",
        internalType: "uint256",
      },
    ],
    name: "addLiquidity",
    inputs: [
      {
        type: "address",
        name: "tokenA",
        internalType: "address",
      },
      {
        type: "address",
        name: "tokenB",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "amountADesired",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountBDesired",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountAMin",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountBMin",
        internalType: "uint256",
      },
      {
        type: "address",
        name: "to",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "deadline",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "payable",
    outputs: [
      {
        type: "uint256",
        name: "amountToken",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountETH",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "liquidity",
        internalType: "uint256",
      },
    ],
    name: "addLiquidityETH",
    inputs: [
      {
        type: "address",
        name: "token",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "amountTokenDesired",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountTokenMin",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountETHMin",
        internalType: "uint256",
      },
      {
        type: "address",
        name: "to",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "deadline",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    name: "factory",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "pure",
    outputs: [
      {
        type: "uint256",
        name: "amountIn",
        internalType: "uint256",
      },
    ],
    name: "getAmountIn",
    inputs: [
      {
        type: "uint256",
        name: "amountOut",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "reserveIn",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "reserveOut",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "pure",
    outputs: [
      {
        type: "uint256",
        name: "amountOut",
        internalType: "uint256",
      },
    ],
    name: "getAmountOut",
    inputs: [
      {
        type: "uint256",
        name: "amountIn",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "reserveIn",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "reserveOut",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256[]",
        name: "amounts",
        internalType: "uint256[]",
      },
    ],
    name: "getAmountsIn",
    inputs: [
      {
        type: "uint256",
        name: "amountOut",
        internalType: "uint256",
      },
      {
        type: "address[]",
        name: "path",
        internalType: "address[]",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256[]",
        name: "amounts",
        internalType: "uint256[]",
      },
    ],
    name: "getAmountsOut",
    inputs: [
      {
        type: "uint256",
        name: "amountIn",
        internalType: "uint256",
      },
      {
        type: "address[]",
        name: "path",
        internalType: "address[]",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "pure",
    outputs: [
      {
        type: "uint256",
        name: "amountB",
        internalType: "uint256",
      },
    ],
    name: "quote",
    inputs: [
      {
        type: "uint256",
        name: "amountA",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "reserveA",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "reserveB",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      {
        type: "uint256",
        name: "amountA",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountB",
        internalType: "uint256",
      },
    ],
    name: "removeLiquidity",
    inputs: [
      {
        type: "address",
        name: "tokenA",
        internalType: "address",
      },
      {
        type: "address",
        name: "tokenB",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "liquidity",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountAMin",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountBMin",
        internalType: "uint256",
      },
      {
        type: "address",
        name: "to",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "deadline",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      {
        type: "uint256",
        name: "amountToken",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountETH",
        internalType: "uint256",
      },
    ],
    name: "removeLiquidityETH",
    inputs: [
      {
        type: "address",
        name: "token",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "liquidity",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountTokenMin",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountETHMin",
        internalType: "uint256",
      },
      {
        type: "address",
        name: "to",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "deadline",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      {
        type: "uint256",
        name: "amountETH",
        internalType: "uint256",
      },
    ],
    name: "removeLiquidityETHSupportingFeeOnTransferTokens",
    inputs: [
      {
        type: "address",
        name: "token",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "liquidity",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountTokenMin",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountETHMin",
        internalType: "uint256",
      },
      {
        type: "address",
        name: "to",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "deadline",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      {
        type: "uint256",
        name: "amountToken",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountETH",
        internalType: "uint256",
      },
    ],
    name: "removeLiquidityETHWithPermit",
    inputs: [
      {
        type: "address",
        name: "token",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "liquidity",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountTokenMin",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountETHMin",
        internalType: "uint256",
      },
      {
        type: "address",
        name: "to",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "deadline",
        internalType: "uint256",
      },
      {
        type: "bool",
        name: "approveMax",
        internalType: "bool",
      },
      {
        type: "uint8",
        name: "v",
        internalType: "uint8",
      },
      {
        type: "bytes32",
        name: "r",
        internalType: "bytes32",
      },
      {
        type: "bytes32",
        name: "s",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      {
        type: "uint256",
        name: "amountETH",
        internalType: "uint256",
      },
    ],
    name: "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
    inputs: [
      {
        type: "address",
        name: "token",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "liquidity",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountTokenMin",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountETHMin",
        internalType: "uint256",
      },
      {
        type: "address",
        name: "to",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "deadline",
        internalType: "uint256",
      },
      {
        type: "bool",
        name: "approveMax",
        internalType: "bool",
      },
      {
        type: "uint8",
        name: "v",
        internalType: "uint8",
      },
      {
        type: "bytes32",
        name: "r",
        internalType: "bytes32",
      },
      {
        type: "bytes32",
        name: "s",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      {
        type: "uint256",
        name: "amountA",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountB",
        internalType: "uint256",
      },
    ],
    name: "removeLiquidityWithPermit",
    inputs: [
      {
        type: "address",
        name: "tokenA",
        internalType: "address",
      },
      {
        type: "address",
        name: "tokenB",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "liquidity",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountAMin",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountBMin",
        internalType: "uint256",
      },
      {
        type: "address",
        name: "to",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "deadline",
        internalType: "uint256",
      },
      {
        type: "bool",
        name: "approveMax",
        internalType: "bool",
      },
      {
        type: "uint8",
        name: "v",
        internalType: "uint8",
      },
      {
        type: "bytes32",
        name: "r",
        internalType: "bytes32",
      },
      {
        type: "bytes32",
        name: "s",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "payable",
    outputs: [
      {
        type: "uint256[]",
        name: "amounts",
        internalType: "uint256[]",
      },
    ],
    name: "swapETHForExactTokens",
    inputs: [
      {
        type: "uint256",
        name: "amountOut",
        internalType: "uint256",
      },
      {
        type: "address[]",
        name: "path",
        internalType: "address[]",
      },
      {
        type: "address",
        name: "to",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "deadline",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "payable",
    outputs: [
      {
        type: "uint256[]",
        name: "amounts",
        internalType: "uint256[]",
      },
    ],
    name: "swapExactETHForTokens",
    inputs: [
      {
        type: "uint256",
        name: "amountOutMin",
        internalType: "uint256",
      },
      {
        type: "address[]",
        name: "path",
        internalType: "address[]",
      },
      {
        type: "address",
        name: "to",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "deadline",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "payable",
    outputs: [],
    name: "swapExactETHForTokensSupportingFeeOnTransferTokens",
    inputs: [
      {
        type: "uint256",
        name: "amountOutMin",
        internalType: "uint256",
      },
      {
        type: "address[]",
        name: "path",
        internalType: "address[]",
      },
      {
        type: "address",
        name: "to",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "deadline",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      {
        type: "uint256[]",
        name: "amounts",
        internalType: "uint256[]",
      },
    ],
    name: "swapExactTokensForETH",
    inputs: [
      {
        type: "uint256",
        name: "amountIn",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountOutMin",
        internalType: "uint256",
      },
      {
        type: "address[]",
        name: "path",
        internalType: "address[]",
      },
      {
        type: "address",
        name: "to",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "deadline",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "swapExactTokensForETHSupportingFeeOnTransferTokens",
    inputs: [
      {
        type: "uint256",
        name: "amountIn",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountOutMin",
        internalType: "uint256",
      },
      {
        type: "address[]",
        name: "path",
        internalType: "address[]",
      },
      {
        type: "address",
        name: "to",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "deadline",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      {
        type: "uint256[]",
        name: "amounts",
        internalType: "uint256[]",
      },
    ],
    name: "swapExactTokensForTokens",
    inputs: [
      {
        type: "uint256",
        name: "amountIn",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountOutMin",
        internalType: "uint256",
      },
      {
        type: "address[]",
        name: "path",
        internalType: "address[]",
      },
      {
        type: "address",
        name: "to",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "deadline",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
    inputs: [
      {
        type: "uint256",
        name: "amountIn",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountOutMin",
        internalType: "uint256",
      },
      {
        type: "address[]",
        name: "path",
        internalType: "address[]",
      },
      {
        type: "address",
        name: "to",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "deadline",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      {
        type: "uint256[]",
        name: "amounts",
        internalType: "uint256[]",
      },
    ],
    name: "swapTokensForExactETH",
    inputs: [
      {
        type: "uint256",
        name: "amountOut",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountInMax",
        internalType: "uint256",
      },
      {
        type: "address[]",
        name: "path",
        internalType: "address[]",
      },
      {
        type: "address",
        name: "to",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "deadline",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [
      {
        type: "uint256[]",
        name: "amounts",
        internalType: "uint256[]",
      },
    ],
    name: "swapTokensForExactTokens",
    inputs: [
      {
        type: "uint256",
        name: "amountOut",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "amountInMax",
        internalType: "uint256",
      },
      {
        type: "address[]",
        name: "path",
        internalType: "address[]",
      },
      {
        type: "address",
        name: "to",
        internalType: "address",
      },
      {
        type: "uint256",
        name: "deadline",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "receive",
    stateMutability: "payable",
  },
];

export class UniswapV2Router__factory {
  static readonly abi = _abi;
  static createInterface(): UniswapV2RouterInterface {
    return new utils.Interface(_abi) as UniswapV2RouterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UniswapV2Router {
    return new Contract(address, _abi, signerOrProvider) as UniswapV2Router;
  }
}

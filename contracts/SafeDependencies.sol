pragma solidity ^0.5.0;

// NOTE:
//  This file's purpose is just to make sure truffle compiles all of depending
//  contracts during development.
//
//  For other environments, only use compiled contracts from the NPM package.
import "@gnosis.pm/safe-contracts/contracts/libraries/MultiSend.sol";
import "@gnosis.pm/safe-contracts/contracts/proxies/ProxyFactory.sol";

contract DevDependencies {}

pragma solidity >=0.5.0;

contract ContractExample {
    address public batchExchange;
    constructor(address _batchExchange) public {
        batchExchange = _batchExchange;
    }
}

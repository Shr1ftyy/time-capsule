// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.8.3;

contract Capsule {

    string message;
    address payable owner;

    constructor() {
        message = "lol";
        owner = payable(msg.sender);
    }

    receive() external payable{
    }
    
    function getMessage() public view returns (string memory){
        require(msg.sender == owner);
        return message;
    }
}

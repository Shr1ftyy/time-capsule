// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.8.4;

contract EthCapsule {

    address owner;
    uint maxLength;
    
    struct Capsule {
        string message;
        uint256 release_timestamp;
        address creator;
    }

    uint256 INDEX;
    mapping(uint256 => Capsule) private capsules;

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }

    event capsuleSubmitted(uint256 id, uint256 release_timestamp, uint256 blockTimestamp);

    constructor() {
        owner = msg.sender;
        INDEX = 0;
        maxLength = 5000;
    }

    function submitCapsule(string memory message, uint256 release_timestamp) external {
        require(msg.sender != address(0), "Cannot use this contract with a black hole address");
        require(bytes(message).length <= maxLength);
        capsules[INDEX] = Capsule({
            message: message,
            release_timestamp: release_timestamp,
            creator: msg.sender
        });
        
        emit capsuleSubmitted(INDEX, release_timestamp, block.timestamp);
        INDEX += 1;
    }

    function getTimeCapsule(uint256 id) external view returns(string memory) {
        require(block.timestamp >= capsules[id].release_timestamp, "This message cannot be revealed yet");
        return capsules[id].message;
    }
    
    function getTimestamp() external view returns(uint256){
        return block.timestamp;
    }
    
    function setMax(uint max) onlyOwner external {
        maxLength = max;
    }



}

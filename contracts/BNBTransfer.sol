//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Exploit {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    fallback() external payable {
        owner.transfer(address(this).balance);
    }
}

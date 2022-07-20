// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/draft-ERC20PermitUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Reputation is Initializable, ERC20Upgradeable, OwnableUpgradeable, ERC20PermitUpgradeable, ERC20VotesUpgradeable {
     /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}


     function initialize(string memory _name, string memory _symbol) initializer public {
        __ERC20_init_unchained(_name, _symbol);
        __Ownable_init_unchained();
        __ERC20Permit_init_unchained(_name);
        __ERC20Votes_init_unchained();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
     

    function transfer(address to, uint256 amount)
        public
        virtual
        override
        onlyOwner
        returns (bool)
    {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public virtual override onlyOwner returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }

    function _mint(address to, uint256 amount)
        internal
        override(ERC20Upgradeable, ERC20VotesUpgradeable)
    {
        super._mint(to, amount);
    }

    function _afterTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20Upgradeable, ERC20VotesUpgradeable)
    {
        super._afterTokenTransfer(from, to, amount);
    }

     function _burn(address account, uint256 amount)
        internal
        override(ERC20Upgradeable, ERC20VotesUpgradeable)
    {
        super._burn(account, amount);
    }
}
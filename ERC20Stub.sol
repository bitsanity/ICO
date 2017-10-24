pragma solidity ^0.4.15;

contract ERC20Stub
{
  event Transfer(address indexed _from, address indexed _to, uint _value);
  event Approval(address indexed _owner, address indexed _spender, uint _value);

  function ERC20Stub() {}

  function balanceOf(address _owner) constant returns (uint balance)
  {
    if (_owner != address(0))
      return 1000000;
  }

  function transfer(address _to, uint _value) returns (bool success)
  {
    return _to != address(0) && _value > 0;
  }
}


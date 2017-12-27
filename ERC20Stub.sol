pragma solidity ^0.4.15;

contract ERC20Stub
{
  event Transfer(address indexed _from, address indexed _to, uint _value);

  function ERC20Stub() public {}

  function balanceOf(address _owner) public pure returns (uint balance)
  {
    if (_owner != address(0))
      return 1000000;
  }

  function transfer(address _to, uint _value) public returns (bool success)
  {
    Transfer( msg.sender, _to, _value );
    return _to != address(0) && _value > 0;
  }
}


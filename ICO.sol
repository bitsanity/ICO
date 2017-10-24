//
// compiler: solcjs -o ./build/contracts --optimize --abi --bin <this file>
//  version: 0.4.15+commit.bbb8e64f.Emscripten.clang
//
pragma solidity ^0.4.15;

contract owned {
  address public owner;

  function owned() { owner = msg.sender; }

  modifier onlyOwner {
    if (msg.sender != owner) { revert(); }
    _;
  }

  function changeOwner( address newowner ) onlyOwner {
    owner = newowner;
  }

  function closedown() onlyOwner {
    selfdestruct( owner );
  }
}

// token sold by this contract must be ERC20-compliant
interface ERC20 {
  function transfer(address to, uint256 value);
  function balanceOf( address owner ) constant returns (uint);
}

contract ICO is owned {

  uint public constant TOKPERETH = 1500; // price: approx $0.20 ea

  uint public start;    // seconds since Jan 1 1970 GMT
  uint public duration; // seconds

  ERC20 public tokenSC;
  address treasury;

  // If treasury has a value then all payments will automatically be sent there
  function ICO( address _erc20,
                address _treasury,
                uint _startSec,
                uint _durationSec ) {

    require( isContract(_erc20) );

    if (_treasury != address(0))
      require( isContract(_treasury) );

    tokenSC = ERC20( _erc20 );
    treasury = _treasury;
    start = _startSec;
    duration = _durationSec;
  }

  function() payable {
    if (now < start || now > (start + duration))
      revert();

    // quantity =
    //   amountinwei * tokpereth/weipereth * (bonus+100)/100
    // = amountinwei * tokpereth/1e18 * (bonus+100)/100
    // = msg.value * tokpereth/1e20 * (bonus+100)
    uint qty =
      multiply( divide( multiply( msg.value,
                                 TOKPERETH ),
                       100000000000000000000),
               (bonus()+100) );

    if (qty > tokenSC.balanceOf(address(this)) || qty < 1)
      revert();

    tokenSC.transfer( msg.sender, qty );

    if (treasury != address(0)) treasury.transfer( msg.value );
  }

  // unsold tokens can be claimed by owner after sale ends
  function claimUnsold() onlyOwner {
    if ( now < (start + duration) )
      revert();

    tokenSC.transfer( owner, tokenSC.balanceOf(address(this)) );
  }

  function withdraw( uint amount ) onlyOwner returns (bool) {
    require (amount <= this.balance);
    return owner.send( amount );
  }

  function bonus() constant returns(uint) {
    uint elapsed = now - start;

    if (elapsed < 48 hours) return 50;
    if (elapsed < 2 weeks) return 20;
    if (elapsed < 3 weeks) return 10;
    if (elapsed < 4 weeks) return 5;
    return 0;
  }

  function isContract( address _a ) constant private returns (bool) {
    uint ecs;
    assembly { ecs := extcodesize(_a) }
    return ecs > 0;
  }

  // ref: github.com/OpenZeppelin/zeppelin-solidity/
  //      blob/master/contracts/math/SafeMath.sol
  function multiply(uint256 a, uint256 b) constant private returns (uint256) {
    uint256 c = a * b;
    assert(a == 0 || c / a == b);
    return c;
  }

  function divide(uint256 a, uint256 b) constant private returns (uint256) {
    return a / b;
  }
}

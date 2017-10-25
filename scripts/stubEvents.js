//
// print out ERC20Stub Transfer events
//
// $ node <this.js> <TOK SCA>
//
const Mod = require('./ICOLIB');
const web3 = Mod.getWeb3();

function shorten(addr) {
  var saddr = "" + addr;
  return "0x" + saddr.substring(26);
}

const tokcon = Mod.tokenContract( process.argv[2] );

tokcon.getPastEvents('allEvents', {fromBlock: 0, toBlock: 'latest'})
.then( (events) =>
{
  for (var ii = 0; ii < events.length; ii++) {

    var decoded = web3.eth.abi.decodeParameters(
        ["uint256"],
        events[ii].raw.data );

    if (events[ii].event == 'Transfer' )
    {
      console.log( 'Transfered ' + decoded['0'] + ' tokens from: 0x' +
                   events[ii].raw.topics[1].substring(26) + ' to: 0x'
                   events[ii].raw.topics[2].substring(26) );
    }
  }
});


// ===========================================================================
// $ node <this.js> <ICO SCA> <amt wei>
// ===========================================================================

var Mod = require('./ICOLIB');
const web3 = Mod.getWeb3();
var icocon = Mod.getContract( process.argv[2] );

var cb;
web3.eth.getAccounts().then( (res) => {

  cb = res[0];

  // gas: 56280
  icocon.methods.claimUnsold().send( {from: cb, gas: 56800} );

} );

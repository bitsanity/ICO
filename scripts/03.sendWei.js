// ===========================================================================
// $ node icobuy.js <ICO SCA> <amt wei>
// ===========================================================================

var Mod = require('./ICOLIB');
const web3 = Mod.getWeb3();

var icoSCA = process.argv[2];

var cb;
web3.eth.getAccounts().then( (res) => {

  cb = res[0];

  console.log( "cb: ", cb, " spending ", process.argv[3], " wei" );

  // gas: 56280
  web3.eth.sendTransaction( {from: cb,
                             to: process.argv[2],
                             value: process.argv[3],
                             gas: 56800} );
} );


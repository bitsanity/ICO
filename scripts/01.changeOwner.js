//
// $ node <this>.js <ICO SCA>
//
// assumes ICO contract was created from accounts[0]
//

const Mod = require('./ICOLIB');
const web3 = Mod.getWeb3();

const icocon = Mod.getContract( process.argv[2] );

var cb = "";

web3.eth.getAccounts().then( (res) => {

  cb = "" + res[0];
  console.log('using cb: ', cb);

  // gas: 28668
  icocon.methods.changeOwner( res[1] )
                .send( {from: cb, gas: 50000} );

} );


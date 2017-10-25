//
// $ node <this>.js <ICO SCA>
//
// assumes ICO contract was created from accounts[0]
//

const Mod = require('./ICOLIB');
const web3 = Mod.getWeb3();
const icocon = Mod.getContract( process.argv[2] );

var cb = "";

icocon.methods.TOKPERETH().then( (res) => {
  console.log('TOKPERETH: ' + res);
} );

icocon.methods.start().then( (res) => {
  console.log('start: ' + res);
} );

icocon.methods.duration().then( (res) => {
  console.log('duration: ' + res);
} );

icocon.methods.tokenSC().then( (res) => {
  console.log('token SCA: ' + res);
} );

web3.eth.getBalance( process.argv[2] ).then( (res) => {
  console.log( 'balance: ' + res );
} );

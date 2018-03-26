//
// $ node getbalance.js <TOK SCA> <address>
//

const Mod = require('./ICOLIB');
const web3 = Mod.getWeb3();
const con = Mod.tokcon( process.argv[2] );

con.methods.balanceOf( process.argv[3] ).call().then( (res) => {
  console.log( process.argv[3] + ':' + res);
} );


// ===========================================================================
// $ node
//     <this.js>
//     <TOK SCA>
//     <Treasury SCA>
//     <start unix time>
//     <duration>
// ===========================================================================

var Mod = require('./ICOLIB');
const web3 = Mod.getWeb3();
const abi = Mod.getABI();
const binary = Mod.getBinary();
const contract = new web3.eth.Contract(abi);

var cb;
web3.eth.getAccounts().then( (res) => {
  cb = res[0];

  contract.deploy( {data: binary,
                    arguments: [process.argv[2],
                                process.argv[3],
                                process.argv[4],
                                process.argv[5]
                               ]} )
          .send( {from: cb, gas: 2000000}, (err,res) =>
          {
            if (err) console.log(err);
            if (res) console.log(res);
          } )
          .then( (receipt) => {
            console.log( 'SCA: ', receipt.options.address );
          } );
} );

# ICO (Initial Coin Offering)

Smart contract implementing an ICO

* smart contract owner has superuser privs
* Can be set up to sell any ERC20-compliant coin.
* enforces sale start and duration parameters
* implements a bonus scheme for buying earlier
* [option] redirects all deposits to a Treasury smart contract

## REQUIRES

 * node.js
 * solcjs
 * web3 1.0.0+
 * ethereumjs-testrpc

## INSTALL

run ./make.sh

This invokes solcjs compiler 0.4.15+ on the .sol files and dumps the resulting
abi's and bin's in the ./build subdirectory

$ cd scripts

$ node deployStub.js  (for testing)
prints address of a smart contract for testing callbacks
$ export STUB='value of SCA above'

$ node deployICO.js
prints SCA of the token contract
$ export SCA='value of SCA printed out above'

## TEST

Run the various scripts - see header of each for required parameters

## VIEW EVENT LOGS

N/A


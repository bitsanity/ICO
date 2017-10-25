// ===========================================================================
// functions used by other scripts
// ===========================================================================

const fs = require('fs');
const Web3_ = require('web3');
const web3_ =
  new Web3_(new Web3_.providers.HttpProvider("http://localhost:8545"));

exports.getWeb3 = function() { return web3_; }

// ===========================================================================

exports.getABI = function() {
  var contents = fs.readFileSync('../build/ICO_sol_ICO.abi').toString();
  return JSON.parse(contents);
}

exports.getBinary = function() {
  var binary = fs.readFileSync('../build/ICO_sol_ICO.bin').toString();
  if (!binary.startsWith('0x')) binary = '0x' + binary;
  return binary;
}

exports.getContract = function(sca) {
  return new web3_.eth.Contract( exports.getABI(), sca );
}

// ===========================================================================

exports.treasuryABI = function() {
  var contents =
    fs.readFileSync('../build/TreasuryStub_sol_TreasuryStub.abi').toString();
  return JSON.parse(contents);
}

exports.treasuryBinary = function() {
  var binary =
    fs.readFileSync('../build/TreasuryStub_sol_TreasuryStub.bin').toString();
  if (!binary.startsWith('0x')) binary = '0x' + binary;
  return binary;
}

exports.treasuryStub = function(sca) {
  return new web3_.eth.Contract( exports.treasuryABI(), sca );
}

// ===========================================================================

exports.tokenABI = function() {
  var contents =
    fs.readFileSync('../build/ERC20Stub_sol_ERC20Stub.abi').toString();
  return JSON.parse(contents);
}

exports.tokenBinary = function() {
  var binary =
    fs.readFileSync('../build/ERC20Stub_sol_ERC20Stub.bin').toString();
  if (!binary.startsWith('0x')) binary = '0x' + binary;
  return binary;
}

exports.tokenStub = function(sca) {
  return new web3_.eth.Contract( exports.tokenABI(), sca );
}


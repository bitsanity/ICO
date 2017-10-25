#!/bin/bash

commd=$1

if [ -z $commd ]
then
  echo compiling ...
  solcjs --bin --abi --optimize -o ./build TreasuryStub.sol
  solcjs --bin --abi --optimize -o ./build ERC20Stub.sol
  solcjs --bin --abi --optimize -o ./build ICO.sol
fi

if [ "$commd" = "clean" ]
then
  echo cleaning ...
  rm -rf build
fi

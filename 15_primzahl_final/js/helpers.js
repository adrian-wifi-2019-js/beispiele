'use strict';

console.log('helpers.js geladen');

function zufallsInteger(min, max){
  return Math.floor(Math.random() * (max - min) + min) + 1;
}

function isPrimzahl( zahl ){
  for (var j = 2; j < zahl; j++) {
    if (zahl % j === 0)
      return false;
  }
  return true;
}

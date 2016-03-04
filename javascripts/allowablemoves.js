// AllowableMoves.js

"use strict";

let AllowableMoves = {};

AllowableMoves.buildAnalyzeMatrix = function(matrix,row,col) {
  // construct 5x5 matrix around piece being analyzed, "X"
  // C . . . D
  // . A . B .
  // . . X . .
  // . E . F .
  // G . . . H
  var analyze = {};
  console.log(matrix);
  console.log(row,col);
  analyze.x = matrix[row][col];

  try {
    analyze.a = Math.abs(matrix[row - 1][col - 1]);
  }
  catch(e){
    analyze.a = 9;  // position is off the board
  }
  try {
    analyze.b = Math.abs(matrix[row - 1][col + 1]);
  }
  catch(e){
    analyze.b = 9;  // position is off the board
  }
  try {
    analyze.c = Math.abs(matrix[row - 2][col - 2]);
  }
  catch(e){
    analyze.c = 9;  // position is off the board
  }
  try {
    analyze.d = Math.abs(matrix[row - 2][col + 2]);
  }
  catch(e){
    analyze.d = 9;  // position is off the board
  }
  try {
    analyze.e = Math.abs(matrix[row + 1][col - 1]);
  }
  catch(e){
    analyze.e = 9;  // position is off the board
  }
  try {
    analyze.f = Math.abs(matrix[row + 1][col + 1]);
  }
  catch(e){
    analyze.f = 9;  // position is off the board
  }
  try {
    analyze.g = Math.abs(matrix[row + 2][col - 2]);
  }
  catch(e){
    analyze.g = 9;  // position is off the board
  }
  try {
    analyze.g = Math.abs(matrix[row + 2][col + 2]);
  }
  catch(e){
    analyze.g = 9;  // position is off the board
  }
  return analyze;
};

AllowableMoves.p1Ordinary = function(analyze) {
  if ( (analyze.a === 0) ||                               // p1 forward move to A
       (analyze.b === 0) ||                               // p1 forward move to B
       ( (analyze.a === 2) && (analyze.c === 0) ) ||      // p1 forward jump to C
       ( (analyze.b === 2) && (analyze.d === 0) ) ) {     // p1 forward jump to D
    return true;  // moves are available for this piece
  } else {
    return false; // no moves available for this piece
  }
};
AllowableMoves.p1King = function(analyze) {
  if ( (analyze.e === 0) ||                               // p1 backward move to E
       (analyze.f === 0) ||                               // p1 backward move to F
       ( (analyze.e === 2) && (analyze.g === 0) ) ||      // p1 backward jump to G
       ( (analyze.f === 2) && (analyze.h === 0) ) ) {     // p1 backward jump to H
    return true;  // moves are available for this piece
  } else {
    return false; // no moves available for this piece
  }
};
AllowableMoves.p2Ordinary = function(analyze) {
  if ( (analyze.e === 0) ||                               // p2 forward move to E
       (analyze.f === 0) ||                               // p2 forward move to F
       ( (analyze.e === 1) && (analyze.g === 0) ) ||      // p2 forward jump to G
       ( (analyze.f === 1) && (analyze.h === 0) ) ) {     // p2 forward jump to H
    return true;  // moves are available for this piece
  } else {
    return false; // no moves available for this piece
  }
};
AllowableMoves.p2King = function(analyze) {
  if ( (analyze.a === 0) ||                               // p2 backward move to A
       (analyze.b === 0) ||                               // p2 backward move to B
       ( (analyze.a === 1) && (analyze.c === 0) ) ||      // p2 backward jump to C
       ( (analyze.b === 1) && (analyze.d === 0) ) ) {     // p2 backward jump to D
    return true;  // moves are available for this piece
  } else {
    return false; // no moves available for this piece
  }
};
AllowableMoves.p1OrdinaryCanJump = function(analyze) {
  if ( ( (analyze.a === 2) && (analyze.c === 0) ) ||      // p1 forward jump to C
       ( (analyze.b === 2) && (analyze.d === 0) ) ) {     // p1 forward jump to D
    return true;
   } else {
    return false;
   }
};
AllowableMoves.p1KingCanJump = function(analyze) {
  if ( ( (analyze.e === 2) && (analyze.g === 0) ) ||      // p1 backward jump to G
       ( (analyze.f === 2) && (analyze.h === 0) ) ) {     // p1 backward jump to H
    return true;
   } else {
    return false;
   }
};
AllowableMoves.p2OrdinaryCanJump = function(analyze) {
  if ( ( (analyze.e === 1) && (analyze.g === 0) ) ||      // p2 forward jump to G
       ( (analyze.f === 1) && (analyze.h === 0) ) ) {     // p2 forward jump to H
    return true;
   } else {
    return false;
   }
};
AllowableMoves.p2KingCanJump = function(analyze) {
  if ( ( (analyze.a === 1) && (analyze.c === 0) ) ||      // p2 backward jump to C
       ( (analyze.b === 1) && (analyze.d === 0) ) ) {     // p2 backward jump to D
    return true;
   } else {
    return false;
   }
};

module.exports = AllowableMoves;
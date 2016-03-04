// AllowableMoves.js

"use strict";

let AllowableMoves = {};

AllowableMoves.p1Ordinary = function(analyze) {
  if ( (analyze.a === 0) ||                               // p1 forward move to A
       (analyze.b === 0) ||                               // p1 forward move to B
       ( (analyze.a === 2) && (analyze.c === 0) ) ||      // p1 forward jump to C
       ( (analyze.b === 2) && (analyze.d === 0) ) ) {     // p1 forward jump to D
    console.log("goddamn it's true!");
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

module.exports = AllowableMoves;
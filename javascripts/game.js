"use strict";

//let Player = require('./player.js');  // for some reason we crash if Player is required here

let Game = {
  newMatrix:       [[0,0,0,2,0,2,0,2],
                    [2,0,1,0,2,0,2,0],
                    [0,2,0,2,0,2,0,2],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [1,0,1,0,1,0,1,0],
                    [0,1,0,2,0,1,0,1],
                    [1,0,1,0,0,0,1,0]]
};
//   newMatrix:       [[0,0,0,0,0,0,0,2], // game over b/c no moves for P2
//                     [0,0,0,0,0,0,1,0],
//                     [0,0,0,0,0,0,0,0],
//                     [0,0,0,0,0,0,0,0],
//                     [0,0,0,0,0,0,0,0],
//                     [1,0,1,0,1,0,1,0],
//                     [0,1,0,1,0,1,0,1],
//                     [1,0,1,0,1,0,1,0]]
// };

Game.doMove = function(moveObj) {
  // first, validate that moveObj defines a valid move
  let error = Game.validate(moveObj);
  $("#error").html(error);

  if (error.indexOf("OK") >= 0) {  // move is valid
    // is this piece getting promoted to king?
    if ((moveObj.player === 1) && (moveObj.dRow === 0)) {
      moveObj.player = 3; // king player 1!
    }
    if ((moveObj.player === 2) && (moveObj.dRow === 7)) {
      moveObj.player = 4; // king player 2!
    }
    // move player piece
    Game.matrix[moveObj.oRow][moveObj.oCol] = 0;
    Game.matrix[moveObj.dRow][moveObj.dCol] = moveObj.player;
    // return with exit code = success
    return 0;
  }
  return -1;
};

Game.validate = function(moveObj) {
  // attempting a jump?
  if ((Math.abs(moveObj.oRow - moveObj.dRow) === 2) && 
      (Math.abs(moveObj.oCol - moveObj.dCol) === 2) ) {
    var jumpRow = (moveObj.oRow + moveObj.dRow) / 2;
    var jumpCol = (moveObj.oCol + moveObj.dCol) / 2;
    var otherPlayer = ((moveObj.player === 1) || (moveObj.player === 3))? 2 : 1;
    if ((Game.matrix[jumpRow][jumpCol] === otherPlayer) ||
        (Game.matrix[jumpRow][jumpCol] === otherPlayer + 2)) {
      Game.matrix[jumpRow][jumpCol] = 0;  // remove jumped piece from board
      return "jump OK!";
    } else {
      return "nothing to jump!";
    }
  }
  // forward move? only kings can move backward.
  if (((moveObj.player === 1) && (moveObj.dRow > moveObj.oRow ) ) ||
      ((moveObj.player === 2) && (moveObj.dRow < moveObj.oRow ) ) ) {
    return "this piece can only move forward";
  }
  // ordinary move?
  if ((Math.abs(moveObj.oRow - moveObj.dRow) === 1) && 
      (Math.abs(moveObj.oCol - moveObj.dCol) === 1) ) {
    return "OK";
  }
  // if move is not expressly permitted, it's forbidden
  return "unspecified error";
};

module.exports = Game;
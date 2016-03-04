"use strict";

//let Player = require('./player.js');  // for some reason we crash if Player is required here
let AllowableMoves = require('./allowablemoves.js');

let Game = {
//   newMatrix:       [[0,0,0,2,0,2,0,2],
//                     [2,0,1,0,2,0,2,0],
//                     [0,2,0,2,0,2,0,2],
//                     [0,0,0,0,0,0,0,0],
//                     [0,0,0,0,0,0,0,0],
//                     [1,0,1,0,1,0,1,0],
//                     [0,1,0,2,0,1,0,1],
//                     [1,0,1,0,0,0,1,0]]
// };
  newMatrix:       [[0,0,0,0,0,0,0,2], // game over b/c no moves for P2
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,1,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [1,0,1,0,1,0,1,0],
                    [0,1,0,1,0,1,0,1],
                    [1,0,1,0,1,0,1,0]]
};

Game.doMove = function(moveObj) {
  // first, validate that moveObj defines a valid move
  let error = Game.validate(moveObj);
  $("#error").html(error);

  if (error.indexOf("OK") >= 0) {  // move is valid
    // is this piece getting promoted to king?
    if ((moveObj.player === 1) && (moveObj.dRow === 0)) {
      moveObj.player = -1; // king player 1!
    }
    if ((moveObj.player === 2) && (moveObj.dRow === 7)) {
      moveObj.player = -2; // king player 2!
    }
    // move player piece
    Game.matrix[moveObj.oRow][moveObj.oCol] = 0;
    Game.matrix[moveObj.dRow][moveObj.dCol] = moveObj.player;
    //  more jumps available?
    var moreJumpsAvailable = false;
    switch(moveObj.player) {
      case 1:
        moreJumpsAvailable = AllowableMoves.p1OrdinaryCanJump(Game.matrix);
    }
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
    var otherPlayer = Math.abs(moveObj.player) === 1 ? 2 : 1;
    if (Math.abs(Game.matrix[jumpRow][jumpCol]) === otherPlayer) {
      Game.matrix[jumpRow][jumpCol] = 0;  // remove jumped piece from board
      return "jump OK!";
    } else {
      return "nothing to jump!";
    }
  }
  // backward move by ordinary piece? only kings can move backward.
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

Game.isGameOver = function(whoseTurn){
  var row, col;

  for (row = 0; row < 8; row++) {
    for (col = 0; col < 8; col++ ) {
      if (Math.abs(Game.matrix[row][col]) !== whoseTurn) {
        continue;  // next column
      }
      var analyze = AllowableMoves.buildAnalyzeMatrix(Game.matrix,row,col);

      let canMove = true;
      switch(analyze.x) {
        case 1:
          canMove = AllowableMoves.p1Ordinary(analyze);
          break;
        case -1:
          canMove = AllowableMoves.p1Ordinary(analyze) || AllowableMoves.p1King(analyze);
          break;
        case 2:
          canMove = AllowableMoves.p2Ordinary(analyze);
          break;
        case -2:
          canMove = AllowableMoves.p2Ordinary(analyze) || AllowableMoves.p2King(analyze);
          break;
      }
      if (canMove) {
        return false;  // return "game is not over"
      } else {
        continue;  // test next board square
      }
    }  // end for col
  }  // end for row
  return true;  // if we get through both loops without returning, this player is stuck, and game is over
};

module.exports = Game;
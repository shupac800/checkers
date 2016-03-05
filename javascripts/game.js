"use strict";

//let Player = require('./player.js');  // for some reason we crash if Player is required here
let AllowableMoves = require('./allowablemoves.js');

let Game = {};

Game.resetBoard = function() {
  Game.matrix =   [ [0,0,0,0,0,0,0,0],
                    [0,0,0,0,2,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,2,0,2,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [1,0,2,0,1,0,1,0],
                    [0,1,0,-1,0,1,0,1],
                    [1,0,1,0,1,0,1,0] ];
};

Game.doMove = function(moveObj) {
  console.log("newMatrix",Game.newMatrix);
  // first, validate that moveObj defines a valid move
  let message = Game.validate(moveObj);
  $("#msg").html(message);

  if (message.indexOf("OK") >= 0) {  // move is valid
    // is this piece getting crowned?
    if ((moveObj.player === 1) && (moveObj.dRow === 0)) {
      moveObj.player = -1; // king player 1!
    }
    if ((moveObj.player === 2) && (moveObj.dRow === 7)) {
      moveObj.player = -2; // king player 2!
    }
    // move player piece
    Game.matrix[moveObj.oRow][moveObj.oCol] = 0;
    Game.matrix[moveObj.dRow][moveObj.dCol] = moveObj.player;
    // if this was a jump move, see if another jump is possible
    if (message.indexOf("Jump OK") >= 0) {
      if (Game.moreJumpsAvailable(moveObj.dRow,moveObj.dCol)) {
        $("#msg").html("Keep jumpin'!");
        return 1;  // exit code = valid move; don't switch players
      }
    }
    return 0;  // exit code = valid move; switch players
  }
  return -1;  // exit code = invalid move
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
      return "Jump OK!";
    } else {
      return "Nothing to jump!";
    }
  }
  // backward move by ordinary piece? only kings can move backward.
  if (((moveObj.player === 1) && (moveObj.dRow > moveObj.oRow ) ) ||
      ((moveObj.player === 2) && (moveObj.dRow < moveObj.oRow ) ) ) {
    return "This piece can only move forward";
  }
  // ordinary move?
  if ((Math.abs(moveObj.oRow - moveObj.dRow) === 1) && 
      (Math.abs(moveObj.oCol - moveObj.dCol) === 1) ) {
    return "OK";
  }
  // if move is not expressly permitted, it's forbidden
  return "Unspecified error";
};

Game.moreJumpsAvailable = function(row,col) {
  let analyze = AllowableMoves.buildAnalyzeGrid(Game.matrix,row,col);
  switch(analyze.x) {
    case 1:
      return AllowableMoves.p1OrdinaryCanJump(analyze);
    case -1:
      return AllowableMoves.p1OrdinaryCanJump(analyze) || AllowableMoves.p1KingCanJump(analyze);
    case 2:
      return AllowableMoves.p2OrdinaryCanJump(analyze);
    case -2:
      return AllowableMoves.p2OrdinaryCanJump(analyze) || AllowableMoves.p2KingCanJump(analyze);
    default:
      return false;
  }
};

Game.isGameOver = function(whoseTurn) {
  let row, col;
  for (row = 0; row < 8; row++) {
    for (col = 0; col < 8; col++ ) {
      if (Math.abs(Game.matrix[row][col]) !== whoseTurn) {
        continue;  // next column
      }
      var analyze = AllowableMoves.buildAnalyzeGrid(Game.matrix,row,col);

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
  // if we get to this point without returning,
  // this player either has zero pieces or has no moves available
  return true;        // return "game over"
};

module.exports = Game;
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// AllowableMoves.js

"use strict";

let AllowableMoves = {};

AllowableMoves.buildAnalyzeGrid = function(matrix,row,col) {
  // construct 5x5 grid around piece being analyzed, "X"
  // C . . . D
  // . A . B .
  // . . X . .
  // . E . F .
  // G . . . H
  var analyze = {};
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
    analyze.h = Math.abs(matrix[row + 2][col + 2]);
  }
  catch(e){
    analyze.h = 9;  // position is off the board
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
    return true;  // this piece can jump
  } else {
    return false;  // this piece can't jump
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
},{}],2:[function(require,module,exports){
// display.js

"use strict";

var Game = require('./game.js');

var Display = {};
var moveObj = {};

Display.drawBoard = function() {
  let row, col;
  let htmlString = "";
  for (row = 0; row < 8; row++) {
    for (col = 0; col < 8; col++) {
      let squareColor = (row + col) % 2 === 0 ? "#DDD" : "black";
      let player = Game.matrix[row][col];
      htmlString += `<img src='img/player${player}.png' style='background-color:${squareColor}' class='row${row} col${col} p${player}'>`;
    }
  }
  $("#board").html(htmlString);
};

module.exports = Display;
},{"./game.js":3}],3:[function(require,module,exports){
"use strict";

let AllowableMoves = require('./allowablemoves.js');

let Game = {};

Game.resetBoard = function() {
  Game.matrix =   [ [0,2,0,2,0,2,0,2],
                    [2,0,2,0,2,0,2,0],
                    [0,2,0,2,0,2,0,2],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [1,0,1,0,1,0,1,0],
                    [0,1,0,1,0,1,0,1],
                    [1,0,1,0,1,0,1,0] ];
};

Game.doMove = function(moveObj) {
  // first, validate that moveObj defines a valid move
  let message = Game.validate(moveObj);
  $("#msg").html(message);

  if (message.indexOf("OK") >= 0) {  // move is valid
    // is this piece getting crowned?
    if ((moveObj.player === 1) && (moveObj.dRow === 0)) {
      moveObj.player = -1; // king player 1!
      $("#msg").html("King me!");
      Game.matrix[moveObj.oRow][moveObj.oCol] = 0;
      Game.matrix[moveObj.dRow][moveObj.dCol] = moveObj.player;
      return 0;  // exit code = valid move; switch players
    }
    if ((moveObj.player === 2) && (moveObj.dRow === 7)) {
      moveObj.player = -2; // king player 2!
      $("#msg").html("King me!");
      Game.matrix[moveObj.oRow][moveObj.oCol] = 0;
      Game.matrix[moveObj.dRow][moveObj.dCol] = moveObj.player;
      return 0;  // exit code = valid move; switch players
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
    return "OK!";
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
},{"./allowablemoves.js":1}],4:[function(require,module,exports){
"use strict";

let Game = require('./game.js');
let Player = require('./player.js');

$("#playAgain").hide();
Game.resetBoard();
Player.go();
},{"./game.js":3,"./player.js":5}],5:[function(require,module,exports){
// player.js

"use strict";

let Game = require('./game.js');
let Display = require('./display.js');

let Player = {
  whoseTurn: 1,  // player 1 goes first
  assignListeners: function() {
    var moveObj = {};  // re-initialize moveObj

    // ordinary pieces
    $(`.p${Player.whoseTurn}`).on("mousedown",function(event) {  // note: dynamically-created DOM element
      moveObj.oRow = parseInt(event.target.className.charAt(3));
      moveObj.oCol = parseInt(event.target.className.charAt(8));
      moveObj.player = Player.whoseTurn;
      return false;
    });

    // kings
    $(`.p${Player.whoseTurn * -1}`).on("mousedown",function(event) {  // note: dynamically-created DOM element
      moveObj.oRow = parseInt(event.target.className.charAt(3));
      moveObj.oCol = parseInt(event.target.className.charAt(8));
      moveObj.player = Player.whoseTurn * -1;
      return false;
    });

    $(".p0").on("mouseup",function(event) {
      moveObj.dRow = parseInt(event.target.className.charAt(3));
      moveObj.dCol = parseInt(event.target.className.charAt(8));
      let exit_code = Game.doMove(moveObj);
      if (exit_code === 0) {
        Player.whoseTurn = Player.whoseTurn === 1 ? 2 : 1;  // switch players
      }
      Player.go();
    });
  },

  go: function() {
    Display.drawBoard();
    // check for game over:  current player has > 0 pieces and has valid moves?
    if (Game.isGameOver(Player.whoseTurn)) {
      let otherPlayer = Player.whoseTurn === 1 ? 2 : 1;
      $("#whoseTurn").html(`Player ${otherPlayer} wins!`);
      $("#playAgain").show();
      $("#playAgain").click(function() {
        $("#msg").html("");
        $("#playAgain").hide();
        Game.resetBoard();
        Player.whoseTurn = 1;
        Player.go();
      });
    } else {
      Player.assignListeners(Player.whoseTurn);
      $("#whoseTurn").html(`Player ${Player.whoseTurn} go!`);
    }
  }
};

module.exports = Player;
},{"./display.js":2,"./game.js":3}]},{},[4])


//# sourceMappingURL=bundle.js.map

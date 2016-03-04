(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// display.js

"use strict";

var Game = require('./game.js');

var Display = {};
var moveObj = {};

Display.drawBoard = function(){
  var row, col;
  var htmlString = "";
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
},{"./game.js":2}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
"use strict";

let Game = require('./game.js');
let Player = require('./player.js');
//let Display = require('./display.js');

Game.matrix = Game.newMatrix;

Player.go();
},{"./game.js":2,"./player.js":4}],4:[function(require,module,exports){
// player.js

"use strict";

let Game = require('./game.js');
let Display = require('./display.js');

let Player = {
  whoseTurn: 1,  // player 1 goes first
  assignListeners: function() {
    var moveObj = {};  // re-initialize moveObj

    // ordinary pieces
    $(`.p${Player.whoseTurn}`).on("mousedown",function(event){  // note: dynamically-created DOM element
      moveObj.oRow = parseInt(event.target.className.charAt(3));
      moveObj.oCol = parseInt(event.target.className.charAt(8));
      moveObj.player = Player.whoseTurn;
      console.log("mousedown",moveObj);
      return false;
    });

    // kings
    $(`.p${Player.whoseTurn + 2}`).on("mousedown",function(event){  // note: dynamically-created DOM element
      moveObj.oRow = parseInt(event.target.className.charAt(3));
      moveObj.oCol = parseInt(event.target.className.charAt(8));
      console.log("mousedown",moveObj);
      moveObj.player = Player.whoseTurn + 2;
      return false;
    });

    $(".p0").on("mouseup",function(event){
      moveObj.dRow = parseInt(event.target.className.charAt(3));
      moveObj.dCol = parseInt(event.target.className.charAt(8));
      console.log("mouseup",moveObj);
      let exit_code = Game.doMove(moveObj);
      if (exit_code === 0) { // move was valid
        Player.whoseTurn = Player.whoseTurn === 1 ? 2 : 1;  // switch players
      }
      Player.go();
    });
  },
  go: function() {
    Display.drawBoard();
    Player.assignListeners(Player.whoseTurn);
    $("#whoseTurn").html(`Player ${Player.whoseTurn} go!`);
  }
};

module.exports = Player;
},{"./display.js":1,"./game.js":2}]},{},[3])


//# sourceMappingURL=bundle.js.map

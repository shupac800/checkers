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
    $(`.p${Player.whoseTurn * -1}`).on("mousedown",function(event){  // note: dynamically-created DOM element
      moveObj.oRow = parseInt(event.target.className.charAt(3));
      moveObj.oCol = parseInt(event.target.className.charAt(8));
      console.log("mousedown",moveObj);
      moveObj.player = Player.whoseTurn * -1;
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
    // check for game over:  current player has > 0 pieces and has valid moves?
    if (!Game.isGameOver(Player.whoseTurn)) {
      Player.assignListeners(Player.whoseTurn);
      $("#whoseTurn").html(`Player ${Player.whoseTurn} go!`);
    } else {
      console.log("ending with whoseTurn =",Player.whoseTurn);
      $("#whoseTurn").html("Game Over!");
    }
  }
};

module.exports = Player;
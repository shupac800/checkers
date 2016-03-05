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
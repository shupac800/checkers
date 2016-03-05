"use strict";

let Game = require('./game.js');
let Player = require('./player.js');
//let Display = require('./display.js');

$("#playAgain").hide();
Game.resetBoard();
Player.go();
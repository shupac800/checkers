"use strict";

let Game = require('./game.js');
let Player = require('./player.js');

$("#playAgain").hide();
Game.resetBoard();
Player.go();
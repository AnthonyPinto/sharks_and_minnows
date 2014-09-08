'use strict';

(function () {
  if (typeof Sharks === "undefined") {
    window.Sharks = {};
  }
	
	var Game = Sharks.Game = function (xDim, yDim) {
		this.xDim = xDim;
		this.yDim = yDim;
		
		this.minnows = [];
		for (var i = 0; i < Game.NUM_MINNOWS; ++i) {
			this.minnows.push(Sharks.Minnow.randomMinnow(xDim, yDim));
		}
		this.sharks = [];
		for (var i = 0; i < Game.NUM_SHARKS; ++i) {
			this.sharks.push(Sharks.Shark.randomShark(xDim, yDim));
		}
	};
	
	Game.NUM_MINNOWS = 1000;
	Game.NUM_SHARKS = 3;
	
	Game.prototype.render = function (context) {
		context.clearRect(0, 0, this.xDim, this.yDim);
		
		this.minnows.forEach(function (minnow) {
			minnow.render(context);
		});
		
		this.sharks.forEach(function (shark) {
			shark.render(context);
		});
	};
	
	Game.prototype.moveFish = function () {
		var thisGame = this;
		
		this.minnows.forEach(function (minnow) {
			minnow.move(thisGame.xDim, thisGame.yDim, thisGame.sharks);
		});
		
		this.sharks.forEach(function (shark) {
			shark.move(thisGame.xDim, thisGame.yDim, thisGame.minnows);
		});
	};
	
	Game.prototype.start = function (canvasEl) {
		
		var context = canvasEl.getContext('2d');
		
		window.setInterval((function () {
			this.moveFish();
			this.render(context);
		}).bind(this), 60 / 1000);
	};
})();
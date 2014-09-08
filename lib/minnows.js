'use strict';

(function () {
  if (typeof Sharks === "undefined") {
    window.Sharks = {};
  }
	
	// function Surrogate () {};
	//
	// Surrogate.prototype = Sharks.Fish.prototype;
	//
	// var Minnow = Sharks.Minnow = function () {};
	//
	// Minnow.prototype = new Surrogate();
	
	var Minnow = Sharks.Minnow = function (centerX, centerY, radius, color) {
		this.centerX = centerX;
		this.centerY = centerY;
		this.radius = radius;
		this.color = color;
		this.prevDX = 0;
		this.prevDY = 0;
  };
	
	Minnow.prototype.render = function (context) {
		context.fillStyle = this.color;
		context.beginPath();
		
		context.arc(
			this.centerX,
			this.centerY,
			(this.radius),
			0,
			2 * Math.PI,
			false
		);
		
		context.fill();
	};
	
	Minnow.ILIMIT = 1000000000;
	
	Minnow.randomMinnow = function (maxX, maxY) {
		return new Minnow(
			maxX * Math.random(),
			maxY * Math.random(),
			10,
			"#000000"		
		);
	};
	
	Minnow.prototype.respondTo = function(sharks) {
		var nearestDiff = null;
		var xPercent = null;
		var yPercent = null;
		var thisMinnow = this;
		
		sharks.forEach(function(shark){
			var xDiff = Math.abs(thisMinnow.centerX - shark.centerX);
			var yDiff = Math.abs(thisMinnow.centerY - shark.centerX);
			var diff = xDiff + yDiff;
			if (!nearestDiff || diff < nearestDiff) {
				
				nearestDiff = diff;
				xPercent = xDiff/diff;
				yPercent = yDiff/diff;
				
				if (thisMinnow.centerX < shark.centerX) {
					xPercent = -xPercent;
				}
				if (thisMinnow.centerY < shark.centerY) {
					yPercent = -yPercent;
				}
				
			}
		});
		
		return [xPercent, yPercent];
	};
	
	
	Minnow.prototype.move = function (maxX, maxY, sharks) {
		var newDelta = this.respondTo(sharks);
    var dx = newDelta[0] + this.prevDX;
    var dy = newDelta[1] + this.prevDY;
		var inertia = this.limitInertia(dx, dy);
		this.prevDX = inertia[0];
		this.prevDY = inertia[1];
		// this.prevDX = dx;
		// this.prevDY = dy;
		

    this.centerX = Math.abs((this.centerX + (dx * this.radius * 0.1)) % maxX);
    this.centerY = Math.abs((this.centerY + (dy * this.radius) * 0.1) % maxY);
	}
	
	Minnow.prototype.limitInertia = function (x, y) {
		var absX = Math.abs(x), absY = Math.abs(y);
		var totalSpeed = absX + absY;
		var newX = x;
		var newY = y;
		if (totalSpeed > 2) {
			var xPercent = absX / totalSpeed;
			var yPercent = absY / totalSpeed;
			newX = 2 * xPercent;
			newY = 2 * yPercent;
		} 
		return [newX, newY];
	};
	
})();
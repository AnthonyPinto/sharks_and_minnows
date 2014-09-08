'use strict';

(function () {
  if (typeof Sharks === "undefined") {
    window.Sharks = {};
  }
	
	// function Surrogate () {};
	//
	// Surrogate.prototype = Sharks.Minnow.prototype;
	//
	// var Shark = Sharks.Shark = function () {};
	//
	// Shark.prototype = new Surrogate();
	
	
	var Shark = Sharks.Shark = function (centerX, centerY, radius, color) {
		this.centerX = centerX;
		this.centerY = centerY;
		this.radius = radius;
		this.color = color;
		this.prevDX = 0;
		this.prevDY = 0;
  };
	
	Shark.prototype.render = function (context) {
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
	
	Shark.ILIMIT = 0.25;
	
	Shark.randomShark = function (maxX, maxY) {
		return new Shark(
			maxX * Math.random(),
			maxY * Math.random(),
			20,
			"#555555"		
		);
	};
	
	Shark.prototype.respondTo = function(minnows) {
		var nearestDiff = null;
		var xPercent = null;
		var yPercent = null;
		var thisShark = this;
		
		minnows.forEach(function(minnow){
			var xDiff = Math.abs(thisShark.centerX - minnow.centerX);
			var yDiff = Math.abs(thisShark.centerY - minnow.centerX);
			var diff = xDiff + yDiff;
			if (!nearestDiff || diff < nearestDiff) {
				
				nearestDiff = diff;
				xPercent = xDiff/diff;
				yPercent = yDiff/diff;
				
				if (thisShark.centerX > minnow.centerX) {
					xPercent = -xPercent;
				}
				if (thisShark.centerY > minnow.centerY) {
					yPercent = -yPercent;
				}
				
			}
		});
		
		return [xPercent, yPercent];
	};
	
	Shark.prototype.move = function (maxX, maxY, minnows) {
		var newDelta = this.respondTo(minnows);
    var dx = newDelta[0] + this.prevDX;
    var dy = newDelta[1] + this.prevDY;
		this.prevDX = this.limitInertia(dx);
		this.prevDY = this.limitInertia(dy);
		

    this.centerX = Math.abs((this.centerX + (dx * this.radius * 0.1)) % maxX);
    this.centerY = Math.abs((this.centerY + (dy * this.radius) * 0.1) % maxY);
	}
	
	Shark.prototype.limitInertia = function (inertia) {
		if (inertia > Shark.ILIMIT) {
			return Shark.ILIMIT;
		}
		if (inertia < -Shark.ILIMIT) {
			return -Shark.ILIMIT;
		}
		return inertia;
	};
		
	
})();
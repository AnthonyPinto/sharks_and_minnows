(function () {
  if (typeof Sharks === "undefined") {
    window.Sharks = {};
  }
	
	var Fish = Sharks.Fish = function (centerX, centerY, color, radius) {
		this.centerX = centerX;
		this.centerY = centerY;
		this.radius = radius;
		this.color = color;
		this.prevDX = 0;
		this.prevDY = 0;
  };
	
	Fish.prototype.render = function (context) {
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
})();
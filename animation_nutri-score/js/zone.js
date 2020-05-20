class Zone {
	constructor(img, minimum, maximum){
		this.img = img;
		this.minimum = minimum;
		this.maximum = maximum;

	}
	
	getRange() {
		var range = this.maximum - this.minimum;

		if (range>=0) {
			return range;
		} else if (range < 0) {
			return range*-1;
		}

	}

}










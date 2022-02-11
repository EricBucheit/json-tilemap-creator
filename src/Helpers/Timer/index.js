function Timer (time) {
	let date = new Date();
	let expiration = date.getTime() + time;
	return ({
			date : date,
			time : time,
			expiration: expiration,
			
			reset: function() {
				let date = new Date();
				let newTime = date.getTime()
				this.expiration = newTime + this.time;
			},

			isDone() {
				let date = new Date();
				let newTime = date.getTime()
				if (newTime > this.expiration) {
					return (true)
				}
				return false;
			},

			check : function() {
				let date = new Date();
				let newTime = date.getTime()
				if (newTime > this.expiration) {
					this.reset();
					return (true)
				}
				return false
			},

			setExpiration : function(newExpiration) {
				this.time = newExpiration;
				this.reset()
			}
		})
}

export default Timer;
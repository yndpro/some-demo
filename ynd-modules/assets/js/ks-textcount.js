var TextCount = {

	$input : null,
	$inputCount : null,

	init:function(config) {
		this.$input = $(config.input);
		this.$inputCount = $(config.inputCount);
		this.bind();
		return this;
	},

	bind:function(){
		var tc = this;
		this.$input.on("keyup",function(){
			tc.render();
		})
	},

	getNum:function(){
		return this.$input.val().length;
	},

	render:function(){
		if(this.$inputCount.length == 0){
			this.$inputCount = $("<div id='j-inputCount'></div>");
			this.$input.after(this.$inputCount);
		}
		this.$inputCount.html(this.getNum());
	}
}
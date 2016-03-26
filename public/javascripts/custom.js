new Vue({
	el : '#body',

	data : {
		input1 : 10,
		input2 : 10,
		showme : false
	},
	ready : function(){
		
		console.log('go go express vue');
	},
	methods : {
		go : function() {

			console.log('lets go express way');

			alert('lets go express way');

			this.showme=!this.showme;
		}
	}

})
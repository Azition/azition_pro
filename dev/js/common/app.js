(function(w){

	Vue.component('main', {
		template: '#main',

		ready: function(){
			var that = this;
		},

		methods:{
			onOpen: function(val){
				this.$dispatch('open-window',val);
			}
		}
	});

	Vue.component('profile',{
		template: '#profile',
		props:{
			class: String,
		},
		data: function(){
			return {
			};
		},
		methods:{
			onClose: function(){
				this.$dispatch('close-window');
			}
		}
	});

	Vue.component('abilities',{
		template: '#abilities',
		props:{
			class: String,
		},
		data: function(){
			return {
			};
		},
		methods:{
			onClose: function(){
				this.$dispatch('close-window');
			}
		}
	});

	Vue.component('projects', {
		template: '#projects',
		props:{
			class: String,
		},
		data: function(){
			return {
			};
		},
		methods:{
			onClose: function(){
				this.$dispatch('close-window');
			}
		}
	});

	Vue.component('contacts',{
		template: '#contacts',
		props:{
			class: String,
		},
		data: function(){
			return{
			};
		},
		methods:{
			onClose: function(){
				this.$dispatch('close-window');
			}
		}
	});

	new Vue({
		el: '#app',
		data: {
			message: 'Interactive Resume',
			rootClass:{
				'open-left': false,
				'open-right': false,
				'open-top': false,
				'open-bottom': false,
			}
		},
		ready: function(){
		},
		methods:{
			closeWindow: function(){
				var that = this;
				Object.keys(this.rootClass).map(function(k,v){
					that.rootClass[k] = false;
				});
			}
		},
		events: {
			'open-window': function(msg){
				console.log(msg);
				this.closeWindow();
				switch(msg){
					case 'top':
						this.rootClass['open-top'] = true;
						break;
					case 'left':
						this.rootClass['open-left'] = true;
						break;
					case 'bottom':
						this.rootClass['open-bottom'] = true;
						break;
					case 'right':
						this.rootClass['open-right'] = true;
						break;
				}
			},
			'close-window': function(){
				this.closeWindow();
			},
		}
	});
})(window);
(function(w){

	Vue.component('jumbotron', {
		template: '#jumbotron',
		props: {
			message: String,
			width: Number,
			height: Number,
		},
		data: function(){
			var that = this;
			return {
				absoluteContainerStyle:{
					position: 'absolute',
					bottom: '0px',
					margin: '0 70px',
					left: '450px',
				},
				lineStyle: {
					height: '300px',
				},
				flags:{
					stopResizeBottomHeight: false,
				}
			}
		},

		ready: function(){
			var that = this;
			that.handlerHeight(w.innerHeight || w.document.body.clientHeight);
			that.handlerWidth(w.innerWidth || w.document.body.clientWidth);
			
			if (w.attachEvent){
				w.attachEvent('onresize', function(){
					console.log('attachEvent - resize');
					that.width = w.innerWidth || w.document.body.clientWidth;
					that.height = w.innerHeight || w.document.body.clientHeight;
					that.handlerHeight(that.height);
					that.handlerWidth(that.width);				
				});
			} else if (w.addEventListener){
				w.addEventListener('resize', function(){
					that.width = w.innerWidth || w.document.body.clientWidth;
					that.height = w.innerHeight || w.document.body.clientHeight;
					that.handlerHeight(that.height);
					that.handlerWidth(that.width);
				}, true);
			}
		},

		methods:{
			handlerHeight: function(val){
				if (!this.flags['stopResizeBottomHeight'])
					this.absoluteContainerStyle['bottom'] = val*0.2+'px';
			},
			handlerWidth: function(val){
				if (val > 1200){
					this.absoluteContainerStyle['margin'] = '0 70px';
					this.absoluteContainerStyle['left'] = '450px';
					this.flags['stopResizeBottomHeight'] = false;
					this.lineStyle['height'] = '300px';
				} else if (val < 1200 && val >= 980){
					this.absoluteContainerStyle['margin'] = '0 30px';
					this.absoluteContainerStyle['left'] = '400px';
					this.flags['stopResizeBottomHeight'] = false;
					this.lineStyle['height'] = '300px';
				} else if (val < 980 && val >= 700){
					this.absoluteContainerStyle['margin'] = '0';
					this.absoluteContainerStyle['left'] = (val / 2 - 260) + 'px';
					this.flags['stopResizeBottomHeight'] = true;
					this.absoluteContainerStyle['bottom'] = '60px';
					this.lineStyle['height'] = '300px';
				} else if (val < 700 && val >= 530){
					this.absoluteContainerStyle['margin'] = '0';
					this.absoluteContainerStyle['left'] = (val / 2 - 260) + 'px';
					this.flags['stopResizeBottomHeight'] = true;
					this.absoluteContainerStyle['bottom'] = '60px';
					this.lineStyle['height'] = '200px';
				} else if (val < 530 && val >= 0){
					this.absoluteContainerStyle['margin'] = '0';
					this.absoluteContainerStyle['left'] = (val / 2 - 160) + 'px';
					this.flags['stopResizeBottomHeight'] = true;
					this.absoluteContainerStyle['bottom'] = '60px';
					this.lineStyle['height'] = '200px';
				}
			}
		}
	});

	Vue.component('profile',{
		template: '#profile',
		data: function(){
			return {
			};
		}
	});

	Vue.component('abilities',{
		template: '#abilities',
		data: function(){
			return {
			};
		}
	});

	Vue.component('projects', {
		template: '#projects',
		data: function(){
			return {
			};
		}
	});

	Vue.component('contacts',{
		template: '#contacts',
		data: function(){
			return{
			};
		}
	});

	Vue.component('cusbutton', {
		template: '#button',

		props: {
			icon: String,
		},

		data: function(){
			return {
				name: 'Name',
			};
		},
	});

	new Vue({
		el: '#app',
		data: {
			message: 'Interactive Resume',
			jumbotron: {
				width: 0,
				height: 0,
			}
		},
		ready: function(){
			this.jumbotron.width = w.innerWidth || w.document.body.clientWidth;
			this.jumbotron.height = w.innerHeight || w.document.body.clientHeight;
		}
	});
})(window);
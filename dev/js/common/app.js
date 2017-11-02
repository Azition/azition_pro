(function(w){

	Vue.component('main', {
		template: '#main',

		data: function(){
			return {
				showMenu: false,
				showDropdown: false,
			}
		},

		ready: function(){
			var that = this;
			document.addEventListener("mousewheel", this.handleMouseWheel, false);
		},

		methods:{
			handleMouseWheel: function(evt){
				console.log(evt);
			},
			onOpen: function(val){
				this.$dispatch('open-window',val);
				this.showMenu = !this.showMenu;
			},

			onShowMenu: function(){
				this.showMenu = !this.showMenu;
			},

			toogleDropdown: function(){
				this.showDropdown = !this.showDropdown;
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
				title: 'Profile'
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
				abilities:[
					{
						name: 'Programming languages',
						items:[
							{ name:'PHP', star: 7},
							{ name:'JavaScript', star: 7},
							{ name:'HTML/CSS', star: 6},
							{ name:'Java', star: 6},
							{ name:'C', star: 3},
							{ name:'C++', star: 3},
							{ name:'Python', star: 1},
						],
					},
					{
						name: 'JavaScript frameworks',
						items:[
							{ name: 'Vue', star: 6},
							{ name: 'AngularJs', star: 2},
							{ name: 'ReactJs', star: 2},
						],
					},
					{
						name: 'Platforms',
						items: [
							{ name:'NodeJS', star: 5},
							{ name:'Android', star: 4},
						]
					},
					{
						name: 'Backend frameworks',
						items: [
							{name: 'Yii', star: 5},
							{name: 'Yii2', star: 3},
							{name: 'ExpressJS', star: 2},
							{name: 'Phalcon', star: 2},
							{name: 'Django', star: 1},
						],
					}
				],
				title: 'Abilities'
			};
		},
		computed:{
			abilitiesCount: function(){
				console.log(this.abilities.length);
				return this.abilities.length;
			}
		},
		methods:{
			onClose: function(){
				this.$dispatch('close-window');
			},
		}
	});

	Vue.component('projects', {
		template: '#projects',
		props:{
			class: String,
		},
		data: function(){
			return {
				title: 'Projects'
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
				title: 'Contacts'
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
			},
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
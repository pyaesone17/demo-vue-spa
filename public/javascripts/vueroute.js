

// Define some components
var Foo = Vue.extend({

    template: '#foo',

    ready : function(){
    	this.$parent.title ='Foo';
    },

  	data: function () {
    	return { 
    		a: 11 ,
    		b: 12
    	}
    }      
})

var Bar = Vue.extend({

    template: '#bar',

    ready : function(){
    	this.$parent.title ='Bar';
    },
  	
  	data: function () {
    	return { 
    		a: 1500 ,
    		b: 2100
    	}
    }     
})

// The router needs a root component to render.
// For demo purposes, we will just use an empty one
// because we are using the HTML as the app template.
var App = Vue.extend({

	  	data: function () {
    	return { 
    		title : 'Hi There'
    	}
    }
})

// Create a router instance.
// You can pass in additional options here, but let's
// keep it simple for now.
var router = new VueRouter({hashbang:false})

// Define some routes.
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
router.map({
    '/foo': {
        component: Foo
    },
    '/bar': {
        component: Bar
    }
})

// Now we can start the app!
// The router will create an instance of App and mount to
// the element matching the selector #app.
router.start(App, '#app')
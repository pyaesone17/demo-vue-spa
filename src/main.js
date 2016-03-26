var Vue = require('vue')

var App = require('./todo.vue')

Vue.use(require('vue-resource'));

new Vue({
  el: '#body',
  components: {
    app: App
  }
})


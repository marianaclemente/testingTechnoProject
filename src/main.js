// // import { createApp } from 'vue'
// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'
// import store from './store'

// // createApp(App).use(store).use(router).mount('#app')
// Vue.config.productionTip = false

// new Vue ({
//     // el: '#app',
//     store: store,
//     router: router,
//   render: h => h(App),
// }).$mount('#app')


// // Vue.use(store).use(router).mount('#app')

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

export default new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})

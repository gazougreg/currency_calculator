import Vue from 'vue';
import App from './App.vue';
import store from './vue-store/store';
import './validation';


Vue.config.productionTip = false
Vue.prototype.$eventHub = new Vue(); // Global event bus

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './routes';
import swal from 'sweetalert';
import http from './helpers/http';
import store from './helpers/store';
import EventBus from './helpers/event-bus';
import VeeValidate from 'vee-validate';
import Toastr from 'vue-toastr';

require('vue-toastr/src/vue-toastr.scss');

//read config files from a "hidden" file
const config = require('./config/env');

Vue.mixin({
  data() {
    return {
      http: http,
      config: config,
      eventBus: EventBus,
      token: (window.localStorage.getItem(config.cookie_name) == null) ? null : window.localStorage.getItem(config.cookie_name)
    }
  },
  methods: {
  	/* 
  	* Global methods available throughout the entire application are defined here 
  	* It will be safer to "namespace" these methods though. eg: GBDeleteAlert() GB for global
  	*/
  }
});

Vue.use(VueRouter);
Vue.use(VeeValidate);
Vue.use(Toastr);

const router = new VueRouter({  
  routes: routes,
  mode: 'history', 
  linkActiveClass: 'active',
});


router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/logout')) {
    window.localStorage.clear();
    window.location = '/login';
  }

  if (to.path.startsWith('/login') || to.path.startsWith('/register')) {
    if (window.localStorage.getItem(config.cookie_name)) {
      next({
        path: '/'
      });
    }
  }

  if (to.meta.requiresAuth) {
    if (!window.localStorage.getItem(config.cookie_name)) {
      next({
        path: '/login',
        query: {
          redirect: to.path
        }
      });
    } else {
        next();
      } 
    } 
    else {
    next();
  }
});

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
});

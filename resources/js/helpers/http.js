import axios from 'axios';
import EventBus from './event-bus';
import config from '../config/env';

let headers = {},
    running = 0;

let authToken = window.localStorage.getItem(config.cookie_name);

headers['Authorization'] = 'Bearer ' +  authToken;
headers['X-Requested-With'] = 'XMLHttpRequest';
headers['Accept'] = 'application/json';

const http = {
  axios: axios.create({baseURL: config.base_url, headers: headers}),
  send(type, args) {
    if (!running) {
      EventBus.$emit('ajax.begun');
    }
    running++;
    const respond = (func, resp) => {
      running--;
      if (!running)
        EventBus.$emit('ajax.ended');
      if (!resp)
        resp = {};
      func(resp.data, resp.headers, resp.status);
    };
    return new Promise(function (resolve, reject) {
      this[type]
        .apply(this, args)
        .then(resp => {
          respond(resolve, resp);
          if(resp.headers['x-refreshed-token']) {
            window.localStorage.setItem(config.cookie_name, resp.headers['x-refreshed-token'])
            console.warn('intercepted');
          }
        })
        .catch((error) => {
          let resp = error.response;
          if(resp && resp.status) {
            //Handle certain status codes, Globally
            if(resp.status == 401) {
              EventBus.$emit('token.expired');
            }
            else if(resp.status == 422) {
              //do something that handles this status code. 
              // probably emit an event with the EventBus, or clear storage and reload
            }
          }
          respond(reject, resp);
        });
    }.bind(this.axios));
  },
  get() {
    return this.send('get', arguments);
  },
  post() {
    return this.send('post', arguments);
  },
  put() {
    return this.send('put', arguments);
  },
  patch() {
    return this.send('patch', arguments);
  },
  delete() {
    return this.send('delete', arguments);
  },
  getHeaders() {
    return headers;
  },
  getHeader(name){
    return headers[name];
  },
  headerIs(name, value) {
    return headers[name] == value;
  },
  setHeaders(new_headers) {
    headers = new_headers;
    return this.renew();
  },
  setHeader(name, value, norenew) {
    headers[name] = value;
    if (!norenew) this.renew();
    return this;
  },
  removeHeader(name, norenew) {
    delete headers[name];
    if (!norenew) this.renew();
    return this;
  }
};

export default http;

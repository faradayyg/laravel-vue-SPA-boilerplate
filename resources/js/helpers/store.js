import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

//Store mixin with user object and it's action and mutation examples

const store = new Vuex.Store({
    state: {
      User: null,
    },
    mutations: {
      setUser (state, userData) {
        state.allUsers = userData;
      }
    },
    actions: {
      setUser({commit}, users) {
        commit('setUser', users);
      }
    }
});

export default store;

import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import nav from "./nav";
import guestBook from "./guestBook";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    test: ""
  },
  mutations: {

  },
  actions: {

  },
  modules: {
    auth,
    guestBook,
    nav
  }
});

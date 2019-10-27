import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    version: "0.1",
    // isPanelActive: true
  },
  mutations: {
    // showPanel: function(state, bool) {
    //   state.isPanelActive = bool;
    //   console.log("isPanelActive: " + bool);
    // },
  }
});
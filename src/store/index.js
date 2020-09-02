import Vue from 'vue';
import Vuex from 'vuex';

import Api from './api';
import getters from './getters';

import {
  getParentsNode,
  generateNewNode,
  setNodesExpandVisibility,
  setNodesInitialVisiblilty,
} from '../utils/treeHelper';
/* eslint no-debugger: 0 */
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nodes: [],
  },
  mutations: {
    SET_NODES(state, nodes) {
      state.nodes = nodes;
    },
  },
  actions: {
    // we treat the visibility in here and not on server, so it all be in one place
    async init({ commit }) {
      const response = await Api.getTree();
      commit('SET_NODES', setNodesInitialVisiblilty(response.body.data));
    },
    expand({ commit, state }, { index, item }) {
      const nodes = setNodesExpandVisibility([...state.nodes], index, item);
      commit('SET_NODES', nodes);
    },
    async add({ commit, state }, { index, item }) {
      const insert = generateNewNode(state.nodes, item);
      const response = await Api.addNode({
        insert,
        update: getParentsNode(state.nodes, index, insert.current),
      });
      commit('SET_NODES', setNodesInitialVisiblilty(response.body.data));
    },
  },
  getters,
});

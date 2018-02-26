import Vue from 'vue'
import api from '../../api/api' //import api-request actions
import { POSTS } from '../../api/endpoints'

import {
  //import names for actions
  FETCH_POSTS,
} from './actions.types'

import {
  //import names for mutations
  SET_POSTS,
} from './mutations.types'


const state = {
  posts:[],
  name:'stefan'
};

const getters = {
  getPosts(state){
    return state.posts;
  }
};

const mutations = {
  [SET_POSTS](state, data){
        state.posts = data;
        console.log(data);
  }
};

const actions = {
  [FETCH_POSTS]( {commit}, token ){

    api.get(POSTS, token )
    .then( res => {
        console.log(token);
        commit(SET_POSTS, res)
    } );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}

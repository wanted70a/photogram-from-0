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
  SET_LOGIN_TRUE,
  SET_LOGIN_FALSE,
} from './mutations.types'


const state = {
  posts:[],
  name:'stefan',
  isLoading:'',
};

const getters = {
  getPosts(state){
    return state.posts;
  },

  getPostsObject(state){
      let temp = { };
      state.posts.map( item => {
          temp['post'+item.id] = item;
      });
      return temp;
  },

  getIsLoading( state ){
      return state.isLoading;
  }

};

const mutations = {
  [SET_POSTS](state, data){
        state.posts = data;
  },
  [SET_LOGIN_TRUE](state){
      state.isLoading = true;
  },
  [SET_LOGIN_FALSE](state){
      state.isLoading = false;
  },
};

const actions = {
  [FETCH_POSTS]( {commit}, token, state ){
    commit(SET_LOGIN_TRUE);

    api.get(POSTS, token )
    .then( res => {
        let data = res.data.data;
        console.log(data);
        commit(SET_POSTS, data)
        commit(SET_LOGIN_FALSE)
    } );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}

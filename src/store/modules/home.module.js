import Vue from 'vue'
import api from '../../api/api' //import api-request actions
import { POSTS } from '../../api/endpoints'

import {
  //import names for actions
  FETCH_POSTS,
  UPDATE_POSTS_OBJ,
  UPDATE_CURRENT_POST_ID,
  UPDATE_CURRENT_POST,
  UPDATE_CURRENT_COMMENT,
} from './actions.types'

import {
  //import names for mutations
  SET_POSTS_ARR,
  SET_POSTS_OBJ,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  SET_CURRENT_POST_ID,
  SET_CURRENT_POST,
  SET_CURRENT_COMMENT,
} from './mutations.types'


const state = {
  postsArr:[],
  postsObject:{},
  currentPostId:'',
  currentPost:{},
  postComments:[],
  isLoading:'',
};

const getters = {
  getPostsArr( state ){
    return state.postsArr;
  },

  getPostsObject( state ){
      return state.postsObject;
  },

  getIsLoading( state ){
      return state.isLoading;
  },

  getCurrentPostId( state ){
      return state.currentPostId;
  },

  getPostComments( state ){
      return state.postComments;
  },
  getPostObject( state ){
      return state.currentPost
  }

};

const mutations = {
  [SET_POSTS_ARR]( state, data ){
        state.postsArr = data;
  },
  [SET_POSTS_OBJ]( state, data ){
      let temp = { };
      data.map( item => {
          temp['post'+item.id] = item;
      });
      state.postsObject = temp;
  },
  [SET_LOADING_TRUE](state){
      state.isLoading = true;
  },
  [SET_LOADING_FALSE](state){
      state.isLoading = false;
  },
  [SET_CURRENT_POST_ID](state, id){
      state.currentPostId = 'post' + id;
  },
  [SET_CURRENT_POST](state, id){
      state.currentPost = state.postsObject['post'+id];
      state.currentPostId = id;
      console.log(typeof state.currentPostId );
  },
  [SET_CURRENT_COMMENT](state, id){
      state.postComments = state.postsObject['post'+id].comments;
  },
};

const actions = {
    [FETCH_POSTS]( {commit}, token, state ){
        commit(SET_LOADING_TRUE);

        api.get(POSTS, token )
        .then( res => {
            let data = res.data.data;
            console.log(data);
            commit(SET_POSTS_ARR, data);
            commit(SET_POSTS_OBJ, data);
            commit(SET_LOADING_FALSE);
        });
    },
    [UPDATE_CURRENT_POST_ID]({commit}, id){
        commit(SET_CURRENT_POST_ID, id)
    },

    [UPDATE_CURRENT_POST]({commit}, id){
        console.log('ACTUON UPDATRE');
        commit(SET_CURRENT_POST, id)
    },

    [UPDATE_CURRENT_COMMENT]({commit}, id){
        commit(SET_CURRENT_COMMENT, id)
    }
};

export default {
  state,
  getters,
  mutations,
  actions
}

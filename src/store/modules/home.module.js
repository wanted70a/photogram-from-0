import Vue from 'vue'
import { PostsService, CommentsService } from '../../api/api' //import api-request actions
import { POSTS, USER, COMMENTS } from '../../api/endpoints'
import router from '../../router/router.js'

import {
  //import names for actions
  FETCH_POSTS,
  FETCH_COMMENTS,
  UPDATE_POSTS_OBJ,
  UPDATE_CURRENT_POST,
  UPDATE_CURRENT_POST_INDEX,
  UPDATE_LOGED_USER,
  UPDATE_COMMENTS,
  LOAD_MORE_COMMENTS,
  CLEAR_CACHED_COMMENTS,
  FETCH_USER_POSTS,
  UPDATE_POST_DETAILS_STATE,
  UPDATE_COMMENTS_DETAILS_STATE,
  POST_NEW_COMMENT
} from './actions.types'

import {
  //import names for mutations
  SET_POSTS,
  SET_POSTS_OBJ,
  SET_LOADING,
  SET_LOAD_MORE_COMMENTS,
  SET_CURRENT_POST,
  SET_CURRENT_POST_INDEX,
  SET_LOGED_USER,
  SET_COMMENTS,
  SET_CACHED_COMMENTS,
  RESET_DEFAULT_COMMENTS,
  SET_USER_POSTS,
  SET_POST_DETAILS_STATE,
  SET_COMMENTS_DETAILS_STATE,

} from './mutations.types'


const state = {
  test:'',

  posts:{
    list:[],
    currentIndex:'',
    lastIndex:'',
    detailsState:false,
    requestAmount:1
  },

  comments:{
      list:[],
      cached:[],
      loadMore:true,
      visible:false,
      amount:5,
      page:2,
      detailsState:false,
      loadMoreComments:'true',
  },

  isLoading:'',

};

const getters = {
  getPosts( state ){
    return state.posts;
  },

  getCurrentPost( state ){
    return state.posts.list[ state.posts.currentIndex ];
  },

  getCurrentIndex( state ){
    return state.posts.currentIndex;
  },

  getLastIndex( state ){
    return state.posts.list.length - 1;
  },

  getPostDetailsState( state ){
    return state.posts.detailsState;
  },

  getCommentsDetailsState( state ){
    return state.comments.detailsState;
  },

};

const mutations = {
  [SET_POSTS]( state, payload ){
    state.posts.list = payload;
  },
  [SET_COMMENTS]( state, payload ){
    state.posts.list[payload.index] = payload.data;
  },
  [SET_CURRENT_POST_INDEX]( state, index ){
    state.posts.currentIndex = index;
  },
  [SET_POST_DETAILS_STATE]( state, status){
    state.posts.detailsState = status
  },
  [SET_COMMENTS_DETAILS_STATE]( state, status){
    state.comments.detailsState = status
  },
};

const actions = {
    [FETCH_POSTS]( { commit } ){
        //PostsService.get( { params:{ amount:30, page:1, token:window.localStorage.token } } )
        PostsService.get( { amount:30, page:1 }  )
        .then( res => {
          commit( SET_POSTS, res.data.data )
        })
    },
    [UPDATE_CURRENT_POST_INDEX]( { commit }, index ){
      commit( SET_CURRENT_POST_INDEX, index)
    },
    [UPDATE_POST_DETAILS_STATE]( { commit }, status ){
      commit( SET_POST_DETAILS_STATE, status)
    },
    [UPDATE_COMMENTS_DETAILS_STATE]( { commit }, status ){
      commit( SET_COMMENTS_DETAILS_STATE, status)
    },
    [UPDATE_COMMENTS]( { commit, state }, index ){
        CommentsService.getById( { post_id:state.posts.list[ index ], amount:30, page:1 }  )
        .then( res => {
            console.log(res);
          //commit( SET_COMMENTS, {res.data.data } )
        })
    }
};

export default {
  state,
  getters,
  mutations,
  actions
}

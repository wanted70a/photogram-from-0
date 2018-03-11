import Vue from 'vue'
import { PostsService } from '../../api/api' //import api-request actions
import { POSTS, USER, COMMENTS } from '../../api/endpoints'
import router from '../../router/router.js'

import {
  //import names for actions
  FETCH_POSTS,
  FETCH_COMMENTS,
  UPDATE_POSTS_OBJ,
  UPDATE_CURRENT_POST,
  UPDATE_CURRENT_POST_ID,
  UPDATE_LOGED_USER,
  UPDATE_CACHED_COMMENTS,
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
  SET_CURRENT_POST_ID,
  SET_LOGED_USER,
  SET_DEFAULT_COMMENTS,
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
    currentId:'',
    firstPostId:'',
    lastPostId:'',
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

  logedUser:{
    info:{
      about:'',
      email:'',
      followers_count:'',
      following_count:'',
      gender_id:'',
      id:'',
      image:{},
      name:"",
      phone:"",
      posts_count:'',
      username:"",
    },
    posts:[]
  },

};

const getters = {
  getPosts( state ){
    return state.posts;
  },
  getPostsObj( state ){
      let temp = {};
      state.posts.list.map( post => {
        temp[ post.id ] = post;
      });
      return temp;
  },

  getCurrentPost( state, getters ){
    return getters.getPostsObj[state.posts.currentId]
  },

  getFirstPostId( state ){
    return state.posts.list[0].id
  },
  getLastPostId( state ){
    return state.posts.list[ state.posts.list.length - 1 ].id
  },

  getComments( state ){
      let temp = {};
      state.posts.list.map( post => {
        temp[ post.id ] = post.comments;
      });
      return temp;
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
  [SET_CURRENT_POST_ID]( state, payload ){
    state.posts.currentId = payload;
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
        PostsService.get( { params:{ amount:30, page:1, token:window.localStorage.token } } )
        .then( res => {
          commit( SET_POSTS, res.data.data, 'list')
        })
    },
    [UPDATE_CURRENT_POST_ID]( { commit }, payload ){
      commit( SET_CURRENT_POST_ID, payload)
    },
    [UPDATE_POST_DETAILS_STATE]( { commit }, status ){
      commit( SET_POST_DETAILS_STATE, status)
    },
    [UPDATE_COMMENTS_DETAILS_STATE]( { commit }, status ){
      commit( SET_COMMENTS_DETAILS_STATE, status)
    },
};

export default {
  state,
  getters,
  mutations,
  actions
}

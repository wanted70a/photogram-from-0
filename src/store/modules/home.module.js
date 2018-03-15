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
  CLEAR_COMMENTS,
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
  posts:{
    list:[],
    index:'',
    lastIndex:'',
    detailsState:false,
    rqstAmount:20,
    page:1,
    comments:{
        list:[],//for current Comments to be fetched
        cached:[],
        current:{},
        loadMore:true,
        visible:false,
        rqstAmount:5,
        page:1,
        detailsState:false,
        loadMoreComments:'true',
    }
  },


  isLoading:'',

};

const getters = {
  getPosts( state ){
    return state.posts.list;
  },

  getIndex( state ){
    return state.posts.index;
  },

  getLastIndex( state ){
    return state.posts.list.length - 1;
  },

  getCurrentPost( state ){
    return state.posts.list[ state.posts.index ];
  },

  getCurrentComments( state ){
      return 1//state.posts.list[ state.posts.index ].comments;
  },

  getPostDetailsState( state ){
    return state.posts.detailsState;
  },

  getCommentsDetailsState( state ){
    return state.posts.comments.detailsState;
  },

};

const mutations = {
  [SET_POSTS]( state, payload ){
    state.posts.list = payload;
  },
  [SET_COMMENTS]( state, payload ){
    if( payload ){
        state.comments.list = [ ...state.comments.list,...payload ];
        state.comments.page ++;
    }else{
        state.comments.list = [];
        state.comments.page = 1;
        state.comments.loadMoreComments = true;
    }
  },
  [SET_CURRENT_POST_INDEX]( state, index ){
    state.posts.index = index;
  },
  [SET_POST_DETAILS_STATE]( state, status){
    state.posts.detailsState = status
  },
  [SET_COMMENTS_DETAILS_STATE]( state, status){
    state.posts.comments.detailsState = status
  },
};

const actions = {
    [FETCH_POSTS]( { commit } ){
        PostsService.get( { amount:30, page:1 }  )
        .then( res => {
          commit( SET_POSTS, res.data.data )
        })
    },
    [FETCH_COMMENTS]( { commit, state, getters }, id ){
        if( getters.getCurrentPost.comments_count != state.comments.list.length ){
            return CommentsService.get( { post_id:id, amount:state.comments.amount, page:state.comments.page }  )
            .then( res => {
                commit( SET_COMMENTS, res.data.data )
             });
        }else{
            state.comments.loadMoreComments = true;
        }
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
    [CLEAR_COMMENTS]( { commit } ){
        commit( SET_COMMENTS, false );
    },
    [UPDATE_COMMENTS]( { commit }, data ){
        commit( SET_COMMENTS, data );
    }
};

export default {
  state,
  getters,
  mutations,
  actions
}

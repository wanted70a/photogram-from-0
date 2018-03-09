import Vue from 'vue'
import api from '../../api/api' //import api-request actions
import { POSTS, USER, COMMENTS } from '../../api/endpoints'
import router from '../../router/router.js'

import {
  //import names for actions
  FETCH_POSTS,
  FETCH_COMMENTS,
  UPDATE_POSTS_OBJ,
  UPDATE_CURRENT_POST,
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
  SET_POSTS_ARR,
  SET_POSTS_OBJ,
  SET_LOADING,
  SET_LOAD_MORE_COMMENTS,
  SET_CURRENT_POST,
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
  postsArr:[],
  postsObject:{
      posts:{},
      firstPostId:'',
      lastPostId:'',
      postDetailsState:false,
  },
  currentPost:{
      post:{},
      comments:{
          default:[],
          cached:[],
          loadMore:true,
          visible:false,
          amount:5,
          page:2,
          commentsDetailsState:false,
      }
  },
  isLoading:'',
  loadMoreComments:'',
  logedUser:{
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
    userPostsObj:[],
};

const getters = {
  getPostsArr( state ){
    return state.postsArr;
  },

  getPostsObject( state ){
      //return state.postsObject;
      let temp = {
          posts:{ },
          firstPostId:'',
          lastPostId:'',
       };
      let l = state.postsArr.length;
      state.postsArr.map( (item, indx ) => {
          //storing object in postsObject
          temp.posts['post'+item.id] = item;
          //seting first and last post states
          if(indx === 0 ){
              temp.firstPostId = item.id;
          }else if( indx === l-1){
              temp.lastPostId = item.id;
          }
      });
      return temp;
  },
  getUserPostsArr( state ){
      return state.userPostsArr;
  },

  getIsLoading( state ){
      return state.isLoading;
  },

  getCurrentPostId( state ){
      return state.currentPost.post.id;
  },
  getCurrentPost( state, getters ){
      return state.currentPost;
  },

  getPostComments( state ){
      return state.currentPost.comments.default;
  },
  getCachedComments( state ){
      return state.currentPost.comments.cached;
  },
  getPostObject( state ){
      return state.currentPost;
  },

  getLogedUser( state ){
      return state.logedUser;
  },

  getLoadMoreState( state ){
      return state.currentPost.comments.loadMore;
  },

  getPostDetailsState( state ){
      return state.postsObject.postDetailsState;
  },
  getCommentsDetailsState( state ){
      return state.currentPost.comments.commentsDetailsState;
  }

};

const mutations = {
    [SET_LOADING](state, arg){
        state.isLoading = arg;
    },

    [SET_POST_DETAILS_STATE]( state, arg ){
        state.postsObject.postDetailsState = arg
    },
    [SET_COMMENTS_DETAILS_STATE]( state, arg ){
        state.currentPost.comments.commentsDetailsState = arg
    },

    [SET_POSTS_ARR]( state, data ){
        state.postsArr = data;
    },

    [SET_POSTS_OBJ]( state, data ){
      let temp = { };
      let l = data.length;
      data.map( (item, indx ) => {
          //storing object in postsObject
          temp['post'+item.id] = item;
          //seting first and last post states
          if(indx === 0 ){
              state.postsObject.firstPostId = item.id;
          }else if( indx === l-1){
              state.postsObject.lastPostId = item.id;
          }
      });
      state.postsObject.posts = temp;
    },
    [SET_USER_POSTS]( state, data ){
        console.log('SET USER POSTS');
        state.userPostsArr = data;
    },

    [SET_CURRENT_POST](state, id){
      state.currentPost.post = state.postsObject.posts['post'+id];
      state.currentPost.comments.default = state.currentPost.post.comments;
    },

    [SET_DEFAULT_COMMENTS]( state, data ){
        state.currentPost.comments.default =
        [...state.currentPost.comments.default, ...data]
    },
    [RESET_DEFAULT_COMMENTS]( state ){
        state.currentPost.comments.default = state.currentPost.post.comments;
    },
    // [REFRESH_COMMENTS_AFTER_POSTING]( state ){
    //     state.postsObject.posts['post'] = state.currentPost.post.comments;
    // },

    [SET_CACHED_COMMENTS]( state, data ){
      //IF CONCATING ARRAY RETUREND BY RQST
      if ( data ){
          state.currentPost.comments.cached = data
          //[...state.currentPost.comments.cached, ...data]
      }else{
          state.currentPost.comments.cached = [];
      }

      //if alway requesting more and more comments - overwrite array
     // state.currentPost.comments.cached = data;
    },

    [SET_LOAD_MORE_COMMENTS]( state ){
         state.currentPost.comments.loadMore = state.currentPost.comments.default.length < state.currentPost.post.comments_count;
    },

    [SET_LOGED_USER]( state, token ){
      api.get(USER, token )
      .then( res => {
          state.logedUser = res.data.data;
          state.logedUser.postsArr = [];
      })
      .catch( err => console.log(err))
    },
};

const actions = {
    [FETCH_POSTS]( {commit, state}, token, ){
        commit(SET_LOADING, true);

        api.get(POSTS, token )
        .then( res => {
            let data = res.data.data;
            console.log(data);
            commit(SET_POSTS_ARR, data);
            commit(SET_POSTS_OBJ, data);
            commit(SET_LOADING, false);
        });
    },

    [FETCH_COMMENTS]( { commit, state, dispatch, getters }, id){
        let PARAMS =`?post_id=${state.currentPost.post.id}&amount=${state.currentPost.comments.amount}&page=${state.currentPost.comments.page}`;
        let token = api.authHeader();
        return api.get( COMMENTS + PARAMS, token );
    },

    [FETCH_USER_POSTS]( {commit, state}, token, ){
        commit(SET_LOADING, true);

        let PARAMS ='&user_id=2'//`&user_id=${state.logedUser.id}`;
        api.get(POSTS + PARAMS, token )
        .then( res => {
            let data = res.data.data;
            console.log(data);
            commit(SET_POSTS_ARR, data);
            commit(SET_POSTS_OBJ, data);
            //commit(SET_POSTS_OBJ, data);
            commit(SET_LOADING, false);
        });
    },

    [UPDATE_CURRENT_POST]( { commit, dispatch, state }, id){
        commit(SET_CURRENT_POST, id);
        commit(SET_LOAD_MORE_COMMENTS);
        //commit(SET_DEFAULT_COMMENTS, state.currentPost.post.comments);
        dispatch( UPDATE_CACHED_COMMENTS, id );
    },

    [UPDATE_POST_DETAILS_STATE]( { commit }, arg){
        commit(SET_POST_DETAILS_STATE, arg)
    },
    [UPDATE_COMMENTS_DETAILS_STATE]( { commit }, arg){
        commit(SET_COMMENTS_DETAILS_STATE, arg)
    },

    [UPDATE_LOGED_USER]({ commit }, token){
        console.log('UPDATE USER');
        commit(SET_LOGED_USER, token)
    },

    [UPDATE_CACHED_COMMENTS]( { state, commit, dispatch, getters }, id ){
        if( getters.getLoadMoreState ){
            dispatch(FETCH_COMMENTS, id ).
            then( res => {
                let data = res.data.data;
                commit(SET_CACHED_COMMENTS, data)
                state.currentPost.comments.page ++;
            })
        }else{
            commit(SET_CACHED_COMMENTS, false );
        }
    },
    [CLEAR_CACHED_COMMENTS]( { commit, state } ){
        commit(SET_CACHED_COMMENTS, false);
        commit(RESET_DEFAULT_COMMENTS,)
        state.currentPost.comments.page = 2;
    },
    [LOAD_MORE_COMMENTS]( { commit, dispatch, state} ){
        commit(SET_DEFAULT_COMMENTS, state.currentPost.comments.cached );
        dispatch( UPDATE_CACHED_COMMENTS, state.currentPost.post.id );
        commit(SET_LOAD_MORE_COMMENTS);
    },

    [POST_NEW_COMMENT]( { commit, dispatch, state }, params ){
        //commit(SET_LOADING, true);
        let headers = api.authHeader();
        //let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsImlzcyI6Imh0dHA6Ly8xOTIuMTY4LjAuMTU0OjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE1MjA1ODM5MjMsImV4cCI6MTgzNTk0MzkyMywibmJmIjoxNTIwNTgzOTIzLCJqdGkiOiJSOWhORkYyU2taSmVOamp3In0.M5RD9kz_CldpLJhpKyAYzcO2WnfwfmcTJOt2xVHnEuQ";
        //console.log(headers);
        api.post( COMMENTS, params, headers )
        .then( res => {
            let PARAMS =`/${params.post_id}`
            console.log(PARAMS)
            return api.get( '/posts' + PARAMS, headers )
            .then( res=>{
                console.log(res);
                //state.postsObject.posts[`post${params.post_id}`] = res.data.data;
                state.currentPost.comments.default = res.data.data.comments;
                state.test = res.data.data
            } )
        })
    }
};

export default {
  state,
  getters,
  mutations,
  actions
}

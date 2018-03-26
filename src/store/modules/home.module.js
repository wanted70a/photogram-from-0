import Vue from 'vue'
import { PostsService, CommentsService } from '../../api/api' //import api-request actions
import { POSTS, USER, COMMENTS } from '../../api/endpoints'
import router from '../../router/router.js'

import {
  //import names for actions
  FETCH_POSTS,
  FETCH_POST_BY_ID,
  FETCH_POSTS_BY_USER_ID,
  UPDATE_POST_BY_INDX,
  FETCH_COMMENTS,
  POST_NEW_COMMENT,
  UPDATE_POSTS,
  UPDATE_CURRENT_POST_INDEX,
  UPDATE_COMMENTS,
  REFRES_COMMENTS,
  UPDATE_COMMENTS_RQST_PAGE,
  EDIT_COMMENT_BY_ID,
  CLEAR_COMMENTS,
  FETCH_USER_POSTS,
  UPDATE_POST_DETAILS_STATE,
  UPDATE_COMMENTS_DETAILS_STATE,
  UPDATE_EDIT_COMMENTS_STATE,
} from './actions.types'

import {
  //import names for mutations
  SET_POSTS,
  SET_POST_BY_INDX,
  SET_CURRENT_POST,
  SET_CURRENT_POST_INDEX,
  SET_LOADING,
  SET_LOAD_MORE_COMMENTS,
  SET_COMMENTS,
  PUSH_COMMENTS,
  SET_COMMENTS_RQST_PAGE,
  SET_USER_POSTS,
  SET_POST_DETAILS_STATE,
  SET_COMMENTS_DETAILS_STATE,
  SET_EDIT_COMMENTS_STATE,

} from './mutations.types'


const state = {
  posts:{
    list:[],
    index:0,
    lastIndex:'',
    detailsState:false,
    rqstAmount:30,
    page:1,
  },

  comments:{
      visible:false,
      editState:false,
      rqstAmount:5,
      page:1,
      detailsState:false,
      loadMoreComments:'true',
  },


  isLoading:'',

};

const getters = {
  //posts
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
  getPostDetailsState( state ){
    return state.posts.detailsState;
  },

  //comments
  getCurrentComments( state, getters ){
    if (getters.getCurrentPost) {
        return getters.getCurrentPost['comments'];
    }
  },
  getLoadMoreCommentsState( state, getters ){
      if (getters.getCurrentPost) {
          return getters.getCurrentPost.comments_count > getters.getCurrentComments.length;
      }
  },
  getCommentsDetailsState( state ){
    return state.comments.detailsState;
  },
  getCommentsPage( state ){
    return state.comments.page;
  },
  // getEditCommentsState( state ){
  //     return state.comments.editState;
  // }

};

const mutations = {
  //posts
  [SET_POSTS]( state, payload ){
    state.posts.list = payload;
  },
  [SET_POST_BY_INDX]( state, payload ){
    //!payload is Obj with 2 paramas  index and data
    state.posts.list[ payload.index ] = payload.data;
  },
  [SET_CURRENT_POST_INDEX]( state, index ){
    state.posts.index = index;
  },
  [SET_POST_DETAILS_STATE]( state, status){
    state.posts.detailsState = status
  },

  //comments
  [SET_COMMENTS]( state, payload ){
       state.posts.list[ state.posts.index ].comments = payload;
  },

  [PUSH_COMMENTS]( state, payload ){
    let current = state.posts.list[ state.posts.index ].comments;
    state.posts.list[ state.posts.index ].comments = [ ...current,...payload ];
   },

  [SET_COMMENTS_DETAILS_STATE]( state, status){
    state.comments.detailsState = status
  },

  [SET_COMMENTS_RQST_PAGE]( state, payload){
    state.comments.page = payload;
  },
  [SET_EDIT_COMMENTS_STATE]( state, bool ){
      state.comments.editState = bool
  }
};

const actions = {
    //posts
    [FETCH_POSTS]( { commit } ){
        return PostsService.get( { amount:state.posts.rqstAmount, page:state.posts.page }  )

    },
    [FETCH_POST_BY_ID]( { commit }, id ){
        return PostsService.getById( id )
    },
    [FETCH_POSTS_BY_USER_ID]( { commit }, userId ){
        return PostsService.getByUserId( { amount:state.posts.rqstAmount, page:state.posts.page, user_id:userId } )
    },
    [UPDATE_POSTS]( { commit }, payload ){
        commit(SET_POSTS, payload )
    },
    [UPDATE_POST_BY_INDX]( { commit }, payload ){
        //!payload is Obj with 2 paramas  data and index
        commit( SET_POST_BY_INDX, payload );
    },
    [UPDATE_CURRENT_POST_INDEX]( { commit }, index ){
      commit( SET_CURRENT_POST_INDEX, index)
    },
    [UPDATE_POST_DETAILS_STATE]( { commit }, status ){
      commit( SET_POST_DETAILS_STATE, status)
    },

    //comments
    [FETCH_COMMENTS]( { commit, dispatch, state }, id ){
        return CommentsService.get( { post_id:id, amount:state.comments.rqstAmount, page:state.comments.page }  )
    },
    [EDIT_COMMENT_BY_ID]({ commit }, payload ){
        //!payload is Obj with 2 paramas  body and id
        return CommentsService.patch( { id:payload.id, body:payload.body } )
    },
    [UPDATE_COMMENTS_DETAILS_STATE]( { commit }, status ){
      commit( SET_COMMENTS_DETAILS_STATE, status)
    },
    [POST_NEW_COMMENT]( { commit }, payload ){
        return CommentsService.post( payload );
    },

    [UPDATE_COMMENTS]( { commit }, data ){
        commit( PUSH_COMMENTS, data );
    },

    [REFRES_COMMENTS]( { commit }, data ){
        commit( SET_COMMENTS, data );
    },
    [UPDATE_COMMENTS_RQST_PAGE]( { commit }, payload ){
        commit( SET_COMMENTS_RQST_PAGE, payload );
    },

    [UPDATE_EDIT_COMMENTS_STATE]( { commit }, bool ){
        commit( SET_EDIT_COMMENTS_STATE, bool );
    }
};

export default {
  state,
  getters,
  mutations,
  actions
}

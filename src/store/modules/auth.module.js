import Vue from 'vue'
import { AuthService, UserService } from '../../api/api'
import router from '../../router/router.js'

import {
    //MUTATION NAMES
    SET_TOKEN,
    SET_LOGED_USER,
    SET_USER,
    SET_USER_IMAGES,
} from './mutations.types'

import {
    //ACTIONS NAMES
    LOGIN_AUTH,
    FETCH_USER_BY_ID,
    LOGOUT_AUTH,
    UPLOAD_PROFILE_PIC,
    UPDATE_USER_INFO,
} from  './actions.types'


const state = {
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
      }
    },

    user:{
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
    }
}

const getters = {
    getToken(state){
        return window.localStorage.token;
    },

    getUser( state ){
        if(state.user){
            return state.user;
        }
    },
    getLogedUser( state ){
        if(state.logedUser){
            return state.logedUser;
        }
    },

    getMyId( stae ){
        if(  window.localStorage.userId ){
            return window.localStorage.userId
        }
    }
};

const mutations = {
    [SET_TOKEN](state, payload){
        window.localStorage.setItem( 'token', payload )
    },
    [SET_LOGED_USER]( state ){
        AuthService.userInfo()
        .then( res => {
            state.logedUser.info = res.data.data;
            window.localStorage.setItem( 'userId', res.data.data.id );

        })
    },
    [SET_USER]( state, data ){
        state.user.info = data;
    },
    [SET_USER_IMAGES]( state, data ){
        state.logedUser.info.image = data;
    }
};

const actions = {

    [LOGIN_AUTH]({ commit }, payload ){
        AuthService.login( payload )
        .then( res => {
            commit( SET_TOKEN, res.data.token );
            commit( SET_LOGED_USER );
            router.push({ name: 'home' });
        });
    },
    [LOGOUT_AUTH]({ commit }){
        window.localStorage.setItem( 'userId', 0 );
        window.localStorage.setItem( 'token', 0 );
        router.push({ name: 'home' });
    },
    [FETCH_USER_BY_ID]( { commit }, id ){
        return UserService.getById( id )
        .then( res => {
            commit( SET_USER, res.data.data )
        })
    },
    [UPLOAD_PROFILE_PIC]( { commit }, data ){
        return UserService.postProfilePic( data )
        .then( res => {
            commit( SET_LOGED_USER );
            commit( SET_USER_IMAGES, res.data.data.image );
            router.push({ name: 'editProfile' });
        })
    },
    [UPDATE_USER_INFO]( { commit }, data ){
        return UserService.updateUserInfo( data )
        .then( res => {
            router.push( { name: 'profile', params: { id:window.localStorage.userId } });
        })
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}

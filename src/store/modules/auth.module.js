import Vue from 'vue'
import { AuthService, UserService } from '../../api/api'
import router from '../../router/router.js'

import {
    //MUTATION NAMES
    SET_TOKEN,
    SET_LOGED_USER,
    SET_USER,
} from './mutations.types'

import {
    //ACTIONS NAMES
    LOGIN_AUTH,
    FETCH_USER_BY_ID,
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
        return state.user;
    },
    getLogedUser( state ){
        return state.logedUser;
    },

    getMyId( stae ){
        return state.logedUser.info.id
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
        })
    },
    [SET_USER]( state, data ){
        state.user.info = data;
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
    [FETCH_USER_BY_ID]( { commit }, id ){
        return UserService.getById( id )
        .then( res => {
            commit( SET_USER, res.data.data )
        })
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}

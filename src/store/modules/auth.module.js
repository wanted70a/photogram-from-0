import Vue from 'vue'
import { AuthService } from '../../api/api'
import { LOGIN } from '../../api/endpoints'
import router from '../../router/router.js'

import {
    //MUTATION NAMES
    SET_TOKEN,
    SET_LOGED_USER,
} from './mutations.types'

import {
    //ACTIONS NAMES
    LOGIN_AUTH,
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
      },
      posts:[]
    },
}

const getters = {
    getToken(state){
        return window.localStorage.token;
    },

    getLogedUser( state ){
        return state.logedUser;
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
    }
};

const actions = {

    [LOGIN_AUTH]({ commit }, payload ){
        AuthService.login( payload )
        .then( res => {
            commit( SET_TOKEN, res.data.token );
            commit( SET_LOGED_USER );
            router.push({ name: 'home' });
        })
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}

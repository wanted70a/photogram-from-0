import Vue from 'vue'
import api from '../../api/api'
import { LOGIN } from '../../api/endpoints'
import router from '../../router/router.js'

import {
    //MUTATION NAMES
    SET_TOKEN
} from './mutations.types'

import {
    //ACTIONS NAMES
    LOGIN_AUTH,
    FETCH_POSTS,
} from  './actions.types'


const state = {

}

const getters = {
    getToken(state){
        return window.localStorage.token;
    }
};

const mutations = {
    [SET_TOKEN](state, payload){
        window.localStorage.setItem('token', payload)
    }
};

const actions = {

    [LOGIN_AUTH]({ commit, dispatch }, payload ){

        api.post(LOGIN, payload )
        .then( res => {
            commit(SET_TOKEN, res.data.token );
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

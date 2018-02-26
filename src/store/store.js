import Vue from 'vue'
import Vuex from 'vuex'

//import modules
import home from './modules/home.module'
import auth from './modules/auth.module'

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    home,
    auth
  }
})

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { API_URL, LOGIN, POSTS, USER_AUTH, COMMENTS } from './endpoints'

Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = API_URL



const api = {

  get( url, config ) {
    return Vue.axios
      .get( url, config )
      .catch((error) => {
        console.log(error);
      })
  },

  post (url, data, headers ) {
    return Vue.axios
      .post( url, data, headers )
      .catch((error) => {
        console.log(error);
      })
  },

  authHeader(){
      let token     = window.localStorage.token;
      let headers   = {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token
      };
      return headers;
  }

};

export default api;

export const PostsService = {
  get( data ){
    let config = {};
    config.headers = api.authHeader();
    config.params  = data;
    return api.get( POSTS, config )
  },
  getById( id ){
      let config = {};
      config.headers = api.authHeader();
      return api.get( `${POSTS}/${id}`, config )
  }
};

export const AuthService = {
    login( data ){
        return api.post( LOGIN, data )
    },

    userInfo(){
        let config = {};
        config.headers = api.authHeader();
        return api.get( USER_AUTH, config )
    }

};

export const CommentsService = {
    get( data ){
        let config = {};
        config.headers = api.authHeader();
        config.params  = data;
        return api.get( COMMENTS, config );
    },

    post( params ){
        let headers = api.authHeader();
        let data  = params;
        console.log( data );
        return api.post( COMMENTS,  data,  { headers:headers } );
    }
};
export const UserService = {

};

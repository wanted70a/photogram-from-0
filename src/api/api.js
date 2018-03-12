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

  post (url, config ) {
    return Vue.axios
      .post( url, config )
      .catch((error) => {
        console.log(error);
      })
  },

//   query (resource, params) {
//   return Vue.axios
//     .get(resource, params)
//     .catch((error) => {
//       throw new Error(`[RWV] ApiService ${error}`)
//     })
// },
//
// get (resource, slug = '') {
//   return Vue.axios
//     .get(`${resource}/${slug}`)
//     .catch((error) => {
//       throw new Error(`[RWV] ApiService ${error}`)
//     })
// },
//
// post (resource, params) {
//   return Vue.axios.post(`${resource}`, params)
// },
//
// update (resource, slug, params) {
//   return Vue.axios.put(`${resource}/${slug}`, params)
// },
//
// put (resource, params) {
//   return Vue.axios
//     .put(`${resource}`, params)
// },
//
// delete (resource) {
//   return Vue.axios
//     .delete(resource)
//     .catch((error) => {
//       throw new Error(`[RWV] ApiService ${error}`)
//     })
// }

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
    }
};
export const UserService = {

};

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { API_URL, LOGIN, POSTS } from './endpoints'

Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = API_URL



const api = {

  get( url, params ) {
    return Vue.axios
      .get(url, params)
      .catch((error) => {
        console.log(error);
      })
  },

  post (url, params, headers) {
    return Vue.axios
      .post(url, params, headers)
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
      let headers   = { headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      };
      return headers;
  }

};

export default api;

export const PostsService = {
  get( params ){
    return api.get( POSTS, params )
  }
}

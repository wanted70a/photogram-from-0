import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { API_URL } from './endpoints'

Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = API_URL



const api = {

  get (url, params) {
    return Vue.axios
      .get(url,  params)
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

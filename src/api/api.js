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

  post (url, params) {
    return Vue.axios
      .post(url, params)
      .catch((error) => {
        console.log(error);
      })
  },

};


export default api;

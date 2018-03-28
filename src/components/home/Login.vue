<template lang="html">
  <div class="b-login">
       <transition name="slide-down-fade">
           <div v-if='show' class="b-login__background"></div>
       </transition>

      <h1 class='photogram-logo' ><span>photo</span>gram</h1>

      <transition name="fade">
          <form v-if='show' class="b-login__form" @submit.prevent = 'onSubmit'>
              <div class="b-login__form__field">
                  <div class="b-login__form__field__icon">
                      <svg class="b-login__form__field__icon__avatar" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                      	 viewBox="0 0 482.9 482.9" style="enable-background:new 0 0 482.9 482.9;" xml:space="preserve">
                      		<path d="M239.7,260.2c0.5,0,1,0,1.6,0c0.2,0,0.4,0,0.6,0c0.3,0,0.7,0,1,0c29.3-0.5,53-10.8,70.5-30.5
                      			c38.5-43.4,32.1-117.8,31.4-124.9c-2.5-53.3-27.7-78.8-48.5-90.7C280.8,5.2,262.7,0.4,242.5,0h-0.7c-0.1,0-0.3,0-0.4,0h-0.6
                      			c-11.1,0-32.9,1.8-53.8,13.7c-21,11.9-46.6,37.4-49.1,91.1c-0.7,7.1-7.1,81.5,31.4,124.9C186.7,249.4,210.4,259.7,239.7,260.2z
                      			 M164.6,107.3c0-0.3,0.1-0.6,0.1-0.8c3.3-71.7,54.2-79.4,76-79.4h0.4c0.2,0,0.5,0,0.8,0c27,0.6,72.9,11.6,76,79.4
                      			c0,0.3,0,0.6,0.1,0.8c0.1,0.7,7.1,68.7-24.7,104.5c-12.6,14.2-29.4,21.2-51.5,21.4c-0.2,0-0.3,0-0.5,0l0,0c-0.2,0-0.3,0-0.5,0
                      			c-22-0.2-38.9-7.2-51.4-21.4C157.7,176.2,164.5,107.9,164.6,107.3z"/>
                      		<path d="M446.8,383.6c0-0.1,0-0.2,0-0.3c0-0.8-0.1-1.6-0.1-2.5c-0.6-19.8-1.9-66.1-45.3-80.9c-0.3-0.1-0.7-0.2-1-0.3
                      			c-45.1-11.5-82.6-37.5-83-37.8c-6.1-4.3-14.5-2.8-18.8,3.3c-4.3,6.1-2.8,14.5,3.3,18.8c1.7,1.2,41.5,28.9,91.3,41.7
                      			c23.3,8.3,25.9,33.2,26.6,56c0,0.9,0,1.7,0.1,2.5c0.1,9-0.5,22.9-2.1,30.9c-16.2,9.2-79.7,41-176.3,41
                      			c-96.2,0-160.1-31.9-176.4-41.1c-1.6-8-2.3-21.9-2.1-30.9c0-0.8,0.1-1.6,0.1-2.5c0.7-22.8,3.3-47.7,26.6-56
                      			c49.8-12.8,89.6-40.6,91.3-41.7c6.1-4.3,7.6-12.7,3.3-18.8c-4.3-6.1-12.7-7.6-18.8-3.3c-0.4,0.3-37.7,26.3-83,37.8
                      			c-0.4,0.1-0.7,0.2-1,0.3c-43.4,14.9-44.7,61.2-45.3,80.9c0,0.9,0,1.7-0.1,2.5c0,0.1,0,0.2,0,0.3c-0.1,5.2-0.2,31.9,5.1,45.3
                      			c1,2.6,2.8,4.8,5.2,6.3c3,2,74.9,47.8,195.2,47.8s192.2-45.9,195.2-47.8c2.3-1.5,4.2-3.7,5.2-6.3
                      			C447,415.5,446.9,388.8,446.8,383.6z"/>
                      </svg>
                  </div>
                  <input type="text" placeholder="email" v-model='email'>
              </div>
              <div class="b-login__form__field">
                  <div class="b-login__form__field__icon">
                      <svg class='b-login__form__field__icon__lock' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                      	 viewBox="0 0 54 54" style="enable-background:new 0 0 0 0;" xml:space="preserve">
                      	<path d="M43,20.113V14.5C43,6.505,35.822,0,27,0S11,6.505,11,14.5v5.613c-3.401,0.586-6,3.55-6,7.117v19.542
                      		C5,50.757,8.243,54,12.229,54h29.542C45.757,54,49,50.757,49,46.771V27.229C49,23.663,46.401,20.699,43,20.113z M13,14.5
                      		C13,7.607,19.28,2,27,2s14,5.607,14,12.5V20H13V14.5z M47,46.771C47,49.654,44.654,52,41.771,52H12.229C9.346,52,7,49.654,7,46.771
                      		V27.229C7,24.346,9.346,22,12.229,22h29.542C44.654,22,47,24.346,47,27.229V46.771z"/>
                      	<path d="M27,28c-2.206,0-4,1.794-4,4v6c0,2.206,1.794,4,4,4s4-1.794,4-4v-6C31,29.794,29.206,28,27,28z M29,38c0,1.103-0.897,2-2,2
                      		s-2-0.897-2-2v-6c0-1.103,0.897-2,2-2s2,0.897,2,2V38z"/>
                     </svg>
                  </div>
                  <input type="text" placeholder="password" v-model='password'>
              </div>
              <router-link class='b-login__form__forgotPassword' tag='span' :to="{ name: 'forgotPassword' }">Forgot Password</router-link>
              <button class='c-btn c-btn--login c-btn--round c-btn--wide' type="submit">Login</button>
              <router-link tag='div' class='b-login__form__signup' :to="{ name: 'signup' }">Dont have account? <span>SIGN UP</span></router-link>
          </form>
      </transition>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
import { LOGIN_AUTH } from '../../store/modules/actions.types'


export default {
    data(){
        return{
            email:'stefan.milic@diwanee.com',
            password:'1',
            show:false,
        }
    },

    methods:{
        onSubmit(){
            let params = { email:this.email, password:this.password }
            this.$store.dispatch( LOGIN_AUTH, params )
        }
    },

    mounted(){
        this.show = true;
    }


}
</script>

<style lang="css">
</style>

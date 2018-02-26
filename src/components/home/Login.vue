<template lang="html">
  <div class="b-login">
      <form class="b-login__form" @submit.prevent = 'onSubmit'>
          <div class="b-login__form__fiels">
              <input type="text" placeholder="email" v-model='email'>
          </div>
          <div class="b-login__form__fiels">
              <input type="text" placeholder="passwod" v-model='password'>
          </div>
          <button type="submit">Login</button>
          <router-link :to="{ name: 'signup' }">SIGN UP</router-link>
      </form>
      <h3>{{email}}</h3>
      <h3>{{password}}</h3>
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
        }
    },

    methods:{
        onSubmit(){
            let params = {email:this.email, password:this.password}
            this.$store.dispatch(LOGIN_AUTH, params)
        }
    }


}
</script>

<style lang="css">
</style>

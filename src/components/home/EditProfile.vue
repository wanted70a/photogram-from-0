<template lang="html">
  <div class="p-edit-profile">
      <router-view></router-view>
      <div class="c-user-info">
          <div class="c-user-info__avatar">
              <div class="c-user-info__title">
                  <h2>Edit Profile</h2>
              </div>
              <div class="c-user-info__media">
                  <img :src="IMG + getLogedUser.info.image.profile " alt="">
              </div>
              <router-link :to="{ name: 'uploadPhoto', params: {} }" tag='button' class='c-btn c-btn--change-photo'>Change Photo</router-link>
          </div>
      </div>

      <form class="p-edit-profile__form"  @submit.prevent = 'submitForm'>
          <div class="p-edit-profile__form__field">
              <input type="text"  v-model='name'>
          </div>
          <div class="p-edit-profile__form__field">
              <input type="text"  v-model='about'>
          </div>
          <div class="p-edit-profile__form__section-start">
              <h2>Personal Data</h2>
          </div>
          <div class="p-edit-profile__form__field">
              <input type="text" v-model='phone'>
          </div>
          <div class="p-edit-profile__form__field">
              <input type="text" v-model='gender'>
          </div>
          <button type="submit" class='c-btn c-btn--update-profile'>Save Data</button>
      </form>
  </div>
</template>

<script>
import { UPDATE_USER_INFO } from '../../store/modules/actions.types'
import { IMG } from '../../api/endpoints'
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            IMG:IMG,
            name:'',
            about:'',
            phone:'',
            gender:'',
        }
    },
    computed:{
        ...mapGetters([
            'getUser',
            'getMyId',
            'getLogedUser',
        ])
    },
    methods:{
        submitForm(){
            this.$store.dispatch(UPDATE_USER_INFO,{ name:this.name, about:this.about, phone:this.phone, gender_id:this.gender } )
        }
    },

    created(){
        this.name   =  this.getLogedUser.info.name;
        this.about  =  this.getLogedUser.info.about;
        this.phone  =  this.getLogedUser.info.phone;
        this.gender =  this.getLogedUser.info.gender_id;
    }

    //props:['userInfo']
}
</script>

<style lang="css">
</style>

<template lang="html">
  <div class="p-edit-profile">
      <router-view></router-view>
      <div class="c-user-info">
          <div class="c-user-info__avatar">
              <div class="c-user-info__name">
                  <h2>Edit Profile</h2>
              </div>
              <div class="c-user-info__media">
                  <img :src="IMG + getUser.info.image.profile " alt="">
              </div>
              <router-link :to="{ name: 'uploadPhoto', params: {} }" tag='div' class='c-btn c-btn--change-photo'>Change Photo</router-link>
              <button type="button" > </button>
          </div>
      </div>

      <form class="p-edit-profile__form"  @submit.prevent = 'submitForm'>
          <div class="p-edit-profile__form__field">
              <input type="text" :placeholder="getUser.info.name" v-model='name'>
          </div>
          <div class="p-edit-profile__form__field">
              <input type="text" :placeholder="getUser.info.about" v-model='about'>
          </div>
          <div class="p-edit-profile__form__section-start">
              <h2>Personal Data</h2>
          </div>
          <div class="p-edit-profile__form__field">
              <input type="text" :placeholder="getUser.info.phone" v-model='phone'>
          </div>
          <div class="p-edit-profile__form__field">
              <input type="text" :placeholder="getUser.info.gender_id === 1 ?'Musko' :'Zensko' " v-model='gender'>
          </div>
          <button type="submit" class='c-btn c-btn--update-profile'>Save Data</button>
      </form>
  </div>
</template>

<script>
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
            'getMyId'
        ])
    },
    methods:{
        submitForm(){
            console.log('EDIT PROFILE', this.name, this.about, this.phone, this.gender);
        }
    }
    //props:['userInfo']
}
</script>

<style lang="css">
</style>

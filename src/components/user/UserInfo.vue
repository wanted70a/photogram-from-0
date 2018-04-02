<template lang="html">
  <div class="b-user-info">
      <div class="c-user-info">
          <div class="c-user-info__avatar">
              <div class="c-user-info__name">
                  <h2>{{getUser.info.name}}</h2>
              </div>
              <div class="c-user-info__media">
                  <img :src="IMG + getUser.info.image.profile " alt="">
              </div>
          </div>
          <div class="c-user-info__stats">

              <p> <span class='num'>{{getUser.info.posts_count}}</span>    <span class='txt'> posts</span></p>
              <p><span class='num'>{{getUser.info.followers_count}}</span> <span class='txt'> followers </span></p>
              <p><span class='num'>{{getUser.info.following_count}}</span> <span class='txt'> following </span></p>
          </div>

          <div class="c-user-info__about">
              <p>{{getUser.info.about}}</p>
          </div>
          <div v-if=" getUser.info.id == getMyId" class="c-user-info__edit">
              <router-link :to="{ name: 'editProfile', params: {} }" tag='button' class='btn btn--edit-profile'>EDIT PROFILE</router-link>
          </div>
      </div>
  </div>
</template>

<script>
import { IMG } from '../../api/endpoints'
import { mapGetters } from 'vuex'


export default {
    data(){
        return {
            IMG:IMG,
        }
    },
    computed:{
        ...mapGetters([
            'getUser',
            'getMyId'
        ])
    }
    //props:['userInfo']
}
</script>

<style lang="css">
.c-user-info{
    padding-top:8rem;
}

</style>

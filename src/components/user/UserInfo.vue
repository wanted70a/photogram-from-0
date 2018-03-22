<template lang="html">
  <div class="b-user-info">
      <div class="c-user-info">
          <div class="c-user-info__avatar">
              <div class="c-user-info__name">
                  <h2>{{getUser.info.name}}</h2>
              </div>
              <div class="c-user-info__media">
                  <img src="" alt="">
              </div>
          </div>
          <div class="c-user-info__stats">
              <p>POSTS: {{getUser.info.posts_count}}</p>
              <p>FOLLOWERS: {{getUser.info.followers_count}}</p>
              <p>FOLLOWING: {{getUser.info.following_count}}</p>
          </div>
          <div class="c-user-info__about">
              <p>{{getUser.info.about}}</p>
          </div>
          <div v-if=" getUser.info.id == getMyId" class="c-user-info__edit">
              <button type="button" class='btn btn--edit-profile'>EDTI PROFILE</button>
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

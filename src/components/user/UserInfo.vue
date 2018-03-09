<template lang="html">
  <div class="b-user-info">
      <div class="c-user-info">
          <div class="c-user-info__avatar">
              <div class="c-user-info__name">
                  <h2>{{getLogedUser.name}}</h2>
              </div>
              <div class="c-user-info__media">
                  <img src="" alt="">
              </div>
          </div>
          <div class="c-user-info__stats">
              <p>POSTS: {{getLogedUser.posts_count}}</p>
              <p>FOLLOWERS: {{getLogedUser.followers_count}}</p>
              <p>FOLLOWING: {{getLogedUser.following_count}}</p>
          </div>
          <div class="c-user-info__about">
              <p>{{getLogedUser.about}}</p>
          </div>
          <div class="c-user-info__edit">
              <button type="button" class='btn btn--edit-profile'>EDTI PROFILE</button>
          </div>
      </div>
  </div>
</template>

<script>
import { IMG } from '../../api/endpoints'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'


export default {
    data(){
        return {
            IMG:IMG,
        }
    },
    computed:{
        ...mapGetters([
            'getLogedUser'
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

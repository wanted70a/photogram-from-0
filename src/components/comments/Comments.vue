<template lang="html">
 <div class="b-comments-all">
     <div class="b-comments-all__inner">
         <!-- <h2>KOMENTARI</h2>
         <div class="b-comments-all__list" v-for='(comment, index) in getPostComments'>
             <div class="b-comments-all__comment">
                 <h3>{{comment.body}}</h3>
                 <hr>
             </div>
         </div> -->
         <div class="mo-post__comments">
             <div class="mo-post__comments__comment"  v-for='(comment, index) in getPostComments' :key='comment.id'>
                 <div class="mo-post__comments__comment__img">
                     <img :src="IMG + comment.user_image.avatar" alt="">
                 </div>
                 <p class="mo-post__comments__comment__text">{{comment.body}}</p>
             </div>
         </div>
     </div>
 </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { IMG } from '../../api/endpoints'

//import PostComeents from './PostComments.vue'
export default {
    data(){
        return {
            IMG:IMG,
        }
    },
    methods:{

    },
    computed:{
        ...mapGetters([
            'getPostsObject',
            'getCurrentPostId',
            'getPostComments'
        ])
    },

    created(){

    },
    watch: {
    '$route' (to, from) {
      // react to route changes...
    }
  }
}
</script>

<style lang="css">

</style>

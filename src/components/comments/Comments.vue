<template lang="html">
 <div class="b-comments-all">
     <div class="b-comments-all__inner">
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
import { mapState } from 'vuex'
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

<template lang="html">
    <div>
        <app-header></app-header>
        <!-- <router-view></router-view> -->
        <div class="b-posts-list l">
             <transition-group  name="card" tag="div" class="b-posts-list__inner" >
                 <app-single-post v-for='( post, index ) in getPosts' :post='post' :index='index' :comments='post.comments.slice(0,3)' :key="post.id"></app-single-post>
             </transition-group>
        </div>
        <app-post-details v-if='getPostDetailsState'></app-post-details>
        <app-comment-details v-if='getCommentsDetailsState'></app-comment-details>
    </div>
</template>

<script>
import { FETCH_POSTS, UPDATE_LOGED_USER, UPDATE_POSTS } from '../../store/modules/actions.types.js'
import { mapGetters } from 'vuex'

import SinglePost from '../posts/SinglePost.vue'
import PostDetails from '../posts/PostDetails.vue'
import Header from '../home/Header.vue'
import CommentDetails from '../comments/CommentDetails.vue'

export default {
    components:{
        'app-single-post':              SinglePost,
        'app-header':                   Header,
        'app-post-details':             PostDetails,
        'app-comment-details':          CommentDetails,
    },

    computed:{
        ...mapGetters([
            'getPosts',
            'getPostDetailsState',
            'getCommentsDetailsState'
        ])
    },

    methods:{
        scrollFunction(e){
            console.log('scrolllll');
            console.log(e);
            //let containerHeight  = document.querySelector('.b-comments-details__inner').offsetHeight;
            let top              = e.target.scrollTop;
            let scrollHeight     = e.target.scrollHeight;
            console.log('t',top);
            console.log('h',scrollHeight);
            if( ( scrollHeight - top ) <= ( containerHeight ) ){
                this.loadMoreComments();
            }
        }
    },

    beforeCreate(){
      this.$store.dispatch( FETCH_POSTS )
      .then( res => {
          this.$store.dispatch( UPDATE_POSTS, res.data.data )
      })
      //this.$store.dispatch( UPDATE_LOGED_USER, headers );
    },

    created: function () {
        document.body.addEventListener('scroll', this.scrollFunction);
        console.log(document.body);
    },
    destroyed: function () {
        document.body.removeEventListener('scroll', this.scrollFunction);
    }
}
</script>

<style lang="css">

</style>

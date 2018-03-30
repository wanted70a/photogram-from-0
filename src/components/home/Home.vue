<template lang="html">
    <div>
        <app-header v-if='true'></app-header>
        <!-- <router-view></router-view> -->
        <div class="b-posts-list l">
            <transition name='fade'>
                <div class='loader loader--home-posts' v-if='fetching'>LOADING...</div>
            </transition>
             <transition-group  name="card" tag="div" class="b-posts-list__inner" >
                 <app-single-post v-for='( post, index ) in getPosts' :post='post' :index='index' :comments='post.comments.slice(0,3)' :key="post.id"></app-single-post>
             </transition-group>
        </div>
        <app-post-details v-if='getPostDetailsState'></app-post-details>
        <app-comment-details v-if='getCommentsDetailsState'></app-comment-details>
    </div>
</template>

<script>
import { FETCH_POSTS, UPDATE_LOGED_USER, UPDATE_POSTS, UPDATE_POSTS_RQST_PAGE, APPEND_POSTS } from '../../store/modules/actions.types.js'
import { mapGetters } from 'vuex'

import SinglePost from '../posts/SinglePost.vue'
import PostDetails from '../posts/PostDetails.vue'
import Header from '../home/Header.vue'
import CommentDetails from '../comments/CommentDetails.vue'

export default {
    data(){
        return{
            fetching:false,
        }
    },
    components:{
        'app-single-post':              SinglePost,
        'app-header':                   Header,
        'app-post-details':             PostDetails,
        'app-comment-details':          CommentDetails,
    },

    computed:{
        ...mapGetters([
            'getPosts',
            'getPostsPage',
            'getPostDetailsState',
            'getCommentsDetailsState'
        ])
    },

    methods:{
        scrollFunction(e){
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                    // you're at the bottom of the page
                    this.fetching = true;
                    this.$store.dispatch( UPDATE_POSTS_RQST_PAGE, (this.getPostsPage + 1 ) );
                    this.$store.dispatch( FETCH_POSTS )
                    .then( res => {
                        this.$store.dispatch( APPEND_POSTS, res.data.data )
                        this.fetching = false;
                    })
            }
        }
    },

    beforeCreate(){
      this.$store.dispatch( FETCH_POSTS )
      .then( res => {
          this.$store.dispatch( UPDATE_POSTS, res.data.data );
          this.fetching = false;
      })
      //this.$store.dispatch( UPDATE_LOGED_USER, headers );
    },

    created: function () {
        document.addEventListener('scroll', this.scrollFunction);

    },
    destroyed: function () {
        document.removeEventListener('scroll', this.scrollFunction);
    }
}
</script>

<style lang="css">

</style>

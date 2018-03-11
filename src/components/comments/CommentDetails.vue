<template lang="html">
    <!-- <router-link :to="{ name: 'home'}" tag='div' class='b-comments-details' > -->
    <div class="b-comments-details" @click='updateCommentsDetailsState( false )'>
        <div class="b-comments-details__inner" @click.stop=''>
            <!-- <app-comments-list :comments='getPostComments'></app-comments-list> -->
            <div class="b-comments-list">
              <p>KOMENTARIIIII</p>
                <app-single-comment v-for='comment in getCurrentPost.comments' :comment='comment'></app-single-comment>
            </div>
            <div class="mo-post__comments__load-more">
                <button type="button" class='btn btn--load-more' v-if='getLoadMoreState' @click='updateCommentsData()'>LOAD MORE</button>
                <p v-else >ALL COMMENTS LOADED</p>
            </div>
            <app-add-comment></app-add-comment>
        </div>
    </div>
    <!-- </router-link> -->
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { IMG } from '../../api/endpoints'
import { CLEAR_CACHED_COMMENTS, LOAD_MORE_COMMENTS, UPDATE_COMMENTS_DETAILS_STATE } from '../../store/modules/actions.types.js'
import  api from '../../api/api.js'
import SingleComment from './SingleComment.vue'
import AddComment from './AddComment.vue'

//import PostComeents from './PostComments.vue'
export default {
    data(){
        return {
            IMG:IMG,
        }
    },
    methods:{
        ...mapActions([
            UPDATE_COMMENTS_DETAILS_STATE,
        ]),

        updateCommentsData(){
            this.$store.dispatch( LOAD_MORE_COMMENTS );
        },

        clearCachedComments( ){
            this.$store.dispatch( CLEAR_CACHED_COMMENTS, '' );
        }
    },
    computed:{
        ...mapGetters([
            'getPostComments',
            'getPostsObject',
            'getCurrentPostId',
            'getCurrentPost',
            'getLoadMoreState'
        ])
    },

    watch: {
        '$route' (to, from) {
          // react to route changes...
          console.log('ROUTE CHANGED');
        }
    },
    beforeRouteLeave (to, from, next) {
        // called when the route that renders this component is about to
        // be navigated away from.
        // has access to `this` component instance.
        this.clearCachedComments()
        next();
    },
    components:{
        'app-single-comment':SingleComment,
        'app-add-comment': AddComment,
    },
}
</script>

<style lang="css">

</style>

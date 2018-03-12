<template lang="html">
    <div class="b-comments-details" @click='updateCommentsDetailsState( false )'>
        <div class="b-comments-details__inner" @click.stop=''>
            <div class="b-comments-list">
                <app-single-comment v-for='comment in getCurrentComments' :comment='comment'></app-single-comment>
            </div>
            <div class="mo-post__comments__load-more">
                <button type="button" class='btn btn--load-more' v-if='true' @click='updateCommentsData()'>LOAD MORE</button>
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
import { FETCH_COMMENTS, UPDATE_COMMENTS, UPDATE_COMMENTS_DETAILS_STATE } from '../../store/modules/actions.types.js'
//import  { CommentsService } from '../../api/api.js'
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
          console.log(this.getCurrentPost);
            this.$store.dispatch( FETCH_COMMENTS, { postId:this.getCurrentPost.id } );
        },

        clearCachedComments( ){
            this.$store.dispatch( CLEAR_CACHED_COMMENTS, '' );
        }
    },
    computed:{
        ...mapGetters([
            'getCurrentComments',
            'getCurrentIndex',
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

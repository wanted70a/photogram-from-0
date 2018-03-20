<template lang="html">
    <div class="b-comments-details" @click='hidePostDetails()'>
        <div class="b-comments-details__inner" @click.stop=''>
            <div class="b-comments-list">
                <app-single-comment v-for='comment in getCurrentComments' :comment='comment' :key='comment.id'></app-single-comment>
            </div>
            <div class="mo-post__comments__load-more">
                <button type="button" class='btn btn--load-more' v-if='true' @click='updateCommentsData()'>LOAD MORE</button>
                <p v-else >ALL COMMENTS LOADED</p>
            </div>
            <app-add-comment></app-add-comment>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { IMG } from '../../api/endpoints'
import { FETCH_COMMENTS, CLEAR_COMMENTS, UPDATE_COMMENTS_DETAILS_STATE, UPDATE_POST_DETAILS_STATE, UPDATE_POST_BY_ID, FETCH_POST_BY_ID, UPDATE_COMMENTS } from '../../store/modules/actions.types.js'
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
          hidePostDetails( ){
              //this.$store.dispatch( CLEAR_COMMENTS );
              this.$store.dispatch( UPDATE_COMMENTS_DETAILS_STATE, false  );
              this.$store.dispatch( UPDATE_POST_DETAILS_STATE, false  );
          },

          updateCommentsData(){
            this.$store.dispatch( FETCH_COMMENTS, this.getCurrentPost.id )
            .then( res => {
                this.$store.dispatch( UPDATE_COMMENTS, { name:1 } )
            })
            // this.$store.dispatch( FETCH_POST_BY_ID, this.getCurrentPost.id )
            // .then( res => {
            //     this.$store.dispatch( UPDATE_POST_BY_ID, { index:this.getIndex, data:res.data.data }  );
            // })
          },
      },

    computed:{
        ...mapGetters([
            'getCurrentComments',
            'getCurrentPost',
            'getLoadMoreState',
            'getIndex'
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

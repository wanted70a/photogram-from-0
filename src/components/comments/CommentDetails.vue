<template lang="html">
<transition name="slide-right-fade">
    <div class="b-comments-details" @click='hidePostDetails()'>
        <transition name="fetch">
            <div class='loader' v-if='fetching'>LOADING...</div>
        </transition>
        <div class="b-comments-details__inner" @click.stop='' v-on:scroll="scrollFunction">
            <app-add-comment></app-add-comment>
            <div class="b-comments-list">
                <app-single-comment v-for='comment in getCurrentComments' :comment='comment' :key='comment.id'></app-single-comment>
            </div>
            <div class="mo-post__comments__load-more">
                <!-- <button type="button" class='btn btn--load-more' v-if='getLoadMoreCommentsState' @click='loadMoreComments()'>LOAD MORE</button> -->
                <p v-if='!getLoadMoreCommentsState' >ALL COMMENTS LOADED</p>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { IMG } from '../../api/endpoints'
import { FETCH_COMMENTS, UPDATE_COMMENTS_DETAILS_STATE, UPDATE_COMMENTS_RQST_PAGE, UPDATE_POST_DETAILS_STATE, UPDATE_POST_BY_ID, FETCH_POST_BY_ID, UPDATE_COMMENTS, REFRES_COMMENTS } from '../../store/modules/actions.types.js'
//import  { CommentsService } from '../../api/api.js'
import SingleComment from './SingleComment.vue'
import AddComment from './AddComment.vue'

//import PostComeents from './PostComments.vue'
export default {
    data(){
        return {
            IMG:IMG,
            fetching:false,
        }
    },

    methods:{
          hidePostDetails( ){
              this.$store.dispatch( UPDATE_COMMENTS_RQST_PAGE, 1 );
              this.$store.dispatch( UPDATE_COMMENTS_DETAILS_STATE, false  );
              this.$store.dispatch( UPDATE_POST_DETAILS_STATE, false  );
              this.$store.dispatch( REFRES_COMMENTS, this.getCurrentComments.slice(0,5) );
          },

          loadMoreComments(){
              if ( this.getLoadMoreCommentsState ) {
                  this.fetching = true;
                  this.$store.dispatch( UPDATE_COMMENTS_RQST_PAGE, ( this.getCommentsPage + 1 )  )
                  this.$store.dispatch( FETCH_COMMENTS, this.getCurrentPost.id )
                      .then( res => {
                          this.$store.dispatch( UPDATE_COMMENTS, res.data.data )
                          this.fetching = false;
                  })

              }
          },

          scrollFunction(e){
              let containerHeight  = document.querySelector('.b-comments-details__inner').offsetHeight;
              let top              = e.target.scrollTop;
              let scrollHeight     = e.target.scrollHeight;
              if( ( scrollHeight - top ) <= ( containerHeight ) ){
                  this.loadMoreComments();
              }
          }
      },

    computed:{
        ...mapGetters([
            'getCurrentComments',
            'getCommentsPage',
            'getLoadMoreCommentsState',
            'getCurrentPost',
            'getIndex',
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

    created(){
        document.body.classList.add('fixedBody');
    },
    destroyed(){
        document.body.classList.remove('fixedBody');
    }
}
</script>

<style lang="css">
    .test{
        color: red;
        position: absolute;
        text-align: center;
        top: 17rem;
        z-index: 6;
        width: calc(100% - 30px);
    }
</style>

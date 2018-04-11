<template lang="html">
<transition name="fade2">
    <div class="mo-post" v-if='fade'>
        <div class="mo-post-inner" @click.stop=''>
            <div class="mo-post__avatar">
                <router-link :to="{ name: 'profile', params: { id:post.user_id } }" tag='div' class="mo-post__avatar__profile-picture">
                    <img :src='IMG + post.user_image.avatar'  alt="">
                </router-link>
                <h3 class='mo-post__avatar__name'>{{post.username}}</h3>
            </div>

            <div class="mo-post__media" @click='showPostDetails( index )'>
                <div class="mo-post__delete">
                    <div class="mo-post__delete__icon" v-if='post.user_id == getMyId && !deleteMode' @click.stop='toggleDelete'>
                        <svg class="mo-post__delete__icon--trash"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm415.2 56.7L394.8 467c-1.6 25.3-22.6 45-47.9 45H101.1c-25.3 0-46.3-19.7-47.9-45L32.8 140.7c-.4-6.9 5.1-12.7 12-12.7h358.5c6.8 0 12.3 5.8 11.9 12.7z"/>
                        </svg>
                    </div>
                    <div v-if='deleteMode'  class="mo-post__delete__dialog" @click.stop=''>
                        <div class='mo-post__delete__dialog__inner'>
                            <p>Sure To Delete ?</p>
                            <button type="button" class='c-btn c-btn--delete-post'  @click.stop='deletePost( post.id )' >YES</button>
                            <button type="button" class='c-btn c-btn--delete-post' @click.stop='toggleDelete'>NO</button>
                        </div>

                    </div>
                </div>

                <img v-if="post.type_id == 1" :src='IMG + post.media.medium' alt="">
                <div class="" v-else>
                    <video :src="IMG + post.media"  :poster="IMG + post.thumbnail"></video>
                </div>
            </div>


            <div class="mo-post__stats">
                <div class='mo-post__stats__icon' @click='showPostComments( index )' >
                    <svg class='mo-post__stats__comment' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"/>
                    </svg>
                    {{post.comments_count}}
                </div>
                <div class='mo-post__stats__icon'>
                    <svg class=' mo-post__stats__like' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
                    </svg>
                </div>
                <div class='mo-post__stats__icon mo-post__stats__icon--last'>
                    <svg class=' mo-post__stats__liked' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
                    </svg>
                    <span> {{post.likes_count}}</span>
                </div>
            </div>

            <div class="mo-post__comments">
                <div class="b-comments-list">
                    <app-single-comment v-if='comments' v-for='comment in comments' :comment='comment' :postIndex='index' :postUserId='post.user_id' :key='comment.id'></app-single-comment>
                </div>
            </div>

            <div class="mo-post__comments__cta">
                <div v-if='post.comments.length > 3'>
                    <p @click='showPostComments( index )'>View All Comments</p>
                </div>
            </div>
            <div class="mo-post__slider-controls">
                <div class="mo-post__next" @click.prevent='nextPost( index )'>
                    <button type="button" class='c-btn--next-post'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"/></svg>
                    </button>
                </div>
                <div class="mo-post__prev" @click.prevent='prevPost( index )'>
                    <button type="button" class='c-btn--prev-post'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"/></svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import { IMG } from '../../api/endpoints'
import { mapGetters } from 'vuex'
import {  UPDATE_CURRENT_POST_INDEX, UPDATE_POSTS, FETCH_POSTS, FETCH_POSTS_BY_USER_ID,POP_POST_BY_INDEX, UPDATE_COMMENTS, UPDATE_POST_DETAILS_STATE, UPDATE_COMMENTS_DETAILS_STATE, UPDATE_COMMENTS_RQST_PAGE, FETCH_COMMENTS, DELETE_POST_BY_ID, UPDATE_POSTS_RQST_PAGE } from '../../store/modules/actions.types'
import SingleComment from '../comments/SingleComment.vue'
import AddComment from '../comments/AddComment.vue'

var w = window.innerWidth;
console.log(w);

export default {
    data(){
        return {
            IMG:IMG,
            fade:true,
            deleteMode:false,
        }
    },
    methods:{
        showPostDetails( index ){
            if(w > 1024){
                this.$store.dispatch( UPDATE_CURRENT_POST_INDEX, index  );
                this.$store.dispatch( UPDATE_COMMENTS_DETAILS_STATE, false  );
                this.$store.dispatch( UPDATE_POST_DETAILS_STATE, true  );
            }
        },
        showPostComments( index ){
            this.$store.dispatch( UPDATE_CURRENT_POST_INDEX, index  );
            this.$store.dispatch( UPDATE_COMMENTS_DETAILS_STATE, true  );
            this.$store.dispatch( UPDATE_POST_DETAILS_STATE, false  );
            if ( this.getLoadMoreCommentsState ) {
                this.$store.dispatch( UPDATE_COMMENTS_RQST_PAGE, ( this.getCommentsPage + 1 )  )
                this.$store.dispatch( FETCH_COMMENTS, this.getCurrentPost.id )
                    .then( res => {
                        this.$store.dispatch( UPDATE_COMMENTS, res.data.data )
                })
            }
        },
        nextPost( index ){
            if( index === this.getLastIndex ){
                return;
            }else{
                this.fade = false;
                this.$store.dispatch( UPDATE_CURRENT_POST_INDEX, ( index + 1 ) )

                this.fade = true;
            }
        },
        prevPost( index ){
            if( index === 0 ){
                return;
            }else {
                this.fade = false;
                this.$store.dispatch( UPDATE_CURRENT_POST_INDEX, ( index-1 ) )

                this.fade = true;
            }
        },
        deletePost( id ){
            this.$store.dispatch( DELETE_POST_BY_ID, id )
            .then( res=> {
                this.$store.dispatch(POP_POST_BY_INDEX, this.index )
            })
        },
        toggleDelete(){
            this.deleteMode = !this.deleteMode
        }

    },
    computed:{
        ...mapGetters([
            'getPostDetailsState',
            'getLoadMoreCommentsState',
            'getCommentsPage',
            'getPosts',
            'getCurrentPost',
            'getLastIndex',
            'getMyId'
        ]),
    },
    components:{
        'app-single-comment':   SingleComment,
        'app-add-comment':      AddComment,
    },
    props:['post', 'index', 'comments']
}
</script>
<style>

</style>

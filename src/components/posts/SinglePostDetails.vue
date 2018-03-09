<template lang="html">
<div class="mo-post">
    <div class="mo-post-inner" @click.stop=''>
        <div class="mo-post__avatar">
            <div class="mo-post__avatar__profile-picture">
                <img :src='IMG + post.user_image.avatar'  alt="">
            </div>
            <h3 class='mo-post__avatar__name'>{{post.username}}</h3>
        </div>
        <router-link :to="{ name: 'postDetails' }" tag='div' class="mo-post__media" @click.native='updateCurrentPost( post.id )'>
            <img v-if="post.type_id == 1" :src='IMG + post.media.medium' alt="">
            <div class="" v-else>
                <video :src="IMG + post.media" autoplay poster="posterimage.jpg"></video>
            </div>
        </router-link>

        <div class="mo-post__stats">
            <span>Comm: {{post.comments_count}}</span>
            <span>- Like This Post - </span>
            <span> Likes: {{post.likes_count}}</span>
        </div>

        <div class="mo-post__comments">
            <div class="mo-post__comments__comment"  v-for='(comment, index) in post.comments'  v-if=' index < 3' :key='comment.id'>
                <div class="mo-post__comments__comment__img">
                    <img :src="IMG + comment.user_image.avatar" alt="">
                </div>
                <p class="mo-post__comments__comment__text">{{comment.body}}</p>
            </div>
        </div>

        <div class="mo-post__comments__cta">
            <!-- <router-link :to="{ name: 'comments' }" v-if='post.comments.length > 0'> -->
            <div v-if='post.comments.length > 0'>
                <p @click='showPostComments( post.id )'>View All Comments</p>
            </div>
            </router-link>
            <p v-else>Be First To Comment</p>
            <h2 @click='showPostDetails( post.id)'>POST DETILS</h2>
            <!-- <router-link :to="{ name: 'postDetails' }">
                <p @click='updateCurrentPost(post.id)'>POST DETAILS</p>
            </router-link> -->
        </div>
        <div class="mo-post__slider-controls">
            <div class="mo-post__next" @click.prevent='nextPost(getCurrentPostId)'>
                <button type="button" class='btn btn--next-post'>NEXT</button>
            </div>
            <div class="mo-post__prev" @click.prevent='prevPost(getCurrentPostId)'>
                <button type="button" class='btn btn--prev-post'>PREV</button>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import { IMG } from '../../api/endpoints'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import {  UPDATE_CURRENT_POST, UPDATE_CACHED_COMMENTS, UPDATE_POST_DETAILS_STATE, UPDATE_COMMENTS_DETAILS_STATE } from '../../store/modules/actions.types'
import SinglePostComment from '../comments/SinglePostComment.vue'
export default {
    data(){
        return {
            IMG:IMG,
        }
    },
    methods:{
        ...mapActions([
            UPDATE_CACHED_COMMENTS,
            UPDATE_CURRENT_POST,
            UPDATE_POST_DETAILS_STATE,
            UPDATE_COMMENTS_DETAILS_STATE,
        ]),

        showPostDetails( id ){
            this.updateCurrentPost( id );
            this.updateCommentsDetailsState( false );
            this.updatePostDetailsState( true );

        },
        showPostComments( id ){
            this.updateCurrentPost( id );
            this.updatePostDetailsState( false );
            this.updateCommentsDetailsState( true );
        },
        nextPost( id ){
            let postId = 'post'+(id - 1);

            if(this.getPostsObject.lastPostId === id){
                return;
            }else if( this.getPostsObject.hasOwnProperty( postId )){
                this.$store.dispatch(UPDATE_CURRENT_POST, id-1)
            }else{
                this.nextPost( id-1)
            }
        },
        prevPost( id ){
            let postId = 'post'+(id + 1);

            if(this.getPostsObject.firstPostId === id){
                return;
            }else if( this.getPostsObject.hasOwnProperty( postId )){
                this.$store.dispatch(UPDATE_CURRENT_POST, id+1)
            }else{
                this.prevPost( id+1 )
            }
        },

    },
    computed:{
        ...mapGetters([
            'getPostsObject',
            'getPostObject',
            //'getCurrentPostId',
            //'getPostDetailsState',
        ])
    },
    components:{
        //'app-post-comments':SinglePostComment
    },
    //props:['post']
}
</script>

<template lang="html">
<div class="mo-post">
    <div class="mo-post-inner" @click.stop=''>
        <div class="mo-post__avatar">
            <div class="mo-post__avatar__profile-picture">
                <img :src='IMG + post.user_image.avatar'  alt="">
            </div>
            <h3 class='mo-post__avatar__name'>{{post.username}}</h3>
        </div>

        <div class="mo-post__media" @click='showPostDetails( post.id )'>
            <img v-if="post.type_id == 1" :src='IMG + post.media.medium' alt="">
            <div class="" v-else>
                <video :src="IMG + post.media" autoplay poster="posterimage.jpg"></video>
            </div>
        </div>


        <div class="mo-post__stats">
            <span @click='showPostComments( post.id )'>Comm: {{post.comments_count}}</span>
            <span>- Like This Post - </span>
            <span> Likes: {{post.likes_count}}</span>
        </div>

        <div class="mo-post__comments">
            <div class="b-comments-list">
                <app-single-comment v-if='comments' v-for='comment in comments' :comment='comment'></app-single-comment>
            </div>
            <!-- <app-comments-list v-if=' post.comments && !getPostDetailsState' :comments='post.comments.slice(0,3)'></app-comments-list>
            <app-comments-list v-else :comments='post.comments'></app-comments-list> -->
        </div>

        <div class="mo-post__comments__cta">
            <div v-if='post.comments.length > 0'>
                <p @click='showPostComments( post.id )'>View All Comments</p>
            </div>
        </div>
        <div class="mo-post__slider-controls">
            <div class="mo-post__next" @click.prevent='nextPost(post.id)'>
                <button type="button" class='btn btn--next-post'>NEXT</button>
            </div>
            <div class="mo-post__prev" @click.prevent='prevPost(post.id)'>
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
import SingleComment from '../comments/SingleComment.vue'
import AddComment from '../comments/AddComment.vue'
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
            }else if( this.getPostsObject.posts.hasOwnProperty( postId )){
                this.$store.dispatch(UPDATE_CURRENT_POST, id-1)
            }else{
                this.nextPost( id-1)
            }
        },
        prevPost( id ){
            let postId = 'post'+(id + 1);

            if(this.getPostsObject.firstPostId === id){
                return;
            }else if( this.getPostsObject.posts.hasOwnProperty( postId )){
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
            'getCurrentPostId',
            'getPostDetailsState',
        ]),
    },
    components:{
        'app-single-comment':SingleComment,
        'app-add-comment'  :AddComment,
    },
    props:['post', 'comments']
}
</script>

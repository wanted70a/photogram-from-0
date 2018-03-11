<template lang="html">
<div class="mo-post">
    <div class="mo-post-inner" @click.stop=''>
        <div class="mo-post__avatar">
            <div class="mo-post__avatar__profile-picture">
                <img :src='IMG + post.user_image.avatar'  alt="">
            </div>
            <h3 class='mo-post__avatar__name'>{{post.username}}</h3>
        </div>

        <div class="mo-post__media" @click='showPostDetails( post )'>
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
import {  UPDATE_CURRENT_POST_ID, UPDATE_CACHED_COMMENTS, UPDATE_POST_DETAILS_STATE, UPDATE_COMMENTS_DETAILS_STATE } from '../../store/modules/actions.types'
import SingleComment from '../comments/SingleComment.vue'
import AddComment from '../comments/AddComment.vue'
export default {
    data(){
        return {
            IMG:IMG,
        }
    },
    methods:{
        showPostDetails( post ){
            this.$store.dispatch( UPDATE_CURRENT_POST_ID, post.id  );
            this.$store.dispatch( UPDATE_COMMENTS_DETAILS_STATE, false  );
            this.$store.dispatch( UPDATE_POST_DETAILS_STATE, true  );

        },
        showPostComments( id ){
            //this.updateCurrentPost( id );
            this.$store.dispatch( UPDATE_COMMENTS_DETAILS_STATE, true  );
            this.$store.dispatch(UPDATE_POST_DETAILS_STATE, false  );
        },
        nextPost( id ){
            if( this.getLastPostId === id){
                return;
            }else if( this.getPostsObj.hasOwnProperty( id-1 ) ){
                this.$store.dispatch( UPDATE_CURRENT_POST_ID, id-1 )
            }else{
                this.nextPost( id-1 )
            }
        },
        prevPost( id ){
            if( this.getFirstPostId === id){
                return;
            }else if( this.getPostsObj.hasOwnProperty( id+1 ) ){
                this.$store.dispatch( UPDATE_CURRENT_POST_ID, id+1 )
            }else{
                this.prevPost( id+1 )
            }
        },

    },
    computed:{
        ...mapGetters([
            'getPostDetailsState',
            'getPostsObj',
            'getFirstPostId',
            'getLastPostId',
        ]),
    },
    components:{
        'app-single-comment':SingleComment,
        'app-add-comment'  :AddComment,
    },
    props:['post', 'comments']
}
</script>

<template lang="html">
<div class="mo-post">
    <div class="mo-post-inner" @click.stop=''>
        <div class="mo-post__avatar">
            <div class="mo-post__avatar__profile-picture">
                <img :src='IMG + post.user_image.avatar'  alt="">
            </div>
            <h3 class='mo-post__avatar__name'>{{post.username}}</h3>
        </div>

        <div class="mo-post__media" @click='showPostDetails( index )'>
            <img v-if="post.type_id == 1" :src='IMG + post.media.medium' alt="">
            <div class="" v-else>
                <video :src="IMG + post.media"  :poster="IMG + post.thumbnail"></video>
            </div>
        </div>


        <div class="mo-post__stats">
            <span @click='showPostComments( index )'>Comm: {{post.comments_count}}</span>
            <span>- Like This Post - </span>
            <span> Likes: {{post.likes_count}}</span>
        </div>

        <div class="mo-post__comments">
            <div class="b-comments-list">
                <app-single-comment v-if='comments' v-for='comment in comments' :comment='comment' :key='comment.id'></app-single-comment>
            </div>
        </div>

        <div class="mo-post__comments__cta">
            <div v-if='post.comments.length > 0'>
                <p @click='showPostComments( index )'>View All Comments</p>
            </div>
        </div>
        <div class="mo-post__slider-controls">
            <div class="mo-post__next" @click.prevent='nextPost( index )'>
                <button type="button" class='btn btn--next-post'>NEXT</button>
            </div>
            <div class="mo-post__prev" @click.prevent='prevPost( index )'>
                <button type="button" class='btn btn--prev-post'>PREV</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { IMG } from '../../api/endpoints'
import { mapGetters } from 'vuex'
import {  UPDATE_CURRENT_POST_INDEX, UPDATE_COMMENTS, UPDATE_POST_DETAILS_STATE, UPDATE_COMMENTS_DETAILS_STATE } from '../../store/modules/actions.types'
import SingleComment from '../comments/SingleComment.vue'
import AddComment from '../comments/AddComment.vue'
export default {
    data(){
        return {
            IMG:IMG,
        }
    },
    methods:{
        showPostDetails( index ){
            this.$store.dispatch( UPDATE_CURRENT_POST_INDEX, index  );
            this.$store.dispatch( UPDATE_COMMENTS_DETAILS_STATE, false  );
            this.$store.dispatch( UPDATE_POST_DETAILS_STATE, true  );

        },
        showPostComments( index ){
            this.$store.dispatch( UPDATE_CURRENT_POST_INDEX, index  );
            this.$store.dispatch( UPDATE_COMMENTS_DETAILS_STATE, true  );
            this.$store.dispatch( UPDATE_POST_DETAILS_STATE, false  );
            this.$store.dispatch( UPDATE_COMMENTS, this.getCurrentPost.comments  );
        },
        nextPost( index ){
            if( index === this.getLastIndex ){
                return;
            }else{
                this.$store.dispatch( UPDATE_CURRENT_POST_INDEX, ( index + 1 ) )
            }
        },
        prevPost( index ){
            if( index === 0 ){
                return;
            }else {
                this.$store.dispatch( UPDATE_CURRENT_POST_INDEX, ( index-1 ) )
            }
        },

    },
    computed:{
        ...mapGetters([
            'getPostDetailsState',
            'getPosts',
            'getCurrentPost',
            'getLastIndex',
        ]),
    },
    components:{
        'app-single-comment':SingleComment,
        'app-add-comment'  :AddComment,
    },
    props:['post', 'index', 'comments']
}
</script>

<template lang="html">
<div class="mo-post">
    <div class="mo-post-inner">
        <div class="mo-post__avatar">
            <div class="mo-post__avatar__profile-picture">
                <img :src='IMG + post.user_image.avatar'  alt="">
            </div>
            <h3 class='mo-post__avatar__name'>{{post.username}}</h3>
        </div>
        <div class="mo-post__media">
            <img v-if="post.type_id == 1" :src='IMG + post.media.medium' alt="">
            <div class="" v-else>
                <video :src="IMG + post.media" autoplay poster="posterimage.jpg"></video>
            </div>
        </div>
        <div class="mo-post__stats">
            <span>Comm</span>
            <span>Like</span>
            <span>Likes: {{post.likes_count}}</span>
        </div>
        <div class="mo-post__comments">
            <div class="mo-post__comments__comment"  v-for='(comment, index) in post.comments'  v-if='index < 3' :key='comment.id'>
                <div class="mo-post__comments__comment__img">
                    <img :src="IMG + comment.user_image.avatar" alt="">
                </div>
                <p class="mo-post__comments__comment__text">{{comment.body}}</p>
            </div>
        </div>

        <div class="mo-post__comments__cta">
            <router-link :to="{ name: 'comments' }" v-if='post.comments.length > 0'>
                <p @click='updateCurrentComment(post.id)'>View All Comments</p>
            </router-link>
            <p v-else>Be First To Comment</p>
            <router-link :to="{ name: 'postDetails' }">
                <p @click='updateCurrentPost(post.id)'>POST DETAILS</p>
            </router-link>
        </div>
        <div class="mo-post__slider-controls">
            <div class="mo-post__next" @click='updateCurrentPost(getCurrentPostId - 1)'>
                NEXT
            </div>
            <div class="mo-post__prev" @click='updateCurrentPost(getCurrentPostId + 1)'>
                PREV
            </div>
        </div>
    </div>

</div>
</template>

<script>
import { IMG } from '../../api/endpoints'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { UPDATE_CURRENT_POST_ID, UPDATE_CURRENT_COMMENT,  UPDATE_CURRENT_POST } from '../../store/modules/actions.types'
export default {
    data(){
        return {
            IMG:IMG,
        }
    },
    methods:{
        ...mapActions([
            UPDATE_CURRENT_COMMENT,
            UPDATE_CURRENT_POST
        ])
    },
    computed:{
        ...mapGetters([
            'getPostsObject',
            'getCurrentPostId'
        ])
    },
    props:['post']
}
</script>

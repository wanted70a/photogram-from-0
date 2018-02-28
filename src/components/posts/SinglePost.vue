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
                <p @click='viewComments(post.id)'>View All Comments</p>
            </router-link>
            <p v-else>Be First To Comment</p>
        </div>
    </div>
</div>
</template>

<script>
import { IMG } from '../../api/endpoints'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
import { SET_CURRENT_POST_ID } from '../../store/modules/mutations.types'
export default {
    data(){
        return {
            IMG:IMG,
        }
    },
    methods:{
        viewComments( id ){
            this.$store.commit(SET_CURRENT_POST_ID, id)
        }
    },
    computed:{
        ...mapGetters([
            'getPostsObject',
        ])
    },
    props:['post']
}
</script>

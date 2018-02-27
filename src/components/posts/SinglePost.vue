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
            <div class="mo-post__comments__comment"  v-for='(comment, index) in post.comments' :key='comment.id' v-if='index < 3'>
                <span><img :src="IMG + comment.user_image.avatar" alt=""></span>
                <span>{{comment.body}}</span>
            </div>
        </div>

        <div class="mo-post__comments__all">
            <p @click='viewComments(post.id)'>see all comments</p>
        </div>
    </div>
</div>
</template>

<script>
import { IMG } from '../../api/endpoints'
import { mapGetters } from 'vuex'
//import PostComeents from './PostComments.vue'
export default {
    data(){
        return {
            IMG:IMG,
        }
    },
    methods:{
        viewComments( id ){
            console.log(this.getPostsObject['post'+ id]);
        }
    },
    computed:{
        ...mapGetters([
            'getPostsObject',
        ])
    },
    components:{
        //'app-post-comments':PostComeents
    },
    props:['post']
}
</script>

<template lang="html">
    <div>
        <app-header></app-header>
        <router-view></router-view>
        <div class="b-posts-list__inner">
            <app-single-post v-for='post in getPostsObject.posts' :post='post' :comments='post.comments.slice(0,3)'></app-single-post>
        </div>
        <app-post-details v-if='getPostDetailsState'></app-post-details>
        <app-comment-details v-if='getCommentsDetailsState'></app-comment-details>
    </div>
</template>

<script>
import { FETCH_POSTS, UPDATE_LOGED_USER } from '../../store/modules/actions.types.js'
import  api from '../../api/api.js'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

import SinglePost from '../posts/SinglePost.vue'
import PostDetails from '../posts/PostDetails.vue'
import Header from '../home/Header.vue'
import CommentDetails from '../comments/CommentDetails.vue'

export default {
    components:{
        'app-single-post':              SinglePost,
        'app-header':                   Header,
        'app-post-details':             PostDetails,
        'app-comment-details':          CommentDetails,
    },

    computed:{
        ...mapGetters([
            'getToken',
            'getPostsObject',
            'getPostsArr',
            'getPostDetailsState',
            'getCommentsDetailsState'
        ])
    },

    methods:{
        ...mapActions([
            FETCH_POSTS,
            UPDATE_LOGED_USER
        ]),
    },

    beforeCreate(){
        let headers = api.authHeader();
        console.log(headers);
        this.$store.dispatch( FETCH_POSTS, headers );
        this.$store.dispatch( UPDATE_LOGED_USER, headers );
    },
}
</script>

<style lang="css">

</style>

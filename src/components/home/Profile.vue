<template lang="html">
    <div class="">
        <app-header></app-header>
        <app-user-info :userInfo='getLogedUser'></app-user-info>
        <app-posts-list :postsList='getPostsArr'></app-posts-list>
        <app-post-details v-if='getPostDetailsState'></app-post-details>
        <app-comment-details v-if='getCommentsDetailsState'></app-comment-details>
    </div>

</template>

<script>
import PostsList from '../posts/PostsList.vue'
import Header from './Header.vue'
import UserInfo from '../user/UserInfo.vue'
import PostDetails from '../posts/PostDetails.vue'
import CommentDetails from '../comments/CommentDetails.vue'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { IMG } from '../../api/endpoints'
import  api from '../../api/api.js'
import { FETCH_USER_POSTS } from '../../store/modules/actions.types.js'

export default {
    components:{
        'app-posts-list':         PostsList,
        'app-header':             Header,
        'app-user-info':          UserInfo,
        'app-post-details':       PostDetails,
        'app-comment-details':    CommentDetails,
    },

    computed:{
        ...mapGetters([
            'getLogedUser',
            'getPostsArr',
            'getPostDetailsState',
            'getCommentsDetailsState'
        ])
    },

    methods:{
        ...mapActions([
            FETCH_USER_POSTS,
        ]),
    },

    // beforeCreate(){
    //     let headers = api.authHeader();
    //     console.log(headers);
    //     this.$store.dispatch( FETCH_USER_POSTS, headers );
    //     //this.$store.dispatch( UPDATE_LOGED_USER, headers );
    // },
}
</script>

<style lang="css">

</style>

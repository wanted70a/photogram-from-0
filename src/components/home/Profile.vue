<template lang="html">
    <div class="">
        <app-header></app-header>
        <app-user-info></app-user-info>
        <div class="b-posts-list l">
            <div class="b-posts-list__inner">
                <app-single-post v-for='( post, index ) in getPosts' :post='post' :index='index' :comments='post.comments.slice(0,3)' :key="post.id"></app-single-post>
            </div>
        </div>
        <app-post-details v-if='getPostDetailsState'></app-post-details>
        <app-comment-details v-if='getCommentsDetailsState'></app-comment-details>
    </div>
</template>

<script>
import SinglePost from '../posts/SinglePost.vue'
import Header from './Header.vue'
import UserInfo from '../user/UserInfo.vue'
import PostDetails from '../posts/PostDetails.vue'
import CommentDetails from '../comments/CommentDetails.vue'
import { mapGetters } from 'vuex'
import { IMG } from '../../api/endpoints'
import  api from '../../api/api.js'
import { UPDATE_POSTS, FETCH_POSTS_BY_USER_ID, FETCH_USER_BY_ID, UPDATE_POSTS_RQST_PAGE } from '../../store/modules/actions.types.js'

export default {
    components:{
        'app-single-post':        SinglePost,
        'app-header':             Header,
        'app-user-info':          UserInfo,
        'app-post-details':       PostDetails,
        'app-comment-details':    CommentDetails,
    },

    computed:{
        ...mapGetters([
            'getPosts',
            'getUser',
            'getLogedUser',
            'getPostDetailsState',
            'getCommentsDetailsState'
        ])
    },

    methods:{
        loadData( id ){
            this.$store.dispatch( UPDATE_POSTS_RQST_PAGE, 1 );
            this.$store.dispatch( FETCH_POSTS_BY_USER_ID, id )
            .then( res => {
                this.$store.dispatch( UPDATE_POSTS, res.data.data )
            });
            this.$store.dispatch( FETCH_USER_BY_ID, id );

        }
    },
    watch: {
        '$route.params.id': function (newId, oldId) {
            this.loadData( newId );
         }
    },

    created() {
        let id = this.$route.params.id;
        this.loadData( id );
    },
}
</script>

<style lang="css">

</style>

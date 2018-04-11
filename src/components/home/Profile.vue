<template lang="html">
    <div class="">
        <app-header></app-header>
        <router-view></router-view>
        <app-user-info></app-user-info>
        <div class="b-posts-list__display-options">
            <svg @click='toggleDisplay( false )' version="1.1" class='b-posts-list__display-options__block' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            	 width="25px" height="25px" viewBox="0 0 459 459" style="enable-background:new 0 0 459 459;" xml:space="preserve">
            	 <g>
            		<path d="M0,382.5h459v-51H0V382.5z M0,255h459v-51H0V255z M0,76.5v51h459v-51H0z"/>
            	</g>
            </svg>
            <svg class="b-posts-list__display-options--grid" @click='toggleDisplay( true )' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M149.333 56v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V56c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zm181.334 240v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm32-240v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24zm-32 80V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm-205.334 56H24c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zm386.667-56H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm0 160H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zM181.333 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24z"/>
            </svg>

        </div>
        <div class="b-posts-list l">
            <div  :class='{ "b-posts-list__inner": grid, "b-posts-list__inner--block": !grid }'>
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
    data(){
        return{
            grid:true,
        }
    },
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
            console.log('DATA UPDATE - Profile.vue');
        },
        toggleDisplay( state ){
            this.grid = state
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

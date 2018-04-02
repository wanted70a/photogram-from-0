<template lang="html">
    <div class="">
        <app-header></app-header>
        <!-- <router-view></router-view> -->
        <app-user-info></app-user-info>
        <div class="b-posts-list__display-options">
            <svg @click='toggleDisplay( true )' version="1.1" class='b-posts-list__display-options__block' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            	 width="25px" height="25px" viewBox="0 0 459 459" style="enable-background:new 0 0 459 459;" xml:space="preserve">
            	 <g>
            		<path d="M0,382.5h459v-51H0V382.5z M0,255h459v-51H0V255z M0,76.5v51h459v-51H0z"/>
            	</g>
            </svg>
            <svg  @click='toggleDisplay( false )' version="1.1" class='b-posts-list__display-options__grid' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            	 width="25px" height="25px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
            	<g>
            		<path d="M234.667,0h-224C4.8,0,0,4.8,0,10.667v224c0,5.867,4.8,10.667,10.667,10.667h224c5.867,0,10.667-4.8,10.667-10.667v-224
            			C245.333,4.8,240.533,0,234.667,0z M224,224H21.333V21.333H224V224z"/>
            		<path d="M501.333,0H288c-5.867,0-10.667,4.8-10.667,10.667v224c0,5.867,4.8,10.667,10.667,10.667h213.333
            			c5.867,0,10.667-4.8,10.667-10.667v-224C512,4.8,507.2,0,501.333,0z M490.667,224h-192V21.333h192V224z"/>
            		<path d="M234.667,266.667h-224C4.8,266.667,0,271.467,0,277.333v224C0,507.2,4.8,512,10.667,512h224
            			c5.867,0,10.667-4.8,10.667-10.667v-224C245.333,271.467,240.533,266.667,234.667,266.667z M224,490.667H21.333V288H224V490.667z
            			"/>
            		<path d="M501.333,266.667H288c-5.867,0-10.667,4.8-10.667,10.667v224c0,5.867,4.8,10.667,10.667,10.667h213.333
            			C507.2,512,512,507.2,512,501.333v-224C512,271.467,507.2,266.667,501.333,266.667z M490.667,490.667h-192V288h192V490.667z"/>
            	</g>
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

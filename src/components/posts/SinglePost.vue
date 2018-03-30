<template lang="html">
<transition name="fade2">
    <div class="mo-post" v-if='fade'>
        <div class="mo-post-inner" @click.stop=''>
            <div class="mo-post__avatar">
                <router-link :to="{ name: 'profile', params: { id:post.user_id } }" tag='div' class="mo-post__avatar__profile-picture">
                    <img :src='IMG + post.user_image.avatar'  alt="">
                </router-link>
                <h3 class='mo-post__avatar__name'>{{post.username}}</h3>
            </div>

            <div class="mo-post__media" @click='showPostDetails( index )'>
                <img v-if="post.type_id == 1" :src='IMG + post.media.medium' alt="">
                <div class="" v-else>
                    <video :src="IMG + post.media"  :poster="IMG + post.thumbnail"></video>
                </div>
            </div>


            <div class="mo-post__stats">
                <div class='mo-post__stats__icon' @click='showPostComments( index )' >
                    <svg class='mo-post__stats__comment' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    	 width="511.626px" height="511.627px" viewBox="0 0 511.626 511.627" style="enable-background:new 0 0 511.626 511.627;"
                    	 xml:space="preserve">
                    	<path d="M477.364,127.481c-22.839-28.072-53.864-50.248-93.072-66.522c-39.208-16.274-82.036-24.41-128.479-24.41
                    		c-46.442,0-89.269,8.136-128.478,24.41c-39.209,16.274-70.233,38.446-93.074,66.522C11.419,155.555,0,186.15,0,219.269
                    		c0,28.549,8.61,55.299,25.837,80.232c17.227,24.934,40.778,45.874,70.664,62.813c-2.096,7.611-4.57,14.842-7.426,21.7
                    		c-2.855,6.851-5.424,12.467-7.708,16.847c-2.286,4.374-5.376,9.23-9.281,14.555c-3.899,5.332-6.849,9.093-8.848,11.283
                    		c-1.997,2.19-5.28,5.801-9.851,10.848c-4.565,5.041-7.517,8.33-8.848,9.853c-0.193,0.097-0.953,0.948-2.285,2.574
                    		c-1.331,1.615-1.999,2.419-1.999,2.419l-1.713,2.57c-0.953,1.42-1.381,2.327-1.287,2.703c0.096,0.384-0.094,1.335-0.57,2.854
                    		c-0.477,1.526-0.428,2.669,0.142,3.429v0.287c0.762,3.234,2.283,5.853,4.567,7.851c2.284,1.992,4.858,2.991,7.71,2.991h1.429
                    		c12.375-1.526,23.223-3.613,32.548-6.279c49.87-12.751,93.649-35.782,131.334-69.094c14.274,1.523,28.074,2.283,41.396,2.283
                    		c46.442,0,89.271-8.135,128.479-24.414c39.208-16.276,70.233-38.444,93.072-66.517c22.843-28.072,34.263-58.67,34.263-91.789
                    		C511.626,186.154,500.207,155.555,477.364,127.481z M445.244,292.075c-19.896,22.456-46.733,40.303-80.517,53.529
                    		c-33.784,13.223-70.093,19.842-108.921,19.842c-11.609,0-23.98-0.76-37.113-2.286l-16.274-1.708l-12.277,10.852
                    		c-23.408,20.558-49.582,36.829-78.513,48.821c8.754-15.414,15.416-31.785,19.986-49.102l7.708-27.412l-24.838-14.27
                    		c-24.744-14.093-43.918-30.793-57.53-50.114c-13.61-19.315-20.412-39.638-20.412-60.954c0-26.077,9.945-50.343,29.834-72.803
                    		c19.895-22.458,46.729-40.303,80.515-53.531c33.786-13.229,70.089-19.849,108.92-19.849c38.828,0,75.13,6.617,108.914,19.845
                    		c33.783,13.229,60.62,31.073,80.517,53.531c19.89,22.46,29.834,46.727,29.834,72.802S465.133,269.615,445.244,292.075z"/>
                    </svg>
                    {{post.comments_count}}
                </div>
                <div class='mo-post__stats__icon'>
                    <svg class=' mo-post__stats__like' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    	 viewBox="0 0 51.997 51.997" style="enable-background:new 0 0 51.997 51.997;" xml:space="preserve" >
                    <path d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905
                    	c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478
                    	c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014
                    	C52.216,18.553,51.97,16.611,51.911,16.242z"/>
                    </svg>
                </div>
                <div class='mo-post__stats__icon mo-post__stats__icon--last'>
                    <svg class=' mo-post__stats__liked' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    	 viewBox="0 0 51.997 51.997" style="enable-background:new 0 0 51.997 51.997;" xml:space="preserve" >
                    <path d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905
                    	c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478
                    	c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014
                    	C52.216,18.553,51.97,16.611,51.911,16.242z"/>
                    </svg>
                    <span> {{post.likes_count}}</span>
                </div>
            </div>

            <div class="mo-post__comments">
                <div class="b-comments-list">
                    <app-single-comment v-if='comments' v-for='comment in comments' :comment='comment' :postIndex='index' :postUserId='post.user_id' :key='comment.id'></app-single-comment>
                </div>
            </div>

            <div class="mo-post__comments__cta">
                <div v-if='post.comments.length > 3'>
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
</transition>
</template>

<script>
import { IMG } from '../../api/endpoints'
import { mapGetters } from 'vuex'
import {  UPDATE_CURRENT_POST_INDEX, UPDATE_COMMENTS, UPDATE_POST_DETAILS_STATE, UPDATE_COMMENTS_DETAILS_STATE, UPDATE_COMMENTS_RQST_PAGE, FETCH_COMMENTS } from '../../store/modules/actions.types'
import SingleComment from '../comments/SingleComment.vue'
import AddComment from '../comments/AddComment.vue'
export default {
    data(){
        return {
            IMG:IMG,
            fade:true,
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
            if ( this.getLoadMoreCommentsState ) {
                this.$store.dispatch( UPDATE_COMMENTS_RQST_PAGE, ( this.getCommentsPage + 1 )  )
                this.$store.dispatch( FETCH_COMMENTS, this.getCurrentPost.id )
                    .then( res => {
                        this.$store.dispatch( UPDATE_COMMENTS, res.data.data )
                })
            }
        },
        nextPost( index ){
            if( index === this.getLastIndex ){
                return;
            }else{
                this.fade = false;
                this.$store.dispatch( UPDATE_CURRENT_POST_INDEX, ( index + 1 ) )

                this.fade = true;
            }
        },
        prevPost( index ){
            if( index === 0 ){
                return;
            }else {
                this.fade = false;
                this.$store.dispatch( UPDATE_CURRENT_POST_INDEX, ( index-1 ) )

                this.fade = true;
            }
        },

    },
    computed:{
        ...mapGetters([
            'getPostDetailsState',
            'getLoadMoreCommentsState',
            'getCommentsPage',
            'getPosts',
            'getCurrentPost',
            'getLastIndex',
        ]),
    },
    components:{
        'app-single-comment':   SingleComment,
        'app-add-comment':      AddComment,
    },
    props:['post', 'index', 'comments']
}
</script>

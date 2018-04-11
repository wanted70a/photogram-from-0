<template lang="html">
    <transition name='fade'>
        <div class="mo-comment">
            <router-link :to="{ name: 'profile', params: { id:comment.user_id } }" tag='div' class="mo-comment__img">
                <img :src="IMG + comment.user_image.avatar" alt="">
            </router-link>
            <p class="mo-comment__text">{{comment.body}}</p>
            <div class='mo-comment__edit' v-if='comment.user_id == getMyId' @click.stop='toggleEdit( )'>
                <div class="mo-comment__edit__icon">
                    <svg class="mo-comment__edit__icon--pen"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"/>
                    </svg>
                </div>
            </div>
            <div class='mo-comment__delete' v-if='comment.user_id == getMyId || comment.user_id == postUserId ' @click='deleteComment()'>
                <div class="mo-comment__delete__icon">
                    <svg class="mo-comment__delete__icon--trash"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm415.2 56.7L394.8 467c-1.6 25.3-22.6 45-47.9 45H101.1c-25.3 0-46.3-19.7-47.9-45L32.8 140.7c-.4-6.9 5.1-12.7 12-12.7h358.5c6.8 0 12.3 5.8 11.9 12.7z"/>
                    </svg>
                </div>
            </div>
            <input v-show='editMode' ref="editComment" type="text" name="" v-model='input' @keyup.enter='submitEdit()'>
        </div>
    </transition>
</template>

<script>
import { IMG } from '../../api/endpoints'
import { CommentsService } from '../../api/api'
import { mapGetters } from 'vuex'
import { EDIT_COMMENT_BY_ID, FETCH_COMMENTS, REFRES_COMMENTS, UPDATE_CURRENT_POST_INDEX, UPDATE_COMMENTS_RQST_PAGE, DELETE_COMMENT_BY_ID } from '../../store/modules/actions.types'

export default {
    data(){
        return {
            IMG:IMG,
            editMode:false,
            input:this.$props.comment.body,
            show:false,
        }
    },

    methods:{
        toggleEdit( ){
            this.editMode = !this.editMode;
            this.$nextTick(() => this.$refs.editComment.focus())
            console.log(this.$refs.editComment.focus);
        },

        submitEdit( initialVal ){
            if( this.input === this.$props.comment.body ){
                //if data did not change do not fetch
                this.editMode = false;
                return;
            }
            else if( this.input === ''){
                this.input = this.$props.comment.body
                this.editMode = false;
                return;
            }
            this.$store.dispatch( EDIT_COMMENT_BY_ID, { id:this.$props.comment.id, body:this.input } )
            .then( res => {
                this.$store.dispatch(UPDATE_COMMENTS_RQST_PAGE, 1);
                this.$store.dispatch( FETCH_COMMENTS, this.getCurrentPost.id )
                    .then( res => {
                        this.$store.dispatch( REFRES_COMMENTS, res.data.data )
                })
            })
            this.editMode = false;

        },

        deleteComment(){
            this.$store.dispatch(DELETE_COMMENT_BY_ID, this.$props.comment.id )
            .then( res=>{
                this.$store.dispatch( FETCH_COMMENTS, this.getCurrentPost.id )
                    .then( res => {
                        this.$store.dispatch( REFRES_COMMENTS, res.data.data )
                })
            })
        }

    },

    computed:{
        ...mapGetters([
            'getMyId',
            'getCurrentPost',

        ]),
    },

    beforeDestroy(){
        this.show = false;
    },

    beforeCreate(){
        this.show = true;
    },

    props:['comment', 'postIndex', 'postUserId']
}
</script>

<style lang="css">
</style>

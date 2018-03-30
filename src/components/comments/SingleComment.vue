<template lang="html">
    <transition name='fade'>
        <div class="mo-comment">
            <router-link :to="{ name: 'profile', params: { id:comment.user_id } }" tag='div' class="mo-comment__img">
                <img :src="IMG + comment.user_image.avatar" alt="">
            </router-link>
            <p class="mo-comment__text">{{comment.body}}</p>
            <button class='mo-comment__edit' v-if='comment.user_id == getMyId' @click.stop='toggleEdit( )'><b>EDIT</b></button>
            <p class='mo-comment__delete' v-if='comment.user_id == getMyId || comment.user_id == postUserId ' @click='deleteComment()'><b>X</b></p>
            <input v-show='editMode' type="text" name="" v-model='input' @keyup.enter='submitEdit()'>
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
        },

        submitEdit( initialVal ){
            if( this.input === this.$props.comment.body ){
                //if data did not change do not fetch
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

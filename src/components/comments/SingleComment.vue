<template lang="html">
        <div class="mo-comment">
            <router-link :to="{ name: 'profile', params: { id:comment.user_id } }" tag='div' class="mo-comment__img">
                <img :src="IMG + comment.user_image.avatar" alt="">
            </router-link>
            <p class="mo-comment__text">{{comment.body}}</p>
            <button class='mo-comment__edit' v-if='comment.user_id == getMyId' @click.stop='toggleEdit( )'><b>EDIT</b></button>
            <input v-show='editMode' type="text" name="" v-model='input' @keyup.enter='submitEdit()'>
        </div>
</template>

<script>
import { IMG } from '../../api/endpoints'
import { CommentsService } from '../../api/api'
import { mapGetters } from 'vuex'
import { EDIT_COMMENT_BY_ID, FETCH_COMMENTS, REFRES_COMMENTS, UPDATE_CURRENT_POST_INDEX } from '../../store/modules/actions.types'

export default {
    data(){
        return {
            IMG:IMG,
            editMode:false,
            input:this.$props.comment.body
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
                this.$store.dispatch( FETCH_COMMENTS, this.getCurrentPost.id )
                    .then( res => {
                        this.$store.dispatch( REFRES_COMMENTS, res.data.data )
                })
            })
            this.editMode = false;

        }

    },

    computed:{
        ...mapGetters([
            'getMyId',
            'getCurrentPost',

        ]),
    },

    props:['comment', 'postIndex']
}
</script>

<style lang="css">
</style>

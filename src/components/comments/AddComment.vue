<template lang="html">
    <div class="b-comments-details__add-new">
        <form class="b-comments-details__add-new__form" @submit.prevent = 'addComment'>
            <div class="b-comments-details__add-new__form__field">
                <input type="text" name="" v-model='commentBody' placeholder="Add new comment">
                <button type="submit" class='btn'>Add Comment</button>
            </div>

        </form>
    </div>
</template>

<script>
import { IMG } from '../../api/endpoints'
import { mapGetters } from 'vuex'
import {  FETCH_POST_BY_ID, UPDATE_POST_BY_INDX, UPDATE_COMMENTS , POST_NEW_COMMENT, FETCH_COMMENTS, REFRES_COMMENTS, UPDATE_COMMENTS_RQST_PAGE } from '../../store/modules/actions.types'
export default {
    data(){
        return {
            IMG:IMG,
            commentBody:'',
        }
    },
    methods:{
        addComment(){
            if( this.commentBody){
                let params = { post_id:this.getCurrentPost.id, body:this.commentBody }
                this.$store.dispatch( POST_NEW_COMMENT, params )
                .then( res => {
                    this.$store.dispatch(UPDATE_COMMENTS_RQST_PAGE, 1);
                    this.$store.dispatch( FETCH_COMMENTS, this.getCurrentPost.id )
                        .then( res => {
                            this.$store.dispatch( REFRES_COMMENTS, res.data.data )
                    })
                })
                document.querySelector('.b-comments-details__inner').scrollTop = 0;
                this.commentBody = '';
            }else{
                return
            }
        }
    },

    computed:{
        ...mapGetters([
            'getCurrentPost',
            'getIndex'
        ])
    },

    props:['comment']
}
</script>

<style lang="css">
</style>

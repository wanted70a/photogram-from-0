<template lang="html">
    <div class="b-comments__add-new">
        <form class="b-comments__add-new__form" @submit.prevent = 'addComment'>
            <div class="b-comments__add-new__form__field">
                <input type="text" name="" v-model='commentBody' placeholder="Add new comment">
            </div>
            <button type="submit" class='btn'>Add Comment</button>
        </form>
    </div>
</template>

<script>
import { IMG } from '../../api/endpoints'
import { mapGetters } from 'vuex'
import {  FETCH_POST_BY_ID, UPDATE_POST_BY_INDX, UPDATE_COMMENTS , POST_NEW_COMMENT, FETCH_COMMENTS, REFRES_COMMENTS } from '../../store/modules/actions.types'
export default {
    data(){
        return {
            IMG:IMG,
            commentBody:''
        }
    },
    methods:{
        addComment(){
            let params = { post_id:this.getCurrentPost.id, body:this.commentBody }
            this.$store.dispatch( POST_NEW_COMMENT, params )
            .then( res => {
                this.$store.dispatch( FETCH_COMMENTS, this.getCurrentPost.id )
                    .then( res => {
                        this.$store.dispatch( REFRES_COMMENTS, res.data.data )
                })
            })
            this.commentBody = '';
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

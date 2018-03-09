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
import { mapActions } from 'vuex'
import {  UPDATE_CURRENT_POST, UPDATE_CACHED_COMMENTS , POST_NEW_COMMENT} from '../../store/modules/actions.types'
export default {
    data(){
        return {
            IMG:IMG,
            commentBody:''
        }
    },
    methods:{
        ...mapActions([
            UPDATE_CURRENT_POST,
            POST_NEW_COMMENT
        ]),
        addComment(){
            let params = { post_id:this.getCurrentPostId, body:this.commentBody }
            this.$store.dispatch( POST_NEW_COMMENT, params )
        }
    },

    computed:{
        ...mapGetters([
            'getCurrentPostId',
        ])
    },

    props:['comment']
}
</script>

<style lang="css">
</style>

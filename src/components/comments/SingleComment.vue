<template lang="html">
        <div class="mo-comment">
            <router-link :to="{ name: 'profile', params: { id:comment.user_id } }" tag='div' class="mo-comment__img">
                <img :src="IMG + comment.user_image.avatar" alt="">
            </router-link>
            <p class="mo-comment__text">{{comment.body}}</p>
            <p v-if='comment.user_id == getMyId'><b>EDIT</b></p>
        </div>
</template>

<script>
import { IMG } from '../../api/endpoints'
import { mapGetters } from 'vuex'
// import {  UPDATE_CURRENT_POST, UPDATE_CACHED_COMMENTS } from '../../store/modules/actions.types'
export default {
    data(){
        return {
            IMG:IMG,
        }
    },
    computed:{
        ...mapGetters([
            'getMyId'
        ]),
    },

    props:['comment']
}
</script>

<style lang="css">
</style>

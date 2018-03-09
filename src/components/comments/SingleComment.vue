<template lang="html">
        <div class="mo-comment">
            <router-link :to="{ name: 'profile', params: {} }" tag='div' class="mo-comment__img">
                <img :src="IMG + comment.user_image.avatar" alt="">
            </router-link>
            <p class="mo-comment__text">{{comment.body}}</p>
        </div>
</template>

<script>
import { IMG } from '../../api/endpoints'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import {  UPDATE_CURRENT_POST, UPDATE_CACHED_COMMENTS } from '../../store/modules/actions.types'
export default {
    data(){
        return {
            IMG:IMG,
        }
    },
    methods:{
        ...mapActions([
            UPDATE_CURRENT_POST
        ]),
    },

    props:['comment']
}
</script>

<style lang="css">
</style>

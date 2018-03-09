<template lang="html">
    <!-- <router-link :to="{ name: 'home'}" tag='div' class='b-post-details'> -->
    <div class='b-post-details' @click='updatePostDetailsState( false )'>
        <app-single-post  :post='getPostObject.post' :comments='getPostObject.post.comments'></app-single-post>
    </div>
    <!-- </router-link> -->
</template>

<script>
import { IMG } from '../../api/endpoints'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { UPDATE_POST_DETAILS_STATE } from '../../store/modules/actions.types'
import SinglePost from './SinglePost.vue'
export default {
    data(){
        return {
            IMG:IMG,
        }
    },
    components:{
        'app-single-post':SinglePost
    },
    methods:{
        ...mapActions([
            UPDATE_POST_DETAILS_STATE,
        ])
    },
    computed:{
        ...mapGetters([
            'getPostObject'
        ])
    },
}
</script>
<style lang="css">

</style>

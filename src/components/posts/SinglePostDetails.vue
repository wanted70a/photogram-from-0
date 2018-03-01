<template lang="html">
<div class="b-post-details">
    <app-single-post  :post='getPostObject'></app-single-post>
</div>
</template>

<script>
import { IMG } from '../../api/endpoints'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
import { SET_CURRENT_POST_ID } from '../../store/modules/mutations.types'
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

    },
    computed:{
        ...mapGetters([
            'getPostObject'
        ])
    },
    props:['post']
}
</script>
<style lang="css">

</style>

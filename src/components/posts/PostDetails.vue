<template lang="html">
    <!-- <router-link :to="{ name: 'home'}" tag='div' class='b-post-details'> -->
    <div class='b-post-details' @click='hidePostDetails( )'>
        <app-single-post  :post='getCurrentPost' :index='getCurrentIndex' :comments='getCurrentPost.comments.slice(0,5)'></app-single-post>
    </div>
    <!-- </router-link> -->
</template>

<script>
import { IMG } from '../../api/endpoints'
import { mapGetters } from 'vuex'
import { UPDATE_POST_DETAILS_STATE, UPDATE_COMMENTS_DETAILS_STATE } from '../../store/modules/actions.types'
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
      hidePostDetails( ){
          this.$store.dispatch( UPDATE_COMMENTS_DETAILS_STATE, false  );
          this.$store.dispatch( UPDATE_POST_DETAILS_STATE, false  );
      },
    },
    computed:{
        ...mapGetters([
            'getCurrentPost',
            'getCurrentIndex',
        ])
    },
}
</script>
<style lang="css">

</style>

<template lang="html">
    <div class='b-post-details' @click.prevent='hidePostDetails()'>
        <app-single-post  :post='getCurrentPost' :index='getIndex' :comments='getCurrentPost.comments.slice(0,5)'></app-single-post>
    </div>
</template>

<script>
import { IMG } from '../../api/endpoints'
import { mapGetters } from 'vuex'
import { UPDATE_POST_DETAILS_STATE, UPDATE_COMMENTS_DETAILS_STATE, CLEAR_COMMENTS } from '../../store/modules/actions.types'
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
          //this.$store.dispatch( CLEAR_COMMENTS );
          this.$store.dispatch( UPDATE_COMMENTS_DETAILS_STATE, false  );
          this.$store.dispatch( UPDATE_POST_DETAILS_STATE, false  );
      },
    },
    computed:{
        ...mapGetters([
            'getCurrentPost',
            'getCurrentComments',
            'getIndex',
        ])
    },
}
</script>
<style lang="css">

</style>

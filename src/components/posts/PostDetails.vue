<template lang="html">
     <transition name="slide-right-fade">
        <div class='b-post-details' v-if='getPostDetailsState' @click.prevent='hidePostDetails()'>

            <app-single-post v-if='getPostDetailsState' :post='getCurrentPost' :index='getIndex' :comments='getCurrentPost.comments.slice(0,5)' :key='getCurrentPost.id'></app-single-post>

        </div>
    </transition>
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
          this.$store.dispatch( UPDATE_COMMENTS_DETAILS_STATE, false  );
          this.$store.dispatch( UPDATE_POST_DETAILS_STATE, false  );
      },
    },
    computed:{
        ...mapGetters([
            'getCurrentPost',
            'getCurrentComments',
            'getIndex',
            'getPostDetailsState'
        ])
    },
    created(){
        document.body.classList.add('fixedBody');
    },
    destroyed(){
        document.body.classList.remove('fixedBody');
    }
}
</script>
<style lang="css">

</style>

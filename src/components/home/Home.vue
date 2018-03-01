<template lang="html">
    <div class="b-posts-list">
        <router-view></router-view>
        <app-posts-list></app-posts-list>
    </div>
</template>

<script>
import { FETCH_POSTS } from '../../store/modules/actions.types.js'
import  api from '../../api/api.js'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

import PostsList from '../posts/PostsList.vue'

export default {
    components:{
        'app-posts-list':PostsList,
    },

    computed:{
        ...mapGetters([
            'getToken',
            'getPostsObject'
        ])
    },

    methods:{
        ...mapActions([
            FETCH_POSTS,
        ]),
    },

    created(){
        //let headers = api.authHeader();
        //this.$store.dispatch( FETCH_POSTS, headers );
    },
}
</script>

<style lang="css">

</style>

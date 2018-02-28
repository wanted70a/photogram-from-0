<template lang="html">
    <div class="b-posts-list">
        <router-view></router-view>
        <app-posts-list></app-posts-list>
        <button type="button" @click='onFetch'>FETCH</button>
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
            'getToken'
        ])
    },

    methods:{
        ...mapActions([
            FETCH_POSTS,
        ]),
        onFetch(){
            let headers = api.authHeader();
            this.$store.dispatch( FETCH_POSTS,  headers );
        }
    },

    created(){
        let headers = api.authHeader();
        this.$store.dispatch( FETCH_POSTS, headers );
    },
}
</script>

<style lang="css">

</style>

<template lang="html">
    <div class="b-posts-list">
        <app-posts-list></app-posts-list>
    </div>
</template>

<script>
import { FETCH_POSTS } from '../../store/modules/actions.types.js'
import PostsList from '../posts/PostsList.vue'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

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
        ])
    },

    created(){
        console.log(this.getToken);
        let auth = { token: this.getToken };
        this.$store.dispatch( FETCH_POSTS,  auth)
    },
}
</script>

<style lang="css">

</style>

<template lang="html">
    <div class="b-posts-list">
        <div class="b-posts-list__inner">
            <div v-if='getIsLoading'>
                LOADING...
            </div>
            <app-single-post v-else  v-for='post in getPostsObject.posts' :post='post' :key='post.key'></app-single-post>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SinglePost from './SinglePost.vue'

export default {
    components:{
        'app-single-post':SinglePost
    },

    computed:{
        ...mapGetters([
            'getPostsArr',
            'getPostsObject',
            'getIsLoading'
        ])
    },

    mounted(){
        console.log('mounted');
        console.log(this.getPostsArr);
        console.log(this.getPostsObject);
    },
}
</script>

<style lang="css">
</style>

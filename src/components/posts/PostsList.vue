<template lang="html">
    <div class="b-posts-list__inner">
        <app-single-post></app-single-post>
    </div>
</template>

<script>
import SinglePost from './SinglePost.vue'
export default {
    components:{
        'app-single-post':SinglePost
    }
}
</script>

<style lang="css">
</style>

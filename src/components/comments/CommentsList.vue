<template lang="html">
    <div class="b-comments-list">
        <app-single-comment  v-for='(comment, index) in comments' :comment='comment' :key='comment.id'></app-single-comment>
    </div>

</template>

<script>

import SingleComment from '../comments/SingleComment.vue'
export default {
    components:{
        'app-single-comment': SingleComment
    },

    props:['comments']
}
</script>

<style lang="css">
</style>

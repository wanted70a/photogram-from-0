<template lang="html">
<div class="mo-post">
    <div class="mo-post-inner">
        <div class="mo-post__avatar">
            <div class="mo-post__avatar__profile-picture">
                <img src='https://dummyimage.com/40x40/000/fff.jpg'  alt="">
            </div>
            <h3 class='mo-post__avatar__name'>post.user.username</h3>
        </div>
        <div class="mo-post__media">
            <img v-if="true" src="https://dummyimage.com/400x400/000/fff.jpg" alt="">
            <div class="" v-else>
                <video src="https://dummyimage.com/400x400/000/fff.jpg" autoplay poster="posterimage.jpg"></video>
            </div>
        </div>
        <div class="mo-post__stats">
            <span>Add Comm</span>
            <span>Likes: post.likes_count</span>
        </div>
        <div class="mo-post__comments">
            <p>First 3 comments</p>
            <p>view all comments</p>
        </div>
    </div>
</div>
</template>

<script>
export default {

}
</script>

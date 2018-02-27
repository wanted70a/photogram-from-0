<template lang="html">

</template>

<script>
import { IMG } from '../../api/endpoints'
import { mapGetters } from 'vuex'

export default {
    data(){
        return {
            IMG:IMG,
        }
    },
    props:['comments'],
    methods:{
        viewComments( id ){
            console.log(this.getPostsObject['post'+ id]);
        }
    },
    computed:{
        ...mapGetters([
            'getPostsObject',
        ])
    },
}
</script>

<style lang="css">
</style>

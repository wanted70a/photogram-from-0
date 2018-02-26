<template>
  <div id="app">
    <router-view></router-view>
    
  </div>
</template>

<script>
//import { FETCH_POSTS } from './store/modules/actions.types'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'

export default {
    // components:{
    //
    // },
    //
    // computed:{
    // ...mapGetters([
    //   'getPosts'
    // ]),
    // },
    //
    // methods:{
    //   ...mapActions([
    //     'fetchPosts'
    //   ])
    // },
    //
    // created(){
    // this.$store.dispatch('fetchPosts')
    // }
}
</script>

<style lang="scss">

</style>

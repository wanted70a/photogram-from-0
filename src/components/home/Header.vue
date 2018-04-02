<template lang="html">
<header class='b-header'>
    <nav class="b-header__navigation">
        <router-link class='b-header__navigation-link' to="/home">
            <i class='b-header__icon'>HP</i>
        </router-link>

        <router-link :to="{ name: 'profile', params: { id:getMyId } }"  class="b-header__navigation-link">
            <div class='b-header__icon'>
                <!-- <img :src="IMG + getLogedUser.info.image.profile" alt=""> -->
            </div>
        </router-link>

        <router-link class='b-header__navigation-link' to="/create">
            <i class='b-header__icon'>UP</i>
        </router-link>

        <router-link class='b-header__navigation-link' to="/dashboard">
            <i class='b-header__icon'>FD</i>
        </router-link>
    </nav>
    <div class="b-header__logo">
        <h1 class="b-header__logo__white"><span>Photo</span>gram</h1>
    </div>
    <div class="b-header__utilities">
        <div class="b-header__utilities-search">
            <i class='b-header__icon'>src</i>
        </div>
        <div class="b-header__utilities-lang">
            <i>SRB</i>
        </div>
    </div>
</header>

</template>

<script>
import { mapGetters } from 'vuex'
import { IMG } from '../../api/endpoints'
import  api from '../../api/api.js'
import { FETCH_USER_POSTS } from '../../store/modules/actions.types.js'

export default {
    data(){
        return {
            IMG:IMG,
        }
    },
    methods:{

    },
    computed:{
        ...mapGetters([
            'getLogedUser',
            'getMyId'
        ])
    }
}
</script>


<style>

</style>

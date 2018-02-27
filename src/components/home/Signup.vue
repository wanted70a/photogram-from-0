<template lang="html">
    <div class="b-signup">
        <form class="b-signup__form" @submit.prevent = 'signUp'>
            <div class="b-signup__form__field">
                <input type="text" placeholder="email" v-model='email'>
            </div>
            <div class="b-signup__form__field">
                <input type="text" placeholder="passwod" v-model='password'>
            </div>
            <div class="b-signup__form__field">
                <input type="text" placeholder="confirm passwod" v-model='confirmPassword'>
            </div>
            <div class="b-signup__form__field">
                <input type="text" placeholder="username" v-model='username'>
            </div>
            <button type="submit">Signup</button>
        </form>
        <p class='b-signup__terms'>
            Lorem Ipsum <router-link :to="{ name: 'terms' }">Terms of Use</router-link>
        </p>
        <p>Already have account <router-link :to="{ name: 'login' }">Login</router-link></p>

    </div>
</template>

<script>
export default {
    data(){
        return{
            email: '',
            password: '',
            confirmPassword: '',
            username: '',
        }
    }
}
</script>

<style lang="css">
</style>

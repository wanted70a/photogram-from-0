<template lang="html">
<transition name='slide-right-fade'>
  <div class="b-upload-photo">
      <div class="b-upload-photo__inner">
          <h3 class='b-upload-photo__title'>UPLOAD</h3>
          <input type="file" name="" value="" @change='imageChange'>
          <div class="b-upload-photo__medium" v-if='image'>
              <img :src="image" alt="">
          </div>
      </div>
  </div>
  </transition>
</template>

<script>
export default {
    data(){
        return{
            image:'',
        }
    },

    methods:{
        imageChange(e){
            console.log(e.target.files[0]);
            var fileReader = new FileReader();
            fileReader.readAsDataURL(e.target.files[0]);
            fileReader.onload = (e) => { this.image = e.target.result }
        }
    }
}
</script>

<style lang="css">
</style>

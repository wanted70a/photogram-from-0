<template lang="html">
<transition name='slide-right-fade'>
  <div class="b-upload-post">
      <div class="b-upload-post__inner">
          <h3 class='b-upload-post__title'>UPLOAD NEW POST</h3>
          <input class='b-upload-post__input' type="file" name="" value="" @change='imageChange'>
      </div>
      <div class="b-upload-post__preview" v-if='imagePreview'>
          <img :src="imagePreview" alt="">
      </div>
      <button v-if='imagePreview' type="submit" class='c-btn c-btn--upload-post' @click='updatePhoto'>Upload</button>
  </div>
  </transition>
</template>

<script>
import { POST_NEW_POST } from '../../store/modules/actions.types'
export default {
    data(){
        return{
            imagePreview:'',
            imageToUpl:'',
        }
    },

    methods:{
        imageChange(e){
            console.log(e.target.files[0].type);
            if((/(jpg|jpeg|png|avi|mov|mp4|flv)$/i).test(e.target.files[0].type) ){
                this.imageToUpl = e.target.files[0];
                var fileReader = new FileReader();
                fileReader.readAsDataURL(e.target.files[0]);
                fileReader.onload = (e) => { this.imagePreview = e.target.result }
            }else{
                console.log('Invalid format, please use jpg, jpeg, png');
            }

        },

        updatePhoto(){
            if( this.imageToUpl){
                var fd = new FormData();
                fd.append('image', this.imageToUpl);
                this.$store.dispatch( POST_NEW_POST, fd  )
            }else{
                console.log('Wrong Format');
            }
        }
    }
}
</script>

<style lang="css">
</style>

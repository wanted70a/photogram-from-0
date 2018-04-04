<template lang="html">
<transition name='slide-right-fade'>
  <div class="b-upload-photo">
      <div class="b-upload-photo__inner">
          <h3 class='b-upload-photo__title'>UPLOAD</h3>
          <input type="file" name="" value="" @change='imageChange'>
          <div class="b-upload-photo__media" v-if='imagePreview'>
              <img :src="imagePreview" alt="">
          </div>
          <button type="submit" class='c-btn c-btn--update-profile-photo' @click='updatePhoto'>Update</button>
      </div>
  </div>
  </transition>
</template>

<script>
import { UPLOAD_PROFILE_PIC } from '../../store/modules/actions.types'
export default {
    data(){
        return{
            imagePreview:'',
            imageToUpl:null,
        }
    },

    methods:{
        imageChange(e){

            if((/(jpg|jpeg|png)$/i).test(e.target.files[0].type) ){
                this.imageToUpl = e.target.files[0];
                var fileReader = new FileReader();
                fileReader.readAsDataURL(e.target.files[0]);
                fileReader.onload = (e) => { this.imagePreview = e.target.result }
            }else{
                console.log('Re Upload');
            }

        },

        updatePhoto(){
            if( this.imageToUpl){
                var fd = new FormData();
                fd.append('image', this.imageToUpl, this.imageToUpl.name );
                this.$store.dispatch( UPLOAD_PROFILE_PIC, fd  )
            }

        }
    }
}
</script>

<style lang="css">
</style>

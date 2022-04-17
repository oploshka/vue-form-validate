<template>
  <div>
    <div v-bind:class="['file-image-preview fip', { 'has-error' : (formStatus === 'ERROR') }]" @click="showModal">
      <template v-if="value && value.getSrc()">
        <div class="icon fip__img">
          <img :src="value.getSrc()" alt="" />
        </div>
      </template>
      <template v-else>
        <img svg-inline class="icon fip__icon" src="@img/icon/photo-upload.svg" alt="" />
      </template>
    </div>
    <modal name="fip-modal" width="800" height="auto">
      <div class="fip-modal">
        <div class="fip-modal__cropper">
          <img svg-inline class="icon fip-modal__icon" src="@img/icon/photo-upload.svg" alt="" />
          <cropper
            class="cropper"
            :src="imgCropper"
            @change="change"
          />
        </div>
        <div class="fip-modal__btn">
          <label class="fip__upload btn btn-danger btn-lg">
            <input class="fip__input" type="file" :id="'file-'+name" ref="file" accept="image/*" @change="handleFileUpload()"/>
            Загрузить
          </label>
          <div class="btn btn-danger btn-lg" @click="handleFileSave()">
            Сохранить
          </div>
          <div class="btn btn-link btn-lg" @click="hideModal">Отмена</div>
        </div>
      </div>
    </modal>
  </div>
  
</template>

<script>

import FveFieldMixin from "@widgetFormValidate/src/Mixin/FveFieldMixin";

export default {
  mixins:[
    FveFieldMixin
  ],
  props: {
    value: {
      type: FileClass,
      default: () => { return new FileClass(); },
    },
  },
  data() {
    return {
      imgCropper: '',
      src: '',
      file: {},
      imagePreviewDefault: require('@img/icon/photo-upload.svg'),
    };
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      
      let reader  = new FileReader();
      reader.addEventListener("load", () => {
        this.imgCropper = reader.result;
      }, false);
      
      if( this.file ){
        if ( /\.(jpe?g|png|gif)$/i.test( this.file.name ) ) {
          reader.readAsDataURL( this.file );
        }
      }
    },
    handleFileSave() {
      this.$emit('input', new FileClass({
        src: this.src,
        file: this.file,
      }));
      this.hideModal();
    },
    rm(event) {
      this.$emit('input', new FileClass({
        src: '',
        file: {},
      }));
    },
    prepareValue($event) {
      return  $event.target.value;
    },
    isEmpty(value) {
      return !value || !value.getSrc();
    },
    validateFunction(value){
      return 'SUCCESS';
    },
    change({coordinates, canvas}) {
      this.src = canvas.toDataURL("image/png");
      let blobBin = atob(this.src.split(',')[1]);
      let array = [];
      for(let i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
      }
      let blob = new Blob([new Uint8Array(array)], {type: 'image/png'});
      this.file = this.blobToFile(blob);
    },
    showModal () {
      this.$modal.show('fip-modal');
      this.imgCropper = this.value.getSrc() || '';
    },
    hideModal () {
      this.$modal.hide('fip-modal');
    },
    blobToFile(blob){
      return new File([blob], this.file.name || 'image.png', { lastModified: new Date().getTime(), type: blob.type });
    }
  },
};
</script>

<style lang="scss" scoped>
// fip
.fip {
  position: relative;
  display: block;
  width: 100%;
  height: 178px;
  padding: 0;
  background-color: var(--fve-input--background);
  border-radius: 8px;
  transition: all .2s ease-in-out;
  overflow: hidden;
  cursor: pointer;
  &__img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
  }
  &__icon {
    position: absolute;
    left: 50%;
    top: 50%;
    display: block;
    width: 68px;
    height: auto;
    transform: translate(-50%,-50%);
    opacity: 0.5;
    z-index: 1;
  }
  &.has-error {
    border: 1px solid #c82333;
  }
}

// fip-modal
.fip-modal {
  background-color: var(--bg-sub);
  .fip-modal__cropper {
    width: 100%;
    height: 400px;
    .fip-modal__icon {
      position: absolute;
      left: 50%;
      top: 50%;
      display: block;
      width: 68px;
      height: auto;
      transform: translate(-50%, -50%);
      opacity: 0.5;
      z-index: 0;
    }
    .cropper {
      height: 400px;
    }
  }
  .fip-modal__btn {
    padding: 20px;
    .btn {
      margin-right: 20px;
    }
  }
}

// fip__upload
.fip__upload {
  position: relative;
  .fip__input {
    left: 0;
    top: 0;
    width: 100%;
    opacity: 0;
    position: absolute;
    z-index: -1;
  }
}
</style>

<script lang="ts" setup>
import {IonContent} from '@ionic/vue';
import {pageTitle} from '../state/pageState';
import {computed, defineProps} from "vue";
import {test_base64PDF} from "./../helpers/index";
import {ResponseSignature} from "./../model/signature";

pageTitle.value = "Signed PDF";

const props = defineProps({
  signedPDF: {
    type: String,
    required: true,
  }
})

const _signedPDFData = computed(() => {
  const __data = JSON.parse(props.signedPDF)
  __data.pdf = __data.pdf === 'mockServer' ? test_base64PDF : __data.pdf;
  return __data as ResponseSignature
});


</script>

<template>
  <ion-content :fullscreen="true">
    <div id="container" class="app-content">
      <object :data="_signedPDFData.pdf" style="overflow:hidden;min-height:100%;width:100vw">
      </object>
    </div>
  </ion-content>
</template>

<style scoped lang="scss">

#container {
  width: 100%;
  height: 100%;
  text-align: center;
}

</style>
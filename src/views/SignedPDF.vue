<script lang="ts" setup>
import {IonContent} from '@ionic/vue';
import {pageTitle} from '../state/pageState';
import {computed, defineProps} from "vue";
import {test_base64PDF} from "@/helpers/index";
import {ResponseSignature} from "@/model/signature";
import {jsPDF} from "jspdf";
import {b64toUrl, base64ToArrayBuffer} from "@/utils/apex-formatter";

pageTitle.value = "Signed PDF";

const props = defineProps({
  signedPDF: {
    type: String,
    required: true,
  }
})

const _signedPDFData = computed(() => {
  const __data = JSON.parse(props.signedPDF)
  __data.pdf = process.env.NODE_ENV == "production" ? __data.pdf : test_base64PDF;
  buildPdf(__data.pdf )
  return __data as ResponseSignature
});


const buildPdf =  (base64PDF) => {
  console.log( base64ToArrayBuffer(base64PDF))
  // const pdf = new jsPDF('p', 'mm');

}

</script>

<template>
  <ion-content :fullscreen="true">
    <div id="container" class="app-content">
      <iframe :src="_signedPDFData.pdf"  style="width: 100%;height: 100%;border: none;"/>
    </div>
  </ion-content>
</template>

<style scoped lang="scss">

#container {
  width: 100%;
  text-align: center;
}

</style>
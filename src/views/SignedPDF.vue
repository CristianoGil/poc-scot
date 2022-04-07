<script lang="ts" setup>
import {IonContent} from '@ionic/vue';
import {pageTitle} from '../state/pageState';
import {computed, defineProps} from "vue";
import {test_base64PDF} from "./../helpers/index";
import {ResponseSignature} from "./../model/signature";
import {useRouter} from "vue-router";
const router = useRouter();

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

const backToHome = () => {
  router.push({path: `/`});
}

</script>

<template>
  <ion-content :fullscreen="true">
    <div id="container" class="app-content">
      <ion-button shape="round" @click="backToHome">Voltar a casa</ion-button>
      <object :data="'data:application/pdf;base64,'+_signedPDFData.pdf" style="overflow:hidden;min-height:100%;width:100vw">
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
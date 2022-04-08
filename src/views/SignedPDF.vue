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

const base64PDF = computed(() => {

  console.log("Base64:",  props.signedPDF.slice(1,-1));

  return props.signedPDF.slice(1,-1);
})

const backToHome = () => {
  router.push({path: `/`});
}

</script>

<template>
  <ion-content :fullscreen="true">
    <div id="container" class="app-content">
      <ion-button shape="round" @click="backToHome">Voltar a casa</ion-button>
      <object :data="base64PDF" style="overflow:hidden;min-height:100%;width:100vw">
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
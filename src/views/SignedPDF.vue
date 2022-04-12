<script lang="ts" setup>
import {
  IonContent, IonPage, IonButton, IonHeader,
  IonTitle,
  IonToolbar,
  useIonRouter
} from '@ionic/vue';
import {pageTitle, signedPDF} from '../state/index';
import {computed, defineComponent} from "vue";

const router = useIonRouter();

defineComponent({
  components: {
    IonContent, IonButton, IonPage, IonHeader, IonTitle, IonToolbar,
  }
})

pageTitle.value = "Signed PDF";


const base64PDF = computed(() => {
  const __data =  signedPDF.value;
  console.log("Base64:", __data.pdf);
  console.log("Posx:", __data.posx);
  console.log("Posy:", __data.posy);
  return __data.pdf;
})

const backToHome = () => {
  router.push({path: `/`});
}

</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>POC SCot 1 - {{ pageTitle }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div id="container" class="app-content">
        <ion-button shape="round" @click="backToHome">Voltar a casa</ion-button>
        <object :data="base64PDF" style="overflow:hidden;min-height:100%;width:100vw">
        </object>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped lang="scss">

#container {
  width: 100%;
  height: 100%;
  text-align: center;
}

</style>
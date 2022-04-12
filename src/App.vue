<script lang="ts" setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import {  watchEffect, defineComponent } from 'vue';

import {  networkConditions } from './state/index'
import { useOnline } from "@vueuse/core";
import { SplashScreen } from '@capacitor/splash-screen';

const online = useOnline();

watchEffect(()=>{
  if ( online.value) {
    networkConditions.value = 'online';
    console.log('online');
  } else {
    networkConditions.value = 'offline';
    console.log('offline');
  }
})

defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet
  }
})

const splashScreen = async () => {
  // Hide the splash (you should do this on app launch)
  await SplashScreen.hide();
}

splashScreen();
</script>

<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<style  lang="scss">

.app-content {
  width: 100%;
  display: block;
  height: auto;
}



</style>

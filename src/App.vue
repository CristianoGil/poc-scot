<script lang="ts" setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent, watchEffect } from 'vue';

import { pageTitle, networkConditions } from './state/index'
import { useOnline } from "@vueuse/core";

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
</script>

<template>
  <ion-app>
      <ion-header :translucent="true" >
        <ion-toolbar>
          <ion-title>POC SCot 1 - {{ pageTitle }}</ion-title>
        </ion-toolbar>
      </ion-header>
    <RouterView v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade-slow'" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </ion-app>
</template>

<style  lang="scss">

.app-content {
  width: 100%;
  display: block;
  height: auto;
}



</style>

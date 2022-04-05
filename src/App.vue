<script lang="ts" setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';

import { pageTitle } from './state/pageState.ts'

</script>

<template>
  <ion-app>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>POC SCot 1 - {{ pageTitle }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-router-outlet >
    </ion-router-outlet>
  </ion-app>
</template>

<style  lang="scss">

.app-content {
  width: 100%;
  display: block;
  height: auto;
  margin-top: 56px;
}


</style>

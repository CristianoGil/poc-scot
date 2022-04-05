<script lang="ts" setup>
import {IonContent, IonPage} from '@ionic/vue';

import {pageTitle} from '../state/pageState.ts'

pageTitle.value = "Home";

</script>

<template>
  <ion-content :fullscreen="true">
    <div id="container" class="app-content">
      <ion-grid>
        <ion-row class="ion-align-items-center ">
          <ion-col size="12" class="--ion-grid-column-padding">
            <ion-card>
              <ion-card-content>
                <ion-searchbar type="text" inputmode="text"  enterkeyhint="enter" placeholder="Introduz o NIF"></ion-searchbar>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </div>
  </ion-content>

</template>

<style scoped lang="scss">

#container {
  width: 100%;
  text-align: center;
}

</style>

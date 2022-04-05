<script lang="ts" setup>
import {ref} from "vue";
import {IonContent, IonPage, loadingController} from '@ionic/vue';
import _ from 'underscore'

import {pageTitle} from '../state/pageState.ts'

pageTitle.value = "Home";

let searchLoading;

const isTyping = ref(false);
const onInputKeyUp = ref('');
const searchInputId = 'input_search-getPersonInfoByNIF';

const searchPerson = {
  getInfoByNIF: async (): void => {
    if (_.isEmpty(onInputKeyUp.value)) return;

    searchLoading = await loadingController
        .create({
          message: 'A pesquisar...',
          translucent: true,
          backdropDismiss: false
        });

    await searchLoading.present();

    setTimeout(function () {
      searchLoading.dismiss()
    }, 5000);

  },
  onInput: {
    keyup: (): void => {
      const el: HTMLInputElement = document.querySelector(`#${searchInputId} input`);
      const {value} = el;

      onInputKeyUp.value = value
      isTyping.value = !_.isEmpty(value);
    }
  }
}


</script>

<template>
  <ion-content :fullscreen="true">
    <div id="container" class="app-content">
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <!--  START(form): Request INFO TO FILL FULL PDF BY NIF-->
            <ion-searchbar @ionInput="searchPerson.onInput.keyup" :id="searchInputId" :name="searchInputId"
                           type="number"
                           inputmode="numeric" placeholder="Informa o NIF"></ion-searchbar>
            <!--  END(form): Request INFO TO FILL FULL PDF BY NIF-->
          </ion-col>

          <ion-col size="8" offset="2" v-show="isTyping">
            <ion-button size="small" @click="searchPerson.getInfoByNIF" expand="block" color="secondary">Pesquisar
            </ion-button>
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

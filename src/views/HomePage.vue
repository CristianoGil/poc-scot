<script lang="ts" setup>
import {defineComponent, ref} from "vue";
import {IonContent, IonPage, loadingController, useIonRouter, onIonViewDidLeave, IonIcon} from '@ionic/vue';

import _ from 'underscore';

import {pageTitle, networkConditions} from '../state/index';
import person from "./../composable/person";
import {useRouter} from "vue-router";

const router = useRouter();

pageTitle.value = "Home";

let searchLoading: any;

const isTyping = ref(false);
const onInputKeyUp = ref<string>('');
const searchInputId = 'input_search-getPersonInfoByNIF';


const {searchPersonByNIF} = person();
const searchPerson = {
  getInfoByNIF: async (): Promise<void> => {
    if (_.isEmpty(onInputKeyUp.value)) return;

    searchLoading = await loadingController
        .create({
          message: 'A pesquisar...',
          translucent: true,
          backdropDismiss: false
        });

    await searchLoading.present();

    searchPersonByNIF({nif: onInputKeyUp.value as unknown as number}).then((data) => {
      router.push({path: `/signature/${JSON.stringify(data)}`})
    }).catch((error) => {
      console.log(error);

    }).finally(() => {
      searchLoading.dismiss()
    })

  },
  onInput: {
    keyup: (): void => {
      const el: any = document.querySelector(`#${searchInputId} input`);

      if (el) {
        const {value} = el;

        onInputKeyUp.value = value
        isTyping.value = !_.isEmpty(value);
      }

    }
  }
}

const continueFillForm = () => {
  router.push({
    path: `/signature/${JSON.stringify({
      nif: onInputKeyUp.value, moradas: [{id: 1, morada: null, local: null,domicilioSede: null, fracao: null}]
    })}`
  })
}

</script>

<template>
  <ion-content :fullscreen="true">
    <div id="container" class="app-content">
      <ion-grid>
        <ion-row>
          <ion-col size="8" offset="2">
            <!--  START(form): Request INFO TO FILL FULL PDF BY NIF-->
            <ion-searchbar @ionInput="searchPerson.onInput.keyup" :id="searchInputId" :name="searchInputId"
                           type="number"
                           inputmode="numeric" placeholder="Informa o NIF"></ion-searchbar>
            <!--  END(form): Request INFO TO FILL FULL PDF BY NIF-->
          </ion-col>

          <ion-col size="6" offset="3" v-show="isTyping">

            <ion-text color="danger" v-if="networkConditions == 'offline'">
              <h6>O sistema está em modo offline por favor continua a preencha os campos manualmente!</h6>
            </ion-text>

            <ion-button v-if="networkConditions == 'offline'" size="small" @click="continueFillForm" expand="block"
                        color="light">Continuar
            </ion-button>

            <ion-button v-if="networkConditions == 'online'" size="small" @click="searchPerson.getInfoByNIF"
                        expand="block" color="secondary">Pesquisar
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

<script lang="ts" setup>
import {defineProps, computed, watch} from "vue";
import {PersonResponse} from "./../model/person";
import {isGeneratingPDF, pageTitle} from "./../state/pageState";
import {useRoute, useRouter} from "vue-router";
import _ from 'underscore';
import html2canvas from 'html2canvas';
import {loadingController, alertController, toastController} from "@ionic/vue";
import {jsPDF} from "jspdf";
import {blobToBase64} from "./../utils/apex-formatter";

import signature from './../composable/Signature';

const router = useRouter();
const route = useRoute();
let generatePDFLoading: any;

pageTitle.value = "Signature PDF";

const props = defineProps({
  personData: {
    type: String,
    required: true,
  }
})
const _personData = computed(() => {
  const __data = JSON.parse(props.personData)
  return (_.has(__data, 'pessoa') ? __data.pessoa : __data) as PersonResponse;
});

const startSignatureProcess = async (contentId: string) => {
  isGeneratingPDF.value = true;
  generatePDFLoading = await loadingController
      .create({
        message: 'A assinar...',
        translucent: true,
        backdropDismiss: false
      });


  setTimeout(() => {
    html2canvas(document.getElementById(contentId)).then(async (canvas) => {
      await generatePDFLoading.present();
      await generatePDF(canvas);

    }).catch((err) => {
      console.log('html2canvas: ', err);
      isGeneratingPDF.value = false;
      generatePDFLoading.dismiss();

      presentErrorAlert(undefined, "Ocorreu um erro ao preparar a assinatura. Tente novamente mais tarde e se o problema persistir reinicie o aplicativo");
    })
  })

}


const generatePDF = async (canvas) => {
  try {
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm',undefined, true);
    let imgWidth = 210;
    let imgHeight = canvas.height * imgWidth / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    toSign(await blobToBase64(pdf.output('blob')))
    // pdf.save(`${(new Date()).toDateString()}.pdf`);
  } catch (e) {
    console.log("generatePDF: ", e);
    await presentErrorAlert(undefined, "Ocorreu um erro ao preparar a assinatura. Tente novamente mais tarde e se o problema persistir reinicie o aplicativo");
  }

}

const toSign = (base64PDF: ArrayBuffer) => {
  const {getSignedPDF} = signature(base64PDF);

  getSignedPDF().then((signedPDF) => {
    console.log('signedPDF: ', signedPDF);
    openToast("Documento assinado com sucesso");
    setTimeout(() => {
      router.push({path: `/signed/${JSON.stringify(signedPDF)}`});
    }, 1000);

  }).catch((err) => {
    console.log("getSignedPDF: ", err);
    presentErrorAlert(undefined, "Ocorreu um erro ao preparar ao assinar. Tente novamente mais tarde e se o problema persistir reinicie o aplicativo");
  }).finally(() => {
    isGeneratingPDF.value = false;
    generatePDFLoading.dismiss();
  })

}

const presentErrorAlert = async (header = "Algo deu errado!", message = "Tente novamente mais tarde e se o problema persistir reinicie o aplicativo") => {
  const alert = await alertController
      .create({
        header,
        message,
        buttons: ['OK'],
      });
  await alert.present();
}
const openToast = async (message = "Atualizado com sucesso.", duration = 2000) => {
  const toast = await toastController.create({
    message,
    duration,
  });
  return toast.present();
}

</script>

<template>
  <ion-content :fullscreen="true" :key="'ionContent-'+_personData.id">

    <div :id="'container'+_personData.id" class="app-content">

      <!--      START: INFORMACAO PESSOAL-->
      <ion-card :class="!isGeneratingPDF || 'no-box-shadow'">
        <ion-item>
          <ion-label>Informação pessoal</ion-label>
        </ion-item>

        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-col size="4">
                <div class="sc-ion-label-md-h sc-ion-label-md-s md ion-text-left">
                  <small>NIF</small><br>
                  <strong>{{ _personData.nif }}</strong>
                </div>
              </ion-col>

              <ion-col size="6">
                <div class="sc-ion-label-md-h sc-ion-label-md-s md ion-text-left">
                  <small>Nome</small><br>
                  <strong>{{ _personData.nome }}</strong>
                </div>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>
      <!--      END: INFORMACAO PESSOAL-->

      <!--      START: MORADA-->
      <ion-card :class="!isGeneratingPDF || 'no-box-shadow'" v-for="(morada ) in _personData.moradas" :key="morada.id">
        <ion-item>
          <ion-label>Morada - {{ morada.id }}</ion-label>
        </ion-item>

        <ion-card-content v-show="morada">
          <ion-grid>
            <ion-row>
              <ion-col size="4">
                <div class="sc-ion-label-md-h sc-ion-label-md-s md ion-text-left">
                  <small>Morada</small><br>

                  <strong v-if="morada.morada">{{ morada.morada }}</strong>
                  <strong v-else>N/A</strong>
                </div>
              </ion-col>

              <ion-col size="4">
                <div class="sc-ion-label-md-h sc-ion-label-md-s md ion-text-left">
                  <small>Local</small><br>

                  <strong v-if="morada.local?.descricao">{{ morada.local?.descricao }}</strong>
                  <strong v-else>N/A</strong>
                </div>
              </ion-col>

              <ion-col size="4">
                <div class="sc-ion-label-md-h sc-ion-label-md-s md ion-text-left">
                  <small>Localidade</small><br>
                  <strong v-if="morada.localidade">{{ morada.localidade }}</strong>
                  <strong v-else>N/A</strong>
                </div>
              </ion-col>

              <ion-col size="4">
                <div class="sc-ion-label-md-h sc-ion-label-md-s md ion-text-left">
                  <small>Domicilio Sede</small><br>
                  <strong v-if="morada.domicilioSede">{{ morada.domicilioSede }}</strong>
                  <strong v-else>N/A</strong>
                </div>
              </ion-col>

              <ion-col size="4">
                <div class="sc-ion-label-md-h sc-ion-label-md-s md ion-text-left">
                  <small>Fração</small><br>
                  <strong v-if="morada.fracao">{{ morada.fracao }}</strong>
                  <strong v-else>N/A</strong>
                </div>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>
      <!--      END: MORADA-->

      <ion-card :class="!isGeneratingPDF || 'no-box-shadow'">
        <ion-item>
          <ion-label class="ion-align-items-center ion-text-center">Assinatura</ion-label>
        </ion-item>

        <ion-card-content class="altura">
          <ion-grid>
            <ion-row>
              <ion-col size="12">
              </ion-col>
            </ion-row>
          </ion-grid>
          <ion-fab vertical="bottom" horizontal="center" slot="fixed">
            <ion-button v-show="!isGeneratingPDF" @click="startSignatureProcess('container'+_personData.id)">Assinar</ion-button>
          </ion-fab>
        </ion-card-content>
      </ion-card>

    </div>


  </ion-content>
</template>


<style scoped lang="scss">
.altura {
  height: 260px !important;
}

.no-box-shadow{
  box-shadow: none !important;
}

</style>
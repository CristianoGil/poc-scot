<script lang="ts" setup>
import {defineProps, computed, ref} from "vue";
import {PersonResponse} from "./../model/person";
import {ResponseSignature} from "./../model/signature";
import {isGeneratingPDF, pageTitle, signedPDF, networkConditions} from "./../state/index";
import { useRouter} from "vue-router";
import _ from 'underscore';
import html2canvas from 'html2canvas';
import {loadingController, alertController, toastController} from "@ionic/vue";
import {jsPDF} from "jspdf";
import {blobToBase64} from './../utils/apex-formatter';

import signature from './../composable/Signature';
import {savePersonInfo} from './../database';

const router = useRouter();
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
  const waitMessage = networkConditions.value == 'offline' ? 'A guardar e assinar...' : 'A assinar...';

  generatePDFLoading = await loadingController
      .create({
        message: waitMessage,
        translucent: true,
        backdropDismiss: false
      });

  if (networkConditions.value == 'offline') {
    saveDataLocally();
  }

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

    const pdf = new jsPDF('p', 'mm', undefined, true);
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
  base64PDF = base64PDF.replace(/^data:application\/[a-z]+;base64,/, "");
  const {getSignedPDF} = signature(base64PDF);

  getSignedPDF().then((_signedPDF: ResponseSignature) => {

    signedPDF.value = _signedPDF;

    openToast("Documento assinado com sucesso");
    setTimeout(() => {
      router.push({path: `/signed`});
    }, 1000);

  }).catch((err) => {
    console.log("getSignedPDF: ", err);
    presentErrorAlert(undefined, "Ocorreu um erro ao assinar. Tente novamente mais tarde e se o problema persistir reinicie o aplicativo");
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

const saveDataLocally = () => {

  const data = {
    nif: _personData.value.nif,
    nome: document.getElementsByName('PersonName')[0]?.value,
    moradas: [{
      id: 1,
      morada: document.getElementsByName('moradaName')[0]?.value,
      localidade: document.getElementsByName('moradaLocalidade')[0]?.value,
      domicilioSede: document.getElementsByName('moradaDomicilioSede')[0]?.value,
      fracao: document.getElementsByName('moradaFracao')[0]?.value,
      local: {descricao: document.getElementsByName('MoradaLocalDes')[0]?.value}
    }],
    documento: {}
  };

  savePersonInfo(data);
}

const tipoDocumento = ref(JSON.parse(localStorage.TIPO_DOCUMENTO))
const pais = ref(JSON.parse(localStorage.PAIS))
const entidade = ref(JSON.parse(localStorage.ENTIDADE))
const distrito = ref(JSON.parse(localStorage.DISTRITO))

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
                  NIF<br>
                  <strong>{{ _personData.nif }}</strong>
                </div>
              </ion-col>

              <ion-col size="6">
                <div class="sc-ion-label-md-h sc-ion-label-md-s md ion-text-left">
                  Nome<br>

                  <strong v-if="networkConditions == 'online'">{{ _personData.nome }}</strong>

                  <ion-input v-else placeholder="Introduz aqui" name="PersonName"></ion-input>
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
                  <section v-if="networkConditions == 'online'">
                    <strong v-if="morada.morada">{{ morada.morada }}</strong>
                    <strong v-else>N/A</strong>
                  </section>

                  <section v-else>
                    <ion-input placeholder="Introduz aqui" name="moradaName"></ion-input>
                  </section>

                </div>
              </ion-col>

              <ion-col size="4">
                <div class="sc-ion-label-md-h sc-ion-label-md-s md ion-text-left">
                  Local<br>
                  <section v-if="networkConditions == 'online'">
                    <strong v-if="morada.local?.descricao">{{ morada.local?.descricao }}</strong>
                    <strong v-else>N/A</strong>
                  </section>
                  <section v-else>
                    <ion-input placeholder="Introduz aqui" name="MoradaLocalDes"></ion-input>
                  </section>
                </div>
              </ion-col>

              <ion-col size="4">
                <div class="sc-ion-label-md-h sc-ion-label-md-s md ion-text-left">
                  Localidade<br>
                  <section v-if="networkConditions == 'online'">
                    <strong v-if="morada.localidade">{{ morada.localidade }}</strong>
                    <strong v-else>N/A</strong>
                  </section>
                  <section v-else>
                    <ion-input placeholder="Introduz aqui" name="moradaLocalidade"></ion-input>
                  </section>
                </div>
              </ion-col>

              <ion-col size="4">
                <div class="sc-ion-label-md-h sc-ion-label-md-s md ion-text-left">
                  Domicilio Sede<br>
                  <section v-if="networkConditions == 'online'">
                    <strong v-if="morada.domicilioSede">{{ morada.domicilioSede }}</strong>
                    <strong v-else>N/A</strong>
                  </section>

                  <section v-else>
                    <ion-input placeholder="Introduz aqui" name="moradaDomicilioSede"></ion-input>
                  </section>
                </div>
              </ion-col>

              <ion-col size="4">
                <div class="sc-ion-label-md-h sc-ion-label-md-s md ion-text-left">
                  Fração<br>
                  <section v-if="networkConditions == 'online'">
                    <strong v-if="morada.fracao">{{ morada.fracao }}</strong>
                    <strong v-else>N/A</strong>
                  </section>
                  <section v-else>
                    <ion-input placeholder="Introduz aqui" name="moradaFracao"></ion-input>
                  </section>
                </div>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>
      <!--      END: MORADA-->

      <!--      START: ID -->
      <ion-card :class="!isGeneratingPDF || 'no-box-shadow'" v-show="networkConditions == 'offline'">
        <ion-item>
          <ion-label>Documento Identificação</ion-label>
        </ion-item>

        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-col size="2">
                <div class="sc-ion-label-md-h sc-ion-label-md-s md ion-text-left">
                  <ion-label>Doc. Identificação</ion-label>
                  <ion-select name="docID" interface="popover" placeholder="Selecione aqui">
                    <ion-select-option v-for="docTipo in tipoDocumento" :value="docTipo.ID" :key="docTipo.ID">
                      {{ docTipo.DESCRICAO }}
                    </ion-select-option>
                  </ion-select>
                </div>
              </ion-col>

              <ion-col size="2">
                <div class="sc-ion-label-md-h sc-ion-label-md-s md ion-text-left">
                  Número<br>
                  <ion-input name="docNumero" placeholder="Introduz aqui"></ion-input>
                </div>
              </ion-col>

              <ion-col size="2">
                <div class="sc-ion-label-md-h sc-ion-label-md-s md ion-text-left">
                  <ion-label>País de Emissão</ion-label>
                  <ion-select name="paisEmissao" interface="popover" placeholder="Selecione aqui">
                    <ion-select-option v-for="docTipo in pais" :value="docTipo.ID" :key="docTipo.ID">
                      {{ docTipo.DESCRICAO }}
                    </ion-select-option>
                  </ion-select>
                </div>
              </ion-col>

              <ion-col size="2">
                <div class="sc-ion-label-md-h sc-ion-label-md-s md ion-text-left">
                  <ion-label>Entidade Emissora</ion-label>
                  <ion-select name="entidadeEmissora" interface="popover" placeholder="Selecione aqui">
                    <ion-select-option v-for="docTipo in entidade" :value="docTipo.ID" :key="docTipo.ID">
                      {{ docTipo.DESCRICAO }}
                    </ion-select-option>
                  </ion-select>
                </div>
              </ion-col>

              <ion-col size="2">
                <div class="sc-ion-label-md-h sc-ion-label-md-s md ion-text-left">
                  <ion-label>Local da Emissão</ion-label>
                  <ion-select name="localEmissao" interface="popover" placeholder="Selecione aqui">
                    <ion-select-option v-for="docTipo in distrito" :value="docTipo.ID" :key="docTipo.ID">
                      {{ docTipo.DESCRICAO }}
                    </ion-select-option>
                  </ion-select>
                </div>
              </ion-col>

            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>
      <!--      END: ID-->

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
            <ion-button v-show="!isGeneratingPDF" @click="startSignatureProcess('container'+_personData.id)">
              <section v-if="networkConditions == 'online'">
                Assinar
              </section>

              <section v-else>
                Guardar e Assinar
              </section>
            </ion-button>
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

.no-box-shadow {
  box-shadow: none !important;
}

</style>
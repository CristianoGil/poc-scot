<script lang="ts" setup>
import {PropType, defineProps, computed, watch} from "vue";
import {PersonResponse} from "@/model/person";
import {pageTitle} from "@/state/pageState";
import {useRoute} from "vue-router";

const route = useRoute();
pageTitle.value = "Signature PDF";

const props = defineProps({
  personData: {
    type: String,
    required: true,
  }
})
const _personData = computed( () =>  JSON.parse(props.personData) as PersonResponse)
console.log(_personData.value)

</script>

<template>
  <ion-content :fullscreen="true">
    <div id="container" class="app-content">
      <ion-card>
        <ion-item>
          <ion-label>ion-item in a card, icon left, button right</ion-label>
        </ion-item>

        <ion-card-content>
          This is content, without any paragraph or header tags,
          within an ion-card-content element.
        </ion-card-content>
      </ion-card>
    </div>
  </ion-content>
</template>


<style scoped lang="scss">
#container {
  width: 100%;
  text-align: center;
}
</style>
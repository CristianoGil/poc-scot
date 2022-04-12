import { ref} from 'vue';
import {ResponseSignature} from "./../model/signature";

export const pageTitle = ref('Home');
export const isGeneratingPDF = ref(false);
export const signedPDF = ref<ResponseSignature>();
export const networkConditions = ref<string>('offline');
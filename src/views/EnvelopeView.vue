
Isso acontece porque o Vue está tentando exibir diretamente o objeto, o que resulta na string [object Object]. Para corrigir isso, precisamos acessar as propriedades internas de cada objeto para exibi-las adequadamente. Aqui está como você pode ajustar o código:

Solução Atualizada
vue
Copiar código
<template>
  <div>
    <h2>Detalhes do Envelope</h2>
    <div v-if="envelope">
      <ul>
        <li v-for="(value, key) in envelope" :key="key">
          <strong>{{ key }}:</strong>
          <!-- Caso seja um objeto -->
          <span v-if="isObject(value)">
            <ul>
              <li v-for="(subValue, subKey) in value" :key="subKey">
                <strong>{{ subKey }}:</strong> {{ formatValue(subValue) }}
              </li>
            </ul>
          </span>
          <!-- Caso seja um array -->
          <span v-else-if="Array.isArray(value)">
            <ol>
              <li v-for="(item, index) in value" :key="index">
                <ul v-if="isObject(item)">
                  <li v-for="(subValue, subKey) in item" :key="subKey">
                    <strong>{{ subKey }}:</strong> {{ formatValue(subValue) }}
                  </li>
                </ul>
                <span v-else>{{ formatValue(item) }}</span>
              </li>
            </ol>
          </span>
          <!-- Caso seja um valor simples -->
          <span v-else>
            {{ value }} 
          </span>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Carregando...</p>
    </div>
  </div>
</template>



<script>
export default {
  props: {
    envelope: {
      type: Object,
      required: true,
    },
  },
  methods: {
    isObject(value) {
      return typeof value === 'object' && value !== null && !Array.isArray(value);
    },
    formatValue(value) {
      // Exibe valores nulos ou indefinidos como strings
      if (value === null) return 'null';
      if (value === undefined) return 'undefined';
      return value;
    },
  },
};
</script>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { axiosInstance, axiosProd } from '@/services/http.js';
import { useCounterStore } from '@/stores/counter.js';




const route = useRoute();
const envelopeId = route.params.id;


function isObject(value) {
    return value && typeof value === 'object' && !Array.isArray(value);
}

const envelope = ref(null);

async function LerEnvelopeDetalhes() {
    try {
        const Token = useCounterStore();
        const { data } = await axiosInstance.get('/envelopes/'+envelopeId, {
            headers: {
            Authorization: 'Bearer '+ Token.token,
        },
    });
        envelope.value = data.body; 
    } catch (error) {
        console.error(error?.response?.data || error.message);
    }
}

onMounted(() => {
    LerEnvelopeDetalhes();
});
</script>

<style lang="scss" scoped>
</style>

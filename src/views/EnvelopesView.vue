<template>
    <div>
        <h2>Envelopes</h2>
        <ul>
            <li v-for="envelope in envelopes" :key="envelope._id">
                <router-link :to="{ name: 'envelopesSolo', params: { id: envelope._id } }">
                    {{ envelope.descricao }}
                </router-link>
                <!-- Botão para deletar -->
                <button @click="EditarEnvelope(envelope._id)">Editar</button>
                <!-- Botão para deletar -->
                <button @click="DeletarEnvelope(envelope._id)">Apagar</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { axiosInstance, axiosProd } from '@/services/http.js';
import { useCounterStore } from '@/stores/counter.js';
import { useRouter } from 'vue-router';

const router = useRouter();

const envelopes = ref([]);

async function Lerenvelopes() {
    try {
        const Token = useCounterStore();
        const { data } = await axiosInstance.get('/envelopes', {
            headers: {
            Authorization: 'Bearer '+ Token.token,
        },
});
        envelopes.value = data.body; // Armazena os dados recebidos no estado
        console.log(data);
    } catch (error) {
        console.error(error?.response?.data || error.message);
    }
}

async function EditarEnvelope(id) {
     router.push({ name: 'editarEnvelopes', params: { id: id } });
 
}

async function DeletarEnvelope(id) {
    try {
        const Token = useCounterStore();
        const { data } = await axiosInstance.delete('/envelopes/'+id, {
            headers: {
            Authorization: 'Bearer '+ Token.token,
        },
});
    await router.push({ name: 'dashboard' });
        console.log(data);
    } catch (error) {
        console.error(error?.response?.data || error.message);
    }
}


onMounted(() => {
    Lerenvelopes();
});
</script>

<style lang="scss" scoped>
</style>

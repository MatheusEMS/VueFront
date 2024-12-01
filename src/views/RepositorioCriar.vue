<template>
    <div>
      <h2>Criar Novo Repositório</h2>
      <form @submit.prevent="criarRepositorio">
        <!-- Nome do Repositório -->
        <div>
          <label for="nome">Nome do Repositório:</label>
          <input
            v-model="form.Repositorio.nome"
            id="nome"
            type="text"
            required
            placeholder="Digite o nome do repositório"
          />
        </div>
  
        <!-- Campos booleanos (Sim/Não) -->
        <div v-for="(label, key) in camposBooleanos" :key="key">
          <label :for="key">{{ label }}</label>
          <select v-model="form.Repositorio[key]" :id="key">
            <option value="S">Sim</option>
            <option value="N">Não</option>
          </select>
        </div>
  
        <!-- Botão de envio -->
        <div>
          <button type="submit">Criar Repositório</button>
        </div>
      </form>
    </div>
  </template>
  

  <script setup>
  import { axiosInstance, axiosProd } from '@/services/http.js';
  import { useCounterStore } from '@/stores/counter.js';
  import { reactive, ref, toRaw } from 'vue';
  
  const Token = useCounterStore();

  const form = ref({
  Repositorio: {
    Usuario: {
      id: Token.id || null, 
    },
    nome: '',
    compartilharCriacaoDocs: 'S',
    compartilharVisualizacaoDocs: 'S',
    ocultarEmailSignatarios: 'N',
    nomeRemetente: null,
    opcaoValidCodigo: 'S',
    opcaoValidCertICP: 'S',
    opcaoValidDocFoto: 'S',
    opcaoValidDocSelfie: 'S',
    opcaoValidTokenSMS: 'S',
    opcaoValidLogin: 'S',
    opcaoValidReconhecFacial: 'S',
    opcaoValidPix: 'S',
    lembrarAssinPendentes: 'S',
  },
});
  
  const camposBooleanos = {
    compartilharCriacaoDocs: 'Compartilhar Criação de Documentos',
    compartilharVisualizacaoDocs: 'Compartilhar Visualização de Documentos',
    ocultarEmailSignatarios: 'Ocultar Email dos Signatários',
    opcaoValidCodigo: 'Opção de Validação por Código',
    opcaoValidCertICP: 'Opção de Validação por Certificado ICP',
    opcaoValidDocFoto: 'Opção de Validação por Documento com Foto',
    opcaoValidDocSelfie: 'Opção de Validação por Documento com Selfie',
    opcaoValidTokenSMS: 'Opção de Validação por Token SMS',
    opcaoValidLogin: 'Opção de Validação por Login',
    opcaoValidReconhecFacial: 'Opção de Validação por Reconhecimento Facial',
    opcaoValidPix: 'Opção de Validação por Pix',
    lembrarAssinPendentes: 'Lembrar Assinaturas Pendentes',
  };
  
  async function criarRepositorio() {
    const tokenAsten = "QsUoPYGk81V5QypP2huHk2OOJfr1FyeQ79p1tt3JCiIoH93GbnkwxF6S60yFQoZwYCzUwZVb-Lk9KvOx1EDnvUXXJGk3Uy1nB2gmDZqenxwIuv9-fFiDK1BmDsPkWlfS-Dov2cKnMX3TaYIWaKa9wf9OXLOaOmhS";
    const rawForm = toRaw(form.value);
    console.log("Dados enviados:", rawForm);
    try {
      
        const { data } = await axiosInstance.post('/inserirRepositorio', {
          /*headers: {
            Authorization: 'Bearer '+ Token.token,
        },*/
    token: tokenAsten,
    params: rawForm, 
  });
    
    //problema com referencias circulares, lembrar para perguntar

      console.log('Repositório criado com sucesso:', response.data);
      alert('Repositório criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar repositório:', error?.response?.data || error.message);
      alert('Erro ao criar repositório.');
    }
  }
  </script>
  

<style lang="scss" scoped>
</style>

<template>
    <div>
      <h2>Criar Novo Envelope(Local)</h2>
      <form @submit.prevent="criarEnvelope">
        <!-- Campo: Descrição -->
        <div>
          <label for="descricao">Descrição:</label>
          <input v-model="form.descricao" id="descricao" type="text" required />
        </div>
  
        <!-- Campo: Mensagem -->
        <div>
          <label for="mensagem">Mensagem:</label>
          <textarea v-model="form.mensagem" id="mensagem" required></textarea>
        </div>
  
        <!-- Campo: Repositório -->
        <div>
          <label for="repositorioId">ID do Repositório:</label>
          <input v-model="form.repositorioId" id="repositorioId" type="number" required />
        </div>

         <!-- Campo: Data de Expiração -->
      <!--<div>
        <label for="dataExpiracao">Data de Expiração (yyyy-mm-dd):</label>
        <input
          v-model="form.dataExpiracao"
          id="dataExpiracao"
          type="date"
          required
        />
      </div> -->

        <!-- Campo: Documentos -->
      <div>
        <label for="nomeArquivo">Nome do arquivo:</label>
        <input v-model="form.listaDocumentos.nomeArquivo" id="nomeArquivo" type="text" required />
      </div>

      <div>
        <label for="mimeType">mimeType:</label>
        <input v-model="form.listaDocumentos.mimeType" id="mimeType" type="text" required />
      </div>

      <div>
        <label for="conteudo">Conteudo:</label>
        <input v-model="form.listaDocumentos.conteudo" id="conteudo" type="text" required />
      </div>

      <!-- Campos booleanos (Sim/Não) -->
      <div v-for="(label, key) in camposBooleanos" :key="key">
          <label :for="key">{{ label }}</label>
          <select v-model="form[key]" :id="key">
            <option value="S">Sim</option>
            <option value="N">Não</option>
          </select>
        </div>
  
        <!-- Botão de Enviar -->
        <div>
          <button type="submit">Criar Envelope</button>
        </div>
      </form>
    </div>
  </template>
  
  

  <script setup>
  import { ref } from 'vue';
  import { axiosInstance, axiosProd } from '@/services/http.js';
  import { useCounterStore } from '@/stores/counter.js';
  import { useRoute, useRouter } from 'vue-router';


const route = useRoute();
const router = useRouter()
  
  // Estado do formulário
const form = ref({
  descricao: '',
  mensagem: '',
  repositorioId: '', 
  listaDocumentos: [
    {
      nomeArquivo: '', 
      mimeType: '',    
      conteudo: '',    
    },
  ],
    usarOrdem: 'S',
    incluirHashTodasPaginas: 'S',
    permitirDespachos: 'S',
    ignorarNotificacoes: 'S',
    ignorarNotificacoesPendentes: 'S',
    bloquearDesenhoPaginas: 'S',          
});

const camposBooleanos = {
    usarOrdem: 'Usar Ordem',
    incluirHashTodasPaginas: 'Incluir Hash em Todas Paginas',
    permitirDespachos: 'Permitir Despachos',
    ignorarNotificacoes: 'ignorar Notificacoes',
    ignorarNotificacoesPendentes: 'ignorar Notificacoes Pendentes',
    bloquearDesenhoPaginas: 'Bloquear Desenho das Paginas',
  };


  
  async function criarEnvelope() {
    try {
      const body = {
      descricao: form.value.descricao,
      mensagem: form.value.mensagem,
      dataExpiracao: form.value.dataExpiracao,
      Repositorio: {
        id: form.value.repositorioId, 
      },
      listaDocumentos: {
        Documento: [
        {
          nomeArquivo: form.value.listaDocumentos.nomeArquivo,
          mimeType: form.value.listaDocumentos.mimeType,
          conteudo: form.value.listaDocumentos.conteudo,
        },
      ]
      },
      listaSignatariosEnvelope: {}, 
      listaObservadores: {},       
      listaTags: {},
      usarOrdem: form.value.usarOrdem,
      incluirHashTodasPaginas: form.value.incluirHashTodasPaginas,
      permitirDespachos: form.value.permitirDespachos,
      ignorarNotificacoes: form.value.ignorarNotificacoes,
      ignorarNotificacoesPendentes: form.value.ignorarNotificacoesPendentes,
      bloquearDesenhoPaginas: form.value.bloquearDesenhoPaginas,     
    };

      console.log('Envelope:', body);
      const Token = useCounterStore();
      const { data } = await axiosInstance.post('/envelopes',body,
         {
            headers: {
                Authorization: 'Bearer ' + Token.token,
            },
        });
        
      //console.log('Envelope criado com sucesso:', response.data);
      alert('Envelope criado com sucesso!');
      await router.push({ name: 'dashboard' });
    } catch (error) {
      console.error('Erro ao criar envelope:', error?.response?.data || error.message);
      alert('Erro ao criar envelope.');
    }
  }

  </script>
  

<style lang="scss" scoped>
</style>
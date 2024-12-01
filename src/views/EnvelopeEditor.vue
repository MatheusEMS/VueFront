<template>
    <div>
      <h2>Editar Envelope(Local)</h2>
      <form @submit.prevent="editarEnvelope">
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
        <div v-for="(documento, index) in form.listaDocumentos" :key="index">
        <label>Conteúdo do Documento {{ index + 1 }}</label>
        <input v-model="documento.conteudo" placeholder="Conteúdo" />

        <div>
        <label>Nome do Arquivo</label>
        <input v-model="documento.nomeArquivo" placeholder="Nome do Arquivo" />
        </div>

        <label>Mime Type</label>
        <input v-model="documento.mimeType" placeholder="Mime Type" />
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
          <button type="submit">Editar Envelope</button>
        </div>
      </form>
    </div>
  </template>
  
  

  <script setup>
  import { ref, onMounted } from 'vue';
  import { axiosInstance, axiosProd } from '@/services/http.js';
  import { useCounterStore } from '@/stores/counter.js';
  import { useRoute, useRouter } from 'vue-router';


const route = useRoute();
const router = useRouter();
const envelopeId = route.params.id;
  
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


  const isEditMode = ref(false);

  onMounted(() => {
    carregarEnvelope();
});

    async function carregarEnvelope() {
      try {
        const Token = useCounterStore();
        const { data } = await axiosInstance.get('/envelopes/'+envelopeId, {
            headers: {
            Authorization: 'Bearer '+ Token.token,
        },
    });
    console.log('envelope:', data.body);
    
        form.value = {
          descricao: data.body.descricao,
          mensagem: data.body.mensagem,
          repositorioId: data.body.Repositorio.id,
          listaDocumentos: data.body.listaDocumentos?.Documento?.map((doc) => ({
            nomeArquivo: doc.nomeArquivo,
            mimeType: doc.mimeType,
            conteudo: doc.conteudo,
            })),
          //nomeArquivo: data.body.listaDocumentos.Documento.nomeArquivo,
          usarOrdem: data.body.usarOrdem,
            incluirHashTodasPaginas: data.body.incluirHashTodasPaginas,
            permitirDespachos: data.body.permitirDespachos,
            ignorarNotificacoes: data.body.ignorarNotificacoes,
            ignorarNotificacoesPendentes: data.body.ignorarNotificacoesPendentes,
            bloquearDesenhoPaginas: data.body.bloquearDesenhoPaginas,  
        };
      } catch (error) {
        console.error('Erro ao carregar o envelope:', error);
      }
    }
  
  async function editarEnvelope() {
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
        //ao editar os documentos ele exclue
      console.log('Envelope:', body);
      const Token = useCounterStore();
      const { data } = await axiosInstance.put('/envelopes/'+envelopeId, body,
         {
            headers: {
                Authorization: 'Bearer ' + Token.token,
            },
        });
        
      console.log('Envelope editado com sucesso:', data);
      alert('Envelope editado com sucesso!');
      await router.push({ name: 'dashboard' });
    } catch (error) {
      console.error('Erro ao editar envelope:',  error.message);
      alert('Erro ao editar envelope.');
    }
  }

  </script>
  

<style lang="scss" scoped>
</style>
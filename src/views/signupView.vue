<template>

    <h2>Criar conta</h2>
    
    <form @submit.prevent="Signup">
      <input type="text" placeholder="Seu email" v-model="user.email">
      <input type="password" placeholder="Sua senha" v-model="user.senha">
      <button type="submit">Criar</button>
    </form>
    </template>
    
    <script setup>
    import { axiosInstance, axiosProd } from '@/services/http.js';
    import { reactive } from 'vue';
    import { useCounterStore } from '@/stores/counter.js';
    
    const auth = useCounterStore();
    
    const user = reactive({
      email:"",
      senha:""
    })
    
    async function Signup(){
      try {
        const {data} = await axiosInstance.post('/user/signup',user);
        console.log(data);
      } catch (error) {
        console.log(error?.response?.data);
      }
    }
    
    </script>
    
    <style lang="scss" scoped>
    
    </style>
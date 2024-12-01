<template>

<h2>Login</h2>

<form @submit.prevent="Login">
  <input type="text" placeholder="Seu email" v-model="user.email">
  <input type="password" placeholder="Sua senha" v-model="user.senha">
  <button type="submit">Login</button>
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

async function Login(){
  try {
    const {data} = await axiosInstance.post('/user/login',user);
    const { token, email, id } = data.body;
    console.log('data:', token);
    auth.setToken(token);  // Armazena o token
    auth.setUser(id);   // Armazena o e-mail
  } catch (error) {
    console.log(error?.response?.data);
  }
}

</script>

<style lang="scss" scoped>

</style>
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3002/api',
    //baseURL: 'https://plataforma.astenassinatura.com.br/api',
    headers: { 'Content-Type': 'application/json' }
});

const axiosProd = axios.create({
    baseURL: 'https://plataforma.astenassinatura.com.br/api',
    headers: { 'Content-Type': 'application/json' },
});

export { axiosInstance, axiosProd };
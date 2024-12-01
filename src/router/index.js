import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useCounterStore } from '@/stores/counter.js';
 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/signupView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/envelopes',
      name: 'envelopes',
      component: () => import('../views/EnvelopesView.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/envelopes/:id',
      name: 'envelopesSolo',
      component: () => import('../views/EnvelopeView.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/Editarenvelopes/:id',
      name: 'editarEnvelopes',
      component: () => import('../views/EnvelopeEditor.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/envelopes',
      name: 'criarEnvelope',
      component: () => import('../views/EnvelopeCriar.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/inserirRepositorio',
      name: 'criarRepositorio',
      component: () => import('../views/RepositorioCriar.vue'),
      meta: {
        auth: true
      }
    },
  ],
})

router.beforeEach((to,from,next) => {
  if(to.meta?.auth) {
    const auth = useCounterStore();
    if (auth.email && auth.token) {
      next();
    }else {
      next({ name: 'login'});
    }
  }else {
    next();
  }
})

export default router;

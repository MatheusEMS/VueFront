import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
                                            //checar
export const useCounterStore = defineStore('user/login', () => {
  const token = ref(localStorage.getItem('token'));
  const email = ref(localStorage.getItem('email'));
  const id = ref(localStorage.getItem('id'));
  //const user = ref(JSON.parse(localStorage.getItem('email')));

  function setToken(tokenvalue) {
    localStorage.setItem('token', tokenvalue);
    token.value = tokenvalue;
  }

  function setUser(uservalue) {
    localStorage.setItem('id', uservalue);
    id.value = uservalue;
  }

  /*function setUser(uservalue) {
    localStorage.setItem('user', JSON.stringify(uservalue));
    email.value = uservalue;
  }*/

  return {
    token, email,id,
    setToken, setUser
  }
})

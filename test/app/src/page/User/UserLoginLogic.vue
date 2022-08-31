<template>
  <div>
    <h1>User Log In</h1>
    <div>
      <UserLoginForm
          @submit="loginFormSubmit"
      />
    </div>
  </div>
</template>

<script>

import UserLoginForm from './Form/UserLoginForm';

export default {
  name: 'UserLoginLogic',
  components: {
    UserLoginForm,
  },
  methods: {
    //
    async login(login, password) {
      // Добавте вашу логику авторизации
    },
    loginFormSubmit(form) {
      console.log('Login form success submit:', form);
      this.login(form.login, form.password);
    },
  
  },
};
</script>


<template>
  <div>
    <h1>User Log In</h1>
    <div>
      <UserRegistrationForm
          @submit="registrationFormSubmit"
      />
    </div>
  </div>
</template>

<script>

import UserRegistrationForm from "./Form/UserRegistrationForm";

export default {
  name: "UserRegistrationLogic",
  components: {
    UserRegistrationForm,
  },
  methods: {
    //
    async registration(login, password) {
      // Добавте вашу логику авторизации
    },
    registrationFormSubmit(form) {
      console.log('Login form success submit:', form)
      this.registration(form.login, form.password)
    },
    
  },
};
</script>


<template>
  <div class="container">
    <div class="row mb-5">
      <h1 class="mb-5">Пример формы авторизация</h1>
      <div class="co-12 col-md-6">
        <h3>Форма</h3>
        <LoginForm ref="loginForm"/>
        <div class="btn btn-primary mt-3" @click="auth">Войти</div>
      </div>
      <div class="co-12 col-md-6">
        <h3>Результат</h3>
        <pre>{{formData || 'null' }}</pre>
      </div>
    </div>

  </div>
</template>

<script>

import LoginForm from "@component/Form/LoginForm";

export default {
  name: "Authorization",
  components: {
    LoginForm,
  },
  data(){
    return {
      formData: null,
    };
  },
  methods: {
    async auth() {
      this.formData = this.$refs.loginForm.formSubmitGetData();
      if(!this.formData) { return; }
    }
  }
};
</script>


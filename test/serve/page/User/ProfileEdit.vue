<template>
  <div class="container">
    <div class="row mb-5">
      <h1 class="mb-5">Пример формы редактирования пользователя</h1>
      <div class="co-12 col-md-6">
        <h3>Форма</h3>
        <ProfileEditForm ref="myForm"/>
        <div class="btn btn-primary mt-3" @click="auth">Submit</div>
      </div>
      <div class="co-12 col-md-6">
        <h3 class="mb-4">Результат</h3>
        <pre>{{formData || 'null' }}</pre>
      </div>
    </div>

  </div>
</template>

<script>

import ProfileEditForm from "@component/Form/ProfileEditForm";

export default {
  name: "ProfileEdit",
  components: {
    ProfileEditForm,
  },
  data(){
    return {
      formData: null,
    };
  },
  methods: {
    async auth() {
      this.formData = this.$refs.myForm.formSubmitGetData();
      if(!this.formData) { return; }
    }
  }
};
</script>


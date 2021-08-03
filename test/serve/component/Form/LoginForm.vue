<template>
  <form @submit="formSubmit"  @submit.prevent="formSubmit">
    <FveLogin
      label="Логин"
      name="login"
      required
      v-model="form.login"
    />
    <FvePassword
      label="Пароль"
      name="password"
      required
      v-model="form.password"
    />
  </form>
</template>

<script>

import FveLogin     from "@fve/Element/Text/FveLogin";
import FvePassword  from "@fve/Element/Text/FvePassword";
//
import FveFormMixin from "@fve/Mixin/FveMixinForm";

export default {
  mixins: [
    FveFormMixin
  ],
  components: {
    FveLogin,
    FvePassword,
  },
  methods: {
    formSchema() {
      return {
        login: {
          type: String,
          default: () => { return ''; }
        },
        password: {
          type: String,
          default: () => { return ''; }
        },
      };
    },
  }
};

</script>

<style lang="scss" scoped>
</style>

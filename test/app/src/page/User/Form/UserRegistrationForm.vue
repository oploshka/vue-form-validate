<template>
  <FveForm class="form-auth form-base row">
    <div class="form-group">
      <FveText
        :field="field.login"
        label="Login"
        placeholder="Login"
        caption="Login will be used for email@zombty.com"
      />
    </div>
    <div class="form-group">
      <FveEmail
          :field="field.email"
          label="E-mail"
          placeholder="name@mail.com"
      />
    </div>
    <div class="form-group">
      <FvePassword
        :field="field.password"
        label="Password"
        placeholder="6+ Characters"
      />
    </div>
    <div class="form-group">
      <!-- <router-link :to="{name: $routerName.USER_AUTH}" class="auth__remember-password">Забыли пароль?</router-link> -->
      <button type="button" @click="submit" class="pl-btn auth__btn">Registration</button>
    </div>
  </FveForm>
</template>

<script>

import FveMixinForm    from 'vue-form-element/src/Mixin/FveMixinForm';

import FveText         from "@field/Text/FveText";
import FveEmail        from '@field/Text/FveEmail';
import FvePassword     from '@field/Text/FvePasswordShowPass';

export default {
  name: "UserRegistrationForm",
  mixins: [
    FveMixinForm
  ],
  components: {
    FveText,
    FveEmail,
    FvePassword,
  },
  methods: {
    formSchema() {
      return {
        login: {
          type: String,
          default() { return ''; },
          field: {
            required: true,
          }
        },
        email: {
          type: String,
          default() { return ''; },
          field: {
            required: true,
          }
        },
        password: {
          type: String,
          default: () => { return ''; },
          field: {
            required: true,
          }
        },
      };
    },
  }

};

</script>

<template>
  <FveForm class="form-auth form-base row">
    <div class="form-group">
      <FveEmail
        :field="field.login"
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
      <button type="button" @click="submit" class="pl-btn auth__btn">Log in</button>
    </div>
  </FveForm>
</template>

<script>

import FveMixinForm    from 'vue-form-element/src/Mixin/FveMixinForm';

import FveEmail        from '@field/Text/FveEmail';
import FvePassword     from '@field/Text/FvePasswordShowPass';

export default {
  name: "UserLoginForm",
  mixins: [
    FveMixinForm
  ],
  components: {
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

<style lang="scss" scoped>

.form-group {
  margin-bottom: 2rem;
}

.auth__add-info {
  // display: flex;
  // justify-content: space-between;
  margin-bottom: 43px;
}
.auth__btn {
  width: 100%;
  border-radius: 8px;
  background-color: var(--color-primary);
  color: #fff;
  padding: 12px 24px;
  border: 0;
  cursor: pointer;
  line-height: 24px;
  font-size: 16px;
  transition: 0.25s ease;
  &:hover {
    background-color: #F98D5F;
  }
}
</style>

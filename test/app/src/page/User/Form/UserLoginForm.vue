<template>
  <div>
    <pre>{{field}}</pre>
    
    <FveLogin :field="field.login"/>
    <FvePassword :field="field.password" />
    
    <pre>{{form}}</pre>
  </div>
</template>

<script>

import FveMixinForm    from 'vue-form-element/src/Mixin/FveMixinForm';

import FveLogin        from '@field/Text/FveLogin';
import FvePassword     from '@field/Text/FvePasswordShowPass';

export default {
  name: 'UserLoginForm',
  mixins: [
    FveMixinForm
  ],
  components: {
    FveLogin,
    FvePassword,
  },
  methods: {
    formSchema() {
      return {
        login: {
          // TODO: подумать о том, чтоб задавать здесь component (для рендеринга)...
          type: String,
          default() { return 'test'; },
          required: true,
          label: 'Login',
          placeholder: 'User'
          
          // TODO: возможно стоит хранить дочерний компонент тут...
        },
        password: {
          type: String,
          default: () => { return '1'; },
          required: true,
          label: 'Password',
          placeholder: '******',
          
          // TODO: добавить флаг валидности (возможно стоит выносить логику полей отдельно)...
          // update: (val) => {
          //   // console.log(val, this);
          //   this.field.login.label = 'Login ' + val;
          // }
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

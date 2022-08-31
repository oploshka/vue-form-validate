<template>
  <div>
    [[[
      <div>asdasd</div>
    ]]]
    <FveEmail :field="field.login"/>
  </div>
</template>

<script>

import FveMixinForm    from 'vue-form-element/src/Mixin/FveMixinForm';
console.log(FveMixinForm);

import FveEmail        from '@field/Text/FveEmail';
// import FvePassword     from '@field/Text/FvePasswordShowPass';

console.log(FveEmail);
debugger;

export default {
  name: 'UserLoginForm',
  mixins: [
    FveMixinForm
  ],
  components: {
    FveEmail,
    // FvePassword,
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

<template>
  <form @submit="formSubmit"  @submit.prevent="formSubmit">
    <FveEmail
      label="E-mail"
      name="email"
      required
      v-model="form.email"
    />
  </form>
</template>

<script>

import FveEmail from "@fve/Element/Text/FveEmail";
//
import FveFormMixin from "@fve/Mixin/FveMixinForm";

export default {
  mixins: [
    FveFormMixin
  ],
  components: {
    FveEmail
  },
  methods: {
    formSchema() {
      return {
        email: {
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


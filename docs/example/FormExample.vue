<template>
  <form @submit.prevent="formSubmit" novalidate="novalidate">
    <input type="submit" value="submit" style="display: none !important;">
    <!-- form start -->

    <TextFormElement
      v-model="form.name"
    />

    <!-- form end -->
  </form>
</template>

<script>

import TextFormElement from "@FormValidate/Element/FveText";

import FveFormMixin   from "@FormValidate/FveFormMixin";

export default {
  mixins: [
    FveFormMixin
  ],
  components: {
    TextFormElement,
  },
  methods: {
    formSchema() {
      return {
        name: {
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

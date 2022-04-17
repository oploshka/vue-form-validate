<template>
  <FveTemplateField>
    <textarea
      type="text"
      class="fei-control"
      :name="name"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :value="value"
      :required="required"
      autocomplete="off"
      @input="inputFormElement"
      @change="inputFormElement"
      @keypress.enter="$emit('keypress-enter')"
    ></textarea>
  </FveTemplateField>
</template>

<script>

import FveMixinField from "@fve/Mixin/FveMixinField";

export default {
  name: 'FveTextarea',
  mixins: [
    FveMixinField
  ],
  props: {
    // значение по умолчанию (можно переопределить тип)
    value    : { type: String, default: '' },
  },
  methods: {
    prepareValue($event) {
      return $event.target.value;
    },
    isEmpty(value) {
      return value === '';
    },
    validateFunction(str) {
      return 'SUCCESS';
    },
  }
};
</script>

<style lang="scss" scoped>

@import "~@fve/style/textarea.scss";

</style>

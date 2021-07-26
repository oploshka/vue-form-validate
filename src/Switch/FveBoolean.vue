<template>
  <components
    :is="theme3"
    :label="label"
    :selected="value"
    @change="change"
  />
</template>

<script>

import FveMixinField from "@fve/Mixin/FveMixinField";

export default {
  mixins: [
    FveMixinField
  ],
  data(){
    return {
      theme: () => import('@fve/Switch/FveCheckbox'),
      theme2: () => import('@fve/Switch/FveSwitch'),
      theme3: () => import('@fve/Switch/FveRadio'),
    };
  },
  props: {
    // значение по умолчанию (можно переопределить тип)
    value    : { type: Boolean, default: false },
  },
  methods: {
    change(){
      this.inputFormElement(!this.value);
    },
    prepareValue($event) {
      return $event;
    },
    isEmpty(value) {
      return value === ''; // TODO: fix
    },
    // eslint-disable-next-line
    validateFunction(str) {
      return 'SUCCESS';
    },
  }
};
</script>

<style lang="scss" scoped>

@import "~@fve/style/inputText.scss";

</style>

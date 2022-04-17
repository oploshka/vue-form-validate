<template>
  <FveTemplateField>
    <textarea
        type="text"
        class="fei-control"
        :name="field.name"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :value="value.input"
        :required="field.required"
        autocomplete="off"
        @input="inputValueUpdate"

        v-bind="view.inputAttr"

        ref="input"
    ></textarea>
  </FveTemplateField>
</template>

<script>

import FveText from '@field/Text/FveText';

export default {
  name: 'FveTextarea',
  // @keypress.enter.prevent.stop="newLine"
  mixins: [
    FveText
  ]
};
</script>

<style lang="scss" scoped>

@import "~@field/../style/textarea.scss";

</style>

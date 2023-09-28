<template>
  <FveTemplateField>
    <input
      :type="view.type"
      :name="field.name"
      :placeholder="field.placeholder || ''"
      :readonly="!!field.readonly"
      :disabled="!!field.disabled"
      :value="value.input"
      :required="field.required"
      autocomplete="off"
      @input="inputValueUpdate"
      @keypress.enter.prevent="fieldFormSubmit"
      v-bind="view.inputAttr"
      v-imask="mask"
      @accept="onAccept"
      @complete="onComplete"
      ref="input"
    />
  </FveTemplateField>
</template>

<script>
import FveText from './FveText';
import { IMaskDirective } from 'vue-imask';

export default {
  name: 'FvePhone',
  mixins: [ FveText ],
  directives: {
    imask: IMaskDirective
  },
  data() {
    return {
      mask: {
        mask: '+0 (000) 000 00 00',
        lazy: false
      },
    };
  },
  methods: {
    onAccept (e) {
      const maskRef = e.detail;
      this.value.input = maskRef.value;
    },
    onComplete (e) {
      const maskRef = e.detail;
      this.value.input = maskRef.unmaskedValue;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@field/style/inputText.scss';

.btn-show-pass {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  z-index: 12;
  height: 100%;
  border-radius: 0 8px 8px 0;
  padding: 0 17px;
  display: flex;
  align-items: center;
  & > svg {
    fill: var(--fve-placeholder--font-color);
  }
  &:hover > svg {
    fill: var(--color-gray-04-hover);
  }
}
</style>

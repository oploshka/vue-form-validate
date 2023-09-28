<template>
  <FveTemplateField>
    <template
      v-for="(slot, index) of Object.keys($slots)"
      :key="index"
      v-slot:[slot]="rowProps"
    >
      <slot :name="slot" v-bind="rowProps"></slot>
    </template>

    <input
      :type="view.type"
      :name="field.name"
      :placeholder="field.placeholder || ''"
      :readonly="!!field.readonly"
      :disabled="!!field.disabled"
      :value="value.input"
      :required="field.required"
      autocomplete="off"
      @keypress.enter.prevent="fieldFormSubmit"
      v-bind="view.inputAttr"

      v-imask="mask"
      @accept="onAccept"
      @complete="onComplete"

      ref="input"
    />
    <!--@input="inputValueUpdate"-->

  </FveTemplateField>
</template>

<script>

import { IMaskDirective, IMask } from 'vue-imask';

import FveTemplateField from '@field/FveTemplateField';
import FveMixinField from 'vue-form-element/src/Field/FveMixinField';

export default {
  name: 'FveTime',
  mixins: [ FveMixinField ],
  directives: {
    imask: IMaskDirective
  },
  props: {
    modelValue    : { type: String, required: false },
  },
  components: {
    FveTemplateField
  },
  data(){
    return {
      mask: {
        mask: 'MM:HH', // /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
        lazy: false,
        blocks: {
          MM: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23,
            maxLength: 2,
          },

          HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59,
            maxLength: 2,
          },
        }
      },
      view: {
        type: 'text',
        inputAttr: {},
      },
    };
  },
  methods: {
    onAccept (e) {
      const maskRef = e.detail;
      this.inputValueUpdate2(maskRef.value);
    },
    onComplete (e) {
      const maskRef = e.detail;
      this.inputValueUpdate2(maskRef.value);
    },


    // пользовательские действия
    inputValueUpdate($event) {
      this.fieldValueUpdate({input: $event.target.value});
    },
    inputValueUpdate2(value) {
      this.fieldValueUpdate({input: value});
    },

    // описываем структуру value
    valueSchema() {
      return {
        input: {type: String, default: () => { return ''; } }
      };
    },
    convertFieldStorageToValue(valueObj) {
      return valueObj.input;
    },
    convertValueToFieldStorage(value) {
      return {
        input: value,
      };
    },
    isEmpty(valueObj) {
      return valueObj.input === '' || valueObj.input === '__:__' || valueObj.input === null || valueObj.input === undefined;
    },
    validate(valueObj) {
      const re = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!re.test(valueObj.input)) {
        return {
          status: 'ERROR',
          code: 'VALIDATE',
          message: 'Проверьте корректность времени',
        };
      }
      return null;
    },
    // Установить фокус на текущий элемент
    setFocus(){
      this.$refs.input.focus();
    },


  },
};
</script>

<style lang="scss" scoped>

@import "~@field/style/inputText.scss";

</style>

<template>
  <FveTemplateField class="fve-color-field">
    <template
      v-for="(slot, index) of Object.keys($slots)"
      :key="index"
      v-slot:[slot]="rowProps"
    >
      <slot :name="slot" v-bind="rowProps"></slot>
    </template>
    <template #prepend-icon>
      <div
        class="fve-color-icon"
        :style="{ backgroundColor: value.input }"
      ></div>
    </template>
    <VDropdown
      :distance="6"
      placement="bottom-end"
      popper-class="v-popper--theme-dropdown--datepicker"
    >
      <input
        :type="view.type"
        :name="field.name"
        :placeholder="field.placeholder || ''"
        :readonly="true"
        :disabled="!!field.disabled"
        :value="value.input"
        :required="field.required"
        autocomplete="off"
        @input="inputValueUpdate"
        @keypress.enter.prevent="fieldFormSubmit"
        v-bind="view.inputAttr"

        ref="input"
      />
      <template #popper="{ hide }">
        <ChromePicker
          :modelValue="value.input"
          @update:modelValue="updateColorPicker"
        />
      </template>
    </VDropdown>
  </FveTemplateField>
</template>

<script>

import FveTemplateField from '@field/FveTemplateField';
import FveMixinField from 'vue-form-element/src/Field/FveMixinField';

import { Chrome  } from '@ckpack/vue-color';

export default {
  name: 'FveColorPicker',
  components: {
    FveTemplateField,
    ChromePicker: Chrome ,
  },
  mixins: [
    FveMixinField
  ],
  data(){
    return {
      view: {
        type: 'text',
        inputAttr: {},
      },
    };
  },
  props: {
    // // значение по умолчанию (можно переопределить тип)
    modelValue    : { type: String, required: false },
    //
    // // Установочные
    // initValue: { type: String, required: false, default: null},
    // // настройки валидации - рекомендованные к реализация
    // min: { type: Number, required: false, default: null},
    // max: { type: Number, required: false, default: null},
  },
  methods: {
    updateColorPicker(e) {
      this.fieldValueUpdate({input: e.hex8});
    },

    // пользовательские действия
    inputValueUpdate($event) {
      this.fieldValueUpdate({input: $event.target.value});
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
      return valueObj.input === '' || valueObj.input === null || valueObj.input === undefined;
    },
    validate(valueObj) {
      if( this.field.min && valueObj.input.length < this.field.min ) {
        return {
          status: 'ERROR',
          code : 'VALIDATE',
          message: 'Длинна строки не менее '+this.field.min+' символов',
        };
      }
      if( this.field.max && valueObj.input.length > this.field.max ) {
        return {
          status: 'ERROR',
          code : 'VALIDATE',
          message: 'Длинна строки не более '+this.field.max+' символов',
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
.fve-color-field {
  --fve-input--padding: 12px 14px 12px 38px;
}
// :root {--fve-input--padding: 12px 14px 12px 38px;}
@import "~@field/style/inputText.scss";
.fve-color-icon {
  width: 16px;
  overflow: hidden;
  border-radius: 4px;
  &::before {
    content: '';
    float: left;
    padding-top: 100%;
  }
}
</style>

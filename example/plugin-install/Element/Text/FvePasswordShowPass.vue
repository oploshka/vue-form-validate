<template>
  <FveTemplateField>
    <input
        :type="view.type"
        :name="field.name"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :value="value.input"
        :required="field.required"
        autocomplete="off"
        @input="inputValueUpdate"
        @keypress.enter.prevent="fieldFormSubmit"
        v-bind="view.inputAttr"
        ref="input"
    />
    <div @click="showPass" class="btn-show-pass">
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path v-if="this.view.type === 'password'" d="M9.89 9.89C10.485 9.298 11.188 9 12 9s1.516.297 2.11.89c.593.594.89 1.297.89 2.11s-.297 1.516-.89 2.11c-.594.593-1.297.89-2.11.89s-1.516-.297-2.11-.89C9.298 13.515 9 12.812 9 12s.297-1.516.89-2.11zm-1.453 5.672c1 .97 2.188 1.454 3.563 1.454s2.547-.485 3.516-1.453c1-1 1.5-2.188 1.5-3.563s-.5-2.547-1.5-3.516c-.97-1-2.141-1.5-3.516-1.5s-2.563.5-3.563 1.5c-.968.97-1.453 2.141-1.453 3.516s.485 2.563 1.454 3.563zm-3.14-9C7.297 5.188 9.53 4.5 12 4.5c2.469 0 4.703.688 6.703 2.063 2 1.375 3.438 3.187 4.313 5.437-.875 2.25-2.313 4.063-4.313 5.438-2 1.375-4.234 2.062-6.703 2.062-2.469 0-4.703-.688-6.703-2.063-2-1.375-3.438-3.187-4.313-5.437.875-2.25 2.313-4.063 4.313-5.438z"/>
        <path v-else d="M11.86 9H12c.813 0 1.516.297 2.11.89.593.594.89 1.297.89 2.11v.188L11.86 9zm-4.313.797c-.375.75-.563 1.484-.563 2.203 0 1.375.485 2.563 1.454 3.563 1 .968 2.187 1.453 3.562 1.453.719 0 1.453-.188 2.203-.563l-1.547-1.547A2.75 2.75 0 0112 15c-.813 0-1.516-.297-2.11-.89C9.298 13.515 9 12.812 9 12c0-.188.031-.406.094-.656L7.547 9.797zM2.016 4.266L3.28 3 21 20.719l-1.266 1.265c-.156-.156-.656-.64-1.5-1.453l-1.875-1.875c-1.343.563-2.797.844-4.359.844-2.469 0-4.703-.688-6.703-2.063-2-1.375-3.438-3.187-4.313-5.437.782-1.938 2.032-3.594 3.75-4.969L3.141 5.438a139.256 139.256 0 00-1.125-1.172zM12 6.984c-.625 0-1.234.125-1.828.375L8.016 5.203C9.234 4.734 10.562 4.5 12 4.5c2.469 0 4.688.688 6.656 2.063 2 1.375 3.438 3.187 4.313 5.437a12.222 12.222 0 01-3.422 4.734l-2.906-2.906c.25-.594.375-1.203.375-1.828 0-1.375-.5-2.547-1.5-3.516-.97-1-2.141-1.5-3.516-1.5z"/>
      </svg>
    </div>
  </FveTemplateField>
</template>

<script>

import FveText from "./FveText";

export default {
  name: "FvePasswordShowPass",
  mixins: [FveText],
  data() {
    return {
      view: {
        type: 'password',
        inputAttr: {},
      },
    };
  },
  methods: {
    showPass() {
      if (this.view.type === "password") {
        this.view.type = "text";
      } else {
        this.view.type = "password";
      }
    },

    validate(valueObj) {
      const min = 6;
      if( valueObj.input.length < min ) {
        return {
          status: 'ERROR',
          code : 'VALIDATE',
          message: 'Длинна строки не менее ' + min + ' символов',
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@field/../style/inputText.scss";

.btn-show-pass {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  z-index: 120;
  height: 100%;
  border-radius: 0 8px 8px 0;
  padding: 0 17px;
  display: flex;
  align-items: center;
  & > svg {
    fill: var(--fve-placeholder--font-color)
  }
  &:hover > svg {
    fill: var(--color-gray-04-hover)
  }
}
</style>

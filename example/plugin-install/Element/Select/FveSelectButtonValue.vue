<template>
  <FveTemplateField>
    <div class="select-button">
      <template v-for="option in optionList" :key="optionGetKey(option)">
        <div
          class="select-button-item"
          :class="[
            `select-button-item--${optionGetKey(option)}`,
            {
              'select-button-item--active':
                value.selectedKey === optionGetKey(option),
            },
          ]"
          @click="selectValueUpdate(option)"
        >
          {{ optionGetName(option) }}
        </div>
      </template>
    </div>
  </FveTemplateField>
</template>

<script>
import FveMixinField from "@fve/Mixin/FveMixinField";
import FveMixinFieldSelect from "@fve/Mixin/FveMixinFieldSelect";

export default {
  name: "FveSelectButtonValue",
  mixins: [FveMixinField, FveMixinFieldSelect],
  props: {
    // // значение по умолчанию (можно переопределить тип)
    modelValue: { type: String, required: false },
  },
  methods: {
    // пользовательские действия
    selectValueUpdate($event) {
      this.fieldValueUpdate({
        selectedKey: this.optionGetKey($event),
      });
    },

    // описываем структуру value
    valueSchema() {
      return {
        selectedKey: {
          type: String,
          default: () => {
            return "";
          },
        },
        // selectedObject: {type: Object, default: () => { return {}; } }
      };
    },
    convertObjectToValue(valueObj) {
      return valueObj.selectedKey;
    },
    convertValueToObject(value) {
      return {
        selectedKey: value,
      };
    },
    isEmpty(valueObj) {
      return valueObj.selectedKey === "";
    },
    validate(valueObj) {
      return null;
    },
    // Установить фокус на текущий элемент
    setFocus() {
      // this.$refs.input.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
//@import "~@fve/style/inputText.scss";

.select-button {
  display: flex;
  //margin: 0.5rem -0.25rem 0.75rem 2rem;
}
.select-button-item {
  font-size: 0.875rem;
  margin: 0 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  color: var(--color-secondary);
  cursor: pointer;
  &--active {
    background-color: transparentize($color-secondary, 0.84); // #eafbfa;
    // color: var(--color-cian);

    //background-color: transparentize($color-secondary, 0.84);

    //&.sec__tab__item--meeting {
    //  background-color: transparentize($color-secondary, 0.84);
    //}
    //&.sec__tab__item--task {
    //  background-color: transparentize($color-cian, 0.84); // #eafbfa;
    //  color: var(--color-cian);
    //}
    //&.sec__tab__item--reminder {
    //  background-color: transparentize($color-yellow, 0.84); // #fefae6;
    //  color: var(--color-yellow);
    //}
  }
}
</style>

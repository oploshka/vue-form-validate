<template>
  <div
    @click="inputValueUpdate(!value.input)"
    :class="['fve__checkbox', formElementBlockClass]"
  >
    <ViewSquare :selected="value.input" />
    <span v-if="badge" class="badge" :style="{ backgroundColor: badge}"></span>
    <label class="fve__checkbox__label" v-if="label && label.length">{{ label }}</label>
  </div>
</template>

<script>
import ViewSquare from "@fve/Switch/Theme/ViewSquare";
import FveMixinField from "vue-form-element/src/Mixin/FveMixinField";

export default {
  name: 'FveText',
  components: {
    ViewSquare
  },
  mixins: [
    FveMixinField,
  ],
  props: {
    // // значение по умолчанию (можно переопределить тип)
    modelValue    : { type: Boolean, required: false },
    badge: {
      type: String,
      default: () => { return ''; }
    },
  },
  methods: {

    // пользовательские действия
    inputValueUpdate(value) {
      this.fieldValueUpdate({ input: value });
    },

    // описываем структуру value
    valueSchema() {
      return {
        input: {type: Boolean, default: () => { return false; } }
      }
    },
    convertObjectToValue(valueObj) {
      return valueObj.input;
    },
    convertValueToObject(value) {
      return {
        input: value,
      }
    },
    isEmpty(valueObj) {
      return valueObj.input === false;
    },
    validate(valueObj) {
      // if( this.field.max && valueObj.input.length > this.field.max ) {
      //   return {
      //     status: 'ERROR',
      //     code : 'VALIDATE',
      //     message: 'Длинна строки не более '+this.field.max+' символов',
      //   }
      // }
      return null;
    },
    // Установить фокус на текущий элемент
    setFocus(){
      // TODO: Research
      // this.$refs.input.focus();
    },


  },
};
</script>

<style lang="scss" scoped>
.fve__checkbox {
  display: flex;
  align-items: center;
}

.fve__checkbox__label {
  margin-left: 0.75rem;
  font-size: 0.875rem;
}

.badge {
  width: 8px;
  height: 8px;
  display: flex;
  border-radius: 50%;
  margin-left: 10px;
}

</style>

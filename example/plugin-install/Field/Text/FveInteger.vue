<script>

import FveText from '@field/Text/FveText';

export default {
  name: 'FveInteger',
  mixins: [
    FveText
  ],
  data(){
    return {
      type: 'number',
    };
  },
  props: {
    // // значение по умолчанию (можно переопределить тип)
    modelValue    : { type: Number, required: false },
    //
    // // Установочные
    // initValue: { type: String, required: false, default: null},
    // // настройки валидации - рекомендованные к реализация
    // min: { type: Number, required: false, default: null},
    // max: { type: Number, required: false, default: null},
  },
  methods: {
    isInDesiredForm(str) {
      const n = Math.floor(Number(str));
      return n !== Infinity && String(n) === str && n >= 0;
    },

    validate(valueObj) {
      if( !this.isInDesiredForm(valueObj.input) ) {
        return {
          status: 'ERROR',
          code : 'VALIDATE',
          message: 'Введите корректное число',
        };
      }
      if( this.field.min && valueObj.input < this.field.min ) {
        return {
          status: 'ERROR',
          code : 'VALIDATE',
          message: 'Значение не может быть меньше '+this.field.min,
        };
      }
      if( this.field.max && valueObj.input > this.field.max ) {
        return {
          status: 'ERROR',
          code : 'VALIDATE',
          message: 'Значение не может быть более '+this.field.max,
        };
      }
      return null;
    },

    convertFieldStorageToValue(valueObj) {
      if (valueObj.input === '') {
        return null;
      }
      if( !this.isInDesiredForm(valueObj.input) ) {
        return undefined;
      }
      return parseInt(valueObj.input);
    },
    convertValueToFieldStorage(value) {
      return {
        input: (!value && value !==0) ? '' : value.toString(),
      };
    },
  },
};
</script>

<style lang="scss" scoped>

@import "~@field/style/inputText.scss";

</style>

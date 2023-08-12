
<script>

import FveMixinField from './FveMixinField';
import {FT_STRING} from '@field/FveFieldType';

export default {
  name: 'FveMixinFieldSwitch',
  mixins: [
    FveMixinField
  ],
  props: {
    modelValue    : { type: Boolean, required: false },
  },
  methods: {

    fieldPropertySchemaPrepare(fieldPropertySchema) {
      // TODO: delete (фикс для работы шаблонов ЖЦ)
      fieldPropertySchema.from = FT_STRING();
      fieldPropertySchema.to = FT_STRING();
    },

    // пользовательские действия
    setValue(val) {
      this.fieldValueUpdate({input: !!val});
    },
    change() {
      this.fieldValueUpdate({input: !this.value.input});
    },

    // описываем структуру value
    valueSchema() {
      return {
        // TODO: input vs selected ???
        input: {type: Boolean, default: () => { return false; } }
      };
    },
    convertFieldStorageToValue(valueObj) {
      return valueObj.input;
    },
    convertValueToFieldStorage(value) {
      return {
        input: !!value,
      };
    },
    isEmpty(/* valueObj */) {
      return false;
    },
    validate(valueObj) {
      return null;
    },
    // Установить фокус на текущий элемент
    // setFocus(){
    //   this.$refs.input.focus();
    // },


  },
};
</script>

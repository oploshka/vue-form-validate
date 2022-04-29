
<script>

import FveMixinField from './FveMixinField';

export default {
  name: 'FveMixinFieldSwitch',
  mixins: [
    FveMixinField
  ],
  props: {
    modelValue    : { type: Boolean, required: false },
  
    // TODO: is need?
    // theme       : { type: String, default: '' },
  },
  methods: {
    
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
    convertObjectToValue(valueObj) {
      return valueObj.input;
    },
    convertValueToObject(value) {
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

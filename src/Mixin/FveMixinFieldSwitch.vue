
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
      this.fieldStateUpdate({input: !!val});
    },
    change() {
      this.fieldStateUpdate({input: !this.value.input});
    },
    
    // описываем структуру value
    valueSchema() {
      return {
        // TODO: input vs selected ???
        input: {type: Boolean, default: () => { return false; } }
      };
    },
    convertFieldStateToValue(fieldState) {
      return fieldState.input;
    },
    convertValueToFieldState(value) {
      return {
        input: !!value,
      };
    },
    isEmpty(/* fieldState */) {
      return false;
    },
    validate(fieldState) {
      return null;
    },
    // Установить фокус на текущий элемент
    // setFocus(){
    //   this.$refs.input.focus();
    // },
    
    
  },
};
</script>

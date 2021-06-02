<script>

import FveMixinField from "@widgetFormValidate/src/Mixin/FveMixinField";
import FveMixinFieldSelect from '@widgetFormValidate/src/Mixin/FveMixinFieldSelect';

import Multiselect from 'vue-multiselect';

export default {
  mixins: [
    FveMixinField,
    FveMixinFieldSelect
  ],
  components: {
    Multiselect
  },
  props: {
    // значение по умолчанию (можно переопределить тип)
    value    : { type: Number, default: () => null },
  },
  methods: {
    prepareValue($event) {
      return $event;
    },
    isEmpty(value) {
      return value === '';
    },
    // eslint-disable-next-line
    validateFunction(str) {
      return 'SUCCESS';
    },
  },
  computed: {
    _value: {
      get() {
        if(!this.value) {
          return null;
        }
        let v = this._optionList.find(option => option.id === this.value.toString());
        v =  v ? v : null;
        return v;
        /*
        this.value ?{
          id: this.value,
          name: '', // Не известное значение
        } : null;
         */
      },
      set(option){
        this.inputFormElement(option.id);
      }
    },
    _optionList() {
      return this.optionList.map((option) => {
        return {
          id: this.optionGetKey(option),
          name: this.optionGetName(option),
          // origin: option,
        };
      });
    }
  }

  // TODO: add watcher value ---> value2
};
</script>

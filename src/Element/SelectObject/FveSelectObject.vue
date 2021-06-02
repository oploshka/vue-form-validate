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
    value    : { type: Object, default: () => null },
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
        return {
          id: this.optionGetKey(this.value),
          name: this.optionGetName(this.value),
        };
      },
      set(option){
        // this.value = option.origin;
        this.inputFormElement(option.origin);
      }
    },
    _optionList() {
      return this.optionList.map((option) => {
        return {
          id: this.optionGetKey(option),
          name: this.optionGetName(option),
          origin: option,
        };
      });
    }
  }

  // TODO: add watcher value ---> value2
};
</script>

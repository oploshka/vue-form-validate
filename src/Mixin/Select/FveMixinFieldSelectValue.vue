<script>

import FveMixinFieldSelectSchemaObject from './Core/FveMixinFieldSelectSchemaObject';

export default {
  name: 'FveMixinFieldSelectValue',
  mixins: [ FveMixinFieldSelectSchemaObject ],
  props: {
    modalValue: {type: [String,Number,Boolean]}
  },
  methods: {
    convertFieldStorageToValue(valueObj) {
      return valueObj.input ? valueObj.input.id : null;
    },
    convertValueToFieldStorage(value) {
      // if (value === undefined || value === null || value === '') {
      //   return { input: null };
      // }
      if (!value && (value !== false && value !== 0)) {
        return { input: null };
      }
      let v = this.optionListInternalFormat.find((option) => option.id === value);
      if(!v) {
        console.warn('[FveSelectValue] не удалось найти значение по id - значение сброшено!!!', this.optionListInternalFormat, value);
        v = null;
      }
      return { input: v };
    },
    inputValueClear() {
      this.value.input = null;
    }
  },
};
</script>

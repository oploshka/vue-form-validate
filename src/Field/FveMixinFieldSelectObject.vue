<script>

import FveMixinFieldSelectSchemaObject from './Core/FvePartFieldSelectSchemaObject';

export default {
  name: 'FveMixinFieldSelectObject',
  mixins: [ FveMixinFieldSelectSchemaObject ],
  props: {
    modalValue: { type: Object },
  },
  methods: {
    convertFieldStorageToValue(valueObj) {
      return valueObj.input ? valueObj.input.origin : null;
    },
    convertValueToFieldStorage(value) {
      if (value === undefined || value === null) {
        return { input: null, };
      }
      return {
        input: this.optionConvertToInternalFormat(value),
      };
    },
  },
};
</script>

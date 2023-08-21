<script>

import FveMixinFieldSelectSchemaMultiObject from './Core/FvePartFieldSelectSchemaMultiObject';

export default {
  name: 'FveMixinFieldSelectMultiObject',
  mixins: [ FveMixinFieldSelectSchemaMultiObject ],
  props: {
    modalValue: { type: Array },
  },
  methods: {
    convertFieldStorageToValue(valueObj) {
      return valueObj.input?.map((option) => { return option.origin; }) || [];
    },
    convertValueToFieldStorage(value) {
      if (!value && value !== 0) {
        return { input: [], };
      }
      return {
        input: value.map(this.optionConvertToInternalFormat),
      };
    },
  },
};
</script>

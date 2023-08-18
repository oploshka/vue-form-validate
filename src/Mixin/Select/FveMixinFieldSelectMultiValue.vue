<script>

import FveMixinFieldSelectSchemaMultiObject from './Core/FveMixinFieldSelectSchemaMultiObject';

export default {
  name: 'FveMixinFieldSelectMultiValue',
  mixins: [ FveMixinFieldSelectSchemaMultiObject ],
  props: {
    modalValue: { type: Array },
  },
  methods: {
    convertFieldStorageToValue(valueObj) {
      return valueObj.input?.map((option) => { return option.id; }) || [];
    },
    convertValueToFieldStorage(value) {
      if (!value && value !== 0) {
        return { input: [], };
      }
      const optionList = [];
      for (let i = 0; i < value.length; i++) {
        const id = value[i];
        let option = this.optionListInternalFormat.find((option) => option.id === id);
        if(!option) {
          console.warn('[FveMixinFieldSelectConvertObject] не удалось найти значение по id - значение сброшено!!!', this.optionListInternalFormat, value[i]);
          continue;
        }
        optionList.push(this.optionConvertToInternalFormat(option));
      }

      return {
        input: optionList,
      };
    },
  },
};
</script>

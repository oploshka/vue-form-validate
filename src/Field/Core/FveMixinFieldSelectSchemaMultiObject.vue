<script>

import FveMixinFieldSelectCore from './FveMixinFieldSelectCore';

export default {
  name: 'FveMixinFieldSelectSchemaMultiObject',
  mixins: [ FveMixinFieldSelectCore ],
  methods: {
    isEmpty(fieldStore) {
      return fieldStore.input === [];
    },
    validate(fieldStore) {
      return null;
    },
    valueSchema() {
      return {
        input: { type: Array, default: () => { return []; }, },
      };
    },

    convertFieldStorageToHash(fieldStore) {
      const resArr = fieldStore.input?.map((option) => { return option.id; }) || [];
      let id = resArr.join('__') || '';
      return id;
    },
  },
};
</script>

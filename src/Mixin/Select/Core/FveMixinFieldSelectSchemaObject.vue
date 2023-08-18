<script>

import FveMixinFieldSelectCore from './FveMixinFieldSelectCore';

export default {
  name: 'FveMixinFieldSelectSchemaObject',
  mixins: [ FveMixinFieldSelectCore ],
  methods: {
    isEmpty(fieldStore) {
      return fieldStore.input === null;
    },
    validate(fieldStore) {
      return null;
    },
    valueSchema() {
      return {
        input: { type: Object, default: () => { return null; }, },
      };
    },

    convertFieldStorageToHash(fieldStore) {
      const id = fieldStore.input?.id || '';
      if (!id?.toString) {
        return '';
      }
      return id.toString();
    },
  },
};
</script>

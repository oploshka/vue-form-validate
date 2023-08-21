<script>

import FvePartFieldSelectCore from './FvePartFieldSelectCore';

export default {
  name: 'FvePartFieldSelectSchemaObject',
  mixins: [ FvePartFieldSelectCore ],
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

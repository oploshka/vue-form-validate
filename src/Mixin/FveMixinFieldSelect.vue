<script>

import FveMixinField from './FveMixinField';

export default {
  name: 'FveMixinFieldSelect',
  mixins: [
    FveMixinField
  ],
  props: {
    optionList: Array,
    optionGetKey: {
      type: Function,
      default: (obj)=>{ return obj.id; }
    },
    optionGetName: {
      type: Function,
      default: (obj)=>{ return obj.name; }
    },
  },
};
</script>

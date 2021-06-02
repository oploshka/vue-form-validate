<script>

import FveMixinFieldVueMultiselect from '@widgetFormValidate/src/Element/Select/FveMixinFieldVueMultiselect';

export default {
  mixins: [
    FveMixinFieldVueMultiselect
  ],
  props: {
    value    : { type: Object, default: () => null },
  },
  methods: {
    prepareInput(value){
      return value;
    },
    prepareOutput(value){
      if(value === null) { return null; }
      return value;
    },
  },
};
</script>

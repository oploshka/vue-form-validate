<script>

import FveMixinFieldVueMultiselect from '@widgetFormValidate/src/Element/Select/FveMixinFieldVueMultiselect';

export default {
  mixins: [
    FveMixinFieldVueMultiselect
  ],
  props: {
    value    : { type: String, default: () => null },
  },
  methods: {
    prepareInput(value){
      if(!value) {
        return null;
      }
      let v = this._optionList.find(option => option.id === this.value.toString());
      v =  v ? v : null;
      return v;
    },
    prepareOutput(value){
      if(value === null) { return null; }
      return this.optionGetKey(value);
    },
  },
};
</script>

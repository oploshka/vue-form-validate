<script>

import FveMixinFieldDatePicker from '@fve/Element/Date/_old/FveMixinFieldDatePicker';

export default {
  mixins: [
    FveMixinFieldDatePicker
  ],
  props: {
    value       : { type: DateTime },
    placeholder : { type: DateTime },
    min         : { type: DateTime },
    max         : { type: DateTime },
  },
  data() {
    return {
      DATE_PICKER_MODE  : 'date',
      DATE_INPUT_MASK   : '##.##.####',
      DATE_FORMAT_VIEW  : 'DD.MM.YYYY',
    };
  },
  methods: {
    prepareInput(value){
      return value;
    },
    prepareOutput(valueDateTime){
      if(valueDateTime === null) { return null; }
      return valueDateTime;
    },
  },
};
</script>

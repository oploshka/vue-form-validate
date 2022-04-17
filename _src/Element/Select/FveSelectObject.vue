<script>

import FveSelectValue from "@fve/Element/Select/FveSelectValue";

export default {
  mixins: [
    FveSelectValue
  ],
  props: {
    value: [Object],
  },
  computed: {
    _value: {
      get() {
        return (this.value === null) ? null : this.prepareOption(this.value);
      },
      set(option){
        this.inputFormElement( option ? option.origin : null );
      }
    },
  }
};
</script>

<script>

import FveText from "@fve/Element/Text/FveText";

export default {
  name: 'FveTime',
  mixins: [
    FveText
  ],
  props: {
    value    : { type: String, default: '00:00' },
  },
  data(){
    return {
      type: 'time',
    };
  },
  methods: {
    validateFunction(str) {
      // TODO: fix
      return 'SUCCESS';
    },
  }
};
</script>

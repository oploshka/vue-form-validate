<script>

import FveText from "@fve/Element/Text/FveText";

export default {
  name: 'FveLogin',
  mixins: [
    FveText
  ],
  methods: {
    validateFunction(str) {
      if(str.length < 5 ){ return 'Длинна логина не менее 5 символов'; }
      return 'SUCCESS';
    },
  }
};
</script>

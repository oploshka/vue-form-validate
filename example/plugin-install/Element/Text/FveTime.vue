<script>

import FveText from '@field/Text/FveText';

export default {
  name: 'FveTime',
  mixins: [
    FveText
  ],
  data(){
    return {
      view: {
        type: 'time',
        inputAttr: {},
      },
    };
  },
  methods: {
    validate(valueObj) {
      return null;
    },
  }
};
</script>

<style lang="scss" scoped>

@import "~@field/../style/inputText.scss";

</style>

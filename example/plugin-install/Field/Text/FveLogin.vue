<script>

import FveText from '@field/Text/FveText';

export default {
  name: 'FveLogin',
  mixins: [
    FveText
  ],
  methods: {
    validate(valueObj) {
      const min = 3;
      if( valueObj.input.length < min ) {
        return {
          status: 'ERROR',
          code : 'VALIDATE',
          message: 'Длина строки не менее ' + min + ' символов',
        };
      }
    },
  }
};
</script>

<style lang="scss" scoped>

@import "~@field/style/inputText.scss";

</style>

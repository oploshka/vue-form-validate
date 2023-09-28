<script>

import FveNumber from '@field/Text/FveNumber';

export default {
  name: 'FvePort',
  mixins: [ FveNumber ],
  data(){
    return {
      type: 'number',
    };
  },
  methods: {

    validate(valueObj) {
      if( !this.isNumeric(valueObj.input) ) {
        return {
          status: 'ERROR',
          code : 'VALIDATE',
          message: 'Введите корректное значение порта',
        };
      }

      const v = valueObj.input;
      if( v < 0 || v > 65535 ) {
        return {
          status: 'ERROR',
          code : 'VALIDATE',
          message: 'Значение порта должно быть 0-65535',
        };
      }



      return null;
    },
  },
};
</script>

<style lang="scss" scoped>

@import "~@field/style/inputText.scss";

</style>

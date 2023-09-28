<script>
//
import FveMixinFieldSelectValue from 'vue-form-element/src/Field/FveMixinFieldSelectValue';
import FveSelectLineTemplate from '@field/Select/Helper/Line/FveSelectLineTemplate';

export default {
  name: 'FveSelectLineValue',
  mixins: [ FveMixinFieldSelectValue, FveSelectLineTemplate ],
};
</script>

<style scoped lang="scss">
@import '~@field/Select/Helper/Line/FveSelectLineStyle';
</style>

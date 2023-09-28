<script>

//
import FveMixinFieldSelectObject from 'vue-form-element/src/Field/FveMixinFieldSelectObject';
import FveSelectLineTemplate from '@field/Select/Helper/Line/FveSelectLineTemplate';

export default {
  name: 'FveSelectLineObject',
  mixins: [ FveMixinFieldSelectObject, FveSelectLineTemplate ],
};
</script>

<style scoped lang="scss">
@import '~@field/Select/Helper/Line/FveSelectLineStyle';
</style>

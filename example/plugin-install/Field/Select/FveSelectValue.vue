<script>
//
import FveMixinFieldSelectValue from 'vue-form-element/src/Field/FveMixinFieldSelectValue';
import FveModuleFieldSelectSearch from '@field/Select/Helper/FveModuleFieldSelectSearch';

export default {
  name: 'FveSelectObject',
  mixins: [
    FveMixinFieldSelectValue,
    FveModuleFieldSelectSearch,
  ],
};
</script>

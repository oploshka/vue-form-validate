<script>
//
import FveMixinFieldSelectObject from 'vue-form-element/src/Field/FveMixinFieldSelectObject';
import FveModuleFieldSelectSearch from '@field/Select/Helper/FveModuleFieldSelectSearch';

export default {
  name: 'FveSelectObject',
  mixins: [
    FveMixinFieldSelectObject,
    FveModuleFieldSelectSearch,
  ],
  computed: {
    optionIconEnable() { return true; }
  },
};
</script>

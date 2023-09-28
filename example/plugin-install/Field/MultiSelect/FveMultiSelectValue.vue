<script>
//
import FveMixinFieldSelectMultiValue from 'vue-form-element/src/Field/FveMixinFieldSelectMultiValue';
import FveSelectPluginVueMsTemplate from '@field/Select/Helper/VueMultiselect/FveSelectPluginVueMsTemplate';
import FveSelectPluginVueMsPropsAdapter from '@field/Select/Helper/VueMultiselect/FveSelectPluginVueMsPropsAdapter';

export default {
  name: 'FveMultiSelectValue',
  mixins: [FveMixinFieldSelectMultiValue, FveSelectPluginVueMsTemplate, FveSelectPluginVueMsPropsAdapter],
  computed: {
    msMultiple() { return true; },
  },
};
</script>

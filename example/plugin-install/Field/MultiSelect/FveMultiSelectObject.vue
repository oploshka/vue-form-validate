<script>
//
import FveMixinFieldSelectMultiObject from 'vue-form-element/src/Field/FveMixinFieldSelectMultiObject';
import FveSelectPluginVueMsTemplate from '@field/Select/Helper/VueMultiselect/FveSelectPluginVueMsTemplate';
import FveSelectPluginVueMsPropsAdapter from '@field/Select/Helper/VueMultiselect/FveSelectPluginVueMsPropsAdapter';

export default {
  name: 'FveMultiSelectObject',
  mixins: [FveMixinFieldSelectMultiObject, FveSelectPluginVueMsTemplate, FveSelectPluginVueMsPropsAdapter],
  computed: {
    msMultiple() { return true; },
  },
};
</script>

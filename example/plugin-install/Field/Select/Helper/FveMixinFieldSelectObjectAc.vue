<script>
/*
Это пользовательские поля для Автокомплита
 */

//
import FveMixinFieldSelectObject from 'vue-form-element/src/Field/FveMixinFieldSelectObject';
import FveSelectPluginVueMsTemplate from '@field/Select/Helper/VueMultiselect/FveSelectPluginVueMsTemplate';
import FveSelectPluginVueMsPropsAdapter from '@field/Select/Helper/VueMultiselect/FveSelectPluginVueMsPropsAdapter';
import FveSelectPluginAc from '@field/Select/Helper/AutoComplete/FveSelectPluginAc';

export default {
  name: 'FveMixinFieldSelectObjectAc',
  mixins: [
    FveMixinFieldSelectObject,
    FveSelectPluginVueMsTemplate,
    FveSelectPluginVueMsPropsAdapter,
    FveSelectPluginAc,
  ],
};
</script>

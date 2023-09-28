<script>
//
import FveMixinFieldSelectValue from 'vue-form-element/src/Field/FveMixinFieldSelectValue';
import FveSelectPluginVueMsTemplate from '@field/Select/Helper/VueMultiselect/FveSelectPluginVueMsTemplate';
import FveSelectPluginVueMsPropsAdapter from '@field/Select/Helper/VueMultiselect/FveSelectPluginVueMsPropsAdapter';

export default {
  name: 'FveSelectDynamicBoolean',
  mixins: [FveMixinFieldSelectValue, FveSelectPluginVueMsTemplate, FveSelectPluginVueMsPropsAdapter],
  props: {
    // TODO: понять почему число и проверить логику
    modelValue    : { type: Number, required: false },
  },
  computed: {
    optionListInternalFormat() {
      return this.getDefaultOptionList();
    },
  },
  methods: {

    optionGetKeyFn(item) { return item.id; },
    optionGetNameFn(item) { return item.name; },

    fieldPropertySchemaPrepare(obj){
      delete obj.optionList;
      delete obj.optionGetKey;
      delete obj.optionGetName;
    },

    getDefaultOptionList() {
      return [{id: '0', name: 'Нет'}, {id: '1', name: 'Да'}];
    },

  },
};
</script>

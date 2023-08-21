<script>

// import FveMixinFieldRegistrator from 'vue-form-element/src/Mixin/FveMixinField/FveMixinFieldRegistrator';
import FveMixinFieldDefault from 'vue-form-element/src/Mixin/FveMixinField/FveMixinFieldDefault';
import FveMixinFieldProperty from 'vue-form-element/src/Mixin/FveMixinField/FveMixinFieldProperty';
import FveMixinFieldIsChange from 'vue-form-element/src/Mixin/FveMixinField/FveMixinFieldIsChange';
import FveMixinFieldCore from 'vue-form-element/src/Mixin/FveMixinField/FveMixinFieldCore';

export default {
  name: 'FveMixinField',
  mixins: [
    // FveMixinFieldRegistrator,
    FveMixinFieldDefault,
    FveMixinFieldProperty,
    FveMixinFieldIsChange,
    FveMixinFieldCore,
  ],
};

</script>

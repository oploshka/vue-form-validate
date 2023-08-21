<script>

import FvePartFieldRegistrator from './Core/FvePartFieldRegistrator';
import FvePartFieldDefault     from './Core/FvePartFieldDefault';
import FvePartFieldProperty    from './Core/FvePartFieldProperty';
import FvePartFieldIsChange    from './Core/FvePartFieldIsChange';
import FvePartFieldCore        from './Core/FvePartFieldCore';
import FvePartFieldCssClass    from './Core/FvePartFieldCssClass';

export default {
  name: 'FveMixinField',
  mixins: [
    FvePartFieldRegistrator,
    FvePartFieldDefault,
    FvePartFieldProperty,
    FvePartFieldIsChange,
    FvePartFieldCore,
    FvePartFieldCssClass,
  ],
};

</script>

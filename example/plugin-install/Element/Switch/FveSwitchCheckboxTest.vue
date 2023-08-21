<template>
  <FveTemplateFieldSwitch @click="change">
    <FveSwitchThemeViewSquare :selected="value.input" />
  </FveTemplateFieldSwitch>
</template>

<script>
import FveSwitchThemeViewSquare from './Theme/FveSwitchThemeViewSquare';
import FveMixinFieldSwitch      from 'vue-form-element/src/Mixin/FveMixinFieldSwitch';
import FveTemplateFieldSwitch   from 'vue-form-element/src/Template/FveTemplateFieldSwitch';

export default {
  name: 'FveSwitchCheckbox',
  components: {
    FveTemplateFieldSwitch,
    FveSwitchThemeViewSquare,
  },
  mixins: [
    FveMixinFieldSwitch,
  ],
};
</script>

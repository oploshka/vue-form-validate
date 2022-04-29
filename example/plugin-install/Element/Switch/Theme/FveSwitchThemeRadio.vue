<template>
  <span class="fve-switch__element"><span v-if="selected" class="fve-switch__element-active"></span></span>
</template>

<script>

import FveMixinFieldSwitchTheme from 'vue-form-element/src/Mixin/FveMixinFieldSwitchTheme';

export default {
  name: 'FveSwitchThemeRadio',
  mixins: [
    FveMixinFieldSwitchTheme
  ]
};
</script>

<style lang="scss" scoped>
$color: #409eff;
$active-padding: 2px;
.fve-switch__element{
  display: inline-block;
  vertical-align: middle;

  height: 18px;
  width: 18px;
  border: 2px solid $color;
  border-radius: 100%;

  position: relative;
  .fve-switch__element-active{
    position: absolute;
    top: $active-padding;
    bottom: $active-padding;
    left: $active-padding;
    right: $active-padding;
    background: $color;
    border-radius: 100%;
  }
}
.fve-switch__label{
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
}
</style>
1

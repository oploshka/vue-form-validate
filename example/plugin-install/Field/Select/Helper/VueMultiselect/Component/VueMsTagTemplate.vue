<template>
  <span class="multiselect__tag">
    <UiCutText :text="option.name" />
    <i
      tabindex="1"
      @keypress.enter.prevent="remove(option)"
      @mousedown.prevent="remove(option)"
      class="multiselect__tag-icon">
    </i>
  </span>
</template>

<script>

import UiCutText from '@ui/Other/UiCutText.vue';

export default {
  name: 'VueMsTagTemplate',
  components: {
    UiCutText,
  },
  props: {
    optionIconEnable: {type: Boolean},
    option: {type: Object },
    remove: {type: Function },
  },
};
</script>

<style lang="scss">

.option__wrap {
  display: flex;
  align-items: center;
  &.option-wrap-label {
    padding-left: 5px;
  }
  .option__icon {
    margin-right: 5px;
  }
  .option__title {}
}

</style>

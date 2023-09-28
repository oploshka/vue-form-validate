<template>
  <div class="option__wrap option-wrap-label">
    <template v-if="optionIconEnable && option?.icon">
      <img class="option__icon" :src="option.icon" alt="option-icon">
    </template>
    <UiCutText class="option__title" :text="option.name" />
  </div>
</template>

<script>

import UiCutText from '@ui/Other/UiCutText.vue';

export default {
  name: 'VueMsSingleLabelTemplate',
  components: {
    UiCutText,
  },
  props: {
    optionIconEnable: {type: Boolean},
    option: {type: Object },
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

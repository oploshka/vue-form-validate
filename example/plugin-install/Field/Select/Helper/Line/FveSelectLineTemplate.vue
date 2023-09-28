<template>
  <div class="report-page__chart-menu">
    <div class="custom-title">Отображение графика:</div>
    <div class="container__settings-bar-selector">
      <template v-for="option in optionListView" :key="option.id">
        <div class="tab pointer" @click="fieldStoreUpdate({ input: option });" :class="{ 'activated-tab': option.id === value.input?.id }">
          {{ option.name }}
        </div>
      </template>
    </div>
  </div>

</template>

<script>

export default {
  name: 'FveSelectLineTemplate',
};
</script>

<style scoped lang="scss">
@import './FveSelectLineStyle';
</style>

<template>
  <FveTemplateField>
    <template v-for="(slot, index) of Object.keys($slots)" :key="index" v-slot:[slot]="rowProps">
      <slot :name="slot" v-bind="rowProps"></slot>
    </template>

    <template #label="{ field }">
      <label v-if="field.label" :for="field.name" class="fve-label" style="display: inline-flex; align-items: center; gap: 0 8px">
        <template v-if="entityTypeCodeForLabel">
          <img @click="openInformationCard" style="width: 18px; height: 18px; cursor: pointer;"
               src="@img/icon/personal-card.svg" svg-inline alt="" />
        </template>
        <p>{{ field.label }} <span v-if="field.required" class="fve-label-require">*</span></p>
      </label>
    </template>

    <template #default>

      <Multiselect v-bind="msProps">
        <template v-slot:tag="props">
          <component :is="msComponentTag" v-bind="props" :optionIconEnable="optionIconEnable"/>
        </template>

        <template v-slot:singleLabel="props">
          <component :is="msComponentSingleLabel" v-bind="props" :optionIconEnable="optionIconEnable"/>
        </template>
        <template v-slot:option="props">
          <component :is="msComponentOption" v-bind="props" :optionIconEnable="optionIconEnable"/>
        </template>

        <template v-slot:noOptions>
          <component :is="msComponentNoOption" :text="msNoOptionText"/>
        </template>
        <template v-slot:noResult>
          <component :is="msComponentNoResult" :text="msNoResultText"/>
        </template>
        <template v-slot:afterList>
          <template v-if="msLoading">
            <li style="display: flex; justify-content: center;">
              <LoadingAnimation style="max-width: 100px; padding: 20px 0;"/>
            </li>
          </template>
        </template>

        <template #clear>
          <template v-if="msShowClear">
            <div class="multiselect__clear" @mousedown.prevent.stop="msValueClear()"></div>
          </template>
        </template>
      </Multiselect>

    </template>
  </FveTemplateField>
</template>

<script>

//
import FveTemplateField from '@field/FveTemplateField';
import Multiselect from '@plugin/vue-multiselect/src/Multiselect';
import UiCutText from '@ui/Other/UiCutText.vue';
import LoadingAnimation from '@loading/View/LoadingAnimation';
//
import VueMsOptionTemplate from '@field/Select/Helper/VueMultiselect/Component/VueMsOptionTemplate';
import VueMsNoOptionTemplate from '@field/Select/Helper/VueMultiselect/Component/VueMsNoOptionTemplate';
import VueMsNoResultTemplate from '@field/Select/Helper/VueMultiselect/Component/VueMsNoResultTemplate';
import VueMsSingleLabelTemplate from '@field/Select/Helper/VueMultiselect/Component/VueMsSingleLabelTemplate';
import VueMsTagTemplate from '@field/Select/Helper/VueMultiselect/Component/VueMsTagTemplate';


export default {
  name: 'FveSelectPluginVueMsTemplate',
  components: {
    UiCutText,
    Multiselect,
    FveTemplateField,
    LoadingAnimation,
  },
  computed: {

    entityTypeCodeForLabel() { return null; },

    //
    msProps() {
      return {
        name: this.field.name,
        allowEmpty: this.allowEmpty,
        placeholder: this.field.placeholder || '',
        readonly: !!this.field.readonly,
        disabled: !!this.field.disabled,
        required: !!this.field.required,
        autocomplete: 'off',
        options: this.optionListView,
        selectLabel: '',
        selectedLabel: 'Выбрано',
        deselectLabel: 'Удалить',
        deselectGroupLabel: 'Press enter to deselect group',
        selectGroupLabel: 'Press enter to select group',
        label: 'name',
        'track-by': 'id',
        searchable: this.msSearchable,
        internalSearch: false,
        preserveSearch: true,
        clearOnSelect: false,
        onSearchChange: this.msSearchTextUpdate,
        modelValue: this.msValue,
        'onUpdate:modelValue': this.msValueUpdate,
        multiple: this.msMultiple,
        onOpen: this.msOpen,
        onRemove: this.msRemove,
        closeOnSelect: this.msCloseOnSelect,
        loading: this.msLoading,
      };
    },

    msValue() { return this.value.input; },
    msSearchable() { return this.optionSearchEnable; },
    msLoading() { return false; },
    // msLoading() {
    //   if(this.searchText !== this.searchTextNotDebounce) {
    //     return true;
    //   }
    //   return false;
    // },
    msMultiple() { return false; },
    msCloseOnSelect() { return true; },

    msComponentOption() { return VueMsOptionTemplate; },
    msComponentSingleLabel() { return VueMsSingleLabelTemplate; },
    msComponentTag() { return VueMsTagTemplate; },
    //
    msComponentNoOption() { return VueMsNoOptionTemplate; },
    msNoOptionText() { return 'Пустой список'; },
    //
    msComponentNoResult() { return VueMsNoResultTemplate; },
    msNoResultText() { return 'По вашему запросу ничего не найдено.'; },

    msShowClear() { return false; }

  },

  methods: {
    // Кастомные
    openInformationCard() {},

    // Открытие селекта
    msOpen() {},
    msRemove($event) { this.$emit('removeSelected', $event); },
    msSearchTextUpdate(val) {},
    msValueUpdate($event) {
      this.fieldStoreUpdate({ input: $event });
    },
    msValueClear($event) {
      this.fieldStoreUpdate({ input: null });
    },

    // Установить фокус на текущий элемент
    setFocus() {
      // this.$refs.input.focus();
    },
  },
};


/*
      <!--
        :name="field.name"
        :allowEmpty="allowEmpty"
        :placeholder="field.placeholder || ''"
        :readonly="!!field.readonly"
        :disabled="!!field.disabled"
        :required="!!field.required"
        autocomplete="off"
        :options="optionListView"
        selectLabel=""
        selectedLabel="Выбрано"
        deselectLabel="Удалить"
        deselectGroupLabel="Press enter to deselect group"
        selectGroupLabel="Press enter to select group"
        label="name"
        track-by="id"
        v-model="valueComputed"
        :searchable="optionSearchEnable"
        :internalSearch="false"
        :preserveSearch="true"
        :clearOnSelect="false"
        :multiple="multiple"
        @open="open"
        @search-change="asyncFindDebounce"

        @remove="removeSelected"
        :close-on-select="true"
        :loading="isLoading"
      -->
 */
</script>

<style lang="scss">
// TODO use scope
.fve {
  @import "@field/style/VueMultiselect.scss";
}
</style>

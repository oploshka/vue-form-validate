<template>
  <FveTemplateField>
    <Multiselect
      :name="name"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"

      :required="required"
      autocomplete="off"

      :options="_optionList"

      :multiple="false"

      selectLabel=""
      selectedLabel="Выбрано"
      deselectLabel="Удалить"
      deselectGroupLabel="Press enter to deselect group"
      selectGroupLabel="Press enter to select group"

      label="name"
      track-by="id"
      v-model="_value"
    >
      <template v-slot:noOptions>Пустой список</template>
      <template v-slot:noResult><div>По вашему запросу ничего не найдено.</div></template>
    </Multiselect>
  </FveTemplateField>
</template>

<script>

import FveMixinField from "@fve/Mixin/FveMixinField";
import FveMixinFieldSelect from '@fve/Mixin/FveMixinFieldSelect';

import Multiselect from 'vue-multiselect';

export default {
  mixins: [
    FveMixinField,
    FveMixinFieldSelect
  ],
  components: {
    Multiselect
  },
  props: {
    value: [Number, String, Boolean],
  },
  methods: {
    prepareValue($event) {
      return $event;
    },
    isEmpty(value) {
      return value === null;
    },
    // eslint-disable-next-line
    validateFunction(str) {
      return 'SUCCESS';
    },

    convertValueToString(v){
      return typeof v + '_' + v;
    },
    prepareOption(option) {
      let id = this.optionGetKey(option);
      return {
        id: this.convertValueToString(id),
        name: this.optionGetName(option),
        origin_id: id,
        origin: option,
      };
    },
  },
  computed: {
    _value: {
      get() {
        let v = this._optionList.find(option => option.origin_id === this.value);
        return v ? v : null;
      },
      set(option){
        this.inputFormElement( option ? option.origin_id : null );
      }
    },
    _optionList() {
      let arr = [];
      for(let i = 0; i < this.optionList.length; i++){
        arr.push(this.prepareOption(this.optionList[i]));
      }
      return arr;
    }
  }
};
</script>


<style lang="scss" >
.fve {
  @import "~vue-multiselect/dist/vue-multiselect.min";
}
</style>


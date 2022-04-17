<template>
  <FveTemplateField>
    <PopperDropdown placement="bottom-start">

      <div class="sec__setting__action">
        {{ optionGetName(value.selectedObject) }}
        <!-- prettier-ignore -->
        <!--<img svg-inline class="sec__setting__caret" src="@img/icon/caret-down.svg" alt="" />-->
        <svg class="sec__setting__caret" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.7924 16.9706C12.3921 17.4906 11.6079 17.4906 11.2076 16.9706L6.31117 10.61C5.80497 9.95242 6.27374 9 7.10358 9L16.8964 9C17.7263 9 18.195 9.95243 17.6888 10.61L12.7924 16.9706Z"/>
        </svg>
      </div>

      <template #popper="{ hide }">
        <div class="schedule-event-repeat-dropdown serd__list dropdown__list">
          <template v-for="option in optionList" :key="optionGetKey(option)">
            <div class="serd__item" @click.stop="selectValueUpdate(option), hide()">{{ optionGetName(option) }}</div>
          </template>
        </div>
      </template>
    </PopperDropdown>
  </FveTemplateField>
</template>

<script>

import FveMixinField from "vue-form-element/src/Mixin/FveMixinField";
import FveMixinFieldSelect from 'vue-form-element/src/Mixin/FveMixinFieldSelect';
//
import PopperDropdown from "@component/Popper/PopperDropdown";

export default {
  name: 'FveSelectPopperDropdownValue',
  mixins: [
    FveMixinField,
    FveMixinFieldSelect,
  ],
  components: {
    PopperDropdown,
  },
  props: {
    // // значение по умолчанию (можно переопределить тип)
    modelValue    : { type: [String, Number] , required: false },
  },
  methods: {

    // пользовательские действия
    selectValueUpdate($event) {
      this.fieldValueUpdate({
        selectedKey: this.optionGetKey($event),
        selectedObject: $event
      })
    },

    // описываем структуру value
    valueSchema() {
      return {
        selectedKey   : {type: String, default: () => { return ''; } },
        selectedObject: {type: Object, default: () => { return {}; } }
      }
    },
    convertObjectToValue(valueObj) {
      return valueObj.selectedKey;
    },
    convertValueToObject(value) {
      let selectedObject = this.optionList.find((option) => {
        return this.optionGetKey(option) === value;
      })
      return {
        selectedKey: value,
        // TODO: fix search find
        selectedObject: selectedObject,
      }
    },
    isEmpty(valueObj) {
      return valueObj.selectedKey === '';
    },
    validate(valueObj) {
      return null
    },
    // Установить фокус на текущий элемент
    setFocus(){
      // this.$refs.input.focus();
    },


  },
};
</script>

<style lang="scss" scoped>

.sec__setting__action {
  margin: 0 0.25rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  color: var(--color-gray-05);
  font-size: 0.875rem;
}
.sec__setting__caret {
  width: 1rem;
  height: 1rem;
  font-size: 0.45rem;
  margin-left: 0.1rem;

  fill: var(--color-secondary-light);
}

.serd__item {
  font-size: 0.875rem;
  padding: 8px 16px;
  cursor: pointer;
  line-height: 150%;
}
</style>

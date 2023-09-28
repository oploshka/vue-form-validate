<script>
//
import { openEntityCard } from '@widget/EntityCard';

// Зависит от FveSelectPluginVueMsTemplate.vue !!!
export default {
  name: 'FveSelectPluginVueMsPropsAdapter',
  props: {
    // значение по умолчанию (можно переопределить тип)
    // Используется для поиска по свойствам, ничего общего с trackBy плагина Vue Multiselect не имеет
    searchBy: { type: Array, default: () => [] },

    // TODO: добавить поддержку
    selectedItems: { type: Array, default: () => []},

    // TODO: сделать по умолчанию сбрасываемым
    showClear: { type: Boolean, default: false }, // Показывать крестик и иметь возможность очистить значение
    allowEmpty: { type: Boolean, default: true },

    // TODO: удалить или понять для чего нужно
    entityTypeCode: { type: String, default: '' },

    filter: {type: Object, default() { return {}; }}
  },
  // fix для работы с FveMixinFieldSelectModuleSearch.vue и без него
  data() {
    return {
      searchText: '',
      searchTextNotDebounce: '',
    };
  },
  computed: {

    entityTypeCodeForLabel() {
      return this.entityTypeCode;
    },
    // переопределяем
    optionSearchEnable() {
      return this.field.optionList?.length > 5; // Добавлять поиск, если элементов больше 5;
    },
    optionSearchByKey() { return this.searchBy; },
    optionIconEnable() { return false; },


    // Это фикс того что поиск отрабатывает с задержкой
    optionListInternalFormat() {
      if(this.searchText !== this.searchTextNotDebounce) {
        return [];
      }
      return (this.field.optionList || []).map(this.optionConvertToInternalFormat);
    },

    msSearchable() { return this.optionSearchEnable; },
    msLoading() {
      if(this.searchText !== this.searchTextNotDebounce) {
        return true;
      }
      return false;
    },

    msShowClear() {
      return !this.msMultiple && this.showClear && this.value.input;
    },

  },

  methods: {
    msSearchTextUpdate(val) {
      this.searchTextUpdate(val);
    },


    openInformationCard() {
      if (!this.entityTypeCodeForLabel || !this.value.input) {
        return;
      }
      // TODO: fix
      const obj = this.value.input;
      openEntityCard(this.entityTypeCodeForLabel, obj.id);
    },
  },
};
</script>

<style lang="scss">

</style>

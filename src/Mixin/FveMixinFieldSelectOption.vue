<script>
/**
 * Данный миксин отвечает за формирование опций и осуществления по ним поиска
 */


import FveMixinFieldSelect from 'vue-form-element/src/Mixin/FveMixinFieldSelect';
import FveMixinFieldSelectOptionSchema from 'vue-form-element/src/Mixin/FveMixinFieldSelectOptionSchema';
import { debounce } from 'lodash';

export default {
  name: 'FveMixinFieldSelectOption',
  mixins: [FveMixinFieldSelect, FveMixinFieldSelectOptionSchema],
  data() {
    return {
      searchText: '', // подумать о внесение данного параметра в valueSchema - это позволит сбрасывать строку поиска
    };
  },
  computed: {

    // нужен ли поиск
    optionSearchEnable() { return true; },
    optionSearchByKey() { return false; }, // false || ['field1', 'field2']
    // нужна ли иконка
    optionIconEnable() { return true; },


    // список опций во внутреннем формате
    optionListInternalFormat() {
      return (this.field.optionList || []).map(this.optionConvertToInternalFormat);
    },
    // Список опций который показываем пользователю, тут логичнее осуществлять поиск
    optionListView() {
      let optionList = this.optionListInternalFormat;

      if (this.optionSearchEnable) {
        optionList = optionList.filter(this.optionFitsTheSearchParameters);
      }

      return optionList; // .slice(0, 50);
    },


    // Внутренний формат строки поиска
    searchTextInternalFormat() {
      return this.searchText.toLowerCase();
    }
  },

  methods: {
    // подходит ли строка под критерии поиска
    optionFitsTheSearchParameters (option) {
      return option.search.includes(this.searchTextInternalFormat);
    },
    // строка для поиска в нижнем регистре ()
    optionGetSearchText(option) {

      const searchBy = this.optionSearchByKey; // ['field1', 'field2']; список полей для поиска с фронта
      if(searchBy) {
        let text = searchBy
          .map((property) => option[property]) // берем из опций значения по ключам
          .filter((value) => value) // удаляем пустые значения
          .join('') // соединяем в одну строку
        return text;
      }

      return this.optionGetName(option).toLowerCase();
    },
    optionGetIcon(option) {
      return option.icon || null;
    },

    // функция преобразовывает пользовательский объект во внутренний формат
    optionConvertToInternalFormat(option) {

      const optionObj = {
        id: this.optionGetKey(option),
        name: this.optionGetName(option),
        origin: option,
      };

      if(this.optionSearchEnable) {
        optionObj.search = this.optionGetSearchText(option);
      }
      if(this.optionIconEnable) {
        optionObj.icon = this.optionGetIcon(option);
      }

      // TODO: add $isDisabled vs selectedItems
      // if(this.optionIsDisabled) {
      //   optionObj.disabled = this.optionGetIsDisable(option);
      // }

      return optionObj;
    },


    searchTextUpdate: debounce(function (searchText) {
      this.searchText = searchText;
      this.searchTextChangedCallback();
    }, 300),
    // колбек для отслеживания изменения поисковой строки
    searchTextChangedCallback() {

    },

  },
};
</script>

<script>
/**
 * Данный миксин отвечает за формирование опций и осуществления по ним поиска
 */


import FveMixinField from '../../FveMixinField';
import {FT_ARRAY, FT_BOOLEAN, FT_FUNCTION, FT_STRING} from '@field/FveFieldType';
import {find} from 'lodash';

const optionGetKeyDefault   = (obj) => { return obj.id;   };
const optionGetNameDefault  = (obj) => { return obj.name; };

export default {
  name: 'FveMixinFieldSelect',
  mixins: [
    FveMixinField
  ],
  props: {
    selectedItems: {type: Array}
  },
  // mixins: [FveMixinFieldSelect, FveMixinFieldSelectOptionSchema],
  computed: {

    // нужен ли поиск
    optionSearchEnable() { return true; },
    // по каким ключам осуществлять поиск
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

    // переопределять в своей реализации
    optionSearchText() { return ''; }
  },

  methods: {

    fieldPropertySchema(){
      return {
        initValue:    FT_STRING(null), // TODO: fix and use value type.
        name:         FT_STRING(),
        label:        FT_STRING(),
        placeholder:  FT_STRING('введите значение'),
        caption:      FT_STRING(),
        readonly:     FT_STRING(),
        disabled:     FT_STRING(),
        theme:        FT_STRING(),
        //
        model:        FT_BOOLEAN(false),
        update:       FT_FUNCTION(null),
        onUpdate:     FT_FUNCTION(null), // TODO: понять как смержить update и onUpdate

        // TODO: оптимизировать чтоб не копипастить...
        optionList:     FT_ARRAY(),
        optionGetKey:   FT_FUNCTION(optionGetKeyDefault),
        optionGetName:  FT_FUNCTION(optionGetNameDefault),
      };
    },

    // подходит ли строка под критерии поиска
    optionFitsTheSearchParameters (option) {
      return option.search.includes(this.optionSearchText);
    },
    // строка для поиска в нижнем регистре ()
    optionGetSearchText(option) {

      const searchBy = this.optionSearchByKey; // ['field1', 'field2']; список полей для поиска с фронта
      if(searchBy && searchBy.length) {
        let text = searchBy
          .map((property) => option[property]) // берем из опций значения по ключам
          .filter((value) => value) // удаляем пустые значения
          .join('') // соединяем в одну строку
        return text.toLowerCase();
      }

      return this.optionGetName(option).toLowerCase();
    },
    optionGetIcon(option) { return option.icon || null; },

    // TODO: продумать. Это временный фикс
    optionGetKeyFn(option)          { return this.optionGetKey(option); },
    optionGetNameFn(option)         { return this.optionGetName(option); },
    optionGetSearchTextFn(option)   { return this.optionGetSearchText(option); },
    optionGetIconFn(option)         { return this.optionGetIcon(option); },
    optionGetDisableFn(option)      {
      //
      if(!this.selectedItems || !this.selectedItems.length) {
        return false;
      }
      //
      return this.selectedItems.find((item) => {
        return item.id === option.id;
      });
    },

    // функция преобразовывает пользовательский объект во внутренний формат
    optionConvertToInternalFormat(option) {

      const optionObj = {
        id: this.optionGetKeyFn(option),
        name: this.optionGetNameFn(option),
        origin: option,
      };

      if(this.optionSearchEnable) {
        optionObj.search = this.optionGetSearchTextFn(option);
      }
      if(this.optionIconEnable) {
        optionObj.icon = this.optionGetIconFn(option);
      }
      // TODO: fix
      if(this.optionGetDisableFn) {
        optionObj.$isDisabled = this.optionGetDisableFn(option);
      }

      // TODO: add $isDisabled vs selectedItems
      // if(this.optionIsDisabled) {
      //   optionObj.disabled = this.optionGetIsDisable(option);
      // }

      return optionObj;
    },

  },
};
</script>

<script>

import FveMixinAcRequestRm from '@field/Select/Helper/AutoComplete/FveMixinAcRequestRm';
import FveSelectPluginAcHelper from '@field/Select/Helper/AutoComplete/FveSelectPluginAcHelper';

export default {
  name: 'FveSelectPluginAc',
  mixins: [
    FveSelectPluginAcHelper,
    FveMixinAcRequestRm,
  ],
  data() {
    return {
      searchText: '', // подумать о внесение данного параметра в valueSchema - это позволит сбрасывать строку поиска
    };
  },
  computed: {

    // список опций во внутреннем формате
    optionListInternalFormat() {
      if(this.acSearchText !== this.searchText) {
        return [];
      }
      return (this.acData || []).map(this.optionConvertToInternalFormat);
    },
    // Список опций который показываем пользователю, тут логичнее осуществлять поиск
    optionListView() {
      return  this.optionListInternalFormat;
    },
    // Внутренний формат строки поиска
    optionSearchText() { // searchTextInternalFormat() {
      return this.searchText.toLowerCase();
    },

    msSearchable() { return true; },
    msLoading() {
      if(this.acSearchText !== this.searchText) {
        return true;
      }
      return this.acLoadStatus === 'LOADING';
    },
    msShowClear() {
      return !this.msMultiple && this.value.input;
    },
  },

  methods: {
    clearCache() {
      this.acCacheObj = {};
    },

    msOpen() {
      // Костыль для загрузки списка опций при фокусе на поле с пустым запросом
      if (this.acLoadStatus === 'SUCCESS' || this.acLoadStatus === 'LOADING' ) {
        return;
      }
      this.acLoad(this.searchText);
    },

    searchTextUpdate(searchText) {
      this.searchText = searchText;
      this.acSearchTextUpdateDebounce(this.searchText);
      // this.searchTextChangedCallback();
    },

    acRequest(searchText) {
      // Можно переопределять если функционал из FveMixinAcRequestRm не подходит
      return this.requestRm(searchText);
    },

  },
};
</script>

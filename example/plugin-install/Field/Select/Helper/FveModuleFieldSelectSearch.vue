<script>

//
import FveSelectPluginVueMsTemplate from '@field/Select/Helper/VueMultiselect/FveSelectPluginVueMsTemplate';
import FveSelectPluginVueMsPropsAdapter from '@field/Select/Helper/VueMultiselect/FveSelectPluginVueMsPropsAdapter';

import { debounce } from 'lodash';

export default {
  name: 'FveModuleFieldSelectSearch',
  mixins: [
    FveSelectPluginVueMsTemplate,
    FveSelectPluginVueMsPropsAdapter,
  ],
  data() {
    return {
      searchText: '', // подумать о внесение данного параметра в valueSchema - это позволит сбрасывать строку поиска
      searchTextNotDebounce: '',
    };
  },
  computed: {
    // Внутренний формат строки поиска
    optionSearchText() { // searchTextInternalFormat() {
      return this.searchText.toLowerCase();
    }
  },

  methods: {
    searchTextUpdate(searchText) {
      this.searchTextNotDebounce = searchText;
      this.searchTextUpdateDebounce(searchText);
    },
    searchTextUpdateDebounce: debounce(function (searchText) {
      this.searchText = searchText;
      this.searchTextChangedCallback();
    }, 500),
    // колбек для отслеживания изменения поисковой строки
    searchTextChangedCallback() {

    },
  },
};
</script>

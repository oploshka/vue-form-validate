<script>

/**
 * Данный миксин упрощает отправку данных и стандартизирует кастомизацию запросов.
 * TODO: подумать о том чтоб вынести в глобальную часть
 */
export default {
  name: 'FveMixinAcRequestRm',
  methods: {
    /**
     * Ожидаем переопределения (Обязательно)
     */
    requestRmGetMethod() { return Promise.reject('method "requestRmGetMethod" not overridden'); },
    /**
     * Функция для преобразования данных перед отправкой
     */
    requestRmDataPrepare(requestData) {
      // requestData.sort.name = 'ASC';
      return requestData;
    },
    /**
     * Функция для преобразования данных после получения
     */
    requestRmResponsePrepareFunc(response) {
      return response.list;
    },

    requestRm(searchText) {
      const requestFunc = this.requestRmGetMethod();
      const requestData = this.requestRmDataPrepare({
        sort:   this.sort,    // берется из FveMixinAcRequestRm props
        filter: this.filter,  // берется из FveMixinAcRequestRm props
        search: searchText,
        size:   100,
      });

      return requestFunc(requestData).then(this.requestRmResponsePrepareFunc);
    }
  },
};
</script>

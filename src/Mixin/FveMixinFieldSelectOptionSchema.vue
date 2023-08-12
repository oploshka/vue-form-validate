<script>

export default {
  name: 'FveMixinFieldSelectOptionSchema',

  methods: {

    /**
     * @param {FveFieldValueObj} valueObj
     * @return {boolean}
     */
    isEmpty(valueObj /*: FveFieldValueObj */) /* : boolean */ {
      return valueObj.input === null;
    },

    /**
     * Проверяем совпадают ли значения valueSync
     * @param value1
     * @param value2
     * @return {boolean}
     */
    isEqualValue(value1, value2) {
      return value1?.id === value2?.id;
    },

    /**
     * @param {FveFieldValueObj} valueObj
     * return {any}
     */
    validate(valueObj /*: FveFieldValueObj */) {
      return null;
    },

    // /**
    //  * Функция для установки фокуса на выбранном элементе формы
    //  */
    // setFocus() {
    //   /* this.$refs.input.focus(); */
    // },

    /**
     * описываем структуру value
     * @return {FveFieldSchema}
     */
    valueSchema() /*: FveFieldSchema */ {
      return {
        // храним выбранное значение в поле input
        input: { type: Object, default: () => { return null; }, },
      };
    },

    // TODO: подумать над именем функции // valueObjectGetItem
    convertFieldStorageToValue(valueObj) {
      return valueObj.input ? valueObj.input.origin : null;
    },
    // TODO: подумать над именем функции // valueObjectSetItem
    convertValueToFieldStorage(value) {
      if (value === undefined || value === null) {
        return {
          input: null,
        };
      }
      return {
        input: this.optionConvertToInternalFormat(value),
      };
    },

    /**
     * тут возможна валидация с использованием Promise, но это скорее всего пока не надо переопределять
     * @param valueObj
     *
     * подумать над структурой и тут может быть Promise!!!
     * @returns {{isPromise: boolean, data, success: boolean}}
     */
    submit(valueObj) {
      return {
        success: true,
        data: this.convertFieldStorageToValue(valueObj),
        isPromise: false,
      };
    },

  },
};
</script>

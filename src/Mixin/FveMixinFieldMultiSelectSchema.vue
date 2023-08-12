<script>

export default {
  name: 'FveMixinFieldMultiSelectSchema',

  methods: {

    /**
     * @param {FveFieldValueObj} valueObj
     * @return {boolean}
     */
    isEmpty(valueObj /*: FveFieldValueObj */) /* : boolean */ {
      return valueObj.input === [];
    },

    /**
     * Проверяем совпадают ли значения valueSync
     * @param value1
     * @param value2
     * @return {boolean}
     */
    isEqualValue(value1, value2) {
      // Очень топорное сравнение 2 массивов по ключам
      return (value1 || []).map(item => item.id).join('_') === (value2 || []).map(item => item.id).join('_');
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
        input: { type: Array, default: () => { return []; }, },
      };
    },

    // TODO: подумать над именем функции // valueObjectGetItem
    convertFieldStorageToValue(valueObj) {
      return valueObj.input.map((option) => {
        return option.origin;
      });
    },
    // TODO: подумать над именем функции // valueObjectSetItem
    convertValueToFieldStorage(value) {
      if (!value) {
        return {
          input: [],
        };
      }
      return {
        input: value.map(this.optionConvertToInternalFormat),
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

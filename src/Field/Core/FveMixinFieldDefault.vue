<script>/**
 * Данный миксин содержит функции, которые необходимо переопределить для своего элемента формы
 */
import {FT_STRING} from '@field/FveFieldType';

export default {
  name: 'FveMixinFieldDefault',


  props: {
    // Для работы через modelValue необходимо передать field: { model: true }
    modelValue: {
      // /** @type {import('vue').PropType<{FveFieldObject}>} */
      // type: Object, // Object as PropType<any>,
      required: false,
    },
  },

  methods: {
    /**
     * @param {FveFieldStoreObj} fieldStore
     * @return {boolean}
     */
    isEmpty(fieldStore /*: FveFieldStoreObj */) /* : boolean */ {
      return false;
    },

    /**
     * @param {FveFieldStoreObj} fieldStore
     * return {any}
     */
    validate(fieldStore /*: FveFieldStoreObj */) {
      return null;
    },

    /**
     * TODO: delete
     * @deprecated использовать fieldStoreSchema
     * @return {FveFieldSchema}
     */
    valueSchema() /*: FveFieldSchema */ {
      return {
        input: FT_STRING(),
      };
    },

    /**
     * Новое название функции для описания схемы данных поля
     * @return {FveFieldSchema}
     */
    fieldStoreSchema() { /*: FveFieldSchema */
      return this.valueSchema();
    },

    /**
     *
     * Функция преобразует внутреннее значение поля в пользовательский формат данных.
     *
     * Пример использования:
     * - Наша система работает с объектом Date
     * - Для ввода даты используется текстовое поле
     * В данной ситуации формат данных поля и нашей системы не должен быть связан.
     * Для этого мы пишем адаптеры convertFieldStorageToValue и convertValueToFieldStorage.
     *
     * Функция преобразовывает внешнее значение формы во внутренний формат
     *
     * @param {FveFieldStoreObj} fieldStore
     * return {any}
     */
    convertFieldStorageToValue(fieldStore) {
      return fieldStore.input;
    },

    /**
     *
     * Функция преобразовывает внешнее значение во внутренний формат поля
     *
     * Пример использования:
     * - Наша система работает с объектом Date
     * - Для ввода даты используется текстовое поле
     * В данной ситуации формат данных поля и нашей системы не должен быть связан.
     * Для этого мы пишем адаптеры convertFieldStorageToValue и convertValueToFieldStorage.
     *
     * @param {any} value
     * @return {FveFieldStoreObj}
     */
    convertValueToFieldStorage(value /*: any*/) /*: FveFieldStoreObj */ {
      return {
        input: value,
      };
    },


    /**
     * Данная функция необходима исключения лишних синхронизаций формы и элемента формы
     * Для этого необходимо сформировать hash строку, на которую будет опираться логика
     * и определять есть ли изменение в объекте
     *
     * @param {FveFieldStoreObj} fieldStore
     * @return {string}
     */
    convertFieldStorageToHash(fieldStore /*: FveFieldStoreObj*/) /*: string*/ {
      const res = this.convertFieldStorageToValue(fieldStore);
      return res ? res.toString() : '';
    },


    /**
     * Функция не требует переопределения в 99.9% случаях.
     * Но бывают моменты, когда финальное значение поля нужно преобразовать, до-вычислить и тп.
     * В таких случаях неразумно пользоваться convertFieldStorageToValue для каждого введенного значения,
     * так как это тратит значительные ресурсы.
     *
     * Реальный пример - автокомплит и геокодинг от гугла.
     * Если нам нужно поле с автокомплитом адреса и получением координат по этому адресу,
     * то на каждый ввод нам придется дергать геокодинг (можно, но это лишняя нагрузка и более медлительный интерфейс).
     *
     * Пример очень специфичный, но имеет право на жизнь.
     *
     * @param {FveFieldStoreObj} fieldStore
     * @return {any}
     */
    async submitPrepare(fieldStore /*: FveFieldStoreObj*/) {
      // /**
      //  * тут возможна валидация с использованием Promise, но это скорее всего пока не надо переопределять
      //  * @param fieldStore
      //  *
      //  * подумать над структурой и тут может быть Promise!!!
      //  * @returns {{isPromise: boolean, data, success: boolean}}
      //  */
      // submit(fieldStore) {
      //   return {
      //     success: true,
      //     data: this.convertFieldStorageToValue(fieldStore),
      //     isPromise: false,
      //   };
      // },

      return this.convertFieldStorageToValue(fieldStore);
    },


    /**
     * TODO: использовать submitPrepare, так как эта функция не актуальна!!!
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


    /**
     * Функция для установки фокуса на выбранном элементе формы
     */
    setFocus() {
      /* this.$refs.input.focus(); */
    },

    // /**
    //  * Проверяем совпадают ли значения valueSync
    //  * @param value1
    //  * @param value2
    //  * @return {boolean}
    //  */
    // isEqualValue(value1, value2) {
    //   return value1 === value2;
    // },
  },

  computed: {
    /**
     * TODO: подумать над названием isRealtimeValidate???
     * Определяем нужно ли валидировать наше поле при внесении в него изменений
     * @return {string}
     */
    fieldValidateType() {
      // TODO: use validate type: REALTIME_NOT_EMPTY, REALTIME_EMPTY_ERROR, NONE
      return 'REALTIME'; // this.field.validateType;
    },
  },
};
</script>

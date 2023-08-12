<script>

import {FVE_INTERFACE_FIELD} from '../../FveConst';

export default {
  name: 'FveMixinFieldCore',
  data() {
    return {
      /**
       * Данное поле хранит в себе данные которые влияю на финальное значение
       *
       * TODO: подумать о переименовании fieldStore || innerValue ???
       */
      value: null,

      /**
       * Данное поле отвечает за ошибки валидации
       *
       * TODO: переименовать поле в fieldError ???
       * Продумать структуру класса/объекта ошибки
       * {
       *   code: 'ERROR_NO',
       *   status: 'SUCCESS', // SUCCESS WARNING ERROR // TODO: use const
       *   message: '',
       * },
       */
      error: null, // null as FveFieldError|null,

      //
      fveFieldSyncValueHash: undefined,
      fveInterface: FVE_INTERFACE_FIELD,
    };
  },
  methods: {

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Не переопределять !!!
    //

    // helpers
    fieldSetValue(value) {
      this.fieldStoreUpdate(this.convertValueToFieldStorage(value));
    },


    // Error
    fieldErrorSet(status = 'SUCCESS', message = '', code = 'ERROR_NO') {
      this.error.status = status;
      this.error.message = message;
      this.error.code = code;
    },

    fieldErrorSetObject(fieldError /*: FveFieldError */) {
      this.error = fieldError;
    },
    fieldErrorClear() {
      this.error = null;
    },

    /**
     * TODO: подумать над именем
     * Получить объект ошибки, который необходимо вывести если объект обязательный
     * @return {{code: string, message: string, status: string}}
     */
    fieldErrorGetValidateRequiredObj() /*: FveFieldError */ {
      return {
        code: 'REQUIRE',
        status: 'ERROR',
        message: 'Поле обязательно для заполнения',
      };
    },

    // Submit

    /**
     * Производим валидацию поля и возвращаем значение поля в виде promise
     * - используется для submit формы.
     *
     * @return Promise
     */
    async fieldSubmit() {
      const fieldError = await this.fieldValidate();
      if (fieldError) {
        this.fieldErrorSetObject(fieldError); // Наверно тут нет смысла ставить ошибку повторно

        // TODO: use Custom field error exception class
        throw fieldError;
      }
      this.fieldErrorClear();

      let res = null;
      try {
        // todo: подумать над называнием и над this.submit !!!
        res = await this.submitPrepare(this.value);
      } catch (fieldError) {
        this.fieldErrorSetObject(fieldError);

        // TODO: use Custom field error exception class
        throw fieldError;
      }
      return res;
    },


    // Валидация

    /**
     * Валидации fieldStore
     * @param {FveFieldValueObj} fieldStore
     */
    async fieldValidateFieldStoreObj(fieldStore /*: Object*/) /*: Promise<FveFieldError | null> */ {
      const fieldIsEmpty = this.isEmpty(fieldStore);

      if (this.field.required && fieldIsEmpty) {
        return this.fieldErrorGetValidateRequiredObj();
      }

      if (fieldIsEmpty) {
        return null;
      }

      // Валидация которую можно переопределить в реализуемом поле
      let error = await this.validate(fieldStore);

      if (error) {
        return error;
      }

      return null;
    },

    /**
     * Валидация текущего поля с выводом ошибки на поле
     */
    async fieldValidate() {
      const fieldError = await this.fieldValidateFieldStoreObj(this.value);
      if (fieldError) {
        this.fieldErrorSetObject(fieldError);
        return fieldError;
      }

      this.fieldErrorClear();
      return null;
    },


    // Обновление
    /**
     * @deprecated use fieldStoreUpdate
     */
    fieldValueUpdate(valueObj /*: Object */) { this.fieldStoreUpdate(valueObj); },


    /**
     * Функция для обновления состояния текущего компонента
     * @param {FveFieldStoreObj} fieldStore
     */
    fieldStoreUpdate(valueObj, modelValueWatcherUpdate = false) {
      Object.assign(this.value, valueObj);

      const valueHash = this.convertFieldStorageToHash(this.value);
      const isValueUpdated = this.fveFieldSyncValueHash !== valueHash;

      if (!isValueUpdated) {
        // поле не изменилось
        return;
      }
      this.fveFieldSyncValueHash = valueHash;

      const newValue = this.convertFieldStorageToValue(this.value);

      // validate update
      // this.fieldValidateChangeValue();
      if (this.fieldValidateType === 'REALTIME') {
        let error = this.fieldValidate();
      }

      // modelValue update
      if (modelValueWatcherUpdate !== true && this.isModelValue()) {
        this.$emit('update:modelValue', newValue);
      }

      // form update
      this.fieldSyncParentForm(newValue, this.value);
      this.fieldIsChangeStatusUpdate(newValue); // TODO: понять что сюда передать
      this.field.update && this.field.update(newValue, this.value);
      this.field.onUpdate && this.field.onUpdate(newValue, this.value);
    },



    // Инициализация

    /**
     * Получаем значение для инициализации fieldStore
     * @return {FveFieldStoreObj|{}}
     */
    fieldStoreGetValue() {
      if (this.isModelValue()) {
        return this.convertValueToFieldStorage(this.modelValue); // TODO: undefined fix
      }
      if (this.field.hasOwnProperty('initValue')) {
        return this.convertValueToFieldStorage(this.field.initValue);
      }
      return this.fieldStoreSchemaConvertInValue(this.fieldStoreSchema());
    },

    /**
     * Получаем дефолтные данные из схемы
     * @param fieldSchema
     * @return {{}}
     */
    fieldStoreSchemaConvertInValue(fieldSchema) {
      let value = {};
      for (let key in fieldSchema) {
        try {
          value[key] = fieldSchema[key].default();
        } catch (e) {
          console.warn(e, fieldSchema, key, this.field);
        }
      }
      return value;
    },

    /**
     * Работает ли поле в режиме v-model
     * @return {boolean}
     */
    isModelValue() {
      return !!this.field.model;
    },

  },
  created() {
    // init fake store
    this.value = this.fieldStoreGetValue();
    this.fveFieldSyncValueHash = this.convertFieldStorageToHash(this.value);


    if (this.isModelValue()) {
      this.$watch('modelValue', (val) => {
        if (typeof val === 'undefined') {
          return;
        }

        this.fieldStoreUpdate(this.convertValueToFieldStorage(val), true);
      });
    }
  },
};
</script>

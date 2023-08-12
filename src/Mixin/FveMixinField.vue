<script>



import {FVE_INTERFACE_FIELD} from 'vue-form-element/src/FveConst';

export default {
  name: 'FveMixinField',
  props: {
    // Переходим в сторону объекта, так как обновление происходит позже чем валидация
    field: {
      /** @type {import('vue').PropType<{FveFieldObject}>} */
      type: Object, // Object as PropType<FveFieldObject>,
      required: true,
    },
    
    // Для работы через modelValue необходимо передать field: { model: true } 
    modelValue: {
      type: Object, // Object as PropType<any>,
      required: false,
    },
    // // can also annotate functions
    // callback: Function as PropType<(id: number) => void>
  },
  data() {
    return {
      
      // fveInterface: 'FormElementInterface', // В некоторых подходах есть проблема с interface и _interface
      fve: {
        interface: FVE_INTERFACE_FIELD,
        parentComponent: null,
        valueSync: null, // null as string|null, // null необходим только для первой инициализации!!!
      },
      
      // value => fieldStore ???
      innerValue: this.fieldGetInitValue(),
      
      fieldError: null, // null as FveFieldError|null,
      
    };
  },
  methods: {
    /**
     * @param {FveFieldState} fieldState
     * @return {boolean}
     */
    isEmpty(fieldState /*: FveFieldState */) /* : boolean */ {
      return false;
    },
    
    /**
     * @param {FveFieldState} fieldState
     * return {any}
     */
    validate(fieldState /*: FveFieldState */) {
      return null;
    },
    
    /**
     * Функция для установки фокуса на выбранном элементе формы
     */
    setFocus() {
      /* this.$refs.input.focus(); */
    },
  
    /**
     * @return {FveFieldSchema}
     */
    valueSchema() /*: FveFieldSchema */ {
      return {}; // { input: {type: String, default: () => { return ''; } } };
    },
    //
  
  
    /**
     * TODO: подумать над именем функции // valueObjectGetItem
     * 
     * Функция преобразует внешнее значение поля в пользовательский формат данных.
     * 
     * Пример использования:
     * - Наша система работает с объектом Date
     * - Для ввода даты используется текстовое поле
     * В данной ситуации формат данных поля и нашей системы не должен быть связан.
     * Для этого мы пишем адаптеры convertFieldStateToValue и convertValueToFieldState.
     * 
     * Функция преобразовывает внешнее значение формы во внутренний формат
     *
     * @param {FveFieldState} fieldState
     * return {any}
     */
    convertInnerValueToValue(fieldState /* : FveFieldState */) /* : any */ {
      return null; // fieldState?.input || '';
    },
  
    /**
     * TODO: подумать над именем функции // valueObjectSetItem
     *
     * Функция преобразовывает внешнее значение во внутренний формат поля
     *
     * Пример использования:
     * - Наша система работает с объектом Date
     * - Для ввода даты используется текстовое поле
     * В данной ситуации формат данных поля и нашей системы не должен быть связан.
     * Для этого мы пишем адаптеры convertFieldStateToValue и convertValueToFieldState.
     *
     * @param {any} value
     * @return {FveFieldState}
     */
    convertValueToInnerValue(value /*: any*/) /*: FveFieldState */ {
      return {}; // { input: value, };
    },
  
    
    
    /**
     * TODO: дать описание!!!
     * 
     * @param {FveFieldState} fieldState
     * @return {string}
     */
    convertFieldStateToValueSync(fieldState /*: FveFieldState*/) /*: string*/ {
      const res = this.convertFieldStateToValue(fieldState);
      return res ? res.toString() : '';
    },
  
  
    /**
     * Функция не требует переопределения в 99.9% случаях.
     * Но бывают моменты, когда финальное значение поля нужно преобразовать, до-вычислить и тп.
     * В таких случаях неразумно пользоваться convertFieldStateToValue для каждого введенного значения,
     * так как это тратит значительные ресурсы.
     *
     * Реальный пример - автокомплит и геокодинг от гугла.
     * Если нам нужно поле с автокомплитом адреса и получением координат по этому адресу,
     * то на каждый ввод нам придется дергать геокодинг (можно, но это лишняя нагрузка и более медлительный интерфейс).
     *
     * Пример очень специфичный, но имеет право на жизнь.
     *
     * @param {FveFieldState} fieldState
     * @return {any}
     */
    async submitPrepare(fieldState /*: FveFieldState*/) {
      // /**
      //  * тут возможна валидация с использованием Promise, но это скорее всего пока не надо переопределять
      //  * @param fieldState
      //  *
      //  * подумать над структурой и тут может быть Promise!!!
      //  * @returns {{isPromise: boolean, data, success: boolean}}
      //  */
      // submit(fieldState) {
      //   return {
      //     success: true,
      //     data: this.convertFieldStateToValue(fieldState),
      //     isPromise: false,
      //   };
      // },
      
      return this.convertFieldStateToValue(fieldState);
    },
    
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Не переопределять !!!
    //
    
    /**
     * Получить изначальное значение/состояние поля
     * 
     * Функция вызывается из data(), по этому имеет ряд ограничений
     */
    fieldStateGetInitValue() /*: FveFieldState */ {
      if (this.isModelValue()) {
        return this.convertValueToFieldState(this.modelValue); // TODO: undefined fix
      }
      
      // form
      if (this.field.hasOwnProperty('initValue')) {
        return this.convertValueToFieldState(this.field.initValue);
      }
      
      let value = {}; // {} as FveFieldState;
      let valueSchema = this.valueSchema();
      for (let key in valueSchema) {
        try {
          value[key] = valueSchema[key].default();
        } catch (e) {
          console.warn(e, valueSchema, key, this.field);
        }
      }
      return value;
    },
    
    
    
    
    fieldSync(valueSync, value) {
      let sync = false;
      if (this.fve.parentComponent) {
        sync = true; // default value = TRUE
        if (this.field.hasOwnProperty('sync')) {
          sync = !!this.field.sync;
        }
      }
      sync &&
      this.fve.parentComponent.formFieldSync(
          this.field.name,
          valueSync,
          value
      );
    },
    
    
    /**
     * Функция для обновления состояния текущего компонента
     * @param {FveFieldState} fieldState
     */
    fieldStateUpdate(fieldState /*: Object */) {
      // TODO: update logic
      
      Object.assign(this.fieldState, fieldState);
      
      if (this.fieldValidateType === 'REALTIME') {
        let error = this.fieldValidate();
      }
      
      
      let valueSync = this.convertFieldStateToValueSync(this.fieldState);
      
      const isValueUpdated = this.fve.valueSync !== valueSync;
      this.fve.valueSync = valueSync;
      
      // fix for modelValue
      if (isValueUpdated && this.isModelValue()) {
        this.$emit('update:modelValue', valueSync);
      }
      
      this.fieldSync(valueSync, this.fieldState);
      this.field.update && this.field.update(valueSync, this.fieldState);
    },
    
    
    
    
    
    //
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    // Error
    fieldErrorSetObject(fieldError /*: FveFieldError */) {
      this.fieldError = fieldError;
    },
    fieldErrorClear() {
      this.fieldError = null;
    },
    
    // Validate
    fieldValidateRequiredErrorGet() /*: FveFieldError */ {
      return {
        code: 'REQUIRE',
        status: 'ERROR',
        message: 'Поле обязательно для заполнения',
      };
    },
    
    /**
     * Чистая функция валидации чистого значения??? или все таки внутреннего значения поля???
     * @param {FveFieldState} fieldState
     */
    async fieldValidateValueObj(fieldState /*: Object*/) /*: Promise<FveFieldError | null> */ {
      let fieldIsEmpty = this.isEmpty(fieldState);
      
      if (this.fieldRequired && fieldIsEmpty) {
        return this.fieldValidateRequiredErrorGet();
      }
      
      if (fieldIsEmpty) {
        return null;
      }
      
      // Валидация которую можно переопределить в реализуемом поле
      let error = await this.validate(fieldState);
      
      if (error) {
        return error;
      }
      
      // // TODO: fix или Удалить из за не актуальности???
      // if (this.field.validateCustomFunction) {
      //   error = await this.field.validateCustomFunction(fieldState);
      //   if (error) {
      //     return error;
      //   }
      // }
      
      return null;
    },
    
    /**
     * Валидация текущего поля с выводомм ошибки на поле
     */
    async fieldValidate() /* : Promise<FveFieldError | null> */ {
      const fieldError = await this.fieldValidateValueObj(this.fieldState);
      if (fieldError) {
        this.fieldErrorSetObject(fieldError);
        return fieldError;
      }
      
      this.fieldErrorClear();
      return null;
    },
    
    
    
    
    // TODO
    isModelValue() /*: boolean */ {
      return !!this.field.model;
    },
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Производим валидацию поля и возвращаем значение поля в виде promise
     * - используется для submit формы.
     *
     * @return Promise
     */
    async fieldSubmit() {
      const fieldError = await this.fieldValidate();
      if (fieldError) {
        this.fieldErrorSetObject(fieldError);
        
        // TODO: use Custom field error exception class
        throw fieldError;
      }
      this.fieldErrorClear();
      
      let res = null;
      try {
        res = await this.submitPrepare(this.fieldState);
      } catch (fieldError) {
        this.fieldErrorSetObject(fieldError);
        
        // TODO: use Custom field error exception class
        throw fieldError;
      }
      return res;
    },
    
    // TODO: keypressEnter form submit add
    fieldFormSubmit() {
      this.fve.parentComponent &&
      this.fve.parentComponent.submit &&
      this.fve.parentComponent.submit();
    },
  },
  computed: {
    //
    fieldRequired() {
      // TODO: add settings support
      const defaultValue = false;
      // console.log(this.field);
      return this.field.hasOwnProperty('required')
          ? this.field.required
          : defaultValue;
    },
    // TODO: use validate type: REALTIME_NOT_EMPTY, REALTIME_EMPTY_ERROR, NONE
    fieldValidateType() {
      // TODO: add settings support
      const defaultValue = 'REALTIME';
      let v = defaultValue;
      if (this.field.hasOwnProperty('validateRealtime')) {
        if (!this.field.validateRealtime) {
          v = 'DISABLE';
        }
      }
      return v;
    },
    
    formElementBlockClass() {
      return {
        'form-validate-element': true,
        fve: true,
        ['fve-field__' + this.field.name]: true,
        ['fve-theme__' + this.field.theme]: !!this.field.theme,
        ['fve-status__' + this.error.status.toLowerCase()]: true,
        'fve-readonly': this.readonly,
        'fve-disabled': this.disabled,
        'fve-require': this.fieldRequired,
      };
    },
  },
  mounted() {
    if (this.isModelValue()) {
      this.$watch('modelValue', (val) => {
        // TODO: uncommitted
        if (typeof val === 'undefined') {
          return;
        }
        this.fieldState = this.convertValueToFieldState(val);
        let valueSync = this.convertFieldStateToValue(this.fieldState);
        this.fve.valueSync = valueSync;
      });
    }
    
    let VueComponent = this; // this as any;
    for (let i = 0; i < 20; i++) {
      VueComponent = VueComponent.$parent;
      if (VueComponent === null) {
        // TODO: add error ???
        return;
      }
      
      // TODO: переименовать interface
      if (VueComponent.interface === 'FormProxyInterface') {
        continue;
      }
      if (VueComponent.interface === 'FormProxyStopInterface') {
        return;
      }
      if (VueComponent.interface === 'FormInterface') {
        this.fve.parentComponent = VueComponent;
        this.fve.parentComponent.fveElAdd(this);
        break;
      }
      
      // TODO: add error ???
      // return;
    }
  },
  beforeUnmount() {
    if (this.fve.parentComponent) {
      this.fve.parentComponent.fveElDelete(this.field.name);
      this.fve.parentComponent = null;
    }
  },
};
</script>

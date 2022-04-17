<script>
import FveTemplateField from "../Template/FveTemplateField";

export default {
  name: "FveMixinField",
  components: {
    FveTemplateField,
  },
  props: {
    // стилистика
    label: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    caption: { type: String, default: "" },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    theme: { type: String, default: "" },

    // Переходим в сторону объекта, так как обновление происходит позже чем валидация
    field: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    // //
    // // Установочные
    // name: { type: String, required: true },
    // // validateSettings - настройки валидации
    // required            : { type: Boolean, default: false },
    // validateAdditional  : { type: Function, default: null }, // не обязательное
    // // default: () => { return { code: 'ERROR_NO', status: 'SUCCESS', message: ''}'; }
    //
    // // pluginSettings - настройки поведения плагина
    // validateRealtime      : { type: Boolean , default: true }, // TODO: добавить типы валидации через объект
    //
    // // callback
    // sync                  : { type: Function, default: null }, // Не нужно задавать эту функцию, вместо нее использовать update
    // update                : { type: Function, default: null }, // Пользовательская функция на событие обновления поля
    //
    // // TODO: необходимо переопределить
    // // Установочные
    // // initValue: { type: String, required: false, default: null},
    // // настройки валидации - рекомендованные к реализация
    // // min: { type: String, required: false, default: null},
    // // max: { type: String, required: false, default: null},
  },
  data() {
    return {
      value: this.fieldGetInitValue(), // TODO: переопределить у себя в компоненте, а лучше использовать функцию
      view: {},
      //
      interface: "FormElementInterface",
      // TODO: use class
      error: {
        code: "ERROR_NO",
        status: "SUCCESS", // SUCCESS WARNING ERROR // TODO: use const
        message: "",
      },
      fve: {
        id: null,
        parentComponent: null,
      },

      valueSync: undefined,
    };
  },
  methods: {
    isEmpty(valueObj) {
      return false;
    },
    validate(valueObj) {
      return null;
    },
    setFocus() {
      /* this.$refs.input.focus(); */
    },
    // описываем структуру value
    valueSchema() {
      return {
        /* input: {type: String, default: () => { return ''; } } */
      };
    },
    // TODO: подумать над именем функции // valueObjectGetItem
    convertObjectToValue(valueObj) {
      return valueObj.input;
    },
    // TODO: подумать над именем функции // valueObjectSetItem
    convertValueToObject(value) {
      return {
        input: value,
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
        data: this.convertObjectToValue(valueObj),
        isPromise: false,
      };
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Не переопределять !!!
    //

    fieldGetInitValue() {
      if (this.isModelValue()) {
        return this.convertValueToObject(this.modelValue); // TODO: undefined fix
      }

      // form
      if (this.field.hasOwnProperty("initValue")) {
        return this.convertValueToObject(this.field.initValue);
      }

      let value = {};
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

    // TODO: keypressEnter form submit add
    fieldFormSubmit() {
      this.fve.parentComponent &&
        this.fve.parentComponent.submit &&
        this.fve.parentComponent.submit();
    },

    // произошел submit формы (проводим валидацию и отдаем данные)
    fieldSubmit() {
      let error = this.fieldValidate(this.value);
      if (error) {
        return { success: false, error: error };
      }

      return this.submit(this.value);
    },

    fieldSync(valueSync, value) {
      let sync = false;
      if (this.fve.parentComponent) {
        sync = true; // default value = TRUE
        if (this.field.hasOwnProperty("sync")) {
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

    fieldValueUpdate(valueObj) {
      // TODO: update logic

      Object.assign(this.value, valueObj);

      this.fieldValidateChangeValue();

      let valueSync = this.convertObjectToValue(this.value);

      const isValueUpdated = this.valueSync !== valueSync;
      this.valueSync = valueSync;

      // fix for modelValue
      if (isValueUpdated && this.isModelValue()) {
        this.$emit("update:modelValue", valueSync);
      }

      this.fieldSync(valueSync, this.value);
      this.field.update && this.field.update(valueSync, this.value);
    },
    fieldSetError(status = "SUCCESS", message = "", code = "ERROR_NO") {
      this.error.status = status;
      this.error.message = message;
      this.error.code = code;
    },

    fieldValidate(value) {
      let fieldIsEmpty = this.isEmpty(value);

      if (this.fieldRequired && fieldIsEmpty) {
        return {
          code: "REQUIRE",
          status: "ERROR",
          message: "Поле обязательно для заполнения",
        };
      }

      if (!fieldIsEmpty) {
        let error = this.fieldValidateIsNotEmptyValue(value);
        if (error) {
          return error;
        }
      }

      return null;
    },

    // Тут может быть возвращен Promise ?????????
    //   спорный момент нужна ли ajax валидация realtime...
    fieldValidateIsNotEmptyValue(value) {
      let error = null;

      // Валидация компонента унаследовавшая этот миксин
      error = this.validate(value);

      if (error) {
        return error;
      }

      if (this.validateCustomFunction) {
        error = this.validateCustomFunction(value);
        if (error) {
          return error;
        }
      }

      return null;
    },

    fieldValidateChangeValue() {
      let validateType = this.fieldValidateType;
      if (validateType === "REALTIME") {
        let error = this.fieldValidate(this.value);
        // TODO: fix
        if (error && error.code !== "REQUIRE") {
          this.fieldSetError(error.status, error.message, error.code);
        } else {
          this.fieldSetError(); // reset error
        }
      }
    },

    // TODO
    isModelValue() {
      return !!this.field.model;
    },

    //
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  },
  computed: {
    //
    fieldRequired() {
      // TODO: add settings support
      const defaultValue = false;
      // console.log(this.field);
      return this.field.hasOwnProperty("required")
        ? this.field.required
        : defaultValue;
    },
    // TODO: use validate type: REALTIME_NOT_EMPTY, REALTIME_EMPTY_ERROR, NONE
    fieldValidateType() {
      // TODO: add settings support
      const defaultValue = "REALTIME";
      let v = defaultValue;
      if (this.field.hasOwnProperty("validateRealtime")) {
        if (!this.field.validateRealtime) {
          v = "DISABLE";
        }
      }
      return v;
    },

    formElementBlockClass() {
      return {
        "form-validate-element": true,
        fve: true,
        ["fve-field__" + this.field.name]: true,
        ["fve-theme__" + this.theme]: !!this.theme,
        ["fve-status__" + this.error.status.toLowerCase()]: true,
        "fve-readonly": this.readonly,
        "fve-disabled": this.disabled,
        "fve-require": this.fieldRequired,
      };
    },
  },
  mounted() {
    if (this.isModelValue()) {
      this.$watch("modelValue", (val) => {
        // TODO: uncommitted
        if (typeof val === "undefined") {
          return;
        }
        this.value = this.convertValueToObject(val);
        let valueSync = this.convertObjectToValue(this.value);
        this.valueSync = valueSync;
      });
    }

    let VueComponent = this;
    for (let i = 0; i < 10; i++) {
      VueComponent = VueComponent.$parent;
      if (VueComponent === null) {
        // TODO: add error ???
        return;
      }
      if (VueComponent.interface === "FormProxyInterface") {
        continue;
      }
      if (VueComponent.interface === "FormInterface") {
        this.fve.parentComponent = VueComponent;
        this.fve.id = this.fve.parentComponent.formElementAdd(this);
        break;
      }

      // TODO: add error ???
      return;
    }
  },
  beforeUnmount() {
    if (this.fve.parentComponent) {
      this.fve.parentComponent.formElementDelete(this.fve.id);
      this.fve.id = null;
      this.fve.parentComponent = null;
    }
  },
};
</script>

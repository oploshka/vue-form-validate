<script>


import { computed } from 'vue';
import {FT_BOOLEAN, FT_FUNCTION, FT_STRING} from '@field/FveFieldType';

/**
 * Данный миксин описывает работу с пропсами
 */
export default {
  name: 'FveMixinFieldProperty',

  /*
  props: {
    Все это превращается в магию из FveMixinFieldProperty
    //
    // стилистика
    // label: { type: String, default: '' },
    // placeholder: { type: String, default: '' },
    // caption: { type: String, default: '' },
    // readonly: { type: Boolean, default: false },
    // disabled: { type: Boolean, default: false },
    // theme: { type: String, default: '' },

    // Переходим в сторону объекта, так как обновление происходит позже чем валидация
    //
    field: {
      /** @type {import('vue').PropType<{FveFieldObject}>} * /
      type: Object,
      required: true,
      // default() { /** @type {FveFieldObject} * / return {}; },
    },
  }
  */

  data() {

    // Это магия. Тут создаются computed свойства, для нашей формы. Возможно это стоит делать именно в create


    const fieldPropertySchema = this.fieldPropertySchema();
    this.fieldPropertySchemaPrepare(fieldPropertySchema);

    const fieldProperty = this.fieldCreateComputedPropertyForFieldBySchema(fieldPropertySchema);

    return {

      // Данный объект создан только для чтения
      // попытка переопределить this.field.label = 12 (значение в объекте не будет поменено, так как это компутед)
      //  ошибки не будут выведены и это печально...
      //
      // Следующий код убьет реактивность
      // delete this.field.label // теряем реактивность на конкретное свойство
      // this.field = {} // теряем полную реактивность
      field: fieldProperty,
      ...fieldProperty,
    };
  },

  methods: {

    // TODO: продумать возможность определения через кастомную функцию
    fieldPropertySchema(){
      return {
        initValue:    FT_STRING(null), // TODO: fix and use value type.

        // defaultValue - тип аналогичен initValue. если данного поля нет, то принимаем значение initValue
        // данное свойство необходимо корректной работы fieldIsChange при добавлении и удалении полей
        // хотя это редкий кейс.

        name:         FT_STRING(),
        label:        FT_STRING(),
        placeholder:  FT_STRING('введите значение'),
        caption:      FT_STRING(),
        readonly:     FT_BOOLEAN(false),
        disabled:     FT_BOOLEAN(false),
        theme:        FT_STRING(),
        //
        model:        FT_BOOLEAN(false),
        update:       FT_FUNCTION(null),
        onUpdate:     FT_FUNCTION(null), // TODO: понять как смержить update и onUpdate

        validateType:     FT_STRING('REALTIME'), // TODO: use enum REALTIME|DISABLED

        // validateCustomFunction - данный функционал удален из-за отсутствия необходимости
        // sync: true - данный функционал отключен из-за неактуальности (оптимизация не прижилась)
      };
    },

    fieldPropertySchemaPrepare(fieldPropertySchema) {
      // fieldPropertySchema.label = FT_STRING('test default');
    },

    fieldCreateComputedPropertyForFieldBySchema(schema) {
      const propertyObj = {};
      for(const key in schema) {
        const propertyInfo = schema[key];
        propertyObj[key] = this.fieldCreateComputedPropertyForField(key, propertyInfo );
      }
      return propertyObj;
    },

    // TODO: нужно передать код, значение по умолчанию (функцию), функцию валидации, callbackUpdate
    fieldCreateComputedPropertyForField(code, propertyInfo){
      return computed(() => {
        return this.fieldGetAttrByCode(code, propertyInfo.default());
      });
    },

    //
    fieldGetAttrByCode(code, defaultValue) {

      // console.log('FIELD COMPUTED PROPERTY GET '+ code);


      // Путем эксперимента удалось выяснить, что отдельные свойства менее эффективны чем свойства занесенные в field = {}
      // так как изменение или добавление не связанных свойств начинает заставлять все пересчитывать.
      // Возможно это связано со спецификой данного кода, а именно  =>  if(code in this.$attrs)
      // if(code in this.$attrs) {
      if(this.$attrs[code]) {
        if(this.$attrs.field && (code in this.$attrs.field)) {
          console.warn('Дублируется свойство поля ' + code);
        }
        return this.$attrs[code];
      }
      if(this.$attrs.field && (code in this.$attrs.field)) {
        return this.$attrs.field[code];
      }
      return defaultValue;
    }
  }

};
</script>

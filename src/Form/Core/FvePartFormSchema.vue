<script>

import FveForm from '../../Template/FveForm';

import { assertType } from './FvePartFormSchemaValidate.js';


export default {
  name: 'FvePartFormSchema',
  components: {
    FveForm
  },
  props: {
    // Форма создания vs редактирования
    formData: {
      type: Object,
      default: () => { return {}; }
    },
  },
  data() {

    let form = this.formGetDefaultData();

    let field = {};
    if('formSchemaV2' in this) {
      field = this.formGetFieldObjectV2();
    }

    return {
      field: field,
      form: form,
    };
  },
  methods: {
    // НЕОБХОДИМО ПЕРЕОПРЕДЕЛИТЬ ПОЛЬЗОВАТЕЛЕМ
    formSchemaV2() {
      return {};
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    //
    formGetFieldObjectV2() {
      const allField = {};
      const formSchema = this.formSchemaV2();
      for(let fieldName in formSchema) {
        let field = { ...formSchema[fieldName], name: fieldName };
        field.initValue = this.formGetFieldObjectV2_getInitValue(field, this.formData);
        //
        allField[fieldName] = field;
      }
      return allField;
    },

    formGetFieldObjectV2_getInitValue(field, formData) {
      let initValue = null;
      const fieldName = field.name;

      // TODO: протестировать вторую часть условия (может выстрелить в ногу!!!)
      if(fieldName in formData && formData[fieldName] !== null) {

        // TODO: test
        // if(typeof this.formData[key] !== formSchema[key].type){
        if( !assertType (formData[fieldName], field.type.type) ){
          console.warn('formSchema - is not correct type', fieldName, field, formData, this  );
        }
        initValue = this.formData[fieldName];
      } else {
        initValue = field.type.default ? field.type.default() : null;
      }
      return initValue;
    },

    //
    formGetDefaultData() {
      let form = {};
      let formSchema;

      if('formSchemaV2' in this) {
        formSchema = this.formSchemaV2();
      }

      for(let key in formSchema) {
        if(key in this.formData) {
          // TODO: vue validateProps
          // if(typeof this.formData[key] !== formSchema[key].type){
          //   console.warn('formSchema - is not correct type', key, formSchema, this.formData, this  );
          // }
          form[key] = this.formData[key];
        } else {
          form[key] = formSchema[key].type.default ? formSchema[key].type.default() : null;
        }
      }
      return form;
    },
  },
};

</script>

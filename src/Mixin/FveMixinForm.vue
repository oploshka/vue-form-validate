<script>

import FveForm from "@plugin/vue-form-element/src/Template/FveForm";

import {isPromise, assertType} from "@fve/Helper/Helper";


const getUniqueKey = (() => {
  let prefix = 'FVE_'+ Math.random().toString(36).substring(7)  + '_';
  let id = 1;

  return () => {
    let uniqueId = prefix + id;
    id++;
    return uniqueId;
  };
})()


export default {
  name: 'FveMixinForm',
  components: {
    FveForm
  },
  props: {
    formData: {
      type: Object,
      default: () => { return {}; }
    },
  },
  data() {
    let form = this.formGetDefaultData();
    let field = this.formGetFieldObject();

    return {
      field: field,
      form: form,


      formElement: {},
      //
      interface: 'FormInterface',
      formSubmitValidateProcess: false // TODO: add support
    };
  },
  methods: {
    // НЕОБХОДИМО ПЕРЕОПРЕДЕЛИТЬ ПОЛЬЗОВАТЕЛЕМ
    formSchema() {
      return {};
    },
    // тут пользовательская валидация ???
    validate() {

    },
    submitSuccessDataPrepare(submitData){
      return submitData;
    },
    submitErrorDataPrepare(formFieldError){
      return formFieldError;
    },

    // это не нужно переопределять в 99% случаев
    submit() {
      const formSubmitPromise = this.formSubmit();
      formSubmitPromise.then(
          (formData) => {
            this.$emit('submit', this.submitSuccessDataPrepare(formData));
          },
          (formFieldError) => {
            console.warn('[Submit-] ', formFieldError);
            this.$emit('error', this.submitErrorDataPrepare(formFieldError) );
          }
      );
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    //

    formGetFieldObject() {
      let fieldObject = {};
      const formSchema = this.formSchema();
      for(let fieldName in formSchema) {
        let fieldSettings = {};
        if('field' in formSchema[fieldName]){
          fieldSettings = formSchema[fieldName].field;
        }

        let initValue = null;
        if(fieldName in this.formData) {
          // TODO: test
          // if(typeof this.formData[key] !== formSchema[key].type){
          if( !assertType (this.formData[fieldName], formSchema[fieldName].type) ){
            console.warn('formSchema - is not correct type', fieldName, formSchema, this.formData, this  );
          }
          initValue = this.formData[fieldName];
        } else {
          initValue = formSchema[fieldName].default ? formSchema[fieldName].default() : null;
        }

        fieldObject[fieldName] = Object.assign(fieldSettings, {
          name: fieldName,
          initValue: initValue, // vs defaultValue() { return ''; }, // маловероятны проблемы с объектами
          // update: update,
          // // default
          // required: false,
          // sync: true,
        })
      }
      return fieldObject;
    },

    //
    formGetDefaultData() {
      let form = {};
      const formSchema = this.formSchema();
      for(let key in formSchema) {
        if(key in this.formData) {
          // TODO: vue validateProps
          // if(typeof this.formData[key] !== formSchema[key].type){
          //   console.warn('formSchema - is not correct type', key, formSchema, this.formData, this  );
          // }
          form[key] = this.formData[key];
        } else {
          form[key] = formSchema[key].default ? formSchema[key].default() : null;
        }
      }
      return form;
    },

    formFieldSync(fieldName, value) {
      this.form[fieldName] = value;
    },

    // Это регистрация компонента
    formElementAdd($children){
      let key = getUniqueKey();
      // TODO: add field name group
      this.formElement[key] = $children;
      return key;
    },
    formElementDelete(key){
      delete this.formElement[key];
    },
    formElementGetList(){
      let formElementArr = [];
      for(let key in this.formElement){
        formElementArr.push(this.formElement[key])
      }
      return formElementArr;
    },


    // TODO: добавить блокировку формы
    formSubmit(){

      let formIsValid = true;
      let formValue   = {};
      let formErrorField = [];

      let validatePromiseList = [];
      //
      const formElementArr = this.formElementGetList();
      for(let i = 0; i < formElementArr.length; i++){

        let formElement = formElementArr[i];
        // TODO: получить значение из компонента
        let res = formElement.fieldSubmit();

        if(isPromise(res)) {
          validatePromiseList.push(res);
        } else {
          if(res && res.success === true){
            formValue[formElement.field.name] = res.data;
          } else if(res && res.success === false){
            formIsValid = false;
            formErrorField.push({
              component: formElement,
              error: res.error,
            });
          } else {
            console.error(res);
          }
        }
      }

      if (validatePromiseList.length > 0) {
        console.error('FveForm::formSubmit - not add promise logic')
      }
      //
      if(formIsValid) {
        return Promise.resolve(formValue);
      } else  {
        for(let i = 0; i < formErrorField.length; i++){
          let error = formErrorField[i].error;
          formErrorField[i].component.fieldSetError(error.status, error.message, error.code);
        }
        formErrorField[0].component.setFocus();
        return Promise.reject(formErrorField);
      }
    },

    //

    // // action
    // formCancel()        {}, // сбросить к предыдущим валидным значениям???  this.$emit('cancel');
    // formReset()         {}, // установить дефолтные значения формы. vs formClear ???
    // formValidate()      {}, // Запустить валидацию
    // formValidateReset() {}, // Очистить все ошибки
    // formSubmitEmit() { this.$emit('submit', {} ); },

  },
  // computed: {},
  // watch:{
  //   formData(newFormData) {
  //     this.form = this.formGetDefaultData();
  //   }
  // }
};

</script>

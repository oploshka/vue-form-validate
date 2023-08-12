<script>

import FveForm from '../../Template/FveForm';

import {isPromise} from '../../Helper/Helper';
import { FVE_INTERFACE_FORM} from '../../FveConst';

export default {
  name: 'FveMixinFormDefault',
  methods: {
    // НЕОБХОДИМО ПЕРЕОПРЕДЕЛИТЬ ПОЛЬЗОВАТЕЛЕМ
    // тут пользовательская валидация ???
    validate() {

    },
    // formSchema() {
    //   return {};
    // },
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



    setFieldErrorTemp(fieldName, errorText) {
      const $componentField = this.fveFormGetFieldComponentByFieldName(fieldName);
      if(!$componentField) {
        console.warn('Не удалось установить ошибку для поля', fieldName, errorText, this);
        return;
      }
      $componentField.fieldErrorSet('ERROR', errorText, 'ERROR_CODE');
    },

    fveFormFieldSync(fieldName, value) {
      this.form[fieldName] = value;
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

<script>

import FveForm from '../../Template/FveForm';

import { FVE_INTERFACE_FORM } from '../../FveConst';

export default {
  name: 'FveMixinFormCore',
  components: {
    FveForm
  },
  props: {
    // Форма создания vs редактирования
    modeEdit: {type: Boolean, default: false},
  },
  data() {
    return {
      fveInterface: FVE_INTERFACE_FORM,
      // formSubmitValidateProcess: false // TODO: add support
    };
  },
  methods: {


    // TODO: добавить блокировку формы
    async formSubmit(){
      let formIsValid = true;
      const fieldSubmitPromiseObj = {};
      const fieldSubmitValue      = {};
      const fieldErrorObj         = {};
      //
      // let validatePromiseList = [];
      //
      const fieldComponentObj = this.fveFormGetFieldComponentObj();
      for(const fieldName in fieldComponentObj){
        const fieldComponent = fieldComponentObj[fieldName];

        fieldSubmitPromiseObj[fieldName] = fieldComponent.fieldSubmit();
      }

      // promise.all по объекту
      for(const fieldName in fieldComponentObj){
        try {
          fieldSubmitValue[fieldName] = await fieldSubmitPromiseObj[fieldName];
        } catch (e) {
          formIsValid = false;
          fieldErrorObj[fieldName] = e;
        }
      }


      //
      if(!formIsValid) {
        return Promise.reject(fieldErrorObj);
      }

      this.formIsChangeSetCurrentValueAndReset(fieldSubmitValue);
      return Promise.resolve(fieldSubmitValue);
    },

    formResetToInitValue() {
      const fieldComponentObj = this.fveFormGetFieldComponentObj();
      for(const fieldName in fieldComponentObj){
        const fieldComponent = fieldComponentObj[fieldName];
        fieldComponent.fieldSetInitValue();
      }
    }
  },
};

</script>

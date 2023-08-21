<script>

// const getUniqueKey = (() => {
//   let prefix = 'FVE_'+ Math.random().toString(36).substring(7)  + '_';
//   let id = 1;
//
//   return () => {
//     let uniqueId = prefix + id;
//     id++;
//     return uniqueId;
//   };
// })();


/**
 * Данный компонент отвечает за регистрацию поля в форме
 */
export default {
  name: 'FvePartFormRegistrator',
  data() {
    return {
      fveFormFieldElementObj: {},
    };
  },
  methods: {
    fveFormAddField($fieldComponent) {
      const fieldName = $fieldComponent.field.name;

      if(this.fveFormFieldElementObj[fieldName]) {
        console.warn('[FVE-FORM] Duplicate form element', fieldName,
          this.fveFormFieldElementObj[fieldName],
          $fieldComponent,
          this,
        );
      }
      this.fveFormFieldElementObj[fieldName] = $fieldComponent;

    },
    fveFormRemoveField($fieldComponent) {
      const fieldName = $fieldComponent.field.name;
      delete this.fveFormFieldElementObj[fieldName];
    },
    // formGetFieldComponentList(){
    //   let fieldComponentList = [];
    //   for(let key in this.fveFormFieldElementObj){
    //     fieldComponentList.push(this.fveFormFieldElementObj[key]);
    //   }
    //   return fieldComponentList;
    // },
    fveFormGetFieldComponentObj(){
      return this.fveFormFieldElementObj;
    },
    fveFormGetFieldComponentByFieldName(fieldName){
      return this.fveFormFieldElementObj[fieldName] || null;
    },


    // Старая регистрация компонентов
    // // Это регистрация компонента
    // formElementAdd($children){
    //   let key = getUniqueKey();
    //   // TODO: add field name group
    //   this.formElement[key] = $children;
    //   return key;
    // },
    // formElementDelete(key){
    //   delete this.formElement[key];
    // },
    // formGetFieldComponentList(){
    //   let formElementArr = [];
    //   for(let key in this.formElement){
    //     formElementArr.push(this.formElement[key])
    //   }
    //   return formElementArr;
    // },
    // setFieldErrorTemp(fieldName, errorText) {
    //   for(let key in this.formElement) {
    //     const formElement =  this.formElement[key];
    //     if(formElement.field.name === fieldName) {
    //       formElement.fieldErrorSet('ERROR', errorText, 'ERROR_CODE');
    //       return;
    //     }
    //   }
    //   console.warn('Не удалось установить ошибку для поля', fieldName, errorText, this);
    // },

    // Вторая версия реализации - только не особо понятная
    // // Это регистрация компонента
    // fveElAdd($fieldEl){
    //   const fieldName = $fieldEl.field.name;
    //   if(!this.field[fieldName]) {
    //     console.error('[FVE-FORM] Not field in schema', fieldName, $children, this);
    //     this.field[fieldName] = {};
    //   }
    //   if(this.field[fieldName].field) {
    //     console.warn('[FVE-FORM] Duplicate form element', fieldName, $children, this);
    //   }
    //
    //   // TODO: оставить только нужный набор функций
    //   this.field[fieldName].field = {
    //     ...$children,
    //     toJSON: function() {
    //       return '$FveFieldObject';
    //     }
    //   };
    // },
    // fveElDelete(fieldName){
    //   delete this.field[fieldName].field;
    // },
    // // TODO: add rename callback
    // //
    // formGetFieldComponentList(){
    //   let formElementArr = [];
    //   for(let key in this.field){
    //     if(!this.field[key] || !this.field[key].field) {
    //       continue;
    //     }
    //     formElementArr.push(this.field[key].field);
    //   }
    //   return formElementArr;
    // },
  }
};
</script>

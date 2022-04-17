<template>
  <FveTemplateField>
    <DatePicker
       :popover="{ placement: 'bottom-end', visibility: 'click' }"
        v-model="valueDatePickerComputed"

       :color="settings.DATE_PICKER_COLOR"
       :is-dark="settings.DATE_PICKER_IS_DARK"
       :is24hr="settings.DATE_PICKER_IS_24HR"
       :mode="settings.DATE_PICKER_MODE"
      >
      <template v-slot="{ inputEvents }">
        <!--
          :min-date="min && min.format(DATE_FORMAT_VIEW)"
          :max-date="max && max.format(DATE_FORMAT_VIEW)"
        -->
          <div class="fve-datepicker">
            <input
              type="text"
              class="fve-datepicker-input"
              :name="name"
              v-model="valueInputComputed"
              :placeholder="placeholderCache"
              :required="required"
              v-mask="settings.DATE_INPUT_MASK"
            />
            <svg v-on="inputEvents" xmlns="http://www.w3.org/2000/svg" class="fve-datepicker-icon"  width="19" height="21" viewBox="0 0 19 21">
              <g id="Слой_2" data-name="Слой 2">
                <g id="Слой_1-2" data-name="Слой 1">
                  <path d="M16.5,21H2.5A2.5,2.5,0,0,1,0,18.5V4.5A2.5,2.5,0,0,1,2.5,2H5V.5a.5.5,0,0,1,1,0V2h7V.5a.5.5,0,0,1,1,0V2h2.5A2.5,2.5,0,0,1,19,4.5v14A2.5,2.5,0,0,1,16.5,21ZM1,9v9.5A1.5,1.5,0,0,0,2.5,20h14A1.5,1.5,0,0,0,18,18.5V9ZM1,8H18V4.5A1.5,1.5,0,0,0,16.5,3H14V4.5a.5.5,0,0,1-1,0V3H6V4.5a.5.5,0,0,1-1,0V3H2.5A1.5,1.5,0,0,0,1,4.5Z"/>
                </g>
              </g>
            </svg>
          </div>
      </template>
    </DatePicker>
  </FveTemplateField>
</template>

<script>

import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import FveMixinField from "@fve/Mixin/FveMixinField";

import getFieldSetting from "@fve/settings";

export default {
  name: 'FveDatePicker',
  mixins: [
    FveMixinField
  ],
  components: {
    DatePicker
  },
  props: {
    value       : { type: String },
    min         : { type: String },
    max         : { type: String },
  },
  data() {
    const settings = Object.assign({
      DATE_INPUT_MASK   : '##.##.####',
      DATE_FORMAT_VIEW  : 'DD.MM.YYYY',
      //
      DATE_FORMAT_API   : 'YYYY-MM-DD',

      // settings
      DATE_PICKER_MODE    : 'date',
      DATE_PICKER_COLOR   : 'blue',
      DATE_PICKER_IS_DARK : false,
      DATE_PICKER_IS_24HR : true,
    }, getFieldSetting(this.$options.name));

    return {
      cacheStr: '',
      cacheStrFix: false,
      settings: settings,
    };
  },
  methods: {
    reset(){
      this.cacheStr = '';
      this.cacheStrFix = false;
    },
    // // для строк -> приходит строка и преобразуем в DateTime
    // prepareInput(value){
    //   return value;
    // },
    // // на выходе ожидается строка у нас DateTime
    // prepareOutput(valueDateTime){
    //   if(valueDateTime === null) { return null; }
    //   return valueDateTime;
    // },

    // для строк -> приходит строка и преобразуем в DateTime
    prepareInput(value){
      if(this.cacheStrFix) {
        this.cacheStrFix = false;
        return null;
      }

      this.cacheStr = '';
      let date = DateTime(value, this.settings.DATE_FORMAT_API, true);
      if( !date.isValid() ){
        // TODO: fix placeholder prepareInput
        return null;
      }
      return date;
    },

    prepareOutput(valueDateTime){
      if(valueDateTime === null) { return ''; }
      return valueDateTime.format(this.settings.DATE_FORMAT_API);
    },





    strToDate(str, format1) {
      let date = DateTime(str, format1, true);
      if( !date.isValid() ){
        return null;
      }
      return date.toDate();
    },
    prepareDateFormat(str, format1, format2) {
      let date = DateTime(str, format1, true);
      if( !date.isValid() ){
        return str;
      }
      return date.format(format2);
    },
    prepareValue($event) {
      return $event;
    },
    isEmpty(value) {
      return !value && !this.cacheStr;
    },
    validateFunction(value) {
      if(this.cacheStr){
        return 'Некорректная дата';
      }

      const date = this.strToDate(value, this.settings.DATE_FORMAT_API);
      return date ?  'SUCCESS' : 'Некорректная дата';
      // const d = this.valueToDate ? DateTime(this.valueToDate, DATE_FORMAT_VIEW, true) : null;
      // return d.isValid() || null ?
    },
  },
  computed: {
    placeholderCache() {
      return this.placeholder ? this.placeholder : '';
    },
    valuePrepare() {

      if(this.cacheStrFix) {
        this.cacheStrFix = false;
        return null;
      }

      this.cacheStr = '';
      let date = DateTime(value, this.settings.DATE_FORMAT_API, true);
      if( !date.isValid() ){
        // TODO: fix placeholder prepareInput
        return null;
      }
      return date;

      return this.prepareInput(this.value);
    },
    valueDatePickerComputed: {
      get() {
        return this.valuePrepare ? this.valuePrepare.toDate() : null;
      },
      set(value) {
        this.cacheStr = '';
        const valueDateTime = DateTime(value);
        this.inputFormElement( this.prepareOutput(valueDateTime) );
      }
    },
    valueInputComputed: {
      get() {
        if( this.cacheStr ) {
          return this.cacheStr;
        }
        return this.valuePrepare ? this.valuePrepare.format(this.settings.DATE_FORMAT_VIEW) : '';
      },
      set(value) {
        if( value === '') {
          this.cacheStr = '';
          this.formMessage = '';
          this.formStatus  = '';

          this.inputFormElement( this.prepareOutput(null) );
          return;
        }

        let date = DateTime(value, this.settings.DATE_FORMAT_VIEW, true);
        if( !date.isValid() ){
          debugger;
          this.cacheStr = value;
          this.cacheStrFix = true;

          this.formMessage = 'Некорректная дата';
          this.formStatus = 'ERROR';
          // this.inputFormElement( this.prepareOutput(null) );
          return;
        }

        this.cacheStr = '';
        this.formMessage = '';
        this.formStatus  = '';

        this.inputFormElement( this.prepareOutput(date) );
      }
    },
  },
};
</script>


<style lang="scss" scoped>

@import "~@fve/style/inputText.scss";

input[readonly],
input[disabled] {
  opacity: 1;
}

// TODO: fix
.fve-datepicker {
  position: relative;
  .fve-datepicker-input {
    padding-right: 40px;
  }
  .fve-datepicker-icon {
    position: absolute;
    right: 15px;
    top: 50%;
    width: auto;
    transform: translateY(-50%);
    cursor: pointer;
    path {
      transition: fill 0.15s ease-in-out;
    }
    /*
    ховер на наведение инпута!!!!
    // TODO: fix
    &:hover {
      path {
        fill: $color-prime;
      }
    }
    */
  }

  svg, svg:focus {
    outline: none;
  }
}
</style>

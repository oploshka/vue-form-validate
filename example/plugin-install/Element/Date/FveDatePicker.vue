<template>
  <FveTemplateField>
    <DatePicker
       :popover="{ placement: 'bottom-end', visibility: 'click' }"

       :name="field.name"

       :modelValue="value.datepicker"
       @update:modelValue="datepickerValueUpdate"

       :color="view.DATE_PICKER_COLOR"
       :is-dark="view.DATE_PICKER_IS_DARK"
       :is24hr="view.DATE_PICKER_IS_24HR"
       :mode="view.DATE_PICKER_MODE"
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
              :name="field.name"
              :placeholder="placeholder"
              :readonly="true"
              :disabled="disabled"
              :value="value.input"
              :required="field.required"
              autocomplete="off"
              @input="inputValueUpdate"
              @keypress.enter.prevent="fieldFormSubmit"

              ref="input"
            />
            <!--v-mask="settings.DATE_INPUT_MASK"-->
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
import FveMixinField from "@fve/Mixin/FveMixinField";
//
import PopperDropdown from "@component/Popper/PopperDropdown";
import getWeekday from "@helper/getWeekday";
import { DatePicker } from "v-calendar";
import { isObject } from "@fve/Helper/Helper";

export default {
  name: "FveDateTimePickerViewText",
  mixins: [FveMixinField],
  components: {
    DatePicker,
  },

  computed: {
    // TODO: update
    displayedDate() {
      if (this.validate(this.value) !== null) {
        return "Please select a date";
      }

      // return this.value.datepicker?.toString();

      const date = this.convertObjectToValue(this.value);
      return `${getWeekday(date)}, ${DateTime(date).format("MMMM D h:mm A")}`;
    },
  },

  data() {
    return {
      view: {
        DATE_INPUT_MASK   : '##.##.####',
        DATE_FORMAT_VIEW  : 'DD.MM.YYYY',
        //
        // DATE_FORMAT_API   : 'YYYY-MM-DD',
        // settings
        DATE_PICKER_MODE    : 'date',
        DATE_PICKER_COLOR   : 'blue',
        DATE_PICKER_IS_DARK : false,
        DATE_PICKER_IS_24HR : true,
      }
    };
  },
  props: {
    // {start: new DateTime(), end: new DateTime() }
    modelValue: { type: Object, required: false },
    //
    // // Установочные
    // initValue: { type: String, required: false, default: null},
    // // настройки валидации - рекомендованные к реализация
    // min: { type: DateTime, required: false, default: null},
    // max: { type: DateTime, required: false, default: null},

    format: {
      type: String,
      default: "MM/DD/YY hh:mm A",
    },
  },
  methods: {
    // описываем структуру value
    // prettier-ignore
    valueSchema() {
      return {
        datepicker    : {type: Date,   default: () => { return null; } },
        input         : {type: String, default: () => {return '';    } },
      };
    },
    setTimePartValueUpdate(event, property) {
      const value = event.target.value;

      this.fieldValueUpdate({
        [property]: value,
      });
    },
    // Кликнули в дейтпикере
    datepickerValueUpdate(date) {
      if (date === null) {
        this.fieldValueUpdate({
          datepicker: null,
          input: '',
        });
        return;
      }

      let dateTime = DateTime(date);
      this.fieldValueUpdate({
        input: dateTime.format(this.view.DATE_FORMAT_VIEW),
        datepicker: date,
      });
    },

    getTimePartToString(date, partTime) {
      return date ? date[partTime]().toString() : "";
    },
    convertObjectToValue(valueObj) {
      if(!valueObj.datepicker) {
        return null
      }
      return new DateTime(valueObj.datepicker).hour(12).minute(0);
    },
    convertValueToObject(value) {
      if (value === null || !value.isValid()) {
        return {
          input: '',
          datepicker: null,
        };
      }

      // prettier-ignore
      return {
        input: value.format('DD.MM.YYYY'),
        datepicker: value.toDate()
      };
    },
    isEmpty(valueObj) {
      return valueObj.input === '';
    },
    validate(valueObj) {
      return null;
    },
    // Установить фокус на текущий элемент
    setFocus() {
      // this.$refs.input.focus();
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

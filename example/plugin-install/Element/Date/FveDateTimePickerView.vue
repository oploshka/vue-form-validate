<template>
  <!-- <FveTemplateField> -->
  <div class="chatmail-calendar">
    <div class="dtp__datepicker">
      <DatePicker
        mode="date"
        :masks="{ weekdays: 'WWW' }"
        :attributes="[{ key: 'today', dot: false, dates: new Date() }]"
        locale="en"
        timezone=""
        :modelValue="value.datepicker"
        @update:modelValue="datepickerValueUpdate"
      />
    </div>
  </div>
  <!-- </FveTemplateField> -->
</template>

<script>
import FveMixinField from "@fve/Mixin/FveMixinField";
//
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
    return {};
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
        });
        return;
      }

      // let dateTime = DateTime(date);
      this.fieldValueUpdate({
        // input: dateTime.format(this.view.DATE_FORMAT_VIEW),
        datepicker: date,
      });
    },

    getTimePartToString(date, partTime) {
      return date ? date[partTime]().toString() : "";
    },
    convertObjectToValue(valueObj) {
      return valueObj.datepicker ? new DateTime(valueObj.datepicker) : null;
    },
    convertValueToObject(value) {
      if (!isObject(value)) {
        return {
          datepicker: null,
        };
      }

      // prettier-ignore
      return {
        datepicker: value.toDate()
      };
    },
    isEmpty(valueObj) {
      return valueObj.input === "";
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
.chatmail-calendar ::v-deep(.dtp__datepicker) {
  @import "./datepicker.scss";

  .vc-container {
    width: 100%;
  }

}

</style>

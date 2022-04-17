<template>
  <!-- <FveTemplateField> -->
  <!-- Minify class name: date-time-picker —> dtp -->
  <PopperDropdown :placement="'top-start'" :distance="10">
    <span class="dtp__date">
      {{ displayedDate }}
    </span>

    <!-- :firstDayOfWeek="2" -->
    <template #popper>
      <DatePicker
        mode="date"
        :masks="{ weekdays: 'WWW' }"
        :min-date="new Date()"
        :attributes="[{ key: 'today', dot: false, dates: new Date() }]"
        locale="en"
        class="dtp__datepicker"
        timezone=""
        :modelValue="value.datepicker"
        @update:modelValue="datepickerValueUpdate"
      />
      <div class="dtp__time dtp__time--skinny">
        <input
          :value="value.startHours"
          @input="setTimePartValueUpdate($event, 'startHours')"
          type="text"
          placeholder="00"
        />
        :
        <input
          :value="value.startMinutes"
          @input="setTimePartValueUpdate($event, 'startMinutes')"
          type="text"
          placeholder="00"
        />
        —
        <input
          :value="value.endHours"
          @input="setTimePartValueUpdate($event, 'endHours')"
          type="text"
          placeholder="00"
        />
        :
        <input
          :value="value.endMinutes"
          @input="setTimePartValueUpdate($event, 'endMinutes')"
          type="text"
          placeholder="00"
        />
      </div>
    </template>
  </PopperDropdown>
  <!-- </FveTemplateField> -->
</template>

<script>
import FveMixinField from "@fve/Mixin/FveMixinField";
//
import PopperDropdown from "@component/Popper/PopperDropdown";
import getWeekday from "@helper/getWeekday";
import { DatePicker } from "v-calendar";
import { isObject } from "@fve/Helper/Helper";

export default {
  name: "FveDateTimePickerPeriodViewText",
  mixins: [FveMixinField],
  components: {
    PopperDropdown,
    DatePicker,
  },

  computed: {
    // TODO: update
    displayedDate() {
      if (this.validate(this.value) !== null) {
        return "Please select a date";
      }

      // return this.value.datepicker?.toString();

      const { start, end } = this.convertObjectToValue(this.value);
      return `${getWeekday(start)}, ${DateTime(start).format(
        "MMMM D h:mm A"
      )} — ${DateTime(end).format("h:mm A")}`;
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

    // описываем структуру value
    // prettier-ignore
    valueSchema() {
      return {
        datepicker    : {type: Date,   default: () => { return null; } },
        //
        startHours    : {type: String, default: () => { return ''; } },
        startMinutes  : {type: String, default: () => { return ''; } },
        //
        endHours      : {type: String, default: () => { return ''; } },
        endMinutes    : {type: String, default: () => { return ''; } },
        //
        // startDateTime: {},
        // endDateTime: {},
      }
    },
    getTimePartToString(date, partTime) {
      return date ? date[partTime]().toString() : "";
    },
    convertObjectToValue(valueObj) {

      // prettier-ignore
      const { startHours, startMinutes, endHours, endMinutes, datepicker } = valueObj;

      const start = new DateTime(datepicker)
        .hour(parseInt(startHours))
        .minute(parseInt(startMinutes));

      const end = new DateTime(datepicker)
        .hour(parseInt(endHours))
        .minute(parseInt(endMinutes));

      return { start, end };
    },
    convertValueToObject(value) {

      if (!isObject(value)) {
        return {
          startHours: "",
          startMinutes: "",
          endHours: "",
          endMinutes: "",
          datepicker: null,
        };
      }
      const { start, end } = value;
      // prettier-ignore
      return {
        startHours:   this.getTimePartToString(start, "hour"),
        startMinutes: this.getTimePartToString(start, "minute"),
        endHours:     this.getTimePartToString(end, "hour"),
        endMinutes:   this.getTimePartToString(end, "minute"),
        datepicker:   start ? start.toDate() : null,
      };
    },
    isEmpty(valueObj) {
      return valueObj.input === "";
    },
    validate(valueObj) {
      // prettier-ignore
      const { startHours, startMinutes, endHours, endMinutes, datepicker } = valueObj;

      const isValidStringTimePart = (value, maxValue = 24) => {
        let valueInt = parseInt(value);
        return !isNaN(valueInt) && valueInt < maxValue && valueInt >= 0;
      };

      // prettier-ignore
      const error = { status: "ERROR", code: "VALIDATE", message: "Not correct" };

      if (!isValidStringTimePart(startHours, 24)) {
        return error;
      }
      if (!isValidStringTimePart(startMinutes, 60)) {
        return error;
      }
      if (!isValidStringTimePart(endHours, 24)) {
        return error;
      }
      if (!isValidStringTimePart(endMinutes, 60)) {
        return error;
      }

      return null;
    },
    // Установить фокус на текущий элемент
    setFocus() {
      // this.$refs.input.focus();
    },
  },
};

/*
export default {
  data() {
    return {
      date: "",
      // Start
      hours1: "",
      minutes1: "",
      // End
      hours2: "",
      minutes2: "",
    };
  },
  watch: {
    prepareDate: {
      handler: function (date) {
        this.$emit("update:modelValue", date);
      },
      deep: true,
    },
    modelValue(current, previous) {
      if (current && current !== previous) {
        this.parseDate();
      }
    },
  },
  computed: {
    prepareDate() {
      if (this.isTimeRange) {
        const { date, hours1, hours2, minutes1, minutes2 } = this;
        const start = this.onPrepareDate(date, hours1, minutes1);
        const end = this.onPrepareDate(date, hours2, minutes2);
        return start && end
          ? {
              start,
              end,
            }
          : "";
      }
      const date = this.onPrepareDate(this.date, this.hours1, this.minutes1);
      return date;
    },
  },
  mounted() {
    this.parseDate();
  },
  methods: {
    onPrepareDate(date, hours, minutes) {
      date = DateTime(date);

      // Сброс времени после выбора даты через Datepicker
      date = date.set("hour", 0).set("minute", 0).set("second", 0);

      if (hours) date = date.set("hour", parseInt(hours));
      if (minutes) date = date.set("minute", parseInt(minutes));

      return date.isValid() ? date.utc().format() : "";
    },
    parseDate() {
      // return;

      const partTimeToString = (date, partTime) => {
        date = DateTime(date);
        return String(date.get(partTime)).padStart(2, "0");
      };

      if (this.isTimeRange) {
        const { start, end } = this.modelValue;
        this.date = start;

        this.hours1 = partTimeToString(start, "hour");
        this.minutes1 = partTimeToString(start, "minute");

        this.hours2 = partTimeToString(end, "hour");
        this.minutes2 = partTimeToString(end, "minute");
      } else {
        this.date = this.modelValue;
        this.hours1 = partTimeToString(start, "hour");
        this.minutes1 = partTimeToString(start, "minute");
      }
    },
    resetDate() {
      this.date = "";
      this.hours1 = "";
      this.hours2 = "";
      this.minutes1 = "";
      this.minutes2 = "";
    },
  },
};
*/
</script>

<style lang="scss" scoped>
.dtp__date {
  cursor: pointer;
}
.dtp__link {
  display: flex;
  align-items: center;
  svg {
    cursor: pointer;
    @include icon-size(1.5);
    fill: var(--color-secondary-light);
  }
}
.dtp__link a {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-gap: 0 8px;
  line-height: 150%;
  text-decoration: underline;
  color: var(--color-secondary-light);
}

.dtp__datepicker {
  --rounded-full: 8px;
  --blue-600: var(--color-secondary);
  --gray-900: var(--color-gray-06);
  // box-shadow: 6px 20px 36px rgba(6, 18, 55, 0.04);
  border: 0;
  ::v-deep(.vc-title) {
    font-size: 0.875rem;
    font-weight: normal;
    font-family: var(--font-family);
  }
  ::v-deep(.vc-weekday) {
    color: var(--color-gray-06);
    font-weight: 400;
    text-transform: uppercase;
    font-size: 0.625rem;
  }
  ::v-deep(.vc-day-content) {
    font-size: 0.875rem;
  }
}

.dtp__time {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0 8px;
  justify-content: center;
  align-items: center;
  padding: 24px 0;
  color: var(--color-secondary-light);
  background-color: #fff;
  border-top: 1px solid var(--color-gray-02);
  input {
    width: 54px;
    height: 34px;
    border: 1px solid var(--color-secondary-light);
    border-radius: 8px;
    text-align: center;
    &::placeholder {
      color: var(--color-secondary-light);
    }
  }
  &--skinny {
    input {
      width: 38px;
    }
  }
}
</style>

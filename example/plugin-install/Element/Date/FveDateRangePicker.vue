<template>
  <!-- <FveTemplateField> -->
  <!-- Minify class name: date-time-picker —> dtp -->
<!--  <div :class="$parent.formElementBlockClass">-->
  <PopperDropdown :placement="'top-start'" :distance="10">

    <template v-if="error && error.message">
      <div :class="{['fve-status__' + this.error.status.toLowerCase()] : true}">
        <div class="fve-message">{{ error.message}}</div>
      </div>
    </template>

    <template v-else>
      <span class="dtp__date">{{ displayedDate }}</span>
    </template>

    <!-- :firstDayOfWeek="2" -->
    <template #popper>
      <DatePicker
          mode="range"
          :masks="{ weekdays: 'WWW' }"
          :attributes="[{ key: 'today', dot: false, dates: new Date() }]"
          locale="en"
          class="dtp__datepicker"
          timezone=""
          is-range
          :modelValue="value.period"
          @update:modelValue="datepickerValueUpdate"
      />
      <div class="dtp__time-wrapper">
        <span>Event duration</span>
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
  name: "FveDateRangePicker",
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
      const { startDate, endDate } = this.convertObjectToValue(this.value);
      return `${startDate.format('D MMM')} — ${endDate.format('D MMM')},
              ${startDate.format("h:mm A")} — ${endDate.format("h:mm A")}`;
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
          period: {
            start: null,
            end: null
          },
        });
        return;
      }

      // let dateTime = DateTime(date);
      this.fieldValueUpdate({
        // input: dateTime.format(this.view.DATE_FORMAT_VIEW),
        period: date,
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
      const { startDate, endDate } = value;
      // prettier-ignore
      return {
        startHours:   this.getTimePartToString(startDate, "hour"),
        startMinutes: this.getTimePartToString(startDate, "minute"),
        endHours:     this.getTimePartToString(endDate, "hour"),
        endMinutes:   this.getTimePartToString(endDate, "minute"),
        // datepicker:   start ? start.toDate() : null,
        period: {
          start: value.startDate ? value.startDate.toDate() : null,
          end:   value.endDate ? value.endDate.toDate() : null,
        }
      };
    },
    convertObjectToValue(valueObj) {
      // prettier-ignore
      const { startHours, startMinutes, endHours, endMinutes, period } = valueObj;

      const isValidStringTimePart = (value, maxValue = 24) => {
        let valueInt = parseInt(value);
        return !isNaN(valueInt) && valueInt < maxValue && valueInt >= 0;
      };

      if (!isValidStringTimePart(startHours, 24)) {
        return undefined;
      }
      if (!isValidStringTimePart(startMinutes, 60)) {
        return undefined;
      }
      if (!isValidStringTimePart(endHours, 24)) {
        return undefined;
      }
      if (!isValidStringTimePart(endMinutes, 60)) {
        return undefined;
      }

      if (period.start === null) {
        return undefined;
      }

      if (period.end === null) {
        return undefined;
      }

      const start = new DateTime(period.start)
          .hour(parseInt(startHours))
          .minute(parseInt(startMinutes));

      const end = new DateTime(period.end)
          .hour(parseInt(endHours))
          .minute(parseInt(endMinutes));

      return { startDate: start, endDate: end };
    },
    isEmpty(valueObj) {
      const { startHours, startMinutes, endHours, endMinutes, datepicker } = valueObj;

      if (startHours === '' && startMinutes === '' && endHours === '' && endMinutes === '') {
        if (datepicker === null || typeof datepicker === 'undefined') {
          return true;
        }
      }
      return false;
    },

    validate(valueObj) {
      // prettier-ignore
      const { startHours, startMinutes, endHours, endMinutes, datepicker } = valueObj;

      const isValidStringTimePart = (value, maxValue = 24) => {
        let valueInt = parseInt(value);
        return !isNaN(valueInt) && valueInt < maxValue && valueInt >= 0;
      };

      // prettier-ignore
      const error = { status: "ERROR", code: "VALIDATE", message: "Not correct time" };

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

.dtp__time-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 0;
  color: var(--color-secondary-light);
  background-color: #fff;
  border-top: 1px solid var(--color-gray-02);
}

.dtp__time {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0 8px;
  justify-content: center;
  align-items: center;
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

.fve-status__error {
  color: var(--fve-color-error);
}

</style>

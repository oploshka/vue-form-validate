<template>
  <!-- <FveTemplateField> -->
  <!-- Minify class name: date-time-picker —> dtp -->
  <PopperDropdown :placement="'top-start'" :distance="10">
    <div class="dtp__date">
      <slot
        :date="convertObjectToValue(this.value)"
        :validate="validate(this.value)"
      >
        {{ displayedDate }}
      </slot>
    </div>

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
      <div class="dtp__time">
        <input
          :value="value.hours"
          @input="setTimePartValueUpdate($event, 'hours')"
          type="text"
          placeholder="00"
        />
        :
        <input
          :value="value.minutes"
          @input="setTimePartValueUpdate($event, 'minutes')"
          type="text"
          placeholder="00"
        />
      </div>
    </template>
  </PopperDropdown>
  <!-- </FveTemplateField> -->
</template>

<script>
import FveMixinField from "vue-form-element/src/Mixin/FveMixinField";
//
import PopperDropdown from "@component/Popper/PopperDropdown";
import getWeekday from "@helper/getWeekday";
import { DatePicker } from "v-calendar";
import { isObject } from "@fve/Helper/Helper";

export default {
  name: "FveDateTimePickerViewText",
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
        //
        hours    : {type: String, default: () => { return ''; } },
        minutes  : {type: String, default: () => { return ''; } },
        // startDateTime: {},
        // endDateTime: {},
      }
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
      // prettier-ignore
      const { hours, minutes, datepicker } = valueObj;

      const date = new DateTime(datepicker)
        .hour(parseInt(hours))
        .minute(parseInt(minutes));

      return date;
    },
    convertValueToObject(value) {
      if (!isObject(value)) {
        return {
          hours: "",
          minutes: "",
          datepicker: null,
        };
      }

      // prettier-ignore
      return {
        hours:   this.getTimePartToString(value, "hour"),
        minutes: this.getTimePartToString(value, "minute"),
        datepicker: value.toDate()
      };
    },
    isEmpty(valueObj) {
      return valueObj.input === "";
    },
    validate(valueObj) {
      // prettier-ignore
      const { hours, minutes } = valueObj;

      const isValidStringTimePart = (value, maxValue = 24) => {
        let valueInt = parseInt(value);
        return !isNaN(valueInt) && valueInt < maxValue && valueInt >= 0;
      };

      // prettier-ignore
      const error = { status: "ERROR", code: "VALIDATE", message: "Not correct" };

      if (!isValidStringTimePart(hours, 24)) {
        return error;
      }
      if (!isValidStringTimePart(minutes, 60)) {
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
::v-deep(.email-create__dtp) {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-gap: 0 8px;
  line-height: 150%;
  text-decoration: underline;
  color: var(--color-secondary-light);
  svg {
    cursor: pointer;
    @include icon-size(1.5);
    fill: var(--color-secondary-light);
  }
}
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

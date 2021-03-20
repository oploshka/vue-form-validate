<template>
  <div :class="['form-radio', { newClass : newClass }, disabled ? 'form-radio--disabled' : '', ]">
    <div class="form-radio-bl">
      <input
        :id="id"
        class="form-radio-input"
        :type="type"
        :value="value"
        :name="name"
        :disabled="disabled"
        :checked="checked"
      />
      <div class="form-radio-vue"></div>
    </div>
    <label class="form-radio-label" :for="id">
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Number, String],
      default: ''
    },
    id: {
      type: [Number, String],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    newClass: {
      type: String,
      default: ''
    },
    checked: {
      type: Boolean,
      default: false,
    }
  },
};
</script>

<style lang="scss" scoped>
.form-radio-bl {
  position: relative;
  .form-radio-input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 2;
  }
  .form-radio-vue {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    &:before {
      content: "";
      width: 10px;
      height: 10px;
      background-color: rgba(255,255,255,0);
    }
  }
  .form-radio-input:checked + .form-radio-vue {
    &:before {
      background-color: $color-prime;
    }
  }
}

.form-radio {
  &--disabled {
    .form-radio-vue {
      border-color: gray;
    }
  }
}
</style>

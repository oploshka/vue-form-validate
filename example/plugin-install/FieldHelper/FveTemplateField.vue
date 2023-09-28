<template>
  <div :class="formElementBlockClass">
    <slot
      name="label"
      :field="parentField"
    >
      <label :for="fieldName" v-if="label" class="fve-label">
        {{ label }}
        <span v-if="required" class="fve-label-require">*</span>
      </label>
    </slot>
    <div class="fve-field">
      <div class="fve-control">
        <!-- custom block start -->
        <div class="fve-prepend-icon"><slot name="prepend-icon"></slot></div>
        <slot />
        <!-- custom block end -->
      </div>
      <template v-if="caption && !($parent.error && $parent.error.message)">
        <div class="fve-caption">{{ caption }}</div>
      </template>

      <div v-if="$parent.error && $parent.error.message" class="fve-message">
        {{ $parent.error.message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    parentField() {
      return this.$parent.field;
    },
    label() { return this.parentField.label; },
    caption() { return this.parentField.caption; },
    fieldName() { return this.parentField.name; },
    required() { return !!this.parentField.required; },

    formElementBlockClass() {
      let status = 'fve-status__success';
      if(this.$parent.error?.status) {
        status = 'fve-status__' + this.$parent.error.status.toLowerCase();
      }
      return {
        'form-validate-element': true,
        fve: true,
        ['fve-field__' + this.parentField.name]: true,
        ['fve-theme__' + this.parentField.theme]: !!this.parentField.theme,
        [status]: true,
        'fve-readonly': !!this.parentField.readonly,
        'fve-disabled': !!this.parentField.disabled,
        'fve-require': !!this.parentField.required,
      };
    },
  }
};
</script>

<style lang="scss" scoped>
.fve {
  box-sizing: border-box;

  // base
  display: block;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
  color: #2c3242;
  font-size: 16px;
  line-height: 1.3;

  // label
  ::v-deep(.fve-label) {
    display: var(--fve-label--display);
    margin: var(--fve-label--margin);
    padding: var(--fve-label--padding);
    width: var(--fve-label--width);
    height: var(--fve-label--height);
    font-family: var(--fve-label--font-family);
    font-size: var(--fve-label--font-size);
    font-weight: var(--fve-label--font-weight);
    color: var(--fve-label--font-color);
    line-height: var(--fve-label--line-height);
    border: var(--fve-label--border);
    border-color: var(--fve-label--border-color);
    border-radius: var(--fve-label--border-radius);
    background: var(--fve-label--background);
    background-color: var(--fve-label--background-color);
    transition: color 0.15s ease-in-out;
  }
  ::v-deep(.fve-label-require) {
    display: none;
  }
  &.fve-require ::v-deep(.fve-label-require) {
    display: inline-block;
    margin: 0;
    padding: 0;
    color: var(--color-red-03);
    font-size: 14px;
    line-height: inherit;
  }

  // field
  .fve-field {
    position: relative;
  }

  .fve-caption {
    position: absolute;
    display: var(--fve-caption--display);
    margin: var(--fve-caption--margin);
    padding: var(--fve-caption--padding);
    width: var(--fve-caption--width);
    height: var(--fve-caption--height);
    font-family: var(--fve-caption--font-family);
    font-size: var(--fve-caption--font-size);
    font-weight: var(--fve-caption--font-weight);
    color: var(--fve-caption--font-color);
    line-height: var(--fve-caption--line-height);
    border: var(--fve-caption--border);
    border-color: var(--fve-caption--border-color);
    border-radius: var(--fve-caption--border-radius);
    background: var(--fve-caption--background);
    background-color: var(--fve-caption--background-color);
  }

  // TODO: допилить блок message (warning, error, success)
  // message
  .fve-message {
    position: absolute;
    font-size: 0.75rem;
    border-radius: 4px;
    margin-top: 4px;
    transform: translateY(10px);
    transition: all 0.25s ease-in-out;
    opacity: 0;
    visibility: hidden;
    color: var(--color-red-06);
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    overflow: hidden;
    &:after {
      content: '';
      position: absolute;
      right: 10px;
      top: 100%;
      display: none;
      //border: 6px solid transparent;
      //border-top: 6px solid #ffb3b3;
    }
  }
}
.fve.fve-require {
  // label
  //.fve-label {
  //  color: #f5ac1c;
  //}
}

.fve-prepend-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 0 0 12px;
  ::v-deep(svg) {
    display: block;
  }
}

.fve.fve-status__error {
  .fve-label {
    // color: var(--fve-color-error);
  }
  .fve-message {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    color: var(--fve-color-error);
  }

  .fve-input,
  .fve-textarea,
  .fve-select {
    .fve-control {
      border-color: var(--fve-color-error);
    }
  }

  .fve-checkbox {
    .fve-checkbox-vue {
      border-color: var(--fve-color-error);
    }
  }
}
</style>

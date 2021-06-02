<template>
  <div class="fve-checkbox">
    <input
      v-show="false"
      ref="input"
      :id="id"
      type="checkbox"
      :checked="checked"
      @change="updateValue($event.target.checked)"
      :disabled="disabled"
    >
    <div class="fve-checkmark" @click.prevent="$refs.input.click()">
      <svg v-show="state" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 215 215" fill="#97A2AC">
        <path d="M74.551,193.448L0,118.896l33.136-33.135l41.415,41.415L181.02,20.707l33.135,33.136L74.551,193.448z" />
      </svg>
    </div>
    <label :for="id" class="fve-checkbox__label" v-if="label">
      <span class="fve-checkbox__label-text">{{ label }}</span>
    </label>
    <label :for="id" v-if="$slots['label']" class="fve-checkbox__label">
      <slot name="label"></slot>
    </label>
  </div>
</template>

<script>
  export default {
    props: ['name', 'label', 'checked', 'disabled'],
    model: {
      prop:'checked',
      event:'change'
    },
    data () {
      return {
        id: null,
        state: null
      };
    },
    methods: {
      updateValue(e) {
        this.state = e;
        this.$emit('change', e);
      }
    },
    mounted() {
      this.id = this._uid;
      this.state = this.checked;
    }
  };
</script>

<style scoped lang="scss">
  .fve-checkbox {
    display: flex;
    align-items: center;
    &__label {
      margin-left: 8px;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: normal;
      font-size: 17px;
      line-height: 20px;
      color: #FFFFFF;
      cursor: pointer;
      user-select: none;
    }
  }
  .fve-checkmark {
    width: 18px;
    height: 18px;
    display: inline-block;
    border: 1px solid #97A2AC;
    box-sizing: border-box;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    svg {
      fill: var(--color-prime);
    }
  }
</style>

<template>
  <div :class="$parent.formElementBlockClass">
    <div class="fve-field">
      <div class="fve-control">
        <!-- custom block start -->
        <slot />
        <!-- custom block end -->

        <label v-if="$parent.label" class="fve-label">
          {{ $parent.label }}
          <span v-if="$parent.fieldRequired" class="fve-label-require">*</span>
        </label>
      </div>
      <div v-if="$parent.caption && !($parent.error && $parent.error.message)" class="fve-caption">{{$parent.caption}}</div>
      <div v-if="$parent.error && $parent.error.message" class="fve-message">{{$parent.error.message}}</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>

.fve {
  
  box-sizing: border-box;
  
  // base
  display     : block;
  margin      : 0 0 0 0;
  padding     : 0 0 0 0;
  color       : #2C3242;
  font-size   : 16px;
  line-height : 1.3;
  
  // label
  .fve-label {
    display           : var(--fve-label--display          );
    margin            : var(--fve-label--margin           );
    padding           : var(--fve-label--padding          );
    width             : var(--fve-label--width            );
    height            : var(--fve-label--height           );
    font-family       : var(--fve-label--font-family      );
    font-size         : var(--fve-label--font-size        );
    font-weight       : var(--fve-label--font-weight      );
    color             : var(--fve-label--font-color       );
    line-height       : var(--fve-label--line-height      );
    border            : var(--fve-label--border           );
    border-color      : var(--fve-label--border-color     );
    border-radius     : var(--fve-label--border-radius    );
    background        : var(--fve-label--background       );
    background-color  : var(--fve-label--background-color );
    transition: color 0.15s ease-in-out;
  }
  .fve-label-require {
    display: none;
  }
  &.fve-require .fve-label-require {
    display     : inline-block;
    margin      : 0;
    padding     : 0;
    color       : var(--color-red-03);
    font-size   : 14px;
    line-height : inherit;
  }
  
  // field
  .fve-field {
    position: relative;
  }
  
  .fve-caption {
    position:         absolute;
    display           : var(--fve-caption--display          );
    margin            : var(--fve-caption--margin           );
    padding           : var(--fve-caption--padding          );
    width             : var(--fve-caption--width            );
    height            : var(--fve-caption--height           );
    font-family       : var(--fve-caption--font-family      );
    font-size         : var(--fve-caption--font-size        );
    font-weight       : var(--fve-caption--font-weight      );
    color             : var(--fve-caption--font-color       );
    line-height       : var(--fve-caption--line-height      );
    border            : var(--fve-caption--border           );
    border-color      : var(--fve-caption--border-color     );
    border-radius     : var(--fve-caption--border-radius    );
    background        : var(--fve-caption--background       );
    background-color  : var(--fve-caption--background-color );
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
    &:after {
      content: "";
      position: absolute;
      right: 10px;
      top: 100%;
      display: none;
      //border: 6px solid transparent;
      //border-top: 6px solid #ffb3b3;
    }
  }
}

</style>

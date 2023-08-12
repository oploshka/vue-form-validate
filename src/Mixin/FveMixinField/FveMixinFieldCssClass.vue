<script>

export default {
  name: 'FveMixinFieldCssClass',
  computed: {
    formElementBlockClass() {
      return {
        'form-validate-element': true,
        fve: true,
        ['fve-field__' + this.field.name]: true,
        ['fve-theme__' + this.field.theme]: !!this.field.theme,
        ['fve-status__' + this.error.status.toLowerCase()]: true,
        'fve-readonly': !!this.field.readonly,
        'fve-disabled': !!this.field.disabled,
        'fve-require': !!this.field.required,
      };
    },
  },
};
</script>

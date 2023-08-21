<script>

export default {
  name: 'FvePartFieldCssClass',
  computed: {
    formElementBlockClass() {
      let status = 'fve-status__success';
      if(this.error?.status) {
        status = 'fve-status__' + this.error.status.toLowerCase();
      }
      return {
        'form-validate-element': true,
        fve: true,
        ['fve-field__' + this.field.name]: true,
        ['fve-theme__' + this.field.theme]: !!this.field.theme,
        [status]: true,
        'fve-readonly': !!this.field.readonly,
        'fve-disabled': !!this.field.disabled,
        'fve-require': !!this.field.required,
      };
    },
  },
};
</script>

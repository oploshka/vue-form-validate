<script>


export default {
  name: 'FvePartFormIsChange',


  data() {
    return {
      formIsChange: false,
      formIsChangeObj: {},
    };
  },

  methods: {
    formFieldIsChangeStatusUpdate(fieldCode, changeStatus) {
      if(changeStatus) {
        this.formIsChangeObj[fieldCode] = true;
        this.formIsChange = true;
      } else {
        delete this.formIsChangeObj[fieldCode];
        for(const key in this.formIsChangeObj) { return; }
        this.formIsChange = false;
      }
    },

    // TODO add change initValue and defaultValue
    formIsChangeSetCurrentValueAndReset(formValue) {
      // fix form submit save value
      for (const key in formValue) {
        if(!this.field[key]) {
          continue;
        }
        this.field[key].initValue = formValue[key];
      }
      this.formIsChangeObj = {};
      this.formIsChange = false;
    },
  },

};
</script>

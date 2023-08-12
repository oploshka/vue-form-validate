<script>


export default {
  name: 'FveMixinFormIsChange',


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
  }

  // TODO add change initValue and defaultValue
};
</script>

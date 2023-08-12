<script>


export default {
  name: 'FveMixinFieldIsChange',


  data() {
    return {
      fieldIsChange: {
        lastStatus: false,

      },
    };
  },


  methods: {
    fieldIsChangeStatusUpdate(valueSync) {
      if(this.isEqualValue(valueSync, this.field.initValue)) {
        if(!this.fieldIsChange.lastStatus) { return; }
        this.fieldIsChange.lastStatus = false;

        this.fveParentForm?.formFieldIsChangeStatusUpdate(this.field.name, this.fieldIsChange.lastStatus);

      } else {
        if(this.fieldIsChange.lastStatus) { return; }
        this.fieldIsChange.lastStatus = true;

        this.fveParentForm?.formFieldIsChangeStatusUpdate(this.field.name, this.fieldIsChange.lastStatus);
      }
    }
  }

  // TODO add change initValue and defaultValue
};
</script>

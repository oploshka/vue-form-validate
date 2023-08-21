<script>


export default {
  name: 'FvePartFieldIsChange',


  data() {
    return {
      fveFieldIsChange: {
        lastStatus: false,

      },
    };
  },

  computed: {
    // TODO add change initValue and defaultValue
    fveFieldInitHash() {
      const storeObj = this.convertValueToFieldStorage(this.field.initValue)
      return this.convertFieldStorageToHash(storeObj);
    }
  },


  methods: {
    fieldIsChangeStatusUpdate() {
      //
      const isChange = (this.fveFieldInitHash !== this.fveFieldSyncValueHash);

      if(this.fveFieldIsChange.lastStatus === isChange) { return; }
      this.fveFieldIsChange.lastStatus = isChange;
      this.fveParentForm?.formFieldIsChangeStatusUpdate(this.field.name, isChange);
    }
  }

};
</script>

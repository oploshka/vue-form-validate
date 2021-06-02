<script>

import FveMultiSelect from "@widgetFormValidate/src/Element/MultiSelect/FveMultiSelect";

export default {
  mixins: [
    FveMultiSelect
  ],
  data() {
    return {
      searchAdd: true,
    };
  },
  methods: {
    addItem(){
      RequestManager.Reference.addClubInventory({name: this.search}).then((tagObject) => {
        this.$emit('addTag', tagObject);
      });
    }
  }
};
</script>

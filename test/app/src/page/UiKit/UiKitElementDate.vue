<script>

import UiKitMixin from './UiKitMixin';

// import FveDatePicker      from "@field/Date/FveDatePicker";
// import FveDateTimePicker  from "@field/Date/FveDateTimePicker";

export default {
  mixins: [
    UiKitMixin
  ],
  components: {},
  data() {
    return {
      componentInfoList: [
        // {name: 'FveDatePicker'    , component: FveDatePicker    , data: {} },
        // {name: 'FveDateTimePicker', component: FveDateTimePicker, data: {} },
      ],
    };
  },
  methods: {
    formSchema() {
      return {
        // FveDatePicker     : { type: String, default: () => { return ''; } },
        // FveDateTimePicker : { type: String, default: () => { return ''; } },
      };
    },
  }
};

</script>

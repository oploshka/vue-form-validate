<script>

import UiKit from '@widgetFormValidate/test/page/UiKit';


import FveSelect      from "@widgetFormValidate/src/Element/Select/FveSelect";
// TODO: import FveRadioGroup  from "@widgetFormValidate/src/Element/FveRadioGroup";
// TODO: import FveCheckbox    from "@widgetFormValidate/src/Element/FveCheckbox";

export default {
  mixins: [
    UiKit
  ],
  components: {},
  data() {
    const options = [{id: 1, name: 'Вариант 1'},{id: 2, name: 'Вариант 2'},{id: 3, name: 'Вариант 3'},{id: 4, name: 'Вариант 5'},{id: 5, name: 'Вариант 5'}];

    return {
      componentInfoList: [
        {name: 'html-select'  , component: () => import('@widgetFormValidate/src/Element/Select/FveSelect')  , data: {options: options} },
        {name: 'html-radio'   , component: () => import('@widgetFormValidate/src/Element/Select/FveHtmlRadio')  , data: {options: options} },
        {name: 'FveVueSuggestionSelect'   , component: () => import('@widgetFormValidate/src/Element/Select/FveVueSuggestionSelect')  , data: {options: options} },
      ],
    };
  },
  methods: {
    formSchema() {
      return {
        'html-select'    : { type: String    , default: () => { return ''; } },
        'html-radio'     : { type: String    , default: () => { return ''; } },
        'FveVueSuggestionSelect'     : { type: String    , default: () => { return ''; } },
      };
    },
  }
};

</script>

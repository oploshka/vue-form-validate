<script>

import UiKitMixin from './UiKitMixin';

import FveSelectValue   from '@fve/Element/Select/FveSelectValue';
import FveSelectObject  from '@fve/Element/Select/FveSelectObject';
import FveSelectLine    from '@fve/Element/Select/FveSelectLine';
import FveMultiSelectObject from '@fve/Element/MultiSelect/FveMultiSelectObject';

export default {
  mixins: [
    UiKitMixin
  ],
  components: {},
  data() {
    const options = [
      {id: 1, name: 'Число 1', q: 1},
      {id: 2, name: 'Число 2', asdasd:'asdasd'},
      {id: 'str3', name: 'Строка 3', q: 3},
      {id: 'str4', name: 'Строка 4', q: 14},
      //
      // {id: null , name: 'Вариант - null'},
      {id: false, name: 'Вариант - false', isTag: true},
      {id: true , name: 'Вариант - true'},
    ];
    const options2 = [{id: 1, name: 'Вариант 1'},{id: 2, name: 'Вариант 2', asdasd:'asdasd'}];

    return {
      componentInfoList: [
        // {name: 'multi-select-object', component: FveMultiSelectObject  , data: {'option-list': options} },
        //
        {name: 'select-object', component: FveSelectObject  , data: {'option-list': options} },
        {name: 'select-value' , component: FveSelectValue   , data: {'option-list': options, placeholder: 'Все' } },
        // {name: 'select-line'  , component: FveSelectLine    , data: {'option-list': options2} },

      ],
    };
  },
  methods: {
    formSchema() {
      return {
        'select-object'  : { type: Object    , default: () => { return {id: 3, name: 'Вариант 3'}; } },
        'select-value'   : { type: Number    , default: () => { return null; } },
        // 'select-line'    : { type: Number    , default: () => { return 1; } },
        // 'multi-select-object'  : { type: Object    , default: () => { return []; } },
      };
    },
  }
};

</script>

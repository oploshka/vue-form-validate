<script>

import {shallowRef} from 'vue';
import UiKitMixin from './UiKitMixin';

import FveText       from '@field/Text/FveText';
import FveEmail       from '@field/Text/FveEmail';
import FveLogin       from '@field/Text/FveLogin';
import FvePassword    from '@field/Text/FvePassword';
import FveTime        from '@field/Text/FveTime';
import FveUrl         from '@field/Text/FveUrl';
import FveTextarea    from "@field/Text/FveTextarea";
//
// import FveNumber      from '@field/Text/FveNumber';
// import FvePhone       from "@field/Text/FvePhone";



export default {
  mixins: [
    UiKitMixin
  ],
  data() {

    return {
      componentInfoList: [
        {name: 'text'         , component: shallowRef(FveText), data: {} },
        {name: 'textarea'     , component: shallowRef(FveTextarea)  , data: {} },
        //
        {name: 'text-email'   , component: shallowRef(FveEmail)     , data: {} },
        {name: 'text-login'   , component: shallowRef(FveLogin)     , data: {} },
        {name: 'text-password', component: shallowRef(FvePassword)  , data: {} },
        {name: 'text-time'    , component: shallowRef(FveTime)      , data: {} },
        {name: 'text-url'     , component: shallowRef(FveUrl)       , data: {} },
        //
        // {name: 'text-phone'   , component: FvePhone     , data: {} },
        // {name: 'text-number'  , component: FveNumber    , data: {} },
      ],
    };
  },
  methods: {
    formSchema() {
      return {
        text            : { type: String    , default: () => { return ''; } },
        textarea        : { type: String    , default: () => { return ''; } },
        'text-phone'    : { type: String    , default: () => { return ''; } },
        'text-email'    : { type: String    , default: () => { return ''; } },
        'text-login'    : { type: String    , default: () => { return ''; } },
        'text-number'   : { type: String    , default: () => { return ''; } },
        'text-time'     : { type: String    , default: () => { return ''; } },
        'text-password' : { type: String    , default: () => { return ''; } },
        // 'text-url'      : { type: String    , default: () => { return ''; } },
      };
    },
  }
};

</script>

<script>

import FveMixinField from './FveMixinField';
import {FT_ARRAY, FT_BOOLEAN, FT_FUNCTION, FT_STRING} from '@field/FveFieldType';

const optionGetKeyDefault   = (obj) => { return obj.id;   };
const optionGetNameDefault  = (obj) => { return obj.name; };

export default {
  name: 'FveMixinFieldSelect',
  mixins: [
    FveMixinField
  ],
  methods: {
    fieldPropertySchema(){
      return {
        initValue:    FT_STRING(null), // TODO: fix and use value type.
        name:         FT_STRING(),
        label:        FT_STRING(),
        placeholder:  FT_STRING('введите значение'),
        caption:      FT_STRING(),
        readonly:     FT_STRING(),
        disabled:     FT_STRING(),
        theme:        FT_STRING(),
        //
        model:        FT_BOOLEAN(false),
        update:       FT_FUNCTION(null),
        onUpdate:     FT_FUNCTION(null), // TODO: понять как смержить update и onUpdate

        // TODO: оптимизировать чтоб не копипастить...
        optionList:     FT_ARRAY(),
        optionGetKey:   FT_FUNCTION(optionGetKeyDefault),
        optionGetName:  FT_FUNCTION(optionGetNameDefault),
      };
    },
  }
};
</script>

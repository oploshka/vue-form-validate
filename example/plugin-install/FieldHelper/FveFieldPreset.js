
// FIELD_TYPE_STRING vs FT_STRING

import {FT_BOOLEAN} from '@field/FveFieldType';
import {GET_ACTIVE_OPTION_LIST} from '@field/FveFieldOptionList';

export const FIELD_ACTIVE_PRESET = () => {
  return { type: FT_BOOLEAN(), required: false, label: 'Статус:', placeholder: 'Статус', optionList: GET_ACTIVE_OPTION_LIST()  }
};

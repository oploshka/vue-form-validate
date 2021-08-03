
import FveTemplateField from "./Template/FveTemplateField";

const defaultFieldSettings = {
  template: FveTemplateField,
  validate: () => { },
  settings: () => { return {}; },
}

import settingsField from "./settingsObject";


let settingsInit = false;
let settingsUser = {};
const setUserSettings = (settings) => {
  if(settingsInit) {
    console.error("[plugin:fve] Duplicate form validate element settings set");
    return;
  }

  settingsUser = Object.assign({}, settings);
}

const getFieldSetting = (fieldName) => {
  settingsInit = true; // fix get settings and set new settings
  return {};
};

export default getFieldSetting;

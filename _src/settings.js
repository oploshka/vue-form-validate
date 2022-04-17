
import FveTemplateField from "./Template/FveTemplateField";

const defaultFieldSettings = {
  template: FveTemplateField,
  validate: () => { },
  settings: () => { return {}; },
}

let settingsInit = false;
let settings = {};
export function setUserSettings(s) {
  if(settingsInit) {
    console.error("[plugin:fve] Duplicate form validate element settings set");
    return;
  }
  settings = Object.assign({}, s);
}

const getFieldSetting = (fieldName) => {
  settingsInit = true; // fix get settings and set new settings
  return settings[fieldName] || {};
};

export default getFieldSetting;

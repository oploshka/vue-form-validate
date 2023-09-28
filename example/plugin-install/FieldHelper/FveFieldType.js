
// FIELD_TYPE_STRING vs FT_STRING

export const FT_STRING = (val = '') => {
  return {
    type: String,
    default() { return val; },
  };
};

export const FT_NUMBER = (val = '') => {
  return {
    type: Number,
    default() { return val; },
  };
};

export const FT_OBJECT = (val = null) => {
  return {
    type: Object,
    default() { return val; },
  };
};

export const FT_DATETIME = (val = null) => {
  return {
    type: DateTime,
    default() { return val; },
  };
};

export const FT_ARRAY = (val=[]) => {
  return {
    type: Array,
    default() { return val; },
  };
};

export const FT_BOOLEAN = (val=null) => {
  return {
    type: Boolean,
    default() { return val; },
  };
};

export const FT_FUNCTION = (val=null) => {
  return {
    type: Function,
    default() { return val; },
  };
};

export const FT_FILE = (val=null) => {
  return {
    type: FileClass,
    default() { return val; },
  };
};

export const FT_TIME_PERIOD = (val=null) => {
  return {
    type: Object,
    default() {
      return {
        startTime: val.startTime,
        endTime: val.endTime,
      };
    },
  };
};


const STATUS_WARNING = 'WARNING';
const STATUS_ERROR   = 'ERROR';

export default {
  // Text field
  FveEmail: {
    /*
    errors: {
      ERROR_EMAIL: { status: STATUS_ERROR, message: 'Проверьте корректность E-mail адреса' }
    },
    validate(value, errors) {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!re.test(value) ) {
        return errors.ERROR_EMAIL;
      }
    }
     */
  },
  //
  FveLogin    : {
    /*
    errors: {
      ERROR_LOGIN: { status: STATUS_ERROR, message: 'Длинна логина не менее 5 символов' }
    },
    validate(value, errors) {
      if( value.length < 5 ) {
        return errors.ERROR_LOGIN;
      }
    },
     */
  },
  //
  FveNumber   : {},
  FvePassword : {},
  FvePhone    : {},
  FveText     : {},
  FveTextarea : {},
  FveTime     : {},
  FveUrl      : {},
};

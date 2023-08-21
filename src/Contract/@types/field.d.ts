/**
 * @typedef FveFieldObject
 * @type {object}
 * @property {string}   name                  required: true - field name.
 * @property {boolean}  required              default: false
 *
 * @property {function} validateAdditional    default: null // не обязательное
 * @property {boolean}  validateRealtime       default: true // TODO: добавить типы валидации через объект
 *
 * @property {string}   label        { type: String, default: '' },
 * @property {string}   placeholder  { type: String, default: '' },
 * @property {string}   caption      { type: String, default: '' },
 * @property {boolean}  readonly     { type: Boolean, default: false },
 * @property {boolean}  disabled     { type: Boolean, default: false },
 * @property {string}   theme        { type: String, default: '' },
 *
 * @property {function} sync
 * @property {function} update
 *
 * @property {*} initValue
 * @property {*} min
 * @property {*} max
 *
 *
 */

// Тут дополнительные настройки для валидации
type FveFieldValidateObject = {
  validateAdditional: function
  validateRealtime: boolean,
  // min: boolean,
  // max: boolean,
};

type FveFieldObject = {
  name: string,
  
  // визуальный текст
  label?: string,
  placeholder?: string,
  caption?: string,
  theme?: string,
  
  // валидация
  required?: boolean,
  validate?: FveFieldValidateObject, // TODO: подумать, о том чтоб не создавать отдельный объект
  // validateAdditional
  // validateRealtime
  
  // TODO: определить поведение, типа - readonly отправляет данные, а disabled нет
  readonly?: boolean,
  disabled?: boolean,
  
  // пред установка значения
  initValue?: any,
  model?: boolean;
  
  // callback
  update?: function
};


/**
 *
 *   code: 'REQUIRE', status: 'ERROR',  - описать, что за что отвечает!!!
 */
type FveFieldError = {
  // TODO: code и status - объединить?
  code: string,     // 'ERROR_NO',
  status: string,   // 'SUCCESS', // SUCCESS WARNING ERROR // TODO: use const
  message: string, 
}

/**
 * @typedef FveFieldState
 * @type {object}
 * 
 * Внутренний объект поля (хранящий в себе данные)
 */
type FveFieldState = {
  [name: string]: any,
};


type FveFieldSchemaItem = {
  type: string,
  default: () => any
};

type FveFieldSchema = {
  [name: string]: FveFieldSchemaItem
}
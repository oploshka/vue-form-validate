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

//  default: () => { return { code: 'ERROR_NO', status: 'SUCCESS', message: ''}'; }

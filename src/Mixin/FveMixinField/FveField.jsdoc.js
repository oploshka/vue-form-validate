
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
 * @example ```ts
 * type FveFieldObject = {
 *   name: 'full-name',
 *
 *   //
 *   initValue: '',
 *
 *   //
 *   required: true,
 *   readonly: false,
 *   disabled: false,
 *
 *   //
 *   label: 'Полное имя',
 *   placeholder: 'Иванов И. И.',
 *   caption: 'доп. подсказка',
 *   theme: 'default',
 *
 *   //
 *   isNotSubmit: false, // Не сабмитить это поле
 *
 *   // callback
 *   sync: () => {},
 *   update: () => {},
 *
 *
 * };
 * ```
 *
 */


/**
 * @typedef FveFieldStoreObj
 * @type {Object.<string, any>}
 *
 * Внутренний объект поля хранящий в себе данные поля (данные которые влияют на submit)
 * Данный объект не должен хранить состояния поля (открыто модальное окно, поле находиться в фокусе и тп)
 *
 *
 * @example ```ts
 * type FveFieldStoreObj = {
 *   [name: string]: any,
 * };
 * ```
 */




/**
 * @typedef FveFieldSchema
 * @type {Object.<string, FveFieldSchemaItem>}
 *
 * Схема данных определяет какая структура данных будет использоваться для хранения состояния.
 * В данной схеме мы описываем объект FveFieldStoreObj.
 * Функция по большей части несет вспомогательную роль.
 * Но так же может участвовать для установки дефолтного состояния, если не задано, что-то другое.
 *
 * @example ```ts
 * type FveFieldSchema = {
 *   [name: string]: FveFieldSchemaItem
 * };
 * ```
 */

/**
 * @typedef FveFieldSchemaItem
 * @type {Object.<{ type: string, default: function }>}
 *
 * Необходимо подправить типы данных type и уточнить какая функция и что возвращаяе
 *
 * Описывает один ключ валидационной схемы
 *
 *
 * @example ```ts
 * type FveFieldSchemaItem = {
 *   type: string,
 *   default: () => any
 * };
 * ```
 */

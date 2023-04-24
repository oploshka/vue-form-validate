
/**
 * @typedef FveFieldValue
 * @type {Object.<string, any>}
 *
 * Внутренний объект поля (хранящий в себе данные и состояния поля)
 * 
 *
 * @example ```ts
 * type FveFieldValue = {
 *   [name: string]: any,
 * };
 * ```
 */




/**
 * @typedef FveFieldSchema
 * @type {Object.<string, FveFieldSchemaItem>}
 *
 * Схема данных определяет какая структура данных будет использоваться для хранения состояния.
 * В данной схеме мы описываем объект FveFieldValue.
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

# Vue Form Validate

## Что это и зачем
Данный модуль (точнее набор mixin-ов и компонентов) для Vue 2 - это набор правил для создания форм, их валидации и кастомизации. Это не панацея, но хоть какое то решение на фоне всего остального мрака.

## Как это работает
Много магии). Основано все на миксинах (используется вместо наследования) и доверии (интерфейс). В js без доверия ни как).

Все это основано на 3 базовых элементах:
- Формы (FveFormMixin.vue)
- Элементы формы (FveFieldMixin.vue и FveFieldTemplate.vue)
- TODO Группа элементов (FveMultiMixin.vue и FveMultiTemplate.vue)

## Как установить
1) В своем проекте, в папке где лежат все компоненты создаем папку FormValidate (по умолчанию будет src/components/FormValidate )
2) Рядом создать папку для FormValidateCustom для своих элементов формы (заточеных под проект)
3) В корне проекта создать vue.config.js (если его нет) и добавить 
```js
const path = require("path");

module.exports = {
  chainWebpack: (config) => {
    // WARNING - укажи путь к своей папке!!! (замени /src/components/FormValidate src на свой путь)
    config.resolve.alias.set('@FormValidate'       , path.join(__dirname, './src/components/FormValidate')   );
    config.resolve.alias.set('@FormValidateCustom' , path.join(__dirname, './src/components/FormValidateCustom')   );
  }
}
```
4) установить пакеты (не обязательно)
- "dayjs": "^1.8.36", (легкая библиотека для работы с датой, нужна для datepicker)
- "v-calendar": "^1.0.8", (необходимо для поля даты)
- "vue-phone-mask-input": "^1.1.11", (необходимо для поля телефон)

5) перезапустить сборку

## Почему не npm install?
Приходиться затачивать некоторые вещи именно под проект и сейчас нет времени сделать большую инициализацию всего этого...
Возможно когда-то это случиться и будет магия с npm i. Сейчас же это позволяет проще развивать данное решение.

# Как создать свою форму
TODO

# Как создать свой элемент формы
TODO

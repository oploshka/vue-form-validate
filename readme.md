
# Vue Dialog - показ диалоговых окон для Vue 3
Это обобщенный каркас для показа диалоговых окон, alert'ов, confirm'ов.
Есть ряд подготовленных шаблонов, но что использовать в конечном итоге решаете Вы.

Мы постарались не перегружать компоненты готовыми стилями и упростить кастомизацию,
по этой причине установка, будет чуть сложнее (чем обычно).

Отличия от других:
- Решение использует "тонкий клиент", 
  по этому вы можете работать с модальными окнами,
  до загрузки Vue App 
  (Отображение произойдет после иницализации приложения).
- Возможность задать свои алисы для модальных окон 
  (пример: alertSuccess, alertWarning, alertError)
- Мы не наслаиваем 10 модальных окон друг на друга, 
  а предлагаем отображать друг за другом, 
  в том количестве которое приемлемо вам.
- Не предлагаем вам использовать template для отображения модального окна
- Не предлагаем использовать кучу параметров,
  для задания ширины и высоты модального окна
  их адаптивности и тп. Для этого есть стили.
  

## Setup

<details>
<summary><b style="font-size: 1.3em;">Установка (слабонервным не читать)</b></summary>

### Шаг 1
```bash
yarn add vue-dlg
# Or using npm
npm install vue-dlg --save
```

### Шаг 2
Создайте папку в удобном месте для файлов настроек плагина.
Предположим "./plugin/vue-dlg". 
В этой папке создайте следующие файлы:

<details>
<summary><b style="font-size: 1.3em;">group-settings.js</b></summary>

```js
//
import {addGroupSetting} from "vue-dlg/src/DialogGroupSettings";

// задаем настройки для разных групп
addGroupSetting('modal', {
  // максимальное количество модальных окон на экране в этой группе
  maxDisplayItem: 1,
  // показывать overlay?
  overlay      : true,
});

addGroupSetting('notify', {
  maxDisplayItem: 3,
  overlay      : false,
});
```

</details>

<details>
<summary><b style="font-size: 1.3em;">action.js</b></summary>

```js
// Тонкий клиент
import DialogThinClient from 'vue-dlg/src/DialogThinClient';
// Темплейты модальных окон
import DialogBox        from "vue-dlg/src/Template/DialogBox";
import DialogNotify     from "vue-dlg/src/Template/DialogNotify";

// настраиваем список модальных окон
export default {
  open: DialogThinClient, // function (VueComponent, VueComponentProps, setting)

  alert: {
    success: (message) => {
      return DialogThinClient(
              DialogBox,
              { title: "Успешно", message: message, okLabel: 'Ok', theme: "success", },
              { group: 'modal' }
      );
    },
    warning: (message) => {
      return DialogThinClient(
              DialogBox,
              { title: "Предупреждение", message: message, okLabel: 'Ok', theme: "warning" },
              { group: 'modal' }
      );
    },
    error: (message) => {
      return DialogThinClient(
              DialogBox,
              { title: "Ошибка", message: message, okLabel: 'Ok', theme: "error" },
              { group: 'modal' }
      );
    },
  },

  confirm(message, options = {}){
    return DialogThinClient(
            DialogBox,
            {
              title: "Подтвердите действие",
              message: message,
              okLabel: (options && options.okLabel) ? options.okLabel : 'Ok',
              cancelLabel: (options && options.cancelLabel) ? options.cancelLabel : 'Отмена',
            },
            { group: 'modal' }
    );
  },

  notify: (title, message) => {
    return DialogThinClient(
            DialogNotify,
            { title: title, message: message },
            { group: 'notify' }
    );
  }
};
```

</details>

<details>
<summary><b style="font-size: 1.3em;">style.scss</b></summary>

```scss

.dlg .dlg-overlay {
  background: var(--dlg-overlay, rgba(0,0,0,0.5));
  cursor: default;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.dlg .dlg-container{
  pointer-events: none;
  & > div {
    pointer-events: all;
  }
}

.dlg .dlg-container.dlg-container-notify{
  position: fixed;
  left: 10px;
  top: 10px;
  width: 320px;
  z-index: 420;

  & > div {
    margin-bottom: 5px;
  }
  & > div:last-child {
    margin-bottom: 0px;
  }

}


.dlg .dlg-container.dlg-container-modal {

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 400;

  overflow: hidden;
  opacity: 1;

  display: flex;
  display: -ms-flexbox;
  align-items: center;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  justify-content: center;


  & > div {
    width: 100%;
    max-width: 740px;
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 20px;
  }
  & > div:last-child {
    margin-bottom: 0px;
  }
}
```

</details>

<details>
<summary><b style="font-size: 1.3em;">index.js</b></summary>

```js
// Подключаем плагин
import vueDlgPlugin from "vue-dlg/src/plugin";

// настройки модальных групп
import "./group-settings";
// задаем стили
import './style.scss';
// список настроенных действий
import dialogAction from "./action";

// опционально можно сделать глобальным
// global.DIALOG = dialogAction;

// фасад для установки плагина (чтоб не перегружать основной main.js) 
export default {
  install: (app) => {
    vueDlgPlugin.install(app, {action: dialogAction});
  },
};
```

</details>


### Шаг 3
Add dependencies to your `main.js`:
<details>
<summary><b style="font-size: 1.3em;">main.js</b></summary>

```js
import { createApp } from 'vue';
// [ADD]
import vueDlgPluginProxy from './plugin/vue-dlg'
// ...

let app = createApp(App)
// [ADD]
app.use(vueDlgPluginProxy);
// ...
app.use(router);
app.mount('#app');

```

</details>


### Шаг 4
Add the global component to your `App.vue`:

<details>
<summary><b style="font-size: 1.3em;">App.vue</b></summary>

```vue
<template>
  <DialogCore />
  <!-- -->
  <router-view />
</template>

<script>
import DialogCore from "vue-dlg/src/DialogCore";

export default {
  component: {
    DialogCore,
    // ...
  }
  // ...
}
</script>
```

</details>



</details>



## Пример использования

### Простые Alert
```js
export default {
  // vue component
  // ...
  methods: {
    showAlertSuccess() {
      this.$dialog.alert.success('Запись добавлена').then(res => {
        console.log(res) // {}
      })
    },
    showAlertWarning() {
      this.$dialog.alert.warning('Данный сервис не доступен, попробуйте через 5 минут').then(res => {
        console.log(res) // {}
      })
    },
    showAlertError() {
      this.$dialog.alert.error('Ошибка сервера').then(res => {
        console.log(res) // {}
      })
    }
  }
}
```

### Произвольный компонент в модальном окне
```js
// props: {
//   fullName: String,
//   year: Number
// },
// emit: ['save']
import ArbitraryComponent from "./ArbitraryComponent";

export default {
  mounted() {

    let modal = null;
    const closeModal = () => { modal && modal.close(); };
    const props = {
      // data
      fullName: 'Tester',
      year: 2014,
      // events (добавляем приставку on к emit: ['save'])
      onSave: (saveObj) => {
        console.log(saveObj);
        closeModal();
      },
    };
    //
    modal = this.$dialog.open(ArbitraryComponent, props, { group: "modal", theme: "community", close: true });
    modal.then(() => { modal = null; });
    
  },
};
```

### Использование дополнительной обертки
В редких случаях может понадобиться использовать дополнительную обертку для отображения компонента 
и добавления специфичной логики связанное с модальным окном.
В таком варианте вы можете дополнительно передавать функции и делать поведение более гибким.
Но не стоит этим увлекаться.

Вызов модального окна, не отличается от предыдущего примера,
а обертки могут быть на любой вкус 
(от универсальных, до заточенных под конкретный компонент).
По этой примчине мы не будем приводить пример.

## Options DialogThinClient.add

| Name              | Type               | Required | Default value   | Info                                  |
| ----------------- | ------------------ | -------- | --------------- | ------------------------------------- |
| VueComponent      | VueComponent       | Yes      |                 | Vue component that opens in a modal   |
| VueComponentProps | Object             | Yes      | {}              | Vue component props data              |
| settings          | Object             | No       | {group: "modal"}| Настройки для диалоговых окон         |




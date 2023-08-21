# Vue Form Validate

```text
Модуль находиться в процессе разработки, а документация в процессе уточнения.
```

![Пример формы](./doc/img/example.gif)

## Что это и зачем
Данный модуль - это набор правил для создания элементов форм для Vue 3, их валидации и кастомизации,
а так же объединения их в группы и формы. 
За счет такого подхода, данное решение является более гибким и масштабируемым.
Но для более дружелюбного использования, есть примеры элементов формы, которые можно использовать как есть или
кастомизировать под свои нужды.

## Как это работает
Данный подход основан на использование миксинах (используется вместо наследования).
Такой подход стандартизирует все элементы формы и позволяет общаться с ними одинаково.
И если вы захотите использовать кастомное поле с дейтипкером, то вам будет необходимо один раз написать адаптер.

Все это основано на 3 базовых элементах:
- Формы (FveMixinForm)
- Элементы формы (FveMixinField) и стандартизированный шаблон (FveTemplateField)
- (в процессе разработки) Группа элементов (FveMixinMulti и FveTemplateMulti)

## Как установить
```bash
npm i vue-fve
```


## Как упростить дальнейшее создание

Для работы полей могут потребоваться различные плагины.
Ответственность по их установке лежит на вашей стороне.

Список плагинов, которые могут быть полезны
- [Dev] sass-loader - добавляет поддержку sass/scss
- lodash - набор функций
- dayjs - легкая библиотека для работы с датой
- v-calendar - не плохой календарь
- vue-imask  - или аналоги для добавления масок


Чтоб не создавать структуру папок с нуля, могу рекомендовать
скопировать папку example/plugin-install к себе в проект в удобное место.
И настроить алиас @field для удобного обращения к полям


## Почему так сложно?
Многие компоненты приходиться затачивать под конкретный проект.
Можно сделать тысячу копий datepicker-ов, текстовых полей и других полей со всевозможными настройками,
но это оверинженеринг, которым будет сложно пользоваться и он не нужен вам в полном объеме.
И вместо того, я предлагаю отредактировать существующие элементы и написать для них адаптер.
Ответственность ложиться на вас, но вы начнете понимать за что вы отвечаете.
Отвечать вы будете не за большие формы, а за поля и их вывод в форме.
Ситуация схожа с тем, что можно вечно просить рыбу или же научиться ее ловить.
В любом случае решать вам



## Что мы получаем

Для сравнения возьмем пример vuetify работы с формой (не нужно сильно вдумываться)

<details>
<summary><b style="font-size: 1.3em;">vuetify - пример 1</b></summary>

```vue
<template>
<v-row justify="center">
  <v-card>
    <v-card-title>
      <span class="text-h5">User Profile</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Legal first name*"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Legal middle name"
              hint="example of helper text only on focus"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Legal last name*"
              hint="example of persistent helper text"
              persistent-hint
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Email*"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Password*"
              type="password"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              :items="['0-17', '18-29', '30-54', '54+']"
              label="Age*"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-autocomplete
              :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
              label="Interests"
              multiple
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-container>
      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text>Save</v-btn>
    </v-card-actions>
  </v-card>
</v-row>
</template>
```

</details>

И удивительно, но здесь чего-то не хватает. Это сбора данных по форме и ее валидации.
Возьмем другую форму...

<details>
<summary><b style="font-size: 1.3em;">vuetify - пример 2</b></summary>

```vue
<template>
  <validation-observer
    ref="observer"
    v-slot="{ invalid }"
  >
    <form @submit.prevent="submit">
      <validation-provider
        v-slot="{ errors }"
        name="Name"
        rules="required|max:10"
      >
        <v-text-field
          v-model="name"
          :counter="10"
          :error-messages="errors"
          label="Name"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="phoneNumber"
        :rules="{
          required: true,
          digits: 7,
          regex: '^(71|72|74|76|81|82|84|85|86|87|88|89)\\d{5}$'
        }"
      >
        <v-text-field
          v-model="phoneNumber"
          :counter="7"
          :error-messages="errors"
          label="Phone Number"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="email"
        rules="required|email"
      >
        <v-text-field
          v-model="email"
          :error-messages="errors"
          label="E-mail"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="select"
        rules="required"
      >
        <v-select
          v-model="select"
          :items="items"
          :error-messages="errors"
          label="Select"
          data-vv-name="select"
          required
        ></v-select>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        rules="required"
        name="checkbox"
      >
        <v-checkbox
          v-model="checkbox"
          :error-messages="errors"
          value="1"
          label="Option"
          type="checkbox"
          required
        ></v-checkbox>
      </validation-provider>

      <v-btn
        class="mr-4"
        type="submit"
        :disabled="invalid"
      >
        submit
      </v-btn>
      <v-btn @click="clear">
        clear
      </v-btn>
    </form>
  </validation-observer>
</template>

<script>
import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('digits', {
  ...digits,
  message: '{_field_} needs to be {length} digits. ({_value_})',
})

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
})

extend('regex', {
  ...regex,
  message: '{_field_} {_value_} does not match {regex}',
})

extend('email', {
  ...email,
  message: 'Email must be valid',
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    name: '',
    phoneNumber: '',
    email: '',
    select: null,
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
    ],
    checkbox: null,
  }),
  
  methods: {
    submit () {
      this.$refs.observer.validate()
    },
    clear () {
      this.name = ''
      this.phoneNumber = ''
      this.email = ''
      this.select = null
      this.checkbox = null
      this.$refs.observer.reset()
    },
  },
}
</script>
```

</details>

На первый взгляд все хорошо и привычно. Но будем честны, тут нет полноценного submit формы.
Да здесь есть валидация. Здесь нет нормального clear. И чтоб понимать общую картину - мы описали все го лишь 5 полей,
и потратили 150 строк кода. Допустимо ли это? Возможно кому-то да.

Но будем реалистами и с таким подходом форму на 20-30 полей не сваришь. Даже если оптимизировать

И давайте вернемся к нашему решению и как данный пример может выглядеть.

<details open>
<summary><b style="font-size: 1.3em;">Пример создания формы</b></summary>

```vue
<template>
  <FveForm>
    <FieldText :field="field.name"/>
    <FieldPhone :field="field.phone"/>
    <FieldEmail :field="field.email"/>
    <FieldSelect :field="field.select"/>
    <FieldCheckbox :field="field.checkbox"/>
    
    <button :disabled="formIsValid" @click="formSubmit">submit</button>
    <button :disabled="formIsChange" @click="formClear">clear</button>
  </FveForm>
</template>

<script>

// form
import FveMixinForm  from 'vue-form-element/src/Fomr/FveMixinForm'
// field
import FieldText     from '@field/FieldText';
import FieldPhone    from '@field/FieldPhone';
import FieldEmail    from '@field/FieldEmail';
import FieldSelect   from '@field/FieldSelect';
import FieldCheckbox from '@field/FieldCheckbox';
//
import {FT_STRING, FT_BOOLEAN} from '@field/type';

export default {
  components: {
    FieldText,
    FieldPhone,
    FieldEmail,
    FieldSelect,
    FieldCheckbox,
  },
  mixins: [ FveMixinForm ],
  
  data: () => ({
    items: [ 'Item 1', 'Item 2', 'Item 3', 'Item 4',],
  }),
  
  methods: {
    formSchema() {
      return {
        name:     { type: FT_STRING(),  label: 'Name',   required: true },
        phone:    { type: FT_STRING(),  label: 'Phone',  required: true },
        email:    { type: FT_STRING(),  label: 'E-mail', required: true },
        select:   { type: FT_STRING(),  label: 'Select', required: true, optionList: this.items },
        checkbox: { type: FT_BOOLEAN(), label: 'Option', required: true },
      }
    }
  },
}
</script>
```

</details>


Данный пример занимает 50 строк кода, примерно 20 из них это базовая конструкция компонента.
Говорить, что все будет идеально и на добавление одного поля будет уходить 3-4 строчки,
это не верно, в реальной жизни это ~10 строчек кода (вместе с логикой).
Отдельно стоит упомянуть о возможности дробить компонент на части, чего трудно приставить при использовании других решений.

Как можем понять из данного примера - валидация ушла в поля. И дальше мы рассмотрим пример создания своего поля


<details open>
<summary><b style="font-size: 1.3em;">Пример создания простого текстового поля</b></summary>

```vue
<template>
  <div>
    <label>{{field.label}}</label>
    <input
      :type="inputType"
      :name="field.name"
      :placeholder="field.placeholder || ''"
      :readonly="!!field.readonly"
      :disabled="!!field.disabled"
      :value="value.input"
      :required="field.required"
      autocomplete="off"
      @input="inputValueUpdate"
      @keypress.enter.prevent="fieldFormSubmit"
      v-bind="inputAttr"

      ref="input"
    />
  </div>
</template>

<script>

import FveMixinField from 'vue-form-element/src/Field/FveMixinField';

export default {
  name: 'FieldText',
  mixins: [ FveMixinField ],
  data(){
    return {
      inputType: 'text',
      inputAttr: {},
    };
  },
  props: {
    modelValue    : { type: String, required: false },
  },
  methods: {
    // пользовательские действия
    inputValueUpdate($event) {
      this.fieldStoreUpdate({input: $event.target.value});
    },
    // описываем структуру value
    valueSchema() {
      return {
        input: {type: String, default: () => { return ''; } }
      };
    },
    isEmpty(valueObj) {
      return valueObj.input === '' || valueObj.input === null || valueObj.input === undefined;
    },
    validate(valueObj) {
      return null;
    },
    // Установить фокус на текущий элемент
    setFocus(){
      this.$refs.input.focus();
    },
  },
};
</script>

```

</details>




<details open>
<summary><b style="font-size: 1.3em;">Пример создания поля email</b></summary>

```vue
<script>
// Наследуемся от классического поля
import FieldText from '@field/FieldText';

export default {
  name: 'FieldEmail',
  mixins: [FieldText],
  data() {
    return {
      inputType: 'email',
    };
  },
  methods: {
    validate(valueObj) {
      const re =
        /^(([^а-яА-Я<>()[\]\\.,;:\s@\"]+(\.[^а-яА-Я<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(valueObj.input)) {
        return {
          status: 'ERROR',
          code: 'VALIDATE',
          message: 'Проверьте корректность E-mail адреса',
        };
      }
      return null;
    },
  },
};
</script>
```

</details>


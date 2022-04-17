<template>
  <form @submit="formSubmit"  @submit.prevent="formSubmit">

    <fieldset class="mb-5">
      <legend>Аватар</legend>
      <div style="width: 120px;">
        <FveImagePreview
            label="Аватар"
            name="avatar"
            required
            :field="field.avatar"
        />
      </div>
      
    </fieldset>

    <fieldset class="mb-5">
      <legend>Данные для входа</legend>
      <FvePhone
        label="Номер телефона"
        name="phone"
        required
        :field="field.phone"
      />
      <FveEmail
        label="E-mail"
        name="email"
        :field="field.email"
      />
      <FveLogin
        label="login"
        name="login"
        :field="field.login"
      />
    </fieldset>

    <fieldset class="mb-5">
      <legend>Личные данные</legend>
      <!--<FveFileImageCropperPreview-->
      <!--  label=""-->
      <!--  name="avatar"-->
      <!--  :field="field.avatar"-->
      <!--/>-->
      <FveText
        label="ФИО"
        name="name"
        required
        :field="field.fio"
      />
      <!--<FveDatePicker-->
      <!--  label="Дата рождения"-->
      <!--  name="birthday"-->
      <!--  :field="field.birthday"-->
      <!--/>-->
      <FveTextarea
        label="О себе"
        name="about"
        :field="field.about"
      />
    </fieldset>
  </form>
</template>

<script>

import FveMixinForm    from 'vue-form-element/src/Mixin/FveMixinForm';

import FveText          from "@field/Text/FveText";
import FveEmail         from '@field/Text/FveEmail';
import FveLogin         from "@field/Text/FveLogin";
import FvePassword      from '@field/Text/FvePasswordShowPass';
import FveTextarea      from '@field/Text/FveTextarea';
import FveImagePreview      from '@field/File/FveImagePreview';
// import FveDatePicker    from '@field/Date/FveDatePicker';

export default {
  name: "UserProfileForm",
  mixins: [
    FveMixinForm
  ],
  components: {
    FveText,
    FveLogin,
    FveEmail,
    FvePassword,
    FveTextarea,
    FveImagePreview,
    // FveDatePicker,
  },
  methods: {
    formSchema() {
      return {
        avatar          : { type: FileClass, default: () => { return null; }, field: {required: true } },
        //
        phone           : { type: String,   default: () => { return ''; }, field: {required: true } },
        email           : { type: String,   default: () => { return ''; } },
        login           : { type: String,   default: () => { return ''; } },
        //
        fio             : { type: String,   default: () => { return ''; } },
        // birthday        : { type: DateTime, default: () => { return null; } },
        about           : { type: String,   default: () => { return ''; } },
      };
    },
  }
  
};


</script>

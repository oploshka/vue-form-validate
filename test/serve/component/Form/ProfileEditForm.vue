<template>
  <form @submit="formSubmit"  @submit.prevent="formSubmit">

    <fieldset class="mb-5">
      <legend>Аватар</legend>
      <FveImagePreview
        label="Аватар"
        name="avatar"
        required
        v-model="form.avatar"
      />
    </fieldset>

    <fieldset class="mb-5">
      <legend>Данные для входа</legend>
      <FvePhone
        label="Номер телефона"
        name="phone"
        required
        v-model="form.phone"
      />
      <FveEmail
        label="E-mail"
        name="email"
        v-model="form.email"
      />
      <FveLogin
        label="login"
        name="login"
        v-model="form.login"
      />
    </fieldset>

    <fieldset class="mb-5">
      <legend>Личные данные</legend>
      <!--<FveFileImageCropperPreview-->
      <!--  label=""-->
      <!--  name="avatar"-->
      <!--  v-model="form.avatar"-->
      <!--/>-->
      <FveText
        label="ФИО"
        name="name"
        required
        v-model="form.fio"
      />
      <FveDatePicker
        label="Дата рождения"
        name="birthday"
        v-model="form.birthday"
      />
      <FveTextarea
        label="О себе"
        name="about"
        v-model="form.about"
      />
    </fieldset>
  </form>
</template>

<script>


//
import FveMixinForm   from "@fve/Mixin/FveMixinForm";
//
import FveImagePreview from "@fve/Element/File/FveImagePreview";

import FvePhone       from "@fve/Element/Text/FvePhone";
import FveEmail       from "@fve/Element/Text/FveEmail";
import FveLogin       from "@fve/Element/Text/FveLogin";
import FveText        from "@fve/Element/Text/FveText";
import FveTextarea    from "@fve/Element/Text/FveTextarea";
import FveDatePicker  from "@fve/Element/Date/FveDatePicker";

// import FvePassword          from "@fve/Element/Text/FvePassword";
// import FveFileImagePreview  from "@fve/Element/Text/FveFileImagePreview";


export default {
  mixins: [
    FveMixinForm
  ],
  components: {
    FveImagePreview,
    //
    FvePhone,
    FveEmail,
    FveLogin,
    FveText,
    FveTextarea,
    FveDatePicker,
  },
  data(){
    return {
      tagList: [],
    };
  },
  methods: {
    formSchema() {
      return {
        //
        avatar          : { type: FileClass, default: () => { return null; } },
        //
        phone           : { type: String,   default: () => { return ''; } },
        email           : { type: String,   default: () => { return ''; } },
        login           : { type: String,   default: () => { return ''; } },
        //
        fio             : { type: String,   default: () => { return ''; } },
        birthday        : { type: DateTime, default: () => { return null; } },
        about           : { type: String,   default: () => { return ''; } },
      };
    },
  },
};

</script>

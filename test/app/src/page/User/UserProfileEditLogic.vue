<template>
  <div>
    <h1>User Profile Edit</h1>
    <div>
      <UserProfileForm
          :formData="profile"
          @submit="profileFormSubmit"
      />
    </div>
  </div>
</template>

<script>

import UserProfileForm from "./Form/UserProfileForm";

export default {
  name: "UserProfileEditLogic",
  components: {
    UserProfileForm,
  },
  data() {
    return {
      profile: {
        name: 'UserName',
      }
    }
  },
  methods: {
    //
    async profileEdit(obj) {
      // Добавте вашу логику авторизации
    },
    profileFormSubmit(form) {
      console.log('Profile form success submit:', form)
      this.profileEdit(form)
    },
    
  },
};
</script>

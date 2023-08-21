<template>
  <form @submit.prevent="signInButtonPressed">
    <slot />
  </form>
</template>

<script>
export default {
  // data() {
  //   return {
  //     interface: 'FormProxyInterface'
  //   }
  // },
  methods: {
    signInButtonPressed($event) {
      // предположительно есть button без указанного типа
      console.warn('Sign In Button Pressed');
    },
  },
};
</script>

<style lang="scss" scoped>

form {
  width: 100%;
}

</style>

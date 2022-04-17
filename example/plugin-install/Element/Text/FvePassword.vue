<script>

import FveText from "@fve/Element/Text/FveText";

export default {
  name: 'FvePassword',
  mixins: [
    FveText
  ],
  data(){
    return {
      view: {
        type: 'password',
        inputAttr: {},
      },
    };
  },
  methods: {
  
    validate(valueObj) {
      const min = 6;
      if( valueObj.input.length < min ) {
        return {
          status: 'ERROR',
          code : 'VALIDATE',
          message: 'Длинна строки не менее ' + min + ' символов',
        }
      }

      // const errorText = 'Пароль от 8 символов и должен содержать 1 цифру и букву';
      // const regex = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/;
      // if(!regex.test(str)) { return errorText; }

      return null;
    },
  }
};
</script>

<style lang="scss" scoped>

@import "~$field/../style/inputText.scss";

</style>

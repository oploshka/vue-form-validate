
<script>

import FveText from '@field/Text/FveText';

export default {
  name: 'FveEmailMulti',
  mixins: [ FveText ],
  methods: {
    validate(valueObj) {

      const re =
        /^(([^а-яА-Я<>()[\]\\.,;:\s@\"]+(\.[^а-яА-Я<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const separatorComa = ',';
      const separatorSemicolon = ';';

      let resultArr = [];
      const tempStr = valueObj.input.replaceAll(separatorComa, ' ').replaceAll(separatorSemicolon, ' ');

      resultArr = tempStr.split(' ');

      if (resultArr.length > 0) {
        for (let i = 0; i < resultArr.length; i++) {
          if (resultArr[i] && !re.test(resultArr[i].trim())) {
            return {
              status: 'ERROR',
              code: 'VALIDATE',
              message: 'Проверьте корректность E-mail введенных адресов',
            };
          }
        }
      } else {
        if (!re.test(valueObj.input)) {
          return {
            status: 'ERROR',
            code: 'VALIDATE',
            message: 'Проверьте корректность E-mail адреса',
          };
        }
      }

      return null;
    },
  },
  mounted() {
    this.fieldValidate();
  }
};
</script>

<style lang="scss" scoped>
@import '~@field/style/inputText.scss';
</style>

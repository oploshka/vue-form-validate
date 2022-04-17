<script>

import FveText from "@fve/Element/Text/FveText";

export default {
  name: 'FveEmail',
  mixins: [
    FveText
  ],
  data(){
    return {
      type: 'email',
    };
  },
  methods: {
    validateFunction(str) {
      // eslint-disable-next-line
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(str) ? 'SUCCESS' : 'Проверьте корректность E-mail адреса';
    },
  }
};
</script>

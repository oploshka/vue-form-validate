<script>

import CrMixinRecording from '@plugin/vue-change-registrator/src/Mixin/CrMixinRecording';

export default {
  name: 'FveMixinFormRecording',
  mixins: [CrMixinRecording],

  methods: {
    // пользовательская функция
    crRecordingObjGet() {
      return {
        name: this.$.type.name, // get component name
        type: 'FORM',
        fn: () => {
          return {
            isChange: !!this.formIsChange
          };
        },
      };
    },

  },
};

</script>

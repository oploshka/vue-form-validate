<script>

import { FVE_INTERFACE_STOP_PROXY, FVE_INTERFACE_FORM } from '../../FveConst';

/**
 * Данный компонент отвечает за регистрацию поля в форме (если она доступна)
 */
export default {
  name: 'FveMixinFieldRegistrator',
  data() {
    return {
      fveParentForm: null,
      // TODO: delete
      fveParentFormId: null,
    };
  },
  methods: {

    /**
     * Синхронизируем наше поле с родительской формой
     * синхронизация с формой происходит всегда,
     * параметр sync - deprecated из-за отсутствия спроса.
     * @param newValue
     * @param fieldStore возможно стоит отказаться
     */
    fieldSyncParentForm(newValue, fieldStore) {
      this.fveParentForm?.fveFormFieldSync(this.field.name, newValue, fieldStore);
    },

    /**
     * Заставить родительскую форму сделать submit
     */
    fieldFormSubmit() {
      this.fveParentForm?.submit && this.fveParentForm.submit();
    },
  },
  // может before create???
  mounted() {

    let VueComponent = this;
    for (let i = 0; i < 20; i++) {
      VueComponent = VueComponent.$parent;
      if (VueComponent === null) {
        // TODO: add error ???
        return;
      }
      const fveInterface = VueComponent.fveInterface;

      switch (fveInterface) {
        case FVE_INTERFACE_STOP_PROXY: return;
        case FVE_INTERFACE_FORM:
          this.fveParentForm = VueComponent;
          this.fveParentForm.fveFormAddField(this);
          break;
        default: continue;
      }

    }
  },
  beforeUnmount() {
    if (this.fveParentForm) {
      // TODO: update
      this.fveParentForm.fveFormRemoveField(this);
      this.fveParentForm = null;
      // TODO: delete
      this.fveParentFormId = null;
    }
  },
};
</script>

<script>

import FveMixinFormRegistrator from './FveMixinFormRegistrator';
import FveMixinFormSchema from './FveMixinFormSchema';
import FveMixinFormIsChange from './FveMixinFormIsChange';
import FveMixinFormDefaultTodo from './FveMixinFormDefaultTodo';
import FveMixinFormCore from './FveMixinFormCore';

export default {
  name: 'FveMixinForm',
  mixins: [
    FveMixinFormRegistrator,
    FveMixinFormSchema,
    FveMixinFormIsChange,
    FveMixinFormDefaultTodo,
    FveMixinFormCore,
  ],
};

</script>

<script>

import FvePartFormRegistrator from './FvePartFormRegistrator';
import FvePartFormSchema      from './FvePartFormSchema';
import FvePartFormIsChange    from './FvePartFormIsChange';
import FvePartFormDefaultTodo from './FvePartFormDefaultTodo';
import FvePartFormCore        from './FvePartFormCore';

export default {
  name: 'FveMixinForm',
  mixins: [
    FvePartFormRegistrator,
    FvePartFormSchema,
    FvePartFormIsChange,
    FvePartFormDefaultTodo,
    FvePartFormCore,
  ],
};

</script>

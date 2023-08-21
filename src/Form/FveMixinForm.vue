<script>

import FvePartFormRegistrator from './Core/FvePartFormRegistrator';
import FvePartFormSchema      from './Core/FvePartFormSchema';
import FvePartFormIsChange    from './Core/FvePartFormIsChange';
import FvePartFormDefaultTodo from './Core/FvePartFormDefaultTodo';
import FvePartFormCore        from './Core/FvePartFormCore';

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

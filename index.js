
import _FveMixinField       from './src/Mixin/FveMixinField';
import _FveMixinFieldSelect from './src/Mixin/FveMixinFieldSelect';
import _FveMixinForm        from './src/Mixin/FveMixinForm';
import _FveMixinProxy       from './src/Mixin/FveMixinProxy';

//
import _FveForm             from './src/Template/FveForm';
import _FveTemplateField    from './src/Template/FveTemplateField';

export const FveMixinField        = _FveMixinField;
export const FveMixinFieldSelect  = _FveMixinFieldSelect;
export const FveMixinForm         = _FveMixinForm;
export const FveMixinProxy        = _FveMixinProxy;
//
export const FveForm              = _FveForm;
export const FveTemplateField     = _FveTemplateField; // TODO: delete???


// TODO: Возможно стоит сделать эти компоненты глобальными и добавить ряд настроект
const install = (app, options) => {
  // TODO: add setting support
};

export default {
  install: install
};

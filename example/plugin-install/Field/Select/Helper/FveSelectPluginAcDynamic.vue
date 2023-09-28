<script>

import {issetEntityCardView, openEntityCard} from '@widget/EntityCard';
import dynSelectInfo from '@widget/DynBaseHelper/DynField/DynFieldRequestHelper';
import {FT_OBJECT} from '@field/FveFieldType';

// Выбрать необходимый тип select-а
// import FveMixinFieldSelectObject from 'vue-form-element/src/Field/FveMixinFieldSelectObject';
import FveSelectPluginVueMsTemplate from '@field/Select/Helper/VueMultiselect/FveSelectPluginVueMsTemplate';
import FveSelectPluginVueMsPropsAdapter from '@field/Select/Helper/VueMultiselect/FveSelectPluginVueMsPropsAdapter';
import FveSelectPluginAc from '@field/Select/Helper/AutoComplete/FveSelectPluginAc';
import VueMsOptionTemplate from '@field/Select/Helper/VueMultiselect/Component/VueMsOptionTemplate';
import VueMsSingleLabelTemplate from '@field/Select/Helper/VueMultiselect/Component/VueMsSingleLabelTemplate';

export default {
  name: 'FveSelectPluginAcDynamic',
  mixins: [
    // FveMixinFieldSelectObject,
    FveSelectPluginVueMsTemplate,
    FveSelectPluginVueMsPropsAdapter,
    FveSelectPluginAc,
  ],
  computed: {
    entityTypeCodeForLabel() {
      const entityCode = this.dictionarySystemCode;

      const isSystemDictionary = !!this.field.dictionaryType?.isSystem;
      if(!isSystemDictionary){ return ''; }

      if(!entityCode || !issetEntityCardView(entityCode)) {
        return '';
      }
      return entityCode;
    },
    dictionarySystemCode() {
      return this.field.dictionaryType?.code;
    },
    selectMethods() {
      const defaultMethods = {
        request() {
          return Promise.reject('NOT SUPPORT DYN FIELD TYPE: ' + this.dictionarySystemCode);
        },
        requestDataPrepare(requestData) {
          requestData.sort.name = 'ASC';
          return requestData;
        },
        responsePrepare(resp) {
          return resp.list;
        },
      };

      const selectInfo = dynSelectInfo(this.dictionarySystemCode);
      if (!selectInfo) {
        console.error('DYN SELECT UNDEFINED TYPE', this.dictionarySystemCode);
        return defaultMethods;
      }

      return {
        ...defaultMethods,
        ...selectInfo,
      };
    },

    msComponentOption() {
      if(this.selectMethods.msComponentOption) {
        return this.selectMethods.msComponentOption();
      }
      return VueMsOptionTemplate;
    },
    msComponentSingleLabel() {
      if(this.selectMethods.msComponentSingleLabel) {
        return this.selectMethods.msComponentSingleLabel();
      }
      return VueMsSingleLabelTemplate;
    },
  },
  methods: {
    optionGetNameFn(obj) {
      const optionGetName = dynSelectInfo(this.field.dictionaryType?.code)?.optionGetName;
      if (optionGetName) {
        return optionGetName(obj);
      }
      return obj.name;
    },

    fieldPropertySchemaPrepare(fieldPropertySchema) {
      fieldPropertySchema.dictionaryType = FT_OBJECT({});
    },


    requestGetFormInfo() {
      // связанные данные формы
      const formData = this.fveParentForm?.form || {};
      const fieldCodeObj = this.fveParentForm?.dynFG?.fieldCodeObj || {};
      // valueList = [ {id: fieldId, code: fieldCode, value: {value: fieldValue}  }]

      const valueList = [];
      for (const fieldCode in formData) {
        if (!fieldCodeObj[fieldCode]) {
          continue;
        }

        if (!formData[fieldCode] || formData[fieldCode].length === 0) {
          continue;
        }

        valueList.push({ id: fieldCodeObj[fieldCode].fieldId, code: fieldCode, value: formData[fieldCode] });
      }
      return valueList;
    },
    prepareRequestFilter(dictionarySystemCode, query) {
      let requestData = {
        page: 0,
        size: 25,
        filter: {},
        sort: {},
        search: query,
        // Обозначаем для бека, что это динамический атрибут для фильтрации
        businessData: {
          isShort: true,
          codeAttributeFilter: this.field.name,
          // TODO: test and fix
          valueList: this.requestGetFormInfo(),

          // TODO: add (продумать)
          // entityTypeCode: 'ASSET',
          // entityType: {id: -99, name: 'Asset Type'},
          // entityId: -999
        },
      };

      if (!this.field.dictionaryType?.isSystem && this.field.dictionaryType) {
        requestData.filter.dicType = { EQ: this.field.dictionaryType.id };
      }
      //

      requestData = this.selectMethods.requestDataPrepare(requestData, this.field);

      //
      return requestData;
    },
    requestRm(query) {
      if (!this.field.dictionaryType) {
        console.error('this.field.dictionaryType - undefined', this.field);
        return Promise.reject('this.field.dictionaryType - undefined');
      }

      const isSystemDictionary = !!this.field.dictionaryType?.isSystem;
      if (!isSystemDictionary) {
        return RequestManager.DynamicDictionaryElement.getList(
          this.prepareRequestFilter(this.field.dictionaryType.code, query)
        ).then((response) => response.list);
      }

      const requestFunc = this.selectMethods.request();
      const requestData = this.prepareRequestFilter(this.field.dictionaryType.code, query);
      const responsePrepareFunc = this.selectMethods.responsePrepare;

      return requestFunc(requestData).then(responsePrepareFunc);
    },
  },
};
</script>

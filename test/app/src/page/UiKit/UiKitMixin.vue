<template>
  <div class="container">

    <form @submit.prevent="formSubmit" novalidate="novalidate" class="row form-example">
      <input type="submit" value="submit" style="display: none !important;">
      <!-- form start -->

      <div class="col-12">
        <p>
          Элемент только для чтения просто не редактируется,
          но отправляется при отправке соответствующей формы.
          Отключенный элемент не редактируется и не отправляется при отправке.
          Еще одно отличие заключается в том,
          что элементы только для чтения могут быть сфокусированы
          (и становятся сфокусированными при "закладке" через форму),
          в то время как отключенные элементы-нет.
        </p>
      </div>

      <template v-for="componentInfo in componentInfoList" :key="componentInfo.name">
      <div class="col-12">
        <div class="row" style="margin-top: 30px;">

          <div class="col-12"><h4>{{componentInfo.name}}</h4></div>
          <div class="col-12"><pre>{{form[componentInfo.name] === null ? 'null' : typeof form[componentInfo.name] + ' : ' }}{{form[componentInfo.name]}}</pre></div>

          <template v-for="required in ['', 'required']">
            <template v-for="readonly in ['', 'readonly']" :key="required + '-' + readonly">
              <!--<template v-for="disabled in ['', 'disabled']">-->
                <div class="col-3" >
                  <component
                    v-bind:is="componentInfo.component"
                    v-bind="Object.assign({
                        label       :'Label ' + componentInfo.name + ' ( ' + required + ' ' + readonly + ' )',
                        placeholder : 'Placeholder ' + componentInfo.name,
                        field: {
                          name: componentInfo.name,
                          required: !!required,
                          readonly: !!readonly,
                        }
                      },
                      componentInfo.data
                    )"
                  />
                </div>

              <!--</template>-->
            </template>
          </template>

          </div>
        </div>
      </template>

      <div class="col-12">
        <div class="row" style="margin-top: 30px; margin-bottom: 30px;">
          <div class="col-12"><button type="button" @click="formReset">reset</button></div>
          <div class="col-12"><button type="button" @click="formSubmit">validate</button></div>
        </div>
      </div>
      <!-- form end -->
    </form>

  </div>
</template>

<script>

import FveMixinForm    from 'vue-form-element/src/Mixin/FveMixinForm';
//
// const componentInfoList = [
//   {
//     name: 'textarea',
//     component: FveTextarea,
//     default: () => { return ''; }
//   },
// ];
//
// const getFullComponentList = (itemList) => {
//   const newItemList = [];
//   for(let i = 0; i < itemList.length; i++) {
//     const item = itemList[i];
//   }
//
//   return newItemList
// }


export default {
  mixins: [
    FveMixinForm
  ],
  data() {
    return {
      componentInfoList: [],
    };
  },
  methods: {
    formSchema() {
      return {};
    },
  }
};

</script>


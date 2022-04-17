<template>
  <div class="container">
    <div class="row">
      <div class="col-12"><br><br><br></div>
<!--      <div class="col-12"><FveSwitch   label="FveSwitch"   :selected="false"/><FveSwitch   label="FveSwitch active"   :selected="true"/></div>-->
<!--      <div class="col-12"><FveRadio    label="FveRadio"    :selected="false"/><FveRadio    label="FveRadio active"    :selected="true"/></div>-->
<!--      <div class="col-12"><FveCheckbox label="FveCheckbox" :selected="false"/><FveCheckbox label="FveCheckbox active" :selected="true"/></div>-->
    </div>


    <div class="row">
      <div class="col-12"><br><br><br></div>
<!--      <div class="col-12"><FveBoolean   label="FveSwitch" v-model="form.b1"/></div>-->
    </div>
  </div>
</template>

<script>

// import FveBoolean   from '@fve/Element/SelectBoolean/FveBoolean';
// import FveSwitch    from '@fve/Switch/FveSwitch';
// import FveRadio     from '@fve/Switch/FveRadio';
// import FveCheckbox  from '@fve/Switch/FveCheckbox';

export default {
  components: {
    // FveSwitch,
    // FveRadio,
    // FveCheckbox,

    // FveBoolean
  },

  data() {
    return {
      form: {
        b1: true
      }
    };
  },

};
</script>

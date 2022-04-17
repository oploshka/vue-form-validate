<script>
export default {
  props: {
    optionList: Array,
    optionGetKey: {
      type: Function,
      default: (obj)=>{ return obj.id; }
    },
    optionGetName: {
      type: Function,
      default: (obj)=>{ return obj.name; }
    },
  },
};
</script>

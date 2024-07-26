// Module imports
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'SearchBar',
  props: {
    placeholder: { type: String, required: true },
    setQuery: { type: Function as PropType<(val: string) => void>, required: true }
  }
});
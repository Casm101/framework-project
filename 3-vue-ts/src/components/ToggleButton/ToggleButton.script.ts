import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ToggleButton',
  props: {
    isActive: Boolean
  },
  data() {
    const activeClass = this.isActive ? 'active' : null;

    return {
      activeClass
    }
  }
});
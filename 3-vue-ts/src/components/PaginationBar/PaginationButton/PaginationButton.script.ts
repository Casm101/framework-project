import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'PaginationButton',
  props: {
    value: String as PropType<string | number>,
    isActive: Boolean,
    isDisabled: Boolean,
    onClick: Function as PropType<() => void>
  },
  data() {
    const activeClass = this.isActive ? 'active' : '';
    const disabledClass = this.isDisabled ? 'disabled' : '';

    return {
      activeClass,
      disabledClass
    }
  }
});
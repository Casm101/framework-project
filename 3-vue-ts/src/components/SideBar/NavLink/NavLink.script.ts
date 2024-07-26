import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NavLink',
  props: {
    name: String,
    href: String,
    icon: String,
  },
  data() {
    const isActive = window.location.pathname === this.href;
    const activeClass = isActive ? 'active' : null;

    return {
      activeClass,
    };
  }
})
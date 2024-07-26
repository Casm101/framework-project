// Module imports
import { defineComponent, PropType } from 'vue';

// Component imports
import NavLink from './NavLink/NavLink.vue';

// Interface and type declarations
interface ILink {
  name: string;
  href: string;
  icon: string;
}

// Component script declaration
export default defineComponent({
  name: 'SideBar',
  props: {
    logo: { type: String, required: true },
    navLinks: { type: Array as PropType<ILink[]>, required: true }
  },
  components: {
    NavLink
  }
});
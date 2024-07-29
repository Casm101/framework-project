// Module imports
import { defineComponent } from "vue";

// Component imports
import SideBar from './components/SideBar/SideBar.vue';
import ModalProvider from './context/ModalProvider/ModalProvider.vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      links: [
        {
          name: 'Movies',
          href: '/',
          icon: '/icons/film-icon.svg'
        },
        {
          name: 'TV Series',
          href: '/tv-series',
          icon: '/icons/series-icon.svg'

        },
        {
          name: 'Anime',
          href: '/anime',
          icon: '/icons/anime-icon.svg'

        },
        {
          name: 'Favourites',
          href: '/favourites',
          icon: '/icons/heart-icon.svg'
        }
      ]
    }
  },
  components: {
    SideBar,
    ModalProvider
  }
});

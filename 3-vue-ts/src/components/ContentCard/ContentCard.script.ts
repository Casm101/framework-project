// Module imports
import { defineComponent, PropType } from 'vue';

// Component and type imports
import LikeButton from './LikeButton/LikeButton.vue';
import { IGenre } from '@/types/movieTypes';


export default defineComponent({
  name: 'ContentCard',
  props: {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    genres: { type: Array as PropType<IGenre[]>, required: true },
    cover: { type: String, default: '' },
    type: { type: String, default: 'movie' },
    handleLike: { type: Function as PropType<(id: number) => void>, required: true },
    isLiked: { type: Boolean, required: true }
  },
  methods: {
    handleLikeClick() {
      this.handleLike(this.id);
    }
  },
  components: {
    LikeButton
  }
});
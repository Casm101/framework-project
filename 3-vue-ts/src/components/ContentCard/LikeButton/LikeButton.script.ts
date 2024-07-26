// Module imports
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'LikeButton',
  props: {
    isLiked: { type: Boolean, required: true }
  },
});
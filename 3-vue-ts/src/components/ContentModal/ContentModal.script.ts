// Module imports
import { defineComponent, PropType } from "vue";
import { IGenre } from "@/types/movieTypes";

// Type declarations
interface IContent {
  id: number;
  title: string;
  name: string;
  overview: string;
  backdrop_path: string;
  runtime: string;
  episode_run_time: string;
  release_date: number;
  first_air_date: number;
  original_language: string;
  vote_average: number;
  production_companies: {
    name: string;
  }[]
}

export default defineComponent({
  name: 'ContentModal',
  props: {
    content: { type: Object as PropType<IContent>, required: true },
    contentType: { type: String as PropType<'movie' | 'tv-series'>, required: true },
    genres: { type: Array as PropType<IGenre[]>, required: true },
  }
});

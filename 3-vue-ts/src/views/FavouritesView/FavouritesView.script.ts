// Module imports
import { defineComponent, onMounted, ref, watch } from "vue";

// Component imports
import ContentCard from "@/components/ContentCard/ContentCard.vue";

// Hook imports
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { IMovie } from "@/types/movieTypes";

// Service imports
import { MovieService } from "@/services/MovieService";
import { SeriesService } from "@/services/SeriesService";


export default defineComponent({
  name: 'FavouritesView',
  setup() {

    // Init hooks
    const [setValue, getValue] = useLocalStorage();

    // Init services
    const movieService = new MovieService();
    const seriesService = new SeriesService();

    // Content state declarations
    const content = ref<IMovie[]>([]);
    const likedMovies = ref<number[]>(getValue('movies') || []);
    const likedSeries = ref<number[]>(getValue('series') || []);
    const likedContent = ref<number[]>([...likedMovies.value, ...likedSeries.value] || []);

    // Page state declarations
    const totalResults = ref<number>(0);

    // Method to toggle liking content
    const toggleLiked = (id: number, type: 'movie' | 'series') => {
      console.log(type);

      const isLiked: number = likedContent.value.indexOf(id);
      if (isLiked !== -1) {
        let removedContent;
        if (type === 'movie') {
          removedContent = likedMovies.value.filter(cId => cId !== id);
          likedMovies.value = removedContent;
        }
        if (type === 'series') {
          removedContent = likedSeries.value.filter(cId => cId !== id);
          likedSeries.value = removedContent;
        }
        setValue(type, removedContent);
        likedContent.value = [...likedMovies.value, ...likedSeries.value];
      }
      if (isLiked === -1) {
        if (type === 'movie') likedMovies.value = [...likedMovies.value, id];
        if (type === 'series') likedSeries.value = [...likedSeries.value, id];
        setValue(type, [...likedContent.value, id]);
        likedContent.value = [...likedMovies.value, ...likedSeries.value];
      }
    };

    // Methods to run on page load
    const fetchContent = async () => {
      const movieIds: number[] = getValue('movies');
      const seriesIds: number[] = getValue('series');

      const fetchedMovies = await Promise.all(movieIds.map(async (id) => await movieService.getMovieById(id)));
      const fetchedSeries = await Promise.all(seriesIds.map(async (id) => await seriesService.getSeriesById(id)));

      // Add content type to all content
      content.value = content.value.map(con => {
        con.title ? con.content_type = 'movie' : con.content_type = 'series'
        console.log(con);
        return con;
      });

      content.value = [...fetchedMovies, ...fetchedSeries];
      totalResults.value = content.value.length;
    };

    onMounted(async () => {
      fetchContent();
    });

    watch(likedContent, () => {
      fetchContent();
    });

    return {
      content,
      likedContent,
      totalResults,
      toggleLiked,
    }
  },
  components: {
    ContentCard
  }
});
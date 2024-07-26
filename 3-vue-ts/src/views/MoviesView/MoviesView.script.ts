// Module imports
import { defineComponent, ref, onMounted, watch } from "vue"

// Component imports
import SearchBar from "@/components/SearchBar/SearchBar.vue";
import ContentCard from "@/components/ContentCard/ContentCard.vue";
import PaginationBar from "@/components/PaginationBar/PaginationBar.vue";
import ToggleButton from "@/components/ToggleButton/ToggleButton.vue";

// Hook imports
import { useDebounce } from "@/hooks/useDebounce";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useLocalStorage } from "@/hooks/useLocalStorage";

// Service imports
import { MovieService } from "@/services/MovieService";

// Type imports
import { IMovie, IGenre } from "@/types/movieTypes";


// Init hooks and services
const [setValue, getValue] = useLocalStorage();
const movieService = new MovieService();


// Page declaration
export default defineComponent({
  name: 'MoviesPage',
  components: {
    SearchBar,
    ContentCard,
    PaginationBar,
    ToggleButton
  },
  setup() {

    // Movie state declarations
    const movies = ref<IMovie[]>([]);
    const movieGenres = ref<IGenre[]>([]);
    const likedContent = ref<number[]>(getValue('movies') || []);

    // Page state declarations
    const page = ref<number>(1);
    const totalPages = ref<number>(0);
    const totalResults = ref<number>(0);

    // Search state declaration
    const searchQuery = ref<string>('');
    const setSearchQuery = (val: string) => {
      searchQuery.value = val;
    };

    // Method to toggle liking content
    const toggleLiked = (id: number) => {
      const isLiked: number = likedContent.value.indexOf(id);
      if (isLiked !== -1) {
        const removedContent = likedContent.value.filter(cId => cId !== id);
        setValue('movies', removedContent);
        likedContent.value = removedContent;
      }
      if (isLiked === -1) {
        setValue('movies', [...likedContent.value, id]);
        likedContent.value = [...likedContent.value, id];
      }
    };

    // Method to search and set movies
    const searchMovies = useDebounce(async (query: string, pageQuery: number) => {
      let searchResults;

      if (query.length !== 0) {
        searchResults = (await movieService.searchMovies(query, pageQuery));
      } else {
        searchResults = (await movieService.getMovies(pageQuery));
      }

      movies.value = await searchResults.results;
      totalPages.value = await searchResults.total_pages;
      totalResults.value = await searchResults.total_results;
    });

    // Method to handle page change
    const handlePageChange = (update: number | 'Next' | 'Prev') => {
      if (typeof update === 'number') page.value = update;
      if (update === 'Next') page.value += 1;
      if (update === 'Prev') page.value -= 1;
    };

    // Methods to run on page load
    onMounted(async () => {
      const moviesData = await movieService.getMovies();
      movies.value = moviesData.results;
      totalPages.value = moviesData.total_pages;
      totalResults.value = moviesData.total_results;
      movieGenres.value = await movieService.getMovieGenres();
    });

    // Methods to run on search change
    watch([searchQuery, page], () => {
      searchMovies(searchQuery.value, page.value);
    });

    // Reset to first page on search update
    watch(searchQuery, () => {
      page.value = 1;
    });

    // Scroll to top of page on page change
    watch(page, () => {
      useScrollToTop();
    });

    watch(totalPages, () => {
      console.log('totalPages', totalPages.value);
    });

    return {
      movies,
      movieGenres,
      likedContent,
      page,
      totalPages,
      totalResults,
      setSearchQuery,
      handlePageChange,
      toggleLiked
    }
  }
});
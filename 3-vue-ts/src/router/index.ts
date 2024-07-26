// Module imports
import { createRouter, createWebHistory } from "vue-router";

// View imports
import AnimeView from "@/views/AnimeView/AnimeView.vue";
import MoviesView from "@/views/MoviesView/MoviesView.vue";
import SeriesView from "@/views/SeriesView/SeriesView.vue";
import FavouritesView from "@/views/FavouritesView/FavouritesView.vue";


// Routes declaration
const routes = [
  {
    path: '/',
    name: 'Movies',
    component: MoviesView
  },
  {
    path: '/tv-series',
    name: 'TV Series',
    component: SeriesView
  },
  {
    path: '/anime',
    name: 'Anime',
    component: AnimeView
  },
  {
    path: '/favourites',
    name: 'Favourites',
    component: FavouritesView
  }
];

// Router declaration
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
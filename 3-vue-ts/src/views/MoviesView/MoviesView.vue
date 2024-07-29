<template>
  <div class="page-wrapper">

    <!-- Page header -->
    <div class="page-header" :style="{ gap: '3rem' }">
      <SearchBar placeholder="Search movies" :setQuery="setSearchQuery" />
      <ToggleButton :isActive="themeIsLight" @click="updateTheme" />
    </div>

    <!-- Page header -->
    <div class="page-header">
      <p class="header-title">Movies</p>
      <p class="header-sum">{{ totalResults }}</p>
    </div>

    <!-- Content grid -->
    <div class="content-grid">
      <ContentCard
        v-for="(movie, idx) in movies" v-bind="movie" :key="idx"
        :cover="movie.poster_path"
        :genres="movie.genre_ids && movie.genre_ids.map(genId => movieGenres[genId])"
        :isLiked="likedContent.includes(movie.id)"
        :handleLike="toggleLiked"
      />
    </div>

    <!-- Pagination bar -->
    <PaginationBar
      :page="page"
      :totalPages="totalPages > 500 ? 500 : totalPages"
      :handlePage="handlePageChange"
    />
  </div>
</template>

<script lang="ts" src="./MoviesView.script.ts"></script>
<template>
  <div class="page-wrapper">

    <!-- Page header -->
    <div class="page-header" :style="{ gap: '3rem' }">
      <SearchBar placeholder="Search series" :setQuery="setSearchQuery" />
      <ToggleButton :isActive="true" />
    </div>

    <!-- Page header -->
    <div class="page-header">
      <p class="header-title">Series</p>
      <p class="header-sum">{{ totalResults }}</p>
    </div>

    <!-- Content grid -->
    <div class="content-grid">
      <ContentCard
        v-for="(serie, idx) in series" :key="idx"
        :id="serie.id"
        :title="serie.title ? serie.title : serie.name"
        :cover="serie.poster_path"
        :genres="serie.genre_ids.map(genId => seriesGenres[genId])"
        :isLiked="likedContent.includes(serie.id)"
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

<script lang="ts" src="./SeriesView.script.ts"></script>
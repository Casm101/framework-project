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
        v-for="(show, idx) in anime" :key="idx"
        :id="show.id"
        :title="show.title ? show.title : show.name"
        :cover="show.poster_path"
        :genres="show.genre_ids.map(genId => animeGenres[genId])"
        :isLiked="likedContent.includes(show.id)"
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

<script lang="ts" src="./AnimeView.script.ts"></script>
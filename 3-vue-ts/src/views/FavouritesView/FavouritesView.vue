<template>
  <div className="page-wrapper">

  <!-- Page header -->
  <div className="page-header">
    <p className="header-title">Favourites</p>
    <p className="header-sum">{{ totalResults }}</p>
  </div>

  <!-- Content grid -->
  <div className="content-grid">
    <ContentCard 
      v-for="con in content" :key="con.id"
      :id="con.id"
      :title="con.title || con.name"
      :type="con.title ? 'movie' : 'series'"
      :cover="con.poster_path"
      :genres="con.genres && con.genres.map(genre => genre.name)"
      :handleLike="() => toggleLiked(con.id, con.content_type as 'movie' | 'series')"
      :isLiked="likedContent.includes(con.id)"
    />
  </div>
</div>
</template>

<script lang="ts" src="./FavouritesView.script.ts"></script>
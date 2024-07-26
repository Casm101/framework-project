<template>
  <article class="content-card" :content="`${type}_${id}`">

    <!-- Like Button -->
    <div class="content-like">
      <LikeButton :isLiked="isLiked" @click="handleLikeClick"/>
    </div>

    <!-- Content cover of fallback -->
    <img v-if="cover" class="cover" :src="`https://image.tmdb.org/t/p/w342${cover}`" :alt="`${title} poster`" />
    <div v-else class="cover fallback">No Image Available</div>

    <!-- Content overlay information -->
    <div class="overlay">
      <div class="overlay-title">
        {{ title }}
      </div>
      <div class="overlay-tags">
        {{ genres?.map(genre => genre).join(' - ') }}
      </div>
    </div>
  </article>
</template>

<script lang="ts" src="./ContentCard.script.ts" />
<style lang="scss" scoped src="./ContentCard.styles.scss" />
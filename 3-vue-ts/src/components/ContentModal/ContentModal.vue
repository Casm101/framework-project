<template>
  <div class="modal-background">
    <img v-if="content.backdrop_path"
      class="backdrop"
      src="https://image.tmdb.org/t/p/w300${this.content.backdrop_path}"
      :alt="`${content.title} backdrop`"
    >
    <div v-else class="backdrop fallback"></div>`

    <div class="background-overlay"></div>

    <div class="modal-close">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
        <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
      </svg>
    </div>
  </div>

  <div class="modal">
    <div class="modal-main">
      <div class="main-header">
        <h1>{{ content.title ? content.title : content.name }}</h1>
        <p>${this.content.genres.map(genre => genre.name).join(" - ")}</p>
      </div>
        
      <img v-if="content.backdrop_path"
        class="cover"
        src="https://image.tmdb.org/t/p/w780/${this.content.backdrop_path}"
        alt="${this.content.title ? this.content.title : this.content.name} poster."
      >
      <div v-else class="cover fallback">No Image Available</div>
        
      <div class="main-description">
        <p class="description-title">Description</p>
        <hr>
        <p class="description-content">
          {{ content.overview }}
        </p>
      </div>

      <!-- <div class="main-header">
        <h1>Recomendations</h1>
        <p>Films like ${this.content.title}</p>
      </div>
      <div class="recommendations">
        ${this.recommendations?.results?.splice(0, 5).map(r =>
            new ContentCard(
                r.id,
                r.title || r.name,
                r.genre_ids.map(genre => this.genres[genre]),
                r.poster_path,
                this.contentType
            ).render()
        ).join('')}
      </div> -->
    </div>

    <div class="modal-sidebar">
      <div class="sidebar-group">
        <p class="group-title">
          Runtime
        </p>
        <p class="group-value">
          {{ content.runtime || content.episode_run_time[0] }}min
        </p>
      </div>

      <div class="sidebar-group">
        <p class="group-title">
          Year
        </p>
        <p class="group-value">
          {{ new Date(content.release_date || content.first_air_date).getFullYear() }}
        </p>
      </div>

      <div class="sidebar-group">
        <p class="group-title">
          Release Date
        </p>
        <p class="group-value">
          {{ content.release_date || content.first_air_date }}
        </p>
      </div>

      <div class="sidebar-group">
        <p class="group-title">
          Language
        </p>
        <p class="group-value uppercase">
          {{ content.original_language }}
        </p>
      </div>

      <div class="sidebar-group">
        <p class="group-title">
          Rating
        </p>
        <p class="group-value uppercase">
          {{ content.vote_average }}
        </p>
      </div>

      <div class="sidebar-group">
        <p class="group-title">
          Production
        </p>
        <p class="group-value uppercase">
          {{ content.production_companies.map(pc => 
            pc.name
          ).join(' - ') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./ContentModal.script.ts"></script>
<style lang="scss" src="./ContentModal.styles.scss"></style>
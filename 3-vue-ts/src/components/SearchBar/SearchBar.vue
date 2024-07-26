<template>
  <div class="searchbar-styled">
    <input type="search" className="searchbar-input" :placeholder="placeholder" @keyup="(e: any)=> setQuery(e.target.value)" />
    <img src="/icons/search-icon.svg" alt="" class="searchbar-icon" />
  </div>
</template>

<script lang="ts" src="./SearchBar.script.ts" />
<style lang="scss" scoped src="./SearchBar.styles.scss" />
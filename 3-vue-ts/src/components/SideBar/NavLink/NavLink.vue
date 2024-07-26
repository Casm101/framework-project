<template>
  <a :href="href" class="navigation-link" :class="activeClass">
    <img :src="icon" />
    <span>{{ name }}</span>
  </a>
</template>

<script lang="ts" src="./NavLink.script.ts" ></script>
<style lang="scss" src="./NavLink.styles.scss"></style>
<template>
  <div :class="`toggleButton-styled ${isActive ? 'active' : null}`">
    <div class="toggleButton-circle"></div>
  </div>
</template>

<script lang="ts" src="./ToggleButton.script.ts"></script>
<style lang="scss" src="./ToggleButton.styles.scss"></style>
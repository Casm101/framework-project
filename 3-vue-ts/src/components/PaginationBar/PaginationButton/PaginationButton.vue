<template>
  <div
    :class="`${['pagination-button', activeClass, disabledClass].join(' ')}`"
    @click="onClick"
  >
    {{ value }}
  </div>
</template>

<script lang="ts" src="./PaginationButton.script.ts"></script>
<style lang="scss" src="./PaginationButton.styles.scss"></style>
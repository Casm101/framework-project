<template>
  <div className="pagination-styled">
    <PaginationButton v-for="button in buttons" v-bind="button" :key="button.key" />
  </div>
</template>

<script lang="ts" src="./PaginationBar.script.ts"></script>
<style lang="scss" scoped src="./PaginationBar.styles.scss"></style>

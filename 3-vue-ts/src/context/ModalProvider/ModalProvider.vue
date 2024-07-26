<template>
  <slot :openModal="openModal" :closeModal="closeModal"></slot>
  <ContentModal v-if="isModalVisible" />
</template>

<script lang="ts" src="./ModalProvider.script.ts"></script>

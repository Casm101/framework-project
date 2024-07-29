<template>
  <ModalProvider>
    <template v-slot="{ openModal, closeModal}">
      <SideBar logo="/logo.svg" :navLinks="links" />
      <router-view :openModal="openModal" :closeModal="closeModal" />
    </template>
  </ModalProvider>
</template>

<script lang="ts" src="./App.script.ts"></script>

<template>
  <aside class="sidebar-styled">

    <!-- Sidebar logo -->
    <div class="sidebar-logo">
      <a href="/">
        <img :src="logo" alt="Home Page" />
      </a>
    </div>

    <!-- Sidebar navigation -->
    <nav v-if="navLinks" class="sidebar-navigation">
      <NavLink v-for="(link, idx) in navLinks" :key="idx" v-bind="link" />
    </nav>

    <!-- Sidebar Footer -->
    <footer class="sidebar-footer">
      <p>Framework Movies ©️ {{ new Date().getFullYear() }}</p>
    </footer>
  </aside>
</template>

<script lang="ts" src="./SideBar.script.ts"></script>
<style lang="scss" scoped src="./SideBar.styles.scss"></style>
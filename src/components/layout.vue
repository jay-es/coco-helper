<template>
  <!-- Configure "view" prop for QLayout -->
  <q-layout>
    <q-toolbar slot="header">
      <q-toolbar-title class="text-secondary">
        CoCo Helper
      </q-toolbar-title>
    </q-toolbar>

    <keep-alive>
      <router-view />
    </keep-alive>
  </q-layout>
</template>

<script>
import './store'

export default {
}
</script>

<style>
.layout-padding.animated {
  position: absolute;
  width: 100%;
  -webkit-animation-duration: .4s;
  animation-duration: .4s;
}
</style>

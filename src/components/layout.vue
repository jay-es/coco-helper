<template>
  <!-- Configure "view" prop for QLayout -->
  <q-layout>
    <q-toolbar slot="header">
      <q-toolbar-title class="text-secondary">
        CoCo Helper
      </q-toolbar-title>
    </q-toolbar>

    <q-transition appear :enter="enterName" :leave="leaveName">
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-transition>
  </q-layout>
</template>

<script>
import './store'

export default {
  data () {
    return {
      enterName: '',
      leaveName: ''
    }
  },
  watch: {
    $route (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length

      this.enterName = toDepth > fromDepth ? 'slideInRight' : 'slideInLeft'
      this.leaveName = toDepth > fromDepth ? 'slideOutLeft' : 'slideOutRight'
    }
  }
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

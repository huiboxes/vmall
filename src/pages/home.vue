<template>
  <div>
    <h1>home</h1>
    <nav-header></nav-header>
    <router-view />
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
export default {
  name: 'nav-home',
  components: {
    NavHeader,
    NavFooter
  }
}
</script>

<style lang="scss" scoped></style>

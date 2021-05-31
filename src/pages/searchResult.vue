<template>
  <div>
    <nav-header></nav-header>
    <el-breadcrumb separator=">" class="container">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">全部结果</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $router.query.keyword }}</el-breadcrumb-item>
    </el-breadcrumb>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import ServiceBar from '@/components/ServiceBar'
import NavFooter from '@/components/NavFooter'
import NavHeader from '@/components/NavHeader'

export default {
  name: 'search-result',
  components: {
    ServiceBar,
    NavFooter,
    NavHeader,
  },
}
</script>

<style lang="scss" scoped></style>

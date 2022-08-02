
<template>
  <!-- 有些一级路由不需要缓存 -->
  <keep-alive exclude="SearchIndex,SearchResult,ArticleDetailIndex,UserEdit">
    <router-view></router-view>
  </keep-alive>

</template>

<script>
export default {}
</script>

<style></style>

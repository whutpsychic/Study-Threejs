<!-- 基础使用 -->
<template>
  <main>
    <div><el-button type="success" @click="goto('/base')">第一个程序</el-button></div>
    <div><el-button type="success" @click="goto('/base-line')">画线</el-button></div>
    <div><el-button type="primary" @click="goto('/base-text')">创建文字</el-button></div>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter();

function goto(path) {
  router.push(path)
}

</script>

<style scoped>
main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

main>div {
  padding: 10px 20px;
  flex-basis: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
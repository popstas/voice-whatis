<template>
  <el-container>
    <el-header height="0px">
    </el-header>
    <el-main>
      <nuxt/>
    </el-main>
    <Footer></Footer>
  </el-container>
</template>

<style lang="scss">
$max_width: 640px;

.el-container {
  margin: 0 auto;
  max-width: $max_width;
  background: #fff;
}

html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 14px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
.el-main {
  padding: 5px;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>

<script>
import Footer from "~/components/Footer";

export default {
  components: { Footer },
};
</script>

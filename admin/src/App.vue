<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  background-color:#efefef;
}
// 改写element ui的Tree样式，去掉固定的行高
div.main .el-tree-node__content{
  display:flex;
  align-items: center;
  height:55px;
  cursor:pointer;
}
</style>

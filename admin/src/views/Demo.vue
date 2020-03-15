<template>
  <el-container>
    <el-aside width="200px">
      <el-menu mode="vertical" style="height:100vh" :default-active="$route.path" router>
        <el-submenu v-for="(item, index) in menus.items" :index="`index + 1`" :key="index">
          <template slot="title">
            <h3>{{item.title}}</h3>
          </template>
          <el-menu-item
            v-for="(subitem, subIndex) in item.items"
            :key="`${index}-${subIndex}`"
            :index="subitem.path"
          >{{subitem.title}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <!-- Header content -->
        <h1>Systemaflow手续费自定义Demo</h1>
      </el-header>
      <el-main>
        <!-- Main content -->
        <router-view :key="$router.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
@Component({})
export default class Demo extends Vue {
  menus = {
    items: [
      {
        title: "配置",
        items: [
          { title: "项目管理", path: "/itemConfig/items" },
        ]
      },
      {
        title: "Demo",
        items: [{ title: "Demo展示", path: "/inputLayout/chargeInput" }]
      }
    ]
  };
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

</style>
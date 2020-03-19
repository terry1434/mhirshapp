<template>
  <el-container>
    <el-aside width="200px">
      <el-menu mode="vertical" style="height:100%" :default-active="$route.path" router>
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
      <el-main>
        <div style="position:relative;overflow:hidden;">
            <transition mode="out-in">
              <!-- Main content -->
              <router-view :key="$router.path"></router-view>
            </transition>
        </div>
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
        items: [{ title: "项目管理", path: "/itemConfig/items" }]
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
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(80px);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.6s ease;
}
.v-move {
  transition: all 0.6s ease;
}
</style>
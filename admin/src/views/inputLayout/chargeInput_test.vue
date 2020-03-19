<template>
  <ul>
    <transition-group>
      <li
        v-for="(item,index) in list"
        :key="item.label"
        @click="del(index)"
      >{{item.value}} --- {{item.label}}</li>
    </transition-group>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { value: "123", label: "ABC1" },
        { value: "123", label: "ABC2" },
        { value: "123", label: "ABC3" },
        { value: "123", label: "ABC4" },
        { value: "123", label: "ABC5" }
      ]
    };
  },
  methods: {
    del(index) {
      this.list.splice(index, 1);
    }
  }
};
</script>

<style scoped>
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
.v-leave-active {
  position: absolute;
}
</style>
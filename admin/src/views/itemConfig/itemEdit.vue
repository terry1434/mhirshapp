<template>
  <div class="container">
    <h3>项目{{isCreate?"追加":"更新"}}</h3>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="业务ID">
        <el-input v-model="form.kbnId"></el-input>
      </el-form-item>
      <el-form-item label="业务名称">
        <el-input v-model="form.kbnName"></el-input>
      </el-form-item>
      <el-form-item label="科目1">
        <el-input v-model="form.ken1"></el-input>
      </el-form-item>
      <el-form-item label="科目2">
        <el-input v-model="form.ken2"></el-input>
      </el-form-item>
      <el-form-item label="项目类型1">
        <el-input v-model="form.ctlType1"></el-input>
      </el-form-item>
      <el-form-item label="项目类型2">
        <el-input v-model="form.ctlType2"></el-input>
      </el-form-item>
      <el-form-item label="项目类型3">
        <el-input v-model="form.ctlType3"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即{{isCreate?"创建":"更新"}}</el-button>
        <el-button @click="goback">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from "vue-property-decorator";
@Component({})
export default class itemEdit extends Vue {
  @Prop(String) id: string;

  form = {};

  rules = {};

  //计算属性的写法
  get isCreate() {
    return !this.id;
  }

  created() {
    !this.isCreate && this.fetch();
  }
  async fetch() {
    const res = await this.$http.get(`category/${this.id}`);
    this.form = res.data;
  }
  async onSubmit() {
    const url = this.isCreate ? `category` : `category/${this.id}`;
    const method = this.isCreate ? `post` : `put`;
    await this.$http[method](url, this.form);
    this.$message.success("创建成功");
    this.$router.go(-1);
  }

  goback() {
    this.$router.go(-1);
  }
}
</script>

<style scoped>
</style>
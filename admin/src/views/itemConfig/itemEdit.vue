<template>
  <div class="container">
    <h3>项目{{isCreate?"追加":"更新"}}</h3>
    <!-- Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则 -->
    <!-- 并将 Form-Item 的 prop 属性设置为需校验的字段名即可。校验规则参见 async-validator  -->
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="业务ID" prop="kbnId">
        <el-input v-model="form.kbnId"></el-input>
      </el-form-item>
      <el-form-item label="业务名称" prop="kbnName">
        <el-input v-model="form.kbnName"></el-input>
      </el-form-item>
      <el-form-item label="科目1" prop="ken1">
        <el-input v-model="form.ken1"></el-input>
      </el-form-item>
      <el-form-item label="科目2" prop="ken2">
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
        <el-button type="primary" @click="onSubmit('form')">{{isCreate?"创建":"更新"}}</el-button>
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

  rules = {
    kbnId: [{ required: true, message: "请输入业务ID", trigger: "blur" }],
    kbnName: [{ required: true, message: "请输入业务名称", trigger: "blur" }],
    ken1: [{ required: true, message: "请输入业务分类A", trigger: "blur" }],
    ken2: [{ required: true, message: "请输入业务分类B", trigger: "blur" }]
  };

  //计算属性的写法
  get isCreate() {
    return this.$route.path.match(/itemCreate/);
  }

  created() {
    this.id && this.fetch();
  }
  async fetch() {
    const res = await this.$http.get(`category/${this.id}`);
    this.form = res.data;
  }
  async onSubmit(formName: string) {
    (this.$refs[formName] as HTMLFormElement).validate(
      async (valid: boolean) => {
        if (valid) {
          const url = this.isCreate ? `category` : `category/${this.id}`;
          const method = this.isCreate ? `post` : `put`;
          try {
            const res = await this.$http[method](url, this.form);
            if (res.status == 200) {
              this.$message.success(`${this.isCreate ? "创建" : "更新"}成功`);
              this.$router.go(-1);
            } else {
              this.$message.error(res.statusText);
            }
          } catch (e) {
            this.$message.error("创建失败");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      }
    );
  }

  goback() {
    this.$router.go(-1);
  }
}
</script>

<style scoped>
</style>
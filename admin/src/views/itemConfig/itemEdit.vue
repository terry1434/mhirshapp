<template>
  <div class="container">
    <h3>项目{{isCreate?"追加":"更新"}}</h3>
    <!-- Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则 -->
    <!-- 并将 Form-Item 的 prop 属性设置为需校验的字段名即可。校验规则参见 async-validator  -->
    <el-form ref="form" :label-position="'right'" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="业务ID" prop="kbnId" size="mini">
        <el-input v-model="form.kbnId" :disabled="!isCreate"></el-input>
      </el-form-item>
      <el-form-item label="业务名称" prop="kbnName" size="mini">
        <el-input v-model="form.kbnName" :disabled="!isCreate"></el-input>
      </el-form-item>
      <el-form-item label="科目1" prop="ken1" size="mini">
        <el-input v-model="form.ken1" :disabled="!isCreate"></el-input>
      </el-form-item>
      <el-form-item label="科目2" prop="ken2" size="mini">
        <el-input v-model="form.ken2" :disabled="!isCreate"></el-input>
      </el-form-item>
      <el-form-item label="控件类型" prop="ctlType" size="mini">
        <el-radio-group v-model="form.ctlType" @change="changeCtlType(false)">
          <el-radio
            v-for="checkbox in CtrlTypeOptions"
            :key="checkbox.value"
            :label="checkbox.value"
          ></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="控件属性" prop="ctlAttr1" size="mini">
        <el-checkbox-group v-model="form.ctlAttr1">
          <el-checkbox v-for="item in CtrlTypeItem" :key="item.label" :label="item.label"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="优惠单位" size="mini">
        <el-select v-model="form.ctlAttr2" placeholder="请选择">
          <el-option
            v-for="item in optionList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="输入格式" size="mini">
        <el-input v-model="form.ctlFormat"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">{{isCreate?"创建":"更新"}}</el-button>
        <el-button @click="goback">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component, Watch } from "vue-property-decorator";
@Component({})
export default class itemEdit extends Vue {
  @Prop(String) id: string | undefined;

  count: number = 0;
  //返回定义前的快捷键:alt + leftArrow
  @Watch("count")
  watch_count(newValue: number, oldValue: number) {
    console.log(`oldValue:${oldValue}, newValue:${newValue}`);
  }
  onCount() {
    this.count++;
  }

  form: any = { ctlAttr1: [] };
  //项目的输入类型控件，需要从数据库取得，DEMO中写死假数据
  CtrlTypeOptions: Array<any> = [
    {
      value: "textbox",
      option: [
        { value: "子项目1", label: "子项目1" },
        { value: "子项目1", label: "子项目2" },
        { value: "子项目1", label: "子项目3" }
      ]
    },
    {
      value: "textarea",
      option: [
        { value: "子项目4", label: "子项目4" },
        { value: "子项目4", label: "子项目5" }
      ]
    },
    {
      value: "select",
      option: [
        { value: "子项目6", label: "子项目6" },
        { value: "子项目7", label: "子项目7" },
        { value: "子项目8", label: "子项目8" }
      ]
    }
  ];
  //控件对应的属性存放数组
  CtrlTypeItem: any = [];
  //优惠单位
  optionList: any = [
    { value: "%", label: "百分比" },
    { value: "BP", label: "BP" },
    { value: "测试1", label: "测试1" }
  ];
  //表单验证规则
  rules = {
    kbnId: [{ required: true, message: "请输入业务ID", trigger: "blur" }],
    kbnName: [{ required: true, message: "请输入业务名称", trigger: "blur" }],
    ken1: [{ required: true, message: "请输入业务分类A", trigger: "blur" }],
    ken2: [{ required: true, message: "请输入业务分类B", trigger: "blur" }],
    ctlType: [{ required: true, message: "请选择控件类型", trigger: "blur" }],
    ctlAttr1: [
      {
        type: "array",
        required: true,
        message: "请至少选择一个控件属性",
        trigger: "change"
      }
    ]
  };

  //计算属性的写法
  get isCreate() {
    return this.$route.path.match(/itemCreate/);
  }

  created() {
    this.changeCtlType(true);
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
          if (this.isCreate) {
            delete this.form._id; //复写时需要删除原来的_id
          }
          try {
            const res = await this.$http[method](url, this.form);

            if (res.status == 200 || res.status == 201) {
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
  //数据操作后，返回上一页
  goback() {
    this.$router.go(-1);
  }
  //【控件类型】change事件调用
  changeCtlType(isInit: boolean) {
    let self = this;

    this.CtrlTypeOptions.forEach(function(item) {
      if (item.value == self.form.ctlType) {
        self.CtrlTypeItem = item.option;
        self.form.ctlAttr1 = isInit ? self.form.ctlAttr1 : [];
      }
    });
  }
}
</script>

<style scoped>
</style>
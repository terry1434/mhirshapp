<template>
  <div class="container">
    <h3>手续费输入画面</h3>
    <div class="menubar">
      <div class="ctrl">
        <el-row>
          <el-button type="primary" @click="handelSave" :disabled="disableSave">暂存</el-button>
          <el-button type="primary" @click="handelSubmit" :disabled="disableSubmit">提交</el-button>
        </el-row>
      </div>
      <div class="progress">
        <el-steps :space="200" :active="activeStep" finish-status="success" align-center>
          <el-step :title="step1"></el-step>
          <el-step :title="step2"></el-step>
          <el-step :title="step3"></el-step>
        </el-steps>
      </div>
    </div>
    <!-- 画面主区域 -->
    <div class="customInput">
      <el-tree
        :data="itemsNode"
        :prop="defaultProps"
        default-expand-all
        node-key="value"
        class="custom-tree"
      >
        <div slot-scope="{ node }" :class="{'custom-tree-node':node.level==3}">
          <div
            :class="{h_level1:node.level==1,h_level2:node.level==2,h_level3:node.level==3}"
          >{{ node.label }}</div>
          <div :class="{level3:node.level==3}" v-if="node.level==3">
            <div>
              <span>变更前</span>
              <el-input :disabled="true" style="margin-left:5px;width:120px"></el-input>
            </div>
            <div>
              <span>变更后</span>
              <el-input style="margin-left:5px;width:120px"></el-input>
            </div>
            <div>
              <span>优惠幅度</span>
              <el-input style="margin-left:5px;width:120px"></el-input>
            </div>
          </div>
        </div>
      </el-tree>
    </div>

    <div class="addItem">
      <el-popover placement="right" width="260" trigger="click">
        <el-cascader
          width="300"
          v-model="selectedItemNode"
          size="mini"
          style="margin-right:10px"
          :options="itemsNode"
          :props="{ multiple: true }"
          clearable
          collapse-tags
        ></el-cascader>
        <el-button size="mini" type="primary" @click="addRow">确定</el-button>
        <el-button type="primary" icon="el-icon-plus" circle slot="reference" :disabled="isSubmit"></el-button>
      </el-popover>
    </div>
  </div>
</template>


<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { resetCascaderOrgin } from "../../common/common";
@Component({})
export default class chargeInput extends Vue {
  step1: string = "新规";
  step2: string = "未提交";
  step3: string = "未审批";
  disableSave: boolean = false;
  disableSubmit: boolean = false;
  activeStep: number = 0;
  itemsNode: any = [];
  defaultProps: any = { children: "children", label: "label" };
  selectedItemNode: Array<string> = [];
  isSubmit: boolean = false;
  tabelData = [
    {
      kbnId: "123456789",
      kbnName: "测试业务ABCDEF",
      ken1: "测试科目1",
      ken2: "测试项1",
      baseRate: "1.5000",
      oldRate: "1.6500",
      rate: "",
      spread: ""
    },
    {
      kbnId: "123456789",
      kbnName: "测试业务ABCDEF",
      ken1: "测试科目2",
      ken2: "测试项2",
      baseRate: "1.1200",
      oldRate: "1.2500",
      rate: "",
      spread: ""
    },
    {
      kbnId: "123456789",
      kbnName: "测试业务ABCDEF",
      ken1: "测试科目3",
      ken2: "测试项3",
      baseRate: "1.5500",
      oldRate: "1.8500",
      rate: "",
      spread: ""
    }
  ];

  created() {
    this.fetch();
  }

  async fetch() {
    const data = await this.$http.get("/category", {
      params: {
        query: {
          limit: 1000,
          sort: { kbnId: 1, ken1: 1, ken2: 1 }
        }
      }
    });
    this.itemsNode = resetCascaderOrgin(data);
  }
  handelSave() {
    this.step1 = "已保存";
    this.activeStep = 1;
    this.$message.success("保存成功");
  }
  handelSubmit() {
    this.disableSave = true;
    this.disableSubmit = true;
    this.step1 = "已保存";
    this.step2 = "已提交";
    this.step3 = "待审批";
    this.activeStep = 2;
    this.$message.success("提交成功");
    this.isSubmit = true;
  }
  deleteRow(index) {
    this.tabelData.splice(index, 1);
    this.$message.success("删除成功");
  }
  addRow() {
    if (this.selectedItemNode.length != 3) {
      this.$message.error("请选择最后一个节点的科目");
      return;
    }

    this.tabelData.push({
      kbnId: "123456789",
      kbnName: this.selectedItemNode[0],
      ken1: this.selectedItemNode[1],
      ken2: this.selectedItemNode[2],
      baseRate: "1.0000",
      oldRate: "1.2000",
      rate: "",
      spread: ""
    });
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-width: 400px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 10px;
  position: relative;
}
.container > h3 {
  align-self: flex-start;
}
ul {
  list-style: none;
}
ul > li {
  float: left;
}
.menubar {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.ctrl {
  min-width: 180px;
}
.progress {
  min-width: 240px;
  justify-self: flex-end;
  align-self: center;
  margin-left: auto;
}
.customInput {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 10px;
  margin-right: 20px;
  padding-top: 5px;
}
.customInput ul.customInputLine {
  width: 100%;
  height: 25px;
  display: flex;
  justify-content: space-around;
}
.customInput .custom_header {
  height: 40px;
  margin: 0;
}
.addItem {
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 9999;
}
.custom-tree-node {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  min-width: 800px;
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.level3 {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}
.h_level1 {
  font-size: 20px;
  font-weight: 900;
  color: #000000;
}
.h_level2 {
  font-size: 18px;
  font-weight: 900;
  color: #1f1f1f;
}
.h_level3 {
  font-size: 14px;
  font-weight: 600;
  color: #6e6980;
}
</style>
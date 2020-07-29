<template>
  <div class="container">
    <h3>手续费输入画面</h3>
    <div class="menubar">
      <div class="ctrlbar">
        <el-row>
          <el-button type="primary" @click="handelSave" :disabled="disableSave">暂存</el-button>
          <el-button type="primary" @click="handelSubmit" :disabled="disableSubmit">提交</el-button>
        </el-row>
      </div>
      <div class="progress">
        <el-steps :space="300" :active="activeStep" finish-status="success" align-center>
          <el-step :title="step1"></el-step>
          <el-step :title="step2"></el-step>
          <el-step :title="step3"></el-step>
        </el-steps>
      </div>
    </div>
    <!-- 画面主区域 -->
    <div class="customInput">
      <el-table
        :data="itemsNode"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        default-expand-all
        :tree-props="{children: 'children'}"
      >
        <el-table-column prop="value" label="类型" width="180"></el-table-column>
        <el-table-column prop="baseRate" label="基准" width="180"></el-table-column>
        <el-table-column prop="ctlType" label="变更前" width="180"></el-table-column>
        <el-table-column prop="newRate" label="变更后" width="180">
          <template slot-scope="scope">
            <el-input v-if="scope.row.level==3" size="mini" placeholder="输入变更后费率" />
          </template>
        </el-table-column>
        <el-table-column prop="newRate" label="优惠"></el-table-column>
      </el-table>
    </div>
  </div>
</template>


<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import {Tree} from 'element-ui';
import {
  resetCascaderOrginById,
  disableCascaderOrginTree,
  clearDisableCascader
} from "../../common/common";
@Component({})
export default class chargeInput extends Vue {
  rowId: number = 0;
  step1: string = "新规";
  step2: string = "未提交";
  step3: string = "未审批";
  disableSave: boolean = false;
  disableSubmit: boolean = false;
  activeStep: number = 0;
  itemsNode: any = [];
  selectedItemNode: Array<string> = [];
  isSubmit: boolean = false;
  timestamp: number = new Date().getTime();
  addItemDialogVisible: boolean = false;
  tabelData: any = [];

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
    this.itemsNode = resetCascaderOrginById(data);
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
  deleteRow(index:number) {
    const { kbnName, ken1, ken2 } = this.tabelData.splice(index, 1)[0];
    clearDisableCascader([kbnName, ken1, ken2], this.itemsNode);
    this.$message.success("删除成功");
    this.timestamp = new Date().getTime();
  }
  addRows() {
    const ref = <Tree>this.$refs.tree;
    const selectList = ref.getCheckedNodes();
    if (this.selectedItemNode.length > 0) {
      this.selectedItemNode.forEach(item => {
        this.tabelData.unshift({
          id: this.rowId++,
          kbnId: "",
          kbnName: item[0],
          ken1: item[1],
          ken2: item[2],
          baseRate: "1.0000",
          oldRate: "1.2000",
          rate: "1.3500",
          spread: "1.2150",
          isDelete: false
        });
      });
      this.selectedItemNode = [];
      disableCascaderOrginTree(selectList, true);
      console.log(selectList);
    }
    this.addItemDialogVisible = false;
    ref.clearCheckedNodes();
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
  overflow: hidden;
}
.container > h3 {
  align-self: flex-start;
}
ul {
  list-style: none;
}

.menubar {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.ctrlbar {
  min-width: 280px;
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
  margin-top: 10px;
  margin-right: 20px;
  padding-top: 5px;
  padding-left: 20px;
  overflow-x: hidden;
}

.addItem {
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 9999;
}
.addContainer {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
}
.name-wrapper:hover {
  cursor: pointer;
}
.updown {
  width: 100%;
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}
.updown > div {
  width: 150px;
}

.table {
  width: 100%;
  /* min-width: 900px; */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 45px;
  line-height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #dfe6e9;
  pointer-events: none;
}
.table_content {
  height: 55px;
  line-height: 55px;
  pointer-events: all;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}
.table li {
  font-weight: 600;
  color: #909399;
  text-align: center;
}
.table_content > div:nth-child(1),
.table li:nth-child(1) {
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}
.table_content > div:nth-child(2),
.table_content > div:nth-child(3),
.table_content > div:nth-child(4),
.table_content > div:nth-child(5),
.table_content > :nth-child(6),
.table li:nth-child(2),
.table li:nth-child(3),
.table li:nth-child(4),
.table li:nth-child(5),
.table li:nth-child(6) {
  width: 180px;
  text-align: center;
  margin: 0 auto;
}
.oddRow {
  background-color: rgba(244, 244, 244, 0.5);
}
.oddRow:hover {
  background-color: rgba(233, 233, 233, 1);
}
.evenRow {
  background-color: rgba(15, 188, 249, 0.1);
}
.evenRow:hover {
  background-color: rgb(148, 218, 243, 0.5);
}

.table_content .delbtn {
  opacity: 0.8;
  transition: all 0.6s ease;
}
.table_content:hover .delbtn {
  opacity: 1;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
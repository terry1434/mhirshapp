<template>
  <div class="container">
    <h3>手续费输入画面</h3>
    <div class="menubar">
      <div class="ctrlbar">
        <el-row>
          <el-button
            size="small"
            type="primary"
            @click="addItemDialogVisible = true"
            :disabled="disableSubmit"
          >追加</el-button>
          <el-button size="small" type="primary" @click="handelSave" :disabled="disableSave">暂存</el-button>
          <el-button size="small" type="primary" @click="handelSubmit" :disabled="disableSubmit">提交</el-button>
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
      <ul class="table">
        <li>科目</li>
        <li>基准</li>
        <li>变更前</li>
        <li>变更后</li>
        <li>幅度</li>
        <li>操作</li>
      </ul>
      <ul style="width:100%;padding:0;margin:0;overflow:hidden">
        <!-- 动画默认的【v-前缀】会替换成【name】属性 -->
        <transition-group name="v-table">
          <li
            v-for="(item,index) in tabelData"
            :key="item.id"
            class="table table_content"
            :class="{evenRow:index%2==1,oddRow:index%2==0}"
          >
            <div>
              <el-popover trigger="click" placement="top">
                <p>业务ID: {{ item.id }}</p>
                <p>业务名: {{ item.kbnName }}</p>
                <p>业务分类A: {{ item.ken1 }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ item.ken2 }}</el-tag>
                </div>
              </el-popover>
            </div>
            <div>
              <span>{{item.baseRate}}</span>
            </div>
            <div>
              <span>{{item.oldRate}}</span>
            </div>
            <div>
              <el-input type="text" v-model="item.rate" :disabled="isSubmit"></el-input>
            </div>
            <div>
              <el-input type="text" v-model="item.spread" :disabled="isSubmit"></el-input>
            </div>
            <div class="delbtn">
              <el-popconfirm title="确定删除吗？" @onConfirm="deleteRow(index)">
                <el-button
                  slot="reference"
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  :disabled="isSubmit"
                ></el-button>
              </el-popconfirm>
            </div>
          </li>
        </transition-group>
      </ul>
    </div>
    <el-dialog
      title="添加手续费科目"
      :visible.sync="addItemDialogVisible"
      :destroy-on-close="true"
      width="800px"
    >
      <!-- 为了每次打开pop刷新被添加进画面的数据状态，使用key每次刷新级联菜单 -->
      <el-cascader-panel
        ref="treeItems"
        :options="itemsNode"
        :props="{ multiple: true }"
        v-model="selectedItemNode"
        :key="timestamp"
        style="width:100%;"
      >
        <template slot-scope="{ node, data }">
          <span>{{ data.label }}</span>
          <span v-if="!node.isLeaf">({{ data.children.length }})</span>
        </template>
      </el-cascader-panel>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addItemDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRows">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import {
  resetCascaderOrgin,
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
    const { kbnName, ken1, ken2 } = this.tabelData.splice(index, 1)[0];
    clearDisableCascader([kbnName, ken1, ken2], this.itemsNode);
    this.$message.success("删除成功");
    this.timestamp = new Date().getTime();
  }
  addRows() {
    const selectList = this.$refs.treeItems.getCheckedNodes();
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
    this.$refs.treeItems.clearCheckedNodes();
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 10px;
  margin-right: 20px;
  padding-top: 5px;
  padding-left: 20px;
  overflow-x: auto;
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
}
.table li {
  font-size: 14px;
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

.v-table-enter,
.v-table-leave-to {
  opacity: 0;
  transform: translateX(80px);
}
.v-table-enter-active,
.v-table-leave-active {
  transition: all 0.6s ease;
}
.v-table-move {
  transition: all 0.6s ease;
}

.v-table-leave-active {
  position: absolute;
}
</style>
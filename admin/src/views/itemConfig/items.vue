<template>
  <div class="main">
    <h3>维护项目一览</h3>
    <div style="margin-bottom:10px;">
      <el-cascader
        v-model="searchCondition"
        size="mini"
        style="margin-right:10px;"
        :options="options"
        :props="{ checkStrictly: true }"
        clearable
        @change="cascaderChange"
      ></el-cascader>
      <el-button size="mini" icon="el-icon-search" type @click="handleSearch()">搜索</el-button>
      <el-button size="mini" type="primary" @click="handleInsert()" icon="el-icon-plus">添加</el-button>
    </div>
    <transition>
      <el-table
        :data="data.data"
        stripe
        border
        style="width: 100%"
        max-height="585"
        v-loading="loading"
        :highlight-current-row="true"
      >
        <el-table-column :prop="'_id'" v-if="false"></el-table-column>
        <el-table-column
          v-for="(field,name,index) in fields"
          :prop="name"
          :key="index"
          :label="field.label"
          :width="field.width"
        ></el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button-group>
              <el-tooltip class="item" effect="dark" content="更新" :open-delay="600" placement="top">
                <el-button
                  type="primary"
                  size="mini"
                  @click="$router.push(`itemEdit/${scope.row._id}`)"
                  icon="el-icon-edit"
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="复写" :open-delay="600" placement="top">
                <el-button
                  type="success"
                  size="mini"
                  @click="$router.push(`itemCreate/${scope.row._id}`)"
                  icon="el-icon-plus"
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" :open-delay="600" placement="top">
                <el-popconfirm title="确定删除吗？" @onConfirm="handleDelete(scope.$index, scope.row)">
                  <el-button
                    slot="reference"
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                  ></el-button>
                </el-popconfirm>
              </el-tooltip>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </transition>
    <div style="display:flex;justify-content:flex-end;margin-top:5px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="datatotal"
        background
      ></el-pagination>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { resetCascaderOrgin } from "../../common/common";
@Component({})
export default class Items extends Vue {
  data: any = {};
  searchCondition: any = {};
  loading: boolean = true;
  fields: any = {
    kbnId: { label: "业务ID" },
    kbnName: { label: "大分类" },
    ken1: { label: "中分类" },
    ken2: { label: "小分类" },
    ctlType: { label: "控件类型" },
    ctlAttr1: { label: "控件属性1" },
    ctlAttr2: { label: "控件属性2" }
  };
  datatotal: number = 0; //总件数
  currentPage: number = 0; //当前页
  pagesize: number = 5; //每页显示
  //级联选择器的数据源
  options: any = [];
  //检索数据库条件项
  query: any = {
    limit: this.pagesize,
    skip: 0,
    sort: { kbnId: 1, ken1: 1, ken2: 1 }
  };
  async fetch() {
    console.log(this.query);
    const res = await this.$http.get("/category", {
      params: {
        query: this.query
      }
    });
    this.data = res.data;
    this.loading = false;
    this.datatotal = res.data.total;
    this.currentPage = 0;
    //整理级联选择器数据源
    //元数据必须已根据kbnName,ken1,ken2排序
    const condition = await this.$http.get("/category", {
      params: {
        query: {
          limit: 1000,
          sort: { kbnId: 1, ken1: 1, ken2: 1 }
        }
      }
    });
    this.options = resetCascaderOrgin(condition);
  }
  created() {
    this.fetch();
  }
  handleInsert() {
    this.$router.push("itemCreate");
  }

  async handleDelete(index: number, currentrow: any) {
    await this.$http.delete(`/category/${currentrow._id}`);
    this.$message.success("删除成功");
    this.fetch();
  }

  handleSizeChange(val: number) {
    this.query.limit = val;
    this.fetch();
  }
  handleCurrentChange(val: number) {
    this.query.skip = (val - 1) * this.pagesize;
    this.fetch();
  }
  //级联选择器获取搜索条件
  cascaderChange() {
    this.handleSearch();
  }
  //搜索事件
  handleSearch() {
    this.query.where = {};
    this.query.skip = 0;
    this.searchCondition[0]
      ? (this.query.where.kbnName = this.searchCondition[0])
      : null;
    this.searchCondition[1]
      ? (this.query.where.ken1 = this.searchCondition[1])
      : null;
    this.searchCondition[2]
      ? (this.query.where.ken2 = this.searchCondition[2])
      : null;
    this.fetch();
  }
}
</script>

<style scoped>

</style>
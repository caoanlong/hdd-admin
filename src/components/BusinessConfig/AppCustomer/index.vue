<template>
<div class="main-content">
    <el-card class="box-card">
        <div slot="header" class="clearfix">App客户列表</div>
        <div class="search">
            <el-form :inline="true" class="demo-form-inline" size="small">
                <el-form-item label="关键字">
                    <el-input placeholder="请输入关键字" v-model="findKeyword"></el-input>
                </el-form-item>
                <el-form-item label="使用状态">
                    <el-select placeholder="请选择" v-model="findStatus">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="使用中" value="Y"></el-option>
                        <el-option label="已停用" value="N"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList()">查询</el-button>
                    <el-button type="default" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tableControl">
            <el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
        </div>
        <div class="table">
            <el-table :data="tableData" border style="width: 100%" size="mini">
				<el-table-column label="App客户ID" align="center" prop="appCstID"></el-table-column>
                <el-table-column label="客户名称" align="center" prop="customerName"></el-table-column>
                <el-table-column label="使用状态" align="center">
                    <template slot-scope="scope">
                        <el-tag size="mini" v-if="scope.row.useFlag=='Y'">使用中</el-tag>
                        <el-tag size="mini" type="warning" v-else>已停用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="修改人" align="center" prop="updateByName">
                </el-table-column>
                <el-table-column label="修改时间" align="center" width="140">
                    <template slot-scope="scope">
                        <span v-if="scope.row.updateTime">{{ new Date(scope.row.updateTime).getTime() | getdatefromtimestamp() }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="160">
                    <template slot-scope="scope">
                        <el-button size="mini" icon="el-icon-edit" @click="edit(scope.row.appCstID)">编辑</el-button>
                        <el-button size="mini" icon="el-icon-check" @click="Confirm(scope.row.appCstID,'Y')" v-if="scope.row.useFlag=='N'">启用</el-button>
                        <el-button size="mini" icon="el-icon-close" @click="Confirm(scope.row.appCstID,'N')" v-else>停用</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange" />
        </div>
    </el-card>
    <el-dialog title="添加App客户" :visible.sync="addCustomerDialog" :append-to-body="true">
        <el-form label-width="100px" :model="newCustomer" :rules="rules" ref="addCustomer">
            <el-form-item label="客户名称" prop="customerName">
                <el-input placeholder="请输入客户名称" v-model="newCustomer.customerName"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="text-center">
            <el-button @click="addCustomerDialog = false">取消</el-button>
            <el-button type="primary" @click="save">保存</el-button>
        </div>
    </el-dialog>
    <el-dialog title="编辑App客户" :visible.sync="editCustomerDialog" :append-to-body="true">
        <el-form label-width="100px" :model="customerDetail" :rules="rules" ref="ruleForm">
            <el-form-item label="客户名称" prop="customerName">
                <el-input placeholder="请输入客户名称" v-model="customerDetail.customerName"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="text-center">
            <el-button @click="editCustomerDialog = false">取消</el-button>
            <el-button type="primary" @click="modify">保存</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import { Message } from "element-ui";
import { baseMixin } from "../../../common/mixin";
import SetAppcustomer from "../../../api/SetAppcustomer";
export default {
  mixins: [baseMixin],
  data() {
    return {
      findKeyword: "",
      findStatus: "",
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      addCustomerDialog: false,
      editCustomerDialog: false,
      customerDetail: {
        appCstID: "",
        customerName: "",
        deleteFlag: "",
        useFlag: ""
      },
      newCustomer: {
        customerName: ""
      },
      rules: {
        customerName: [
          {
            required: true,
            message: "请输入客户名称"
          }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    pageChange(index) {
      this.pageIndex = index;
      this.getList();
    },
    pageSizeChange(size) {
      this.pageSize = size;
      this.getList();
    },
    reset() {
      this.findKeyword = "";
      this.findStatus = "";
      this.pageIndex = 1;
      this.pageSize = 10;
      this.getList();
    },
    getList() {
      SetAppcustomer.find({
        keyword: this.findKeyword,
        useFlag: this.findStatus,
        pageNum: this.pageIndex,
        pageSize: this.pageSize
      }).then(res => {
        this.total = res.total;
        this.tableData = res.list;
      });
    },
    getInfo(appCstID) {
      SetAppcustomer.findById({
        appCstID
      }).then(res => {
        this.customerDetail = res;
      });
    },
    add() {
      this.addCustomerDialog = true;
    },
    edit(appCstID) {
      this.editCustomerDialog = true;
      this.getInfo(appCstID);
    },
    Confirm(appCstID, val) {
      this.$confirm("此操作将改变用户使用状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.changeStatus(appCstID, val);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    changeStatus(appCstID, val) {
      SetAppcustomer.switchOperation({
        appCstID,
        useFlag: val
      }).then(res => {
        if (res.data.code == 200) {
          Message.success(res.data.message);
          this.getList();
        } else {
          Message.error(res.data.message);
        }
      });
    },
    save() {
      this.$refs["addCustomer"].validate(valid => {
        if (valid) {
          SetAppcustomer.save({
            customerName: this.newCustomer.customerName
          }).then(res => {
            if (res.data.code == 200) {
              Message.success(res.data.message);
              this.addCustomerDialog = false;
              this.$refs["addCustomer"].resetFields();
              this.getList();
            } else {
              Message.error(res.data.message);
            }
          });
        }
      });
    },
    modify() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          SetAppcustomer.save({
            appCstID: this.customerDetail.appCstID,
            customerName: this.customerDetail.customerName,
            deleteFlag: this.customerDetail.deleteFlag,
            useFlag: this.customerDetail.useFlag
          }).then(res => {
            if (res.data.code == 200) {
              Message.success(res.data.message);
              this.editCustomerDialog = false;
              this.getList();
            } else {
              Message.error(res.data.message);
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>

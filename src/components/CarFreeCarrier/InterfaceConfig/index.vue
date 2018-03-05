<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>无车承运接口配置</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="appKey：">
						<el-input placeholder="appKey"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary">查询</el-button>
						<el-button type="default">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="addInterfaceConfig">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-refresh">刷新</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column label="企业名称"></el-table-column>
					<el-table-column label="企业接入码"></el-table-column>
					<el-table-column label="Appkey"></el-table-column>
					<el-table-column label="报文功能代码"></el-table-column>
					<el-table-column label="报文版本号"></el-table-column>
					<el-table-column label="接收方代码"></el-table-column>
					<el-table-column label="用户名"></el-table-column>
					<el-table-column label="操作" width="280" align="center">
						<template slot-scope="scope">							
							<el-button type="default" size="mini" icon="el-icon-view" @click="viewInterfaceConfig(scope.row.smsTemplateId)">查看</el-button>
							<el-button type="default" size="mini" icon="el-icon-edit" @click="editInterfaceConfig(scope.row.smsTemplateId)">修改</el-button>
							<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.row.smsTemplateId)"> 删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getList()">
							<el-option label="10" value="10"></el-option>
							<el-option label="20" value="20"></el-option>
							<el-option label="30" value="30"></el-option>
							<el-option label="40" value="40"></el-option>
							<el-option label="50" value="50"></el-option>
							<el-option label="100" value="100"></el-option>
						</el-select>
						<span>条记录</span>
					</el-col>
					<el-col :span="12">
						<div class="pagination">
							<el-pagination :page-size="pageSize" align="right" background layout="prev, pager, next" :total="count" @current-change="pageChange"></el-pagination>
						</div>
					</el-col>
				</el-row>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import requestJava from '../../../common/requestJava'
import { Message } from 'element-ui'
export default {
	data() {
		return {
			pageNum: 1,
			pageSize: 10,
			count: 0,
			tableData: [],
			selectedInterfaceConfigs: []
		}
	},
	methods: {
		pageChange(index) {
			// this.getList(index)
		},
		selectionChange(data) {
			this.selectedInterfaceConfigs = data.map(item => item.smsTemplateId)
		},
		viewInterfaceConfig(smsTemplateId) {
			this.$router.push({name: 'viewinterfaceconfig', query: {smsTemplateId}})
		},
		editInterfaceConfig(smsTemplateId) {
			this.$router.push({name: 'editinterfaceconfig', query: {smsTemplateId}})
		},
		addInterfaceConfig() {
			this.$router.push({name: 'addinterfaceconfig'})
		},
		deleteConfirm(id) {
			let ids = ''
			if (id && typeof id == 'string') {
				ids = id
			} else {
				ids = this.selectedInterfaceConfigs.join(',')
			}
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delInterfaceConfig(ids)
				this.$message({
					type: 'success',
					message: '删除成功!'
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				})
			})
		},
		delInterfaceConfig(smsTemplateIds) {
			console.log(smsTemplateIds)
			let data = {
				smsTemplateIds
			}
			requestJava({
				url: '/sysSmsTemplate/del',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 200) {
					this.getList()
				} else {
					Message.error(res.data.message)
				}
			})
		}
	}
}

</script>
<style lang="stylus" scoped>

</style>

<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>标准常量列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="常量类型" >
						<el-select placeholder="请选择" v-model="findType" class="constantSelect">
							<el-option v-for="item in ConstantTypeList" :key="item.VALUE" :label="item.VALUE" :value="item.VALUE">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="名称">
						<el-input placeholder="名称" v-model="findName"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click.native="AddConstant">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click.native="deleteConfirm">批量删除</el-button>
				<!-- <upload-excel btnType="default" btnTxt="导入" @on-selected-file="onSelectedFile"/> -->
				<el-button type="default" size="mini" icon="el-icon-download" :loading="downloadLoading" @click.native="exportExcel">导出</el-button>
				<!-- <a href="../../../../../static/constant_template.xlsx" download="constant_template.xlsx" class="download-btn"><svg-icon iconClass="excel-icon"></svg-icon> 下载模板</a> -->
			</div>
			<div class="table">
				<el-table :data="constants" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column label="Id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="常量类型" prop="Type"></el-table-column>
					<el-table-column label="代码" prop="Code"></el-table-column>
					<el-table-column label="名称" prop="Name"></el-table-column>
					<el-table-column label="值" prop="Value"></el-table-column>
					<el-table-column label="描述" prop="Description"></el-table-column>
					<el-table-column label="排序" prop="SortNumber" width="60" align="center"></el-table-column>
					<el-table-column label="更新人" prop="UpdateBy" width="100" align="center"></el-table-column>
					<el-table-column label="更新日期" align="center" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.UpdateTime">{{ new Date(scope.row.UpdateTime).getTime() | getdatefromtimestamp() }}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="230" align="center">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-view" @click="viewConstant(scope.row.ConstStd_ID)">查看</el-button>
							<el-button size="mini" icon="el-icon-edit" @click="editConstant(scope.row.ConstStd_ID)">编辑</el-button>
							<el-button size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.row.ConstStd_ID)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="count" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import request from '../../../../common/request'
import { Message } from 'element-ui'
import UploadExcel from '../../../CommonComponents/UploadExcel'
import { validUploadFile } from '../../../../common/utils'
import Page from '../../../CommonComponents/Page'
const userMap = {
	'常量类型':'Type',
	'代码':'Code',
	'名称':'Name',
	'值':'Value',
	'描述':'Description',
	'排序':'SortNumber'
}
export default {
	data() {
		return {
			downloadLoading: false,
			filename: '基础常量',
			constants: [],
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			selectedConstants: [],
			ConstantTypeList:[],
			findType:'',
			findName: '',
		}
	},
	components: { UploadExcel, Page },
	created() {
		this.getList()
		this.getConstantType()
	},
	methods: {
		exportExcel() {
			this.downloadLoading = true
			import('../../../../common/Export2Excel').then(excel => {
				const tHeader = ['常量类型','代码','名称','值','描述','排序']
				const filterVal = [userMap['常量类型'], userMap['代码'], userMap['名称'], userMap['值'], userMap['描述'], userMap['排序']]
				const data = this.formatJson(filterVal, this.constants)
				excel.export_json_to_excel(tHeader, data, this.filename)
				this.downloadLoading = false
			})
		},
		formatJson(filterVal, jsonData) {
			return jsonData.map(v => filterVal.map(j => {
				if (j === 'timestamp') {
					return parseTime(v[j])
				} else {
					return v[j]
				}
			}))
		},
		// 选择导入文件
		onSelectedFile(result) {
			validUploadFile(result, userMap, [
				'常量类型', '代码', '名称', '值'
			]).then(res => {
				this.addMutiple(res)
			}).catch(err => {
				Message.error(err)
			})
		},
		// 导入
		addMutiple(consts) {
			let data = {
				consts: consts,
			}
			request({
				url: '/base_conststand/addmutip',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					Message.success(res.data.msg)
					this.getList()
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.getList() 
		},
		reset() {
			this.findType = ''
			this.findName = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getConstantType() {
			let params = {
				TYPE:'base_constsand'
			}
			request({
				url: '/sys_dict/list/type',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.ConstantTypeList = res.data.data
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		getList() {
			let params = {
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				Type: this.findType,
				Name: this.findName
			}
			request({
				url: '/base_conststand/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.count = res.data.data.count
					this.constants = res.data.data.rows
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		AddConstant() {
			this.$router.push({ name: 'addconstant' })
		},
		deleteConfirm(id) {
			let ids = []
			if (id && typeof id == 'string') {
				ids = [].concat(id)
			} else {
				if (this.selectedConstants.length == 0) {
					this.$message({
						type: 'warning',
						message: '请选择'
					})
					return
				}
				ids = this.selectedConstants
			}
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delConstants(ids)
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
		delConstants(ids) {
			let data = {
				ids: ids
			}
			request({
				url: '/base_conststand/delete',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					this.getList()
				} else {
					Message.error(res.data.msg)
				}
			})
		},

		editConstant(id) {
			this.$router.push({ name: 'editconstant', query: { ConstStd_ID: id} })
		},
		viewConstant(id) {
			this.$router.push({ name: 'viewconstant', query: { ConstStd_ID: id} })
		},
		selectionChange(data) {
			this.selectedConstants = data.map(item => item.ConstStd_ID)
		}
	}
}

</script>
<style lang="stylus" scoped>
.download-btn
	font-size 12px
	color #606266
	height 29px
	line-height 29px
	padding 0 15px
	border 1px solid #dcdfe6
	border-radius 3px
	background #fff
	margin 0 10px
	display inline-block
	&:hover
		border-color #c6e2ff
		color #409eff
		background #ecf5ff
	&:active
		border-color #3a8ee6
		color #3a8ee6
</style>

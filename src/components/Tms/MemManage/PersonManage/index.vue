<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>人员列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="姓名">
						<el-input placeholder="请输入..." v-model="findCode"></el-input>
					</el-form-item>
					<el-form-item label="联系电话">
						<el-input placeholder="请输入..." v-model="findName"></el-input>
					</el-form-item>
					<el-form-item label="评级">
						<el-input placeholder="请输入..." v-model="findName"></el-input>
					</el-form-item>
					<el-form-item label="岗位">
						<el-input placeholder="请输入..." v-model="findName"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click.native="getPersonList(1)">查询</el-button>
						<el-button type="default" @click.native="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<!-- <el-button type="default" size="mini" icon="el-icon-plus" @click.native="addTmsPerson">添加</el-button> -->
				<el-button type="default" size="mini" icon="el-icon-delete" @click.native="deleteConfirm">批量删除</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
					<el-table-column label="姓名" prop="realName"></el-table-column>
					<el-table-column label="性别" prop="sex"></el-table-column>
					<el-table-column label="聘用岗位" prop="position"></el-table-column>
					<el-table-column label="身份证号" prop="idCardNum"></el-table-column>
					<el-table-column label="创建人" prop="createName"></el-table-column>
					<el-table-column label="状态" prop="status"></el-table-column>
					<el-table-column label="审核人" prop="auditName"></el-table-column>
					<el-table-column label="审核日期" prop="auditTime"></el-table-column>
					<el-table-column label="准驾车型" prop="quasiDrivingType"></el-table-column>
					<el-table-column label="驾驶证审验有效期至" prop="driverLicExamineEndTime"></el-table-column>
					<el-table-column label="从业资格证件号" prop="qualificationCode"></el-table-column>
					<el-table-column label="从业资格类别" prop="qualificationType"></el-table-column>
					<el-table-column label="从业资格证有效期至" prop="qualificationExpirationTime"></el-table-column>
					<el-table-column label="初次发证件时间" prop="driverLicenseFirstTime"></el-table-column>
					<el-table-column label="诚信考核等级" prop="integrityExamineGrade"></el-table-column>
					<el-table-column label="诚信考核有效期至" prop="integrityExamineEndTime"></el-table-column>
					<el-table-column label="合同有效期起" prop="laborContractBeginTime"></el-table-column>
					<el-table-column label="合同有效期至" prop="laborContractEndTime"></el-table-column>
					<el-table-column label="职称或技术等级" prop="titleLever"></el-table-column>
					<el-table-column label="联系电话" prop="mobile"></el-table-column>
					<el-table-column label="家庭地址" prop="homeAddress"></el-table-column>
					<el-table-column label="备注说明" prop="remark"></el-table-column>
					
					<el-table-column label="操作" width="230" align="center" fixed="right">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-view" @click="viewTmsPerson(scope.row.staffID)">查看</el-button>
							<el-button size="mini" icon="el-icon-edit" @click="editTmsPerson(scope.row.staffID)">编辑</el-button>
							<el-button size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.row.staffID)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{total}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getPersonList()">
							<el-option label="10" :value="10"></el-option>
							<el-option label="20" :value="20"></el-option>
							<el-option label="30" :value="30"></el-option>
							<el-option label="40" :value="40"></el-option>
							<el-option label="50" :value="50"></el-option>
							<el-option label="100" :value="100"></el-option>
						</el-select>
						<span>条记录</span>
					</el-col>
					<el-col :span="12">
						<div class="pagination">
							<el-pagination :page-size="pageSize" align="right" background layout="prev, pager, next" :total="total" @current-change="pageChange"></el-pagination>
						</div>
					</el-col>
				</el-row>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import requestJava, { javaUrl } from '../../../../common/requestJava'
import { Message } from 'element-ui'
export default {
	data() {
		return {
			refreshing: false,
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			tableData: [],
			selectedTruckBrands: [],
			findCode:'',
			findName: '',
		}
	},
	created() {
		this.getPersonList()
	},
	methods: {
		pageChange(index) {
			this.getPersonList(index)
		},
		// 重置搜索表单
		reset() {
			this.findCode = ''
			this.findName = ''
		},
		getPersonList() {
			let params = {
				current: this.pageIndex || 1,
				size: this.pageSize
			}
			requestJava({
				url: '/notruckWaybill/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 200) {
					this.total = res.data.data.total
					this.tableData = res.data.data.list
				} else {
					Message.error(res.data.message)
				}
			})
		},
		deleteConfirm(id) {
			let ids = []
			if (id && typeof id == 'string') {
				ids = [].concat(id)
			} else {
				if (this.selectedTruckBrands.length == 0) {
					this.$message({
						type: 'warning',
						message: '请选择'
					})
					return
				}
				ids = this.selectedTruckBrands
			}
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delTruckBrands(ids)
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
		delTruckBrands(ids) {
			let data = {
				ids: ids
			}
			request({
				url: '/base_truckbrand/delete',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					this.getPersonList()
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		addTmsPerson() {
			this.$router.push({name: 'addtmsperson'})
		},
		editTmsPerson(staffID) {
			this.$router.push({ name: 'edittmsperson', query: {staffID} })
		},
		viewTmsPerson(staffID) {
			this.$router.push({ name: 'viewtmsperson', query: {staffID} })
		},
		selectionChange(data) {
			this.selectedTruckBrands = data.map(item => item.staffID)
		},
		previewImg(imgUrl) {
			this.$alert(`<img style="width: 100%" src=${imgUrl} />`, '图片预览', {
				dangerouslyUseHTMLString: true,
				showConfirmButton: false,
				customClass: 'img-preview'
			})
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
.table-img
	width 30px
	cursor pointer
</style>

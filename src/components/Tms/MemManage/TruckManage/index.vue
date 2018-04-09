<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>车辆列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="车牌号">
						<el-input placeholder="请输入..." v-model="findCode"></el-input>
					</el-form-item>
					<el-form-item label="车辆编号">
						<el-input placeholder="请输入..." v-model="findName"></el-input>
					</el-form-item>
					<el-form-item label="牵引质量">
						<el-input placeholder="请输入..." v-model="findName"></el-input>
					</el-form-item>
					<el-form-item label="车长">
						<el-input placeholder="请输入..." v-model="findName"></el-input>
					</el-form-item>
					<el-form-item label="车宽">
						<el-input placeholder="请输入..." v-model="findName"></el-input>
					</el-form-item>
					<el-form-item label="车高">
						<el-input placeholder="请输入..." v-model="findName"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click.native="getTruckBrands(1)">查询</el-button>
						<el-button type="default" @click.native="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click.native="addTmsTruck">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click.native="deleteConfirm">批量删除</el-button>
			</div>
			<div class="table">
				<el-table :data="truckBrands" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
					<el-table-column label="所属地区" prop="Code"></el-table-column>
					<el-table-column label="所性企业" prop="Code"></el-table-column>
					<el-table-column label="自编号" prop="Code"></el-table-column>

					<el-table-column label="车牌号" prop="Code"></el-table-column>
					<el-table-column label="车牌颜色" prop="Code"></el-table-column>
					<el-table-column label="车辆类别" prop="Code"></el-table-column>
					<el-table-column label="车辆类型" prop="Code"></el-table-column>
					<el-table-column label="道路运输证号" prop="Code"></el-table-column>

					<el-table-column label="经营范围" prop="Code"></el-table-column>
					<el-table-column label="道路运输证年审期至" prop="Code"></el-table-column>
					<el-table-column label="行驶证审验效期至" prop="Code"></el-table-column>

					<el-table-column label="承运人责任险有效期至" prop="Code"></el-table-column>
					<el-table-column label="等级评定" prop="Code"></el-table-column>
					<el-table-column label="下次等评日期" prop="Code"></el-table-column>
					<el-table-column label="二级维护日期" prop="Code"></el-table-column>
					<el-table-column label="下次二级维护日期" prop="Code"></el-table-column>

					<el-table-column label="载重" prop="Code"></el-table-column>
					<el-table-column label="罐体类型" prop="Code"></el-table-column>
					<el-table-column label="罐体容积" prop="Code"></el-table-column>
					<el-table-column label="罐体检测有效期至" prop="Code"></el-table-column>
					<el-table-column label="安全阀检测有效期至" prop="Code"></el-table-column>

					<el-table-column label="压力表检测有效期至" prop="Code"></el-table-column>
					<el-table-column label="挂车车牌" prop="Code"></el-table-column>
					<el-table-column label="汽车生产厂家" prop="Code"></el-table-column>
					<el-table-column label="品牌型号" prop="Code"></el-table-column>
					<el-table-column label="发动机号" prop="Code"></el-table-column>
					<el-table-column label="车架号" prop="Code"></el-table-column>
					<el-table-column label="行驶证注册日期" prop="Code"></el-table-column>
					<el-table-column label="行驶证发证日期" prop="Code"></el-table-column>
					<el-table-column label="牵引质量" prop="Code"></el-table-column>
					<el-table-column label="车长" prop="Code"></el-table-column>
					<el-table-column label="车宽" prop="Code"></el-table-column>
					<el-table-column label="车高" prop="Name"></el-table-column>
					<el-table-column label="操作" width="230" align="center" fixed="right">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-view" @click="viewTmsTruck(scope.row.TruckBrand_ID)">查看</el-button>
							<el-button size="mini" icon="el-icon-edit" @click="editTmsTruck(scope.row.TruckBrand_ID)">编辑</el-button>
							<el-button size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.row.TruckBrand_ID)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getTruckBrands()">
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
import request from '../../../../common/request'
import { Message } from 'element-ui'
export default {
	data() {
		return {
			refreshing: false,
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			truckBrands: [],
			selectedTruckBrands: [],
			findCode:'',
			findName: '',
		}
	},
	created() {
		this.getTruckBrands()
	},
	methods: {
		pageChange(index) {
			this.getTruckBrands(index)
		},
		// 重置搜索表单
		reset() {
			this.findCode = ''
			this.findName = ''
		},
		getTruckBrands(pageIndex) {
			let params = {
				pageIndex: pageIndex || 1,
				pageSize: this.pageSize,
				Code: this.findCode,
				Name: this.findName
			}
			request({
				url: '/base_truckbrand/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.count = res.data.data.count
					this.truckBrands = res.data.data.rows
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		deleteConfirm(id) {
			let ids = []
			if (id && typeof id == 'string') {
				ids = [].concat(id)
			} else {
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
					this.getTruckBrands()
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		addTmsTruck() {
			this.$router.push({name: 'addtmstruck'})
		},
		editTmsTruck(TruckBrand_ID) {
			this.$router.push({ name: 'edittmstruck', query: {TruckBrand_ID} })
		},
		viewTmsTruck(TruckBrand_ID) {
			this.$router.push({ name: 'viewtmstruck', query: {TruckBrand_ID} })
		},
		selectionChange(data) {
			this.selectedTrucks = data.map(item => item.TruckBrand_ID)
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

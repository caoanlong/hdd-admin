<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>申请列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="关键字：">
						<el-input placeholder="关键字"></el-input>
					</el-form-item>
					<el-form-item label="状态：">
						<el-select placeholder="请选择" style="width:100px" value=''>
							<el-option label="启用" value="启用"></el-option>
							<el-option label="封停" value="封停"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary">查询</el-button>
						<el-button type="default">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column label="账号" prop="memberType">
					</el-table-column>
					<el-table-column label="账号" prop="memberType">
					</el-table-column>
					<el-table-column label="姓名" prop="name">
					</el-table-column>
					<el-table-column label="身份证号" align="center" prop="mobilePhone">
					</el-table-column>
					<el-table-column label="状态" prop="accountTitle">
					</el-table-column>
					<el-table-column label="申请时间" align="center" prop="regDate" width="140">
					</el-table-column>
					</el-table-column>
					<el-table-column label="审批人" align="center" prop="status">
					</el-table-column>
					<el-table-column label="审批时间" align="center" prop="creatDate" width="140">
					</el-table-column>
					<el-table-column label="操作" width="160" align="center">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-view" @click="viewUser(scope.row.User_ID)">查看</el-button>
							<el-button type="default" size="mini" @click="editUser(scope.row.User_ID)">
								<svg-icon icon-class="approve-icon"></svg-icon> 审批
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination">
					<el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
				</div>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import requestJava from '../../../common/requestJava'
export default {
	data() {
		return {
			tableData: [{
				memberType: '物流企业',
				name: '曹阿龙',
				accountTitle: '深圳市曹阿龙老司机有限公司',
				mobilePhone: '13049497395',
				regDate: '2017-10-10 21:05:07',
				lastvisitDate: '2018-01-23 11:23:15',
				creatDate: '2017-10-11 09:15:27',
				handler: 'admin',
				status: '启用',
				certificateStatus: '',
				address: '上海市普陀区金沙江路 1518 弄'
			}]
		}
	},
	created() {
		this.getRequestList()
	},
	methods: {
		getRequestList(pageIndex) {
			console.log(1)
			let params = {
				pageIndex: pageIndex || 1,
				pageSize: this.pageSize
			}
			requestJava({
				url: '/customerservice/payRealNameApply/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.count = res.data.data.count
					this.roles = res.data.data.rows
					this.setRouteQuery({
						pageIndex: res.data.data.pageIndex,
						pageSize: res.data.data.pageSize,
					})
				} else {
					Message.error(res.data.msg)
				}
			})
		}
	}
}

</script>
<style lang="stylus">
.table
	p
		margin 0
		padding 0
</style>

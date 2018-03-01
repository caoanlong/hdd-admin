<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>提现管理</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="手机号：">
						<el-input placeholder="会员类型"></el-input>
					</el-form-item>
					<el-form-item label="认证状态：">
						<el-select placeholder="请选择" style="width:100px" value=''>
							<el-option label="草稿" value="草稿"></el-option>
							<el-option label="待审核" value="待审核"></el-option>
							<el-option label="拒绝" value="拒绝"></el-option>
							<el-option label="处理中" value="处理中"></el-option>
							<el-option label="成功" value="成功"></el-option>
							<el-option label="失败" value="失败"></el-option>
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
					<el-table-column label="提现单号" prop="memberType" width="100">
					</el-table-column>
					<el-table-column label="提现时间" prop="name" width="100">
					</el-table-column>
					<el-table-column label="手机号" align="center" prop="mobilePhone" width="100">
					</el-table-column>
					<el-table-column label="姓名" prop="accountTitle">
					</el-table-column>
					<el-table-column label="提现金额" align="center" prop="regDate" width="140">
					</el-table-column>
					<el-table-column label="手续费" align="center" prop="lastvisitDate" width="140">
					</el-table-column>
					<el-table-column label="卡号" align="center" prop="status" width="80">
					</el-table-column>
					<el-table-column label="状态" align="center" prop="creatDate" width="140">
					</el-table-column>
					<el-table-column label="审批时间" align="center" prop="handler" width="100">
					</el-table-column>
					<el-table-column label="审批人">
					</el-table-column>
					<el-table-column label="操作" width="150" align="center">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-view" @click="viewUser(scope.row.User_ID)">查看</el-button>
							<el-button type="default" size="mini">
								<svg-icon icon-class="approve-icon"></svg-icon> 审核
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
	}
}

</script>
<style lang="stylus">
.table
	p
		margin 0
		padding 0
</style>

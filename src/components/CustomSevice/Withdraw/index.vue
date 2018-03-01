<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>提现管理</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="手机号：">
						<el-input placeholder="会员类型" v-model="findMobile"></el-input>
					</el-form-item>
					<el-form-item label="状态：">
						<el-select placeholder="请选择" style="width:100px" value=''>
							<el-option label="草稿" value="Draft"></el-option>
							<el-option label="待审核" value="ForAudit"></el-option>
							<el-option label="已拒绝" value="Rejected"></el-option>
							<el-option label="处理中" value="Paying"></el-option>
							<el-option label="失败" value="Failed"></el-option>
							<el-option label="成功" value="Success"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click.native="getList(1)">查询</el-button>
						<el-button type="default" @click.native="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column label="提现单号" prop="cashID" align="center" width="150">
					</el-table-column>
					<el-table-column label="提现时间" align="center" width="140">
						<template slot-scope="scope">
							<span>{{scope.row.cashTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="手机号" align="center" prop="mobile" width="100">
					</el-table-column>
					<el-table-column label="姓名" prop="name">
					</el-table-column>
					<el-table-column label="提现金额" align="center" prop="money">
					</el-table-column>
					<el-table-column label="手续费" align="center" prop="fee" width="140">
					</el-table-column>
					<el-table-column label="卡号" prop="bankCardNum" width="180">
					</el-table-column>
					<el-table-column label="状态" align="center" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.status=='Draft'" style="#909399">草稿</span>
							<span v-else-if="scope.row.status=='ForAudit'" style="#909399">待审核</span>
							<span v-else-if="scope.row.status=='Rejected'" style="color:#F56C6C">已拒绝</span>
							<span v-else-if="scope.row.status=='Paying'" style="color:#409EFF">处理中</span>
							<span v-else-if="scope.row.status=='Success'" style="color:#67C23A">成功</span>
							<span v-else style="color:#E6A23C">失败</span>
						</template>
					</el-table-column>
					<el-table-column label="审批时间" align="center" width="140">
						<template slot-scope="scope">
							<span>{{scope.row.auditTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="审批人" align="center" prop="auditBy" width="100">
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
					<el-pagination background layout="prev, pager, next" :total="count" @current-change="pageChange"></el-pagination>
				</div>
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
			findMobile:''
		}
	},
	created() {
		this.getList()
	},
	methods: {
		pageChange(index) {
			this.getList(index)
		},
		reset() {
			this.findMobile = '',
			this.findAuditStatus = '',
			this.getList()
		},
		getList(pageNum) {
			let params = {
				pageNum: pageNum || 1,
				pageSize: this.pageSize
			}
			requestJava({
				url: '/payCash/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 200) {
					this.count = res.data.data.total
					this.tableData = res.data.data.list
					console.log(res.data)
				} else {
					Message.error(res.data.message)
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

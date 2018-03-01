<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>申请列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="关键字：">
						<el-input placeholder="关键字" v-model="findKeyWords"></el-input>
					</el-form-item>
					<el-form-item label="状态：">
						<el-select placeholder="请选择" v-model="findAuditStatus">
							<el-option label="草稿" value="Draft"></el-option>
							<el-option label="已提交" value="Commited"></el-option>
							<el-option label="成功" value="Success"></el-option>
							<el-option label="失败" value="Failed"></el-option>
							<el-option label="已拒绝" value="Rejected"></el-option>
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
					<el-table-column label="账号" prop="accountCode" width="120">
					</el-table-column>
					<el-table-column label="姓名" prop="realName" width="120">
					</el-table-column>
					<el-table-column label="身份证号" align="center" prop="IDCardNum" width="150">
					</el-table-column>
					<el-table-column label="状态" prop="auditStatus" align="center" width="80">
						<template slot-scope="scope">
							<span v-if="scope.row.auditStatus=='Draft'" style="#909399">草稿</span>
							<span v-else-if="scope.row.auditStatus=='Commited'" style="color:#409EFF">已提交</span>
							<span v-else-if="scope.row.auditStatus=='Success'" style="color:#67C23A">成功</span>
							<span v-else-if="scope.row.auditStatus=='Failed'" style="color:#E6A23C">失败</span>
							<span v-else style="color:#F56C6C">已拒绝</span>
						</template>
					</el-table-column>
					<el-table-column label="申请时间" align="center" width="140">
						<template slot-scope="scope">
							<span>{{scope.row.createTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					</el-table-column>
					<el-table-column label="审批人" align="center" prop="auditBy">
					</el-table-column>
					<el-table-column label="审批时间" align="center" width="140">
						<template slot-scope="scope">
							<span>{{scope.row.auditTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="260">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-view" @click="viewCertification(scope.row.realNameApplyID, scope.row.memID)">查看</el-button>
							<el-button v-if="scope.row.auditStatus=='Commited'" type="default" size="mini" @click="approve(scope.row.realNameApplyID, '')">
								<svg-icon icon-class="approve-icon"></svg-icon> 审核通过
							</el-button>
							<el-button v-if="scope.row.auditStatus=='Commited'" type="default" size="mini" @click="approve(scope.row.realNameApplyID, 'Rejected')">
								<svg-icon icon-class="approve-icon"></svg-icon> 驳回
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
			findKeyWords:'',
			findAuditStatus:''
		}
	},
	created() {
		this.getList()
	},
	methods: {
		pageChange(index) {
			this.getList(index)
		},
		getList(pageNum) {
			let params = {
				pageNum: pageNum || 1,
				pageSize: this.pageSize,
				realName: this.findKeyWords,
				auditStatus:this.findAuditStatus
			}
			requestJava({
				url: '/customerservice/payRealNameApply/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 200) {
					this.count = res.data.data.total
					this.tableData = res.data.data.list
				} else {
					Message.error(res.data.message)
				}
			})
		},
		reset() {
			this.findKeyWords = '',
			this.findAuditStatus = '',
			this.getList()
		},
		viewCertification(realNameApplyID, memID) {
			this.$router.push({ name: 'viewcertification', query: { realNameApplyID, memID} })
		},
		approve(realNameApplyID, flag) {
			let data = {
				realNameApplyID,
				flag
			}
			requestJava({
				url: '/customerservice/payRealNameApply/approve',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 200) {
					Message.success(res.data.msg)
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

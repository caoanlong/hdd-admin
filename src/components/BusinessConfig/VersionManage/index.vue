<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>APP版本列表</span>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="addVersion">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>
				<el-button type="default" size="mini" icon="el-icon-refresh" :loading="refreshing" @click.native="refresh">刷新</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column type="selection" align="center"></el-table-column>
					<el-table-column label="用户设备" align="center" width="80">
						<template slot-scope="scope">
							<span v-if="scope.row.deviceType =='Android'">安卓端</span>
							<span v-else-if="scope.row.deviceType =='iOS'">苹果端</span>
						</template>
					</el-table-column>
					<el-table-column label="类型" align="center" width="80">
						<template slot-scope="scope">
							<span v-if="scope.row.type =='Driver'">司机端</span>
							<span v-else-if="scope.row.type =='Shipper'">货主端</span>
						</template>
					</el-table-column>
					<el-table-column label="版本大小" prop="versionSize"></el-table-column>
					<el-table-column label="主版本号" prop="version"></el-table-column>
					<el-table-column label="最低版本号" prop="versionMin"></el-table-column>
					<el-table-column label="发布时间" width="140" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.releaseTime">{{scope.row.releaseTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="发布状态" prop="releaseStatus" align="center" width="70">
						<template slot-scope="scope">
							<span v-if="scope.row.releaseStatus =='Y'">是</span>
							<span v-else>否</span>
						</template>
					</el-table-column>
					<el-table-column label="是否最新" prop="isLatest" align="center" width="70">
						<template slot-scope="scope">
							<span v-if="scope.row.isLatest =='Y'">是</span>
							<span v-else>否</span>
						</template>
					</el-table-column>
					<el-table-column label="下载URL" prop="downloadURL">
					</el-table-column>
					<el-table-column label="版本说明" prop="content">
					</el-table-column>
					<el-table-column label="操作" width="300" align="center">
						<template slot-scope="scope">
							<el-button type="default" size="mini" @click="viewVersion(scope.row.appVersionID)" icon="el-icon-view">查看</el-button>
							<el-button type="default" size="mini" @click="editVersion(scope.row.appVersionID)" icon="el-icon-edit" title>编辑</el-button>
							<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.row.appVersionID)">删除</el-button>
							<el-button type="default" size="mini" v-if="scope.row.releaseStatus=='Y'" icon="el-icon-upload2" @click="releaseVersion(scope.row.appVersionID, 'N')">下架</el-button>
							<el-button type="default" size="mini" icon="el-icon-download" v-else @click="releaseVersion(scope.row.appVersionID, 'Y')">上架</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getVersionList()">
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
			refreshing: false,
			tableData: [],
			selectedVersions: []
		}
	},
	created() {
		this.getVersionList()
	},
	methods: {
		pageChange(index) {
			this.getVersionList(index)
		},
		getVersionList(pageNum) {
			let params = {
				pageNum: pageNum || 1,
				pageSize: this.pageSize
			}
			requestJava({
				url: '/setAppVersion/list',
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
		selectionChange(data) {
			this.selectedVersions = data.map(item => item.appVersionID)
		},
		addVersion() {
			this.$router.push({ name: 'addversion'})
		},
		editVersion(appVersionID) {
			this.$router.push({ name: 'editversion', query: {appVersionID} })
		},
		viewVersion(appVersionID) {
			this.$router.push({ name: 'viewversion', query: {appVersionID} })
		},
		refresh() {
			this.refreshing = true
			this.getVersionList()
			setTimeout(() => {
				this.refreshing = false
			}, 500)
		},
		deleteConfirm(id) {
			let ids = ''
			if (id && typeof id == 'string') {
				ids = id
			} else {
				ids = this.selectedVersions.join(',')
			}
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delVersion(ids)
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
		delVersion(appVersionIDs) {
			let data = {
				appVersionIDs
			}
			requestJava({
				url: '/setAppVersion/del',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 200) {
					this.getVersionList()
				} else {
					Message.error(res.data.message)
				}
			})
		},
		releaseVersion(appVersionID, releaseStatus) {
			let data = {
				appVersionID,
				releaseStatus
			}
			requestJava({
				url: '/setAppVersion/release',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 200) {
					Message.success(res.data.message)
					this.getVersionList()
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

<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>APP版本列表</span>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column type="selection" align="center"></el-table-column>
					<el-table-column label="用户设备" align="center" width="80">
						<template slot-scope="scope">
							<span v-if="scope.row.deviceType =='Android'">安卓端</span>
							<span v-if="scope.row.deviceType =='IOS'">苹果端</span>
						</template>
					</el-table-column>
					<el-table-column label="APP名称" prop="appName"></el-table-column>
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
					<el-table-column label="操作" width="300" align="center" fixed="right">
						<template slot-scope="scope">
							<el-button type="default" size="mini" @click="view(scope.row.appVersionID)" icon="el-icon-view">查看</el-button>
							<el-button type="default" size="mini" @click="edit(scope.row.appVersionID)" icon="el-icon-edit" title>编辑</el-button>
							<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.row.appVersionID)">删除</el-button>
							<el-button type="default" size="mini" v-if="scope.row.releaseStatus=='Y'" icon="el-icon-download" @click="releaseVersion(scope.row.appVersionID, 'N')">下架</el-button>
							<el-button type="default" size="mini" icon="el-icon-upload2" v-else @click="releaseVersion(scope.row.appVersionID, 'Y')">上架</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { baseMixin } from '../../../common/mixin'
import SetAppVersion from '../../../api/SetAppVersion'
import { PAGEINDEX, PAGESIZE } from '../../../common/const'
export default {
	mixins: [baseMixin],
	data() {
		return {
			selectedVersions: []
		}
	},
	created() {
		this.getList()
	},
	methods: {
		selectionChange(data) {
			this.selectedVersions = data.map(item => item.appVersionID)
		},
		getList() {
			SetAppVersion.find({
				pageNum: this.pageIndex,
				pageSize: this.pageSize
			}).then(res => {
				this.total = res.total
				this.tableData = res.list
			})
		},
		add() {
			this.$router.push({ name: 'addversion'})
		},
		edit(appVersionID) {
			this.$router.push({ name: 'editversion', query: {appVersionID} })
		},
		view(appVersionID) {
			this.$router.push({ name: 'viewversion', query: {appVersionID} })
		},
		deleteConfirm(id) {
			let ids = ''
			if (id && typeof id == 'string') {
				ids = id
			} else {
				if (this.selectedVersions.length == 0) {
					this.$message({
						type: 'warning',
						message: '请选择'
					})
					return
				}
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
			const data = {appVersionIDs }
			SetAppVersion.del({ appVersionIDs }).then(res => {
				Message.success(res.data.message)
				this.getList()
			})
		},
		releaseVersion(appVersionID, releaseStatus) {
			SetAppVersion.release({
				appVersionID,
				releaseStatus
			}).then(res => {
				Message.success(res.data.message)
				this.getList()
			})
		}
	}
}

</script>
<style lang="stylus" scoped>

</style>

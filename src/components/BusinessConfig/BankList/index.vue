<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>支付银行列表</span>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="addBank">添加</el-button>
                <el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column type="selection" align="center"></el-table-column>
					<el-table-column label="银行名称" prop="bankName"></el-table-column>
					<el-table-column label="单笔限额" prop="perLimit"></el-table-column>
					<el-table-column label="单日限额" prop="dailyLimit"></el-table-column>
					<el-table-column label="logo" align="center">
						<template slot-scope="scope">
							<img class="imgBank" :src="(scope.row.logoUrl && (scope.row.logoUrl.indexOf('http') == -1)) ? (imgUrl + scope.row.logoUrl) : defaultImg">
						</template>
					</el-table-column>
					<el-table-column label="logo图标名称" align="center" prop="logoName" width="100"></el-table-column>
					<el-table-column label="背景图片">
						<template slot-scope="scope">
							<img class="imgBank" :src="(scope.row.bgUrl && (scope.row.bgUrl.indexOf('http') == -1)) ? (imgUrl + scope.row.bgUrl) : defaultImg">
						</template>
					</el-table-column>
					<el-table-column label="背景名称" prop="bgName"></el-table-column>
					<el-table-column label="创建时间" align="center" width="140">
						<template slot-scope="scope" v-if="scope.row.createTime">
							<span>{{scope.row.createTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="230" align="center">
                        <template slot-scope="scope">
                            <el-button type="default" size="mini" icon="el-icon-view" @click="viewBank(scope.row.supportBankCode)">查看</el-button>
                            <el-button type="default" size="mini" icon="el-icon-edit" @click="editBank(scope.row.supportBankCode)">编辑</el-button>
                            <el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.row.supportBankCode)">删除</el-button>
                        </template>
                    </el-table-column>
				</el-table>
				<Page :total="count" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import requestJava from '../../../common/requestJava'
import { Message } from 'element-ui'
import { defaultImg } from '../../../assets/icons/icons'
import Page from '../../CommonComponents/Page'
export default {
	data() {
		return {
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			tableData: [],
			selectedBanks: []
		}
	},
	computed: {
		defaultImg: () => defaultImg
	},
	components: { Page },
	created() {
		this.getList()
	},
	methods: {
		selectionChange(data) {
			this.selectedBanks = data.map(item => item.supportBankCode)
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
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
			let params = {
				pageNum: this.pageIndex,
				pageSize: this.pageSize
			}
			requestJava({
				url: '/paySupportBank/list',
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
		addBank() {
			this.$router.push({name: 'addbank'})
		},
		viewBank(supportBankCode) {
			this.$router.push({name: 'viewbank', query: {supportBankCode}})
		},
		editBank(supportBankCode) {
			this.$router.push({name: 'editbank', query: {supportBankCode}})
		},
		deleteConfirm(id) {
			let ids = ''
			if (id && typeof id == 'string') {
				ids = id
			} else {
				if (this.selectedBanks.length == 0) {
					this.$message({
						type: 'warning',
						message: '请选择'
					})
					return
				}
				ids = this.selectedBanks.join(',')
			}
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delBank(ids)
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
		delBank(supportBankCodes) {
			console.log(supportBankCodes)
			let data = {
				supportBankCodes
			}
			requestJava({
				url: '/paySupportBank/del',
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
.table
	p
		margin 0
		padding 0
.imgBank
	width 20px
</style>
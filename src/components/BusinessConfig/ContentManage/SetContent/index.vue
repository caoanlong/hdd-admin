<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>内容列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="关键字">
						<el-input placeholder="请输入关键字" v-model="findKeyword"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList()">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column type="selection" align="center"></el-table-column>
					<el-table-column label="所属栏目" prop="contentTopicName"></el-table-column>
					<el-table-column label="App客户" prop="customerName"></el-table-column>
					<el-table-column label="代码" prop="code"></el-table-column>
					<el-table-column label="名称" prop="name"></el-table-column>
					<el-table-column label="标题" prop="title"></el-table-column>
					<el-table-column label="描述" prop="tips"></el-table-column>
					<el-table-column label="排序" prop="sort" width="100"></el-table-column>
					<el-table-column label="操作" width="160" align="center">
						<template slot-scope="scope">
							<el-button type="default" size="mini" icon="el-icon-edit" @click="edit(scope.row.id)">修改</el-button>
							<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.row.id)">删除</el-button>
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
import SetContent from '../../../../api/SetContent'
import { baseMixin } from '../../../../common/mixin'
export default {
	mixins: [baseMixin],
	data() {
      	return {
			findKeyword:'',
			selectedList: []
		} 
	},
	created() {
		this.getList()
	},
	methods: {
		selectionChange(data) {
			this.selectedList = data.map(item => item.contentID)
		},
		reset() {
			this.findKeyword = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
			SetContent.find({
				pageNum: this.pageIndex,
				pageSize: this.pageSize,
				keyword: this.findKeyword
			}).then(res => {
				this.total = res.total
				this.tableData = res.list
			})
		},
		add() {
			this.$router.push({name: 'addcontent'})
		},
		edit(contentID) {
			this.$router.push({name: 'editcontent', query: { contentID }})
		},
		deleteConfirm(id) {
			let ids = []
			if (id && typeof id == 'string') {
				ids = id
			} else {
				if (this.selectedList.length == 0) {
					Message.warning('请选择')
					return
				}
				ids = this.selectedList.join(',')
			}
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.del(ids)
			}).catch(() => {
				Message.info('已取消删除')
			})
		},
		del(contentIDs) {
			SetContent.del({ contentIDs }).then(res => {
				Message.success('删除成功!')
				this.getList()
			})
		}
	}
}
</script>
<style lang="stylus" scoped>
	
</style>
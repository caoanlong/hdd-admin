<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>常量列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="常量类型" >
						<el-select placeholder="请选择" v-model="find.type" class="constantSelect">
							<el-option v-for="item in constTypeList" :key="item.constStdID" :label="item.type" :value="item.type"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="名称">
						<el-input placeholder="名称" v-model="find.name"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList">查询</el-button>
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
					<el-table-column label="Id" type="selection" align="center" width="40" fixed></el-table-column>
					<el-table-column label="常量类型" prop="type" width="150"></el-table-column>
					<el-table-column label="代码" prop="code"></el-table-column>
					<el-table-column label="名称" prop="value"></el-table-column>
					<el-table-column label="值" prop="name"></el-table-column>
					<el-table-column label="描述" prop="description"></el-table-column>
					<el-table-column label="排序" prop="sortNumber"></el-table-column>
					<el-table-column label="更新人" prop="updateBy"></el-table-column>
					<el-table-column label="更新时间">
						<template slot-scope="scope">
							<span v-if="scope.row.updateTime">{{scope.row.updateTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="230" align="center" fixed="right">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-view" @click="view(scope.row.constStdID)">查看</el-button>
							<el-button size="mini" icon="el-icon-edit" @click="edit(scope.row.constStdID)">编辑</el-button>
							<el-button size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.row.constStdID)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="count" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { getConsts, getConstTypes, delConst } from '../../../../api/consts'
import { Message } from 'element-ui'
import Page from '../../../CommonComponents/Page'
export default {
	data() {
		return {
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			tableData: [],
			selectedList: [],
			constTypeList: [],
			find: {
				'type': '',
				'name': ''
			}
		}
	},
	components: { Page },
	created() {
		this.getList()
		this.getConstTypes()
	},
	methods: {
		selectionChange(data) {
			this.selectedList = data.map(item => item.constStdID)
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
			this.find.type = ''
			this.find.name = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
			let params = {
				current: this.pageIndex,
                size: this.pageSize,
                name: this.find.name,
                type: this.find.type
			}
			getConsts({params}).then(res => {
				this.count = res.data.data.total
				this.tableData = res.data.data.records
			})
		},
		getConstTypes() {
			getConstTypes().then(res => {
				this.constTypeList = res.data.data
			})
		},
        add() {
            this.$router.push({ name: 'addtmsconst' })
        },
		view(constStdID) {
			this.$router.push({ name: 'viewtmsconst', query: {constStdID} })
        },
        edit(constStdID) {
            this.$router.push({ name: 'edittmsconst', query: {constStdID} })
        },
        deleteConfirm(id) {
			let ids = []
			if (id && (typeof id == 'string' || typeof id == 'number')) {
				ids = [id]
			} else {
				if (this.selectedList.length == 0) {
					this.$message({
						type: 'warning',
						message: '请选择'
					})
					return
				}
				ids = this.selectedList
			}
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.del(ids)
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				})
			})
		},
		del(ids) {
			delConst({id: ids.join(',')}).then(res => {
				Message.success('删除成功!')
				this.getList()
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

<template>
	<div class="main-content">
		<el-card class="box-card menu-list">
			<div slot="header" class="clearfix">
				<span>栏目列表</span>
			</div>
			<div class="tableControl">
				<el-button type="success" plain size="mini" icon="el-icon-plus" @click="addRoot">添加顶级节点</el-button>
			</div>
			<el-tree
				class="expand-tree"
				:data="setContenttopics"
				:props="defaultProps"
				node-key="name"
				highlight-current
				:expand-on-click-node="false"
				:render-content="renderContent"
				@node-click="handleNodeClick">
			</el-tree>
		</el-card>
		<el-card class="box-card menu-info">
			<div slot="header" class="clearfix">
				<span>{{title}}</span>
			</div>
			<el-form label-width="80px" :model="currentNode" :rules="rules" ref="ruleForm">
				<el-form-item label="栏目名称" prop="Name">
					<el-input v-model="currentNode.Name"></el-input>
				</el-form-item>
				<el-form-item label="代码" prop="Code">
					<el-input v-model="currentNode.Code"></el-input>
				</el-form-item>
				<el-form-item label="类型" prop="Type">
					<el-input v-model="currentNode.Type"></el-input>
				</el-form-item>
				<el-form-item label="是否启用">
					<el-switch v-model="currentNode.isEnable"></el-switch>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm(button)">{{button}}</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import request from '../../../../common/request'
import TreeRender from '../../../CommonComponents/TreeRender/Column'
import { Message } from 'element-ui'
export default {
	data() {
      	return {
			defaultProps: {
				children: 'children',
				label: 'Name'
			},
			setContenttopics: [],
			currentNode: {
				Name: '',
				Code: '',
				Type: 'public',
				isEnable: true
			},
			title: '添加顶级节点',
			button: '立即创建',
			selectedColumns: [],
			rules: {
				Name: [
					{required: true, message: '请输入名称'},
					{min: 2, max: 20, message: '长度在 2 到 20 个字符'}
				],
				Code: [
					{required: true, message: '请输入代码'},
					{min: 2, max: 20, message: '长度在 2 到 20 个字符'}
				]
			}
		}
    },
	created() {
		this.getColumns()
	},
    methods: {
		addRoot() {
			this.title = '添加顶级节点'
			this.button = '立即创建'
			this.currentNode = {
				Name: '',
				Code: '',
				Type: 'public',
				isEnable: true
			}
		},
		handleNodeClick(d) {
			this.title = '编辑'
			this.button = '确认修改'
			this.getColumn(d.ContentTopic_ID)
		},
		renderContent(h, {node, data, store}) {
			let that = this //指向vue
			return h(TreeRender, {
				props: {
					DATA: data, //节点数据
					NODE: node, //节点内容
					STORE: store, //完整树形内容
					CURRENTNODE: this.currentNode // 当前选择的节点
				},
				on: {//绑定方法
					nodeAdd: ((s, d, n) => that.handleAdd(s, d, n)),
					nodeDel: ((s, d, n) => that.handleDelete(s, d, n))
				}
			})
		},
		handleAdd(s, d, n){//增加节点
			this.title = '添加子节点'
			this.button = '立即创建'
			this.currentNode = {
				ContentTopic_PID: this.currentNode.ContentTopic_ID,
				Name: '',
				Code: '',
				Type: 'public',
				isEnable: true
			}
			this.iconTxt='添加图标'
		},
		handleDelete(s, d, n){//删除节点
			this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delColumn(d.ContentTopic_ID)
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				})         
			})
		},
		submitForm(type) {
			// 创建
			if (type == '立即创建') {
				let params = {
					Name: this.currentNode.Name,
					Code: this.currentNode.Code,
					Type: this.currentNode.Type,
					ContentTopic_PID: this.currentNode.ContentTopic_PID,
					isEnable: this.isShow ? 'Y' : 'N'
				}
				this.$refs['ruleForm'].validate(valid => {
					if (valid) {
						this.addColumn(params)
					}
				})
			// 编辑
			} else {
				let params = {
					ContentTopic_ID: this.currentNode.ContentTopic_ID,
					Name: this.currentNode.Name,
					Code: this.currentNode.Code,
					Type: this.currentNode.Type,
					ContentTopic_PID: this.currentNode.ContentTopic_PID,
					isEnable: this.isShow ? 'Y' : 'N'
				}
				this.$refs['ruleForm'].validate(valid => {
					if (valid) {
						this.updatetColumn(params)
					}
				})
			}
		},
		getColumns() {
			request({
				url: '/set_contenttopic/list',
				method: 'get'
			}).then(res => {
				if (res.data.code == 0) {
					this.setContenttopics = res.data.data
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		getColumn(ContentTopic_ID) {
			let params = {
				ContentTopic_ID
			}
			request({
				url: '/set_contenttopic/info',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.currentNode = res.data.data
					this.currentNode.isEnable = res.data.data.isEnable == 'Y' ? true : false
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		addColumn(data) {
			request({
				url: '/set_contenttopic/add',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					this.getColumns()
					this.addRoot()
					this.$message.success('创建成功！')
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		updatetColumn(data) {
			request({
				url: '/set_contenttopic/update',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					this.getColumns()
					this.addRoot()
					this.$message.success('编辑成功！')
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		delColumn(ContentTopic_ID) {
			let data = {
				ContentTopic_ID
			}
			request({
				url: '/set_contenttopic/delete',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					this.getColumns()
					this.addRoot()
					this.$message.success('删除成功！')
				} else {
					Message.error(res.data.msg)
				}
			})
		}
	}
}
</script>
<style lang="stylus" scoped>
	.main-content
		display flex
		.box-card
			&.menu-list
				flex 0 0 360px
				margin-right 20px
				.expand-tree
					height 600px
					overflow-y auto
			&.menu-info
				flex 1
			.expand-tree
				font-size 14px
</style>
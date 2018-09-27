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
				:data="list"
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
				<el-form-item label="栏目名称" prop="name">
					<el-input v-model="currentNode.name"></el-input>
				</el-form-item>
				<el-form-item label="代码" prop="code">
					<el-input v-model="currentNode.code"></el-input>
				</el-form-item>
				<el-form-item label="类型" prop="type">
					<el-input v-model="currentNode.type"></el-input>
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
import { Message } from 'element-ui'
import SetContentTopic from '../../../../api/SetContentTopic'
import TreeRender from '../../../CommonComponents/TreeRender/SetContentTopic'
export default {
	data() {
      	return {
			defaultProps: {
				children: 'children',
				label: 'name'
			},
			list: [],
			currentNode: {
				id: '', // 栏目ID
				contentTopicPID: '', // 栏目父ID
				type: 'public', // 类型
				code: '', // 代码
				name: '', // 名称
				isEnable: true //是否启用
			},
			title: '添加顶级节点',
			button: '立即创建',
			selectedColumns: [],
			rules: {
				name: [
					{required: true, message: '请输入名称'},
					{min: 2, max: 20, message: '长度在 2 到 20 个字符'}
				],
				code: [
					{required: true, message: '请输入代码'},
					{min: 2, max: 20, message: '长度在 2 到 20 个字符'}
				]
			}
		}
    },
	created() {
		this.getList()
	},
    methods: {
		handleNodeClick(d) {
			this.title = '编辑'
			this.button = '确认修改'
			this.getInfo(d.id)
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
		/**
		 * 点击添加根节点
		 */
		addRoot() {
			this.title = '添加顶级节点'
			this.button = '立即创建'
			this.currentNode = {
				type: 'public', // 类型
				code: '', // 代码
				name: '', // 名称
				isEnable: true //是否启用
			}
		},
		/**
		 * 点击添加子节点
		 */
		handleAdd(s, d, n){
			this.title = '添加子节点'
			this.button = '立即创建'
			this.currentNode = {
				contentTopicPID: this.currentNode.id,
				type: 'public', // 类型
				code: '', // 代码
				name: '', // 名称
				isEnable: true //是否启用
			}
			this.iconTxt='添加图标'
		},
		/**
		 * 点击删除
		 */
		handleDelete(s, d, n){
			this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.del(d.id)
			}).catch(() => {
				Message.info('已取消删除')         
			})
		},
		/**
		 * 提交保存
		 */
		submitForm(type) {
			let params = null
			// 创建
			if (type == '立即创建') {
				params = {
					name: this.currentNode.name,
					code: this.currentNode.code,
					type: this.currentNode.type,
					contentTopicPID: this.currentNode.contentTopicPID || 1,
					isEnable: this.currentNode.isEnable ? 'Y' : 'N'
				}
			// 编辑
			} else {
				params = {
					id: this.currentNode.id,
					name: this.currentNode.name,
					code: this.currentNode.code,
					type: this.currentNode.type,
					contentTopicPID: this.currentNode.contentTopicPID,
					isEnable: this.currentNode.isEnable ? 'Y' : 'N'
				}
			}
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				this.save(params)
			})
		},
		/**
		 * 获取列表
		 */
		getList() {
			SetContentTopic.find().then(res => { this.list = res })
		},
		/**
		 * 获取详情
		 */
		getInfo(id) {
			SetContentTopic.findById({ id }).then(res => {
				this.currentNode = res
				this.currentNode.isEnable = res.isEnable == 'Y' ? true : false
			})
		},
		/**
		 * 保存
		 */
		save(data) {
			SetContentTopic.add(data).then(res => {
				this.getList()
				this.addRoot()
				Message.success('成功')
			})
		},
		/**
		 * 删除
		 */
		del(id) {
			SetContentTopic.del({ id }).then(res => {
				Message.success('删除成功！')
				this.getList()
				this.addRoot()
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
<template>
	<div class="main-content">
		<el-card class="box-card menu-list">
			<div slot="header" class="clearfix">
				<span>App页面</span>
			</div>
			<div class="tableControl">
				<el-button type="success" plain size="mini" icon="el-icon-plus" @click="addRoot">添加顶级节点</el-button>
			</div>
			<el-tree
				class="expand-tree"
				:data="appPages"
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
				<el-form-item label="名称" prop="name">
					<el-input v-model="currentNode.name"></el-input>
				</el-form-item>
				<el-form-item label="APP类型" prop="type">
					<el-select style="width: 100%" placeholder="请选择" v-model="currentNode.type">
						<el-option label="司机端" value="Driver"></el-option>
						<el-option label="货主端" value="Shipper"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="代码" prop="code">
					<el-input v-model="currentNode.code"></el-input>
				</el-form-item>
				<el-form-item label="描述">
					<el-input v-model="currentNode.content"></el-input>
				</el-form-item>
				<!-- <el-form-item label="修改人">
					<p>{{currentNode.updateName}}</p>
				</el-form-item>
				<el-form-item label="修改时间">
					<p v-if="currentNode.updateTime">{{currentNode.updateTime | getdatefromtimestamp()}}</p>
					<p v-else></p>
				</el-form-item> -->
				<el-form-item>
					<el-button type="primary" @click.native="submitForm(button)">{{button}}</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import requestJava from '../../../common/requestJava'
import TreeRender from '../../CommonComponents/TreeRender/AppPage'
import { Message } from 'element-ui'
export default {
	data() {
      	return {
			defaultProps: {
				children: 'children',
				label: 'name'
			},
			appPages: [],
			currentNode: {
				appPagePID: 1,
				name: '',
				type: '',
				code: '',
				content: ''
			},
			title: '添加顶级节点',
			button: '立即创建',
			rules: {
				name: [
					{required: true, message: '请输入名称'},
					{min: 2, max: 20, message: '长度在 2 到 20 个字符'}
				],
				type: [
					{required: true, message: '请选择类型'}
				],
				code: [
					{required: true, message: '请输入代码'},
					{min: 2, max: 20, message: '长度在 2 到 20 个字符'}
				],
			}
		}
    },
	created() {
		this.getAppPages()
	},
    methods: {
		addRoot() {
			this.title = '添加顶级节点'
			this.button = '立即创建'
			this.currentNode = {
				appPagePID: 1,
				name: '',
				type: '',
				code: '',
				content: ''
			}
		},
		handleNodeClick(d) {
			this.title = '编辑'
			this.button = '确认修改'
			this.getAppPage(d.appPageID)
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
				appPagePID: this.currentNode.appPageID,
				name: '',
				type: '',
				code: '',
				content: ''
			}
		},
		handleDelete(s, d, n){//删除节点
			this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delAppPage(d.appPageID)
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
					name: this.currentNode.name,
					type: this.currentNode.type,
					code: this.currentNode.code,
					content: this.currentNode.content,
					appPagePID: this.currentNode.appPagePID,
				}
				this.$refs['ruleForm'].validate(valid => {
					if (valid) {
						this.addAppPage(params)
					}
				})
			// 编辑
			} else {
				let params = {
					appPageID: this.currentNode.appPageID,
					name: this.currentNode.name,
					type: this.currentNode.type,
					code: this.currentNode.code,
					content: this.currentNode.content,
					appPagePID: this.currentNode.appPagePID,
				}
				this.$refs['ruleForm'].validate(valid => {
					if (valid) {
						this.updatetAppPage(params)
					}
				})
			}
		},
		getAppPages() {
			requestJava({
				url: '/setAppPage/configuration/list',
				method: 'get'
			}).then(res => {
				if (res.data.code == 200) {
					this.appPages = res.data.data
				} else {
					Message.error(res.data.message)
				}
			})
		},
		getAppPage(appPageID) {
			let params = {
				appPageID
			}
			requestJava({
				url: '/setAppPage/configuration/info',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 200) {
					this.currentNode = res.data.data
				} else {
					Message.error(res.data.message)
				}
			})
		},
		addAppPage(data) {
			requestJava({
				url: '/setAppPage/configuration/save',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 200) {
					this.getAppPages()
					this.addRoot()
					this.$message.success('创建成功！')
				} else {
					Message.error(res.data.message)
				}
			})
		},
		updatetAppPage(data) {
			requestJava({
				url: '/setAppPage/configuration/save',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 200) {
					this.getAppPages()
					this.addRoot()
					this.$message.success('编辑成功！')
				} else {
					Message.error(res.data.message)
				}
			})
		},
		delAppPage(appPageID) {
			let data = {
				appPageID
			}
			requestJava({
				url: '/setAppPage/configuration/del',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 200) {
					this.getAppPages()
					this.addRoot()
					this.$message.success('删除成功！')
				} else {
					Message.error(res.data.message)
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
	.el-form-item__content
		p
			margin 0
			border 1px solid #fff
			border-bottom-color #dcdfe6
			padding 0 15px
			height 40px
			font-family 'sans-serif'
			line-height 40px
			color #999
		.el-input__inner
			vertical-align top
</style>
<template>
	<div class="main-content">
		<el-card class="box-card menu-list">
			<div slot="header" class="clearfix">
				<span>菜单列表</span>
			</div>
			<div class="tableControl">
				<el-button type="success" plain size="mini" icon="el-icon-plus" @click="addRoot">添加顶级节点</el-button>
			</div>
			<el-tree
				class="expand-tree"
				:data="menus"
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
			<el-form ref="form" :model="currentNode" label-width="80px">
				<el-form-item label="标题">
					<el-input v-model="currentNode.title"></el-input>
				</el-form-item>
				<el-form-item label="名字">
					<el-input v-model="currentNode.name"></el-input>
				</el-form-item>
				<el-form-item label="路径">
					<el-input v-model="currentNode.path"></el-input>
				</el-form-item>
				<el-form-item label="图标">
					<el-button type="primary" plain @click="selectIcondialog = true"><svg-icon :iconClass="currentNode.meta.icon ? currentNode.meta.icon : 'add-icon'"></svg-icon> {{iconTxt}}</el-button>
				</el-form-item>
				<el-form-item label="组件">
					<el-select style="width: 100%" v-model="currentNode.component" placeholder="请选择组件">
						<el-option :label="item" :value="item" v-for="item in components" :key="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="排序">
					<el-input-number v-model="currentNode.sort" :min="1" label="描述文字"></el-input-number>
				</el-form-item>
				<el-form-item label="是否菜单">
					<el-switch v-model="currentNode.meta.isMenu"></el-switch>
				</el-form-item>
				<el-form-item label="角色权限">
					<el-checkbox-group v-model="currentNode.meta.roles">
						<el-checkbox :label="role.enName" v-for="role in roles" :key="role._id"></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click.native="submitForm(button)">{{button}}</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<el-dialog title="选择图标" :visible.sync="selectIcondialog" width="30%">
			<ul class="iconList clearfix">
				<li v-for="icon in svgicons" :key="icon" :class="{'selected':selectedIcon == icon}" @click="selectIcon(icon)"><svg-icon :iconClass="icon"></svg-icon></li>
			</ul>
			<span slot="footer" class="dialog-footer">
				<el-button @click="selectIcondialog = false">取 消</el-button>
				<el-button type="primary" @click="submitSelect">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import TreeRender from '../../../CommonComponents/TreeRender'
import components from '../../../../assets/data/componentPath.json'
import { requireAllName, req } from '../../../../assets/icons'
import request from '../../../../common/request'
export default {
	data() {
		return {
			menuData: [],
			roles: [],
			defaultProps: {
				children: 'children',
				label: 'title'
			},
			currentNode: {
				"meta": {
					"roles": [],
					"isMenu": true
				}
			},
			title: '添加顶级节点',
			button: '立即创建',
			selectIcondialog: false,
			selectedIcon: '',
			iconTxt: '添加图标'
		}
	},
	computed: {
		...mapGetters([
			'menus'
		]),
		svgicons: () => requireAllName(req),
		components: () => components
	},
	created() {
		this.getRoles()
	},
	methods: {
		addRoot() {
			this.title = '添加顶级节点'
			this.button = '立即创建'
			this.currentNode = {
				"meta": {
					"roles": [],
					"isMenu": true,
					"parent": null
				}
			}
		},
		handleNodeClick(d) {
			this.title = '编辑'
			this.button = '确认修改'
			this.currentNode = d
			if (typeof this.currentNode.component != 'string') {
				let curNode = this.currentNode.component.__file.split('components')[1].split('.vue')[0]
				if (curNode.includes('index')) {
					this.currentNode.component = curNode.split('index')[0].replace(/\\/g, "/")
				} else {
					this.currentNode.component = curNode.replace(/\\/g, "/")
				}
			}
			console.log(this.currentNode)
		},
		renderContent(h, {node, data, store}) {
			let that = this//指向vue
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
				"meta": {
					"roles": [],
					"isMenu": true,
					"parent": d._id
				}
			}
		},
		handleDelete(s, d, n){//删除节点
			this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$store.dispatch('deleteMenu', d)
				this.addRoot()
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
		submitForm(type) {
			if (!this.currentNode.title) {
				this.$message.error('标题不能为空！')
				return
			}
			if (!this.currentNode.name) {
				this.$message.error('名字不能为空！')
				return
			}
			if (!this.currentNode.path) {
				this.$message.error('路径不能为空！')
				return
			}
			if (!this.currentNode.component) {
				this.$message.error('组件不能为空！')
				return
			}
			// 创建
			if (type == '立即创建') {
				let params = {
					path: this.currentNode.path,
					name: this.currentNode.name,
					component: this.currentNode.component,
					title: this.currentNode.title,
					sort: this.currentNode.sort,
					icon: this.currentNode.meta.icon,
					parent: this.currentNode.meta.parent,
					isMenu: this.currentNode.meta.isMenu,
					roles: this.currentNode.meta.roles
				}
				this.$store.dispatch('addMenu', params)
				this.addRoot()
				this.$message.success('创建成功！')
			// 编辑
			} else {
				let params = {
					id: this.currentNode._id,
					path: this.currentNode.path,
					name: this.currentNode.name,
					component: this.currentNode.component,
					title: this.currentNode.title,
					sort: this.currentNode.sort,
					icon: this.currentNode.meta.icon,
					parent: this.currentNode.meta.parent,
					isMenu: this.currentNode.meta.isMenu,
					roles: this.currentNode.meta.roles
				}
				this.$store.dispatch('editMenu', params)
				this.addRoot()
				this.$message.success('编辑成功！')
			}
		},
		selectIcon(icon) {
			this.selectedIcon= icon
		},
		submitSelect() {
			this.iconTxt = this.currentNode.meta.icon = this.selectedIcon
			this.selectIcondialog = false
		},
		getRoles() {
			let params = {
				pageSize: 50
			}
			request({
				url: '/role',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.roles = res.data.data.roles
				} else {
					Message.error(res.data.msg)
				}
			})
		}
	},
	components: {
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
			&.menu-info
				flex 1
			.expand-tree
				font-size 14px
	.svg-icon
		vertical-align top
	.iconList
		padding 0
		&:after
			clearfix
		li
			list-style-type none
			float left
			font-size 18px
			width 44px
			height 44px
			padding 10px
			text-align center
			cursor pointer
			&:hover
			&.selected
				color #409EFF
	.el-checkbox
		margin 0 30px 0 0 		
</style>

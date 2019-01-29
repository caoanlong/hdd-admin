<template>
	<div class="main-content">
		<el-card class="box-card menu-list">
			<div slot="header" class="clearfix">
				<span>菜单列表</span>
			</div>
			<div class="tableControl">
				<el-button 
					type="success" 
					plain 
					size="mini" 
					icon="el-icon-plus" 
					@click="addRoot">
					添加顶级节点
				</el-button>
			</div>
			<el-tree
				class="expand-tree"
				:data="menus"
				:props="defaultProps"
				node-key="menuID"
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
					<el-input v-model="currentNode.name"></el-input>
				</el-form-item>
				<el-form-item label="名字">
					<el-input v-model="currentNode.target"></el-input>
				</el-form-item>
				<el-form-item label="路径">
					<el-input v-model="currentNode.href"></el-input>
				</el-form-item>
				<el-form-item label="图标">
					<el-button type="primary" plain @click="isSelectIconVisible = true">
						<svg-icon 
							:iconClass="currentNode.icon ? currentNode.icon : 'add-icon'">
						</svg-icon> 
						{{currentNode.icon ? currentNode.icon : iconTxt}}
					</el-button>
				</el-form-item>
				<el-form-item label="排序">
					<el-input-number v-model="currentNode.sortNumber" :min="1"></el-input-number>
				</el-form-item>
				<el-form-item label="是否显示">
                    <el-radio v-model="currentNode.isShow" label="1">是</el-radio>
                    <el-radio v-model="currentNode.isShow" label="0">否</el-radio>
                </el-form-item>
				<el-form-item label="角色权限">
					<el-select 
						style="width: 100%" 
						v-model="currentNode.roleIds" 
						multiple 
						placeholder="请选择">
						<el-option 
							v-for="role in roles" 
							:key="role.roleID" 
							:label="role.name" 
							:value="role.roleID">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click.native="submitForm(button)">{{button}}</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<select-icon 
			:isVisible="isSelectIconVisible" 
			:icon="selectedIcon" 
			@control="handSelectIcon">
		</select-icon>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import TreeRender from '../../../CommonComponents/TreeRender'
import SelectIcon from './components/SelectIcon'
import SysMenuBoss from '../../../../api/SysMenuBoss'
import SysRole from '../../../../api/SysRole'
export default {
	components: { SelectIcon },
	data() {
		return {
			isSelectIconVisible: false,
			selectedIcon: '',
			menus: [],
			roles: [],
			selectedRoles: [],
			defaultProps: {
				children: 'children',
				label: 'name'
			},
			currentNode: {
				target: '',
				name: '',
				sortNumber: '',
				href: '',
				icon: '',
				isShow: '1',
				roleIds: []
			},
			title: '添加顶级节点',
			button: '立即创建',
			iconTxt: '添加图标'
		}
	},
	created() {
		this.getMenus()
		this.getRoles()
	},
	methods: {
		handSelectIcon(icon) {
			if (icon) {
				this.selectedIcon = icon
				this.currentNode.icon = icon
			} else {
				this.selectedIcon = ''
				this.currentNode.icon = ''
			}
			this.isSelectIconVisible = false
		},
		addRoot() {
			this.title = '添加顶级节点'
			this.button = '立即创建'
			this.iconTxt='添加图标'
			this.currentNode = {
				target: '',
				name: '',
				sortNumber: '',
				href: '',
				icon: '',
				isShow: '1',
				roleIds: []
			}
		},
		handleNodeClick(d) {
			this.title = '编辑'
			this.button = '确认修改'
			this.getInfo(d.menuID)
		},
		renderContent(h, {node, data, store}) {
			const that = this //指向vue
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
			this.iconTxt='添加图标'
			this.currentNode = {
				menuPID: this.currentNode.menuID,
				target: '',
				name: '',
				sortNumber: '',
				href: '',
				icon: '',
				isShow: '1',
				roleIds: []
			}
		},
		handleDelete(s, d, n){//删除节点
			this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.addRoot()
				this.$store.dispatch('deleteMenu', d)
			}).catch(() => {
				this.$message.info('已取消删除')         
			})
		},
		submitForm(type) {
			if (!this.currentNode.name) {
				this.$message.error('标题不能为空！')
				return
			}
			if (!this.currentNode.target) {
				this.$message.error('名字不能为空！')
				return
			}
			if (!this.currentNode.href) {
				this.$message.error('路径不能为空！')
				return
			}
			const params = Object.assign({}, this.currentNode)
			params.roleIds = this.currentNode.roleIds.join(',')
			this.addRoot()
			this.$store.dispatch('saveMenu', params)
			this.getMenus()
		},
		getMenus() {
			SysMenuBoss.tree().then(res => {
				this.menus = res
			})
		},
		getInfo(menuID) {
			SysMenuBoss.findById({ menuID }).then(res => {
				this.currentNode = res
				this.selectedIcon = res.icon
			})
		},
		getRoles() {
			SysRole.suggest().then(res => {
				this.roles = res
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
	.el-checkbox
		margin 0 30px 0 0	
</style>

<template>
	<div class="main-content">
		<el-card class="box-card menu-list">
			<div slot="header" class="clearfix">
				<span>地区列表</span>
			</div>
			<div class="tableControl">
				<el-button type="success" plain size="mini" icon="el-icon-plus" @click="addRoot">添加顶级节点</el-button>
			</div>
			<el-tree
				class="expand-tree"
				:load="loadNode"
				:props="defaultProps"
				node-key="Code"
				lazy
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
				<el-form-item label="区域类型">
					<el-select style="width: 100%" v-model="currentNode.Depth" placeholder="请选择">
						<el-option value="1" label="省份/直辖市">省份/直辖市</el-option>
						<el-option value="2" label="地市/区县">地市/区县</el-option>
						<el-option value="3" label="区县">区县</el-option>
						<el-option value="0" label="国家">国家</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="区域编码">
					<el-input v-model="currentNode.Code"></el-input>
				</el-form-item>
				<el-form-item label="区域名称">
					<el-input v-model="currentNode.Name"></el-input>
				</el-form-item>
				<el-form-item label="经度">
					<el-input v-model="currentNode.Lng"></el-input>
				</el-form-item>
				<el-form-item label="纬度">
					<el-input v-model="currentNode.Lat"></el-input>
				</el-form-item>
				<el-form-item label="是否热点">
					<el-switch v-model="isHot"></el-switch>
				</el-form-item>
				<el-form-item label="排序">
					<el-input-number v-model="currentNode.SortNumber" :min="1"></el-input-number>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click.native="submitForm(button)">{{button}}</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import TreeRender from '../../../CommonComponents/TreeRender/Area'
import request from '../../../../common/request'
export default {
	data() {
		return {
			areaList: [],
			defaultProps: {
				children: 'children',
				label: 'Name'
			},
			currentNode: {
				Depth: '',
				Code: '',
				Name: '',
				Lng: '',
				Lat: '',
				HotspotStatus: '',
				SortNumber: ''
			},
			isHot: false,
			title: '添加顶级节点',
			button: '立即创建',
			selectIcondialog: false,
			selectedIcon: '',
			iconTxt: '添加图标'
		}
	},
	created() {
	},
	methods: {
		addRoot() {
			this.title = '添加顶级节点'
			this.button = '立即创建'
			this.currentNode = {
				name: '',
				title: '',
				SortNumber: '',
				path: '',
				component: '',
				Icon: '',
				IsShow: '',
				sys_roles: []
			}
		},
		handleNodeClick(d) {
			this.title = '编辑'
			this.button = '确认修改'
			this.getArea(d.Area_ID)
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
				Menu_PID: this.currentNode.Menu_ID,
				name: '',
				title: '',
				SortNumber: '',
				path: '',
				component: '',
				Icon: '',
				IsShow: '',
				sys_roles: []
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
					SortNumber: this.currentNode.SortNumber,
					Icon: this.currentNode.Icon,
					Menu_PID: this.currentNode.Menu_PID,
					IsShow: this.isMenuShow ? 'Y' : 'N',
				}
				this.$store.dispatch('addMenu', params)
				this.addRoot()
				this.$message.success('创建成功！')
			// 编辑
			} else {
				let params = {
					Menu_ID: this.currentNode.Menu_ID,
					path: this.currentNode.path,
					name: this.currentNode.name,
					component: this.currentNode.component,
					title: this.currentNode.title,
					SortNumber: this.currentNode.SortNumber,
					Icon: this.currentNode.Icon,
					Menu_PID: this.currentNode.Menu_PID,
					IsShow: this.isMenuShow ? 'Y' : 'N',
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
			this.iconTxt = this.currentNode.Icon = this.selectedIcon
			this.selectIcondialog = false
		},
		loadNode(node, resolve) {
			console.log(node.level)
			if (node.level === 0) {
				this.getAreas('', areas => {
					return resolve(areas)
				})
				return
			}
			if (node.level > 0) {
				this.getAreas(node.data.Area_ID, areas => {
					return resolve(areas)
				})
				return
			}
		},
		// 获取区域列表
		getAreas(Area_PID, callback) {
			let params = {
				Area_PID
			}
			request({
				url: '/base_area/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					callback && callback(res.data.data)
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		// 获取区域详情
		getArea(Area_ID) {
			let params = {
				Area_ID
			}
			request({
				url: '/base_area/info',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.currentNode = res.data.data
					this.isHot = res.data.data.HotspotStatus == 'Y' ? true : false
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

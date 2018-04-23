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
				accordion 
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
				<el-form-item label="区域类型" prop="Depth">
					<el-select style="width: 100%" v-model="currentNode.Depth" placeholder="请选择">
						<el-option :value="1" label="省份/直辖市"></el-option>
						<el-option :value="2" label="地市/区县"></el-option>
						<el-option :value="3" label="区县"></el-option>
						<el-option :value="0" label="国家"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="区域编码" prop="Code">
					<el-input v-model="currentNode.Code"></el-input>
				</el-form-item>
				<el-form-item label="区域名称" prop="Name">
					<el-input v-model="currentNode.Name"></el-input>
				</el-form-item>
				<el-form-item label="经度" prop="Lng">
					<el-input v-model="currentNode.Lng"></el-input>
				</el-form-item>
				<el-form-item label="纬度" prop="Lat">
					<el-input v-model="currentNode.Lat"></el-input>
				</el-form-item>
				<el-form-item label="是否热点">
					<el-switch v-model="currentNode.HotspotStatus"></el-switch>
				</el-form-item>
				<el-form-item label="排序">
					<el-input-number v-model="currentNode.SortNumber" :min="1"></el-input-number>
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
import TreeRender from '../../../CommonComponents/TreeRender/Area'
import request from '../../../../common/request'
import { checkFloat6 } from '../../../../common/validator'
export default {
	data() {
		return {
			defaultProps: {
				children: 'children',
				label: 'Name'
			},
			currentNode: {
				Area_PID: '',
				Depth: '',
				Code: '',
				Name: '',
				Lng: '',
				Lat: '',
				HotspotStatus: false,
				SortNumber: 1
			},
			title: '添加顶级节点',
			button: '立即创建',
			selectIcondialog: false,
			selectedIcon: '',
			iconTxt: '添加图标',
			rules: {
				Depth: [
					{required: true, message: '请选择类型'},
				],
				Code: [
					{required: true, message: '请输入编码'},
					{min: 6, max: 6, message: '长度为 6 个字符'}
				],
				Name: [
					{required: true, message: '请输入名称'},
					{min: 2, max: 20, message: '长度在 2 到 20 个字符'}
				],
				Lng: [
					{validator: checkFloat6}
				],
				Lat: [
					{validator: checkFloat6}
				],
			}
		}
	},
	methods: {
		addRoot() {
			this.title = '添加顶级节点'
			this.button = '立即创建'
			this.currentNode = {
				Area_PID: '',
				Depth: '',
				Code: '',
				Name: '',
				Lng: '',
				Lat: '',
				HotspotStatus: false,
				SortNumber: 1
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
				Area_PID: this.currentNode.Area_ID,
				Depth: '',
				Code: '',
				Name: '',
				Lng: '',
				Lat: '',
				HotspotStatus: false,
				SortNumber: 1
			}
		},
		handleDelete(s, d, n){//删除节点
			this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let params = {
					Area_ID: d.Area_ID
				}
				this.deleteArea(params)
				this.addRoot()
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
					Area_PID: this.currentNode.Area_PID || '',
					Depth: this.currentNode.Depth,
					Code: this.currentNode.Code,
					Name: this.currentNode.Name,
					Lng: this.currentNode.Lng,
					Lat: this.currentNode.Lat,
					HotspotStatus: this.currentNode.HotspotStatus ? 'Y' : 'N',
					SortNumber: this.currentNode.SortNumber
				}
				this.$refs['ruleForm'].validate(valid => {
					if (valid) {
						this.addArea(params)
						this.addRoot()
					}
				})
			// 编辑
			} else {
				let params = {
					Area_ID: this.currentNode.Area_ID,
					Area_PID: this.currentNode.Area_PID || '',
					Depth: this.currentNode.Depth,
					Code: this.currentNode.Code,
					Name: this.currentNode.Name,
					Lng: this.currentNode.Lng,
					Lat: this.currentNode.Lat,
					HotspotStatus: this.currentNode.HotspotStatus ? 'Y' : 'N',
					SortNumber: this.currentNode.SortNumber
				}
				this.$refs['ruleForm'].validate(valid => {
					if (valid) {
						this.updateArea(params)
						this.addRoot()
					}
				})
			}
		},
		selectIcon(icon) {
			this.selectedIcon = icon
		},
		submitSelect() {
			this.iconTxt = this.currentNode.Icon = this.selectedIcon
			this.selectIcondialog = false
		},
		loadNode(node, resolve) {
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
					this.currentNode.HotspotStatus = res.data.data.HotspotStatus == 'Y' ? true : false
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		// 添加区域
		addArea(data) {
			request({
				url: '/base_area/add',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					Message.success(res.data.msg)
					this.$refs['ruleForm'].resetFields()
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		// 修改区域
		updateArea(data) {
			request({
				url: '/base_area/update',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					Message.success(res.data.msg)
					this.$refs['ruleForm'].resetFields()
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		// 删除区域
		deleteArea(data) {
			request({
				url: '/base_area/delete',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					Message.success(res.data.msg)
					this.$refs['ruleForm'].resetFields()
				} else {
					Message.error(res.data.msg)
				}
			})
		},
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

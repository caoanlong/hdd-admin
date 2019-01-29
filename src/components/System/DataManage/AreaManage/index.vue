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
				<el-form-item label="区域类型" prop="depth">
					<el-select style="width: 100%" v-model="currentNode.depth" placeholder="请选择">
						<el-option :value="1" label="省份/直辖市"></el-option>
						<el-option :value="2" label="地市/区县"></el-option>
						<el-option :value="3" label="区县"></el-option>
						<!-- <el-option :value="0" label="国家"></el-option> -->
					</el-select>
				</el-form-item>
				<el-form-item label="区域编码" prop="code">
					<el-input v-model="currentNode.code"></el-input>
				</el-form-item>
				<el-form-item label="区域名称" prop="name">
					<el-input v-model="currentNode.name"></el-input>
				</el-form-item>
				<el-form-item label="经度" prop="lng">
					<el-input v-model="currentNode.lng"></el-input>
				</el-form-item>
				<el-form-item label="纬度" prop="lat">
					<el-input v-model="currentNode.lat"></el-input>
				</el-form-item>
				<el-form-item label="是否热点">
                    <el-radio v-model="currentNode.hotspotStatus" label="Y">是</el-radio>
                    <el-radio v-model="currentNode.hotspotStatus" label="N">否</el-radio>
                </el-form-item>
				<el-form-item label="排序">
					<el-input-number v-model="currentNode.sortNumber" :min="1"></el-input-number>
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
import BaseArea from '../../../../api/BaseArea'
import Base from '../../../../api/Base'
export default {
	data() {
		return {
			defaultProps: {
				children: 'children',
				label: 'name'
			},
			currentNode: {
				areaID: '',
				areaPID: '',
				code: '',
				depth: '',
				hotspotStatus: 'N',
				lat: '',
				lng: '',
				name: '',
				path: '',
				sortNumber: 1
			},
			title: '添加顶级节点',
			button: '立即创建',
			rules: {
				depth: [ {required: true, message: '请选择类型'} ],
				code: [
					{required: true, message: '请输入编码'},
					{min: 6, max: 6, message: '长度为 6 个字符'}
				],
				name: [
					{required: true, message: '请输入名称'},
					{min: 2, max: 20, message: '长度在 2 到 20 个字符'}
				],
				lng: [ {validator: checkFloat6} ],
				lat: [ {validator: checkFloat6} ]
			}
		}
	},
	methods: {
		addRoot() {
			this.title = '添加顶级节点'
			this.button = '立即创建'
			this.currentNode = {
				areaID: '',
				areaPID: '',
				code: '',
				depth: '',
				hotspotStatus: 'N',
				lat: '',
				lng: '',
				name: '',
				path: '',
				sortNumber: 1
			}
		},
		handleNodeClick(d) {
			this.title = '编辑'
			this.button = '确认修改'
			this.getArea(d.areaID)
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
				areaID: '',
				areaPID: this.currentNode.areaID,
				code: '',
				depth: '',
				hotspotStatus: 'N',
				lat: '',
				lng: '',
				name: '',
				path: '',
				sortNumber: 1
			}
		},
		handleDelete(s, d, n){//删除节点
			this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.deleteArea(d.areaID)
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				})         
			})
		},
		submitForm(type) {
			const data = {
				areaPID: this.currentNode.areaPID,
				depth: this.currentNode.depth,
				code: this.currentNode.code,
				name: this.currentNode.name,
				lng: this.currentNode.lng,
				lat: this.currentNode.lat,
				hotspotStatus: this.currentNode.hotspotStatus,
				sortNumber: this.currentNode.sortNumber
			}
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				if (type == '立即创建') {
					BaseArea.add(data).then(res => {
						Message.success(res.data.msg)
						this.addRoot()
					})
				} else {
					data.areaID = this.currentNode.areaID
					BaseArea.update(data).then(res => {
						Message.success(res.data.msg)
						this.addRoot()
					})
				}
			})
		},
		loadNode(node, resolve) {
			if (node.level === 0) {
				this.getAreas('', areas => {
					return resolve(areas)
				})
				return
			}
			if (node.level > 0) {
				this.getAreas(node.data.areaID, areas => {
					return resolve(areas)
				})
				return
			}
		},
		// 获取区域列表
		getAreas(pid, callback) {
			BaseArea.getSubList({ pid }).then(res => {
				callback && callback(res)
			})
		},
		// 获取区域详情
		getArea(id) {
			BaseArea.findById({ id }).then(res => {
				this.currentNode = res
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
		deleteArea(id) {
			BaseArea.del({ id }).then(res => {
				Message.success(res.data.msg)
				this.addRoot()
				this.$refs['ruleForm'].resetFields()
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

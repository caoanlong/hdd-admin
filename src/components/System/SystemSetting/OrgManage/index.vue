<template>
	<div class="main-content">
		<el-card class="box-card menu-list">
			<div slot="header" class="clearfix">
				<span>机构列表</span>
			</div>
			<div class="tableControl">
				<el-button type="success" plain size="mini" icon="el-icon-plus" @click="addRoot">添加顶级节点</el-button>
			</div>
			<el-tree class="expand-tree" :load="loadNode" :props="defaultProps" node-key="Code" lazy highlight-current :expand-on-click-node="false" :render-content="renderContent" @node-click="handleNodeClick">
			</el-tree>
		</el-card>
		<el-card class="box-card menu-info">
			<div slot="header" class="clearfix">
				<span>{{title}}</span>
			</div>
			<el-form ref="form" :model="currentNode" label-width="80px">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="归属区域">
							<el-cascader
								style="width: 100%"
								:options="distData"
								v-model="selectedAreas"
								@change="handleDistChange">
							</el-cascader>
						</el-form-item>
						<el-form-item label="机构名称">
							<el-input v-model="currentNode.Name"></el-input>
						</el-form-item>
						<el-form-item label="机构级别">
							<el-select style="width: 100%" v-model="currentNode.Grade" placeholder="请选择">
								<el-option value="1" label="一级"></el-option>
								<el-option value="2" label="二级"></el-option>
								<el-option value="3" label="三级"></el-option>
								<el-option value="4" label="四级"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="主负责人">
							<el-select style="width: 100%" v-model="currentNode.PrimaryPerson" filterable placeholder="请选择">
								<el-option v-for="user in users" :key="user.User_ID" :label="user.Name" :value="user.User_ID">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="副负责人">
							<el-select style="width: 100%" v-model="currentNode.DeputyPerson" filterable placeholder="请选择">
								<el-option v-for="user in users" :key="user.User_ID" :label="user.Name" :value="user.User_ID">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="负责人">
							<el-input v-model="currentNode.Master"></el-input>
						</el-form-item>
						<el-form-item label="电话">
							<el-input v-model="currentNode.Phone"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="是否可用">
							<el-switch v-model="isUseable"></el-switch>
						</el-form-item>
						<el-form-item label="机构编码">
							<el-input v-model="currentNode.Code"></el-input>
						</el-form-item>
						
						<el-form-item label="机构类型">
							<el-select style="width: 100%" v-model="currentNode.Type" placeholder="请选择">
								<el-option value="1" label="公司"></el-option>
								<el-option value="2" label="部门"></el-option>
								<el-option value="3" label="小组"></el-option>
								<el-option value="0" label="其他"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="邮政编码">
							<el-input v-model="currentNode.ZipCode"></el-input>
						</el-form-item>
						<el-form-item label="传真">
							<el-input v-model="currentNode.Fax"></el-input>
						</el-form-item>
						<el-form-item label="邮箱">
							<el-input v-model="currentNode.Email"></el-input>
						</el-form-item>
						<el-form-item label="排序">
							<el-input-number v-model="currentNode.SortNumber" :min="1"></el-input-number>
						</el-form-item>
						
					</el-col>
				</el-row>
				<el-form-item label="联系地址">
							<el-input v-model="currentNode.Address"></el-input>
						</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" resize="none" v-model="currentNode.Remark"></el-input>
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
import { regionData } from 'element-china-area-data'
export default {
	data() {
		return {
			distData: regionData,
			defaultProps: {
				children: 'children',
				label: 'Name'
			},
			areaProps: {
				children: 'children',
				label: 'Name',
				value: 'Area_ID',
			},
			currentNode: {
				Area_ID: '',
				Name: '',
				Grade: '',
				PrimaryPerson: '',
				DeputyPerson: '',
				Master: '',
				Phone: '',
				Useable: '',
				Code: '',
				Type: '',
				ZipCode: '',
				Fax: '',
				Email: '',
				Address: '',
				Remark: '',
				SortNumber:''
			},
			isUseable: true,
			selectedAreas: [],
			users: [],
			title: '添加顶级节点',
			button: '立即创建',
			selectIcondialog: false,
			selectedIcon: '',
			iconTxt: '添加图标'
		}
	},
	created() {
		this.getUsers()
	},
	methods: {
		addRoot() {
			this.title = '添加顶级节点'
			this.button = '立即创建'
			this.currentNode = {
				Area_ID: '',
				Name: '',
				Grade: '',
				PrimaryPerson: '',
				DeputyPerson: '',
				Master: '',
				Phone: '',
				Useable: '',
				Code: '',
				Type: '',
				ZipCode: '',
				Fax: '',
				Email: '',
				Address: '',
				Remark: '',
				SortNumber:''
			}
		},
		handleNodeClick(d) {
			this.title = '编辑'
			this.button = '确认修改'
			this.getOrg(d.Organization_ID)
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
				Organization_PID: this.currentNode.Organization_ID,
				Area_ID: '',
				Name: '',
				Grade: '',
				PrimaryPerson: '',
				DeputyPerson: '',
				Master: '',
				Phone: '',
				Useable: '',
				Code: '',
				Type: '',
				ZipCode: '',
				Fax: '',
				Email: '',
				Address: '',
				Remark: '',
				SortNumber:''
			}
		},
		handleDelete(s, d, n){//删除节点
			this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let params = {
					Organization_ID: d.Organization_ID
				}
				this.deleteOrg(params)
				this.addRoot()
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				})         
			})
		},
		submitForm(type) {
			if (!this.currentNode.Name) {
				this.$message.error('机构名称不能为空！')
				return
			}
			if (!this.currentNode.Code) {
				this.$message.error('机构编码不能为空！')
				return
			}
			if (!this.currentNode.Grade) {
				this.$message.error('机构级别不能为空！')
				return
			}
			if (!this.currentNode.Type) {
				this.$message.error('机构类型不能为空！')
				return
			}
			// 创建
			if (type == '立即创建') {
				let params = {
					Organization_PID: this.currentNode.Organization_PID,
					Area_ID: this.selectedAreas[this.selectedAreas.length - 1],
					Name: this.currentNode.Name,
					Grade: this.currentNode.Grade,
					PrimaryPerson: this.currentNode.PrimaryPerson,
					DeputyPerson: this.currentNode.DeputyPerson,
					Master: this.currentNode.Master,
					Phone: this.currentNode.Phone,
					Useable: this.isUseable ? 'Y' : 'N',
					Code: this.currentNode.Code,
					Type: this.currentNode.Type,
					ZipCode: this.currentNode.ZipCode,
					Fax: this.currentNode.Fax,
					Email: this.currentNode.Email,
					Address: this.currentNode.Address,
					Remark: this.currentNode.Remark,
					SortNumber: this.currentNode.SortNumber
				}
				this.addOrg(params)
				this.addRoot()
			// 编辑
			} else {
				console.log(this.selectedAreas)
				let params = {
					Organization_ID: this.currentNode.Organization_ID,
					Organization_PID: this.currentNode.Organization_PID,
					Area_ID: this.selectedAreas[this.selectedAreas.length - 1],
					Name: this.currentNode.Name,
					Grade: this.currentNode.Grade,
					PrimaryPerson: this.currentNode.PrimaryPerson,
					DeputyPerson: this.currentNode.DeputyPerson,
					Master: this.currentNode.Master,
					Phone: this.currentNode.Phone,
					Useable: this.isUseable ? 'Y' : 'N',
					Code: this.currentNode.Code,
					Type: this.currentNode.Type,
					ZipCode: this.currentNode.ZipCode,
					Fax: this.currentNode.Fax,
					Email: this.currentNode.Email,
					Address: this.currentNode.Address,
					Remark: this.currentNode.Remark,
					SortNumber: this.currentNode.SortNumber
				}
				console.log(params)
				this.updateOrg(params)
				this.addRoot()
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
			if (node.level === 0) {
				this.getOrgs('', orgs => {
					return resolve(orgs)
				})
				return
			}
			if (node.level > 0) {
				this.getOrgs(node.data.Organization_ID, orgs => {
					return resolve(orgs)
				})
				return
			}
		},
		// 获取机构列表
		getOrgs(Organization_PID, callback) {
			let params = {
				Organization_PID
			}
			request({
				url: '/sys_organization/list',
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
		// 获取机构详情
		getOrg(Organization_ID) {
			let params = {
				Organization_ID
			}
			request({
				url: '/sys_organization/info',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.currentNode = res.data.data
					console.log(res.data.data)
					this.isUseable = res.data.data.Useable == 'Y' ? true : false
					let path = res.data.data.base_area.Path
					if (path) {
						this.selectedAreas = path.split(',').filter(item => item)
					}
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		// 添加机构
		addOrg(data) {
			request({
				url: '/sys_organization/add',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					Message.success(res.data.msg)
					this.getOrgs()
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		// 编辑机构
		updateOrg(data) {
			request({
				url: '/sys_organization/update',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					Message.success(res.data.msg)
					this.getOrgs()
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		// 删除机构
		deleteOrg(data) {
			request({
				url: '/sys_organization/delete',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					Message.success(res.data.msg)
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		// 获取用户列表
		getUsers() {
			let params = {
				pageIndex: 1,
				pageSize: 100
			}
			request({
				url: '/sys_user/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.users = res.data.data.rows
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		handleDistChange(val) {
			console.log('active item:', val)
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

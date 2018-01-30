<template>
	<div class="main-content">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
			<span>角色列表</span>
		  </div>
		  <div class="search">
			<el-form :inline="true"  class="demo-form-inline"  size="small">
			  <el-form-item label="角色名称：">
				<el-input  placeholder="角色名称"></el-input>
			  </el-form-item>
			  <el-form-item>
				<el-button type="primary">查询</el-button>
				<el-button type="default">重置</el-button>
			  </el-form-item>
			</el-form>
		  </div>
		  <div class="tableControl">
			<el-button type="default" size="mini" icon="el-icon-plus" @click.native="addRole">添加</el-button>
			<el-button type="default" size="mini" icon="el-icon-delete">批量删除</el-button>
			<el-button type="default" size="mini" icon="el-icon-refresh" @click.native="getRoles">刷新</el-button>
		  </div>
		  <div class="table">
			<el-table :data="roles" border style="width: 100%" size="mini">
				<el-table-column type="selection" align="center">
				</el-table-column>
				<el-table-column label="角色名称" prop="name">
				</el-table-column>
				<el-table-column label="英文名称" prop="enName">
				</el-table-column>
				<el-table-column label="归属机构" prop="organization">
				</el-table-column>
				<el-table-column label="数据范围" prop="dataRange">
				</el-table-column>
				<el-table-column label="操作" width="430" align="center">
					<template slot-scope="scope">
						<el-button-group>
							<el-button type="default" size="mini" icon="el-icon-view">查看</el-button>
							<el-button type="primary" size="mini" icon="el-icon-edit" title>修改</el-button>
							<el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
							<el-button type="default" size="mini" icon="el-icon-setting">权限设置</el-button>
							<el-button type="default" size="mini" icon="el-icon-plus">分配用户</el-button>
						</el-button-group>
					</template>
				</el-table-column>
			  </el-table>
			  <div class="pagination">
			  <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
			  </div>
		  </div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
	import request from '../../../../common/request'
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				roles: []
			}
		},
		created() {
			this.getRoles()
		},
		methods: {
			addRole() {
				this.$router.push({name: 'addrole'})
			},
			getRoles() {
				request({
					url: '/role',
					method: 'get'
				}).then(res => {
					if (res.data.code == 0) {
						console.log(res.data.data)
						this.roles = res.data.data.roles
					} else {
						Message.error(res.data.msg)
					}
				})
			}
		}
	}
</script>
<style lang="stylus">

</style>
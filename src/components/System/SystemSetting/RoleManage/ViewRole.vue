<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>查看角色</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="名称">
							<p v-text="role.name"></p>
						</el-form-item>
						<el-form-item label="英文名称">
							<p v-text="role.enName"></p>
						</el-form-item>
						<el-form-item label="组织机构">
							<p v-text="role.organizationName"></p>
						</el-form-item>
						<el-form-item label="角色类型">
							<p v-if="role.roleType=='assignment'">任务分配</p>
							<p v-else-if="role.roleType=='security'">管理角色</p>
							<p v-else>普通角色</p>
						</el-form-item>
						<el-form-item label="是否系统数据">
							<p>{{role.issys == 'Y' ? '是' : '否'}}</p>
						</el-form-item>
						<el-form-item label="是否可用">
							<p>{{role.useable == 'Y' ? '是' : '否'}}</p>
						</el-form-item>
						<el-form-item label="备注">
							<p v-text="role.remark"></p>
						</el-form-item>
						<el-form-item>
							<el-button @click.native="back">返回</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
	import request from '../../../../common/requestJava'
    import SysRole from '../../../../api/SysRole'
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				role: {
					name: '',
					enName: '',
					sysOrganization: '',
					roleType: '',
					DataScope: '',
					issys: '',
					useable: '',
					remark: ''
				}
			}
		},
		created() {
			this.getRole()
		},
		activated() {
			if(!this.$route.query.cache) {
				this.getRole()
			}
		},
		methods: {
            getRole() {
                SysRole.findById({
                    roleID: this.$route.query.roleID
                }).then(res => {
                    this.role = res
                })
            },
			back() {
				this.$router.go(-1)
			}
		}
	}
</script>
<style lang="stylus" scoped>
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
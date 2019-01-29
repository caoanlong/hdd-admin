<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>查看用户</span>
			</div>
			<el-row>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="头像">
							<ImageUpload :files="[user.photo]" :isPreview="true"/>
						</el-form-item>
						<el-form-item label="登录名">
							<p>{{user.loginName}}</p>
						</el-form-item>
						<el-form-item label="用户角色">
							<p>{{user.sysUserroleList.map(item => item.roleName).join(',')}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="邮箱">
							<p>{{user.email}}</p>
						</el-form-item>
						<el-form-item label="是否允许登录">
							<p>{{user.loginFlag == 'Y' ? '是' : '否'}}</p>
						</el-form-item>
						<el-form-item label="手机">
							<p>{{user.mobile}}</p>
						</el-form-item>
						<el-form-item label="用户类型">
							<p v-if="user.Type == 0">系统管理</p>
							<p v-else-if="user.Type == 1">部门经理</p>
							<p v-else>普通用户</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="工号">
							<p>{{user.jobNo}}</p>
						</el-form-item>
						<el-form-item label="姓名">
							<p>{{user.name}}</p>
						</el-form-item>
						<el-form-item label="电话">
							<p>{{user.phone}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="120px">
						<el-form-item label="备注">
							<p>{{user.remark}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="120px">
						<el-form-item>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import ImageUpload from '../../../CommonComponents/ImageUpload'
import SysUser from '../../../../api/SysUser'
export default {
	data() {
		return {
			user: {
				sysUserroleList: []
			}
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		getInfo() {
			const userID = this.$route.query.userID
			SysUser.findById({ userID }).then(res => {
				this.user = res
			})
		},
		back() {
			this.$router.go(-1)
		}
	},
	components: {
		ImageUpload
	}
}

</script>
<style lang="stylus" scoped>
.avatar-uploader
	line-height 1
	width 100px
	height 100px
	overflow hidden
	border 1px dashed #d9d9d9
	border-radius 6px
	&:hover 
		border-color #409eff
	.avatar-uploader-icon
		font-size 28px
		color #8c939d
		width 98px
		height 98px
		line-height 98px
		text-align center
	.avatar
		width 98px
		height 98px
		display block
		vertical-align top
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

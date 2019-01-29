<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>{{isEdit ? '编辑个人资料' : '查看个人资料'}}</span>
				<el-button 
					style="float: right; padding: 3px 0" 
					type="text" 
					@click="editInfo">
					{{isEdit ? '取消编辑' : '编辑'}}
				</el-button>
			</div>
			<el-row>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="头像">
							<ImageUpload 
								:files="[user.photo]" 
								@imgUrlBack="handleAvatarSuccess"
								:isPreview="!isEdit" 
								:fixed="true" 
								class="userFace">
							</ImageUpload>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="姓名">
							<el-input v-if="isEdit" v-model="user.name" :class="isEdit?'text-input':''"></el-input>
							<p v-text="user.name" v-else></p>
						</el-form-item>
						<el-form-item label="邮箱">
							<el-input v-if="isEdit" v-model="user.email" :class="isEdit?'text-input':''"></el-input>
							<p v-text="user.email" v-else></p>
						</el-form-item>
						<el-form-item label="用户名">
							<p v-text="user.loginName"></p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="手机">
							<el-input  v-if="isEdit" v-model="user.mobile" :class="isEdit?'text-input':''"></el-input>
							<p v-text="user.mobile" v-else></p>
						</el-form-item>
						<el-form-item label="电话">
							<el-input  v-if="isEdit" v-model="user.phone" :class="isEdit?'text-input':''"></el-input>
							<p v-text="user.phone" v-else></p>
						</el-form-item>
						<el-form-item label="用户类型">
							<p v-if="user.type == 0">系统管理</p>
							<p v-else-if="user.type == 1">部门经理</p>
							<p v-else-if="user.type == 2">普通用户</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="120px">
						<el-form-item label="用户角色">
							<p>{{user.sysRoles.map(item => item.name).join(',')}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="120px">
						<el-form-item label="备注">
							 <el-input 
							 	type="textarea"
							 	v-if="isEdit" 
								v-model="user.remark" 
								:class="isEdit?'text-input':''">
							</el-input>
							 <p v-text="user.remark" v-else></p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="120px">
						<el-form-item>
							<el-button @click="back">返回</el-button>
							<el-button type="primary" v-show="isEdit" @click="editUser">保存</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import ImageUpload from '../CommonComponents/ImageUpload'
import SysUser from '../../api/SysUser'
export default {
	data() {
		return {
			isEdit: false,
			user: {
				name: '',
				loginName: '',
				phone: '',
				mobile: '',
				email: '',
				remark: '',
				photo: '',
				sysRoles: [],
			}
		}
	},
	created() {
		this.getUseInfo()
	},
	methods: {
		editInfo() {
			this.isEdit = !this.isEdit
		},
		getUseInfo() {
			SysUser.userInfo().then(res => {
				this.user = res
			})
		},
		editUser() {
			SysUser.userUpdate({
				name: this.user.name,
				phone: this.user.phone,
				mobile: this.user.mobile,
				email: this.user.email,
				remark: this.user.remark,
				photo: this.user.photo
			}).then(res => {
				Message.success(res.data.msg)
				this.isEdit = !this.isEdit
				this.$store.dispatch('GetUserInfo')
			})
		},
		handleAvatarSuccess(res) {
			this.user.photo = res[0]
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
.userFace
	.imgLi
		margin 0
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
		box-sizing border-box
</style>
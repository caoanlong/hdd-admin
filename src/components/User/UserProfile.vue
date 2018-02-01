<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>{{isEdit ? '编辑个人资料' : '查看个人资料'}}</span>
				<el-button style="float: right; padding: 3px 0" type="text" @click="editInfo">{{isEdit ? '取消编辑' : '编辑'}}</el-button>
			</div>
			<el-form label-width="160px">
				<el-row :gutter="20">
					<el-col :span="12" :offset="4">
						<el-form-item label="头像">
							<el-upload 
								class="avatar-uploader"
								action="http://39.108.245.177:3001/uploadImg"  
								:show-file-list="false" 
								:on-success="handleAvatarSuccess"
								:disabled="!isEdit">
								<img v-if="user.avatar" :src="user.avatar" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item> 
						<el-form-item label="姓名">
							<el-input auto-complete="off" v-if="isEdit" v-model="user.name"></el-input>
							<p v-text="user.name" v-else></p>
						</el-form-item>
						<el-form-item label="邮箱">
							<el-input auto-complete="off" v-if="isEdit" v-model="user.email"></el-input>
							<p v-text="user.email" v-else></p>
						</el-form-item>
						<el-form-item label="手机">
							<el-input auto-complete="off"  v-if="isEdit" v-model="user.mobile"></el-input>
							<p v-text="user.mobile" v-else></p>
						</el-form-item>
						<el-form-item label="电话">
							<el-input auto-complete="off"  v-if="isEdit" v-model="user.tel"></el-input>
							<p v-text="user.tel" v-else></p>
						</el-form-item>
						<el-form-item label="公司">
							<el-input auto-complete="off" disabled v-model="user.company" v-if="isEdit"></el-input>
							<p v-text="user.company" v-else></p>
						</el-form-item>
						<el-form-item label="部门">
							<el-input auto-complete="off" disabled v-model="user.department" v-if="isEdit"></el-input>
							<p v-text="user.department" v-else></p>
						</el-form-item>
						<el-form-item label="用户名">
							<el-input auto-complete="off" disabled v-model="user.username" v-if="isEdit"></el-input>
							<p v-text="user.username" v-else></p>
						</el-form-item>
						<el-form-item label="注册手机号码">
							<el-input auto-complete="off"  v-if="isEdit" v-model="user.mobile"></el-input>
							<p v-text="user.mobile" v-else></p>
						</el-form-item>
						<el-form-item label="用户角色">
							<el-input auto-complete="off" disabled v-model="user.role.join('，')" v-if="isEdit"></el-input>
							<p v-text="user.role.join('，')" v-else></p>
						</el-form-item>
						<el-form-item label="用户类型">
							<el-input auto-complete="off"  disabled v-model="user.type" v-if="isEdit"></el-input>
							<p v-text="user.type" v-else></p>
						</el-form-item>
						<el-form-item label="备注">
							 <el-input auto-complete="off" v-if="isEdit" v-model="user.desc"></el-input>
							 <p v-text="user.desc" v-else></p>
						</el-form-item>
						<el-form-item>
							<el-button @click="back">返回</el-button>
							<el-button type="primary" v-show="isEdit" @click="editUser">保存</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
	</div>
</template>
<script type="text/javascript">
	import request from '../../common/request'
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				isEdit: false,
				user: {
					name: '',
					username: '',
					tel: '',
					mobile: '',
					password: '',
					company: '',
					department: '',
					email: '',
					jobNo: '',
					type: '',
					desc: '',
					avatar: '',
					role: [],
					isDisabled: '',
					lastLoginTime: '',
					lastLoginIp: ''
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
				request({
					url: '/user/detail',
					method: 'get',
				}).then(res => {
					if (res.data.code == 0) {
						this.user = res.data.data
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			editUser() {
				let data = this.user
				data.id = this.user._id
				request({
					url: '/user/update',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 0) {
						Message.success(res.data.msg)
						this.isEdit = !this.isEdit
						this.getUseInfo()
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			handleAvatarSuccess(res, file) {
				this.user.avatar = 'http://39.108.245.177:4000' + res.data
			},
			back() {
				this.$router.go(-1)
			}
		}
	}
</script>
<style lang="stylus">
.avatar-uploader 
	.el-upload 
		border 1px dashed #d9d9d9
		border-radius 6px
		cursor pointer
		position relative
		overflow hidden
		vertical-align top
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

.el-form-item__content
	p
		margin 0
		border 1px solid #fff
		border-bottom-color #dcdfe6
		padding 0 15px
		height 40px
	    font-family sans-serif
	    line-height 40px
	    color #999
	.el-input__inner
		vertical-align top
</style>
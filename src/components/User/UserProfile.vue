<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>{{isEdit ? '编辑个人资料' : '查看个人资料'}}</span>
				<el-button style="float: right; padding: 3px 0;margin-left:10px" type="text" @click="editInfo">{{isEdit ? '取消编辑' : '编辑资料'}}</el-button>
				<el-button style="float: right; padding: 3px 0;" type="text" @click="dialogVisible = true">修改密码</el-button>
				
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
								<img v-if="user.Photo" :src="user.Photo" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item> 
						<el-form-item label="姓名">
							<el-input auto-complete="off" v-if="isEdit" v-model="user.Name"></el-input>
							<p v-text="user.Name" v-else></p>
						</el-form-item>
						<el-form-item label="邮箱">
							<el-input auto-complete="off" v-if="isEdit" v-model="user.Email"></el-input>
							<p v-text="user.Email" v-else></p>
						</el-form-item>
						<el-form-item label="手机">
							<el-input auto-complete="off"  v-if="isEdit" v-model="user.Mobile"></el-input>
							<p v-text="user.Mobile" v-else></p>
						</el-form-item>
						<el-form-item label="电话">
							<el-input auto-complete="off"  v-if="isEdit" v-model="user.Phone"></el-input>
							<p v-text="user.Phone" v-else></p>
						</el-form-item>
						<el-form-item label="公司">
							<el-input auto-complete="off" disabled v-model="user.Company_ID" v-if="isEdit"></el-input>
							<p v-text="user.Company_ID" v-else></p>
						</el-form-item>
						<el-form-item label="部门">
							<el-input auto-complete="off" disabled v-model="user.Organization_ID" v-if="isEdit"></el-input>
							<p v-text="user.Organization_ID" v-else></p>
						</el-form-item>
						<el-form-item label="用户名">
							<el-input auto-complete="off" disabled v-model="user.LoginName" v-if="isEdit"></el-input>
							<p v-text="user.LoginName" v-else></p>
						</el-form-item>
						<el-form-item label="用户角色">
							<el-input auto-complete="off" disabled v-model="user.sys_roles.map(item => item.Name).join(',')" v-if="isEdit"></el-input>
							<p v-else>{{user.sys_roles.map(item => item.Name).join(',')}}</p>
						</el-form-item>
						<!-- <el-form-item label="用户类型">
							<el-input auto-complete="off" disabled v-model="user.Type" v-if="isEdit"></el-input>
							<p v-else>{{user.Type}}</p>
						</el-form-item> -->
						<el-form-item label="备注">
							 <el-input auto-complete="off" v-if="isEdit" v-model="user.Remark"></el-input>
							 <p v-text="user.Remark" v-else></p>
						</el-form-item>
						<el-form-item>
							<el-button @click="back">返回</el-button>
							<el-button type="primary" v-show="isEdit" @click="editUser">保存</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
		<el-dialog title="修改密码" :visible.sync="dialogVisible" width="400px">
			<el-form label-width="80px">
				<el-form-item label="原密码">
					<el-input auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="新密码">
					<el-input auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="确认密码">
					<el-input auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="modifyPWD">确 定</el-button>
			</div>
		</el-dialog>
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
					Name: '',
					LoginName: '',
					Phone: '',
					Mobile: '',
					Company_ID: '',
					Organization_ID: '',
					Email: '',
					Remark: '',
					Photo: '',
					Password:'',
					sys_roles: []
				},
				dialogVisible: false
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
					url: '/user/info',
					method: 'get',
				}).then(res => {
					if (res.data.code == 0) {
						this.user = res.data.data
						console.log(res.data.data)
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			editUser() {
				let data  ={
					Name: this.user.Name,
					Phone: this.user.Phone,
					Mobile: this.user.Mobile,
					Email: this.user.Email,
					Remark: this.user.Remark,
					Photo: this.user.Photo
				}
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
			modifyPWD() {
				let data  ={
					Password: this.user.Password
				}
				request({
					url: '/user/update',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 0) {
						Message.success(res.data.msg)
						this.dialogVisible = false
					} else {
						Message.error(res.data.msg)
					}
				})
				console.log(this.dialogVisible)
			},
			handleAvatarSuccess(res, file) {
				this.user.Photo = 'http://39.108.245.177:4000' + res.data
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
		font-family 'sans-serif'
		line-height 40px
		color #999
	.el-input__inner
		vertical-align top
</style>
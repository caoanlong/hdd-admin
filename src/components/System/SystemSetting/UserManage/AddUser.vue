<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>添加用户</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<!-- <el-form-item label="头像">
							<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/":show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"  v-model="user.avatar">
								<img v-if="imageUrl" :src="avatar" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item> -->
						<el-form-item label="归属公司">
							<el-select style="width: 100%" placeholder="请选择" v-model="user.company">
								<el-option label="总公司" value="总公司"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="归属部门">
							<el-select style="width: 100%" placeholder="请选择" v-model="user.department">
								<el-option label="市场部" value="市场部"></el-option>
								<el-option label="行政部" value="行政部"></el-option>
								<el-option label="财务部" value="财务部"></el-option>
								<el-option label="技术部" value="技术部"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="工号">
							<el-input auto-complete="off" v-model="user.jobNo"></el-input>
						</el-form-item>
						<el-form-item label="姓名">
							<el-input auto-complete="off" v-model="user.name"></el-input>
						</el-form-item>
						<el-form-item label="登录名">
							<el-input auto-complete="off" v-model="user.username"></el-input>
						</el-form-item>
						<el-form-item label="密码">
							<el-input auto-complete="off" v-model="user.password"></el-input>
						</el-form-item>
						<el-form-item label="确认密码">
							<el-input auto-complete="off" v-model="user.password2"></el-input>
						</el-form-item>
						<el-form-item label="邮箱">
							<el-input auto-complete="off" v-model="user.email"></el-input>
						</el-form-item>
						<el-form-item label="电话">
							<el-input auto-complete="off" v-model="user.tel"></el-input>
						</el-form-item>
						<el-form-item label="手机">
							<el-input auto-complete="off" v-model="user.mobile"></el-input>
						</el-form-item>
						<el-form-item label="是否允许登录">
							<el-radio-group v-model="user.isDisabled">
								<el-radio :label="false">是</el-radio>
								<el-radio :label="true">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="用户类型">
							<el-select style="width: 100%" placeholder="请选择" v-model="user.type">
								<el-option label="系统管理" value="系统管理"></el-option>
								<el-option label="部门经理" value="部门经理"></el-option>
								<el-option label="普通用户" value="普通用户"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="用户角色">
							<el-checkbox-group  v-model="user.role">
								<el-checkbox label="管理员"></el-checkbox>
								<el-checkbox label="客服人员"></el-checkbox>
								<el-checkbox label="系统管理员"></el-checkbox>
								<el-checkbox label="运维管理员"></el-checkbox>
							</el-checkbox-group>
						</el-form-item>					
						<el-form-item label="备注">
							<el-input type="textarea" resize="none" v-model="user.desc" :rows="5"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click.native="addUser">立即创建</el-button>
							<el-button>取消</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
	import request from '../../../../common/request'
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				user: {
					name: '',
					username: '',
					tel: '',
					mobile: '',
					password: '',
					company: '',
					department: '',
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
		methods: {
			addUser() {
				let data = this.user
				console.log(JSON.stringify(data))
				request({
					url: '/user/add',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 0) {
						console.log(res.data)
						Message.success(res.data.msg)
						this.$router.push({name: 'usermanage'})
					} else {
						Message.error(res.data.msg)
					}
				})
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

</style>
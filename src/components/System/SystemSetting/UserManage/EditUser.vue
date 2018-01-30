<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>{{isEdit ? '编辑用户' : '查看用户'}}</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<!-- <el-form-item label="头像">
							<el-upload action="" class="avatar-uploader" :show-file-list="false"  v-model="user.avatar" v-if="isEdit">
								<img v-if="avatar" :src="avatar" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
							<img v-else :src="avatar" class="avatar">
						</el-form-item> -->
						<el-form-item label="归属公司">
							<el-select style="width: 100%" placeholder="请选择" v-model="user.company" :disabled="!isEdit">
								<el-option label="总公司" value="总公司"></el-option>
								<el-option label="市场部" value="市场部"></el-option>
								<el-option label="行政部" value="行政部"></el-option>
								<el-option label="研发部" value="研发部"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="归属部门">
							<el-select style="width: 100%" placeholder="请选择" v-model="user.department" :disabled="!isEdit">
								<el-option label="任务分配" value="任务分配"></el-option>
								<el-option label="管理角色" value="管理角色"></el-option>
								<el-option label="普通角色" value="普通角色"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="工号">
							<el-input auto-complete="off" v-model="user.jobNo" :disabled="!isEdit"></el-input>
						</el-form-item>
						<el-form-item label="姓名">
							<el-input auto-complete="off" v-model="user.name" :disabled="!isEdit"></el-input>
						</el-form-item>
						<el-form-item label="登录名">
							<el-input auto-complete="off" v-model="user.username" :disabled="!isEdit"></el-input>
						</el-form-item>
						<el-form-item label="密码" v-model="user.password" v-if="isEdit">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="确认密码" v-model="user.password2" v-if="isEdit">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="邮箱">
							<el-input auto-complete="off" v-model="user.email" :disabled="!isEdit"></el-input>
						</el-form-item>
						<el-form-item label="电话">
							<el-input auto-complete="off" v-model="user.tel" :disabled="!isEdit"></el-input>
						</el-form-item>
						<el-form-item label="手机">
							<el-input auto-complete="off" v-model="user.mobile" :disabled="!isEdit"></el-input>
						</el-form-item>
						<el-form-item label="是否允许登录">
							<el-radio-group v-model="user.isDisabled" :disabled="!isEdit">
								<el-radio :label="false">是</el-radio>
								<el-radio :label="true">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="用户类型">
							<el-select style="width: 100%" placeholder="请选择" v-model="user.type" :disabled="!isEdit">
								<el-option label="任务分配" value="任务分配"></el-option>
								<el-option label="管理角色" value="管理角色"></el-option>
								<el-option label="普通角色" value="普通角色"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="用户角色">
							<el-checkbox-group  v-model="user.role" :disabled="!isEdit">
								<el-checkbox label="管理员"></el-checkbox>
								<el-checkbox label="客服人员"></el-checkbox>
								<el-checkbox label="系统管理员"></el-checkbox>
								<el-checkbox label="运维管理员"></el-checkbox>
							</el-checkbox-group>
						</el-form-item>					
						<el-form-item label="备注">
							<el-input type="textarea" resize="none" v-model="user.desc" :rows="5" :disabled="!isEdit"></el-input>
						</el-form-item>
						<el-form-item v-if="isEdit">
							<el-button type="primary" @click.native="addUser">立即保存</el-button>
							<el-button>取消</el-button>
						</el-form-item>
						<el-form-item v-else>
							<el-button>返回</el-button>
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
					role: '',
					isDisabled: '',
					lastLoginTime: '',
					lastLoginIp: ''
				}
			}
		},
		created() {
			this.isEdit = this.$route.query.type == 'edit'
			this.getUser()
		},
		methods: {
			getUser() {
				let params = {
					id: this.$route.query.id
				}
				request({
					url: '/user/info',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 0) {
						console.log(res.data)
						this.user = res.data.data
						Message.success(res.data.msg)
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			addUser() {
				let data = this.user
				data.id = this.user._id
				console.log(JSON.stringify(data))
				request({
					url: '/user/update',
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
	
</style>
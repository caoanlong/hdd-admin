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
							<el-upload class="avatar-uploader"
							  action=""  :show-file-list="false" :disabled="!isEdit">
							  <i class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item> 
						<el-form-item label="姓名">
							<el-input auto-complete="off" :disabled="!isEdit"></el-input>
						</el-form-item>
						<el-form-item label="邮箱">
							<el-input auto-complete="off" :disabled="!isEdit"></el-input>
						</el-form-item>
						<el-form-item label="手机">
							<el-input auto-complete="off" :disabled="!isEdit"></el-input>
						</el-form-item>
						<el-form-item label="电话">
							<el-input auto-complete="off" :disabled="!isEdit"></el-input>
						</el-form-item>
						<el-form-item label="公司">
							<el-input auto-complete="off" disabled></el-input>
						</el-form-item>
						<el-form-item label="部门">
							<el-input auto-complete="off" disabled></el-input>
						</el-form-item>
						<el-form-item label="用户名">
							<el-input auto-complete="off" disabled></el-input>
						</el-form-item>
						<el-form-item label="注册手机号码">
							<el-input auto-complete="off" :disabled="!isEdit"></el-input>
						</el-form-item>
						<el-form-item label="用户角色">
							<el-input auto-complete="off" disabled></el-input>
						</el-form-item>
						<el-form-item label="用户类型">
							<el-input auto-complete="off"  disabled></el-input>
						</el-form-item>
						<el-form-item label="备注">
							 <el-input type="textarea" :rows="4" resize="none" :disabled="!isEdit"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" v-show="isEdit">保存</el-button>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				isEdit: false,
				userInfo: {}
			}
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
						this.userInfo = res.data.data
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
<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span v-show="isEdit">编辑个人资料</span>
				<span v-show="!isEdit">个人资料</span>
				<el-button style="float: right; padding: 3px 0" type="text" @click="editInfo">编辑</el-button>
			</div>
			<el-form label-width="160px">
				<el-row :gutter="20">
					<el-col :span="3">
						<el-form-item label="头像">
							<el-upload class="avatar-uploader"
							  action=""  :show-file-list="false" :disabled="!isEdit">
							  <i class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item> 
					</el-col>
					<el-col :span="12">
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
						<el-form-item v-show="isEdit">
							<el-button type="primary">保存</el-button>
							<el-button>取消</el-button>
						</el-form-item>
						<el-form-item v-show="!isEdit">
							<el-button type="primary">返回</el-button>
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
				isEdit: false
			}
		},
		methods: {
			editInfo() {
				this.isEdit = !this.isEdit
				console.log(this.isEdit)
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
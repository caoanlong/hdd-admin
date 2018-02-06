<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>查看字典</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="键值">
							<p>{{dict.VALUE}}</p>
						</el-form-item>
						<el-form-item label="标签">
							<p>{{dict.NAME}}</p>
						</el-form-item>
						<el-form-item label="类型">
							<p>{{dict.TYPE}}</p>
						</el-form-item>
						<el-form-item label="描述">
							<p>{{dict.Description}}</p>
						</el-form-item>
						<el-form-item label="排序">
							<p>{{dict.SortNumber}}</p>
						</el-form-item>
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
	import request from '../../../../common/request'
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				dict: {
					Dict_ID:'',
					TYPE:'',
					NAME:'',
					VALUE:'',
					Description:'',
					SortNumber:''
				}
			}
		},
		created() {
			this.getDict()
		},
		methods: {
			getDict() {
				let params = {
					Dict_ID: this.$route.query.Dict_ID
				}
				request({
					url: '/sys_dict/info',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 0) {
						this.dict = res.data.data
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
.el-form-item
	margin-bottom 10px
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
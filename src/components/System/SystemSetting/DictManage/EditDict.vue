<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>编辑用户</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="键值">
							<el-input auto-complete="off" v-model="dict.VALUE"></el-input>
						</el-form-item>
						<el-form-item label="标签">
							<el-input auto-complete="off" v-model="dict.NAME"></el-input>
						</el-form-item>
						<el-form-item label="类型">
							<el-input auto-complete="off" v-model="dict.TYPE"></el-input>
						</el-form-item>
						<el-form-item label="描述">
							<el-input auto-complete="off" v-model="dict.Description"></el-input>
						</el-form-item>
						<el-form-item label="排序">
							<el-input-number v-model="dict.SortNumber" :min="1"></el-input-number>
						</el-form-item>

						<el-form-item>
							<el-button type="primary" @click.native="editDict">立即保存</el-button>
							<el-button @click="back">取消</el-button>
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
						console.log(this.dict)
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			editDict() {
				let data= {
					Dict_ID:this.dict.Dict_ID,
					TYPE:this.dict.TYPE,
					NAME:this.dict.NAME,
					VALUE:this.dict.VALUE,
					Description:this.dict.Description,
					SortNumber:this.dict.SortNumber
				}
				console.log(data)
				request({
					url: '/sys_dict/update',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 0) {
						Message.success(res.data.msg)
						this.$router.push({name: 'dictmanage'})
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
.el-checkbox
	margin-left 0!important
	margin-right 30px
</style>
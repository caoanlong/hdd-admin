<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>添加基础常量</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="常量类型" >
							<el-input auto-complete="off" v-model="constant.Type"></el-input>
						</el-form-item>
						<el-form-item label="代码" >
							<el-input auto-complete="off" v-model="constant.Code"></el-input>
						</el-form-item>
						<el-form-item label="名称" >
							<el-input auto-complete="off" v-model="constant.Name"></el-input>
						</el-form-item>
						<el-form-item label="值" >
							<el-input auto-complete="off" v-model="constant.Value"></el-input>
						</el-form-item>
						<el-form-item label="排序" >
							<el-input-number v-model="constant.SortNumber" :min="1"></el-input-number>
						</el-form-item>
						<el-form-item label="描述" >
							<el-input auto-complete="off" type="textarea" v-model="constant.Description"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click.native="addConfig">立即保存</el-button>
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
				constant: {
					Type:'',
					Code:'',
					Name:'',
					Value:'',
					Description:'',
					SortNumber:''
				}
			}
		},
		methods: {
			addConfig() {
				let data= {
					Type:this.constant.Type,
					Code:this.constant.Code,
					Name:this.constant.Name,
					Value:this.constant.Value,
					Description:this.constant.Description,
					SortNumber:this.constant.SortNumber
				}
				request({
					url: '/base_conststand/add',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 0) {
						Message.success(res.data.msg)
						this.$router.push({name: 'constmanage'})
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
</style>
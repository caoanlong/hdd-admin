<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>查看汽车品牌</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="名称">
							<p>{{truckBrand.Name}}</p>
						</el-form-item>
						<el-form-item label="代码">
							<p>{{truckBrand.Code}}</p>
						</el-form-item>
						<el-form-item label="是否生效">
							<p>{{truckBrand.Enable == 'Y' ? '是' : '否'}}</p>
						</el-form-item>
						<el-form-item label="图片">
							<ImageUpload 
								:files="[truckBrand.PictureURL]" 
								:isPreview="true"/>
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
	import ImageUpload from '../../../CommonComponents/ImageUpload'
	export default {
		data() {
			return {
				truckBrand: {
					Name: '',
					Code: '',
					Enable: '',
					PictureURL: ''
				}
			}
		},
		created() {
			this.getTruckBrand()
		},
		methods: {
			getTruckBrand() {
				let params= {
					TruckBrand_ID: this.$route.query.TruckBrand_ID
				}
				request({
					url: '/base_truckbrand/info',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 0) {
						this.truckBrand = res.data.data
					} else {
						Message.error(res.data.msg)
					}
				})
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
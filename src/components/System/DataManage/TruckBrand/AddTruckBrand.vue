<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>添加汽车品牌</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="名称">
							<el-input v-model="truckBrand.Name"></el-input>
						</el-form-item>
						<el-form-item label="代码">
							<el-input v-model="truckBrand.Code"></el-input>
						</el-form-item>
						<el-form-item label="是否生效">
                            <el-switch v-model="truckBrand.Enable"></el-switch>
						</el-form-item>
                        <el-form-item label="图片">
                            <el-upload
								class="avatar-uploader"
								action="http://39.108.245.177:3001/uploadImg" 
								:show-file-list="false" 
								:on-success="handleAvatarSuccess">
								<img v-if="truckBrand.PictureURL" :src="truckBrand.PictureURL" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click.native="addTruckBrand">立即保存</el-button>
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
				truckBrand: {
					Name: '',
					Code: '',
					Enable: true,
					PictureURL: ''
				}
			}
		},
		methods: {
			addTruckBrand() {
				let data= {
					Name: this.truckBrand.Name,
					Code: this.truckBrand.Code,
					Enable: this.truckBrand.Enable ? 'Y' : 'N',
					PictureURL: this.truckBrand.PictureURL,
				}
				request({
					url: '/base_truckbrand/add',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 0) {
						Message.success(res.data.msg)
						this.$router.push({name: 'truckbrand'})
					} else {
						Message.error(res.data.msg)
					}
				})
            },
            handleAvatarSuccess(res, file) {
				this.truckBrand.PictureURL = 'http://39.108.245.177:4000' + res.data
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
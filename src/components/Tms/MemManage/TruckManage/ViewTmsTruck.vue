<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>车辆详情</span>
			</div>
			<el-row :gutter="20">
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="所属地区">
							<p></p>
						</el-form-item>
						<el-form-item label="车牌号">
							<p></p>
						</el-form-item>
						<el-form-item label="车辆类型">
							<p></p>
						</el-form-item>
						<el-form-item label="道路运输证年审期至">
							<p></p>
						</el-form-item>
						<el-form-item label="等级评定">
							<p></p>
						</el-form-item>
						<el-form-item label="下次二级维护日期">
							<p></p>
						</el-form-item>
						<el-form-item label="罐体容积">
							<p></p>
						</el-form-item>
						<el-form-item label="压力表检测有效期至">
							<p></p>
						</el-form-item>
						<el-form-item label="品牌型号">
							<p></p>
						</el-form-item>
						<el-form-item label="行驶证注册日期">
							<p></p>
						</el-form-item>
						<el-form-item label="车长">
							<p></p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="所性企业">
							<p></p>
						</el-form-item>
						<el-form-item label="车牌颜色">
							<p></p>
						</el-form-item>
						<el-form-item label="道路运输证号">
							<p></p>
						</el-form-item>
						<el-form-item label="行驶证审验效期至">
							<p></p>
						</el-form-item>
						<el-form-item label="下次等评日期">
							<p></p>
						</el-form-item>
						<el-form-item label="载重">
							<p></p>
						</el-form-item>
						<el-form-item label="罐体检测有效期至">
							<p></p>
						</el-form-item>
						<el-form-item label="挂车车牌">
							<p></p>
						</el-form-item>
						<el-form-item label="发动机号">
							<p></p>
						</el-form-item>
						<el-form-item label="行驶证发证日期">
							<p></p>
						</el-form-item>
						<el-form-item label="车宽">
							<p></p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="自编号">
							<p></p>
						</el-form-item>
						<el-form-item label="车辆类别">
							<p></p>
						</el-form-item>
						<el-form-item label="经营范围">
							<p></p>
						</el-form-item>
						<el-form-item label="承运人责任险有效期至">
							<p></p>
						</el-form-item>
						<el-form-item label="二级维护日期">
							<p></p>
						</el-form-item>
						<el-form-item label="罐体类型">
							<p></p>
						</el-form-item>
						<el-form-item label="安全阀检测有效期至">
							<p></p>
						</el-form-item>
						<el-form-item label="汽车生产厂家">
							<p></p>
						</el-form-item>
						<el-form-item label="车架号">
							<p></p>
						</el-form-item>
						<el-form-item label="牵引质量">
							<p></p>
						</el-form-item>
						<el-form-item label="车高">
							<p></p>
						</el-form-item>

					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="160px">
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
	import requestJava from '../../../../common/requestJava'
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				bankInfo: {}
			}
        },
        created() {
            // this.getBank()
        },
		methods: {
            getBank() {
                let params= {
					TruckBrand_ID: this.$route.query.TruckBrand_ID,
				}
				requestJava({
					url: '/base_truckbrand/info',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 200) {
                        this.bankInfo = res.data.data
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			previewImg(imgUrl) {
				this.$alert(`<img style="width: 100%" src=${imgUrl} />`, '图片预览', {
					dangerouslyUseHTMLString: true,
					showConfirmButton: false,
					customClass: 'img-preview'
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
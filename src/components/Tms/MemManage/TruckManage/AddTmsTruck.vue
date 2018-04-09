<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>添加车辆</span>
			</div>
			<el-row :gutter="20">
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="所属地区">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="车牌号">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="车辆类型">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="道路运输证年审期至">
							<el-date-picker type="date" placeholder="选择日期" style="width:100%" v-model="date"></el-date-picker>
						</el-form-item>
						<el-form-item label="等级评定">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="下次二级维护日期">
							<el-date-picker type="date" placeholder="选择日期" style="width:100%" v-model="date"></el-date-picker>
						</el-form-item>
						<el-form-item label="罐体容积">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="压力表检测有效期至">
							<el-date-picker type="date" placeholder="选择日期" style="width:100%" v-model="date"></el-date-picker>
						</el-form-item>
						<el-form-item label="品牌型号">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="行驶证注册日期">
							<el-date-picker type="date" placeholder="选择日期" style="width:100%" v-model="date"></el-date-picker>
						</el-form-item>
						<el-form-item label="车长">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="所性企业">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="车牌颜色">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="道路运输证号">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="行驶证审验效期至">
							<el-date-picker type="date" placeholder="选择日期" style="width:100%" v-model="date"></el-date-picker>
						</el-form-item>
						<el-form-item label="下次等评日期">
							<el-date-picker type="date" placeholder="选择日期" style="width:100%" v-model="date"></el-date-picker>
						</el-form-item>
						<el-form-item label="载重">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="罐体检测有效期至">
							<el-date-picker type="date" placeholder="选择日期" style="width:100%" v-model="date"></el-date-picker>
						</el-form-item>
						<el-form-item label="挂车车牌">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="发动机号">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="行驶证发证日期">
							<el-date-picker type="date" placeholder="选择日期" style="width:100%" v-model="date"></el-date-picker>
						</el-form-item>
						<el-form-item label="车宽">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="自编号">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="车辆类别">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="经营范围">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="承运人责任险有效期至">
							<el-date-picker type="date" placeholder="选择日期" style="width:100%" v-model="date"></el-date-picker>
						</el-form-item>
						<el-form-item label="二级维护日期">
							<el-date-picker type="date" placeholder="选择日期" style="width:100%" v-model="date"></el-date-picker>
						</el-form-item>
						<el-form-item label="罐体类型">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="安全阀检测有效期至">
							<el-date-picker type="date" placeholder="选择日期" style="width:100%" v-model="date"></el-date-picker>
						</el-form-item>
						<el-form-item label="汽车生产厂家">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="车架号">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="牵引质量">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="车高">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>

					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="160px">
						<el-form-item>
							<el-button type="primary">保存</el-button>
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
				bankInfo: {},
				date:''
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

</style>
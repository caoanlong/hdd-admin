<template>
	<div class="main-content" style="min-width: 1200px">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>车辆详情</span>
			</div>
			<el-form label-width="160px">
				<el-row>
					<el-col :span="8">
						<el-form-item label="所属地区">
							<p>{{info.area}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="所属企业">
							<p>{{info.companyName}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="自编号">
							<p>{{info.code}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="车牌号">
							<p>{{info.plateNo}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="车牌颜色">
							<p>{{info.plateNoColor}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="车辆类别">
							<p>{{info.truckCategory}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="车辆类型">
							<p>{{info.truckType}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="道路运输证号">
							<p>{{info.roadTransportNo}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="经营范围">
							<p>{{info.businessScope}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="道路运输证年审期至">
							<p v-if="info.roadTransportLicAnnualPeriod">{{info.roadTransportLicAnnualPeriod | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="行驶证审验效期至">
							<p v-if="info.driverLicExamineExpires">{{info.driverLicExamineExpires | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="承运人责任险有效期至">
							<p v-if="info.carrierRiskInsuranceExpires">{{info.carrierRiskInsuranceExpires | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="等级评定">
							<p>{{info.rank}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="下次等评日期">
							<p v-if="info.nextRankEvaluteTime">{{info.nextRankEvaluteTime | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="二级维护日期">
							<p v-if="info.secondaMaintainTime">{{info.secondaMaintainTime | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="下次二级维护日期">
							<p v-if="info.nextSecondLevel">{{info.nextSecondLevel | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="载重">
							<p>{{info.loads}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="罐体类型">
							<p>{{info.cannedType}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="罐体容积">
							<p>{{info.tankVolume}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="罐体检测有效期至">
							<p v-if="info.tankQCExpires">{{info.tankQCExpires | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="安全阀检测有效期至">
							<p v-if="info.safetyValvesQCExpires">{{info.safetyValvesQCExpires | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="压力表检测有效期至">
							<p v-if="info.pressureGaugeQCExpires">{{info.pressureGaugeQCExpires | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="挂车车牌">
							<p>{{info.trailerPlateNo}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="汽车生产厂家">
							<p>{{info.manufacturer}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="品牌型号">
							<p>{{info.carBrandModel}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="发动机号">
							<p>{{info.engineNO}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="车架号">
							<p>{{info.vehicleFrameNO}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="行驶证注册日期">
							<p v-if="info.driverLicRegisterTime">{{info.driverLicRegisterTime | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="行驶证发证日期">
							<p v-if="info.driverLicIssueTime">{{info.driverLicIssueTime | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="牵引质量">
							<p>{{info.tractiveTonnage}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="车长">
							<p>{{info.length}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="车宽">
							<p>{{info.width}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="车高">
							<p>{{info.high}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item>
					<el-button @click="back">返回</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>
<script type="text/javascript">
	import requestJava from '../../../../common/requestJava'
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				info: {}
			}
        },
        created() {
            this.getInfo()
        },
		methods: {
            getInfo() {
                let params= {
					truckID: this.$route.query.truckID,
				}
				requestJava({
					url: '/truck/info',
					params
				}).then(res => {
                    this.info = res.data.data
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
		min-height 40px
		font-family 'sans-serif'
		line-height 40px
		color #999
	.el-input__inner
		vertical-align top
</style>
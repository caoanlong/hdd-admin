<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>人员详情</span>
			</div>
			<el-form label-width="160px">
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="姓名">
							<p>{{staff.realName}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="性别">
							<p>{{staff.sex}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="身份证号">
							<p>{{staff.idCardNum}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="家庭地址">
							<p>{{staff.homeAddress}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="联系电话">
							<p>{{staff.mobile}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="聘用岗位">
							<p>{{staff.position}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="创建人">
							<p>{{staff.createName}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="审核人">
							<p>{{staff.auditName}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="审核日期">
							<p v-if="staff.auditTime">{{staff.auditTime | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="状态">
							<p v-if="staff.status == 'Passed'">通过</p>
							<p v-else-if="staff.status == 'NotPassed'">不通过</p>
							<p v-else-if="staff.status == 'Other'">其他</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="准驾车型">
							<p>{{staff.quasiDrivingType}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="驾驶证初次发证件时间">
							<p v-if="staff.driverLicenseFirstTime">{{staff.driverLicenseFirstTime | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="驾驶证审验有效期至">
							<p v-if="staff.driverLicExamineEndTime">{{staff.driverLicExamineEndTime | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="合同有效期起">
							<p v-if="staff.laborContractBeginTime">{{staff.laborContractBeginTime | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="合同有效期至">
							<p v-if="staff.laborContractEndTime">{{staff.laborContractEndTime | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="从业资格证件号">
							<p>{{staff.qualificationCode}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="从业资格类别">
							<p>{{staff.qualificationType}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="从业资格证有效期至">
							<p v-if="staff.qualificationExpirationTime">{{staff.qualificationExpirationTime | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="诚信考核等级">
							<p>{{staff.integrityExamineGrade}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="诚信考核有效期至">
							<p v-if="staff.integrityExamineEndTime">{{staff.integrityExamineEndTime | getdatefromtimestamp(true)}}</p>
							<p v-else></p>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="职称或技术等级">
							<p>{{staff.titleLever}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="备注说明">
							<p>{{staff.remark}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-col>
				</el-row>
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
			staff: {}
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		getInfo() {
			let params = {
				staffID: this.$route.query.staffID
			}
			requestJava({
				url: '/staff/findById',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 200) {
					this.PersonDetail = res.data.data
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
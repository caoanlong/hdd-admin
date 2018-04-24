<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>编辑人员</span>
			</div>
			<el-form label-width="160px" :model="staff" :rules="rules" ref="ruleForm">
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="姓名" prop="realName">
							<el-input placeholder="请输入姓名" v-model="staff.realName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="性别" prop="sex">
							<el-radio-group v-model="staff.sex">
								<el-radio label="M">男</el-radio>
								<el-radio label="F">女</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="身份证号" prop="idCardNum">
							<el-input placeholder="请输入内容" v-model="staff.idCardNum"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="家庭地址" prop="homeAddress">
							<el-input placeholder="请输入内容" v-model="staff.homeAddress"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="联系电话" prop="mobile">
							<el-input placeholder="请输入内容" v-model="staff.mobile"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="聘用岗位"  prop="position">
							<el-select style="width: 100%" multiple v-model="position" placeholder="请选择" @change="changePost">
								<el-option label="操作员" value="Operator"></el-option>
								<el-option label="驾驶员" value="Driver"></el-option>
								<el-option label="押运员" value="Supercargo"></el-option>
								<el-option label="专职安全员" value="SafetyOfficer"></el-option>
								<el-option label="装卸管理人员" value="Stevedore"></el-option>
								<el-option label="其他人员" value="Other"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="创建人" prop="createName">
							<el-input placeholder="请输入内容" v-model="staff.createName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="审核人" prop="auditName">
							<el-input placeholder="请输入内容" v-model="staff.auditName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="审核日期" prop="auditTime">
							<el-date-picker :editable="false" placeholder="选择日期" style="width:100%" v-model="staff.auditTime"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="状态" prop="status">
							<el-select style="width: 100%" v-model="staff.status" placeholder="请选择">
								<el-option label="通过" value="Passed"></el-option>
								<el-option label="未通过" value="NotPassed"></el-option>
								<el-option label="其他" value="Other"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="准驾车型">
							<el-select style="width: 100%" v-model="staff.quasiDrivingType" placeholder="请选择">
								<el-option label="A1" value="A1"></el-option>
								<el-option label="A2" value="A2"></el-option>
								<el-option label="A3" value="A3"></el-option>
								<el-option label="B1" value="B1"></el-option>
								<el-option label="B2" value="B2"></el-option>
								<el-option label="C1" value="C1"></el-option>
								<el-option label="C2" value="C2"></el-option>
								<el-option label="C3" value="C3"></el-option>
								<el-option label="C4" value="C4"></el-option>
								<el-option label="C5" value="C5"></el-option>
								<el-option label="D" value="D"></el-option>
								<el-option label="E" value="E"></el-option>
								<el-option label="F" value="F"></el-option>
								<el-option label="M" value="M"></el-option>
								<el-option label="N" value="N"></el-option>
								<el-option label="P" value="P"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="驾驶证初次发证件时间">
							<el-date-picker :editable="false" placeholder="选择日期" style="width:100%" v-model="staff.driverLicenseFirstTime"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="驾驶证审验有效期至">
							<el-date-picker :editable="false" placeholder="选择日期" style="width:100%" v-model="staff.driverLicExamineEndTime"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="合同有效期起">
							<el-date-picker :editable="false" placeholder="选择日期" style="width:100%" v-model="staff.laborContractBeginTime"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="合同有效期至">
							<el-date-picker :editable="false" placeholder="选择日期" style="width:100%" v-model="staff.laborContractEndTime"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="从业资格证件号">
							<el-input placeholder="请输入内容" v-model="staff.qualificationCode"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="从业资格类别">
							<el-input placeholder="请输入内容" v-model="staff.qualificationType"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="从业资格证有效期至">
							<el-date-picker :editable="false" placeholder="选择日期" style="width:100%" v-model="staff.qualificationExpirationTime"></el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="诚信考核等级">
							<el-select style="width: 100%" v-model="staff.integrityExamineGrade" placeholder="请选择">
								<el-option label="无" value=""></el-option>
								<el-option label="A" value="A"></el-option>
								<el-option label="AA" value="AA"></el-option>
								<el-option label="AAA" value="AAA"></el-option>
								<el-option label="AAAA" value="AAAA"></el-option>
								<el-option label="AAAAA" value="AAAAA"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="诚信考核有效期至">
							<el-date-picker :editable="false" placeholder="选择日期" style="width:100%" v-model="staff.integrityExamineEndTime"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="职称或技术等级">
							<el-input placeholder="请输入内容" v-model="staff.titleLever"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="备注说明">
							<el-input type="textarea" placeholder="请输入内容" resize="none" v-model="staff.remark"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item>
							<el-button type="primary" @click="save">保存</el-button>
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
import { checkTel,checkIDCard,limitLength50 } from '../../../../common/validator'
export default {
	data() {
		return {
			staff: {
				sex:'M',
				
			},
			position:[],
			rules: {
				realName: [
					{required: true, message: '请输入姓名'},
					{min: 2, max: 20, message: '长度在 2 到 20 个字符'}
				],
				idCardNum: [
					{required: true, validator: checkIDCard, trigger: 'blur',message: '请输入正确的身份证号'}
				],
				mobile: [
					{required: true, message: '请输入联系电话'},
					{validator: checkTel}
				],
				homeAddress:[
					{required: true, message: '请输入家庭地址'},
					{min: 2, max: 50, message: '长度在 2 到 50 个字符'}
				],
				position: [
					{required: true, message: '请选择岗位', trigger: 'change'}
				],
				createName: [
					{required: true, message: '请输入创建人', trigger: 'blur'},
					{validator: limitLength50, trigger: 'blur'},
				],
				status: [
					{ required: true, message: '请选择状态', trigger: 'change' }
				],
				auditName: [
					{required: true, message: '请输入审核人', trigger: 'blur'},
					{validator: limitLength50, trigger: 'blur'},
				],
				auditTime: [
					{required: true, message: '请输入审核时间', trigger: 'blur'}
				]
			}
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
		changePost(e) {
			this.staff.position = e.join(',')
		},
		save() {
			let data = this.info
			this.$refs['ruleForm'].validate(valid => {
				if (valid) {
					requestJava({
						url: '/staff/update',
						method: 'post',
						data
					}).then(res => {
						Message.success('成功！')
					}).catch(err => {})
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


</style>

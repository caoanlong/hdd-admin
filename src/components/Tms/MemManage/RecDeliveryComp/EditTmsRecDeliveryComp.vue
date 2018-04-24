<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>编辑收发货单位</span>
			</div>
			<el-row :gutter="20">
				<el-col :span="12" :offset="6" >
					<el-form label-width="120px" :model="info" :rules="rules" ref="ruleForm">
						<el-form-item label="用户名" prop="userName">
							<el-input placeholder="请输入..." v-model="info.userName"></el-input>
						</el-form-item>
						<el-form-item label="公司名称" prop="companyName">
							<el-input placeholder="请输入..." v-model="info.companyName"></el-input>
						</el-form-item>
						<el-form-item label="公司地区" prop="companyArea">
							<DistPicker :selected="selectedArea" @selectChange="selectAreaChange"/>
						</el-form-item>
						<el-form-item label="公司详细地址" prop="detailAddress">
							<el-input placeholder="请输入..." v-model="info.detailAddress"></el-input>
						</el-form-item>
						<el-form-item label="联系人" prop="contactName">
							<el-input placeholder="请输入..." v-model="info.contactName"></el-input>
						</el-form-item>
						<el-form-item label="联系电话" prop="contactPhone">
							<el-input placeholder="请输入..." v-model="info.contactPhone"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="save">保存</el-button>
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
	import DistPicker from '../../../CommonComponents/DistPicker'
	import { checkTel } from '../../../../common/validator'
	export default {
		data() {
			return {
				info: {
					'userName': '',
					'companyName': '',
					'companyArea': '',
					'detailAddress': '',
					'contactName': '',
					'contactPhone': ''
				},
				selectedArea: [],
				rules: {
					userName: [
						{required: true, message: '请输入用户名'},
						{min: 2, max: 20, message: '长度在 2 到 20 个字符'}
					],
					companyName: [
						{required: true, message: '请输入公司名'},
						{min: 2, max: 20, message: '长度在 2 到 20 个字符'}
					],
					companyArea: [
						{required: true, message: '请选择公司地区'},
					],
					detailAddress: [
						{required: true, message: '请输入详细地址'},
						{min: 2, max: 50, message: '长度在 2 到 50 个字符'}
					],
					contactName: [
						{required: true, message: '请输入联系人'},
						{min: 2, max: 20, message: '长度在 2 到 20 个字符'}
					],
					contactPhone: [
						{required: true, message: '请输入联系电话'},
						{validator: checkTel}
					]
				}
			}
        },
        created() {
            this.getInfo()
        },
		methods: {
			selectAreaChange(data) {
				this.info.companyArea = data
			},
			save() {
				let data = this.info
				this.$refs['ruleForm'].validate(valid => {
					if (valid) {
						requestJava({
							url: '/customer/update',
							method: 'post',
							data
						}).then(res => {
							Message.success('成功！')
						}).catch(err => {})
					}
				})
			},
            getInfo() {
                let params = {
					customerID: this.$route.query.customerID
				}
				requestJava({
					url: '/customer/findById',
					params
				}).then(res => {
					this.info = res.data.data
					let areaID = String(res.data.data.companyAreaID)
					this.selectedArea = [(areaID.substr(0, 2) + '0000'), (areaID.substr(0, 4) + '00'), areaID]
				}).catch(err => {})
			},
			back() {
				this.$router.go(-1)
			}
		},
		components: {
			DistPicker
		}
	}
</script>
<style lang="stylus" scoped>

</style>
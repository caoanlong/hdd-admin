<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>添加托运人</span>
			</div>
			<el-row :gutter="20">
				<el-col :span="12" :offset="6" >
					<el-form label-width="120px">
						<el-form-item label="用户名">
							<el-input placeholder="请输入..." v-model="info.name"></el-input>
						</el-form-item>
						<el-form-item label="公司名称">
							<el-input placeholder="请输入..." v-model="info.companyName"></el-input>
						</el-form-item>
						<el-form-item label="公司地区">
							<DistPicker @selectChange="selectAreaChange"/>
						</el-form-item>
						<el-form-item label="公司详细地址">
							<el-input placeholder="请输入..." v-model="info.detailAddress"></el-input>
						</el-form-item>
						<el-form-item label="联系人">
							<el-input placeholder="请输入..." v-model="info.contactName"></el-input>
						</el-form-item>
						<el-form-item label="联系电话">
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
	export default {
		data() {
			return {
				info: {
					'name': '',
					'companyName': '',
					'companyArea': '',
					'detailAddress': '',
					'contactName': '',
					'contactPhone': ''
				},
				selectedArea: []
			}
        },
		methods: {
			selectAreaChange(data) {
				this.info.companyArea = data
			},
			save() {
				let data = this.info
				requestJava({
					url: '/customer/add',
					method: 'post',
					data
				}).then(res => {
                    Message.success('成功！')
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
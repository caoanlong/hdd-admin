<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>添加人员</span>
			</div>
			<el-row :gutter="20">
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="姓名">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="身份证号">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="审核人">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="驾驶证审验有效期至">
							<el-date-picker type="date" placeholder="选择日期" style="width:100%" v-model="date"></el-date-picker>
						</el-form-item>
						<el-form-item label="从业资格证有效期至">
							<el-date-picker type="date" placeholder="选择日期" style="width:100%" v-model="date"></el-date-picker>
						</el-form-item>
						<el-form-item label="诚信考核有效期至">
							<el-date-picker type="date" placeholder="选择日期" style="width:100%" v-model="date"></el-date-picker>
						</el-form-item>
						<el-form-item label="职称或技术等级">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="性别">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="创建人">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="审核日期">
							<el-date-picker type="date" placeholder="选择日期" style="width:100%" v-model="date"></el-date-picker>
						</el-form-item>
						<el-form-item label="从业资格证件号">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="初次发证件时间">
							<el-date-picker type="date" placeholder="选择日期" style="width:100%" v-model="date"></el-date-picker>
						</el-form-item>
						<el-form-item label="合同有效期起">
							<el-date-picker type="date" placeholder="选择日期" style="width:100%" v-model="date"></el-date-picker>
						</el-form-item>
						<el-form-item label="联系电话">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>

					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="聘用岗位">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="状态">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="准驾车型">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="从业资格类别">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="诚信考核等级">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						
						<el-form-item label="合同有效期至">
							<el-date-picker type="date" placeholder="选择日期" style="width:100%" v-model="date"></el-date-picker>
						</el-form-item>
						<el-form-item label="家庭地址">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="160px">
						<el-form-item label="备注说明">
							<el-input type="textarea" placeholder="请输入内容" resize="none"></el-input>
						</el-form-item>
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
		height 40px
		font-family 'sans-serif'
		line-height 40px
		color #999
	.el-input__inner
		vertical-align top
</style>
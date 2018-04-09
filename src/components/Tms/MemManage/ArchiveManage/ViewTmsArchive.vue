<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>档案详情</span>
			</div>
			<el-row :gutter="20">
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="用户名">
							<p></p>
						</el-form-item>
						<el-form-item label="姓名">
							<p></p>
						</el-form-item>
						<el-form-item label="道路运输证号">
							<p></p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="车牌号">
							<p></p>
						</el-form-item>
						<el-form-item label="身份证号">
							<p></p>
						</el-form-item>
						<el-form-item label="从业资格证号">
							<p></p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="自编号">
							<p></p>
						</el-form-item>
						
						<el-form-item label="联系电话">
							<p></p>
						</el-form-item>
						<el-form-item label="载重">
							<p></p>
						</el-form-item>

					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="160px">
						<el-form-item label="备注">
							<p></p>
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
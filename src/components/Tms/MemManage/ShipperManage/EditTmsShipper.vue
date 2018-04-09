<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>编辑托运人</span>
			</div>
			<el-row :gutter="20">
				<el-col :span="12" :offset="6" >
					<el-form label-width="120px">
						<el-form-item label="用户名">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="公司名称">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="公司地址">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="联系人">
							<el-input placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="联系电话">
							<el-input placeholder="请输入内容"></el-input>
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
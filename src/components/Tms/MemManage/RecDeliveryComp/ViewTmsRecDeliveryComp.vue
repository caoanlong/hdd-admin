<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>收发货单位详情</span>
			</div>
			<el-row :gutter="20">
				<el-col :span="12" :offset="6" >
					<el-form label-width="120px">
						<el-form-item label="用户名">
							<p>{{info.name}}</p>
						</el-form-item>
						<el-form-item label="公司名称">
							<p>{{info.companyName}}</p>
						</el-form-item>
						<el-form-item label="公司地址">
							<p>{{info.companyArea}}{{info.detailAddress}}</p>
						</el-form-item>
						<el-form-item label="联系人">
							<p>{{info.contactName}}</p>
						</el-form-item>
						<el-form-item label="联系电话">
							<p>{{info.contactPhone}}</p>
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
				info: {}
			}
        },
        created() {
            this.getInfo()
        },
		methods: {
            getInfo() {
                let params= {
					customerID: this.$route.query.customerID
				}
				requestJava({
					url: '/customer/findById',
					params
				}).then(res => {
                    this.info = res.data.data
				}).catch(err => {})
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
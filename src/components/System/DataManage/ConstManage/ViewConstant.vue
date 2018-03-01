<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>查看标准常量</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="常量类型" >
							<p>{{constant.Type}}</p>
						</el-form-item>
						<el-form-item label="代码" >
							<p>{{constant.Code}}</p>
						</el-form-item>
						<el-form-item label="名称" >
							<p>{{constant.Name}}</p>
						</el-form-item>
						<el-form-item label="值" >
							<p>{{constant.Value}}</p>
						</el-form-item>
						<el-form-item label="排序" >
							<p>{{constant.SortNumber}}</p>
						</el-form-item>
						<el-form-item label="描述" >
							<p>{{constant.Description}}</p>
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
	import request from '../../../../common/request'
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				constant: {
					ConstStd_ID:'',
					Type:'',
					Code:'',
					Name:'',
					Value:'',
					Description:'',
					SortNumber:''
				}
			}
		},
		created() {
			this.getConstant()
		},
		methods: {
			getConstant(pageIndex) {
				let params = {
					ConstStd_ID: this.$route.query.ConstStd_ID
				}
				request({
					url: '/base_conststand/info',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 0) {
						this.constant = res.data.data
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
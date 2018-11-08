<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>查看字典</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="代码">
							<p>{{config.Code}}</p>
						</el-form-item>
						<el-form-item label="名称">
							<p>{{config.Name}}</p>
						</el-form-item>
						<el-form-item label="值">
							<p>{{config.Value}}</p>
						</el-form-item>
						<el-form-item label="排序">
							<p>{{config.SortNumber}}</p>
						</el-form-item>
						<el-form-item label="描述">
							<p>{{config.Description}}</p>
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
			config: {
				Setting_ID:'',
				Code:'',
				Name:'',
				Value:'',
				SortNumber:'',
				Description:''
			}
		}
	},
	created() {
		this.getConfig()
	},
	activated() {
		if(!this.$route.query.cache) {
			this.getConfig()
		}
	},
	methods: {
		getConfig() {
			let params = {
				Setting_ID: this.$route.query.Setting_ID
			}
			request({
				url: '/sys_settings/info',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.config = res.data.data
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
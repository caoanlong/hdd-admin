<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>查看常量</span>
			</div>
			<el-row :gutter="20">
				<el-col :span="12" :offset="6">
					<el-form label-width="120px">
						<el-form-item label="代码">
                            <p>{{info.code}}</p>
						</el-form-item>
						<el-form-item label="名称">
                            <p>{{info.name}}</p>
						</el-form-item>
                        <el-form-item label="值">
                            <p>{{info.value}}</p>
						</el-form-item>
                        <el-form-item label="序号">
                            <p>{{info.sortNumber}}</p>
						</el-form-item>
						<el-form-item label="常量类型">
                            <p>{{info.type}}</p>
						</el-form-item>
						<el-form-item label="描述">
                            <p>{{info.description}}</p>
						</el-form-item>
                        <el-form-item label="是否标准常量">
                            <p>{{info.stdConstFlag ? '是' : '否'}}</p>
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
				info: {
					'code': '',
                    'name': '',
                    'value': '',
					'sortNumber': 1,
					'type': '',
					'description': '',
					'stdConstFlag': true
				}
			}
        },
        created() {
            this.getInfo()
        },
		methods: {
            getInfo() {
                let params = {
					constStdID: this.$route.query.constStdID
				}
				requestJava({
					url: '/admin/baseConst/detail',
					params
				}).then(res => {
                    this.info = res.data.data
                    this.info.stdConstFlag = res.data.data.stdConstFlag == 'Y' ? true : false
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
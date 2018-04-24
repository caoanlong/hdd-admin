<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>档案详情</span>
			</div>
			<el-row :gutter="20">
				<el-col :span="12" :offset="6" >
					<el-form label-width="120px">
						<el-form-item label="用户">
							<p>{{info.memberCompany}}</p>
						</el-form-item>
						<el-form-item label="车牌号">
							<p>{{info.plateNo}}</p>
						</el-form-item>
						<el-form-item label="自编号">
							<p>{{info.code}}</p>
						</el-form-item>
						<el-form-item label="道路运输证号">
							<p>{{info.transportLicenceCode}}</p>
						</el-form-item>
						<el-form-item label="姓名">
							<p>{{info.realName}}</p>
						</el-form-item>
						<el-form-item label="身份证号">
							<p>{{info.idCardNum}}</p>
						</el-form-item>
						<el-form-item label="从业资格证号">
							<p>{{info.qualificationCode}}</p>
						</el-form-item>
						<el-form-item label="联系电话">
							<p>{{info.mobile}}</p>
						</el-form-item>
						<el-form-item label="载重">
							<p>{{info.loads}}</p>
						</el-form-item>
						<el-form-item label="备注">
							<p>{{info.remark}}</p>
						</el-form-item>
						<el-form-item label="创建时间">
							<p v-if="info.createTime">{{info.createTime | getdatefromtimestamp()}}</p>
							<p v-else></p>
						</el-form-item>
						<el-form-item label="建档时间">
							<p v-if="info.archiveTime">{{info.archiveTime | getdatefromtimestamp()}}</p>
							<p v-else></p>
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
					transportRecordID: this.$route.query.transportRecordID
				}
				requestJava({
					url: '/transportRecord/findById',
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
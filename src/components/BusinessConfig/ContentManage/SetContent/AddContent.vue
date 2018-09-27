<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>添加内容</span>
			</div>
			<el-form label-width="120px" :model="content" :rules="rules" ref="ruleForm">
				<el-form-item label="所属栏目" prop="contentTopicID">
					<el-autocomplete style="width:100%"
						value-key="name" 
						v-model="content.contentTopicName"
						:fetch-suggestions="getContentTopics"
						placeholder="请输入..."
						@select="handSelectContentTopic">
					</el-autocomplete>
				</el-form-item>
				<el-form-item label="App客户" prop="appCstID">
					<el-autocomplete  style="width:100%"
						value-key="customerName" 
						v-model="content.customerName"
						:fetch-suggestions="getCustomers"
						placeholder="请输入..."
						@select="handSelectCustomer">
					</el-autocomplete>
				</el-form-item>
				<el-form-item label="代码" prop="code">
					<el-input v-model="content.code"></el-input>
				</el-form-item>
				<el-form-item label="名称" prop="name">
					<el-input v-model="content.name"></el-input>
				</el-form-item>
				<el-form-item label="标题" prop="title">
					<el-input v-model="content.title"></el-input>
				</el-form-item>
				<el-form-item label="内容" prop="content">
					<div id="editor"></div>
				</el-form-item>
				<el-form-item label="图片上传">
					<ImageUpload :files="[content.pictureURL]" @imgUrlBack="handlePicSuccess"/>
				</el-form-item>
				<el-form-item label="图片URL">
					<el-input v-model="content.pictureURL"></el-input>
				</el-form-item>
				<el-form-item label="URL" prop="url">
					<el-input v-model="content.url"></el-input>
				</el-form-item>
				<el-form-item label="是否启用">
					<el-switch v-model="content.isEnable"></el-switch>
				</el-form-item>
				<el-form-item label="排序">
					<el-input-number v-model="content.sort" :min="1"></el-input-number>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" v-model="content.tips"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="add">立即保存</el-button>
					<el-button @click="back">取消</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import E from 'wangeditor'
import SetAppcustomer from "../../../../api/SetAppcustomer"
import SetContent from "../../../../api/SetContent"
import SetContentTopic from "../../../../api/SetContentTopic"
import ImageUpload from '../../../CommonComponents/ImageUpload'
import { checkURL } from '../../../../common/validator'
export default {
	components: { ImageUpload },
	data() {
		return {
			contentTopics: [],
			customers: [],
			content: {
				contentTopicID: '',
				appCstID: '',
				code: '',
				name: '',
				title: '',
				content: '',
				pictureURL: '',
				url: '',
				sort: 1,
				isEnable: true,
				tips: ''
			},
			rules: {
				contentTopicID: [ {required: true, message: '请选择所属栏目'} ],
				code: [ {required: true, message: '请输入代码'}, {min: 2, max: 20, message: '长度在 2 到 20 个字符'} ],
				name: [ {required: true, message: '请输入名称'}, {min: 2, max: 20, message: '长度在 2 到 20 个字符'} ],
				title: [ {required: true, message: '请输入标题'}, {min: 2, max: 50, message: '长度在 2 到 50 个字符'} ],
				content: [ {required: true, message: '请输入内容'} ],
				url: [ {required: true, message: '请输入URL'}, 
				// {validator: checkURL}
				]
			}
		}
	},
	created() {
		
	},
	mounted() {
		this.editor = new E('#editor')
		this.editor.customConfig.zIndex = 100
		this.editor.customConfig.uploadImgShowBase64 = true
		this.editor.customConfig.uploadImgHooks = {
			customInsert: (insertImg, result, editor) => {
				result.data.forEach(item => {
					insertImg(this.imgUrl + item)
				})
			}
		}
		this.editor.create()
	},
	methods: {
		/**
		 * 所属栏目
		 */
		getContentTopics(queryString, cb) {
			this.content.contentTopicID = ''
			SetContentTopic.suggest({
				keyword: queryString
			}).then(res => { cb(res) })
		},
		/**
		 * 获取客户列表
		 */
		getCustomers(queryString, cb) {
			this.content.appCstID = ''
			SetAppcustomer.find({
				keyword: queryString
			}).then(res => { cb(res.list) })
		},
		/**
		 * 选择栏目
		 */
		handSelectContentTopic(data) {
			this.content.contentTopicID = data.id
			this.content.contentTopicName = data.name
		},
		/**
		 * 选择客户
		 */
		handSelectCustomer(data) {
			this.content.appCstID = data.appCstID
			this.content.customerName = data.customerName
		},
		add() {
			this.content.content = this.editor.txt.html()
			const data= {
				contentTopicID: this.content.contentTopicID,
				appCstID: this.content.appCstID,
				code: this.content.code,
				name: this.content.name,
				title: this.content.title,
				content: this.content.content,
				pictureURL: this.content.pictureURL,
				url: this.content.url,
				sort: this.content.sort,
				isEnable: this.content.isEnable ? 'Y' : 'N',
				tips: this.content.tips
			}
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				SetContent.add(data).then(res => {
					Message.success(res.data.message)
					this.$router.push({name: 'setcontent'})
				})
			})
		},
		handlePicSuccess(res) {
			this.content.pictureURL = res[0]
		},
		back() {
			this.$router.go(-1)
		}
	}
}
</script>
<style lang="stylus" scoped>
.avatar-uploader
	line-height 1
	width 100px
	height 100px
	overflow hidden
	border 1px dashed #d9d9d9
	border-radius 6px
	&:hover 
		border-color #409eff
	.avatar-uploader-icon
		font-size 28px
		color #8c939d
		width 98px
		height 98px
		line-height 98px
		text-align center
	.avatar
		width 98px
		height 98px
		display block
		vertical-align top
.el-form-item
	.el-form-item__content
		line-height 20px
		position relative
		font-size 14px
</style>
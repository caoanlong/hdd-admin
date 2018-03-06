<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>编辑内容</span>
			</div>
			<el-row>
				<el-col :span="18" :offset="2">
					<el-form label-width="120px">
						<el-form-item label="所属栏目">
							<el-select style="width: 100%" placeholder="请选择" v-model="content.ContentTopic_ID">
								<el-option v-for="contentTopic in contentTopics" :key="contentTopic.ContentTopic_ID" :label="contentTopic.Name" :value="contentTopic.ContentTopic_ID"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="代码">
							<el-input v-model="content.Code"></el-input>
						</el-form-item>
						<el-form-item label="名称">
							<el-input v-model="content.Name"></el-input>
						</el-form-item>
						<el-form-item label="标题">
							<el-input v-model="content.Title"></el-input>
						</el-form-item>
                        <el-form-item label="内容">
							<editor :defaultMsg="content.Content" :config="editorConfig" ref="ue"></editor>
						</el-form-item>
						<el-form-item label="图片上传">
							<el-upload
								class="avatar-uploader"
								action="http://39.108.245.177:3001/uploadImg" 
								:show-file-list="false" 
								:on-success="handleAvatarSuccess">
								<img v-if="content.PictureURL" :src="content.PictureURL" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
						<el-form-item label="图片URL">
							<el-input v-model="content.PictureURL"></el-input>
						</el-form-item>
                        <el-form-item label="URL">
							<el-input v-model="content.URL"></el-input>
						</el-form-item>
                        <el-form-item label="是否启用">
                            <el-switch v-model="content.isEnable"></el-switch>
                        </el-form-item>
						<el-form-item label="排序">
							<el-input-number v-model="content.Sort" :min="1"></el-input-number>
						</el-form-item>
						<el-form-item label="备注">
							<el-input type="textarea" v-model="content.Tips"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click.native="editContent">立即保存</el-button>
							<el-button @click="back">取消</el-button>
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
	import Editor from '../../../CommonComponents/Editor'
	export default {
		data() {
			return {
                contentTopics: [],
				content: {
                    ContentTopic_ID: '',
                    Code: '',
                    Name: '',
                    Title: '',
                    Content: '',
                    PictureURL: '',
					URL: '',
					Sort: 1,
					isEnable: true,
					Tips: ''
                },
				editorConfig: {
					initialFrameWidth: null,
					initialFrameHeight: 350
				}
			}
        },
        created() {
            this.getContentTopics()
        },
        mounted() {
            this.getContent()
        },
		methods: {
            editContent() {
				this.getUEContent().then(content => {
					let data= {
						Content_ID: this.$route.query.Content_ID,
						ContentTopic_ID: this.content.ContentTopic_ID,
						Code: this.content.Code,
						Name: this.content.Name,
						Title: this.content.Title,
						Content: content,
						PictureURL: this.content.PictureURL,
						URL: this.content.URL,
						Sort: this.content.Sort,
						isEnable: this.content.isEnable ? 'Y' : 'N',
						Tips: this.content.Tips
					}
					request({
						url: '/set_content/update',
						method: 'post',
						data
					}).then(res => {
						if (res.data.code == 0) {
							Message.success(res.data.msg)
							this.$router.push({name: 'setcontent'})
						} else {
							Message.error(res.data.msg)
						}
					})
				})
			},
            getContentTopics() {
                request({
					url: '/set_contenttopic/list2',
					method: 'get'
				}).then(res => {
					if (res.data.code == 0) {
                        this.contentTopics = res.data.data
					} else {
						Message.error(res.data.msg)
					}
				})
            },
            getContent() {
                let params = {
					Content_ID: this.$route.query.Content_ID
				}
                request({
					url: '/set_content/info',
                    method: 'get',
                    params
				}).then(res => {
					if (res.data.code == 0) {
                        this.content = res.data.data
					} else {
						Message.error(res.data.msg)
					}
				})
            },
			handleAvatarSuccess(res, file) {
				this.content.PictureURL = 'http://39.108.245.177:4000' + res.data
			},
			getUEContent() {
				return new Promise((resolve, reject) => {
					let content = this.$refs.ue.getUEContent()
					resolve(content)
				})
			},
			back() {
				this.$router.go(-1)
			}
		},
		components: {
			Editor
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
<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
		    	<span>定时任务管理</span>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="addSchedule">添加</el-button>
			</div>
			<div class="table">
				<el-table :data="scheduleJobList" border style="width: 100%" size="mini">
					<el-table-column label="任务名称" prop="jobName"></el-table-column>
					<el-table-column label="BeanId" prop="springBeanId"></el-table-column>
					<el-table-column label="类名" prop="jobClassName"></el-table-column>
					<el-table-column label="方法名" prop="methodName"></el-table-column>
					<el-table-column label="任务别名" prop="aliasName"></el-table-column>
					<el-table-column label="任务分组" prop="jobGroup"></el-table-column>
					<el-table-column label="触发器" prop="jobTrigger"></el-table-column>
					<el-table-column label="任务状态" prop="status"></el-table-column>
					<el-table-column label="时间表达式" prop="cron"></el-table-column>
					<el-table-column label="是否异步">
						<template slot-scope="scope">
							<span>{{scope.isSync == 'Y' ? '异步' : '同步'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="任务执行url" prop="url"></el-table-column>
					<el-table-column label="任务描述" prop="description"></el-table-column>
					<el-table-column label="操作" width="360" align="center" fixed="right">
						<template slot-scope="scope">
							<el-button type="default" size="mini" @click="pause(scope.row.jobIdStr)">暂停</el-button>
							<el-button type="default" size="mini" @click="recovery(scope.row.jobIdStr)">恢复</el-button>
							<el-button type="default" size="mini" @click="runOnce(scope.row.jobIdStr)">运行一次</el-button>
							<el-button type="default" size="mini" @click="editSchedule(scope.row.jobIdStr)" icon="el-icon-edit">编辑</el-button>
							<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.row.jobIdStr)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-card>
		<el-card class="box-card" style="margin-top: 20px">
			<div slot="header" class="clearfix">
		    	<span>运行中的任务</span>
			</div>
			<div class="table">
				<el-table :data="executingJobList" border style="width: 100%" size="mini">
					<el-table-column label="任务名称" prop="jobName"></el-table-column>
					<el-table-column label="BeanId" prop="springBeanId"></el-table-column>
					<el-table-column label="类名" prop="jobClassName"></el-table-column>
					<el-table-column label="方法名" prop="methodName"></el-table-column>
					<el-table-column label="任务别名" prop="aliasName"></el-table-column>
					<el-table-column label="任务分组" prop="jobGroup"></el-table-column>
					<el-table-column label="触发器" prop="jobTrigger"></el-table-column>
					<el-table-column label="任务状态" prop="status"></el-table-column>
					<el-table-column label="时间表达式" prop="cron"></el-table-column>
					<el-table-column label="是否异步">
						<template slot-scope="scope">
							<span>{{scope.isSync == 'Y' ? '异步' : '同步'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="任务执行url" prop="url"></el-table-column>
					<el-table-column label="任务描述" prop="description"></el-table-column>
				</el-table>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
	import requestJava from '../../../common/requestJava'
	import { Message } from 'element-ui'
	export default {
	    data() {
			return {
				scheduleJobList: [],
				executingJobList: []
			}
		  },
		created() {
			this.getSchedules()
		},
		methods: {
			getSchedules() {
				requestJava({
					url: '/scheduler/listScheduleJob',
					method: 'get'
				}).then(res => {
					if (res.data.code == 200) {
						this.scheduleJobList = res.data.data.scheduleJobList
						this.executingJobList = res.data.data.executingJobList
					} else {
						Message.error(res.data.message)
					}
				})
			},
			// 删除
			deleteConfirm(id) {
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delSchedule(id)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
			delSchedule(scheduleJobID) {
                let data = {
                    scheduleJobID
                }
                requestJava({
                    url: '/scheduler/deleteScheduleJob',
                    method: 'post',
                    data
                }).then(res => {
                    if (res.data.code == 200) {
                        Message.success(res.data.message)
                        this.getSchedules()
                    } else {
                        Message.error(res.data.message)
                    }
                })
            },
			// 暂停
			pause(scheduleJobID) {
				let data = {
					scheduleJobID
				}
				requestJava({
					url: '/scheduler/pauseScheduleJob',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 200) {
						Message.success(res.data.message)
						this.getSchedules()
					} else {
						Message.error(res.data.message)
					}
				})
			},
			// 恢复
			recovery(scheduleJobID) {
				let data = {
					scheduleJobID
				}
				requestJava({
					url: '/scheduler/resumeScheduleJob',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 200) {
						Message.success(res.data.message)
						this.getSchedules()
					} else {
						Message.error(res.data.message)
					}
				})
			},
			// 运行一次
			runOnce(scheduleJobID) {
				let data = {
					scheduleJobID
				}
				requestJava({
					url: '/scheduler/runOnceScheduleJob',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 200) {
						Message.success(res.data.message)
						this.getSchedules()
					} else {
						Message.error(res.data.message)
					}
				})
			},
			addSchedule() {
				this.$router.push({name: 'addtask'})
			},
			editSchedule(scheduleJobID) {
				this.$router.push({name: 'edittask', query: {scheduleJobID}})
			},
		}
	}
</script>
<style lang="stylus" scoped>

</style>
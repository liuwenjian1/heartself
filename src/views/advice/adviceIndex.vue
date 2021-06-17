<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="建议类型">
        <el-select v-model="form.type" placeholder="please select your type">
          <el-option label="工作台" value="WORKLOG" />
          <el-option label="心理自助系统" value="SELFTHEART" />
        </el-select>
      </el-form-item>
      <el-form-item label="具体描述">
        <div id="inputDiv">
          <el-input v-model="form.description" type="textarea" style="height: 300px" />
        </div>
      </el-form-item>
      <el-form-item label="期望完成日期">
        <el-col :span="3">
          <el-date-picker
            v-model="form.exceptDate"
            type="date"
            placeholder="Pick a date"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { insert } from '@/api/advice'

export default {
  name: 'Advice',
  data() {
    return {
      form: {
        name: '',
        exceptDate: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      insert(this.form).then(response => {
        // this.pieList = response.data
        // this.getPie()
        this.$message('submit!')
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
  .line {
    text-align: center;
  }

  /*#inputDiv{*/
  /*  margin: 50px;*/
  /*}*/
  /*div >>> .el-input > input{*/
  /*  height: 200px;*/
  /*}*/
</style>


<template>
  <div>
    <el-row :gutter="10">
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <div id="main" style="height:300px;" />
      </el-col>
      <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
        <div id="bar" style="height:300px;" />
      </el-col>
    </el-row>
    <el-row>
    <div class="app-container">
      <el-table
        v-loading="listLoading"
        :data="tableList"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="ID" :lg="1">
          <template slot-scope="scope">
            {{ scope.row.projectId }}
          </template>
        </el-table-column>
        <el-table-column label="名称" :lg="2">
          <template slot-scope="scope">
            {{ scope.row.projectName}}
          </template>
        </el-table-column>
        <el-table-column label="开标日期" :lg="2" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.bidOpeningTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="客户名称" :lg="2" align="center">
          <template slot-scope="scope">
            {{ scope.row.clientName }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="联系人" :lg="2" align="center">
          <template slot-scope="scope">
            {{ scope.row.contactPerson }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="联系电话" :lg="2">
          <template slot-scope="scope">
            <span>{{ scope.row.contactDetails }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="金额" :lg="2">
          <template slot-scope="scope">
            <span>{{ scope.row.money }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="项目号" :lg="2">
          <template slot-scope="scope">
            <span>{{ scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="商品" :lg="2">
          <template slot-scope="scope">
            <span>{{ scope.row.goods }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { countProjectByUser } from '@/api/project'
import { countProjectByMonth } from '@/api/project'
import { getProjectList } from '@/api/project'
export default {
  name: 'Project',
  data() {
    return { tableList: null,
      listLoading: true,
      pieList: null,
      barxList: null,
      baryList: null }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getPie()
      this.getBar()
    })
  },
  created() {
    this.fetchData()
  },
  methods: {
    getPie() {
      // 绘制图表
      var myChart = echarts.init(document.getElementById('main'))
      // 指定图表的配置项和数据
      var option = {
        // 标题
        title: {
          text: '这是个标题',
          x: 'middle' // 标题位置
          // textStyle: { //标题内容的样式
          //   color: '#000',
          //   fontStyle: 'normal',
          //   fontWeight: 100,
          //   fontSize: 16 //主题文字字体大小，默认为18px
          // },
        },
        // stillShowZeroSum: true,
        // 鼠标划过时饼状图上显示的数据
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}:{c} ({d}%)'
        },
        // 图例
        legend: { // 图例  标注各种颜色代表的模块
          // orient: 'vertical',//图例的显示方式  默认横向显示
          bottom: 10, // 控制图例出现的距离  默认左上角
          left: 'center', // 控制图例的位置
          // itemWidth: 16,//图例颜色块的宽度和高度
          // itemHeight: 12,
          textStyle: { // 图例中文字的样式
            color: '#000',
            fontSize: 16
          },
          data: ['未领取', '处理中', '已完成']// 图例上显示的饼图各模块上的名字
        },
        // 饼图中各模块的颜色
        color: ['#32dadd', '#b6a2de', '#5ab1ef', '#304156', '#e02433'],
        // 饼图数据
        series: {
          // name: 'bug分布',
          type: 'pie', // echarts图的类型   pie代表饼图
          radius: '70%', // 饼图中饼状部分的大小所占整个父元素的百分比
          center: ['50%', '50%'], // 整个饼图在整个父元素中的位置
          // data:''               //饼图数据
          data: this.pieList,
          //   [  每个模块的名字和值
          //   { name: '未领取', value: 10 },
          //   { name: '处理中', value: 30 },
          //   { name: '已完成', value: 50 },
          //   { name: '其他', value: 10 }
          // ]

          itemStyle: {
            normal: {
              label: {
                show: true// 饼图上是否出现标注文字 标注各模块代表什么  默认是true
                // position: 'inner',//控制饼图上标注文字相对于饼图的位置  默认位置在饼图外
              },
              labelLine: {
                show: true// 官网demo里外部标注上的小细线的显示隐藏    默认显示
              }
            }
          }
        }

      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    getBar() {
      // 绘制图表
      var myChart = echarts.init(document.getElementById('bar'))
      // 指定图表的配置项和数据
      var option = {
        // ----  标题 -----
        title: {
          text: '主标题',
          textStyle: {
            color: 'red'
          },
          subtext: '副标题',
          subtextStyle: {
            color: 'blue'
          },
          padding: [0, 0, 10, 100] // 位置
        },
        // ---- legend ----
        legend: {
          type: 'plain', // 图列类型，默认为 'plain'
          top: '1%', // 图列相对容器的位置 top\bottom\left\right
          selected: {
            // '销量': true  // 图列选择，图形加载出来会显示选择的图列，默认为true
          },
          textStyle: { // 图列内容样式
            color: '#fff', // 字体颜色
            backgroundColor: 'black' // 字体背景色
          },
          tooltip: { // 图列提示框，默认不显示
            show: true,
            color: 'red'
          },
          data: [ // 图列内容
            {
              name: '销量',
              icon: 'circle',
              textStyle: {
                color: 'red', // 单独设置某一个图列的颜色
                backgroundColor: '#fff' // 单独设置某一个图列的字体背景色
              }
            }
          ]
        },
        // ---  提示框 ----
        tooltip: {
          show: true, // 是否显示提示框，默认为true
          trigger: 'item', // 数据项图形触发
          axisPointer: { // 指示样式
            type: 'shadow',
            axis: 'auto'
          },
          padding: 5,
          textStyle: { // 提示框内容的样式
            color: '#fff'
          }
        },
        // ---- gird区域 ---
        gird: {
          show: false, // 是否显示直角坐标系网格
          top: 80, // 相对位置 top\bottom\left\right
          containLabel: false, // gird 区域是否包含坐标轴的刻度标签
          tooltip: {
            show: true,
            trigger: 'item', // 触发类型
            textStyle: {
              color: '#666'
            }
          }
        },
        //  ------  X轴 ------
        xAxis: {
          show: true, // 是否显示
          position: 'bottom', // x轴的位置
          offset: 0, // x轴相对于默认位置的偏移
          type: 'category', // 轴类型， 默认为 'category'
          name: '月份', // 轴名称
          nameLocation: 'end', // 轴名称相对位置
          nameTextStyle: { // 坐标轴名称样式
            color: 'red',
            padding: [5, 0, 0, -5]
          },
          nameGap: 15, // 坐标轴名称与轴线之间的距离
          nameRotate: 0, // 坐标轴名字旋转
          axisLine: { // 坐标轴 轴线
            show: true, // 是否显示
            symbol: ['none', 'arrow'], // 是否显示轴线箭头
            symbolSize: [8, 8], // 箭头大小
            symbolOffset: [0, 7], // 箭头位置
            // ------   线 ---------
            lineStyle: {
              color: 'blue',
              width: 1,
              type: 'solid'
            }
          },
          axisTick: { // 坐标轴 刻度
            show: true, // 是否显示
            inside: true, // 是否朝内
            length: 3, // 长度
            lineStyle: { // 默认取轴线的样式
              color: 'red',
              width: 1,
              type: 'solid'
            }
          },
          axisLabel: { // 坐标轴标签
            show: true, // 是否显示
            inside: false, // 是否朝内
            rotate: 0, // 旋转角度
            margin: 5, // 刻度标签与轴线之间的距离
            color: 'red' // 默认取轴线的颜色
          },
          splitLine: { // gird区域中的分割线
            show: false, // 是否显示
            lineStyle: {
              // color: 'red',
              // width: 1,
              // type: 'solid'
            }
          },
          splitArea: { // 网格区域
            show: false // 是否显示，默认为false
          },
          data: this.barxList
        },
        //   ------   y轴  ----------
        yAxis: {
          show: true, // 是否显示
          position: 'left', // y轴位置
          offset: 0, // y轴相对于默认位置的偏移
          type: 'value', // 轴类型，默认为 ‘category’
          name: '销量', // 轴名称
          nameLocation: 'end', // 轴名称相对位置value
          nameTextStyle: { // 坐标轴名称样式
            color: '#fff',
            padding: [5, 0, 0, 5] // 坐标轴名称相对位置
          },
          nameGap: 15, // 坐标轴名称与轴线之间的距离
          nameRotate: 270, // 坐标轴名字旋转

          axisLine: { // 坐标轴 轴线
            show: true, // 是否显示
            //  -----   箭头 -----
            symbol: ['none', 'arrow'], // 是否显示轴线箭头
            symbolSize: [8, 8], // 箭头大小
            symbolOffset: [0, 7], // 箭头位置

            // ----- 线 -------
            lineStyle: {
              color: 'blue',
              width: 1,
              type: 'solid'
            }
          },
          axisTick: { // 坐标轴的刻度
            show: true, // 是否显示
            inside: true, // 是否朝内
            length: 3, // 长度
            lineStyle: {
              color: 'red', // 默认取轴线的颜色
              width: 1,
              type: 'solid'
            }
          },
          axisLabel: { // 坐标轴的标签
            show: true, // 是否显示
            inside: false, // 是否朝内
            rotate: 0, // 旋转角度
            margin: 8, // 刻度标签与轴线之间的距离
            color: 'red' // 默认轴线的颜色
          },
          splitLine: { // gird 区域中的分割线
            show: true, // 是否显示
            lineStyle: {
              color: '#666',
              width: 1,
              type: 'dashed'
            }
          },
          splitArea: { // 网格区域
            show: false // 是否显示，默认为false
          }
        },
        //  -------   内容数据 -------
        series: [
          {
            name: '销量', // 序列名称
            type: 'bar', // 类型
            legendHoverLink: true, // 是否启用图列 hover 时的联动高亮
            label: { // 图形上的文本标签
              show: false,
              position: 'insideTop', // 相对位置
              rotate: 0, // 旋转角度
              color: '#eee'
            },
            itemStyle: { // 图形的形状
              color: 'blue',
              barBorderRadius: [18, 18, 0, 0]
            },
            barWidth: 20, // 柱形的宽度
            barCategoryGap: '20%', // 柱形的间距
            data: this.baryList
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    fetchData() {
      countProjectByUser().then(response => {
        this.pieList = response.data
        this.getPie()
      })
      countProjectByMonth().then(response => {
        this.barxList = response.data.xList
        this.baryList = response.data.yList
        this.getBar()
      })
      getProjectList().then(response => {
        this.tableList = response.data
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>

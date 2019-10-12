<template>
  <div id="tableExport">
    <Button @click="exportData">导出</Button>
    <Table height="400" size="default" :column="columns" :data="tableData"></Table>
  </div>
</template>

<script>
import ExportExcel from '@/assets/js/exportExcel.js';
export default {
  data(){
    return {
      columns: [
        {
          title: '名字',
          key: 'name'
        }, {
          title: '地址',
          key: 'address'
        }, {
          title: '信息',
          key: 'message'
        }
      ],
      tableData: [
        {
          name: '测试名称',
          address: '测试地址',
          message: '测试信息'
        },{
          name: '测试名称2',
          address: '测试地址2',
          message: '测试信息2'
        }
      ]
    }
  },
  methods: {
    exportData() {

      ExportExcel.export({
        headers: this.columns,
        data: this.tableData
      }, '测试文件')
    }
  }
}
</script>
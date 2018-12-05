<template>
  <div>
    <span>首页</span>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {
    handleDownload() {
      // import('@/vendor/Export2Excel').then(excel => {
      //   const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
      //   const data = [[0, '标题1', 'linlei', 3029, '2018-11-15'],
      //     [0, '标题1', 'linlei', 3029, '2018-11-15'],
      //     [0, '标题1', 'linlei', 3029, '2018-11-15']]
      //   excel.export_json_to_excel({
      //     /* 表头 必填*/
      //     header: tHeader,
      //     /* 具体数据 必填*/
      //     data,
      //     /* 非必填*/
      //     filename: 'excel-list',
      //     autoWidth: true,
      //     bookType: 'xlsx'
      //   })
      // })
    }
  }
}
</script>

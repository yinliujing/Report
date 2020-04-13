<template>
  <div>
    <Row style="text-align: center;margin-bottom: 20px;">
      <p>
        导入说明：请下载模板，然后将资料填到模板中
        <a href="../../../static/excel/批量账户导入.xls" download="">下载模板</a>
      </p>
    </Row>
    <Upload
      multiple
      type="drag"
      action="/api/shop/upload/shop" :data="data" :on-success="upSuccess" :on-error="upError">
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="70" style="color: #3399ff"></Icon>
        <p>将文件拖拽到此区域</p>
      </div>
    </Upload>
    <Table style="margin-top: 30px" :columns="columns1" :data="data1"></Table>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                data:{
                    userId: JSON.parse(sessionStorage.getItem("loginInfo")).userId,
                },
                columns1: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 100,
                        align: 'center',
                    }, {
                        title: '错误信息',
                        key: 'error',
                        align: 'center',
                    },],
                data1: []
            }
        },
      mounted() {
      },
        methods: {
            upSuccess(response, res, file) {
              console.log("1111");
                if (!response.results) {
                    this.$message.info("上传成功,店铺已添加")
                } else {
                    let data = response.results;
                    this.data1 = data;
                    this.$message.info("上传失败,请查看错误信息")
                }
            },
            upError(response) {
                this.$message.info("上传失败,请稍后再试")
            },
        }
    }
</script>

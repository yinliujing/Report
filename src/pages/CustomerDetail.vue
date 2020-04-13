<style scoped>
  .txt-font-a {
    font-size: 14px;
  }
  .txt-font-b {
    font-size: 16px;
  }
  .margin-right {
    margin-right: 10px;
  }
</style>
<template>
  <div>
    <Row :gutter="32">
      <i-col span="32">
        <row>
          <row style="height: 90px;background: #f7f8fa;border: 1px solid #E8ECF2;line-height: 90px">
            <span style="margin-left: 48px" class="txt-font-a" >开始时间</span>
            <DatePicker v-model="startDate" class="left-15 txt-font-a" type="date" :options="options1" placeholder="选择开始时间" style="width: 200px"></DatePicker>
            <span class="left-15 txt-font-a">结束时间</span>
            <DatePicker  v-model="endDate"  class="left-15 txt-font-a" :options="options2" type="date" placeholder="选择结束时间" style="width: 200px"></DatePicker>
            <span  class="left-15 txt-font-a">区域选择</span>
            <Select filterable placeholder="请选择区域" v-model="regionId" class="left-15 txt-font-a" style="width:190px" size="small" @on-change="downRegionChange">
              <Option v-for="item in regionList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <span class="left-15 txt-font-a">店铺选择</span>
            <Select filterable placeholder="请选择店铺" v-model="shopId" class="left-15 txt-font-a" style="width:190px" size="small" @on-change="downShopChange">
              <Option v-for="item in shopList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <span class="left-15 txt-font-a">导购选择</span>
            <Select filterable placeholder="请选择导购" v-model="sellerId" class="left-15 txt-font-a" style="width:190px" size="small">
              <Option v-for="item in sellerList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <Button type="primary" style="width: 70px;margin-left: 20px" @click="searchCustomerDataBtnClick" size="small" class="txt-font-a">查询</Button>
          </row>
          <row>
            <Table :columns="columns1" :data="data1" style="margin-top: 20px;" size="small" no-data-text="--"></Table>
          </row>
          <Modal v-model="modal12" draggable scrollable title="客户信息" :width="vipModalWidth+'px'" height="651px" >
            <row style="padding: 10px 0">
                <i-col span="24" v-if="ifVip" >
                  <row>
                    <span class="txt-font-b margin-right" style="width: 80px;display:inline-block;text-align: right">客户名称</span>
                    <i-input  v-model="customerName" :placeholder="customerData.name" style="width: 300px;font-weight: 600" />
                  </row>
                </i-col>
                <i-col span="12" v-if="!ifVip" >
                  <row>
                    <span class="txt-font-b margin-right" style="width: 80px;display:inline-block;text-align: right">客户名称</span>
                    <i-input  v-model="customerName" :placeholder="customerData.name" style="width: 300px;font-weight: 600" />
                  </row>
<!--                  <row style="margin-top: 16px">-->
<!--                    <span class="txt-font-b margin-right" style="width: 80px;display:inline-block;text-align: right">客户ID</span>&nbsp;-->
<!--                    <span class="txt-font-b" style="font-weight: 600">{{customerId}}</span>-->
<!--                  </row>-->
                </i-col >
                <i-col  span="12"  style="border-left: 1px solid #E8ECF2;" v-if="!ifVip" >
                  <row style="margin-left: 50px">
                    <span class="txt-font-b" style="width: 80px;display:inline-block;text-align: right;">关联会员</span>
                  </row>
                  <row style="margin-top: 16px;margin-left: 98px">
                    <span class="txt-font-b margin-right" style="width: 80px;display:inline-block;text-align: left">会员名称</span>
                    <span class="txt-font-b" style="font-weight: 600">{{customerData.vipName}}</span>
                    <Button  type="primary" size="small" style="margin-left: 10px;height: 19px;margin-bottom: 3px;" ></Button>
                  </row>
                  <row style="margin-top: 16px;margin-left: 98px">
                    <span class="txt-font-b margin-right" style="width: 80px;display:inline-block;text-align: left;">手机号</span>
                    <span class="txt-font-b" style="font-weight: 600">{{customerData.vipPhone}}</span>
                  </row>
                  <row style="margin-top: 16px;margin-left: 98px">
                    <span class="txt-font-b margin-right" style="width: 80px;display:inline-block;text-align: left;">会员生日</span>
                    <span class="txt-font-b" style="font-weight: 600">{{customerData.birthday}}</span>
                  </row>
                  <row style="margin-top: 16px;margin-left: 98px">
                    <span class="txt-font-b margin-right" style="width: 80px;display:inline-block;text-align: left">消费次数</span>
                    <span class="txt-font-b" style="font-weight: 600">{{customerData.salesNum}}</span>

                  </row>
                  <row style="margin-top: 16px;margin-left: 98px">
                    <span class="txt-font-b margin-right" style="width: 80px;display:inline-block;text-align: left">消费金额</span>
                    <span class="txt-font-b" style="font-weight: 600">{{customerData.salesAmt}}</span>
                  </row>
                  <row style="margin-top: 16px;margin-left: 98px">
                    <span class="txt-font-b margin-right" style="width: 80px;display:inline-block;text-align: left">最近消费</span>
                    <span class="txt-font-b" style="font-weight: 600">{{customerData.lastSalesDay}}</span>

                  </row>
                  <row style="margin-top: 16px;margin-left: 98px">
                    <span class="txt-font-b margin-right" style="width: 80px;display:inline-block;text-align: left">专属导购</span>
                    <span class="txt-font-b" style="font-weight: 600">{{customerData.sellerName}}</span>
                  </row>
                  <row style="margin-top: 16px;margin-left: 98px">
                    <span class="txt-font-b margin-right" style="width: 80px;display:inline-block;text-align: left">所属门店</span>
                    <span class="txt-font-b" style="font-size: 16px;font-weight: 600">{{customerData.shopName}}</span>
                  </row>
                </i-col>
            </row>
            <div slot="footer">
              <Button type="primary" size="large" @click="asyncOK" style="float: left;margin-left: 110px">保存</Button>

              <Button type="text" size="large"  @click="asyncCancel" style="margin-left: 42px;float: left;border:none">取消</Button>
              <input style="background-color: Transparent;visibility:hidden;height: 50px" ></input>
            </div>

          </Modal>
          <Page :total="totalSize" :current="pageNum" :page-size="pageSize" show-elevator show-total
                placement="top" @on-change="handlePage" style="margin: 20px 50px 0 0;right:0px;position: absolute;"></Page>
        </row>
      </i-col>
    </Row>
  </div>
</template>
<script>
   import customerDetail from "../services/datacenter/DataCenter";
    export default {
        inject:['checkParamBlank'],
        data() {
            return {
              //开始时间，结束时间
              totalSize: null,
              pageNum: 1,
              pageSize: 1,
              modal12: false,
              startDate: null,
              endDate: null,
              regionId: null,
              customerName: null,
              regionList: [{"id":1,"name":"一区"},{"id":2,"name":"二大区"}],
              shopId: null,
              shopList: [{"id":1,"name":"一区"},{"id":2,"name":"二大区"}],
              sellerId: null,
              sellerList: [{"id":1,"name":"一区"},{"id":2,"name":"二大区"}],
              customerData: {},
              vipModalWidth: 997,
              accUserId: JSON.parse(sessionStorage.getItem("loginInfo")).userId,
              columns1: [
                {
                  title: '序号',
                  key: 'number'
                },
                {
                  title: '客户名称',
                  key: 'name'
                },
                {
                  title: '客户手机',
                  key: 'phone'
                },
                {
                  title: '所属导购',
                  key: 'sellerName'
                },
                {
                  title: '关联会员',
                  key: 'vipName'
                },
                {
                  title: '消费次数',
                  key: 'salesNum'
                },
                {
                  title: '消费金额',
                  key: 'salesAmt'
                },
                {
                  title: '会员等级',
                  key: 'vipLevel'
                },
                {
                  title: '会员生日',
                  key: 'birthday'
                },
                {
                  title: '操作',
                  key: 'operation',
                  render: (h, params) => {
                    let that = this;
                    return h('a', {
                              on: {
                                'click': () => {
                                  that.customerData = that.data1[params.index];
                                  that.ifVip();
                                  that.customerName = null;
                                  that.modal12 = true
                                }
                              }
                            },[
                              h('span', {
                                domProps: {
                                  innerHTML: '查看详情'
                                }
                              })
                              ]

                    );
                  }
                }
              ],
              data1: [
                {
                  id: 1,
                  customerName: '会员名称',
                  customerPhone: '会员手机',
                  seller: '会员导购',
                  vipName: 'vip名称',
                  salesNum: '消费次数',
                  salesAmt: '消费金额',
                  vipLevel: '会员等级',
                  vipBirth: '会员生日'
                },
              ]
            }
        },
        mounted: function () {
          this.getCustomerData();
          this.downSellerData();
          this.downShopData();
          this.downRegionData();

        },
        methods: {
          //对象属性空检查
          checkParamBlank: function(obj){
            for(let param in obj){
              obj[param] = this.checkBlank(obj[param]);
            }
          },
          //数据空检查
          checkBlank: function(data){
            if(!data || data === ''){
              return "--";
            }else{
              return data;
            }
          },
          searchCustomerDataBtnClick: function () {
            this.getCustomerData();
          },
          getCustomerData: function () {
            let that = this;
            that.data1 = [];
            let request =
                    { userId: that.accUserId,
                      startDate: that.startDate,
                      endDate: that.endDate,
                      regionId: that.changeData(that.regionId),
                      shopId: that.changeData(that.shopId),
                      sellerId: that.changeData(that.sellerId),
                      pageNum : that.pageNum,
                      pageSize : that.pageSize,};
            customerDetail.dataDetail(request, function (data) {
              data = data.data.results;
              if(data){
                for(let i=0;i<data.length;i++){
                  let entity = data[i];
                  if(entity){
                    if(i === 0) that.totalSize = entity.totalSize;
                    let birthday = entity.birthday;
                    if(birthday){
                      entity.birthday = that.$moment(birthday).format("MM-DD")
                    }
                    that.data1.push(entity);
                    that.checkParamBlank(entity);
                  }

                }
              }
            })
          },
          downSellerData: function () {
            let that = this;
            that.sellerList = [{"id":0,"name":"全部"}];
            let request = {userId: that.accUserId, regionId: that.changeData(that.regionId), shopId:that.changeData( that.shopId)};
            customerDetail.downSellerData(request, function (data) {
              data = data.data.results;
              if(data){
                  for(let i=0;i<data.length;i++){
                    let entity = data[i];
                    if(entity){
                      that.sellerList.push(entity);
                    }
                  }
              }
            })
          },
          downShopData: function () {
            let that = this;
            that.shopList = [{"id":0,"name":"全部"}];
            let request =
                    {userId: that.accUserId,regionId: that.changeData(that.regionId)};
            customerDetail.downShopData(request, function (data) {
              data = data.data.results;
              if(data){
                  for(let i=0;i<data.length;i++){
                    let entity = data[i];
                    if(entity){
                      that.shopList.push(entity);
                    }
                  }
              }
            })
          },
          downRegionData: function () {
            let that = this;
            that.regionList = [{"id":0,"name":"全部"}];
            let request =
                    {userId: that.accUserId};
            customerDetail.downRegionData(request, function (data) {
              data = data.data.results;
              if(data){
                  for(let i=0;i<data.length;i++){
                    let entity = data[i];
                    if(entity){
                      that.regionList.push(entity);
                    }
                  }
              }
            })
          },

          downShopChange: function () {
            let that = this;
             that.downSellerData();
          },
          downRegionChange: function () {
            this.downShopData();
          },
          changeData: function (value) {
            if(value == 0){return null;}
            return value;
          },
          asyncOK: function(){
            let that = this;
            if(that.customerName){
              let request =
                      {customerId: that.customerData.id,name: that.customerName};
              customerDetail.editCustomerData(request,null);
              that.getCustomerData();
            }
            that.asyncCancel();
          },
          asyncCancel: function(){
            let that = this;
            that.modal12 = false;

          },
          ifVip: function(){
            let that = this;
            let vp = that.customerData.vipName !== '--';
            if(!vp)that.vipModalWidth = 500;
            return vp;
          },
          //切页处理
          handlePage:function (value) {
            this.pageNum = value;
            this.getCustomerData();
          },

          // /**商品mainList*/
          // getMainList: function(){
          //
          // },
          // //切页处理
          // handlePage:function (value) {
          //
          // },

        },
        computed:{
          options1() {
            let that = this;
            return{
              disabledDate (date) {
                if(that.endDate == null || that.endDate == ""){
                  return false;
                }else{
                  return date && date.valueOf() > that.endDate;
                }
              }
            }

          },
          options2() {
            let that = this;
            return{
              disabledDate (date) {
                if(that.startDate == null || that.startDate == ""){
                  return false;
                }else{
                  return date && date.valueOf() < that.startDate;
                }
              }
            }
          },
        }
    }
</script>
<style scoped>

  .left-15{
    margin-left: 15px;
  }

</style>

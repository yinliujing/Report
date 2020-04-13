<template>
  <div>
    <Row :gutter="32">
      <i-col span="32">
        <row>
          <!--筛选-->
          <row style="height: 90px;background: #f7f8fa;border: 1px solid #E8ECF2;line-height: 90px">
            <span style="margin-left: 48px">区域选择</span>
            <Select filterable placeholder="请选择区域" v-model="regionId" class="left-15" style="width:190px" size="small" @on-change="downRegionChange">
              <Option v-for="item in regionList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <span class="left-15">店铺选择</span>
            <Select filterable placeholder="请选择店铺" v-model="shopId" class="left-15" style="width:190px" size="small" @on-change="downShopChange">
              <Option v-for="item in shopList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <span class="left-15">导购选择</span>
            <Select filterable placeholder="请选择导购" v-model="sellerId" class="left-15" style="width:190px" size="small">
              <Option v-for="item in sellerList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <Button type="primary" style="width: 70px;margin-left: 20px" @click="searchCustomerDataBtnClick" size="small">查询</Button>
          </row>
          <!--条形图-->
          <row class="top-10 outline">
            <row>
              <i-col span="4">
                  <span class="blue-logo"></span>
                  <span style="display: inline-block;margin-left: 5px">客户&会员关联情况</span>
              </i-col>
              <i-col span="16" style="height: 200px;">
                <row style="margin-top: 32px;margin-bottom: 23px;text-align: right">
                  <span :style="allVipPercent"  class="inline-center-nowrap">全部会员：{{customerViewVO.common + customerViewVO.vip}}人</span>
                </row>
                <!--上大括号-->
                <row>
                  <div class="ivu-poptip-popper" :style="allVipPercent" style="position: absolute; will-change: top, left; top: -23px; right: 0px;z-index: 1;min-width: 0px" x-placement="bottom">
                    <div class="ivu-poptip-content">
                      <div class="ivu-poptip-arrow" style="border-bottom-color:rgba(0,0,0,.5)"></div>
                      <div class="ivu-poptip-inner" style="box-shadow: 0px -1px 0px rgba(0,0,0,.4)">
                        <div class="ivu-poptip-body">
                          <div class="ivu-poptip-body-content">
                          <div class="ivu-poptip-body-content-inner"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </row>

                <row style="height: 28px;margin-top: 3px;background: #ccc;border-radius:14px;overflow: hidden">
                  <span v-if="customerViewVO.customer > 0 || (customerViewVO.customer === 0 && customerViewVO.common === 0 && customerViewVO.vip === 0)" :style="percent1" style="background: #FFCC00;" class="percent-span">
                    <Tooltip  :content="'未关联的客户：' + customerViewVO.customer" placement="top" transfer><span>未关联的客户</span><span class="left-10">{{customerViewVO.customer}}</span></Tooltip>
                  </span>
                  <span v-if="customerViewVO.common > 0 || (customerViewVO.customer === 0 && customerViewVO.common === 0 && customerViewVO.vip === 0)" :style="percent2" style="background: #33CC00;" class="percent-span">
                    <Tooltip  :content="'已关联：' + customerViewVO.common" placement="top" transfer><span>已关联</span><span class="left-10">{{customerViewVO.common}}</span></Tooltip>
                  </span>
                  <span v-if="customerViewVO.vip > 0 || (customerViewVO.customer === 0 && customerViewVO.common === 0 && customerViewVO.vip === 0)" :style="percent3" style="background: #EC6A2F;" class="percent-span">
                    <Tooltip  :content="'未关联的会员：' + customerViewVO.vip" placement="top" transfer><span>未关联的会员</span><span class="left-10">{{customerViewVO.vip}}</span></Tooltip>
                  </span>
                </row>
                <!--下大括号-->
                <row>
                  <div class="ivu-poptip-popper" :style="allCustomerPercent" style="position: absolute; will-change: top, left; top: -7px; left: 0px;display: inline-block;z-index: 1;min-width: 0px" x-placement="top">
                    <div class="ivu-poptip-content">
                      <div class="ivu-poptip-arrow" style="border-top-color:rgba(0,0,0,.5)"></div> <!---->
                      <div class="ivu-poptip-inner" style="box-shadow: 0px 1px 0px rgba(0,0,0,.4)"><!---->
                        <div class="ivu-poptip-body">
                          <div class="ivu-poptip-body-content ivu-poptip-body-content-word-wrap">
                            <div class="ivu-poptip-body-content-inner"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </row>
                <row style="margin-top: 23px;text-align: left">
                  <span :style="allCustomerPercent" class="inline-center-nowrap">全部客户：{{customerViewVO.customer + customerViewVO.common}}人</span>
                </row>
              </i-col>
              <i-col span="4">
              </i-col>
            </row>
          </row>
          <!--柱状图-->
          <row class="top-10 outline">
            <span class="blue-logo"></span>
            <span style="display: inline-block;margin-left: 5px">近7天趋势</span>
            <ve-histogram :data="chartData" :extend="chartExtend" :colors="chartColor"></ve-histogram>
          </row>
          <Spin style="top: 110px" size="large" fix v-if="spinShow"></Spin>
        </row>
      </i-col>
    </Row>
  </div>
</template>
<script>

  import customerView from "../services/datacenter/customerView";
  import customerDetail from "../services/datacenter/DataCenter";
    export default {
        data() {
            return {
              userId: 13,
              //加载遮罩
              spinShow: false,
              regionId: 0,
              regionList: [{"id":1,"name":"一区"},{"id":2,"name":"二大区"}],
              shopId: 0,
              shopList: [{"id":1,"name":"一区"},{"id":2,"name":"二大区"}],
              sellerId: 0,
              sellerList: [{"id":1,"name":"一区"},{"id":2,"name":"二大区"}],
              //人数占比
              allVipPercent: "width:66.66%",
              percent1: "width:33.33%",
              percent2: "width:33.33%",
              percent3: "width:33.33%",
              allCustomerPercent: "width:66.66%",
              customerViewVO: {
                customer:0,
                common:0,
                vip:0,
                sevenDayCustomerList: [],
                sevenDayVipList: [],
              },
              chartExtend: {
                barWidth: 28
              },
              chartColor:["#ffcc00","#ec6a2f"],
              chartData: {
                columns: ['date', '新增客户', '新增会员' ],
                rows: [
                  { 'date': '1/1', '新增客户': 0, '新增会员': 0 },
                  { 'date': '1/2', '新增客户': 0, '新增会员': 0 },
                  { 'date': '1/3', '新增客户': 0, '新增会员': 0 },
                  { 'date': '1/4', '新增客户': 0, '新增会员': 0 },
                  { 'date': '1/5', '新增客户': 0, '新增会员': 0 },
                  { 'date': '1/6', '新增客户': 0, '新增会员': 0 },
                  { 'date': '1/7', '新增客户': 0, '新增会员': 0 }
                ]
              },
            }
        },
        mounted: function () {
          this.downSellerData();
          this.downShopData();
          this.downRegionData();
          this.getMainList();
        },
        methods: {
          //页面重绘
          resizeWindow: function(){
            let event = document.createEvent("HTMLEvents");
            event.initEvent("resize", true, true);
            window.dispatchEvent(event);
          },
          //占比重绘
          percentResize: function(){
            let customer = this.customerViewVO.customer;
            let common = this.customerViewVO.common;
            let vip = this.customerViewVO.vip;
            let sum = customer + common + vip;
            if(sum === 0){
              this.allVipPercent = "width:66.66%";
              this.percent1 = "width:33.33%";
              this.percent2 = "width:33.33%";
              this.percent3 = "width:33.33%";
              this.allCustomerPercent = "width:66.66%";
              return;
            }
            let p1 = Math.floor(customer/sum * 100 *100)/100;
            let p2 = Math.floor(common/sum * 100 *100)/100;
            let p3 = Math.floor(vip/sum * 100 *100)/100;
            this.allVipPercent = "width:" + (p2 + p3) + "%";
            this.percent1 = "width:" + p1 + "%";
            this.percent2 = "width:" + p2 + "%";
            this.percent3 = "width:" + p3 + "%";
            this.allCustomerPercent = "width:" + (p1 + p2) + "%";
          },

          //0转null
          checkZero: function (value) {
            if(value === 0){return null;}
            return value;
          },
          //导购list
          downSellerData: function () {
            let that = this;
            that.sellerList = [{"id":0,"name":"全部"}];
            let request = {userId: this.userId, regionId: that.checkZero(that.regionId), shopId:that.checkZero( that.shopId)};
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
          //店铺list
          downShopData: function () {
            let that = this;
            that.shopList = [{"id":0,"name":"全部"}];
            let request =
                    {userId: this.userId,regionId: that.checkZero(that.regionId)};
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
          //区域list
          downRegionData: function () {
            let that = this;
            that.regionList = [{"id":0,"name":"全部"}];
            let request =
                    {userId: this.userId};
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
          //店铺选择
          downShopChange: function () {
            this.downSellerData();
          },
          //区域选择
          downRegionChange: function () {
            this.downShopData();
          },
          //搜索
          searchCustomerDataBtnClick: function () {
            this.getMainList();
          },
          /**mainList*/
          getMainList: function(){
            let request = {
              userId: this.userId,
              sevenDayStartTime: this.$moment(new Date()).add(-6,"days").format("YYYY-MM-DD 00:00:00"),
              sevenDayEndTime: this.$moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
              regionId: this.checkZero(this.regionId),
              shopId: this.checkZero(this.shopId),
              sellerId: this.checkZero(this.sellerId),
            };
            let that = this;
            //加载遮罩
            this.spinShow = true;
            customerView.getMainRequest(request,function (data) {
              that.spinShow = false;
              if(data.data.code !== "0000"){
                that.$Message.error("系统异常");
              }
              data = data.data.results;
              that.customerViewVO = data;
              that.chartData.rows = [];
              for(let i=-6;i<=0;i++){
                let date = that.$moment(new Date()).add(i, "days").format("M-DD");
                let obj = {
                  date:date,
                  "新增客户": that.customerViewVO.sevenDayCustomerList.filter(customer => date === that.$moment(customer.registerTime).format("M-DD")).length,
                  "新增会员": that.customerViewVO.sevenDayVipList.filter(vip => date === that.$moment(vip.registerTime).format("M-DD")).length,
                };
                that.chartData.rows.push(obj);
              }
              //占比重绘
              that.percentResize();
              //页面重绘(柱状图)
              that.resizeWindow();
            });
          },

        }
    }
</script>
<style scoped>
  /*蓝色logo*/
  .blue-logo{
    background: #1A80D2;
    height: 26px;
    width: 6px;
    border-radius:3px;
    display: inline-block;
    vertical-align: middle;
  }
  /*占比样式*/
  .percent-span{
    display: inline-block;
    vertical-align: middle;
    height: 28px;
    line-height: 28px;
    background: #FFCC00;
    color: #fff;
    text-align: center;
  }
  /*外面的边框*/
  .outline{
    border: #e8ecf2 2px solid;
    padding: 10px;
  }
  .left-10{
    margin-left: 10px;
  }
  .left-15{
    margin-left: 15px;
  }
  .top-10{
    margin-top: 10px;
  }

  /*全部客户样式*/
  .inline-center-nowrap{
    display: inline-block;
    text-align: center;
    white-space: nowrap
  }

</style>

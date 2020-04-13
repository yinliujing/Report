<template>
    <div>
        <Row style="margin-top: 20px;width: 100%;background-color: #F7F8FA;">
            <i-col span="24" style="text-align: left;padding-left: 10px;">
                <Row class="row-style">
                    <i-col span="1" style="text-align: right;">
                        <span class="region">区域选择</span>
                    </i-col>
                    <i-col span="4" style="padding-left: 10px;">
                        <Select v-model="selectedRegion" filterable style="width: 200px;">
                            <Option v-for="item in regionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </i-col>
                    <i-col span="1" style="text-align: right;">
                        <span class="region">店铺选择</span>
                    </i-col>
                    <i-col span="4" style="padding-left: 10px;">
                        <Select v-model="selectedStore" filterable style="width: 200px;">
                            <Option v-for="item in storeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </i-col>
                    <i-col span="1" style="text-align: right;">
                        <p class="region">时间</p>
                    </i-col>
                    <i-col span="4" style="padding-left: 10px;">
                        <DatePicker type="daterange" placement="bottom-end" placeholder="请选择日期" style="width: 200px"
                                    @on-change="onChangeDateLister"></DatePicker>
                    </i-col>
                    <i-col span="4">
                        <Button type="primary">查询</Button>
                    </i-col>
                    <i-col span="5" style="text-align: right;padding-right: 20px;">
                        <Button type="primary">导出数据</Button>

                    </i-col>
                </Row>
            </i-col>
        </Row>

        <Table :columns="columns1" :data="data1" style="margin-top: 20px;"></Table>
    </div>
</template>

<script>
    export default {
        name: "IncreaseDataStore",
        data () {
            return {
                selectedRegion: null,
                regionList: [],
                selectedStore: null,
                storeList: [],
                columns1: [
                    {
                        title: '序号',
                        key: 'id'
                    },
                    {
                        title: '区域名称',
                        key: 'regionName'
                    },
                    {
                        title: '总客户数',
                        key: 'customerNum'
                    },
                    {
                        title: '新增客户数',
                        key: 'addNum'
                    },
                    {
                        title: '日增好友平均',
                        key: 'avg'
                    },
                    {
                        title: '删除/拉黑成员客户数（累计）',
                        key: 'rate'
                    }
                ],
                data1: [
                    {
                        id: 1,
                        regionName: '区域1',
                        customerNum: 18,
                        addNum: 99,
                        avg: 80,
                        rate: '2%'
                    },
                    {
                        id: 2,
                        regionName: '区域2',
                        customerNum: 18,
                        addNum: 99,
                        avg: 80,
                        rate: '2%'
                    },
                    {
                        id: 3,
                        regionName: '区域3',
                        customerNum: 18,
                        addNum: 99,
                        avg: 80,
                        rate: '2%'
                    },
                    {
                        id: 4,
                        regionName: '区域4',
                        customerNum: 18,
                        addNum: 99,
                        avg: 80,
                        rate: '2%'
                    }
                ]
            }
        },
        methods: {
            onChangeDateLister: function () {

            }
        }
    }
</script>

<style scoped>
    .region {
        font-size: 14px;
        line-height: 32px;
    }
    .row-style {
        padding-top: 20px;
        padding-bottom: 20px;
    }
</style>

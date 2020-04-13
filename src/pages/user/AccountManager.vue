<template>
    <div style="margin-top: 20px;margin-left: 20px">
        <template>
            <Row style="background-color: #F7F8FA;line-height: 80px;">
                <span style="margin-left: 20px">账户名</span>
                <i-input placeholder="搜索用户名/账户" style="width: 10%;margin-left: 10px;" v-model="searchContent" />
                <span style=";margin-left: 20px;">角色</span>
                <Select filterable placeholder="请选择区域" v-model="roleId" class="left-15" style="width:190px;margin-left: 10px;">
                    <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
                <span style=";margin-left: 20px;">店铺</span>
                <Select filterable placeholder="请选择店铺" v-model="shopId" class="left-15" style="width:190px;margin-left: 10px;">
                    <Option v-for="item in shopList" :value="item.shopId" :key="item.shopId">{{ item.shopName }}</Option>
                </Select>
                <Button type="primary" style="margin-left: 30px">查询</Button>
                <Button  type="primary" style="margin-bottom: 20px;margin-right: 20px;float:right;margin-top: 25px" @click="addOneAccount()">+添加账户</Button>
                <Button  type="primary" ghost style="margin-bottom: 20px;margin-right: 20px;float:right;margin-top: 25px" @click="uploadAccount">批量导入账户</Button>
            </Row>
        </template>
        <Table  :columns="columns1" :data="data1" style="margin-top: 30px"></Table>
        <Page :total="totalSize" :current="pageNum" :page-size="pageSize" show-elevator show-total
              placement="top" style="float: right;margin-top: 20px"></Page>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                roleList:[
                    {
                        id: '1',
                        name: '系统管理员',
                    },
                    {
                        id: '2',
                        name: '运营人员',
                    },
                    {
                        id: '3',
                        name: '店长',
                    },
                    {
                        id: '4',
                        name: '导购',
                    },
                ],
                shopList:[
                    {
                        shopId: '1',
                        shopName: '店铺1',
                    },
                    {
                        shopId: '2',
                        shopName: '店铺2',
                    },
                ],
                columns1: [
                    {
                        type: 'index',
                        width: 80,
                        title: "序号",
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        key: 'userName',
                        width:'150px'
                    },
                    {
                        title: '员工ID',
                        key: 'userCode',
                        width:'150px'
                    },
                    {
                        title: '系统角色',
                        key: 'roleName',
                        width:'150px'
                    },
                    {
                        title: '可见店铺',
                        key: 'shopName',
                        width:'200px'
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        render: (h, params) => {
                            return h('div', [
                                h('span', {
                                    style: {
                                        background: 'white',
                                        border: '0',
                                        color: '#3496EB',
                                        marginRight: '15px',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                        }
                                    }
                                }, '修改'),
                                h('span', {
                                    style: {
                                        background: 'white',
                                        border: '0',
                                        color: 'red',
                                        marginRight: '15px',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params);
                                        }
                                    }
                                }, '删除')
                            ])

                        }
                    },
                ],
                data1: [
                    {
                        userName:"何永东",
                        userCode:"7833",
                        roleName:"系统管理员",
                        shopName:"全部",
                    }
                ],
                roleId:1,
                shopId:1,
                //分页内容
                totalSize: 0,
                pageNum : 1,
                pageSize : 10,
                //搜索内容
                searchContent: null,
            }
        },
        methods:{
            //添加单个账户
            addOneAccount(){
                this.$router.push({path:'/account/management/add'});
            },
            //导入账户
            uploadAccount(){
                this.$router.push({path:'/account/management/upload'});
            },
        }
    }
</script>

<style scoped>

</style>

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
                    <i-col span="2">
                        <Button type="primary">查询</Button>
                    </i-col>
                    <i-col span="12" style="text-align: right;padding-right: 20px;">
                        <Button type="primary" style="margin-right: 10px;">批量下载</Button>
                        <Button type="primary" style="margin-right: 10px;">批量添加</Button>
                        <Button type="primary" @click="open(1)">添加推广人员</Button>
                    </i-col>
                </Row>
            </i-col>
        </Row>

        <Table :columns="columns1" :data="data1"  style="margin-top: 20px;">
            <template slot-scope="{ row, index }" slot="qrCodeAction">
                <Button ghost type="primary" size="small" style="margin-right: 5px" @click="show(row)">预览</Button>
                <Button ghost type="primary" size="small" @click="download(row)">下载</Button>
            </template>

            <template slot-scope="{ row, index }" slot="state">
                <i-switch size="large" :value="row.qrCodeState" @on-change="onSwitchChangeLister(row, index)">
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                </i-switch>
            </template>

            <template slot-scope="{ row, index }" slot="action">
                <Button ghost type="primary" size="small" style="margin-right: 5px" @click="open(2, index)">修改</Button>
                <Button ghost type="error" size="small" @click="remove(index)">删除</Button>
            </template>
        </Table>

        <!-- 预览二维码 -->
        <Modal
                v-model="isShow"
                :title="showStoreName"
                :footer-hide="true"
                width="230"
                class-name="vertical-center-modal"
                >
            <div slot="header">{{this.showStoreName}}</div>
            <img :src="qrCodeImage" style="width:200px;height:200px;"/>
            <div  style="text-align: center;">
                <Button ghost type="primary" @click="download(rowData)">下载</Button>
            </div>
        </Modal>

        <!-- 添加推广人员 -->
        <Modal
                v-model="isShowAdd"
                :footer-hide="true"
               >
            <div slot="header">
                <template v-if="flag === 1">
                    <span>添加推广人员</span>
                </template>
                <template v-else>
                    <span>修改推广人员</span>
                </template>
            </div>

            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="名称" prop="name">
                    <i-input v-model="formValidate.name" placeholder="请输入名字"></i-input>
                </FormItem>
                <FormItem label="手机" prop="phone">
                    <i-input v-model="formValidate.phone" placeholder="成员通过验证该手机号后可加入企业">
                    </i-input>
                </FormItem>
                <FormItem label="工号" prop="staffCode">
                    <i-input v-model="formValidate.staffCode" placeholder="请输入工号"  :disabled="flag !== 1 ? true : false" ></i-input>
                </FormItem>
                <FormItem label="角色" prop="role">
                    <Select v-model="formValidate.role" placeholder="选择角色">
                        <Option value="1">角色1</Option>
                        <Option value="2">角色2</Option>
                        <Option value="3">角色3</Option>
                    </Select>
                </FormItem>
                <FormItem label="所属区域" prop="region">
                    <Select v-model="formValidate.region" placeholder="选择区域">
                        <Option value="1">区域1</Option>
                        <Option value="2">区域2</Option>
                        <Option value="3">区域3</Option>
                    </Select>
                </FormItem>
                <FormItem label="所属店铺" prop="store">
                    <Select v-model="formValidate.store" placeholder="选择店铺">
                        <Option value="1">店铺1</Option>
                        <Option value="2">店铺2</Option>
                        <Option value="3">店铺3</Option>
                    </Select>
                </FormItem>
                <FormItem style="text-align: left;">
                    <Row>
                        <i-col span="16">
                            <Button type="primary" @click="handleSubmit('formValidate')">保存并生成推广码</Button>
                            <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
                        </i-col>
                        <i-col span="8" style="text-align: right;">
                            <Button>继续添加</Button>
                        </i-col>
                    </Row>
                </FormItem>
            </Form>
        </Modal>

            <div style="margin: 30px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="total" :current="pageNum" :pageSize="pageSize"></Page>
                </div>
            </div>
    </div>
</template>

<script>
    import data from "../../utils/PhoneRegionData";

    import staff from "../../services/staff/staff";
    export default {
        name: "IncreaseStaffManager",
        data () {
            return {
                // 标记 1添加 2修改
                flag: 1,
                prefixDefault: data.prefixDefault,
                isShow: false,
                isShowAdd: false,
                showStoreName: '',
                qrCodeImage: '',
                loading:true,
                spuLoading:false,
                // 分页
                total: 0,
                pageSize: 15,
                pageNum: 1,
                selectedRegion: null,
                regionList: [],
                selectedStore: null,
                storeList: [],
                rowData:{},
                columns1: [
                    {
                        title: '序号',
                        key: 'id',
                        width: 100
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        width: 100
                    },
                    {
                        title: '员工ID',
                        key: 'staffCode',
                        width: 100
                    },
                    {
                        title: '手机号码',
                        key: 'mobil',
                        width: 160
                    },
                    {
                        title: '店铺',
                        key: 'storeName',
                        width: 100
                    },
                    {
                        title: '角色',
                        key: 'role',
                        width: 100
                    },
                    {
                        title: '客户数',
                        key: 'customerNum',
                        width: 100
                    },
                    {
                        title: '推广码',
                        slot: 'qrCodeAction',
                        key:'epWechatQrCode',
                        width: 150
                    },
                    {
                        title: '推广码',
                        key: 'qrCodeState',
                        width: 150,
                        slot: 'state'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                    }
                ],
                data1: [],
                // 开通企业微信 表单
                formValidate: {
                    staffCode: '',
                    region: '',
                    phone: '',
                    role: '',
                    store: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '名称不能为空', trigger: 'blur' }
                    ],
                    staffCode: [
                        { required: true, message: '工号不能为空', trigger: 'blur' }
                    ],
                    // mail: [
                    //     { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    //     { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
                    // ],
                    role: [
                        { required: true, message: '请选择角色', trigger: 'change' }
                    ],
                    region: [
                        { required: true, message: '请选择区域', trigger: 'change' }
                    ],
                    store: [
                        { required: true, message: '请选择店铺', trigger: 'change' }
                    ]
                }
            }
        },
        mounted() {
            this.listOfLogistics();
        },
        methods: {
            changePage (page) {
                this.pageNum = page;
                this.listOfLogistics();
            },
            listOfLogistics() {
                let that = this;
                let request = {
                    userId: 1 ,
                    region: that.region,
                    shopId: that.store,
                    pageNum: that.pageNum,
                    pageSize: that.pageSize,
                };
                staff.getStaffList(request, function (data) {
                    data = data.data;
                    if(data.code == "0000") {

                        that.data1 = [];
                        let datas = data.results;
                        //总页数
                        if (datas.total == null) {
                            that.total = 0;
                        } else {
                            that.total = datas.total;
                        }
                        if (datas.records == null) {
                            datas.records = [];
                        }
                        that.data1 = datas.records;
                    }
                })
            },
            // 日期选择
            onChangeDateLister: function () {

            },
            // 预览二维码
            show: function (index) {
                this.isShow = true;
                this.showStoreName = index.storeName;
                this.qrCodeImage = index.epWechatQrCode;
                this.rowData = index;
            },
            // 下载二维码
            download: function (index) {
                let name = index.staffCode+"-"+index.name
                let image = new Image();
                // 解决跨域 Canvas 污染问题
                image.setAttribute("crossOrigin", "anonymous");
                image.onload = function() {
                    let canvas = document.createElement("canvas");
                    canvas.width = image.width;
                    canvas.height = image.height;
                    let context = canvas.getContext("2d");
                    context.drawImage(image, 0, 0, image.width, image.height);
                    let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
                    let a = document.createElement("a"); // 生成一个a元素
                    let event = new MouseEvent("click"); // 创建一个单击事件
                    a.download = name || "photo"; // 设置图片名称
                    a.href = url; // 将生成的URL设置为a.href属性
                    a.dispatchEvent(event); // 触发a的单击事件
                };
                image.src = index.epWechatQrCode;
            },
            // 添加、修改推广人员
            open: function (flag) {
                this.flag = flag;
                this.isShowAdd = true;
            },
            // 删除
            remove: function () {

            },
            // switch开关
            onSwitchChangeLister: function () {

            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // 调用添加接口
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
                this.isShowAdd = false;
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

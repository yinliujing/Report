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
                            <Option v-for="item in regionList" :value="item.value" :key="item.value">{{ item.label }}
                            </Option>
                        </Select>
                    </i-col>
                    <i-col span="1" style="text-align: right;">
                        <span class="region">店铺选择</span>
                    </i-col>
                    <i-col span="4" style="padding-left: 10px;">
                        <Select v-model="selectedStore" filterable style="width: 200px;">
                            <Option v-for="item in storeList" :value="item.value" :key="item.value">{{ item.label }}
                            </Option>
                        </Select>
                    </i-col>
                    <i-col span="2">
                        <Button type="primary">查询</Button>
                    </i-col>
                    <i-col span="12" style="text-align: right;padding-right: 20px;">
                        <Button type="primary" style="margin-right: 10px;">批量下载</Button>
                        <Button type="primary" style="margin-right: 10px;">批量开通</Button>
                    </i-col>
                </Row>
            </i-col>
        </Row>

        <Table :columns="columns1" :data="data1" style="margin-top: 20px;">
            <template slot-scope="{ row, index }" slot="qrCodeAction">
                <Button ghost type="primary" size="small" style="margin-right: 5px" @click="instance(index)" >预览</Button>
                <Button ghost type="primary" size="small" @click="download(index)">下载</Button>
            </template>

            <template slot-scope="{ row, index }" slot="action">
                <Button ghost type="primary" size="small" style="margin-right: 5px" @click="open(index)">开通门店企微号
                </Button>
                <Button ghost type="error" size="small" @click="remove(index)">删除微信号</Button>
            </template>
        </Table>

        <!-- 预览二维码 -->
        <Modal
                v-model="isShow"
                :title="showStoreName"
                :footer-hide="true"
                width="230"
                class-name="vertical-center-modal"
                @on-ok="ok">
            <div slot="header">{{this.showStoreName}}</div>
            <img :src="qrCodeImage" style="width:200px;height:200px;"/>
            <div style="text-align: center;">
                <Button ghost type="primary">下载</Button>
            </div>
        </Modal>

        <!-- 开通企业微信号 -->
        <Modal
                v-model="isShowAdd"
                :footer-hide="true"
                @on-ok="ok">
            <div slot="header">开通企业微信号</div>

            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="名称" prop="name">
                    <i-input v-model="formValidate.name" placeholder="请输入名字"></i-input>
                </FormItem>
                <FormItem label="别名" prop="alias">
                    <i-input v-model="formValidate.alias" placeholder="请输入别名"></i-input>
                </FormItem>
                <FormItem label="账号" prop="account">
                    <i-input v-model="formValidate.account" placeholder="请输入账号"></i-input>
                </FormItem>
                <FormItem label="性别" prop="gender">
                    <RadioGroup v-model="formValidate.gender">
                        <Radio label="男">男</Radio>
                        <Radio label="女">女</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="手机" prop="phone">
                    <i-input v-model="formValidate.phone" placeholder="成员通过验证该手机号后可加入企业">
                        <Select v-model="formValidate.selectedPhoneRegion" slot="prepend" style="width: 80px" >
                            <Option v-for="item in prefixDefault" :key="item.prefix + item.en" :value="item.prefix">{{item.prefix}}</Option>
                        </Select>
                    </i-input>
                </FormItem>
                <FormItem label="邮箱" prop="mail">
                    <i-input v-model="formValidate.mail" placeholder="请输入邮箱"></i-input>
                </FormItem>
                <FormItem label="地址" prop="address">
                    <i-input v-model="formValidate.address" placeholder="请输入地址"></i-input>
                </FormItem>
                <FormItem label="部门" prop="party">
                    <Select v-model="formValidate.party" placeholder="选择部门">
                        <Option value="1">部门1</Option>
                        <Option value="2">部门2</Option>
                        <Option value="3">部门3</Option>
                    </Select>
                </FormItem>

                <FormItem label="职务" prop="duty">
                    <i-input v-model="formValidate.duty" placeholder="请输入职务"></i-input>
                </FormItem>

                <FormItem label="身份" prop="position">
                    <i-input v-model="formValidate.position" placeholder="请输入身份"></i-input>
                </FormItem>

                <FormItem label="">
                    <CheckboxGroup v-model="formValidate.checkbox">
                        <Checkbox label="vail">通过邮箱或短信发送企业邀请</Checkbox>
                    </CheckboxGroup>
                </FormItem>

                <FormItem style="text-align: left;">
                    <Button type="primary" @click="handleSubmit('formValidate')">保存并继续添加</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    import data from '../../utils/PhoneRegionData';

    export default {
        name: "IncreaseStoreManager",
        data() {
            return {
                prefixDefault: data.prefixDefault,
                isShow: false,
                isShowAdd: false,
                showStoreName: '',
                qrCodeImage: '',
                selectedRegion: null,
                regionList: [],
                selectedStore: null,
                storeList: [],
                columns1: [
                    {
                        title: '序号',
                        key: 'id',
                        width: 100
                    },
                    {
                        title: '门店名称',
                        key: 'storeName'
                    },
                    {
                        title: '门店企业号',
                        key: 'storeWx'
                    },
                    {
                        title: '员工数',
                        key: 'staffNum',
                    },
                    {
                        title: '客户数',
                        key: 'customerNum',
                        width: 100
                    },
                    {
                        title: '推广码',
                        slot: 'qrCodeAction',
                        width: 150
                    },
                    {
                        title: '操作',
                        slot: 'action',
                    }
                ],
                data1: [
                    {
                        id: 1,
                        storeName: '店铺1',
                        storeWx: 'D1',
                        staffNum: 10,
                        customerNum: 999
                    },
                    {
                        id: 2,
                        storeName: '店铺2',
                        storeWx: 'D2',
                        staffNum: 10,
                        customerNum: 999
                    },
                    {
                        id: 3,
                        storeName: '店铺3',
                        storeWx: 'D3',
                        staffNum: 10,
                        customerNum: 999
                    },
                    {
                        id: 4,
                        storeName: '店铺4',
                        storeWx: 'D4',
                        staffNum: 10,
                        customerNum: 999
                    }
                ],
                // 开通企业微信 表单
                formValidate: {
                    alias: '',
                    account: '',
                    gender: '',
                    phone: '',
                    mail: '',
                    address: '',
                    party: '',
                    selectedPhoneRegion: '86',
                    duty: '',
                    position: '',
                    interest: [],
                    desc: '',
                    checkbox: ['vail']
                },
                ruleValidate: {
                    account: [
                        { required: true, message: '账号不能为空', trigger: 'blur' }
                    ],
                    // gender: [
                    //     { required: true, message: '请选择性别', trigger: 'change' }
                    // ],
                    phone: [
                        { required: true, message: '手机号码不能为空', trigger: 'blur' }
                    ],
                    // mail: [
                    //     { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    //     { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
                    // ],
                    party: [
                        { required: true, message: '请选择部门', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            onChangeDateLister: function () {

            },
            instance: function () {
                this.isShow = true;
                this.showStoreName = '店铺1';
                this.qrCodeImage = '../static/img/logo-title.png';
            },
            ok: function () {
                this.isShow = false;
            },
            cancel: function () {
                this.isShow = false;
            },
            download: function () {

            },
            open: function () {
                this.isShowAdd = true;

            },
            remove: function () {

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

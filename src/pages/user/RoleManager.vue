<style scoped>
    /deep/.addButton {
        background: #3496EB;
    }
    /deep/.deleteButton {
        border:1px solid #3496EB;
        color: #3496EB;
        background: white;
    }
    /deep/.role-select-radio-group {
        height: 24px;
        line-height: 24px;
        color: #637182;
        border: 1px solid #EDEFF1;
    }
    /deep/.ivu-radio-group-button .ivu-radio-wrapper-checked:first-child {
        color: #2d8cf0;
    }
    /deep/.system-role-div {
        height: 39px;
        padding: 10px;
    }
    /deep/.system-role-img {
        height: 12px;
        width: 12px;
        display: inline-block;
        margin-right: 9px;
        margin-left: 7px;
    }
    /deep/.system-role-name-selected {
        font-size: 14px;
        display: inline-block;
        color: #2074E2;
        cursor: default;
    }
    /deep/.system-role-name-un-select {
        font-size: 14px;
        display: inline-block;
        color: #535353;
        cursor: default;
    }
    /deep/.system-role-name-un-select:hover {
        color: #2074E2;
    }
    /deep/.system-role-number-selected {
        font-size: 13px;
        display: inline-block;
        color: #2074E2;
        float: right;
        margin-right: 11px;
        cursor: pointer;
    }
    /deep/.system-role-number-un-select {
        font-size: 13px;
        display: inline-block;
        color: #535353;
        float: right;
        margin-right: 11px;
        cursor: pointer;
    }
    /deep/.ivu-checkbox {
        margin-right: 13px;
    }
    /deep/.ivu-checkbox-checked .ivu-checkbox-inner {
        border-color: #2074E2;
        background-color: #2074E2;
    }
    /deep/.ivu-checkbox-indeterminate .ivu-checkbox-inner {
        border-color: #2074E2;
        background-color: #2074E2;
    }
</style>
<template>
    <div style="height: 100%;">
        <Row style="height: 100%;">
            <i-col span="6" style="height: 100%;">
                <div style="border: 1px solid #EDEFF1">
                    <div style="margin: 15px 0 15px 15px">
                        <span style="color: #697882;font-size: 12px;font-weight: 700">系统角色</span>
                    </div>
                </div>
                <div>
                    <div class="system-role-div" v-for="item in roleList" :value="item.index" :key="item.id">
                        <img :src="item.imgUrl" class="system-role-img"/>
                        <span :class="item.selectFlag === 'selected' ? 'system-role-name-selected' : 'system-role-name-un-select'"
                              @click="selectRole(item.id)" :value="item.id">{{item.name}}</span>
                        <span :class="item.selectFlag === 'selected' ? 'system-role-number-selected' : 'system-role-number-un-select'"
                              @click="goToAccManagerPage">{{item.number}}</span>
                    </div>
                </div>
            </i-col>

            <!--权限多选-->
            <i-col span="18" style="height: 100%;">
                <div style="border: 1px solid #EDEFF1">
                    <div style="margin: 15px 0 15px 15px">
                        <span style="color: #697882;font-size: 12px;font-weight: 700">角色权限</span>
                    </div>
                </div>
                <div style="padding-left: 15px;">
                    <!--1-->
                    <div v-for="item in permissionList" :key="item.id">
                        <div style="border-bottom: 1px solid #e9e9e9;height: 49px;line-height: 49px;">
                            <Checkbox :indeterminate="item.indeterminate" :value="item.check"
                                      @click.prevent.native="handleItemCheckAll(item)"  style="color:#697882;margin-right: 20px;">{{item.name}}</Checkbox>
                        </div>
                        <!--2-->
                            <div v-for="itemSon in item.sonPermissionList" :key="itemSon.id" style="height: 49px;">
                                <div style="float: left;width: 20%;border-right: 1px solid #E4E9F1;border-bottom: 1px solid #E4E9F1;height: 49px;line-height: 49px;">
                                    <CheckboxGroup v-model="item.checkArr">

                                    <Checkbox style="margin-left: 30px;color:#697882" :label="itemSon.id"
                                              @click.prevent.native="handleItemSonCheckAll(itemSon, item)"
                                              :key="itemSon.id"
                                              :indeterminate="itemSon.indeterminate" :value="itemSon.check">
                                        {{itemSon.name}}
                                    </Checkbox>
                                    </CheckboxGroup>

                                </div>
                                <!--3-->
                                <div style="float: left;width: 80%;height: 49px;line-height: 49px;border-bottom: 1px solid #E4E9F1;">
                                    <CheckboxGroup v-model="itemSon.checkArr"  @on-change="handleGrandSonCheckChange(itemSon, item)">
                                        <Checkbox v-for="itemGrandson in itemSon.sonPermissionList"
                                                  :key="itemGrandson.id"
                                                  style="margin-left: 30px;color:#697882" :label="itemGrandson.id" :value="itemGrandson.check">
                                            {{itemGrandson.name}}
                                        </Checkbox>
                                    </CheckboxGroup>
                                </div>
                            </div>

                    </div>
                </div>
                <div style="top: 76%;border-top: 1px solid #E4E9F1;width: 100%;padding-top: 20px;position: absolute;text-align: center;">
                    <Button  type="text" style="width: 70px;border: 1px solid #BBBBBB;height: 32px;color: #333333;margin-right: 35px;line-height: 32px;" @click="cancelEdit()">取消</Button>
                    <Button type="primary" style="width: 70px;height: 32px;line-height: 32px;background-color: #2074E2;" @click="savePermission()">确定</Button>
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
    // import RoleManager from '../../services/user/RoleManager'
    import roleSelectedImg from '../../../static/img/role-selected.png'
    import roleUnSelectImg from '../../../static/img/role-un-select.png'
    export default {
        data() {
            return {
                name: "RoleManager",
                //当前选中角色id
                roleSelectId: 1,
                //角色集合
                roleList:[
                    {
                        id: 1,
                        name: "系统管理员",
                        number: 6,
                        imgUrl: roleSelectedImg,
                        selectFlag: 'selected'
                    },
                    {
                        id: 2,
                        name: "运营人员",
                        number: 18,
                        imgUrl: roleUnSelectImg,
                        selectFlag: "unSelect"
                    },
                    {
                        id: 3,
                        name: "店长",
                        number: 123,
                        imgUrl: roleUnSelectImg,
                        selectFlag: "unSelect"
                    },
                    {
                        id: 4,
                        name: "导购",
                        number: 423,
                        imgUrl: roleUnSelectImg,
                        selectFlag: "unSelect"
                    },
                ],
                //权限集合
                permissionList: [
                    {
                        id: 1,
                        name: '一级权限a',
                        level: 1,
                        //选中1个：false，全部选中：true，全未选：false
                        check: false,
                        //选中1个：true，全部选中：true，全未选：false
                        indeterminate: false,
                        //选中的子权限
                        checkArr:[],
                        sonPermissionList:[
                            {
                                id: 2,
                                name: '二级权限a',
                                level: 2,
                                //选中1个：false，全部选中：true，全未选：false
                                check: false,
                                //选中1个：true，全部选中：true，全未选：false
                                indeterminate: false,
                                checkArr:[],
                                sonPermissionList:[
                                    {
                                        id: 7,
                                        name: '三级权限a',
                                        level: 3,
                                    },
                                    {
                                        id: 8,
                                        name: '三级权限b',
                                        level: 3,
                                    }
                                ]
                            },
                            {
                                id: 3,
                                name: '二级权限b',
                                level: 2,
                                //选中1个：false，全部选中：true，全未选：false
                                check: false,
                                //选中1个：true，全部选中：true，全未选：false
                                indeterminate: false,
                                checkArr:[],
                                sonPermissionList:[
                                    {
                                        id: 9,
                                        name: '三级权限c',
                                        level: 3,
                                    },
                                    {
                                        id: 10,
                                        name: '三级权限d',
                                        level: 3,
                                    }
                                ]
                            }
                        ]},{
                        id: 4,
                        name: '一级权限b',
                        level: 1,
                        check: false,
                        checkArr:[],
                        indeterminate: false,
                        sonPermissionList:[
                            {
                                id: 5,
                                name: '二级权限c',
                                level: 2,
                                check: false,
                                checkArr:[],
                                indeterminate: false,
                                sonPermissionList:[
                                    {
                                        id: 11,
                                        name: '三级权限e',
                                        level: 3
                                    },
                                    {
                                        id: 12,
                                        name: '三级权限f',
                                        level: 3
                                    }
                                ]
                            },
                            {
                                id: 6,
                                name: '二级权限d',
                                level: 2,
                                check: false,
                                checkArr:[],
                                indeterminate: false,
                                sonPermissionList:[
                                    {
                                        id: 13,
                                        name: '三级权限g',
                                        level: 3
                                    },
                                    {
                                        id: 14,
                                        name: '三级权限h',
                                        level: 3
                                    }
                                ]
                            }
                        ]},
                ]

            }
        },
        mounted: function () {

        },
        methods: {
            //一级权限-点击事件
            handleItemCheckAll (item) {
                // let item = this.permissionList[index];
                if (item.indeterminate) {
                    item.check = false;
                } else {
                    item.check = !item.check;
                }
                item.indeterminate = false;
                //二级权限全选
                if (item.check) {
                    //全选
                    item.sonPermissionList.forEach(function (itemSon) {
                        itemSon.check = true;
                        item.checkArr.push(itemSon.id);
                        //三级权限全选
                        let itemGrandsonList = itemSon.sonPermissionList;
                        itemGrandsonList.forEach(function (grandson) {
                            itemSon.checkArr.push(grandson.id);
                        })
                    });
                } else {
                    //取消全部选择
                    item.checkArr = [];
                    item.sonPermissionList.forEach(function (itemSon) {
                        itemSon.check = false;
                        itemSon.checkArr = [];
                    });
                }
            },
            //二级权限-点击事件
            handleItemSonCheckAll(itemSon, item) {
                /*let item = this.permissionList[index];
                let itemSon = this.permissionList[index].sonPermissionList[itemSonIndex];*/
                if (itemSon.indeterminate) {
                    itemSon.check = false;
                } else {
                    itemSon.check = !itemSon.check;
                }
                itemSon.indeterminate = false;
                //三级权限全选
                let sonPermission = itemSon.sonPermissionList;
                if (itemSon.check) {
                    //全选
                    sonPermission.forEach(function (sonItem) {
                        if (itemSon.checkArr.indexOf(sonItem.id) < 0) {
                            itemSon.checkArr.push(sonItem.id);
                        }
                    });
                    if (item.checkArr.indexOf(itemSon.id) < 0) {
                        item.checkArr.push(itemSon.id);
                    }
                } else {
                    //取消三级全部选择
                    itemSon.checkArr = [];
                    //从二级选中数组中移除当前二级权限
                    let curItemSonIndex = item.checkArr.indexOf(itemSon.id);
                    item.checkArr.splice(curItemSonIndex, curItemSonIndex + 1);
                }
                //处理一级权限勾选图标
                let sonPermissionCount = this.permissionList.length;
                if (item.checkArr.length === sonPermissionCount) {
                    item.indeterminate = false;
                    item.check = true;
                } else if (item.checkArr.length > 0) {
                    item.indeterminate = true;
                    item.check = false;
                } else {
                    item.indeterminate = false;
                    item.check = false;
                }

                console.log("click");
                console.log(item);
            },
            //三级权限-点击事件
            handleGrandSonCheckChange (itemSon, item) {
                /*let item = this.permissionList[index];
                let itemSon = this.permissionList[index].sonPermissionList[itemSonIndex];*/
                let sonPermissionCount = itemSon.sonPermissionList.length;
                if (itemSon.checkArr.length === sonPermissionCount) {
                    itemSon.indeterminate = false;
                    itemSon.check = true;
                    item.checkArr.push(itemSon.id);
                } else if (itemSon.checkArr.length > 0) {
                    itemSon.indeterminate = true;
                    itemSon.check = false;
                } else {
                    itemSon.indeterminate = false;
                    itemSon.check = false;
                    //从二级选中数组中移除当前二级权限
                    let curItemSonIndex = item.checkArr.indexOf(itemSon.id);
                    item.checkArr.splice(curItemSonIndex, curItemSonIndex + 1);
                }
                let parentPermissionCount = item.sonPermissionList.length;
                if (item.checkArr.length === parentPermissionCount) {
                    item.indeterminate = false;
                    item.check = true;
                } else if (item.checkArr.length > 0) {
                    item.indeterminate = true;
                    item.check = false;
                } else {
                    item.indeterminate = false;
                    item.check = false;
                }
            },
            //点击角色数字跳转到账号管理页面
            goToAccManagerPage: function () {

            },
            //选中角色
            selectRole: function (id) {
                let curId = id;
                let that = this;
                that.roleList.forEach(function (item) {
                    if (item.id === curId) {
                        item.imgUrl = roleSelectedImg;
                        item.selectFlag = "selected";
                    } else {
                        item.imgUrl = roleUnSelectImg;
                        item.selectFlag = "unSelect";
                    }
                });

            },
            //取消选中
            cancelEdit: function () {

            },
            //保存
            savePermission: function () {

            }
        }

    }
</script>

<style scoped>

</style>

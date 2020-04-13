<template>
    <div>
        <Menu mode="horizontal" active-name="1">
            <MenuItem name="1" to="/shop/increase/manager/store">
                <Icon type="ios-paper" />
                门店号管理
            </MenuItem>
            <MenuItem name="2" to="/shop/increase/manager/staff">
                <Icon type="ios-people" />
                推广人员管理
            </MenuItem>
        </Menu>
        <div>
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ShopIncrease"
    }
</script>

<style scoped>

</style>

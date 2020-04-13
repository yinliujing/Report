<template>
    <div>
        <Menu mode="horizontal" active-name="1">
            <MenuItem name="1" to="/shop/increase/data/region">
                <Icon type="ios-paper" />
                区域
            </MenuItem>
            <MenuItem name="2" to="/shop/increase/data/store">
                <Icon type="ios-people" />
                门店
            </MenuItem>
            <MenuItem name="4" to="/shop/increase/data/staff">
                <Icon type="ios-construct" />
                导购
            </MenuItem>
        </Menu>
        <div>
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "IncreaseData"
    }
</script>

<style scoped>

</style>

<template>
    <div id="app" style="margin-top: 20px;">
        <p>{{data}}</p>
        <p>
            {{data2}}
        </p>
        <img :src="data2.qr_code"/>
        <p>
            {{data3}}
        </p>
        <img :src="data3.qr_code"/>

    </div>
</template>

<script>
    import http from '../services/wechat/WechatService';
    export default {
        name: "ExternalContact",
        data: function () {
            return {
                list: [],
                data: {},
                data2: {},
                url: "",
                data3: {},

            }
        },
        created() {
            let that = this;
            let request = {'userid': 'JiangDeXiang'};
            http.getExternalContactList(request, function (res) {
                let data = res.data;
                if(data.errcode == 0){
                    that.data = data;
                    let arr = data.external_userid;
                    console.log(arr);

                }
            });

            // let request2 = {'configId': '048617dd72b4c7e0e887fee8becd755e'};
            let request2 = {'configId': 'a968b279f9029efa25e0e60b585546da'};
            http.getExternalContactWay(request2, function (res) {
                let data = res.data;
                if(data.errcode == 0){
                    that.data2 = data.contact_way;
                    console.log(data);

                }
            });

            http.getExternalContactWay({'configId': '048617dd72b4c7e0e887fee8becd755e'}, function (res) {
                let data = res.data;
                if(data.errcode == 0){
                    that.data3 = data.contact_way;
                    console.log(data);

                }
            });


            // http.postExternalcontactAddContactWay({}, function (res) {
            //     let data = res.data;
            //     console.log(data);
            // });


        }
    }
</script>

<style scoped>



</style>

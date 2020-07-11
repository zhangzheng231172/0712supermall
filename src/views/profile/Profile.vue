<template>
  <div>
    <nav-bar class="profile-nav"><div slot="center">小码哥商城</div></nav-bar>
    <person-nav-bar></person-nav-bar>
    <person-information></person-information>

    <common><img slot="left"    src=""  alt=""><span  slot="mid">我的消息</span></common>
    <common><img slot="left"    src=""  alt=""><span  slot="mid">我的消息</span></common>











  </div>
</template>

<script>
   import PersonNavBar from "./childComps/PersonNavBar";
   import PersonInformation from "./childComps/PersonInformation";
   import Common from "../../components/common/profile/common";
    export default {
        name: "Profile",
         components: {
           Common,
           PersonInformation,
           PersonNavBar,
         }
    }
</script>

<style scoped>
  .profile-nav {
    background-color: #cd2370;
    color: white;

    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    z-index: 9;
  }
</style>

<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
<!--        SVG的代码可以直接嵌入到HTML页面中，或您可以直接链接到SVG文件。-->
        <svg class="privateImage-svg left">
<!--          use元素在SVG文档内取得目标节点，并在别的地方复制它们-->
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
        </svg>
      </slot>

      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <span>
            <svg data-v-735ff1be="" fill="#fff" class="icon-mobile">
              <use data-v-735ff1be="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
            </svg>
          </span>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>

      <svg data-v-735ff1be="" fill="#fff" class="arrow-svg right">
        <use data-v-735ff1be="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
      </svg>
    </a>
  </div>
</template>

<script>
	export default {
		name: "UserInfo"
	}
</script>

<style scoped>
  #user-info {
    padding: 15px;
    margin-top: -5px;
    background-color: var(--color-tint);
  }

  #user-info .privateImage-svg {
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-color: #fff;
  }

  .left {
    float: left;
  }

  #user-info .arrow-svg {
    left: -15px;
    top: 0px;
    width: 11px;
    height: 22px;
    margin-top: 18px;
  }

  #user-info .login-info {
    margin: 10px 0 0 10px;
    color: #fff;
  }

  #user-info .login-info .phone {
    position: relative;

    margin-top: 5px;
    margin-left: 15px;
    font-size: 13px;
    font-weight: 300;
  }

  #user-info .login-info .phone .icon-mobile {
    position: absolute;
    left: -15px;
    top: 0px;
    width: 12px;
    height: 18px;
  }
</style>

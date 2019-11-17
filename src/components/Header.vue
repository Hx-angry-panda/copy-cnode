<template>
  <div class="header">
      <a href="/"><img src="../assets/cnodejs_light.svg" alt="logo"></a>
      <ul class="nav">
          <a href=""><li>首页</li></a>
          <a href=""><li>新手入门</li></a>
          <a href=""><li>API</li></a>
          <a href=""><li>关于</li></a>
          <a href=""><li>注册</li></a>
          <a href=""><li>登录</li></a>
      </ul>
  </div>
</template>

<script>
export default {
    name: "Header",
}
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
    }
    .header{
        width: 100%;
        background: #333;
        display: flex;
        justify-content: space-between;
        padding: 5px 3%;
        flex-wrap: wrap;
    }
    img{
        width: 120px;
        height: 28px;
        margin-left: 5px;
        margin-top: 3px;
    }
    .nav{
        display: flex;
        color: #ccc;
        align-items: center;
        font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif!important;
        font-size: 13px;
        margin-right: 5px;
    }
    .nav a{
        text-decoration: none;
        color: #ccc;
    }
    .nav a:hover{
        text-decoration: none;
        color: #fff;
    }
    li{
        padding: 10px 15px;
    }
    @media (max-width: 979px) {
	li {
        padding: 10px 14px;
	}
}
</style>

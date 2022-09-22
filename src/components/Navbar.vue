<template>
  <header class="navbar d-flex align-items-center">
    <input type="checkbox" class="navbar_toggle m-0" id="navbar-toggle" />
    <div class="navbar_logo mx-auto"><a class="nav-link d-block"></a></div>
    <div class="navbar_container w-100 d-flex mx-auto text-center align-items-center container px-1">
      <div class="d-flex navbar_wrap align-items-end">
        <div class="navbar_item"><a href="/" class="nav-link">男款</a></div>
        <div class="navbar_item"><a href="/" class="nav-link">女款</a></div>
        <div class="navbar_item"><a href="/" class="nav-link">最新消息</a></div>
        <div class="navbar_item"><a href="/" class="nav-link">客製商品</a></div>
        <div class="navbar_item"><a href="/" class="nav-link">聯絡我們</a></div>
      </div>
      <div class="d-flex navbar_item justify-content-center align-items-center">
        <div class="navbar_item_icon search"><a class="navbar_item_link"></a></div>
        <div class="navbar_item_icon cart"><a class="navbar_item_link"></a></div>
        <div class="navbar_item_icon mode">
          <label for="dark-mode-toggle"><a class="navbar_item_link"></a></label>
          <input type="checkbox" id="dark-mode-toggle" @click="[changeTheme(),updateTheme()]">
        </div>
      </div>
    </div>
  </header>
</template>
<script>

export default{
  data (){
    return{
      currentTheme: "default"
    }
  },
  props: {
    theme:{
      type: String,
      required: true
    }
  },
  methods: {
    changeTheme (){
      return this.currentTheme === "default" ? this.currentTheme = "dark" : this.currentTheme = "default" 
    },
    updateTheme (){
      this.$emit('update-theme',this.currentTheme)
    }
  },
  created (){
    return this.currentTheme = this.theme
  }
}
</script>

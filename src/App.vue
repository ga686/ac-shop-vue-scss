<template>
  <div id="app">
    <Navbar :theme="theme" @update-theme="getCurrentTheme"/> 
    <main>
      <router-view />
    </main>
    <shopFooter />
  </div>
</template>

<style lang="scss">
@import './assets/scss/main.scss';
</style>

<script>
import Navbar from './components/Navbar'
import shopFooter from './components/shopFooter'

const getCurrentTheme = localStorage.getItem('theme')

export default {
  name: 'App',
  data() {
    return {
      theme: 'default'
    }
  },
  components: {
    Navbar,
    shopFooter
  },
  methods: {
    getCurrentTheme (theme){
      return this.theme = theme
    }
  },
  watch:{
    theme: function(){
      if(this.theme === "dark"){
        localStorage.setItem('theme','dark')
        document.documentElement.setAttribute('data-theme', 'dark')
      }else{
        localStorage.setItem('theme','default')
        document.documentElement.setAttribute('data-theme', 'default')
      }
    }
  },
  created (){
    return this.theme = getCurrentTheme || 'default'
  }
}
</script>


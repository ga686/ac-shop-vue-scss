<template>
  <div class="user-info-modal" :class="{fade:closeInfo}"  @click="closePopUp">
    <div class="modal-dialog">
      {{userInfo}}
    </div>
  </div>
</template>
<script>
export default{
  data (){
    return {
      closeInfo: true
    }
  },
  props: {
    userInfo: {
      type: Object,
      required: true
    },
    showInfo: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    closePopUp (e){
      if(e.target.matches('.user-info-modal')){
        this.returnCloseInfo()
      }
    },
    returnCloseInfo (){
      this.closeInfo = true
      this.$emit('return-close-info',this.closeInfo)
    }
  },
  watch: {
    showInfo: function (){
      return this.closeInfo = !this.showInfo
    }
  }
}
</script>

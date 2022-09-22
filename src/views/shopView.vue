<template>
    <main>
    <div class="main-container px-3">
      <div class="container">
        <h1>結帳</h1>
      </div>
      <div class="main-container_wrap container">
        <div class="main-container_left my-5">
          <shopStatus :current-status="currentStatus"/>
          <div class="main-container_left_form">
            <form>          
              <shopFormInfo :current-status="currentStatus"/>  
              <shopFormDelivery :current-status="currentStatus" @return-delivery-fee="getReturnDelivery"/>  
              <shopFormPayment :current-status="currentStatus"/>     
            </form>
          </div>
        </div>
        <div class="main-container_right">
          <shopCart :delivery-fee="deliveryFee"/>
        </div>
        <div class="main-container_btn-group mb-5">
          <hr class="my-5">
          <div class="d-flex justify-content-space-between">
            <button class="btn btn--prev text-center" @click.stop.prevent = "btnPrev" :class="{'disabled': currentStatus === 0}"><p class="m-0">上一步</p></button>
            <button class="btn btn--next ml-auto text-center" @click.stop.prevent = "btnNext" :class="{'submit': submitBtnStatus === '確認下單'}"><p class="m-0">{{submitBtnStatus}}</p></button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import shopCart from '../components/shopCart'
import shopStatus from '../components/shopStatus'
import shopFormInfo from '../components/shopFormInfo'
import shopFormDelivery from '../components/shopFormDelivery'
import shopFormPayment from '../components/shopFormPayment'

export default{
  name: 'shop',
  data () {
    return {
      currentStatus: 0,
      deliveryFee: 0,
      submitBtnStatus: "下一步"
    }
  },
  components: {
    shopCart,
    shopStatus,
    shopFormInfo,
    shopFormDelivery,
    shopFormPayment
  },
  methods: {
    btnNext () {
      if (this.currentStatus < 2){
        return this.currentStatus = this.currentStatus + 1
      }
      return this.currentStatus = 2
    },
    btnPrev () {
      if (this.currentStatus > 0){
        return this.currentStatus = this.currentStatus - 1
      }else{
        return this.currentStatus = 0
      }
    },
    getReturnDelivery (fee){
      return this.deliveryFee = fee
    },
    getCurrentFormId(){
      return this.currentFormId = this.currentStatus
    },
    readyToSubmit(){
      if(this.currentStatus === 2){
        return this.submitBtnStatus = "確認下單" 
      }
      return this.submitBtnStatus = "下一步"
    }
  },
  watch: {
    currentStatus: {
      handler: function(){
        this.getCurrentFormId()
        this.readyToSubmit()
      }
    }
  },
}
</script>

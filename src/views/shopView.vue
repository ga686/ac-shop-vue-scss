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
            <form method="post" id="cart-info">          
              <shopFormInfo :current-status="currentStatus" @return-user-info="getReturnUserInfo"/>  
              <shopFormDelivery :current-status="currentStatus" @return-delivery-fee="getReturnDelivery"/>  
              <shopFormPayment :current-status="currentStatus" @return-user-card="getReturnUserCard"/>     
            </form>
          </div>
        </div>
        <div class="main-container_right">
          <shopCart :delivery-fee="deliveryFee" @return-total="getReturnTotal" />
        </div>
        <div class="main-container_btn-group mb-5">
          <hr class="my-5">
          <div class="d-flex justify-content-space-between">
            <button class="btn btn--prev text-center" @click = "btnPrev" :class="{'disabled': currentStatus === 0}">
              <router-link :to="{name: 'shop', params: {id: currentStatus}}"><p class="m-0">上一步</p></router-link>
            </button>
            <button class="btn btn--next ml-auto text-center" @click = "btnNext" :class="{'submit': submitBtnStatus === '確認下單'}">
              <router-link :to="{name: 'shop', params: {id: currentStatus}}"><p class="m-0" @click="formSubmit">{{submitBtnStatus}}</p></router-link>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="alert" v-if="showAlert" >{{msg}}</div>
    <div class="user-info-modal" :class="{fade: !showPopup}"  @click="closePopUp">
      <div class="modal-dialog">
        <p>title: {{submitInfo.title}}</p>
        <p>fullname: {{submitInfo.fullname}}</p>
        <p>phone: {{submitInfo.phone}}</p>
        <p>email: {{submitInfo.email}}</p>
        <p>city: {{submitInfo.city}}</p>
        <p>address: {{submitInfo.address}}</p>
        <p>delivery fee: {{deliveryFee}}</p>
        <p>holder: {{submitInfo.holder}}</p>
        <p>card number: {{submitInfo.cardNum}}</p>
        <p>expiration: {{submitInfo.expiration}}</p>
        <p>cvc: {{submitInfo.cvc}}</p>
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
      submitBtnStatus: "下一步",
      userInfo: [],
      userCard: [],
      submitInfo: [],
      showAlert: false,
      showPopup: false,
      msg: "",
      total: 0
    }
  },
  components: {
    shopCart,
    shopStatus,
    shopFormInfo,
    shopFormDelivery,
    shopFormPayment,
  },
  methods: {
    btnNext () {
      if (this.currentStatus < 2){
        return this.currentStatus = this.currentStatus + 1
      }
      return this.currentStatus = 2
    },
    btnPrev () {
      console.log(this.currentStatus)
      if (this.currentStatus > 0){
        return this.currentStatus = this.currentStatus - 1
      }else{
        return this.currentStatus = 0
      }
    },
    getReturnDelivery (fee){
      return this.deliveryFee = fee
    },
    getReturnUserInfo (info){
      localStorage.setItem("userInfo",JSON.stringify(info))
      return this.userInfo = info
    },
    getReturnUserCard (card){
      localStorage.setItem("userCard",JSON.stringify(card))
      return this.userCard = card
    },
    getReturnTotal (total){
      localStorage.setItem("total",total)
      return this.total = total
    },
    getCurrentFormId(){
      return this.currentFormId = this.currentStatus
    },
    readyToSubmit(){
      if(this.currentStatus === 2){
        return this.submitBtnStatus = "確認下單" 
      }
      return this.submitBtnStatus = "下一步"
    },
    intergrateInfo (){ 
      this.submitInfo = {
        ...this.userInfo,
        ...this.userCard,
        ...this.deliveryFee,
        ...this.total
      }
      return this.submitInfo
    },
    formSubmit (e){
      if(e.target.innerHTML === "確認下單" &&  Object.keys(this.userInfo).length !== 0 && Object.keys(this.userCard).length !== 0){
        this.showPopup = true
      }else if(e.target.innerHTML === "確認下單"){
        this.msg = "尚有欄位未填寫"
        this.showAlertMsg()
      }
    },
    showAlertMsg (){
      this.showAlert = true
      const msgCounter = setTimeout(()=>{
        clearTimeout(msgCounter)
        return this.showAlert = false
      },2500)
    },
    closePopUp (e){
      if(e.target.matches('.user-info-modal')){
        this.showPopup = false
      }
    },
  },
  watch: {
    currentStatus: {
      handler: function(){
        this.getCurrentFormId()
        this.readyToSubmit()
        localStorage.setItem('currentStatus',this.currentStatus)
        this.$route.params.id = this.currentStatus
      }
    },
    userInfo: {
      handler: function(){
        this.intergrateInfo()
      },
      deep: true
    },
    userCard: {
      handler: function(){
        this.intergrateInfo()
      },
      deep: true
    },
    '$route.params.id': function (){
      if(this.$route.params.id >= 0 && this.$route.params.id < 3){
        localStorage.setItem('currentStatus',this.$route.params.id)
        return this.currentStatus = parseInt(this.$route.params.id)
      }
    }
  },
  created (){
    this.intergrateInfo ()
    return this.currentStatus = JSON.parse(localStorage.getItem('currentStatus')) || 0
  }
}
</script>
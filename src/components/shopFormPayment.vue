<template>
  <section v-if="getCurrentForm">
    <h3 class="main-container_left_form_title">付款資訊</h3>
    <div class="main-container_left_form_group">
      <div class="main-container_left_form_group_item">
        <label for="holder">持卡人姓名</label>
        <input type="text" id="holder" name="card-holder" placeholder="John Doe" v-model="userCard.holder" required>
      </div>
    </div>
    <div class="main-container_left_form_group">
      <div class="main-container_left_form_group_item">
        <label for="num">卡號</label>
        <input type="text" id="num" name="card-number" placeholder="1111 2222 3333 4444" v-model="userCard.cardNum" required>
      </div>
    </div>
    <div class="main-container_left_form_group--cardnum">
      <div class="main-container_left_form_group_item">
        <label for="expiration">有效期限</label>
        <input type="date" id="expiration" placeholder="MM/YY" v-model="userCard.expiration" required>
      </div>
      <div class="main-container_left_form_group_item">
        <label for="cvc">CVC/CCV</label>
        <input type="number" id="cvc" placeholder="123" v-model="userCard.cvc" required>
      </div>
    </div>
  </section>    
</template>
<script>

export default{
  data () {
    return {
      formId: 2,
      userCard: { holder: "", cardNum: "", expiration: "",cvc: ""}
    }
  },
  props: {
    currentStatus: {
      type: Number,
      required: true
    }
  },
  methods: {
    fetchData (){
      if(JSON.parse(localStorage.getItem('userCard')) === null){
        return 
      }
      return this.userCard = JSON.parse(localStorage.getItem('userCard'))
    },
  },
  watch: {
    userCard:{
      handler: function(){
        this.$emit('return-user-card', this.userCard)
      },
      deep: true
    }
  },
  computed:{
    getCurrentForm (){
      if(this.formId === this.currentStatus){
        return true
      }
      return false
    }
  },
  created (){
    return this.fetchData()
  }
}
</script>
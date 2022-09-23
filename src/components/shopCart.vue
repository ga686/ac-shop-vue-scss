<template>
  <div class="main-container_right_box">
    <h3 class="font-bold size-18 mb-6">購物籃</h3>
    <div class="main-container_right_box_wrap">
      <div class="main-container_right_box_item d-flex" v-for="product in products" :key="product.id">
        <div class="main-container_right_box_item_img">
          <img :src="product.image" alt="">
        </div>
        <div class="main-container_right_box_item_index text-right">
          <p class="mb-3">{{product.name}}</p>
          <div class="qty mb-3 d-flex justify-content-end  align-items-center">
            <div class="qty_minus" @click="minusQtyBtn(product.id)"></div>
            <div class="qty_num text-center">{{product.qty}}</div>
            <div class="qty_plus" @click="addQtyBtn(product.id)"></div>
          </div>
          <div class="price font-bold">${{product.price | addComma}}</div>
        </div>
      </div>
    </div>
    <div class="main-container_right_box_delivery d-flex justify-content-between">
      <div>運費</div>
      <div class="font-bold delivery-fee">{{deliveryFee | deliveryWayName}}</div>
    </div>
    <div class="main-container_right_box_total d-flex justify-content-between">
      <div>小計</div>
      <div class="cart-total-num font-bold">${{total | addComma}}</div>
    </div>
  </div>
</template>
<script>

const dummyData = {
  "products":[
    {"name":"破壞補丁修身牛仔褲","image":"https://drive.google.com/uc?export=view&id=1Zagx-DqfjEbRL7Wxdz62bzdNxPGpGJd5","price":3999,"qty":1,"id":1},
    {"name":"刷色直筒牛仔褲","image":"https://drive.google.com/uc?export=view&id=1wayAz_6XP7dFe1fkfLtyogoa-BtZGlox","price":1299,"qty":1,"id":2}
  ]
}

export default{
  data (){
    return {
      products: dummyData.products,
      total: 0,
    }
  },
  props: {
    deliveryFee:{
      type: Number,
      required: true
    }
  }, 
  methods:{
    fetchData(){
      if(JSON.parse(localStorage.getItem('products')) === 0){
        return
      }
      return this.products = JSON.parse(localStorage.getItem('products'))
    },
    addQtyBtn (id){
      this.products.filter((product) => {
        if(product.id ===id){
          return product.qty = product.qty + 1
        }
      })
    },
    minusQtyBtn (id){
      this.products.filter((product) => {
        if(product.id ===id && product.qty > 0 ){
          return product.qty = product.qty - 1
        }
      })
    },
    addUp (){
      this.total = 0
      let val = ''
      for(const product of this.products){
        val = product.qty*product.price + Number(val)
      }
      return this.total = this.deliveryFee + Number(val)
    }
  },
  watch:{
    products: {
      handler(){
        this.addUp()
        localStorage.setItem('products',JSON.stringify(this.products))
      },
      deep:true
    },
    deliveryFee: function () {
      this.addUp()
    },
    total: function (){
      this.$emit('return-total', this.total)
    }
  },
  filters:{
    addComma (price){
      return price.toString().replace(/\B(?=(?:\d{3})+\b)/g, ',')
    },
    deliveryWayName (delivery){
      if(delivery === 0){
        return delivery = "免費"
      }
      return delivery = "$500"
    }
  },
  created (){
    this.fetchData()
  }
}
</script>

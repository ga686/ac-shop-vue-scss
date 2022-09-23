<template>
  <section v-if="getCurrentForm">
    <h3 class="main-container_left_form_title">運送方式</h3>
    <div class="main-container_left_form_address d-flex align-items-center" v-for="delivery in deliveryWays" :key="delivery.id" :class="{selected: delivery.ischecked}">
    <label class="address-label" :for="delivery.id" @click="getSelected(delivery.id),getCurrentDeliveryFee(delivery.id)"></label>
    <input :id="delivery.id" type="radio" :name="delivery.name" :value="delivery.price"  :checked="delivery.ischecked">
      <div class="flex-1">
        <div class="d-flex justify-content-between">
          <p>{{delivery.title}}</p>
          <p>{{delivery.price}}</p>
        </div>
        <p class="size-12">{{delivery.desc}}</p>
      </div>
    </div>
  </section>  
</template>
<script>
const data = {
  "deliveryWays":[
    {"title": '標準運送',"fee": 0, "desc": '約3~7個工作天',"id": "standard","ischecked": true,"name":"delivery"},
    {"title": 'DHL貨運',"fee": 500, "desc": '48小時內送達',"id": "dhl", "ischecked": false,"name":"delivery"}
  ]
}

export default{
  data () {
    return {
      formId: 1,
      showForm: false,
      deliveryWays: data.deliveryWays,
      currentDeliveryFee: 0
    }
  },
  props: {
    currentStatus: {
      type: Number,
      required: true
    }
  },
  methods:{
    getSelected (id){
      this.deliveryWays.filter((delivery) => {
        delivery.id === id ? delivery.ischecked = true : delivery.ischecked = false   
      })
    },
    getCurrentDeliveryFee (id){
      this.deliveryWays.filter((delivery) => {
        if(delivery.id === id){
          return this.currentDeliveryFee = delivery.fee
        }
      })
    },
  },
  watch: {
    currentDeliveryFee: function (){
      this.$emit('return-delivery-fee', this.currentDeliveryFee);
    },
    deliveryWays: {
      handler() {
        localStorage.setItem('deliveryWays', JSON.stringify(this.deliveryWays))
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
    return this.deliveryWays = JSON.parse(localStorage.getItem('deliveryWays'))
  }
}
</script>
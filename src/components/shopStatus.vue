<template>
  <div id="step-control" class="stepper-panel mx-auto">
    <div class="stepper-container d-flex justify-content-between">
      <div class="stepper-container_step" v-for="step in steppers" :key="step.id" :class="{'active':getCurrent(step.id), 'checked': getChecked(step.id)}">
        <div class="stepper-container_step_circle circle-container text-center mr-auto">{{step.id + 1}}</div>
        <div class="stepper-container_step_label">{{step.label}}</div>
      </div>
    </div>
  </div>
</template>

<script>
const datas = {
  "steppers":[
    {"id": 0, "label": "寄送地址"},
    {"id": 1, "label": "運送方式"},
    {"id": 2, "label": "付款資訊"},
  ]
}

export default{
  data () {
    return {
      steppers:[]
    }
  },
  props: {
    currentStatus: {
      type: Number,
      required: true
    }
  },
  methods: {
    getStatus (){
      return this.steppers = datas.steppers
    },
    getCurrent (id){
      return id === this.currentStatus
    },
    getChecked(id){
      return id < this.currentStatus
    }
  },
  created() {
    this.getStatus()
  }
}
</script>

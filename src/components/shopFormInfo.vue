<template>
  <section v-if="getCurrentForm">
    <h3 class="main-container_left_form_title">寄送地址</h3>
    <div class="main-container_left_form_group--name">
      <div class="main-container_left_form_group_item">
        <label for="title">稱謂</label>
        <div class="main-container_left_form_group_select">
        <select class="w-100" id="title" required>
            <option value="" disabled selected>請選擇稱謂</option>
            <option>先生</option>
          </select>
        </div>
      </div>
      <div class="main-container_left_form_group_item">
        <label for="name">姓名</label>
        <input type="text" id="name" placeholder="請輸入姓名" required>
      </div>
    </div>
    <div class="main-container_left_form_group--phone">
      <div class="main-container_left_form_group_item">
        <label for="phone">電話</label>
        <input type="tel" id="phone" placeholder="請輸入行動電話" required>
      </div>
      <div class="main-container_left_form_group_item">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="請輸入電子郵件" required>
      </div>
    </div>
    <div class="main-container_left_form_group--address">
      <div class="main-container_left_form_group_item">
        <label for="county">縣市</label>
        <div class="main-container_left_form_group_select">
          <select class="w-100" name="county" id="county" required>
            <option value="" disabled selected>請選擇縣市</option>
            <option>台北</option>
          </select>
        </div>
      </div>
      <div class="main-container_left_form_group_item">
        <label for="address">地址</label>
        <input type="text" id="address" placeholder="請輸入地址" required>
      </div>
    </div>
  </section>
</template>
<script>
export default{
  data () {
    return {
      formId: 0,
      showForm: false
    }
  },
  props: {
    currentStatus: {
      type: Number,
      required: true
    }
  },
  computed:{
    getCurrentForm (){
      if(this.formId === this.currentStatus){
        return true
      }
      return false
    }
  }
}
</script>
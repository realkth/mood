<template>
  <div class="toast-message col" id="toast">
    <p class="message">{{ isToastMessage }}</p>
  </div>
</template>
 
<script>
import { state, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isToastMessage'])
  },
  methods: {
    ...mapMutations(['m_setToastMessage'])
  },
  watch: {
    isToastMessage(isToastMessage) {
      var toast = document.getElementById("toast");
      toast.classList.add('show')
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~style";

.message {
  color: $color-white;
  font-size: 1.1rem;
  display: inline-block;
  padding: 23px 20px;
  background: $color-black;
  border-radius: 5px;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.1);
}
#toast {
  display: none;
  // visibility: hidden;
  // visibility: visible;
  text-align: center;
  height: 70px;
  opacity: 0.7;
}
#toast.show {
  // visibility: visible;
  display: block;
  -webkit-animation: fadeout 3s;
  animation: fadeout 3s;
}
@-webkit-keyframes fadeout {
    from {opacity: 1;} 
    to {opacity: 0;}
}
@keyframes fadeout {
    from {opacity: 1;}
    to {opacity: 0;}
}


</style>



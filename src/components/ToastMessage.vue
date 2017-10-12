<template>
  <transition name="fade-out">
    <div class="toast-message col" id="toast" v-if="isToastMessage">
      <p class="message">{{ isToastMessage }}</p>
    </div>
  </transition>
</template>
 
<script>
import { state, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isToastMessage'])
  },
  methods: {
    ...mapMutations(['m_setToastMessage']),
    ...mapActions(['a_setToastMessage'])
  },
  watch: {
    isToastMessage(isToastMessage) {
      if (isToastMessage) {
        setTimeout(() => {
          this.m_setToastMessage(null);
        }, 2000);
      }
    }
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
  position: absolute;
  z-index: 100;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  opacity: 0.7;
}

#toast.show {
  display: block;
  -webkit-animation: fadeout 3s;
  animation: fadeout 3s;
}

@-webkit-keyframes fadeout {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.fade-out-enter-active,
.fade-out-leave-active {
  transition: opacity 0.3s;
}

.fade-out-enter,
.fade-out-leave-to {
  opacity: 0;
}
</style>



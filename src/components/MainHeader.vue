<template>
  <header class="header">
    <div class="grid">
      <div class="col">
        <div class="logo col col-m-2 col-m-offset-1 col-d-4 col-d-offset-4">
          <img src="../assets/l-mood.svg" height="40px">
        </div>
        <a href="#" class="mysetting col col-m-1 col-d-offset-3 col-d-1">
          <img class="profile" src="../assets/l-mood.svg" height="40px">
          <article class="dropdown">
              <div class="dropdownmenu">
                <ul>
                  <li>
                    내 정보
                  </li>
                  <li>
                    로그아웃
                  </li>
                </ul>
              </div>
            </article>
        </a>
      </div>
    </div>
    </div>
  </header>
</template>

<script>
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
export default {
  data() {
    return {

    }
  },
  methods: {
    openMenu: function() {
      document.getElementById("myDropdown").classList.toggle("show");
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~style";
.header {
  background: $color-white;
  width: 100%;
  height: 50px;
  display: inline-block;
}

.logo {
  text-align: center; // display: inline-block;
}

img {
  padding: 5px 0 5px 0;
}

.mysetting {
  text-align: right; // display: inline-block;
}

.profile {
  border-radius: 50%;
  width: 50px;
}

</style>

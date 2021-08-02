<template>
  <div id="app">
    <nav class="navbar  navbar-dark bg-dark fixed-top">
      <div class="container">
        <router-link class="navbar-brand" to="/">VUE FORM</router-link>

        <div>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0" style="display: flex; flex-direction: row;">
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'auth'}">Авторизация</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'uikit'}">UIkit</router-link>
            </li>
            <!--
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li>
            -->
          </ul>
        </div>

      </div>
    </nav>


    <div class="main-content">
      <router-view />
    </div>


    <footer class="footer bg-dark">
      <div class="container p-3" >2021</div>
    </footer>

  </div>
</template>

<script>

export default {
  components: {},
};
</script>

<style lang="scss">
html, body, #app {
  height: 100%;
  width: 100%;
}
pre {
  background: #f2f2f2;
  padding: 25px;
  margin-top: 50px;
  border-radius: 10px;
}
</style>
<style scoped lang="scss">
.nav-item {
  padding-left: 10px;
}
.main-content {
  min-height: 100%;
  min-height: calc(100% - 80px);
  padding: 100px 0 50px 0;
}
.footer {
  height: 80px;
  width: 100%;
  background: #2C3242;
  color: #D3D3D3;
}
</style>

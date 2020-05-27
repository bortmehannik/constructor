<template>
  <div id="app">
    <div class="container">
      <div class="nav">
        <router-link to="/">Все проекты</router-link>
        <router-link to="/create">Создать новый сайт</router-link>
      </div>
      <router-view/>
    </div>
  </div>
</template>
<style lang="scss">
  * {
    font-family: 'Arial', sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    background: #e9ecef;
  }
  .container {
    width: 1160px;
    margin: 0 auto;
  }
  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;
    p {
      opacity: 0.3;
      font-size: 18px;
    }
    a {
      background: #252525;
      color: #ffffff;
      text-decoration: none;
      padding: 10px 25px;
      &:first-child {
        background: transparent;
        border: 1px solid #252525;
        color: #252525;
        transition: 0.3s;
        &:hover {
          background: #252525;
          color: #ffffff;
        }
      }
    }
  }
  .row {
    display: flex;
    margin-top: 60px;
  }
  .col-4 {
    width: 33.333%;
  }
  .col-8 {
    width: 66.666%;
  }
  .list-group {
    height: 100%;
  }
</style>

<template>
  <div class="row">
    <div class="col-4">
      <h3>Доступные элементы:</h3>
      <draggable
              class="dragArea list-group"
              :list="list1"
              :group="{ name: 'people', pull: 'clone', put: false }"
              @change="log"
              :clone="cloneElement"
      >
        <div
                class="list-group-item left"
                v-for="element in list1"
                :key="element.name"
        >
          <div v-if="element.name === 'header'" class="title">
            <input readonly type="text" placeholder="Заголовок">
          </div>
          <div v-if="element.name === 'textarea'">
            <textarea readonly placeholder="Текстовый блок"></textarea>
          </div>
          <div v-if="element.name === 'image'">
            <div class="file">
              <input type="file">
              <img src="../static/upload.jpg" alt="preview">
            </div>
          </div>
        </div>
      </draggable>
    </div>
    <div class="col-8">
      <draggable
              class="dragArea list-group"
              :list="list2"
              group="people"
              @change="log"
      >
        <div
                class="list-group-item"
                v-for="(element, idx) in list2"
                :key="`${element.name}-${idx}`"
        >
          <div v-if="element.name === 'textarea'">
            <button class="close" @click="removeAt(idx)">x</button>
            <textarea placeholder="Введите текст..."></textarea>
          </div>
          <div v-if="element.name === 'image'">
            <button class="close" @click="removeAt(idx)">x</button>
            <div class="file">
              <input type="file" @change="onFileChange($event, idx)">
              <img :src="element.url || defaultUrl" alt="preview">
            </div>
          </div>
          <div v-if="element.name === 'header'" class="title">
            <button class="close" @click="removeAt(idx)">x</button>
            <input type="text" placeholder="Введите заголовок...">
          </div>
        </div>
      </draggable>
      <div class="row row-button">
        <button @click="saveProject">Сохранить</button>
      </div>
    </div>
    <rawDisplayer class="col-3" :value="list1" title="List 1" />
    <rawDisplayer class="col-3" :value="list2" title="List 2" />
  </div>
</template>

<script>
  import draggable from "vuedraggable";
  let idGlobal = 4
  export default {
    name: "custom-clone",
    display: "Custom Clone",
    order: 3,
    components: {
      draggable
    },
    data() {
      return {
        defaultUrl: require('../static/upload.jpg'),
        list1: [
          { name: 'header', id: 1 },
          { name: 'textarea', id: 2 },
          { name: 'image', id: 3, url: null }
        ],
        list2: []
      }
    },
    methods: {
      log: function(evt) {
        console.log(evt)
      },
      onFileChange: function (event, idx) {
        const file = event.target.files[0]
        this.$set(this.list2[idx], 'url' , URL.createObjectURL(file))

      },
      removeAt(idx) {
        this.list2.splice(idx, 1)
      },
      cloneElement({ name }) {
        return {
          id: idGlobal++,
          name: name
        }
      },
      saveProject() {
        this.$store.dispatch('newProject', this.list2)
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .row {
    &-button {
      margin-top: 0;
      padding: 15px 0;
      justify-content: flex-end;
      button {
        font-size: 20px;
        padding: 10px 35px;
        cursor: pointer;
        border: 2px solid #7983ff;
        background: #ffffff;
        transition: 0.3s;
        &:hover {
          background: #7983ff;
          color: #ffffff;
        }
      }
    }
  }
  .col-4 {
    margin-right: 20px;
    padding-right: 20px;
    border-right: 2px solid rgba(0,0,0,.125);
    h3 {
      background: #252525;
      color: #ffffff;
      padding: .75em;
      border-right: 1px solid rgb(233, 236, 239);
      border-left: 1px solid rgb(233, 236, 239);
      text-align: center;
    }
  }
  .col-8 {
    border: 3px solid #e2e2e2;
    border-radius: 10px;
    background: #ffffff;
  }
  .list-group-item {
    margin-bottom: -3px;
    > div {
      position: relative;
    }
    .close {
      position: absolute;
      font-size: 20px;
      background: transparent;
      border: none;
      right: 25px;
      cursor: pointer;
      opacity: 0;
      z-index: 1;
    }
    &.left {
      border: 1px solid rgba(0,0,0,.125);
      padding: .75rem;
      background: #ffffff;
      margin-bottom: -1px;
      cursor: move;
      input, textarea {
        cursor: move;
        z-index: -1;
      }
    }
    textarea {
      width: 100%;
      resize: none;
      display: block;
      border: none;
      font-size: 20px;
    }
    textarea, input {
      padding: .75rem;
    }
    &:hover {
      .close {
        opacity: 1;
      }
    }
    .title {
      input {
        width: 100%;
        font-size: 30px;
        font-weight: 900;
        border: none;
      }
    }
  }
  .file {
    padding-top: 10px;
    input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
    img {
      width: 100%;
      height: auto;
    }
  }
</style>

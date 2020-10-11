<template>
  <div id="app">
    <h1>Currency Calculator</h1>
    <div>
      <CurrencyConverter />
      <div class="form-buttons">
        <!-- forms open onClick -->
        <button class="form-buttons-add" @click="openModalForm('addcurrency')">Add new currency</button>
        <button class="form-buttons-delete" @click="openModalForm('deletecurrency')">Delete a currency</button>
        <button class="form-buttons-edit" @click="openModalForm('editcurrency')">Edit exchange rate</button>
      </div>
      <!-- pop-up forms -->
      <ModalSlot modalId="addcurrency"><AddCurrency /></ModalSlot>
      <ModalSlot modalId="deletecurrency"><DeleteCurrency /></ModalSlot>
      <ModalSlot modalId="editcurrency"><EditExchangeRate /></ModalSlot>
    </div>
  </div>
</template>

<script>

import CurrencyConverter from './components/CurrencyConverter.vue';
import AddCurrency from './components/AddCurrency';
import DeleteCurrency from './components/DeleteCurrency';
import EditExchangeRate from './components/EditExchangeRate';
import ModalSlot from './components/ModalSlot';


export default {
  name: 'App',
  components: {
    CurrencyConverter,
    AddCurrency,
    DeleteCurrency,
    EditExchangeRate,
    ModalSlot,
  },
  methods: {
    openModalForm(modalId) {
      this.$eventHub.$emit(`open-${modalId}-modal`);
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  margin: 60px;
  font-size: 3rem;
  color:rgb(64, 66, 68);
}
.form-buttons > button {
  margin: 20px;
  margin-top: 60px;
  height: 60px;
  width: 100px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 0;
  padding: 2px;
}

.form-buttons-add {
  color:cornsilk;
  background: rgb(78, 160, 109);
}

.form-buttons-delete {
  color:cornsilk;
  background:  rgb(212, 58, 52);
}

.form-buttons-edit {
  color:cornsilk;
  background: rgb(36, 149, 153);
}
</style>

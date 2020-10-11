import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import to from 'await-to-js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    //initiated on created in CurrencyConverter component with the fetchCurrencies action
    //a get call fetches the list from the database 
    //an array of objects with properties: id, name, exchange rate to euros
    listOfCurrencies: [], 
  },
  mutations: {
    //stores the currency list in the state
    setCurrencies(state, { currencies, rates }) {
      state.listOfCurrencies = currencies.map((c) => {
      let rate = rates.find(r => r.id === c.id).euro_rate
      return {...c,rate};
      });
    },
    //adds in state a new currency
    addCurrency(state, { currency, rate } = {}) {
      state.listOfCurrencies.push({...currency, rate});
    },
    //changes the exchange rate of an existing currency in state
    updateCurrency(state, { id, rate } = {}) {
      console.log(id,rate)
      const currencyToEdit = state.listOfCurrencies.find(c => c.id === id);
      if (currencyToEdit) {
        currencyToEdit.rate = rate;
      } else {
        console.error('currency to edit not found');
      }
    },
    //deletes a currency from state
    deleteCurrency(state, { id } = {}) {
      const indexToDelete = state.listOfCurrencies.findIndex(c => c.id === id); // findIndex is not supported by IE
      if (indexToDelete >=0) {
        state.listOfCurrencies.splice(indexToDelete, 1);
      } else {
        console.error('currency to delete not found');
      }
    },
  },
  actions: {
    //fetches the whole currency list
    async fetchCurrencies({ commit }) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        const [error, currencies] = await to(axios.get(`http://localhost:3000/currency/all`));
        if (error) {
          console.error('Something went wrong with fetching the currencies');
          reject();
        } else {
          const [error2, rates] = await to(axios.get(`http://localhost:3000/exchange-rate/all`));
          if (error2) {
            console.error('Something went wrong with fetching the rates');
            reject();
          } else {             
            commit('setCurrencies', { currencies: currencies.data, rates: rates.data });
            resolve();
          }
        }
      });
    },
    //on submit in the add currency form
    //posts a new currency (name and rate to euros) in the database
    async addCurrency({ commit }, { name, rate } = {}) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        const [error1, response] = await to(axios.post('http://localhost:3000/currency/create', { name }));
        console.log(reject, error1, response);
        //console.log(error, newCurrency);
        if (error1) {
          console.error('Something went wrong with adding the new currency');
          reject();
        } else {
          const [error2, newRate] = await to(axios.post('http://localhost:3000/exchange-rate/create',{ currency_id: response.data.id, euro_rate: rate}));
          if(error2){
            console.error('Something went wrong with adding the new rate');
          reject();
          } else {
            commit('addCurrency',  {currency: response.data, rate: newRate.data.euro_rate});
            resolve();
          }
          
        }
      });
    },
    //on submit in the edit currency form
    //updates an exchange rate in the database
    async editCurrency({commit}, { id, rate } = {}) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        const [error, edittedCurrency] = await to(axios.put(`http://localhost:3000/exchange-rate/${id}`, { euro_rate: rate }));
        if (error) {
          console.error('Something went wrong with editting the currency');
          reject();
        } else {
          commit('updateCurrency', { id: edittedCurrency.data.currency_id, rate: edittedCurrency.data.euro_rate});
          resolve();
        }
      });
    },
    //deletes a currency from the database
    async deleteCurrency({ commit }, { id } = {}) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        const [error, deletedCurrency] = await to(axios.delete(`http://localhost:3000/currency/${id}`));
        if (error) {
          console.error('Something went wrong with deleting the currency');
          reject();
        } else {
          commit('deleteCurrency', { id: deletedCurrency.data.id });
          resolve();
        }
      });
    },
  },
});

  export default store;
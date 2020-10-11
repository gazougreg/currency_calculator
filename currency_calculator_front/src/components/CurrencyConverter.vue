<template>
<!-- the currency converter component
contains an input field for the base input that the user wishes to convert,
two drop downs for the user to choose the base and target currencies,
a button that on click toggles the base and target currencies and
a button that on click provides the calculated value -->
    <div class="currency-converter">
        <div class="currency-converter__container">
            <div class="currency-converter__input">
                <label class="currency-converter__input-label">Amount</label>
                <input class="currency-converter__input-field" v-model="inputValue" />
            </div>
            <CurrencyDropDown v-model="baseSelectedCurrency" label="From" />
            <button class="currency-converter__switch" @click="switchCurrencyOrder">Switch</button>
            <CurrencyDropDown v-model="targetSelectedCurrency" label="To" />
            <button class="currency-converter__calculate" @click="calculate">Calculate</button>
        </div>
        <div class="currency-converter__result" v-if="calculatedValue">
            {{ calculatedInputValue }} {{ calculatedBaseCurrency.name }} = {{ calculatedValue }} {{ calculatedTargetCurrency.name }}
        </div>
    </div>
</template>

<script>
import CurrencyDropDown from './CurrencyDropDown';
import { mapState, mapActions } from 'vuex';

export default {
    name: 'CurrencyConverter',
    components: {
        CurrencyDropDown,
    },
    data() {
        return {
            inputValue: 1,
            baseSelectedCurrency: {},
            targetSelectedCurrency: {},
            calculatedValue: 0,
            calculatedInputValue: 1,
            calculatedBaseCurrency: {},
            calculatedTargetCurrency: {},
        }
    },
    computed: {
        ...mapState(['listOfCurrencies']),
    },
    methods: {
        ...mapActions(['fetchCurrencies']),
        //toggles the base and target currencies
        switchCurrencyOrder() {
            const targetCurrency = this.targetSelectedCurrency;
            this.targetSelectedCurrency = this.baseSelectedCurrency;
            this.baseSelectedCurrency = targetCurrency;
        },
        // calculates the output
        async calculate() {
            this.calculatedInputValue = this.inputValue;
            this.calculatedBaseCurrency = this.baseSelectedCurrency;
            this.calculatedTargetCurrency = this.targetSelectedCurrency;
            this.calculatedValue = (this.calculatedInputValue * (this.baseSelectedCurrency.rate / this.targetSelectedCurrency.rate)).toFixed(6);    
        }
    },
    created() {
        // fetches the initial list of currencies from the database
        this.fetchCurrencies().then(() => {
            this.baseSelectedCurrency = this.listOfCurrencies[0];
            this.targetSelectedCurrency = this.listOfCurrencies[1];
        });
    },
}
</script>

<style lang="scss" scoped>
.currency-converter {
    &__container {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        margin: 20px;
        @media screen and (min-width: 768px) {
            flex-direction: row;
            align-items: flex-end;
        }
    }
    &__input {
        width: 100%;
        text-align: left;
        @media screen and (min-width: 768px) {
            margin-right: 10px;
        }
        &-label {
            display: block;
            margin: 7px;
            color:lightslategray;
        }
        &-field {
            background: rgb(255, 255, 255);
            box-sizing: border-box;
            border: 1px solid lightgray;
            border-radius: 10px;
            font-size: 3rem;
            height: 60px;
            padding-left: 20px;
            width: 100%;
        }
    }
    &__switch {
        height: 60px;
        box-sizing: border-box;
        background: lightgray;
        border-radius: 10px;
        border: 0;
        margin: 10px 0;
        width: 100%;
        @media screen and (min-width: 768px) {
            margin: 0 10px;
            width: 60px;
        }
    }
    &__calculate {
        height: 60px;
        box-sizing: border-box;
        background: rgb(252, 184, 19);
        border-radius: 10px;
        border: 0;
        padding: 2px;
        margin: 10px 0;
        width: 100%;
        @media screen and (min-width: 768px) {
            margin: 0 0 0 10px;
            width: 60px;
        }
    }
    &__result {
        font-size: 2rem;
        margin-top: 10px;
        color: rgb(87, 87, 87);
    }
}
</style>

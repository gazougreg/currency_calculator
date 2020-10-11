<template>
<!-- a component with a drop down that displays the provided currencies -->
    <ValidationProvider :rules="rules" v-slot="{ errors }" slim >
        <div class="currency-dropdown">
            <label class="currency-dropdown__label" v-if="label">{{ label }}</label>
            <select class="currency-dropdown__input" v-model="selectedCurrency">
                <option :value="{}">Select Currency</option>
                <option 
                    :value="currency"
                    v-for="currency in listOfCurrencies" 
                    :key="currency.id">
                        {{ currency.name }}
                </option>
            </select>
            <div v-if="errors && errors.length" class="currency-dropdown__error">{{ errors[0] }}</div>
        </div>
    </ValidationProvider> 
</template>

<script>
import { mapState } from 'vuex';
import { ValidationProvider } from 'vee-validate';

//validations were made with vee-validate, rules are provided in validation.js
export default {
    name: 'CurrencyDropDown',
    components: {
        ValidationProvider,
    },
    props: {
        value: {
            type: Object,
        },
        label: {
            type: String,
        },
        rules: {
            type: String,
        }
    },
    computed: {
        ...mapState(['listOfCurrencies']),
        selectedCurrency:{
            get() {
                return this.listOfCurrencies.includes(this.value) ? this.value : {};
            },
            set(newValue) {
                this.$emit('input', newValue);
            },
        },
    },
    
}
</script>

<style lang="scss">
.currency-dropdown {
    width: 100%;
    text-align: left;
    &__label {
        display: block;
        margin: 7px;
        color:lightslategray;
    }
    &__input {
        background: rgb(255, 255, 255);
        box-sizing: border-box;
        border: 1px solid lightgray;
        border-radius: 10px;
        font-size: 1rem;
        height: 60px;
        width: 100%;
        padding-left: 20px;
    }
    &__error {
        text-align: left;
        color: red;
        font-size: 0.75rem;
    }
}
</style>
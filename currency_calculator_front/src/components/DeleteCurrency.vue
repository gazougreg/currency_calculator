<template>
<!-- the delete currency form component 
contains a currency drop down and a submit button-->
    <ValidationObserver slim v-slot="{invalid}">
        <form class="delete-currency" @submit.prevent="removeCurrency">
            <h2>Delete currency</h2>
            <CurrencyDropDown v-model="currencyToDelete" label="Currency:" rules="required_selection"/>
            <button :disabled="invalid" class="delete-currency__button" type="submit">Delete</button>
        </form>
    </ValidationObserver>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { ValidationObserver } from 'vee-validate';
import CurrencyDropDown from './CurrencyDropDown';

//validations were made with vee-validate, rules are provided in validation.js
export default {
    name: 'DeleteCurrency',
    components: {
        CurrencyDropDown,
        ValidationObserver,
    },
    data() {
        return {
            currencyToDelete: {},
        };
    },
    computed: {
        ...mapState(['listOfCurrencies']),
    },
    methods: {
        ...mapActions(['deleteCurrency']),
        //delete call on submit, to remove a currency
        async removeCurrency() {
            await this.deleteCurrency({ id: this.currencyToDelete.id });
            this.$eventHub.$emit('close-deletecurrency-modal');
        }
    }
}
</script>

<style lang="scss">
.delete-currency {
    color:lightslategray;
    margin: 20px;
    &__input {
        &-label {
        display: block;
        margin-bottom: 5px;
        padding-top: 7px;
        }
        &-select {
            border: lightgray solid 2px;
            color:lightslategray;
        }
    }
    &__button {
        width: 100%;
        padding: 5px;
        margin-top: 20px;
        border-radius: 5px;
        color:cornsilk;
        background: rgb(212, 58, 52);
        border: none;
        &:disabled {
            background: lightgray;
            cursor: not-allowed;
        }
    }
    .currency-dropdown__input {
        height: 25px;
        border-radius: 5px;
    }
}   
</style>

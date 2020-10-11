<template>
<!-- the edit currency form component 
contains a currency drop down, an input field for numeric values and a submit button-->
    <ValidationObserver slim v-slot="{invalid}">
        <form class="edit-exchange-rate" @submit.prevent="updateCurrency">
            <h2>Edit currency</h2>
            <CurrencyDropDown v-model="currencyToEdit" label="Currency:" rules="required_selection"/>
            <ValidationProvider rules="required|exchange_rate_regex" v-slot="{ errors }">
                <div class="edit-exchange-rate__input"> 
                    <label class="edit-exchange-rate__input-label">Exchange rate: </label>
                    <div class="edit-exchange-rate__input-field-wrapper">
                        <input class="edit-exchange-rate__input-field" v-model="newRate" />
                        <span class="edit-exchange-rate__input-field-currency">€</span>
                    </div>
                </div>
                <div v-if="errors.length" class="edit-exchange-rate__error">{{ errors[0] }}</div>
            </ValidationProvider>
            <button :disabled="invalid" class="edit-exchange-rate__button" type="submit">Edit</button>
        </form>
    </ValidationObserver>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CurrencyDropDown from './CurrencyDropDown';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

//validations were made with vee-validate, rules are provided in validation.js
export default {
    name: 'EditExchangeRate',
    components: {
        CurrencyDropDown,
        ValidationProvider,
        ValidationObserver,
    },
    data() {
        return {
            currencyToEdit: {},
            newRate: null,
        };
    },
    computed: {
        ...mapState(['listOfCurrencies']),
    },
    methods: {
        ...mapActions(['editCurrency']),
        //post call to update currency rate on submit
        async updateCurrency() {
            await this.editCurrency({ id: this.currencyToEdit.id, rate: this.newRate });
            this.$eventHub.$emit('close-editcurrency-modal');
        }
    }
}
</script>

<style lang="scss">
.edit-exchange-rate {
    color:lightslategray;
    margin: 20px;

    &__input {
        margin-top: 10px;
        text-align: left;
        &-label {
            display: block;
            margin-bottom: 5px;
            padding-top: 7px;
        }
        &-field {
            border: 1px solid lightgray;
            color:lightslategray;
            width: 100%;
                    box-sizing: border-box;
            &-wrapper {
                display: flex;
                align-items: center;
            }
            &-currency {
                padding-left: 10px;
            }
        }
    }

    &__button {
        width: 100%;
        padding: 5px;
        margin-top: 20px;
        border-radius: 5px;
        color:cornsilk;
        background: rgb(36, 149, 153);
        border: none;
        &:disabled {
            background: lightgray;
            cursor: not-allowed;
        }
    }
    .currency-dropdown__input,
    &__input-field {
        height: 30px;
        border-radius: 5px;
    }

    &__error {
        text-align: left;
        color: red;
        font-size: 0.75rem;
    }
}
</style>

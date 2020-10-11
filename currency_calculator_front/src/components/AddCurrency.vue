<template>
<!-- the add currency form component 
contains two input fields, one for the name, another for the exchange rate to euros
and a submit button-->
    <ValidationObserver slim v-slot="{invalid}">
        <form class="add-currency" @submit.prevent="setNewCurrency">
            <h2>Add new currency</h2>
            <ValidationProvider rules="required|alpha_spaces" v-slot="{ errors }">
                <div class="add-currency__input">
                    <label class="add-currency__input-label">Currency Name: </label>
                    <input class="add-currency__input-field" type="text" v-model="inputName" />
                </div>
                <div v-if="errors.length" class="add-currency__error">{{ errors[0] }}</div>
            </ValidationProvider>
            <ValidationProvider rules="required|exchange_rate_regex" v-slot="{ errors }">
                <div class="add-currency__input">
                    <label class="add-currency__input-label">Exchange rate: </label>
                    <div class="add-currency__input-field-wrapper">
                        <input class="add-currency__input-field" v-model="inputRate" />
                        <span class="add-currency__input-field-currency">€</span>
                    </div>
                </div>
                <div v-if="errors.length" class="add-currency__error">{{ errors[0] }}</div>
            </ValidationProvider>
            <button :disabled="invalid" class="add-currency__button" type="submit">Add</button>
        </form>
    </ValidationObserver>
</template>

<script>
import { mapActions } from 'vuex';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

//validations were made with vee-validate, rules are provided in validation.js
export default {
    name: 'AddCurrency',
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data() {
        return {
            inputName: '',
            inputRate: '',
        };
    },
    methods: {
        ...mapActions(['addCurrency']),
        async setNewCurrency() {
            await this.addCurrency({ name: this.inputName, rate: this.inputRate });
            this.$eventHub.$emit('close-addcurrency-modal');
        }
    }
}
</script>

<style lang="scss" scoped>
.add-currency {
    margin: 20px;

    &__input {
        text-align: left;
        color:lightslategray;
        &-label {
            display: block;
            margin-bottom: 5px;
            padding-top: 7px;
        }
        &-field {
            height: 30px;
            border-radius: 5px;
            border: 1px solid lightgray;
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
        background: rgb(78, 160, 109);
        border: none;
        &:disabled {
            background: lightgray;
            cursor: not-allowed;
        }
    }
    
    &__error {
        text-align: left;
        color: red;
        font-size: 0.75rem;
    }
}
</style>

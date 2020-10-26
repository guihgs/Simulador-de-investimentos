<template>
    <div class="main">
        <h1 class="main__brand">Ciclic</h1>
        <h2 class="main__title">Simulador</h2>
        <form @submit="simulateForm">
            <div class="form__container">
                <input type="text" class="form-control" id="name" placeholder="Nome" v-model="form.name" required/>
                <input type="number" class="form-control" id="monthly" placeholder="Mensalidade" v-model="form.monthly" :min="1" required/>
                <select name="years" class="form-control" id="years" v-model="form.years" required>
                    <option value="">Selecione</option>
                    <option value="12">1 Ano</option>
                    <option value="24">2 Anos</option>
                    <option value="36">3 Anos</option>
                    <option value="48">4 Anos</option>
                    <option value="60">5 Anos</option>
                </select>
                 <button type="submit" class="form__btn">Simular</button>
            </div>
        </form>
        <transition name="fade" appear>
            <div class="modal-overlay" v-if="form.showModal"></div>
        </transition>
             <ResultModal v-if="form.showModal" v-bind:form="form"/>
    </div>

</template>
<script>
import axios from 'axios';
import ResultModal from './ResultModal.vue';
export default {
    name: "Home",
    components: {
        ResultModal
    },
    data(){
        return {
            form: {
                name: '',
                monthly: '',
                years: '',
                result: '',
                showModal: false
            }
        }
    },
    methods: {
         async simulateForm(e){
            e.preventDefault();
           await axios.post('http://api.mathjs.org/v4/', {
                "expr": `${this.form.monthly} * (((1 + 0.00517) ^ ${this.form.years} - 1) / 0.00517)`,
                "precision": 5
            }).then((res) => {
                this.form.result = res.data.result;
                console.log(res.data.result);
            }).catch((e)  => {
                console.log(e);
            })
            this.form.showModal = true;
        }
    }
}
</script>
<style lang="scss">
@import "../scss/_home.scss";
</style>

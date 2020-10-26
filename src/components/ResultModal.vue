<template>
<div class="modal">
    <div class="modal__content">
            <h2 class="modal__brand">Ciclic</h2>
        <p class="modal__content-text">
            Olá {{form.name}}, juntando {{ currencyFormat(form.monthly) }} todo mês, você terá {{currencyFormat(form.result)}} em {{form.years / 12}} anos
        </p>
        <button @click="closeModal">Simular Novamente</button>
    </div>
</div>
</template>
<script>
export default {
    name: "ResultModal",
    props: ["form"],
    methods: {
        currencyFormat(number){
            return Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(number);
        },
        closeModal() {
            this.form.showModal = false;
            this.form.name = '';
            this.form.monthly = '';
            this.form.years = '';
        }
    }
}
</script>

<style scoped lang="scss">
@import "../scss/_modal.scss";
</style>
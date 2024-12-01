<template>
    <h2>Dashboard</h2>
    <body>
        <ul>
            <li>
                <router-link :to="{ name: 'envelopes' }">
                    Envelopes(Local)
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'criarEnvelope' }">
                    Criar Envelope(Local)
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'criarRepositorio' }">
                    Criar Repositorio(Asten)
                </router-link>
            </li>
        </ul>
    </body>
</template>

<script setup>
</script>

<style lang="scss" scoped>
</style>

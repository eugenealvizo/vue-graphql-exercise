<template>
    <nav class="top-header">
        <h1>{{setTitleHeader}}</h1>
    </nav>
</template>
<script>
 export default {
    computed: {
        setTitleHeader() {
            return this.$route.name;
        }
    }
 }
</script>
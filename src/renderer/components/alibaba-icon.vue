<template>
  <svg class="icon" aria-hidden="true" style="color:yellow!important;font-size:30px;" >
    <use :xlink:href="'#icon-'+name" style="color:yellow"></use>
  </svg>
</template>

<script>
export default {
    name:'alibaba-icon',
    props:{
        name:{
            type:String,
            required:true
        },
    

    }
}
</script>

<style scoped>
svg{
   color: inherit;
}
</style>
<template>
  <div class="pagination">
      <button>首页</button>
      <button>上一页</button>
      <button v-if="leftPoint">......</button>
      <button v-for="page in pages" :class="[{currentBtn:page === current},'pageBtn']"
        @click="isClick(page)"
      >{{page}}</button>
      <button>......</button>
      <button>下一页</button>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
    name: "Pagination",
    data: function(){
        return {
            pages: [1,2,3,4,5],
            current: 1,
            leftPoint: false
        }
    },
    methods: {
        isClick: function(page){
            this.current = page
            if(page > 4){
                this.leftPoint = true
            }else if(page < 3){
                this.leftPoint = false
            }
            if(page === this.pages[4]){
                this.pages.shift()
                this.pages.splice(4,0,this.pages[3]+1)
            }
            if(page != 1 && this.pages[0] === page){
                
                this.pages.unshift(this.pages[0] - 1)
                this.pages.splice(5,1)
            }
        }
    }
}
</script>

<style scoped>
.pagination{
    border: 1px solid #888;
    border-radius: 5px;
    margin-top: 5px;
    margin-bottom: 20px;
    padding: 6px 20px;
    display: flex;
    justify-content: space-between;
}
button{
    background: #fff;
    color: #778087;
    padding: 0 2px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 3px;
    outline: none;
    width: 55px;
    height: 29px;
    cursor: pointer;
    margin: 0px 4px;
}
.currentBtn{
    width: 40px;
    height: 29px;
    padding: 0 2px;
    background: #1f1b1b;
    color: white;
}
.pageBtn{
    width: 40px;
    height: 29px;
    padding: 0 2px;
}
</style>
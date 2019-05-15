<template>
  <div class="goods-wrapper">
    <div class="goods-content">
      <div class="menu-wrapper">
        <ul>
          <li v-for="item in goods" class="menu-item" :key="item.index">
            <span class="text">
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul>
          <li v-for="item in goods" :key="item.index">
            <h1 class="title">{{item.name}}</h1>
            <ul class="foods-item">
              <li v-for="food in item.foods" :key="food.index">
                <div class="icon">
                  <img :src="food.icon" alt>
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="des">{{food.dedescription}}</p>
                  <div class="extra">
                    <span>月售{{food.sellCount}}</span>
                    <span>好评率{{food.rating}}</span>
                  </div>
                  <div class="price">
                    <span>￥{{food.price}}</span>
                    <span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
const ERR_OK = 0;

export default {
  props: {
    seller: Object
  },
  data() {
    return {
      goods: []
    };
  },
  created() {
    this.$http.get("/api/goods").then(response => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.goods = response.data;
      }
    });

    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin'
.goods-wrapper
  position: absolute
  top: 174px
  bottom: 0
  width: 100%
  .goods-content
    display: flex
    position: absolute
    top: 0
    bottom: 46px
    width: 100%
    .menu-wrapper
      background-color: #eee
      flex: 0 0 80px
      // overflow: hidden
      overflow-y: scroll
      overflow-x: hidden
      .menu-item
        display: table
        height: 54px
        padding: 0 12px
        line-height: 12px
        // font-size: 0
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          font-size: 12px
          border-1px(rgba(7, 17, 27, 0.1))
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 2px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.special
              bg-image('special_3')
            &.invoice
              bg-image('invoice_3')
            &.guarantee
              bg-image('guarantee_3')
    .foods-wrapper
      flex: 1
      .title
        height: 26px
        line-height: 26px
        background-color: #f3f5f7
        border-left: 2px solid #d9dde1
        padding-left: 14px
        font-size: 12px
        color: rgb(147, 153, 159)
      .foods-item
        margin: 18px
        .icon
          display: inline-block
        .content
          display: inline-block
</style>

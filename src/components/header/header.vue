<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img v-bind:src="seller.avatar" alt width="64" heihgt="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="support" v-if="seller.supports">
          <span class="icon" v-bind:class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right" @click="showDetail"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right" @click="showDetail"></i>
    </div>
    <div class="bg-wrapper">
      <img :src="seller.avatar" alt>
    </div>
    <transition name="slide-fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="detail-name">{{seller.name}}</h1>
            <div class="star">
              <Star :size="48" :score="seller.score"></Star>
            </div>
            <div class="line-wrapper">
              <LineTitle :title="'优惠信息'"></LineTitle>
            </div>
            <div class="supports">
              <ul v-if="seller.supports" class>
                <li class="support-item" v-for="item in seller.supports" :key="item.index">
                  <span class="icon" :class="classMap[item.type]"></span>
                  <span class="text">{{item.description}}</span>
                </li>
              </ul>
            </div>
            <div class="line-wrapper">
              <LineTitle :title="'商家公告'"></LineTitle>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="closeDetail"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import Star from "../star/star";
import LineTitle from "../line/line";

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    };
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    closeDetail() {
      this.detailShow = false;
    }
  },
  components: {
    Star,
    LineTitle
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin'
.header
  position: relative
  overflow: hidden
  color: #fff
  background: rgba(7, 17, 27, 0.5)
  .content-wrapper
    position: relative
    padding: 24px 12px 18px 24px
    font-size: 0
    .avatar
      display: inline-block
      vertical-align: top
      img
        border-radius: 2px
    .content
      display: inline-block
      margin-left: 16px
      .title
        margin: 2px 0 8px 0
        .brand
          display: inline-block
          vertical-align: top
          width: 30px
          height: 18px
          bg-image('brand')
          background-size: 30px 18px
          background-repeat: no-repeat
        .name
          margin-left: 6px
          font-size: 16px
          font-weight: bold
      .description
        margin-bottom: 10px
        font-size: 12px
        line-height: 12px
      .support
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-bottom: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.special
            bg-image('special_1')
          &.invoice
            bg-image('invoice_1')
          &.guarantee
            bg-image('guarantee_1')
        .text
          margin-left: 4px
          font-size: 10px
          line-height: 12px
    .support-count
      position: absolute
      right: 12px
      bottom: 14px
      padding: 0 8px
      height: 24px
      line-height: 24px
      border-radius: 14px
      background-color: rgba(0, 0, 0, 0.2)
      text-align: center
      .count
        vertical-align: top
        font-size: 10px
      i
        margin-left: 2px
        line-height: 24px
        font-size: 10px
  .bulletin-wrapper
    // position: relative
    padding: 0 22px 0 12px
    height: 28px
    line-height: 28px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    background-color: rgba(7, 17, 27, 0.2)
    .bulletin-title
      vertical-align: top
      display: inline-block
      margin-top: 8px
      width: 22px
      height: 12px
      bg-image('bulletin')
      background-size: 22px 12px
      background-repeat: no-repeat
    .bulletin-text
      vertical-align: top
      margin: 0 4px
      font-size: 10px
      line-height: 28px
    .icon-keyboard_arrow_right
      position: absolute
      font-size: 10px
      right: 12px
      line-height: 28px
  .bg-wrapper
    position: absolute
    top: 0
    left: 0
    right: 0
    width: 100%
    height: 100%
    z-index: -1
    filter: blur(10px)
    img
      width: 100%
      height: 100%
  .detail
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 100
    overflow: auto
    background: rgba(7, 17, 27, 0.8)
    &.slide-fade-enter-active
      transition: all 0.5s
      // opacity: 0
    &.slide-fade-leave-active
      transition: all 0.5s
      opacity: 0
    &.slide-fade-enter, .slide-fade-leave-to
      // transform: translateX(10px)
      background: rgba(7, 17, 27, 0)
    .detail-wrapper
      min-height: 100%
      width: 100%
      .detail-main
        margin-top: 64px
        padding-bottom: 64px
        .detail-name
          font-size: 16px
          font-weight: 700
          line-height: 16px
          text-align: center
        .star
          margin-top: 16px
          height: 24px
          text-align: center
        .line-wrapper
          width: 80%
          margin: 28px auto 24px auto
          height: 14px
        .supports
          width: 80%
          margin: 0 auto
          .support-item
            padding-left: 12px
            margin-bottom: 12px
            font-size: 0
            &::last-child
              margin-bottom: 0
          .icon
            display: inline-block
            vertical-align: top
            width: 16px
            height: 16px
            background-size: 16px 16px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_2')
            &.discount
              bg-image('discount_2')
            &.special
              bg-image('discount_2')
            &.invoice
              bg-image('special_2')
            &.guarantee
              bg-image('guarantee_2')
          .text
            font-size: 12px
            line-height: 16px
            margin-left: 6px
        .bulletin
          width: 80%
          margin: 0 auto
          .content
            padding: 0 12px
            line-height: 24px
            font-size: 12px
    .detail-close
      position: relative
      width: 32px
      height: 32px
      margin: -64px auto 0 auto
      clear: both
      font-size: 32px
</style>

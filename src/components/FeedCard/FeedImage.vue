<template>
  <div
  :id='`m-pics${id}`'
  :class="['m-pics',`m-pics-${pics.length}`]">
    <ul class="m-pics-list">
      <li v-for='(img, index) in pics.slice(0, 9)' :key="`pics-${id}-${index}`">
        <div
        :class="['m-pics-box',{ 'long': isLongImg(img) }, { 'gif': (img.mime || '').indexOf('gif') > -1 }]"
        :style='pics.length === 1 ? longStyle(img.w, img.h) : ""'>
          <div
            class="m-pic"
            :data-src="img.file"
            @click.stop='handleClick($event, index)'
            v-async-image="img"/>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import bus from "@/bus.js";
export default {
  name: "feed-image",
  props: {
    id: {
      type: Number,
      required: true
    },
    pics: {
      type: Array
    }
  },
  methods: {
    handleClick($event, index) {
      const component = this.$parent;
      const els = this.$el.querySelectorAll(".m-pic");
      const images = this.pics.map((img, index) => {
        const el = els[index];
        const src = `${this.$http.defaults.baseURL}/files/${img.file}`;
        return {
          ...img,
          el,
          src,
          index
        };
      });
      bus.$emit("mvGallery", { component, index, images });
    },
    isLongImg(img) {
      const [w, h] = img.size.split("x");
      img.w = parseInt(w);
      img.h = parseInt(h);
      return h > 3 * w;
    },
    longStyle(w, h) {
      return {
        width: w > 518 ? "518px" : w + "px",
        paddingBottom: h / w * 100 + "%"
      };
    }
  }
};
</script>
<style lang='less'>
.m-pic {
  cursor: pointer;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  width: 100%;
  height: 100%;
  // TODO
  // 图片加载效果
  &.loading {
  }
}
.m-pics {
  width: 100%;
  overflow-y: hidden;
  &-list {
    text-align: left;
    margin-bottom: -4px;
    font-size: 0;
    max-width: 518px;
    max-height: 692px;
    li {
      font-size: 0;
      line-height: 1;
      width: 1/3 * 100%;
      // vertical-align: top;
      display: inline-block;
      padding: 0 2px 2px 0; /*no*/
      margin: 0 !important;
    }
  }
  &-box {
    display: inline-block;
    position: relative;
    padding-bottom: 100%;
    width: 100%;
    height: 0;
    max-width: 100%;
    background-color: #f4f5f6;
    .m-pic:after {
      position: absolute;
      bottom: 10px;
      right: 5px;
      background-color: #c8a06c;
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
      background-image: -webkit-linear-gradient(
        25deg,
        #e8d1b3 0%,
        rgba(232, 209, 179, 0.6) 100%
      );
      background-image: -o-linear-gradient(
        25deg,
        #e8d1b3 0%,
        rgba(232, 209, 179, 0.6) 100%
      );
      background-image: linear-gradient(
        115deg,
        #e8d1b3 40%,
        rgba(232, 209, 179, 0.6) 50%
      );
      text-align: center;
      width: 60px;
      padding: 5px;
      height: 30px;
      line-height: 20px;
      font-size: 20px;
      color: #fff;
    }

    &.long {
      .m-pic:after {
        display: block;
        content: "长图";
      }
    }
    &.gif {
      .m-pic:after {
        display: block;
        content: "GIF";
        display: block;
      }
    }
    .m-pic {
      background-position: top center;
      max-height: 690px;
    }
  }
  &-1 {
    text-align: left;
    .m-pics-list {
      display: inline-block;
      overflow-y: hidden;
    }
    li {
      width: 100%;
      .m-pics-box {
        max-width: 100%;
      }
    }
    .long {
      max-width: 100%;
    }
  }
  &-2,
  &-4 {
    li {
      width: 50%;
    }
  }
  &-5 {
    position: relative;
    li:nth-child(1),
    li:nth-child(2) {
      width: 50%;
    }
  }
  &-8 {
    li:nth-child(4),
    li:nth-child(5) {
      width: 50%;
    }
  }
  &-7 {
    li:nth-child(1),
    li:nth-child(2),
    li:nth-child(6),
    li:nth-child(7) {
      width: 50%;
    }
  }
}
</style>

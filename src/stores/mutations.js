import lstore from "@/plugins/lstore/lstore.js";
export default {
  /**
   * 应用启动信息
   * @author jsonleex <jsonlseex@163.com>
   */
  BOOTSTRAPPERS(state, config) {
    state.CONFIG = config;
    lstore.setData("BOOTSTRAPPERS", config);
  },

  /**
   * 保存当前定位信息
   * @author jsonleex <jsonlseex@163.com>
   */
  SAVE_H5_POSITION(state, position) {
    state.POSITION = position;
    lstore.setData("H5_CURRENT_POSITION", position);
  },

  /**
   * 保存用户信息
   * @author jsonleex <jsonlseex@163.com>
   */
  SAVE_USER(state, user) {
    if (!user.id) return;
    const key = `user_${user.id}`;
    const oldUser = state.USERS[key];

    oldUser
      ? (state.USERS[key] = Object.assign(oldUser, user))
      : (state.USERS[key] = user);

    lstore.setData("H5_USERS", state.USERS);
  },

  // 保存当前登录用户信息
  SAVE_CURRENTUSER(state, info) {
    state.CURRENTUSER = info;
    state.USERS[`user_${info.id}`] = info;
    lstore.setData("CURRENTUSER", state.CURRENTUSER);
    lstore.setData("H5_CUR_USER", state.CURRENTUSER);
  },

  // 保存圈子分类列表
  SAVE_GROUP_CATES(state, cates) {
    state.GROUP_CATES = cates;
    lstore.setData("GROUP_CATES", cates);
  },

  // 保存用户标签数据
  SAVE_USER_TAGS(state, list) {
    state.USERTAGS = list;
    lstore.setData("USERTAGS", state.USERTAGS);
  },

  // 保存创建圈子时选择的位置 临时数据
  SAVE_GROUP_LOCATION(state, location) {
    state.CUR_GROUP_LOCATION = location;
  },

  // 保存用户搜索历史
  ADD_SEARCH_HISTORY(state, list) {
    const old = state.SEARCHHISTORY;
    state.SEARCHHISTORY = Array.from(new Set([list, ...old]));
    lstore.setData("SEARCHHISTORY", state.SEARCHHISTORY);
  },

  // 清空搜索历史
  CLEAN_SEARCH_HISTORY(state, data) {
    const index = state.SEARCHHISTORY.indexOf(data);
    if (data && index >= 0) {
      state.SEARCHHISTORY.splice(index, 1);
    } else {
      state.SEARCHHISTORY = [];
      lstore.removeData("SEARCHHISTORY");
    }
  },

  // 注销登录
  SIGN_OUT(state) {
    try {
      state.USERS = {};
      state.CURRENTUSER = {};

      lstore.clearData();
    } catch (e) {
      console.log(e);
    }
  }
};

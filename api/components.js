
//公共组件接口
// import request from "@/utils/http";
import request from "../src/utils/http";


// 查询所有字典值(Map格式）
export const getProvinceList = (data) => {
  return request({ url: "master/cmd-map-address/getMapAddressTree", method: "GET", data });
};

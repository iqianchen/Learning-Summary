/* eslint-disable */
import XLSX from 'xlsx';
class ExportExcel {
  constructor() {

  }
  /**
   * 导出excel
   * @param {Object} tableData options: { headers: Array , data: Array }
   * @param {String} fileName  文件名称
   */
  export(tableData, fileName) {
    if (!tableData.headers || Array.isArray(tableData.headers) === false) return;
    if (!tableData.data || Array.isArray(tableData.data) === false) return;

    let tmpWb = this.createWB(tableData.headers, tableData.data);
    let tmpXml = XLSX.write(tmpWb, {
      bookType: 'xlsx',
      bookSST: false,
      type: 'binary',  //这里的数据是用来定义导出的格式类型
    })
    let tmpDown = new Blob([this.s2ab(tmpXml)], { type: "" });
    // 文件下载
    this.saveAs(tmpDown, fileName)
  }
  /**
   * 生成XLSX所需的数据格式
   * @param {Array} headers  lg: [{ key:name, title: '名称', width: 100}]  width默认为100 
   * @param {Array} data     lg: [{ name: '小明'}]
   */
  createWB(headers, data) {
    const _headers = headers.map((item, i) => {
      return Object.assign({}, { 
        key: item.key, 
        title: item.title,
        position: String.fromCharCode(65 + i) + 1
      })
    }).reduce((prev, next) => {
      return Object.assign({}, prev, { 
        [next.position]: { key: next.key, v: next.title }
      })
    }, {})

    const _data = data.map((item, i) => {
      return headers.map((key, j) => {
        return Object.assign({}, {
          content: item[key.key],
          position: String.fromCharCode(65 + j) + (i + 2)
        })
      })
    }).reduce((prev, next) => { // 对刚才的结果进行降维处理（二维数组变成一维数组）
      return prev.concat(next)
    }).reduce((prev, next) => { // 转换成 worksheet 需要的结构
      return Object.assign({}, prev, {
        [next.position]: { v: next.content }
      })
    }, {})
    // 合并 headers 和 data
    const output = Object.assign({}, _headers, _data);
    // 获取所有单元格的位置
    const outputPos = Object.keys(output);
    // 计算出范围 ,["A1",..., "H2"]
    const ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`;
    // 构建 workbook 对象
    const wb = {
      SheetNames: ['sheet1'],  //保存的表标题
      Sheets: {
        sheet1: Object.assign({}, output, {
            '!ref': ref,
            '!cols': headers.map(item => {
              let colWidth = item.width || 100
              return { wpx: colWidth }
            })
          }
        )
      }
    };
    return wb
  }

  // 下载功能
  saveAs(obj, fileName) {
    // 配置文件类型
    var wopts = { bookType: 'xlsx', bookSST: true, type: 'binary', cellStyles: true };
    var fileName = fileName || "未命名";
    // 创建一个下载链接
    var tmpa = document.createElement("a");
    tmpa.download = fileName + '.' + (wopts.bookType == "biff2" ? "xls" : wopts.bookType);
    // 兼容ie 
    if ("msSaveOrOpenBlob" in navigator) {
      window.navigator.msSaveOrOpenBlob(obj, fileName + ".xlsx");
    } else {
      tmpa.href = URL.createObjectURL(obj);
    }
    tmpa.click();
    setTimeout(function() {
      URL.revokeObjectURL(obj);
    }, 100);
  }

  s2ab(s) {
    if (typeof ArrayBuffer !== 'undefined') {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    } else {
        var buf = new Array(s.length);
        for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
  }
}

export default new ExportExcel()
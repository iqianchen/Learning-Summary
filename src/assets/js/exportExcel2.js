class MyExportExcel {
  constructor() {
    this.defaultCellWidth = 80, // 默认单元格宽度为80px
    this.spliceLength = 50,    // 数据超过50条做切割处理
    this.totalProgress = 0,
    this.currentProgress = 0,
    this.showProgress = false
  }

  export(tableData, fileName) {
    if (Array.isArray(tableData) == false) {
      new Error('第一个参数的数据类型必须为数组')
      return;
    }
    this.startProgress(tableData)
    let sheetNames = [], tmpWb = {
      SheetNames: [],
      Sheets: {}
    };
    tableData.map((item, index) => {

      let sheetName = item.name || `sheet${index + 1}`;   // 表名称  默认为sheet1,sheet2,...
      sheetNames.push(sheetName)

      let cols = this.createCols(item.header)
      let output = this.createCell(item.header, item.data)
      let outputPos = Object.keys(output)
      
      let ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`;
      tmpWb.Sheets[sheetName] = Object.assign({
        "!cols": cols,
        "!ref": ref
      }, output)
    })
    tmpWb.SheetNames = sheetNames;

    let tmpXml = XLSX.write(tmpWb, {
      bookType: 'xlsx',
      bookSST: false,
      type: 'binary',  //这里的数据是用来定义导出的格式类型
    })
    let tmpDown = new Blob([this.s2ab(tmpXml)], { type: "" });
    // 文件下载
    this.saveAs(tmpDown, fileName)
  }
  // 开启进度条
  startProgress(tableData) {
    let totalProgress = 0;
    tableData.map(item => {
      let len = item.data.length;
      totalProgress += Math.ceil(len / this.spliceLength)
    })
    this.totalProgress = totalProgress;
    this.currentProgress = 0;
    if (this.totalProgress >= 5) {    // 数据量大时开启进度条
      // this.showProgress = true;
      // let html = "<div id='progress-bar'>当前进度<span class='progress-text'>0</span>%</div>"
      // let elem = $(html)
      // $('body').append(elem);
    }
  }
  // 更新进度条
  updateProgress() {
    this.currentProgress++;
    if (!this.showProgress) return;
    let text = parseInt((this.currentProgress / this.totalProgress) * 100);
    // $('#progress-bar .progress-text').text(parseInt(text));
    if (this.currentProgress >= this.totalProgress) {
      this.closeProgress()
    }
  }
  // 关闭进度条
  closeProgress() {
    this.showProgress = false;
    setTimeout(() => {
      // $('#progress-bar').remove();
    }, 300);
  }
  // 生成表格数据
  createCell(header, data) {
    // 生成表格头部数据
    let _header = header.map((item, i) => {
      let position = '';
      let currentIndex = parseInt(i / 26)
      if (currentIndex > 0) {
        for(let j = 0; j < currentIndex; j++) {
          position += String.fromCharCode(65 + (currentIndex-1));
        }
      }
      position += String.fromCharCode(65 + i-(currentIndex * 26)) + '1';
      return Object.assign({}, { 
        key: item.key, 
        title: item.title,
        position: position
      })
    }).reduce((prev, next) => {
      return Object.assign({}, prev, { 
        [next.position]: { key: next.key, v: next.title,  t: 's'}
      })
    }, {})

    // 生成表格主体数据
    let _data = this.createTableCell(header, data, _header);
    // 合并 header 和 data
    let allData = Object.assign({}, _header, _data)
    return allData;
  }
  // 生成表格主体数据
  createTableCell(header, data, _header, index = 0, cellData = {}) {
    let tmpData = [];
    if (data.length > this.spliceLength) {    // 如果表格数据大于需要分割的长度， 则对数据做分割处理
      tmpData = data.splice(this.spliceLength)
    }
    let _data = data.map((item, i) => {
      return header.map((key, j) => {
        let type = '', defaultValue = '';
        switch(key.type) {
          case 'number':
            type = 'n';
            defaultValue = 0;
            break;
          case 'date':
            type = 'd';
            break;
          case 'boolean':
            type = 'b';
            break;
          default:
            type = 's'
        }
        let position = '';
        let currentIndex = parseInt(j / 26)
        if (currentIndex > 0) {
          for(let k = 0; k < currentIndex; k++) {
            position += String.fromCharCode(65 + (currentIndex-1));
          }
        }
        position += String.fromCharCode(65 + j-(currentIndex * 26)) + (i + 2 + (index * this.spliceLength))

        return Object.assign({}, {
          content: item[key.key] || defaultValue,
          type: type || 's',
          position: position
        })
      })
    }).reduce((prev, next) => { // 对刚才的结果进行降维处理（二维数组变成一维数组）
      return prev.concat(next)
    }).reduce((prev, next) => { // 转换成 worksheet 需要的结构
      return Object.assign({}, prev, {
        [next.position]: { 
          v: next.content,
          t: next.type
        }
      })
    }, {})

    let result = Object.assign({}, cellData, _data)

    this.updateProgress();
    if (tmpData.length > 0) {
      index++;
      result = this.createTableCell(header, tmpData, _header, index, result)
    }
    return result;
  }
  // 表格列设置
  createCols(header) {
    let cols = header.map(item => {
      return {
        wpx: item.width || this.defaultCellWidth
      }
    })
    return cols;
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
      window.navigator.msSaveOrOpenBlob(obj, fileName + ".xls");
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

export default new MyExportExcel();
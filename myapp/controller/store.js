const fs = require('fs');
const xlsx = require('node-xlsx');

module.exports = async(req, res) => {
  const sheets = xlsx.parse('public/data.xls');
  const D = new Date();
  const Name = `${D.getFullYear()}${D.getMonth() + 1}${('0' + D.getDate()).slice(-2)}`;
  let array = [];

  sheets.forEach(function(sheet) {
    let item = {
      name: '',
      data: []
    };
    item.name = sheet['name'];
    for(const rowId in sheet['data']) {
      const row = sheet['data'][rowId];
      item.data.push(row);
    }
    array.push(item);
  });

  const hasTodayData = array.filter(item => item.name == Name);
  if (hasTodayData.length <= 0 || hasTodayData[0].data.length <= 0) {
    array.push({
      name: Name,
      data: [
        ['设备号', '数据'],
        [req.body.deviceId, req.body.data]
      ]
    })
  } else {
    const Index = array.findIndex(item => item.name == Name);
    array[Index].data.push([req.body.deviceId, req.body.data]);
  }

  array.sort(function(a, b) {
    return a - b;
  });

  const buffer = xlsx.build(array);

  fs.writeFile('public/data.xls', buffer, function(err) {
    if (err) {
      console.log(`write failed:${err}`);
      return;
    }
    console.log('write completed');
  });

  res.status(200).json({
    msg: 'ok'
  }).end();
}
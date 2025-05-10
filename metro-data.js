// 杭州地铁线路数据
const METRO_LINES = [
  {
    id: 1,
    name: '1号线',
    englishName: 'Line 1',
    color: '#E60012',
    stations: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  },
  {
    id: 2,
    name: '2号线',
    englishName: 'Line 2',
    color: '#009944',
    stations: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
  },
  {
    id: 4,
    name: '4号线',
    englishName: 'Line 4',
    color: '#00A0E9',
    stations: [26, 27, 28, 29, 30, 31, 32, 33]
  },
  {
    id: 5,
    name: '5号线',
    englishName: 'Line 5',
    color: '#8957A1',
    stations: [34, 35, 36, 37, 38, 39, 40, 41]
  },
  {
    id: 6,
    name: '6号线',
    englishName: 'Line 6',
    color: '#0068B7',
    stations: [42, 43, 44, 45, 46, 47, 48, 49]
  },
  {
    id: 7,
    name: '7号线',
    englishName: 'Line 7',
    color: '#9B7CB6',
    stations: [50, 51, 52, 53, 54, 55, 56, 57]
  },
  {
    id: 16,
    name: '16号线',
    englishName: 'Line 16',
    color: '#F39800',
    stations: [58, 59, 60, 61, 62, 63, 64, 65]
  }
];

// 杭州地铁站点数据
const METRO_STATIONS = [
  // 1号线站点
  { id: 1, name: '临平', x: 120, y: 120, lines: [1], isTerminal: true },
  { id: 2, name: '萧山', x: 150, y: 150, lines: [1] },
  { id: 3, name: '九堡', x: 180, y: 180, lines: [1] },
  { id: 4, name: '九和路', x: 210, y: 210, lines: [1] },
  { id: 5, name: '文海南路', x: 240, y: 240, lines: [1] },
  { id: 6, name: '下沙江滨', x: 270, y: 270, lines: [1] },
  { id: 7, name: '江陵路', x: 300, y: 300, lines: [1] },
  { id: 8, name: '滨和路', x: 330, y: 330, lines: [1] },
  { id: 9, name: '西兴', x: 360, y: 360, lines: [1] },
  { id: 10, name: '滨康', x: 390, y: 390, lines: [1] },
  { id: 11, name: '湖湖', x: 420, y: 420, lines: [1], isTransfer: true },
  { id: 12, name: '城站', x: 450, y: 390, lines: [1] },
  { id: 13, name: '定安路', x: 450, y: 360, lines: [1] },
  { id: 14, name: '龙翔桥', x: 450, y: 330, lines: [1, 2], isTransfer: true },
  { id: 15, name: '凤起路', x: 450, y: 300, lines: [1], isTerminal: true },
  
  // 2号线站点
  { id: 16, name: '良渚', x: 150, y: 180, lines: [2], isTerminal: true },
  { id: 17, name: '余杭高铁站', x: 180, y: 210, lines: [2] },
  { id: 18, name: '南苑', x: 210, y: 240, lines: [2] },
  { id: 19, name: '朝阳', x: 240, y: 270, lines: [2] },
  { id: 20, name: '曹家桥', x: 270, y: 300, lines: [2] },
  { id: 21, name: '潘水', x: 300, y: 330, lines: [2] },
  { id: 22, name: '人民广场', x: 330, y: 330, lines: [2] },
  { id: 23, name: '杭发厂', x: 360, y: 330, lines: [2] },
  { id: 24, name: '白杨街', x: 390, y: 330, lines: [2] },
  { id: 25, name: '下沙西', x: 420, y: 330, lines: [2], isTerminal: true },
  // 4号线站点
  { id: 26, name: '火车东站', x: 420, y: 300, lines: [4], isTerminal: true },
  { id: 27, name: '彭埠', x: 390, y: 270, lines: [4] },
  { id: 28, name: '钱江世纪城', x: 360, y: 240, lines: [4] },
  { id: 29, name: '钱江路', x: 330, y: 210, lines: [4] },
  { id: 30, name: '新塘', x: 300, y: 180, lines: [4] },
  { id: 31, name: '景芳', x: 270, y: 150, lines: [4] },
  { id: 32, name: '清江路', x: 240, y: 120, lines: [4] },
  { id: 33, name: '北沙', x: 210, y: 90, lines: [4], isTerminal: true },
  
  // 5号线站点
  { id: 34, name: '绿汀路', x: 120, y: 300, lines: [5], isTerminal: true },
  { id: 35, name: '杨家墩', x: 150, y: 270, lines: [5] },
  { id: 36, name: '杭师大仓前', x: 180, y: 240, lines: [5] },
  { id: 37, name: '仓前', x: 210, y: 270, lines: [5] },
  { id: 38, name: '余杭塘路', x: 240, y: 300, lines: [5] },
  { id: 39, name: '文一西路', x: 270, y: 330, lines: [5] },
  { id: 40, name: '三坡', x: 300, y: 360, lines: [5] },
  { id: 41, name: '西溪湿地', x: 330, y: 390, lines: [5], isTerminal: true },
  
  // 6号线站点
  { id: 42, name: '三墩', x: 150, y: 330, lines: [6], isTerminal: true },
  { id: 43, name: '墩祥街', x: 180, y: 330, lines: [6] },
  { id: 44, name: '金星', x: 210, y: 330, lines: [6] },
  { id: 45, name: '松木场', x: 240, y: 330, lines: [6] },
  { id: 46, name: '和睦', x: 270, y: 360, lines: [6] },
  { id: 47, name: '古翠路', x: 300, y: 390, lines: [6] },
  { id: 48, name: '大关', x: 330, y: 420, lines: [6] },
  { id: 49, name: '新天地', x: 360, y: 450, lines: [6], isTerminal: true },
  
  // 7号线站点
  { id: 50, name: '丰北', x: 180, y: 360, lines: [7], isTerminal: true },
  { id: 51, name: '丰二路', x: 210, y: 360, lines: [7] },
  { id: 52, name: '丰潭路', x: 240, y: 360, lines: [7] },
  { id: 53, name: '文海南路', x: 270, y: 390, lines: [7] },
  { id: 54, name: '云水', x: 300, y: 420, lines: [7] },
  { id: 55, name: '下宁桥', x: 330, y: 450, lines: [7] },
  { id: 56, name: '沈塘桥', x: 360, y: 420, lines: [7] },
  { id: 57, name: '博奥路', x: 390, y: 390, lines: [7], isTerminal: true },
  
  // 16号线站点
  { id: 58, name: '九堡', x: 180, y: 150, lines: [16], isTransfer: true },
  { id: 59, name: '乔司南', x: 150, y: 120, lines: [16] },
  { id: 60, name: '乔司', x: 120, y: 150, lines: [16] },
  { id: 61, name: '翁梅', x: 90, y: 180, lines: [16] },
  { id: 62, name: '余杭高铁站', x: 60, y: 210, lines: [16] },
  { id: 63, name: '径山', x: 90, y: 240, lines: [16] },
  { id: 64, name: '鹤鸟', x: 120, y: 270, lines: [16] },
  { id: 65, name: '临平', x: 150, y: 300, lines: [16], isTerminal: true }
];

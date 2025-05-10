// 地铁地图组件
const MetroMap = {
  props: {
    lines: Array,
    stations: Array
  },
  template: `
    <div class="metro-map">
      <svg width="100%" height="500" viewBox="0 0 700 500" preserveAspectRatio="xMidYMid meet">
        <!-- 地铁线路 -->
        <g v-for="line in lines" :key="'line-' + line.id" class="metro-line">
          <path :d="generateLinePath(line)" :stroke="line.color" stroke-width="6" fill="none" />
        </g>
        
        <!-- 地铁站点 -->
        <g v-for="station in stations" :key="'station-' + station.id" class="station-group">
          <circle 
            :cx="station.x" 
            :cy="station.y" 
            :r="station.isTransfer ? 8 : 6" 
            :class="['metro-station-circle', { 'transfer': station.isTransfer, 'terminal': station.isTerminal, 'selected': isStationSelected(station) }]"
            :stroke="getStationStrokeColor(station)" 
            stroke-width="3" 
            fill="white" 
            @mouseover="showStationInfo(station)" 
            @mouseout="hideStationInfo(station)"
            @click="selectStation(station)"
          />
          <text 
            :x="getStationLabelX(station)" 
            :y="getStationLabelY(station)" 
            font-size="12" 
            :text-anchor="getTextAnchor(station)"
            :class="['station-label', { 'visible': hoveredStation && hoveredStation.id === station.id }]"
          >
            {{ station.name }}
          </text>
        </g>
      </svg>
      
      <!-- 指南针 -->
      <div class="compass" @click="rotateCompass">
        <svg width="60" height="60" viewBox="0 0 60 60" :style="{transform: 'rotate(' + compassRotation + 'deg)'}">
          <circle cx="30" cy="30" r="25" fill="white" stroke="#333" stroke-width="1"></circle>
          <path d="M30,5 L30,55" stroke="#333" stroke-width="1"></path>
          <path d="M5,30 L55,30" stroke="#333" stroke-width="1"></path>
          <text x="30" y="15" text-anchor="middle" font-size="12">北</text>
          <text x="30" y="50" text-anchor="middle" font-size="12">南</text>
          <text x="15" y="30" text-anchor="middle" font-size="12">西</text>
          <text x="45" y="30" text-anchor="middle" font-size="12">东</text>
        </svg>
        <div class="compass-tooltip">点击旋转</div>
      </div>
      
      <!-- 站点信息弹窗（固定在右上角） -->
      <div class="station-info fixed-top-right" :class="{ 'visible': true }">
        <div class="station-name">{{ displayStation.name }}</div>
        <div class="station-lines">
          <span v-for="lineId in displayStation.lines" :key="lineId" class="station-line-tag" :style="{ backgroundColor: getLineColor(lineId) }">
            {{ getLineName(lineId) }}
          </span>
        </div>
      </div>
      
      <!-- 地铁图例 -->
      <div class="metro-legend">
        <div 
          v-for="line in lines" 
          :key="'legend-' + line.id" 
          class="legend-item" 
          @click="toggleLineVisibility(line.id)"
          :class="{ 'legend-inactive': !isLineVisible(line.id) }"
        >
          <div class="line-color" :style="{ backgroundColor: line.color }"></div>
          <div class="line-name">{{ line.name }}</div>
        </div>
        <div class="legend-item special">
          <div class="station-icon transfer"></div>
          <div class="station-name">换乘站</div>
        </div>
        <div class="legend-item special">
          <div class="station-icon terminal"></div>
          <div class="station-name">终点站</div>
        </div>
      </div>
    </div>
  `,
  setup(props) {
    const { ref, computed, onMounted } = Vue;
    
    const hoveredStation = ref(null);
    const hiddenLines = ref([]);
    const compassRotation = ref(0);
    const defaultStation = ref(null); // 默认显示的站点
    
    // 记录最后悬停的站点
    const lastHoveredStation = ref(null);
    
    // 记录选中的站点（点击选中）
    const selectedStation = ref(null);
    
    // 计算属性：显示的站点（优先级：悬停 > 选中 > 最后悬停 > 默认）
    const displayStation = computed(() => {
      // 悬停站点优先级最高，其次是选中站点
      return hoveredStation.value || selectedStation.value || lastHoveredStation.value || defaultStation.value || props.stations[0] || {
        name: '杭州地铁',
        lines: [1],
        isTransfer: false
      };
    });
    
    // 判断站点是否被选中
    const isStationSelected = (station) => {
      // 即使悬停在其他站点，选中的站点仍然显示选中效果
      return selectedStation.value && selectedStation.value.id === station.id;
    };
    
    // 当组件挂载时，设置默认站点
    onMounted(() => {
      if (props.stations && props.stations.length > 0) {
        // 找一个有代表性的站点作为默认显示
        const transferStation = props.stations.find(s => s.isTransfer);
        defaultStation.value = transferStation || props.stations[0];
      }
    });
    
    const showStationInfo = (station) => {
      hoveredStation.value = station;
      lastHoveredStation.value = station; // 记录最后悬停的站点
    };
    
    const hideStationInfo = () => {
      hoveredStation.value = null;
      // 不重置 lastHoveredStation，保持最后悬停的站点信息
    };
    
    // 选择站点（点击时）
    const selectStation = (station) => {
      // 如果点击已选中的站点，取消选中
      if (selectedStation.value && selectedStation.value.id === station.id) {
        selectedStation.value = null;
      } else {
        selectedStation.value = station;
      }
    };
    
    const toggleLineVisibility = (lineId) => {
      const index = hiddenLines.value.indexOf(lineId);
      if (index === -1) {
        hiddenLines.value.push(lineId);
      } else {
        hiddenLines.value.splice(index, 1);
      }
    };
    
    const isLineVisible = (lineId) => {
      return !hiddenLines.value.includes(lineId);
    };
    
    const getLineById = (lineId) => {
      return props.lines.find(line => line.id === lineId);
    };
    
    const getLineName = (lineId) => {
      const line = getLineById(lineId);
      return line ? line.name : '';
    };
    
    const getLineColor = (lineId) => {
      const line = getLineById(lineId);
      return line ? line.color : '#999';
    };
    
    const getStationStrokeColor = (station) => {
      if (station.lines.length === 1) {
        return getLineColor(station.lines[0]);
      }
      return '#333'; // 换乘站使用黑色边框
    };
    
    const getStationsForLine = (line) => {
      return line.stations.map(stationId => {
        return props.stations.find(s => s.id === stationId);
      }).filter(Boolean);
    };
    
    const generateLinePath = (line) => {
      if (!isLineVisible(line.id)) return '';
      
      const stations = getStationsForLine(line);
      if (stations.length < 2) return '';
      
      let path = `M ${stations[0].x} ${stations[0].y}`;
      for (let i = 1; i < stations.length; i++) {
        path += ` L ${stations[i].x} ${stations[i].y}`;
      }
      
      return path;
    };
    
    const getStationLabelX = (station) => {
      // 根据站点位置调整标签位置
      return station.x + 12;
    };
    
    const getStationLabelY = (station) => {
      return station.y - 8;
    };
    
    const getTextAnchor = (station) => {
      // 根据站点在画布中的位置决定文本对齐方式
      if (station.x > 500) return 'end';
      if (station.x < 200) return 'start';
      return 'middle';
    };
    
    const rotateCompass = () => {
      // 每次点击旋转90度
      compassRotation.value = (compassRotation.value + 90) % 360;
    };
    
    return {
      hoveredStation,
      displayStation,
      showStationInfo,
      hideStationInfo,
      toggleLineVisibility,
      isLineVisible,
      generateLinePath,
      getLineColor,
      getLineName,
      getStationStrokeColor,
      getStationLabelX,
      getStationLabelY,
      getTextAnchor,
      compassRotation,
      rotateCompass,
      selectStation,
      isStationSelected
    };
  }
};

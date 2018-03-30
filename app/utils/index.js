import { FONTS, BODY_480 } from '../constants/defaults';
import { scaleLinear } from 'd3';
import _ from 'lodash';
export const numberWithDelimiter = (number, delimiter, separator) => {
  try {
    var delimiter = delimiter || ",";
    var separator = separator || ".";
    
    var parts = number.toString().split('.');
    parts[0] = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + delimiter);
    return parts.join(separator);
  } catch(e) {
    return number
  }
};

export const convertBgMode = (bgMode, fgOrBg) => {
  if (bgMode == "black"){
    return fgOrBg == "f" ? "white" : "black";
  } else {
    return fgOrBg == "f" ? "black" : "white";  
  }
}

export const getCurrentDescFont = (currentDescFont, mode) => {
  // debugger;
  if (mode === "all") {
    if (currentDescFont["title"] == currentDescFont["paragraph"]) {
      var resultFont = _.find(FONTS, fontData => { return currentDescFont["title"] == fontData.id });
      return _.isUndefined(resultFont) ? {
        id: -1,
        nameKo: "폰트선택",
        nameEn: "Choose"
      } : resultFont;
    } else {
      return {
        id: -1,
        nameKo: "폰트선택",
        nameEn: "Choose"
      };
    }
    
  } else {

    var resultFont = _.find(FONTS, fontData => { return currentDescFont["title"] == fontData.id });
    return _.isUndefined(resultFont) ? {
        id: -1,
        nameKo: "폰트선택",
        nameEn: "Choose"
      } : resultFont;

  }
}

export const isTouchDevice = () => {
  return 'ontouchstart' in window        // works on most browsers 
      || navigator.maxTouchPoints;       // works on IE10/11 and Surface
};

export const cutString = (screenWidth) => {
  var scale = scaleLinear().domain([BODY_480, 2560]).clamp(true).range([1, 6.2]);
  if (screenWidth > 1000 && screenWidth < 1300) {
    return 3;
  } else {
    return scale(screenWidth);
  }
}
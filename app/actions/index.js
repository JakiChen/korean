export const windowResize = (width, height) => {
  return {
    type: 'WINDOW_RESIZE',
    payload: {
      screenWidth: width,
      screenHeight: height  
    }
  }
};

export const changeCurrentDescFontSelected = (currentDescFontSelected) => {
  return {
    type: 'CHANGE_CURRENT_DESC_FONT_SELECTED',
    payload: {
      currentDescFontSelected: currentDescFontSelected
    }
  }
}


export const changeHeaderCollapsedTop = (headerCollapsedTop) => {
  return {
    type: 'CHANGE_HEADER_COLLAPSED_TOP',
    payload: {
      headerCollapsedTop: headerCollapsedTop
    }
  }
}


export const changeCategoryDropdownOpened = (categoryDropdownOpened) => {
  return {
    type: 'CHANGE_CATEGORY_DROPDOWN_OPENED',
    payload: {
      categoryDropdownOpened: categoryDropdownOpened
    }
  }
}

export const changeDescFontDropdownOpened = (descFontDropdownOpened) => {
  return {
    type: 'CHANGE_DESC_FONT_DROPDOWN_OPENED',
    payload: {
      descFontDropdownOpened: descFontDropdownOpened
    }
  }
}


export const changeHeaderHeight = (headerHeight) => {
  return {
    type: 'CHANGE_HEADER_HEIGHT',
    payload: {
      headerHeight: headerHeight
    }
  }
}

export const changeBackgroundMode = (mode) => {
  return {
    type: 'CHANGE_BACKGROUND_MODE',
    payload: {
      backgroundMode: mode
    }
  }
};

export const changeLocale = (locale) => {
  return {
    type: 'CHANGE_LOCALE',
    payload: {
      locale: locale
    }
  }
};

export const changeCurrentCategory = (currentCategory) => {
  return {
    type: 'CHANGE_CURRENT_CATEGORY',
    payload: {
      currentCategory: currentCategory
    }
  }
}

export const changeCurrentDescFont = (currentDescFont) => {
  return {
    type: 'CHANGE_CURRENT_DESC_FONT',
    payload: {
      currentDescFont: currentDescFont
    }
  }
}

export const changeCurrentViewFont = (currentViewFont) => {
  return {
    type: 'CHANGE_CURRENT_VIEW_FONT',
    payload: {
      currentViewFont: currentViewFont
    }
  }
}

export const changeHeaderMode = (headerMode) => {
  return {
    type: 'CHANGE_HEADER_MODE',
    payload: {
      headerMode: headerMode
    }
  }
}
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FONTS, BODY_600 } from '../constants/defaults';
import { changeCurrentDescFont, changeCurrentDescFontSelected } from '../actions';
import { DropdownFontSelector, DropdownFontSelectorMenu } from './';
import { getCurrentDescFont } from '../utils';

const Fragment = React.Fragment;

class DescriptionFontSelector extends Component {
  handleChangeCurrentDescFont(fontData, e){
    e.stopPropagation();

    let { currentDescFontSelected } = this.props;
    let newCurrentDescFont = {
      ...this.props.currentDescFont
    };

    if (currentDescFontSelected == "all") {
      newCurrentDescFont["title"] = fontData.id;
      newCurrentDescFont["paragraph"] = fontData.id;
    } else {
      newCurrentDescFont[currentDescFontSelected] = fontData.id;
    }

    this.props.dispatch(changeCurrentDescFont(newCurrentDescFont));

  }

  handleCurrentDescFontSelected(name, e) {
    e.stopPropagation();
    this.props.dispatch(changeCurrentDescFontSelected(name));
  }

  render() {
    let { locale, screenWidth, descFontDropdownOpened, headerMode, currentDescFontSelected } = this.props;
    let currentDescFont = getCurrentDescFont(this.props.currentDescFont, currentDescFontSelected);

    return (
      <div className={`font-selector-header ${headerMode == "black" ? "black" : ""}`}>

        {
          screenWidth > BODY_600 ? 
          <div className="font-selector-area">
            <div className="font-selector-area__wrap" style={{ width: FONTS.length * 62}}>
              {
                _.map(FONTS, fontData => {
                  return (
                    <a className={`font-selector${ currentDescFont.id === fontData.id ? "--selected" : "" }`} key={fontData.id} onClick={this.handleChangeCurrentDescFont.bind(this, fontData)} href="javascript:void(0);" style={{ fontFamily: fontData.fontName }}>
                      한
                    </a>
                  )
                })
              }
            </div>
          </div> : null 
        }

        <div className="font-selector-header--top">
          <div className="font-selector-header__tb-selector">
            <a href="javascript:void(0);" onClick={this.handleCurrentDescFontSelected.bind(this, "all")} className={`font-selector-header__tb-selector__link${currentDescFontSelected == "all" ? "--selected" : ""}`}>
              { locale === "ko" ? 
                <span className="ko-regular">전체</span> : 
                <span className="en-regular">All</span>
              }
            </a>
            <a href="javascript:void(0);" onClick={this.handleCurrentDescFontSelected.bind(this, "title")} className={`font-selector-header__tb-selector__link${currentDescFontSelected == "title" ? "--selected" : ""}`}>
              { locale === "ko" ? 
                <span className="ko-regular">제목</span> : 
                <span className="en-regular">Title</span> 
              }
            </a> 
            <a href="javascript:void(0);" onClick={this.handleCurrentDescFontSelected.bind(this, "paragraph")} className={`font-selector-header__tb-selector__link${currentDescFontSelected == "paragraph" ? "--selected" : ""}`}>
              { locale === "ko" ? 
                <span className="ko-regular">본문</span> : 
                <span className="en-regular">Text</span> 
              }
            </a>
          </div>
          <DropdownFontSelector />

          {
            descFontDropdownOpened ? 
            <DropdownFontSelectorMenu /> : null  
          }
        </div>

      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    locale: state.locale,
    currentDescFont: state.currentDescFont,
    screenWidth: state.screenWidth,
    headerMode: state.headerMode,
    descFontDropdownOpened: state.descFontDropdownOpened,
    currentDescFontSelected: state.currentDescFontSelected
  }
};

export default connect(mapStateToProps)(DescriptionFontSelector);
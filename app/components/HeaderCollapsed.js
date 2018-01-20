import React, { Component } from 'react';
import { CATEGORIES, BODY_600, BODY_960 } from '../constants/defaults';
import { connect } from 'react-redux';
import { InteractionStatusViewer, DropDownCategorySelector } from './';
import { changeLocale, changeCurrentCategory, changeHeaderHeight, changeCategoryDropdownOpened } from '../actions';

const Fragment = React.Fragment;

class HeaderCollapsed extends Component {
  constructor(props){
    super(props);

    this.state = {
      isMenuOpen: false
    };
  }

  componentWillReceiveProps(newProps){
    if (this.props.screenWidth != newProps.screenWidth) {
      this.props.dispatch(changeHeaderHeight(this.refHeader.offsetHeight));
      this.setState({
        isMenuOpen: false
      });
    }

  }

  handleToggleLocale(e) {
    this.props.dispatch(changeLocale(this.props.locale === "ko" ? "en" : "ko"));
  }

  handleCurrentCategory(categoryData){
    this.props.dispatch(changeCurrentCategory(categoryData.id));
  }
  
  toggleMenu(e){
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });
  }

  handleCategoryClick(e){
    if (!this.props.categoryDropdownOpened) {
      this.props.dispatch(changeCategoryDropdownOpened(true));
    }    
  }

  render() {
    let { categoryDropdownOpened, locale, screenWidth } = this.props;
    let currentCategory = _.find(CATEGORIES, categoryData => { return categoryData.id == this.props.currentCategory; });

    return (
      <Fragment>
        <header className="header-collapsed" ref={ ref => { this.refHeader = ref; }}>
          <div className="header-collapsed__flexwrap">
            <div className="header-collapsed__left">
              {
                locale == "ko" ? 
                <h1>
                  구글폰트 + 한국어 얼리억세스
                </h1>
                : 
                <h1 className="en-black">
                  Google Fonts + Korean Early Access
                </h1>
              }

              {
                screenWidth > BODY_960 ? 
                <div className="header-collapsed__categories">
                  <a className="category-selector--selected" href="javascript:void(0);" onClick={ this.handleCategoryClick.bind(this) }>
                    <div className="category-selector__label-ko-collapsed">
                      {
                        currentCategory.nameKo
                      }
                    </div>
                    <div className="category-selector__label-en">
                      {
                        currentCategory.nameEn
                      }
                    </div>
                    <img src="./public/assets/arrow_down.svg" alt="arrow_down" />
                  </a>
                </div> : null 
              }
            </div>
            {
              screenWidth > BODY_600 ? 
              <InteractionStatusViewer /> : null
            }
            
            {
              screenWidth > BODY_960 || (screenWidth > BODY_600 && this.state.isMenuOpen) ? (locale == "ko" ? 
              <div className={`header__menu--${locale}`}>
                <div>
                  <a href="javascript:void(0)" className="">
                    한국어 얼리억세스 소개 
                  </a>
                  <a href="javascript:void(0)" onClick={this.handleToggleLocale.bind(this)} className="">
                    English
                  </a>
                </div>
              </div> : 
              <div className={`header__menu--${locale}`}>
                <div>
                  <a href="javascript:void(0)" className="">
                    Introduction
                  </a>
                  <a href="javascript:void(0)" onClick={this.handleToggleLocale.bind(this)} className="">
                    한국어
                  </a> 
                </div>
              </div>) : null
            }

            <a href="javascript:void(0);" onClick={this.toggleMenu.bind(this)} className="header-collapsed__hamburger">
              <img src={`./public/assets/${!this.state.isMenuOpen ? 'hamburger' : 'close'}.svg`} alt="menu" />
            </a>
          </div>
          {
            (this.state.isMenuOpen) ? 
            <Fragment>
              <div className="header-collapsed__categories">
                {
                  _.map(CATEGORIES, categoryData => {
                    return (
                      <a className={`category-selector${ categoryData.id === currentCategory ? "--selected" : ""}`} onClick={this.handleCurrentCategory.bind(this, categoryData)} key={categoryData.id} href="javascript:void(0);">
                        <div className="category-selector__label-ko">
                          {
                            categoryData.nameKo
                          }
                        </div>
                        <div className="category-selector__label-en">
                          {
                            categoryData.nameEn
                          }
                        </div>
                      </a>
                    );
                  })
                }
              </div>
              {
                screenWidth <= BODY_600 ? (locale == "ko" ? 
                <div className={`header__menu--${locale}`} style={{ marginTop: 10}}>
                  <div>
                    <a href="javascript:void(0)" className="">
                      한국어 얼리억세스 소개 
                    </a>
                    <a href="javascript:void(0)" onClick={this.handleToggleLocale.bind(this)} className="">
                      English
                    </a>
                  </div>
                </div> : 
                <div className={`header__menu--${locale}`}>
                  <div>
                    <a href="javascript:void(0)" className="">
                      Introduction
                    </a>
                    <a href="javascript:void(0)" onClick={this.handleToggleLocale.bind(this)} className="">
                      한국어
                    </a> 
                  </div>
                </div>) : null
              }
            </Fragment> : null
          }
        </header>
        {
          categoryDropdownOpened ? 
          <DropDownCategorySelector /> : null
        }
      </Fragment>
    );
  }
}

let mapStateToProps = state => {
  return {
    locale: state.locale, 
    currentCategory: state.currentCategory,
    categoryDropdownOpened: state.categoryDropdownOpened,
    screenWidth: state.screenWidth,
  }
}

export default connect(mapStateToProps)(HeaderCollapsed);
import paper from 'paper';
import { convertBgMode } from '../../utils';
import { scaleLinear, scalePow } from 'd3';

export const shadowSkew = {
  attach: (_this, backgroundMode) => {

    _this.shadowSkew = {
      point: new paper.Point(400, 200),
      tPoint: new paper.Point(400, 200),
      lgCenter: new paper.Point(0, 0),
      centerY: 600
    };

    _this.project.activate();

    _this.shadowSkew.leftGlyphs = [];
    _this.shadowSkew.rightGlyphs = [];



    _.each(_this.glyphs, (glyph, i) => {
      if (i == 0) {
        _this.shadowSkew.lgCenter = glyph.bounds.center;
        _this.shadowSkew.centerY = glyph.bounds.center.y;
      }

      var lg = glyph.clone();
      var rg = glyph.clone();
      glyph.visible = false;
      
      lg.fillColor = convertBgMode(backgroundMode, "f");
      lg.strokeColor = convertBgMode(backgroundMode, "f");
      
      rg.fillColor = convertBgMode(backgroundMode, "b");
      rg.strokeColor = convertBgMode(backgroundMode, "f");
      

      _this.shadowSkew.leftGlyphs.push(lg);
      _this.shadowSkew.rightGlyphs.push(rg);
      
    });

    _this.shadowSkew.rightGroup = new paper.Group(_this.shadowSkew.rightGlyphs);
    _this.shadowSkew.leftGroup = new paper.Group(_this.shadowSkew.leftGlyphs);

    _this.shadowSkew.point = _this.shadowSkew.rightGroup.bounds.center;

    _this.shadowSkew.leftGroup.visible = false;
    _this.shadowSkew.rightGroup.visible = false;

    _this.view.draw();

    var skewAmountScale = scaleLinear().domain([0, _this.view.viewSize.height]).clamp(true).range([-0.6, 0.6]);
    var xScale = scaleLinear().domain([_this.shadowSkew.centerY - 900, _this.shadowSkew.centerY, _this.shadowSkew.centerY + 900]).clamp(true).range([0.6, 1.0, 0.6]); //mapping domain values (mouse) to range values
    var xShadowScale = scaleLinear().domain([_this.shadowSkew.centerY - 900, _this.shadowSkew.centerY, _this.shadowSkew.centerY + 900]).clamp(true).range([3.0, 1.0, 3.0]); 


    _this.view.onMouseMove = (e) => {
      _this.shadowSkew.tPoint = e.point;
    }

    _this.clonedLeftGroup = null;
    _this.clonedRightGroup = null;


    
    _this.view.onFrame = (e) => {
      
      _this.shadowSkew.point = _this.shadowSkew.point.add(_this.shadowSkew.tPoint.subtract(_this.shadowSkew.point).multiply(0.2));
      let skewAmount = skewAmountScale(_this.shadowSkew.point.y);
      let xScaleAmount = xScale(_this.shadowSkew.point.y);
      let xShadowScaleAmount = xShadowScale(_this.shadowSkew.point.y);

      if (!_.isNull(_this.clonedLeftGroup)) {
        _this.clonedLeftGroup.remove();
      }
      if (!_.isNull(_this.clonedRightGroup)) {
        _this.clonedRightGroup.remove();
      }
      
      _this.clonedLeftGroup = _this.shadowSkew.leftGroup.clone();
      _this.clonedRightGroup = _this.shadowSkew.rightGroup.clone();
      _this.clonedLeftGroup.visible = true;
      _this.clonedRightGroup.visible = true;
      
      _this.clonedLeftGroup.shear(0.0, -skewAmount, _this.shadowSkew.lgCenter);
      _this.clonedLeftGroup.scale(xScaleAmount, 1);
      _this.clonedRightGroup.shear(0.0, skewAmount, _this.shadowSkew.rightGroup.bounds.center);
      _this.clonedRightGroup.scale(xShadowScaleAmount, 1);

    };

  }, 

  changeBgMode: (_this, backgroundMode) => {

    _this.project.activate();

    for (let i = 0, len = _this.shadowSkew.leftGlyphs.length; i < len; i++) {

      let lg = _this.shadowSkew.leftGlyphs[i];
      let rg = _this.shadowSkew.rightGlyphs[i];

      lg.fillColor = convertBgMode(backgroundMode, "f");
      lg.strokeColor = convertBgMode(backgroundMode, "f");
      
      rg.fillColor = convertBgMode(backgroundMode, "b");
      rg.strokeColor = convertBgMode(backgroundMode, "f");

    }


    _this.view.draw();

  },

  detach: (_this) => {
    _this.project.activate();

    
    _.each(_this.glyphs, (glyph, i) => { 
      glyph.visible = true;
    });

    _this.shadowSkew.leftGroup.remove();
    _this.shadowSkew.rightGroup.remove();
    if (!_.isNull(_this.clonedLeftGroup)) {
      _this.clonedLeftGroup.remove();
    }
    if (!_.isNull(_this.clonedRightGroup)) {
      _this.clonedRightGroup.remove();
    }

    _this.view.onFrame = null;
    _this.view.onMouseMove = null;
    _this.view.draw();
  }
};
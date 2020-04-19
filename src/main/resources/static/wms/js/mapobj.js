// JavaScript source code

//  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes    ∂®“Â¿‡

class CMapNode {
	
	constructor(type,drawobj,w, h, x0,y0) {
		this.type=type;
		this.drawobj = drawobj;
  		this.w = w;
  		this.h = h;
  		this.x0 = x0;
		this.y0 = y0;

	}
	draw(svgobj){
		if(type=="rect")
			svgobj.rect(w,h,x0,y0);
		else
		if(type=="text")
			svgobj.text(w,h,x0,y0);
	}



}
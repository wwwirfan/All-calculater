KJE.parameters.set("DFN_AGE",'Your current age and investment time horizon is by far the most important aspect of asset allocation. With more "time in the market", an investor can weather the volatility associated with stock and currency investment cycles. As you get older, or to the end of your investment time horizon, it is advisable to move more of your investments to assets with less fluctuation. This can help ensure financial goals and objectives are met.');KJE.parameters.set("DFN_PORTFOLIO","This is the total value of your investment portfolio. Our asset allocator increases your stock and currency exposure as your portfolio increases. Generally speaking, larger portfolios require greater diversification to different currencies as a hedge against your single domestic currency.");KJE.parameters.set("DFN_YEARLY_SAVINGS","This is the amount you will be adding to your investments each year. Like portfolio size, the more you invest the more you require greater diversification to different currencies as a hedge against your single domestic currency.");KJE.parameters.set("DFN_INCOME_NEEDED","This is the percentage of income you will need from your investments. Most people do not require any income from their investments until they retire.");KJE.parameters.set("DFN_TAX_BRACKET","The tax rate you expect to pay on your investments.");KJE.parameters.set("DFN_VOLATILITY_TOLERANCE","On a scale of 1 to 10, your personal ability to tolerate your portfolio value fluctuating up and down. Many people overestimate their ability to tolerate risk. Unless you can handle a 20-40% decline in your portfolio during a stock market correction, you may wish to keep your risk tolerance at or below the mid-point.");KJE.parameters.set("DFN_ECONOMIC_OUTLOOK","On a scale of 1 to 10, is your view of your personal financial security. The more secure the outlook, the higher the allocation to growth related assets");KJE.AssetAllocatorCalc=function(){this.USE_PORTFOLIO_ACTUALS=KJE.parameters.get("USE_PORTFOLIO_ACTUALS",true);this.USE_YEARLY_ACTUALS=KJE.parameters.get("USE_YEARLY_ACTUALS",true);this.TAX_DEFFER=KJE.parameters.get("TAX_DEFFER",false);this.PORTFOLIO_MIN=0;this.PORTFOLIO_MAX=500000;this.SAVINGS_MIN=0;this.SAVINGS_MAX=20000;this.aMin=[20,0,0,0,0,0,0,0,0,0];this.aMax=[90,100,100,100,100,2,100,100,10,1];this.MSG_RISK=KJE.parameters.get("ARRAY_RISK",["Conservative","Moderately Conservative","Balanced","Moderately Aggressive","Aggressive"]);this.MSG_ECONOMY=KJE.parameters.get("ARRAY_ECONOMY",["Poor","Weak","Moderate","Optimistic","Strong"]);this.MSG_RESPONSIBILIY=KJE.parameters.get("ARRAY_RESPONSIBILIY",["Not Important","Important"]);this.aVolitilityTolerance=KJE.parameters.get("ARRAY_VOLITILITY",["Conservative","Balanced","Aggressive"]);this.aEconomicOutlook=KJE.parameters.get("ARRAY_OUTLOOK",["Poor","Moderate","Strong"]);this.aIncome=KJE.parameters.get("ARRAY_INCOME",["0%","2%","4%"]);this.catLabels=KJE.parameters.get("ARRAY_CAT_LABELS",["Large cap","Mid cap","Small cap","Foreign stock","Bonds","Municipals","Cash"]);this.cats2=KJE.parameters.get("ARRAY_CAT_LABELS2",["Stocks","Bonds","Cash"]);this.MAX_FOREIGN=25;this.PORTFOLIO=0;this.YEARLY_SAVINGS_TOTAL=0;this.YEARLY_SAVINGS=0;this.SPENDING_NEEDS=0;this.TAX_BRACKET=0;this.LARGE_CAP=0;this.MID_CAP=0;this.SMALL_CAP=0;this.FOREIGN_STOCK=0;this.MUNI_INCOME=0;this.BOND_INCOME=0;this.FIXED_INCOME=0;this.CASH=0;this.DETAILED_VIEW=KJE.parameters.get("DETAILED_VIEW",true);var a=7;if(this.TAX_DEFFER){a=6}this.DS_ALLOCATION=KJE.FloatArray(a);this.DS_ALLOCATION2=KJE.FloatArray(3);this.cats=new Array(a);this.catsBold=new Array(a);this.dDollars=KJE.FloatArray(a);this.dPercent=KJE.FloatArray(a);this.LARGE_CAP_NORMAL=KJE.parameters.get("LARGE_CAP_NORMAL","");this.MID_CAP_NORMAL=KJE.parameters.get("MID_CAP_NORMAL","");this.SMALL_CAP_NORMAL=KJE.parameters.get("SMALL_CAP_NORMAL","");this.FOREIGN_NORMAL=KJE.parameters.get("FOREIGN_NORMAL","");this.BOND_NORMAL=KJE.parameters.get("BOND_NORMAL","");this.MUNI_NORMAL=KJE.parameters.get("MUNI_NORMAL","");this.CASH_NORMAL=KJE.parameters.get("CASH_NORMAL","");this.LARGE_CAP_SOCIAL=KJE.parameters.get("LARGE_CAP_SOCIAL","");this.MID_CAP_SOCIAL=KJE.parameters.get("MID_CAP_SOCIAL","");this.SMALL_CAP_SOCIAL=KJE.parameters.get("SMALL_CAP_SOCIAL","");this.FOREIGN_SOCIAL=KJE.parameters.get("FOREIGN_SOCIAL","");this.BOND_SOCIAL=KJE.parameters.get("BOND_SOCIAL","");this.MUNI_SOCIAL=KJE.parameters.get("MUNI_SOCIAL","");this.CASH_SOCIAL=KJE.parameters.get("CASH_SOCIAL","");this.catsBold2=new Array(3);this.dDollars2=KJE.FloatArray(3);this.dPercent2=KJE.FloatArray(3)};KJE.AssetAllocatorCalc.prototype.clear=function(){this.AGE=0;this.INCOME_NEEDED=0;this.VOLATILITY_TOLERANCE=0;this.ECONOMIC_OUTLOOK=0;this.SOCIAL_RESPONSIBILITY=0;this.TOTAL_PORTFOLIO=0};KJE.AssetAllocatorCalc.prototype.calculate=function(E){var b=KJE;var u=this.AGE;var N=this.INCOME_NEEDED;var z=this.VOLATILITY_TOLERANCE*10;var q=this.ECONOMIC_OUTLOOK*10;var t=this.SOCIAL_RESPONSIBILITY;var r=this.TOTAL_PORTFOLIO;var o=this.YEARLY_SAVINGS_TOTAL;var j=this.SPENDING_NEEDS;var N=this.INCOME_NEEDED*25;var e=this.getTaxBracketFactor(this.TAX_BRACKET);var v=this.getPortfolioSliderValue(r);var m=this.getSavingsSliderValue(o);var c=this.DS_ALLOCATION;var g=this.DS_ALLOCATION2;var k=this.cats;var l=this.catsBold;var p=this.dDollars;var D=this.dPercent;var f=this.catsBold2;var R=this.dDollars2;var d=this.dPercent2;var O=0;if(t<5){t=2}else{if(t>=5){t=8}}this.value=KJE.FloatArray(9);this.value[O++]=u;this.value[O++]=v;this.value[O++]=m;this.value[O++]=j;this.value[O++]=N;this.value[O++]=e;this.value[O++]=z;this.value[O++]=q;this.value[O]=t;var M=0;var L=0;var J=0;var I=0;var H=0;var G=this.value[0];var F=0;F+=G;F+=this.rangefinder(1,3,-1,-3);F+=this.rangefinder(2,2,-1,-2);F+=this.rangefinder(3,-3,4,10);F+=this.rangefinder(5,0,-2,-4);F+=this.rangefinder(6,2,-1,-5);F+=this.rangefinder(7,2,-5,-8);L+=this.rangefinder(1,0,15,20);L+=this.rangefinder(4,10,15,25);L+=this.rangefinder(6,5,15,20);L+=this.rangefinder(7,20,10,0);L=F*L/100;M=F-L;var C=100-F;I=Math.max(0,70-G);I+=this.rangefinder(1,0,4,6);I+=this.rangefinder(2,0,2,8);I+=this.rangefinder(3,15,5,0);I+=this.rangefinder(4,10,4,0);I+=this.rangefinder(5,0,5,10);I+=this.rangefinder(6,0,5,14);I+=this.rangefinder(7,0,7,10);var B=this.transpose(L,15,25,35,-6,6,12);I+=B;I=C*I/200;H=Math.min(100-G,40);H+=this.rangefinder(1,0,4,10);H+=this.rangefinder(2,0,2,6);H+=this.rangefinder(3,10,4,0);H+=this.rangefinder(6,0,3,6);H+=this.rangefinder(7,10,0,-10);B=this.transpose(L,15,25,35,0,10,20);H+=B;if(H<0){H=0}H=H*C/200;J=C-I-H;this.CASH=M;this.FIXED_INCOME=L;this.LARGE_CAP=J;this.SMALL_CAP=I;this.FOREIGN_STOCK=H;if(this.CASH>1){this.CASH-=1;this.LARGE_CAP+=1}if(this.MAX_FOREIGN<33){var s=this.MAX_FOREIGN/33;var a=this.LARGE_CAP/(this.LARGE_CAP+this.SMALL_CAP);var P=this.FOREIGN_STOCK*s;this.LARGE_CAP=a*(this.FOREIGN_STOCK-P)+this.LARGE_CAP;this.SMALL_CAP=(1-a)*(this.FOREIGN_STOCK-P)+this.SMALL_CAP;this.FOREIGN_STOCK=this.FOREIGN_STOCK-a*(this.FOREIGN_STOCK-P)-(1-a)*(this.FOREIGN_STOCK-P)}var A=((e/5)+0.05);if(e<0.8||this.TAX_DEFFER){A=0}this.MUNI_INCOME=this.FIXED_INCOME*A;this.BOND_INCOME=this.FIXED_INCOME*(1-A);this.MID_CAP=this.LARGE_CAP*0.15+this.SMALL_CAP*0.5;this.LARGE_CAP=this.LARGE_CAP*0.85;this.SMALL_CAP=this.SMALL_CAP*0.5;var K=0;c[K++]=Math.round(this.LARGE_CAP<0?0:this.LARGE_CAP);c[K++]=Math.round(this.MID_CAP<0?0:this.MID_CAP);c[K++]=Math.round(this.SMALL_CAP<0?0:this.SMALL_CAP);c[K++]=Math.round(this.FOREIGN_STOCK<0?0:this.FOREIGN_STOCK);c[K++]=Math.round(this.BOND_INCOME<0?0:this.BOND_INCOME);if(this.TAX_DEFFER==false){c[K++]=Math.round(this.MUNI_INCOME<0?0:this.MUNI_INCOME)}c[K]=Math.round(this.CASH<0?0:this.CASH);var Q=0;var h=0;var x=c.length;for(var w=0;w<x;w++){Q+=c[w];if(c[h]<c[w]){h=w}}if(Q!=100){c[h]-=(Q-100)}for(var w=0;w<x;w++){D[w]=b.round(c[w]/100,2);l[w]=" "+b.percent(D[w]);p[w]=b.round(D[w]*r,0)}K=0;k[K++]=this.catLabels[0];k[K++]=this.catLabels[1];k[K++]=this.catLabels[2];k[K++]=this.catLabels[3];k[K++]=this.catLabels[4];if(this.TAX_DEFFER==false){k[K++]=this.catLabels[5]}k[K]=this.catLabels[6];var K=0;g[0]=c[K++]+c[K++]+c[K++]+c[K++];g[1]=c[K++]+(this.TAX_DEFFER?0:c[K++]);g[2]=c[K];for(var w=0;w<x;w++){d[w]=b.round(g[w]/100,2);f[w]=" "+b.percent(d[w]);R[w]=b.round(d[w]*r,0)}this.AGE=u;this.SOCIAL_RESPONSIBILITY=t;this.TOTAL_PORTFOLIO=r;this.YEARLY_SAVINGS_TOTAL=o;this.SPENDING_NEEDS=j;this.PORTFOLIO=v;this.YEARLY_SAVINGS=m};KJE.AssetAllocatorCalc.prototype.formatReport=function(b){var c=KJE;var a=this.iDecimal;var d=b;var e=0;d=KJE.replace("AGE",c.number(this.AGE),d);d=KJE.replace("PORTFOLIO",c.dollars(this.TOTAL_PORTFOLIO),d);d=KJE.replace("YEARLY_SAVINGS",c.dollars(this.YEARLY_SAVINGS_TOTAL),d);d=KJE.replace("SPENDING_NEEDS",c.percent(this.SPENDING_NEEDS/100),d);if(this.INCOME_NEEDED>3.9){d=KJE.replace("INCOME_NEEDED",c.percent(4/100)+" or more",d)}else{d=KJE.replace("INCOME_NEEDED",c.percent(this.INCOME_NEEDED/100,1),d)}d=KJE.replace("TAX_BRACKET",this.getTaxBracket(this.TAX_BRACKET),d);d=KJE.replace("MSG_VOLATILITY_TOLERANCE",this.getRisk(this.VOLATILITY_TOLERANCE),d);d=KJE.replace("CAL_VOLATILITY_TOLERANCE",c.number(1+KJE.round(this.VOLATILITY_TOLERANCE/2,0)),d);d=KJE.replace("MSG_ECONOMIC_OUTLOOK",this.getEconomy(this.ECONOMIC_OUTLOOK),d);d=KJE.replace("CAL_ECONOMIC_OUTLOOK",c.number(1+KJE.round(this.ECONOMIC_OUTLOOK/2,0)),d);d=KJE.replace("VOLATILITY_TOLERANCE",c.number(KJE.round(this.VOLATILITY_TOLERANCE,0)),d);d=KJE.replace("ECONOMIC_OUTLOOK",c.number(KJE.round(this.ECONOMIC_OUTLOOK,0)),d);d=KJE.replace("SOCIAL_RESPONSIBILITY",(this.SOCIAL_RESPONSIBILITY>5?this.MSG_RESPONSIBILIY[1]:this.MSG_RESPONSIBILIY[0]),d);d=KJE.replace("INVEST_FOR_RETIREMENT",c.yesno(this.TAX_DEFFER),d);if(this.SOCIAL_RESPONSIBILITY>5){d=KJE.replace("LARGE_CAP_FUNDS",this.LARGE_CAP_SOCIAL,d);d=KJE.replace("MID_CAP_FUNDS",this.MID_CAP_SOCIAL,d);d=KJE.replace("SMALL_CAP_FUNDS",this.SMALL_CAP_SOCIAL,d);d=KJE.replace("FOREIGN_FUNDS",this.FOREIGN_SOCIAL,d);d=KJE.replace("BOND_FUNDS",this.BOND_SOCIAL,d);d=KJE.replace("MUNI_FUNDS",this.MUNI_SOCIAL,d);d=KJE.replace("CASH_FUNDS",this.CASH_SOCIAL,d)}else{d=KJE.replace("LARGE_CAP_FUNDS",this.LARGE_CAP_NORMAL,d);d=KJE.replace("MID_CAP_FUNDS",this.MID_CAP_NORMAL,d);d=KJE.replace("SMALL_CAP_FUNDS",this.SMALL_CAP_NORMAL,d);d=KJE.replace("FOREIGN_FUNDS",this.FOREIGN_NORMAL,d);d=KJE.replace("BOND_FUNDS",this.BOND_NORMAL,d);d=KJE.replace("MUNI_FUNDS",this.MUNI_NORMAL,d);d=KJE.replace("CASH_FUNDS",this.CASH_NORMAL,d)}e=0;d=KJE.replace("LARGE_CAP_DOLLARS",c.dollars(this.dDollars[e++]),d);d=KJE.replace("MID_CAP_DOLLARS",c.dollars(this.dDollars[e++]),d);d=KJE.replace("SMALL_CAP_DOLLARS",c.dollars(this.dDollars[e++]),d);d=KJE.replace("FOREIGN_STOCK_DOLLARS",c.dollars(this.dDollars[e++]),d);d=KJE.replace("BOND_INCOME_DOLLARS",c.dollars(this.dDollars[e++]),d);if(!this.TAX_DEFFER){d=KJE.replace("MUNI_INCOME_DOLLARS",c.dollars(this.dDollars[e++]),d)}else{d=KJE.replace("MUNI_INCOME_DOLLARS",c.dollars(0),d)}d=KJE.replace("CASH_DOLLARS",c.dollars(this.dDollars[e]),d);e=0;d=KJE.replace("LARGE_CAP",this.catsBold[e++],d);d=KJE.replace("MID_CAP",this.catsBold[e++],d);d=KJE.replace("SMALL_CAP",this.catsBold[e++],d);d=KJE.replace("FOREIGN_STOCK",this.catsBold[e++],d);d=KJE.replace("BOND_INCOME",this.catsBold[e++],d);if(this.TAX_DEFFER==false){d=KJE.replace("MUNI_INCOME",this.catsBold[e++],d)}else{d=KJE.replace("MUNI_INCOME",c.percent(0),d)}d=KJE.replace("CASH",this.catsBold[e++],d);for(i=0;i<3;i++){e=(i+1);d=KJE.replace("SUMMARY_CAP"+(e),this.catsBold2[i],d);d=KJE.replace("SUMMARY_DOLLARS"+(e),c.dollars(this.dDollars2[i]),d)}if(this.DETAILED_VIEW){d=KJE.replace("<!--SUMMARY_VIEW-->","<!--",d);d=KJE.replace("<!--SUMMARY_VIEW-->","-->",d)}else{d=KJE.replace("<!--DETAILED_VIEW-->","<!--",d);d=KJE.replace("<!--END_DETAILED_VIEW-->","-->",d)}return d};KJE.AssetAllocatorCalc.prototype.rangefinder=function(e,h,g,f){var d=this.aMin[e];var c=this.aMax[e];var a=(d+c)/2;var b=this.value[e];if(b<a){return h+(g-h)*(b-d)/(a-d)}else{return g+(f-g)*(b-a)/(c-a)}};KJE.AssetAllocatorCalc.prototype.transpose=function(g,f,e,d,c,b,a){if(g<e){return c+(b-c)*(g-f)/(e-f)}else{return b+(a-b)*(g-e)/(d-e)}};KJE.AssetAllocatorCalc.prototype.getTaxBracketFactor=function(a){a=a/1.5;if(a<0.5){return 0}if(a<1.15){return 0.66}if(a<1.7){return 1.33}return 2};KJE.AssetAllocatorCalc.prototype.getTaxBracket=function(a){return KJE.AssetAllocatorCalc.aTaxBracket[Math.round(a)].trim()};KJE.AssetAllocatorCalc.prototype.getRisk=function(a){a=Math.floor(a/2);if(a>this.MSG_RISK.length-1){a=this.MSG_RISK.length-1}return this.MSG_RISK[a]};KJE.AssetAllocatorCalc.prototype.getEconomy=function(a){a=Math.floor(a/2);if(a>this.MSG_ECONOMY.length-1){a=this.MSG_ECONOMY.length-1}return this.MSG_ECONOMY[a]};KJE.AssetAllocatorCalc.prototype.getPortfolioAmount=function(a){return KJE.round((((a/100)*(this.PORTFOLIO_MAX-this.PORTFOLIO_MIN)+this.PORTFOLIO_MIN)/1000),0)*1000};KJE.AssetAllocatorCalc.prototype.getPortfolioSliderValue=function(a){if(a>=this.PORTFOLIO_MAX){return 100}if(a<=this.PORTFOLIO_MIN){return 0}return((a-this.PORTFOLIO_MIN)/(this.PORTFOLIO_MAX-this.PORTFOLIO_MIN))*100};KJE.AssetAllocatorCalc.prototype.getSavingsAmount=function(a){return KJE.round((((a/100)*(this.SAVINGS_MAX-this.SAVINGS_MIN)+this.SAVINGS_MIN)/100),0)*100};KJE.AssetAllocatorCalc.prototype.getSavingsSliderValue=function(a){if(a>=this.SAVINGS_MAX){return 100}if(a<=this.SAVINGS_MIN){return 0}return((a-this.SAVINGS_MIN)/(this.SAVINGS_MAX-this.SAVINGS_MIN))*100};KJE.AssetAllocatorCalc.aTaxBracket=["<15%","25%","28%","33%>"];KJE.AssetAllocatorCalc.aTaxBracketIndex=[0,1,2,3];KJE.CalcName="Asset Allocation Calculator (Australian)";KJE.CalcType="AUAssetAllocator";KJE.CalculatorTitle="Asset Allocator";KJE.parseInputs=function(a){a=KJE.replace("**TAX_BRACKET**",KJE.getDropBox("TAX_BRACKET",KJE.parameters.get("TAX_BRACKET",1),KJE.AssetAllocatorCalc.aTaxBracketIndex,KJE.AssetAllocatorCalc.aTaxBracket),a);return a};KJE.initialize=function(){KJE.CalcControl=new KJE.AssetAllocatorCalc();KJE.GuiControl=new KJE.AssetAllocator(KJE.CalcControl)};KJE.AssetAllocator=function(f){var e=KJE;var c=KJE.gLegend;var b=KJE.inputs.items;KJE.DollarSlider("PORTFOLIO","Current assets",0,100000000,0,0,3);KJE.NumberSlider("AGE","Age",20,90,0);KJE.DollarSlider("YEARLY_SAVINGS","Savings per year",0,100000,0,0,1);KJE.DropBoxSlider("TAX_BRACKET","Marginal tax rate",KJE.AssetAllocatorCalc.aTaxBracket);KJE.Slider("INCOME_NEEDED","Income required",0,4,1,KJE.FMT_PERCENT,0.5,f.aIncome);KJE.Slider("VOLATILITY_TOLERANCE","Risk tolerance",0,10,0,KJE.FMT_NUMBER,1,f.aVolitilityTolerance);KJE.Slider("ECONOMIC_OUTLOOK","Economic outlook",0,10,0,KJE.FMT_NUMBER,1,f.aEconomicOutlook);var a=KJE.gNewGraph(KJE.gPIE,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_TITLE","Asset Allocation by Investment Category"));a._legend._iOrientation=(c.TOP_RIGHT);a._bPopDetail=true;a._showItemLabelFmt=KJE.FMT_PERCENT;var d=KJE.parameters.get("MSG_DROPPER_TITLE","Asset Allocation Inputs");KJE.addDropper(new KJE.Dropper("INPUTS",true,d,d),KJE.colorList[0])};KJE.AssetAllocator.prototype.setValues=function(b){var a=KJE.inputs.items;b.AGE=a.AGE.getValue();b.TOTAL_PORTFOLIO=a.PORTFOLIO.getValue();b.YEARLY_SAVINGS_TOTAL=a.YEARLY_SAVINGS.getValue();b.INCOME_NEEDED=a.INCOME_NEEDED.getValue();b.TAX_BRACKET=a.TAX_BRACKET.getValue();b.VOLATILITY_TOLERANCE=a.VOLATILITY_TOLERANCE.getValue();b.ECONOMIC_OUTLOOK=a.ECONOMIC_OUTLOOK.getValue()};KJE.AssetAllocator.prototype.refresh=function(e){var d=KJE;var c=KJE.gLegend;var b=KJE.inputs.items;var a=KJE.gGraphs[0];a.removeAll();if(e.DETAILED_VIEW){a.setGraphCategories(e.cats);a._sGraphCategoriesBold=e.catsBold;a.add(new KJE.gGraphDataSeries(e.DS_ALLOCATION,"",a.getColor(1)))}else{a.setGraphCategories(e.cats2);a._sGraphCategoriesBold=e.catsBold2;a.add(new KJE.gGraphDataSeries(e.DS_ALLOCATION2,"",a.getColor(1)))}a.paint()};KJE.InputScreenText=" <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Input information:</div></div> <div id=KJE-E-INPUTS > <div id='KJE-C-AGE'><input id='KJE-AGE' /></div> <div id='KJE-C-PORTFOLIO'><input id='KJE-PORTFOLIO' /></div> <div id='KJE-C-YEARLY_SAVINGS'><input id='KJE-YEARLY_SAVINGS' /></div> <div id=\"KJE-C-TAX_BRACKET\">**TAX_BRACKET**</div> <div style=\"height:10px\"></div> <div id='KJE-C-INCOME_NEEDED'><input id='KJE-INCOME_NEEDED' /></div> <div id='KJE-C-VOLATILITY_TOLERANCE'><input id='KJE-VOLATILITY_TOLERANCE' /></div> <div id='KJE-C-ECONOMIC_OUTLOOK'><input id='KJE-ECONOMIC_OUTLOOK' /></div> <div style=\"height:10px\"></div> </div> **GRAPH1** ";KJE.DefinitionText=" <div id='KJE-D-AGE' ><dt>Current age</dt><dd>Your current age. This is by far the most important aspect of asset allocation. For most people the majority of their portfolio is for their retirement. The younger you are, the less likely you need this money any time soon. This allows you to invest more aggressively in stocks that generally have the best long-term returns. As you get older, it is advisable to move more of your investments to securities with less fluctuation such as cash and bonds. This can help ensure the money is available when you need it.</dd></div> <div id='KJE-D-PORTFOLIO' ><dt>Current assets</dt><dd>This is the total value of your investment portfolio. Our asset allocator increases your stock exposure as your portfolio increases. Generally speaking, larger portfolios are less likely to leave individuals cash poor in a market downturn. This allows people with large portfolios to invest a bit more aggressively.</dd></div> <div id='KJE-D-YEARLY_SAVINGS' ><dt>Savings per year</dt><dd>This is the amount you will be adding to your investments each year. Like portfolio size, the more you invest the more aggressive your investments should be.</dd></div> <div id='KJE-D-INCOME_NEEDED' ><dt>Income required</dt><dd>This is the percentage of income you will need from your investments. Most people do not require any income from their investments until they retire.</dd></div> <div id='KJE-D-TAX_BRACKET' ><dt>Marginal tax rate</dt><dd>The tax rate you expect to pay on your investments.</dd></div> <div id='KJE-D-VOLATILITY_TOLERANCE' ><dt>Risk tolerance</dt><dd>On a scale of 1 to 10, your personal ability to tolerate your portfolio value fluctuating up and down. Many people overestimate their ability to tolerate risk. Unless you can handle a 20% decline in your portfolio during a stock market correction, you may wish to keep your risk tolerance at or below the mid-point.</dd></div> <div id='KJE-D-ECONOMIC_OUTLOOK' ><dt>Economic outlook</dt><dd>On a scale of 1 to 10, is your view of future economic growth and the overall health of the economy. The better your outlook, the more aggressive you can be with your investments.</dd></div> ";KJE.ReportText=" <!--HEADING \"Asset Allocation Results\" HEADING--> **GRAPH** <div class=KJEReportTableDiv><table class=KJEReportTable><caption class='KJEHeaderRow KJEHeading'>Your Profile</caption> <tbody class='KJEReportTBody'> <tr class=KJEOddRow><th class='KJELabel KJECellBorder KJECell50' scope='row'>Age</th><td class='KJECell KJECell50'>AGE</td></tr> <tr class=KJEOddRow><th class='KJELabel KJECellBorder' scope='row'>Current assets </th><td class=KJECell>PORTFOLIO </td></tr> <tr class=KJEOddRow><th class='KJELabel KJECellBorder' scope='row'>Savings per year</th><td class=KJECell>YEARLY_SAVINGS</td></tr> <tr class=KJEOddRow><th class='KJELabel KJECellBorder' scope='row'>Income required</th><td class=KJECell>INCOME_NEEDED</td></tr> <tr class=KJEOddRow><th class='KJELabel KJECellBorder' scope='row'>Marginal tax rate</th><td class=KJECell>TAX_BRACKET</td></tr> <tr class=KJEOddRow><th class='KJELabel KJECellBorder' scope='row'>Risk tolerance</th><td class=KJECell>MSG_VOLATILITY_TOLERANCE (VOLATILITY_TOLERANCE scale of 0 to 10)</td></tr> <tr class=KJEOddRow><th class='KJELabel KJECellBorder' scope='row'>Economic outlook</th><td class=KJECell>MSG_ECONOMIC_OUTLOOK (ECONOMIC_OUTLOOK scale of 0 to 10)</td></tr> </tbody> </table></div> <!--DETAILED_VIEW--> <div class=KJEReportTableDiv><table class=KJEReportTable><caption class='KJEHeaderRow KJEHeading'>Suggested Asset Allocation</caption> <tbody class='KJEReportTBody'> <tr class=KJEOddRow><th class='KJELabel KJECellBorder KJECell50' scope='row'>Large cap stock</th><td class='KJECell KJECellBorder KJECell25'>LARGE_CAP</td><td class='KJECell KJECellBorder KJECell25'>LARGE_CAP_DOLLARS</td></tr> <tr class=KJEOddRow><th class='KJELabel KJECellBorder' scope='row'>Mid cap stock</th><td class='KJECell KJECellBorder'>MID_CAP</td><td class='KJECell'>MID_CAP_DOLLARS</td></tr> <tr class=KJEOddRow><th class='KJELabel KJECellBorder' scope='row'>Small cap stock</th><td class='KJECell KJECellBorder'>SMALL_CAP</td><td class='KJECell'>SMALL_CAP_DOLLARS</td></tr> <tr class=KJEOddRow><th class='KJELabel KJECellBorder' scope='row'>Foreign stock</th><td class='KJECell KJECellBorder'>FOREIGN_STOCK</td><td class='KJECell'>FOREIGN_STOCK_DOLLARS</td></tr> <tr class=KJEOddRow><th class='KJELabel KJECellBorder' scope='row'>Bonds</th><td class='KJECell KJECellBorder'>BOND_INCOME</td><td class='KJECell'>BOND_INCOME_DOLLARS</td></tr> <tr class=KJEOddRow><th class='KJELabel KJECellBorder' scope='row'>Municipal bonds</th><td class='KJECell KJECellBorder'>MUNI_INCOME</td><td class='KJECell'>MUNI_INCOME_DOLLARS</td></tr> <tr class=KJEOddRow><th class='KJELabel KJECellBorder' scope='row'>Cash</th><td class='KJECell KJECellBorder'>CASH</td><td class='KJECell'>CASH_DOLLARS</td></tr> </tbody> </table></div> <!--END_DETAILED_VIEW--> <!--SUMMARY_VIEW--> <div class=KJEReportTableDiv><table class=KJEReportTable><caption class='KJEHeaderRow KJEHeading'>Suggested Asset Allocation</caption> <tbody class='KJEReportTBody'> <tr class=KJEOddRow><th class='KJELabel KJECellBorder KJECell50' scope='row'>Stocks</th><td class='KJECell KJECellBorder KJECell25'>SUMMARY_CAP1</td><td class='KJECell KJECell25'>SUMMARY_DOLLARS1</td></tr> <tr class=KJEOddRow><th class='KJELabel KJECellBorder' scope='row'>Bonds</th><td class='KJECell KJECellBorder'>SUMMARY_CAP2</td><td class='KJECell'>SUMMARY_DOLLARS2</td></tr> <tr class=KJEOddRow><th class='KJELabel KJECellBorder' scope='row'>Cash</th><td class='KJECell KJECellBorder'>SUMMARY_CAP3</td><td class='KJECell'>SUMMARY_DOLLARS3</td></tr> </tbody> </table></div> <!--END_SUMMARY_VIEW--> ";
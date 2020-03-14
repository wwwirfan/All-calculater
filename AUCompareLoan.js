KJE.parameters.set("MSG_COMMITMENT_FEE","Establishment Fee");KJE.parameters.set("MSG_LOAN1","Loan 1");KJE.parameters.set("MSG_LOAN2","Loan 2");KJE.parameters.set("MSG_LOAN3","Loan 3");KJE.parameters.set("MSG_ORIGINATION_FEE","Brokerage fee");KJE.Default.PAY_WEEKLY=0;KJE.Default.PAY_ACCEL_WEEK=1;KJE.Default.PAY_ACCEL_BI=2;KJE.Default.PAY_BIWEEKLY=3;KJE.Default.PAY_2XMONTHLY=4;KJE.Default.PAY_MONTHLY=5;KJE.Default.PAY_QUARTERLY=6;KJE.Default.PAY_SEMIANNUAL=7;KJE.Default.PAY_ANNUAL=8;KJE.Default.getPayDrop=function(c,b,g){KJE.Default.PAY_PERIOD_IDs=KJE.parameters.get("ARRAY_PAY_PERIODS_IDS",[KJE.Default.PAY_ACCEL_WEEK,KJE.Default.PAY_ACCEL_BI,KJE.Default.PAY_MONTHLY]);KJE.Default.PAY_PERIODS=KJE.parameters.get("ARRAY_PAY_PERIODS",["normal weekly","weekly","fortnightly","bi-weekly","semi-monthly","monthly","quarterly","semi-annual","annual"]);KJE.Default.PAY_PERIODS_TITLE=KJE.parameters.get("ARRAY_PAY_PERIODS_TITLE",["Normal weekly","Weekly","Fortnightly","Bi-weekly","Semi-monthly","Monthly","Quarterly","Semi-annual","Annual"]);KJE.Default.PAY_FREQUENCY=[52,12,12,26,24,12,4,2,1];KJE.Default.PAY_FREQUENCY_ACCELERATED=[52,52,26,26,24,12,4,2,1];KJE.Default.PAY_ACCELERATED=[false,true,true,false,false,false,false,false,false];var a=KJE.Default.PAY_PERIOD_IDs;var f=a.length;var e=KJE.Default.PAY_PERIODS;var d=new Array(f);for(i=0;i<f;i++){d[i]=e[a[i]]}return KJE.getDropBox(c,KJE.parameters.get(c,(!b?KJE.Default.PAY_MONTHLY:b)),a,d,g)};KJE.CompareLoanCalc=function(){this.SHOW_APR=true;this.bIO=KJE.parameters.get("INTEREST_ONLY",false);this.ADDITIONAL_OUTPUT=KJE.parameters.get("ADDITIONAL_OUTPUT","");this.TITLE_MESSAGE=KJE.parameters.get("TITLE_MESSAGE","MSG_LOANBEST_LOAN_BY_APR provides the lowest Annual Percentage Rate (APR) of BEST_LOAN_APR.");this.COMPARE_TYPE=KJE.parameters.get("COMPARE_TYPE","MORTGAGE");this.SHOW_ZERO_INTEREST_RATE=KJE.parameters.get("SHOW_ZERO_INTEREST_RATE",true);this.SHOW_PAYMENT_TYPES=false;if(this.COMPARE_TYPE=="CAMORTGAGE"||this.COMPARE_TYPE=="CALOAN"){this.SHOW_PAYMENT_TYPES=true}this.SHOW_PAYMENT_TYPES=KJE.parameters.get("SHOW_PAYMENT_TYPES",this.SHOW_PAYMENT_TYPES);this.MSG_ERROR1=KJE.parameters.get("MSG_ERROR1","At least one loan must have an amount.");this.MSG_ERROR2=KJE.parameters.get("MSG_ERROR2","Years to amortize cannot be less than the loan term.");var a=this.LOAN_COUNT=KJE.parameters.get("LOAN_COUNT",3);this.IO_TERM=KJE.FloatArray(a);this.LOAN_AMOUNT=KJE.FloatArray(a);this.INTEREST_RATE=KJE.FloatArray(a);this.NEW_INTEREST_RATE=KJE.FloatArray(a);this.LOAN_TERM=KJE.FloatArray(a);this.LOAN_TERM_ENTERED=KJE.FloatArray(a);this.PAYMENT_TYPE=KJE.IntArray(a);this.AMORTIZATION=KJE.FloatArray(a);this.AMORTIZATION_ENTERED=KJE.FloatArray(a);this.CLOSING_COSTS=KJE.FloatArray(a);this.MONTHLY_LOAN_PAYMENT=KJE.FloatArray(a);this.ANNUAL_PERCENTAGE_RATE=KJE.FloatArray(a);this.BALLOON_PAYMENT=KJE.FloatArray(a);this.PAYMENTS_PER_YEAR=KJE.IntArray(a);this.PAYMENT_TYPE_DESC=new Array(a);this.PAYMENT_TYPE_TITLE=new Array(a);this.LOAN_PAYMENT=KJE.FloatArray(a);this.TOTAL_PAYMENTS=KJE.FloatArray(a);this.TOTAL_INTEREST=KJE.FloatArray(a);this.LOAN_NAME=new Array(a);for(var b=0;b<a;b++){this.LOAN_NAME[b]=KJE.parameters.get("MSG_LOAN"+(b+1),"Loan "+(b+1))}this.MSG_NA=KJE.parameters.get("MSG_NA","n/a");this.ORIGINATION_FEE=KJE.FloatArray(a);this.COMMITMENT_FEE=KJE.FloatArray(a);this.OTHER_FEES=KJE.FloatArray(a);this.OTHER_COSTS=KJE.FloatArray(a);this.BEST_LOAN_BY_APR=0;this.BEST_LOAN_APR=0;this.BEST_LOAN_BY_PAYMENT=0;this.BEST_LOAN_PAYMENT=0;this.DS_PAYMENTS=null;this.DS_APR=null;this.cats=null};KJE.CompareLoanCalc.prototype.clear=function(){var a=this.LOAN_COUNT;for(var b=0;b<a;b++){this.LOAN_AMOUNT[b]=0;this.INTEREST_RATE[b]=0;this.AMORTIZATION[b]=0;this.ORIGINATION_FEE[b]=0;this.COMMITMENT_FEE[b]=0;this.OTHER_FEES[b]=0;this.OTHER_COSTS[b]=0;this.PAYMENT_TYPE[b]=KJE.Default.PAY_MONTHLY}};KJE.CompareLoanCalc.prototype.calculate=function(D){var m=KJE;var u=this.LOAN_COUNT;var y=this.LOAN_AMOUNT;var g=this.INTEREST_RATE;var d=this.AMORTIZATION;var A=this.NEW_INTEREST_RATE;var s=this.PAYMENT_TYPE;var q=this.CLOSING_COSTS;var t=this.MONTHLY_LOAN_PAYMENT;var x=this.LOAN_PAYMENT;var E=this.ANNUAL_PERCENTAGE_RATE;var j=this.BALLOON_PAYMENT;var h=this.PAYMENTS_PER_YEAR;var B=this.LOAN_TERM;var o=this.bIO;for(var z=0;z<u;z++){q[z]=0;t[z]=0;E[z]=0;j[z]=0;h[z]=12;this.PAYMENT_TYPE_DESC[z]=KJE.Default.PAY_PERIODS[s[z]];this.PAYMENT_TYPE_TITLE[z]=(KJE.lang=="FR"?this.PAYMENT_TYPE_DESC[z]:KJE.Default.PAY_PERIODS_TITLE[s[z]]);this.AMORTIZATION_ENTERED[z]=this.AMORTIZATION[z];this.LOAN_TERM_ENTERED[z]=this.LOAN_TERM[z]}if(y[0]+y[1]+y[2]<=0){throw (this.MSG_ERROR1)}var k=0;for(var z=0;z<u;z++){if(o){var r=d[z];B[z]=KJE.Default.IO_TERMS[r]+KJE.Default.IO_AMORTS[r];d[z]=B[r];this.IO_TERM[z]=KJE.Default.IO_TERMS[r]}h[z]=KJE.Default.PAY_FREQUENCY[s[z]];A[z]=(this.COMPARE_TYPE==("CAMORTGAGE")?(Math.pow(1+(g[z]/200),(1/(h[z]/2)))-1)*(h[z]*100):g[z]);q[z]=this.ORIGINATION_FEE[z]+this.COMMITMENT_FEE[z]+this.OTHER_FEES[z]+this.OTHER_COSTS[z];if(KJE.Default.PAY_ACCELERATED[s[z]]){if(o){x[z]=m.round((A[z]/1200)*y[z],2)}else{x[z]=m.round(KJE.PMT(A[z]/1200,d[z]*12,y[z]),2)}h[z]=KJE.Default.PAY_FREQUENCY_ACCELERATED[s[z]];A[z]=(this.COMPARE_TYPE==("CAMORTGAGE")?(Math.pow(1+(g[z]/200),(1/(h[z]/2)))-1)*(h[z]*100):g[z]);x[z]=m.round(((x[z]*13)/h[z]),2);t[z]=(x[z]*h[z])/12;d[z]=KJE.PERIODS(A[z]/(h[z]*100),x[z],y[z])/h[z];if(B[z]>d[z]){B[z]=d[z]}}else{if(o){x[z]=m.round((A[z]/(h[z]*100))*y[z],2)}else{x[z]=m.round(KJE.PMT(A[z]/(h[z]*100),d[z]*h[z],y[z]),2)}if(h[z]==12){t[z]=x[z]}else{t[z]=(x[z]*h[z])/12}}if(this.COMPARE_TYPE==("CAMORTGAGE")){if(q[z]==0){E[z]=KJE.FV_AMT(g[z]/200,2,1)-1}else{var v=0;var l=0;var a=y[z];var c=0;for(var w=0;w<h[z]*B[z];w++){l+=a;var e=a*(A[z]/(h[z]*100));a=a+e-x[z];c++;v+=e;if(a<=0){break}}if(l>0&&c>0){l=l/c;var f=m.round(c/h[z],2);E[z]=(((q[z]+v)/(l*f)));E[z]=KJE.FV_AMT(E[z]/h[z],h[z],1)-1}else{E[z]=0}}}else{E[z]=KJE.APR(d[z]*h[z],x[z],A[z]/(h[z]*100),y[z],q[z])*h[z]}j[z]=0;if(d[z]!=B[z]){j[z]=y[z];if(d[z]>B[z]){for(var b=0;b<B[z]*12;b++){j[z]=j[z]+(j[z]*A[z]/1200)-t[z]}j[z]+=t[z]}else{throw (this.MSG_ERROR2)}}if(y[z]<=0){q[z]=0;t[z]=0;E[z]=0;j[z]=0;this.TOTAL_PAYMENTS[z]=0;this.TOTAL_INTEREST[z]=0}else{k++;this.TOTAL_PAYMENTS[z]=x[z]*B[z]*h[z]+j[z];this.TOTAL_INTEREST[z]=this.TOTAL_PAYMENTS[z]-y[z];if(g[z]==0){this.TOTAL_INTEREST[z]=0;this.TOTAL_PAYMENTS[z]=y[z]}}}this.DS_PAYMENTS=KJE.FloatArray(k);this.DS_APR=KJE.FloatArray(k);this.cats=new Array(k);this.BEST_LOAN_BY_APR=10000000;this.BEST_LOAN_APR=10000000;this.BEST_LOAN_BY_PAYMENT=10000000;this.BEST_LOAN_PAYMENT=10000000;var C=0;for(var z=0;z<this.LOAN_COUNT;z++){if(y[z]>0){this.DS_PAYMENTS[C]=t[z];this.DS_APR[C]=E[z];this.cats[C++]=this.LOAN_NAME[z];if(this.BEST_LOAN_APR>E[z]){this.BEST_LOAN_BY_APR=z+1;this.BEST_LOAN_APR=E[z]}if(this.BEST_LOAN_PAYMENT>t[z]){this.BEST_LOAN_BY_PAYMENT=z+1;this.BEST_LOAN_PAYMENT=t[z]}}}this.MONTHLY_LOAN_PAYMENT=t;this.ANNUAL_PERCENTAGE_RATE=E};KJE.CompareLoanCalc.prototype.formatReport=function(d){var e=KJE;var b=this.iDecimal;var f=d;f=KJE.showCode("<SHOW_APR>","<END_SHOW_APR>",this.SHOW_APR,f);f=KJE.replace("ADDITIONAL_OUTPUT",this.ADDITIONAL_OUTPUT,f);var a=0;for(var g=1;g<=this.LOAN_COUNT;g++){var c=g-1;f=KJE.replace("LOAN_AMOUNT"+g,e.dollars(this.LOAN_AMOUNT[c]),f);if(this.INTEREST_RATE[c]>0||this.SHOW_ZERO_INTEREST_RATE){a++;f=KJE.replace("INTEREST_RATE"+g,e.percent(this.INTEREST_RATE[c]/100,3),f);f=KJE.replace("LOAN_TERM_ENTERED"+g,e.number(this.LOAN_TERM_ENTERED[c])+" "+KJE.MSG_YEARS_LBL,f);f=KJE.replace("LOAN_TERM"+g,e.number(this.LOAN_TERM[c],(KJE.Default.PAY_ACCELERATED[this.PAYMENT_TYPE[c]]?1:0))+" "+KJE.MSG_YEARS_LBL,f);f=KJE.replace("MONTHLY_LOAN_PAYMENT"+g,e.dollars(this.MONTHLY_LOAN_PAYMENT[c],2),f)}else{f=KJE.replace("INTEREST_RATE"+g,"",f);f=KJE.replace("LOAN_TERM_ENTERED"+g,"",f);f=KJE.replace("LOAN_TERM"+g,"",f);f=KJE.replace("MONTHLY_LOAN_PAYMENT"+g,"",f)}f=KJE.replace("AMORTIZATION_ENTERED"+g,e.number(this.AMORTIZATION_ENTERED[c])+" "+KJE.MSG_YEARS_LBL,f);f=KJE.replace("ACCEL_AMORTIZATION"+g,(KJE.Default.PAY_ACCELERATED[this.PAYMENT_TYPE[c]]?"<br>"+e.number(this.AMORTIZATION[c],1)+" "+KJE.MSG_YEARS_LBL+" "+this.PAYMENT_TYPE_DESC[c]:""),f);f=KJE.replace("AMORTIZATION"+g,e.number(this.AMORTIZATION[c],1)+" "+KJE.MSG_YEARS_LBL,f);f=KJE.replace("ORIGINATION_FEE"+g,e.dollars(this.ORIGINATION_FEE[c]),f);f=KJE.replace("COMMITMENT_FEE"+g,e.dollars(this.COMMITMENT_FEE[c]),f);f=KJE.replace("OTHER_FEES"+g,e.dollars(this.OTHER_FEES[c]),f);f=KJE.replace("OTHER_COSTS"+g,e.dollars(this.OTHER_COSTS[c]),f);f=KJE.replace("CLOSING_COSTS"+g,e.dollars(this.CLOSING_COSTS[c]),f);f=KJE.replace("LOAN_PAYMENT"+g,e.dollars(this.LOAN_PAYMENT[c],2)+" "+this.PAYMENT_TYPE_DESC[c],f);f=KJE.replace("ANNUAL_PERCENTAGE_RATE"+g,e.percent(this.ANNUAL_PERCENTAGE_RATE[c],3),f);f=KJE.replace("BALLOON_PAYMENT"+g,e.dollars(this.BALLOON_PAYMENT[c],2),f);f=KJE.replace("TOTAL_INTEREST"+g,e.dollars(this.TOTAL_INTEREST[c],0),f);f=KJE.replace("TOTAL_PAYMENTS"+g,e.dollars(this.TOTAL_PAYMENTS[c],0),f);f=KJE.replace("TOTAL_INTEREST_FEES"+g,e.dollars(this.TOTAL_INTEREST[c]+this.CLOSING_COSTS[c],0),f);f=KJE.replace("TOTAL_PAYMENTS_FEES"+g,e.dollars(this.TOTAL_PAYMENTS[c]+this.CLOSING_COSTS[c],0),f);f=KJE.replace("IO_TERM"+g,e.number(this.IO_TERM[c],0)+" "+KJE.MSG_YEARS_LBL,f);f=KJE.replace("IO_REMAINING_TERM"+g,e.number(25-this.IO_TERM[c],0)+" "+KJE.MSG_YEARS_LBL,f);f=KJE.replace("MSG_LOAN"+g,this.LOAN_NAME[c],f)}if(this.SHOW_ZERO_INTEREST_RATE||a>=this.LOAN_COUNT){f=KJE.replace("TITLE_MESSAGE",this.TITLE_MESSAGE,f);f=KJE.replace("BEST_LOAN_PAYMENT",e.dollars(this.BEST_LOAN_PAYMENT,2),f);f=KJE.replace("BEST_LOAN_APR",e.percent(this.BEST_LOAN_APR,3),f);f=KJE.replace("BEST_LOAN_BY_APR",e.number(this.BEST_LOAN_BY_APR),f);f=KJE.replace("BEST_LOAN_BY_PAYMENT",e.number(this.BEST_LOAN_BY_PAYMENT),f)}else{f=KJE.replace("TITLE_MESSAGE","",f);f=KJE.replace("BEST_LOAN_PAYMENT","",f);f=KJE.replace("BEST_LOAN_APR","",f);f=KJE.replace("BEST_LOAN_BY_APR","",f);f=KJE.replace("BEST_LOAN_BY_PAYMENT","",f)}for(var g=1;g<=this.LOAN_COUNT;g++){var c=g-1;f=KJE.replace("MSG_LOAN"+g,this.LOAN_NAME[c],f)}return f};KJE.showCode=function(e,h,d,b){var g=b;if(!d){var c=g.indexOf(e);var a=g.indexOf(h);var f="";while(c>0&&a>c){f+=g.substring(0,c);f+=g.substring(a+h.length);c=g.indexOf(e);a=g.indexOf(h)}g=(f==""?b:f)}g=KJE.replace(e,"",g);g=KJE.replace(h,"",g);return g};KJE.CalcName="Loan Comparison Calculator (Australian)";KJE.CalcType="AUCompareloan";KJE.CalculatorTitle="Loan Comparison Calculator";KJE.parameters.getSet("PAYMENT_TYPE1",KJE.Default.PAY_MONTHLY);KJE.parameters.getSet("PAYMENT_TYPE2",KJE.Default.PAY_MONTHLY);KJE.parameters.getSet("PAYMENT_TYPE3",KJE.Default.PAY_MONTHLY);KJE.parameters.getSet("PAYMENT_TYPE4",KJE.Default.PAY_MONTHLY);KJE.parameters.getSet("PAYMENT_TYPE5",KJE.Default.PAY_MONTHLY);KJE.parameters.getSet("PAYMENT_TYPE6",KJE.Default.PAY_MONTHLY);KJE.parameters.getSet("LOAN_TERM1",5);KJE.parameters.getSet("LOAN_TERM2",5);KJE.parameters.getSet("LOAN_TERM3",5);KJE.parameters.getSet("LOAN_COUNT",3);KJE.parseInputs=function(b){var a=KJE.parameters.get("INTEREST_ONLY",false);var c=KJE.parameters.get("LOAN_COUNT",3);for(var d=1;d<=c;d++){if(a){b=KJE.replace("**AMORTIZATION"+d+"**",KJE.getDropBox("AMORTIZATION"+d,KJE.parameters.get("AMORTIZATION"+d,0),KJE.Default.IO_ID,KJE.Default.IO_ITEMS),b)}else{b=KJE.replace("**LOAN_TERM"+d+"**",KJE.getMortgageTermDrop("LOAN_TERM"+d,30),b);b=KJE.replace("**AMORTIZATION"+d+"**",KJE.getMortgageTermDrop("AMORTIZATION"+d,30),b)}if(KJE.Default.getPayDrop){b=KJE.replace("**PAYMENT_TYPE"+d+"**",KJE.Default.getPayDrop("PAYMENT_TYPE"+d,KJE.Default.PAY_MONTHLY),b)}}return b};KJE.initialize=function(){KJE.CalcControl=new KJE.CompareLoanCalc();KJE.GuiControl=new KJE.CompareLoan(KJE.CalcControl)};KJE.CompareLoan=function(m){var f=KJE;var b=KJE.gLegend;var h=KJE.inputs.items;var k=m.COMPARE_TYPE=="CAMORTGAGE";this.MSG_PAYMENT=KJE.parameters.get("MSG_PAYMENT",k?"Loan amount":"Loan Payment");var j=m.LOAN_COUNT;var a=new Array(j);for(var d=1;d<=j;d++){KJE.InputItem.AltHelpName="LOAN_AMOUNT";KJE.MortgageAmtSlider("LOAN_AMOUNT"+d,KJE.parameters.get("MSG_LOAN_AMOUNT",k?"Mortgage amount":"Loan amount"));KJE.InputItem.AltHelpName="INTEREST_RATE";KJE.MortgageRateSlider("INTEREST_RATE"+d,KJE.parameters.get("MSG_INTEREST_RATE","Interest rate"));KJE.InputItem.AltHelpName="LOAN_TERM";KJE.MortgageTermDropBoxSlider("LOAN_TERM"+d,KJE.parameters.get("MSG_LOAN_TERM",k?"Mortgage term":"Loan term"));KJE.InputItem.AltHelpName="AMORTIZATION";if(m.bIO){KJE.DropBox("AMORTIZATION"+d,KJE.parameters.get("MSG_AMORTIZATION",k?"Mortgage amortization":"Loan amortization"))}else{KJE.MortgageTermDropBoxSlider("AMORTIZATION"+d,KJE.parameters.get("MSG_AMORTIZATION",k?"Mortgage amortization":"Loan amortization"))}KJE.InputItem.AltHelpName="ORIGINATION_FEE";KJE.Slider("ORIGINATION_FEE"+d,KJE.parameters.get("MSG_ORIGINATION_FEE","Origination fee"),0,10000000,0,f.FMT_DOLLARS,0,KJE.s_label[0],KJE.useScale(0));KJE.InputItem.AltHelpName="COMMITMENT_FEE";KJE.Slider("COMMITMENT_FEE"+d,KJE.parameters.get("MSG_COMMITMENT_FEE","Commitment fee"),0,10000000,0,f.FMT_DOLLARS,0,KJE.s_label[0],KJE.useScale(0));KJE.InputItem.AltHelpName="OTHER_FEES";KJE.Slider("OTHER_FEES"+d,KJE.parameters.get("MSG_OTHER_FEES",(m.COMPARE_TYPE=="CALOAN"||m.COMPARE_TYPE=="CAMORTGAGE"?"Fees":"Other fees")),0,10000000,0,f.FMT_DOLLARS,0,KJE.s_label[0],KJE.useScale(0));KJE.InputItem.AltHelpName="OTHER_COSTS";KJE.Slider("OTHER_COSTS"+d,KJE.parameters.get("MSG_OTHER_COSTS","Other costs"),0,10000000,0,f.FMT_DOLLARS,0,KJE.s_label[0],KJE.useScale(0));KJE.InputItem.AltHelpName="ANNUAL_PERCENTAGE_RATE";KJE.Label("ANNUAL_PERCENTAGE_RATE"+d,KJE.parameters.get("MSG_ANNUAL_PERCENTAGE_RATE","Apr"),null,null,"KJEBold");KJE.InputItem.AltHelpName="BALLOON_PAYMENT";KJE.Label("BALLOON_PAYMENT"+d,KJE.parameters.get("MSG_BALLOON_PAYMENT","Balloon payment"));KJE.InputItem.AltHelpName="MONTHLY_PAYMENT";KJE.Label("MONTHLY_PAYMENT"+d,KJE.parameters.get("MSG_MONTHLY_PAYMENT","Equivalent monthly payment"));KJE.InputItem.AltHelpName="CLOSING_COSTS";KJE.Label("CLOSING_COSTS"+d,KJE.parameters.get("MSG_CLOSING_COSTS","Closing costs"));KJE.InputItem.AltHelpName="PAYMENT_TYPE";KJE.DropBox("PAYMENT_TYPE"+d,KJE.parameters.get("MSG_PAYMENT_TYPE","Payment type"));a[d-1]=m.LOAN_NAME[d-1]+KJE.Colon}var g=KJE.gNewGraph(KJE.gCATEGORIES,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_MONTHLY_PAYMENTS",m.SHOW_PAYMENT_TYPES?"Equivalent Monthly Payments":"Monthly Payments"));g._legend.setVisible(false);g._legend._iOrientation=(b.TOP_RIGHT);g._bPopDetail=true;g._showItemLabel=true;var c=KJE.parameters.get("MSG_DROPPER_CLOSETITLE","KJE1 payment KJE2");var e=new Array(j);e[0]=function(){return a[0]+"|"+KJE.subText(KJE.getKJEReplaced(c,m.PAYMENT_TYPE_TITLE[0],f.dollars(m.LOAN_PAYMENT[0],2)),"KJERightBold")};e[1]=function(){return a[1]+"|"+KJE.subText(KJE.getKJEReplaced(c,m.PAYMENT_TYPE_TITLE[1],f.dollars(m.LOAN_PAYMENT[1],2)),"KJERightBold")};e[2]=function(){return a[2]+"|"+KJE.subText(KJE.getKJEReplaced(c,m.PAYMENT_TYPE_TITLE[2],f.dollars(m.LOAN_PAYMENT[2],2)),"KJERightBold")};if(j>3){e[3]=function(){return a[3]+"|"+KJE.subText(KJE.getKJEReplaced(c,m.PAYMENT_TYPE_TITLE[3],f.dollars(m.LOAN_PAYMENT[3],2)),"KJERightBold")}}if(j>4){e[4]=function(){return a[4]+"|"+KJE.subText(KJE.getKJEReplaced(c,m.PAYMENT_TYPE_TITLE[4],f.dollars(m.LOAN_PAYMENT[4],2)),"KJERightBold")}}if(j>5){e[5]=function(){return a[5]+"|"+KJE.subText(KJE.getKJEReplaced(c,m.PAYMENT_TYPE_TITLE[5],f.dollars(m.LOAN_PAYMENT[5],2)),"KJERightBold")}}for(d=0;d<j;d++){KJE.addDropper(new KJE.Dropper("INPUT_LOAN"+(d+1),false,e[d],e[d]),KJE.colorList[0])}};KJE.CompareLoan.prototype.setValues=function(e){var b=KJE.inputs.items;for(var f=1;f<=e.LOAN_COUNT;f++){var c=f-1;e.LOAN_AMOUNT[c]=b["LOAN_AMOUNT"+f].getValue();e.INTEREST_RATE[c]=b["INTEREST_RATE"+f].getValue();var d=b["LOAN_TERM"+f]._inputType!=KJE.TypeNone;var a=b["AMORTIZATION"+f]._inputType!=KJE.TypeNone;if(d){e.LOAN_TERM[c]=b["LOAN_TERM"+f].getValue()}if(a){e.AMORTIZATION[c]=b["AMORTIZATION"+f].getValue()}if(!d){e.LOAN_TERM[c]=e.AMORTIZATION[c]}if(!a){e.AMORTIZATION[c]=e.LOAN_TERM[c]}e.ORIGINATION_FEE[c]=b["ORIGINATION_FEE"+f].getValue();e.COMMITMENT_FEE[c]=b["COMMITMENT_FEE"+f].getValue();e.OTHER_FEES[c]=b["OTHER_FEES"+f].getValue();e.OTHER_COSTS[c]=b["OTHER_COSTS"+f].getValue();e.OTHER_COSTS[c]=b["OTHER_COSTS"+f].getValue();e.PAYMENT_TYPE[c]=b["PAYMENT_TYPE"+f].getValue()}};KJE.CompareLoan.prototype.refresh=function(f){var e=KJE;var d=KJE.gLegend;var b=KJE.inputs.items;var a=KJE.gGraphs[0];a.removeAll();a.setGraphCategories(f.cats);if(f.DS_PAYMENTS.length>3){a._legend.setVisible(true);a._axisX.setVisible(false)}else{a._legend.setVisible(false);a._axisX.setVisible(true)}a.add(new KJE.gGraphDataSeries(f.DS_PAYMENTS,this.MSG_PAYMENT,a.getColor(1)));a.paint();for(var g=1;g<=f.LOAN_COUNT;g++){var c=g-1;if(b["ANNUAL_PERCENTAGE_RATE"+g]){b["ANNUAL_PERCENTAGE_RATE"+g].setText(e.percent(f.ANNUAL_PERCENTAGE_RATE[c],3))}if(b["BALLOON_PAYMENT"+g]){b["BALLOON_PAYMENT"+g].setText(f.BALLOON_PAYMENT[c]>0?e.dollars(f.BALLOON_PAYMENT[c],2):f.MSG_NA)}if(b["CLOSING_COSTS"+g]){b["CLOSING_COSTS"+g].setText(e.dollars(f.CLOSING_COSTS[c]))}if(b["MONTHLY_PAYMENT"+g]){b["MONTHLY_PAYMENT"+g].setText(e.dollars(f.MONTHLY_LOAN_PAYMENT[c],2))}}};KJE.InputScreenText=" <div id=KJE-D-INPUT_LOAN1><div id=KJE-P-INPUT_LOAN1>Input information:</div></div> <div id=KJE-E-INPUT_LOAN1 > <div id='KJE-C-LOAN_AMOUNT1'><input id='KJE-LOAN_AMOUNT1' /></div> <div id='KJE-C-INTEREST_RATE1'><input id='KJE-INTEREST_RATE1' /></div> <div id=\"KJE-C-LOAN_TERM1\">**LOAN_TERM1**</div> <div id=\"KJE-C-AMORTIZATION1\">**AMORTIZATION1**</div> <div id='KJE-C-ORIGINATION_FEE1'><input id='KJE-ORIGINATION_FEE1' /></div> <div id='KJE-C-COMMITMENT_FEE1'><input id='KJE-COMMITMENT_FEE1' /></div> <div id='KJE-C-OTHER_FEES1'><input id='KJE-OTHER_FEES1' /></div> <div id='KJE-C-OTHER_COSTS1'><input id='KJE-OTHER_COSTS1' /></div> <div id='KJE-C-CLOSING_COSTS1'><div id='KJE-CLOSING_COSTS1'></div></div> <div id='KJE-C-BALLOON_PAYMENT1'><div id='KJE-BALLOON_PAYMENT1'></div></div> <div id='KJE-C-ANNUAL_PERCENTAGE_RATE1'><div id='KJE-ANNUAL_PERCENTAGE_RATE1'></div></div> <div style=\"height:10px\"></div> </div> <div id=KJE-D-INPUT_LOAN2><div id=KJE-P-INPUT_LOAN2>Input information:</div></div> <div id=KJE-E-INPUT_LOAN2 > <div id='KJE-C-LOAN_AMOUNT2'><input id='KJE-LOAN_AMOUNT2' /></div> <div id='KJE-C-INTEREST_RATE2'><input id='KJE-INTEREST_RATE2' /></div> <div id=\"KJE-C-LOAN_TERM2\">**LOAN_TERM2**</div> <div id=\"KJE-C-AMORTIZATION2\">**AMORTIZATION2**</div> <div id='KJE-C-ORIGINATION_FEE2'><input id='KJE-ORIGINATION_FEE2' /></div> <div id='KJE-C-COMMITMENT_FEE2'><input id='KJE-COMMITMENT_FEE2' /></div> <div id='KJE-C-OTHER_FEES2'><input id='KJE-OTHER_FEES2' /></div> <div id='KJE-C-OTHER_COSTS2'><input id='KJE-OTHER_COSTS2' /></div> <div id='KJE-C-CLOSING_COSTS2'><div id='KJE-CLOSING_COSTS2'></div></div> <div id='KJE-C-BALLOON_PAYMENT2'><div id='KJE-BALLOON_PAYMENT2'></div></div> <div id='KJE-C-ANNUAL_PERCENTAGE_RATE2'><div id='KJE-ANNUAL_PERCENTAGE_RATE2'></div></div> <div style=\"height:10px\"></div> </div> <div id=KJE-D-INPUT_LOAN3><div id=KJE-P-INPUT_LOAN3>Input information:</div></div> <div id=KJE-E-INPUT_LOAN3 > <div id='KJE-C-LOAN_AMOUNT3'><input id='KJE-LOAN_AMOUNT3' /></div> <div id='KJE-C-INTEREST_RATE3'><input id='KJE-INTEREST_RATE3' /></div> <div id=\"KJE-C-LOAN_TERM3\">**LOAN_TERM3**</div> <div id=\"KJE-C-AMORTIZATION3\">**AMORTIZATION3**</div> <div id='KJE-C-ORIGINATION_FEE3'><input id='KJE-ORIGINATION_FEE3' /></div> <div id='KJE-C-COMMITMENT_FEE3'><input id='KJE-COMMITMENT_FEE3' /></div> <div id='KJE-C-OTHER_FEES3'><input id='KJE-OTHER_FEES3' /></div> <div id='KJE-C-OTHER_COSTS3'><input id='KJE-OTHER_COSTS3' /></div> <div id='KJE-C-CLOSING_COSTS3'><div id='KJE-CLOSING_COSTS3'></div></div> <div id='KJE-C-BALLOON_PAYMENT3'><div id='KJE-BALLOON_PAYMENT3'></div></div> <div id='KJE-C-ANNUAL_PERCENTAGE_RATE3'><div id='KJE-ANNUAL_PERCENTAGE_RATE3'></div></div> <div style=\"height:10px\"></div> </div> **GRAPH1** ";KJE.DefinitionText=" <div id='KJE-D-LOAN_AMOUNT' ><dt>Loan amount</dt><dd>The total dollar amount for this loan.</dd></div> <div id='KJE-D-INTEREST_RATE' ><dt>Interest rate</dt><dd>The interest rate on this loan.</dd></div> <div id='KJE-D-LOAN_TERM' ><dt>Loan term</dt><dd>The number of years over which you will repay this loan. The most common terms are 15 years and 30 years. If this loan has a 'balloon' payment, the loan term will be shorter than the number of years to amortize the loan. For example, a loan with a 5-year term amortized over 30 years will have the same monthly payment as a 30-year loan with the same interest rate. The difference is the 30-year loan will have equal payments for 30 years. The 5-year loan will have equal payments for 5 years and then a very large, or balloon, payment for the remaining balance.</dd></div> <div id='KJE-D-AMORTIZATION' ><dt>Amortization</dt><dd>The number of years used in calculating the monthly payment. Loans that are amortized over a longer period than their loan term have a balloon payment. See 'Loan term' for more information.</dd></div> <div id='KJE-D-ORIGINATION_FEE' ><dt>Brokerage fee</dt><dd>The dollar amount charged as a loan brokerage fee, which is included in the Annual Percentage Rate (APR) calculation. For many loans a 1% fee is common. For example: a 1% fee on a $120,000 loan would cost $1,200.</dd></div> <div id='KJE-D-COMMITMENT_FEE' ><dt>Establishment Fee</dt><dd>An upfront fee included in the APR calculation.</dd></div> <div id='KJE-DOTHER_FEES-' ><dt>Other fees</dt><dd>Fees included in the APR calculation. These fees can vary by lender but, at a minimum, usually includes prepaid interest.</dd></div> <div id='KJE-D-OTHER_COSTS' ><dt>Other costs</dt><dd>Any other costs that should be included in the APR calculation.</dd></div> <div id='KJE-D-' ><dt>Monthly loan payment</dt><dd>Monthly principal and interest payment (PI).</dd></div> <div id='KJE-D-ANNUAL_PERCENTAGE_RATE' ><dt>Annual percentage rate (APR)</dt><dd>A standard calculation used by lenders. It is designed to help borrowers compare different loan options. For example: a loan with a lower stated interest rate may be a bad value if its fees are too high. Likewise, a loan with a higher stated rate and very low fees could be an exceptional value. APR calculations incorporate these fees into a single rate. You can then compare loans with different fees, rates or different terms.</dd></div> <div id='KJE-D-BALLOON_PAYMENT' ><dt>Balloon payment</dt><dd>This is the total final payment for all loans that are amortized over a period of time longer than the loan term. The balloon payment is total interest and principal balance due at the end of the loan term. (If the loan term is the same as the amortization, this amount is always zero.)</dd></div> ";KJE.ReportText=' <!--HEADING "Loan Comparison Calculator" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>TITLE_MESSAGE</h2>The lowest monthly payment is provided by MSG_LOANBEST_LOAN_BY_PAYMENT at BEST_LOAN_PAYMENT per month. **GRAPH** <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Results Summary</caption> <thead class=\'KJEReportTHeader\'> <tr class=KJEHeaderRow><th class="KJEHeading KJECell40">&nbsp; </th><th class="KJEHeading KJECell20" scope=\'col\'> MSG_LOAN1 </th><th class="KJEHeading KJECell20" scope=\'col\'> MSG_LOAN2 </th><th class="KJEHeading KJECell20" scope=\'col\'> MSG_LOAN3 </th></tr> </thead> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Monthly loan payment </th><td class="KJELabel KJECellBorder"> MONTHLY_LOAN_PAYMENT1 </td><td class="KJELabel KJECellBorder"> MONTHLY_LOAN_PAYMENT2 </td><td class="KJELabel"> MONTHLY_LOAN_PAYMENT3 </td></tr> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Annual percentage rate (APR) </th><td class="KJELabel KJECellBorder"> ANNUAL_PERCENTAGE_RATE1 </td><td class="KJELabel KJECellBorder"> ANNUAL_PERCENTAGE_RATE2 </td><td class="KJELabel"> ANNUAL_PERCENTAGE_RATE3 </td></tr> </tfoot> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Loan amount </th><td class="KJECell KJECellBorder"> LOAN_AMOUNT1 </td><td class="KJECell KJECellBorder"> LOAN_AMOUNT2 </td><td class="KJECell"> LOAN_AMOUNT3 </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Loan term </th><td class="KJECell KJECellBorder"> LOAN_TERM1 </td><td class="KJECell KJECellBorder"> LOAN_TERM2 </td><td class="KJECell"> LOAN_TERM3 </td></tr> </tbody> <!--ADDITIONAL_OUTPUT--> </table> </div> <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Your input values</caption> <thead class=\'KJEReportTHeader\'> <tr class=KJEHeaderRow><th class="KJEHeading KJECell40">&nbsp; </th><th class="KJEHeading KJECell20" scope=\'col\'> MSG_LOAN1 </th><th class="KJEHeading KJECell20" scope=\'col\'>MSG_LOAN2 </th><th class="KJEHeading KJECell20" scope=\'col\'> MSG_LOAN3 </th></tr> </thead> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total closing costs </th><td class="KJELabel KJECellBorder"> CLOSING_COSTS1 </td><td class="KJELabel KJECellBorder"> CLOSING_COSTS2 </td><td class="KJELabel"> CLOSING_COSTS3 </td></tr> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Balloon payment </th><td class="KJELabel KJECellBorder"> BALLOON_PAYMENT1 </td><td class="KJELabel KJECellBorder"> BALLOON_PAYMENT2 </td><td class="KJELabel"> BALLOON_PAYMENT3 </td></tr> </tfoot> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Loan amount </th><td class="KJECell KJECellBorder"> LOAN_AMOUNT1 </td><td class="KJECell KJECellBorder"> LOAN_AMOUNT2 </td><td class="KJECell"> LOAN_AMOUNT3 </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Interest rate </th><td class="KJECell KJECellBorder"> INTEREST_RATE1 </td><td class="KJECell KJECellBorder"> INTEREST_RATE2 </td><td class="KJECell"> INTEREST_RATE3 </td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Loan term </th><td class="KJECell KJECellBorder"> LOAN_TERM1 </td><td class="KJECell KJECellBorder"> LOAN_TERM2 </td><td class="KJECell"> LOAN_TERM3 </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Amortization </th><td class="KJECell KJECellBorder"> AMORTIZATION1 </td><td class="KJECell KJECellBorder"> AMORTIZATION2 </td><td class="KJECell"> AMORTIZATION3 </td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Brokerage fee </th><td class="KJECell KJECellBorder"> ORIGINATION_FEE1 </td><td class="KJECell KJECellBorder"> ORIGINATION_FEE2 </td><td class="KJECell"> ORIGINATION_FEE3 </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Establishment Fee </th><td class="KJECell KJECellBorder"> COMMITMENT_FEE1 </td><td class="KJECell KJECellBorder"> COMMITMENT_FEE2 </td><td class="KJECell"> COMMITMENT_FEE3 </td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Other fees </th><td class="KJECell KJECellBorder"> OTHER_FEES1</td><td class="KJECell KJECellBorder"> OTHER_FEES2</td><td class="KJECell"> OTHER_FEES3</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Other costs </th><td class="KJECell KJECellBorder"> OTHER_COSTS1 </td><td class="KJECell KJECellBorder"> OTHER_COSTS2 </td><td class="KJECell"> OTHER_COSTS3 </td></tr> </tbody> </table> </div> ';
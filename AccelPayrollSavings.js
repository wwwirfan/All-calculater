KJE.AccelSavingsCalc=function(b,a){this.ANNUAL_MAX=[b,b];this.CATCHUP_MAX=[a,a];this.MATCH_PERC=0;this.nLength=0;this.CONTRIBUTE_MAXIMUM=0;this.CONTRIBUTE_ANNUAL=0;this.CONTRIBUTE_PERIODIC=0;this.EMPLOYER_ANNUAL=0;this.EMPLOYER_PERIODIC=0;this.TOTAL_AMOUNT_EMPLOYER_PAID_IN=0;this.TOTAL_AMOUNT_YOU_HAVE_PAID_IN=0;this.CONTRIBUTE_TOTAL=0;this.TOTAL_AT_END_OF_INVESTMENT=0;this.NOMATCH_AT_END_OF_INVESTMENT=0;this.EMPLOYER_MATCH_PERCENT=0};KJE.AccelSavingsCalc.getEmployerMatchSmart=function(e,b,a){var d=0;if(b==null||a==null){return d}for(var c=0;c<b.length-1;c++){if(e>=b[c]&&e<b[c+1]){d=a[c];break}}if(e>=b[b.length-1]){d=a[a.length-1]}if(e<b[0]){d=0}return KJE.round(d,4)};KJE.AccelSavingsCalc.getEmployerMatch=function(e,f,c,d,b){var a=(Math.min(KJE.round((Math.min(c,f)*e),2),b)*d);return KJE.round(a,2)};KJE.AccelSavingsCalc.prototype.calculate=function(r,C,h,Q,d,e,g,S,X,Y,x,b,B,L){var y=KJE.AccelSavingsCalc.getEmployerMatch;var T=KJE.AccelSavingsCalc.getEmployerMatchSmart;var U=this.CATCHUP_MAX;var G=this.ANNUAL_MAX;var a=this.CONTRIBUTE_MAXIMUM=G[0]+(Q<50?0:U[0]);var J=this.CONTRIBUTE_ANNUAL=Math.min(KJE.round(e*C,2),a);var j=C;var E=e;var i=this.CONTRIBUTE_PERIODIC=KJE.round(J/h,2);if(L&&B){var z=this.EMPLOYER_MATCH_PERCENT=T(e,L,B);var K=this.EMPLOYER_ANNUAL=KJE.round(z*C,2)}else{var K=this.EMPLOYER_ANNUAL=y(j,e,S,g,G[0]+(Q<50?0:U[0]));var z=this.EMPLOYER_MATCH_PERCENT=g}var v=this.EMPLOYER_PERIODIC=KJE.round(K/h,2);var V=this.CONTRIBUTE_TOTAL=v+i;var m=0;var t=0;var f=Math.round(d);var o=this.DR_INTEREST=KJE.FloatArray(f);var u=this.DR_BALANCE=KJE.FloatArray(f);var w=this.DR_INTEREST_NOMATCH=KJE.FloatArray(f);var O=this.DR_BALANCE_NOMATCH=KJE.FloatArray(f);var N=this.DR_MATCH=KJE.FloatArray(f);var D=this.DR_CONTRIBUTE=KJE.FloatArray(f);var q=this.DR_MATCH_PERC=KJE.FloatArray(f);var W=h*d;var p=0;var I=0;var H=0;var M=0;var l=0;var F=r;var k=r;var R=V;var c=i;D[l]=J;N[l]=K;q[l]=z;var A=0;var s=0;for(var P=0;P<W;P++){F+=R;M=X*F;I+=M;F+=M;k+=c;H=X*k;p+=H;k+=H;m+=R-c;t+=c;if(((P+1)%h)==0){j*=KJE.round(1+Y,2);u[l]=F;o[l]=I;I=0;O[l]=k;w[l]=p;p=0;l++;A=((l)<G.length?(l):G.length-1);s=G[A]+(Q+l<50?0:U[A]);E=KJE.round(E+x,4);if(E>b){E=b}D[l]=KJE.round(Math.min(KJE.round(E*j,2),s),0);if(L&&B){q[l]=T(E,L,B);N[l]=KJE.round(q[l]*j,2)}else{N[l]=y(j,E,S,z,s);q[l]=z}c=KJE.round(D[l]/h,2);R=KJE.round(c+N[l]/h,2)}}this.TOTAL_AT_END_OF_INVESTMENT=F;this.NOMATCH_AT_END_OF_INVESTMENT=k;this.TOTAL_AMOUNT_EMPLOYER_PAID_IN=m;this.TOTAL_AMOUNT_YOU_HAVE_PAID_IN=t};KJE.AccelPayrollSavingsCalc=function(){this.PLAN_YEAR="2020";this.PLAN_YEAR_MAX=19500;this.PLAN_YEAR_50PLUS=6500;this.PLAN_YEAR_TOTALMAX=this.PLAN_YEAR_MAX+this.PLAN_YEAR_50PLUS;this.MSG_EMPLOYER_MATCH_DESC=KJE.parameters.get("MSG_EMPLOYER_MATCH_DESC","This is a EMPLOYER_MATCH employer match up to a maximum of EMPLOYER_MAX of your annual salary.");this.MSG_ERROR1=KJE.parameters.get("MSG_ERROR1","Contribution accelerator stop can't be less the normal contribution");this.COMPOUND_INTEREST=1;this.SALARY_INCREASE=0;this.EMPLOYER_MATCHES=KJE.parameters.get("ARRAY_EMPLOYER_MATCHES",null);this.EMPLOYER_MATCH_RANGES=KJE.parameters.get("ARRAY_EMPLOYER_MATCH_RANGES",null);this.CONTRIBUTE_MAXIMUM=0;this.GROSS_EARNINGS=0;this.ANNUAL_SALARY=0;this.RSC=new Array(2);this.RSC[0]=new KJE.AccelSavingsCalc(this.PLAN_YEAR_MAX,this.PLAN_YEAR_50PLUS);this.RSC[1]=new KJE.AccelSavingsCalc(this.PLAN_YEAR_MAX,this.PLAN_YEAR_50PLUS);this.RETIRE_PLAN_PERCENT=0;this.DOLLARS_DIFFERENCE=0;this.YEARS_UNTIL_RETIREMENT=0;this.sSchedule=new KJE.Repeating()};KJE.AccelPayrollSavingsCalc.prototype.clear=function(){this.STARTING_AMOUNT=0;this.RATE_OF_RETURN=0;this.CURRENT_AGE=0;this.AGE_OF_RETIREMENT=0;this.SMART_PLAN=0;this.SMART_PLAN_STOP=0;this.EMPLOYER_MATCH=0;this.EMPLOYER_MAX=0};KJE.AccelPayrollSavingsCalc.prototype.calculate=function(t){var j=KJE;var d=this.STARTING_AMOUNT;var h=this.RATE_OF_RETURN;var b=this.COMPOUND_INTEREST;var o=this.CURRENT_AGE;var u=this.AGE_OF_RETIREMENT;var l=this.SMART_PLAN;var q=this.SMART_PLAN_STOP;var f=this.RSC;var m=this.PAY_FREQUENCY=KJE.Default.PAY_FREQUENCY[this.PAY_PERIOD];if(q<this.RETIRE_PLAN_PERCENT){throw (this.MSG_ERROR1)}var c=this.ANNUAL_SALARY=m*this.GROSS_EARNINGS;var g=this.YEARS_UNTIL_RETIREMENT=u-o;var s=0;if(b==m){s=(h/m)/100}else{var e=0;if(b==1){e=h/100}else{e=1/Math.pow((1+h/(b*100)),(-1*b))-1}s=Math.pow(1+(e),1/m)-1}this.SMART_CALC=(this.EMPLOYER_MATCHES!=null&&this.EMPLOYER_MATCH_RANGES!=null);f[0].calculate(d,c,m,o,g,this.RETIRE_PLAN_PERCENT/100,this.EMPLOYER_MATCH/100,this.EMPLOYER_MAX/100,s,this.SALARY_INCREASE/100,0,this.RETIRE_PLAN_PERCENT/100,this.EMPLOYER_MATCHES,this.EMPLOYER_MATCH_RANGES);f[1].calculate(d,c,m,o,g,this.RETIRE_PLAN_PERCENT/100,this.EMPLOYER_MATCH/100,this.EMPLOYER_MAX/100,s,this.SALARY_INCREASE/100,l/100,q/100,this.EMPLOYER_MATCHES,this.EMPLOYER_MATCH_RANGES);this.DOLLARS_DIFFERENCE=f[1].TOTAL_AT_END_OF_INVESTMENT-f[0].TOTAL_AT_END_OF_INVESTMENT;this.DS_BALANCE=f[0].DR_BALANCE;this.DS_BALANCE2=f[1].DR_BALANCE;var p=this.DS_BALANCE.length;var n=this.cats=KJE.FloatArray(p);var a=!(this.EMPLOYER_MATCH>0&&this.EMPLOYER_MAX>0)&&!this.SMART_CALC;if(t){var k=this.sSchedule;k.clearRepeat();k.addHeader("&nbsp;",{sCell:KJE._sHeadingUnderline,sContent:KJE.replace("RETIRE_PLAN_PERCENT",j.percent(this.RETIRE_PLAN_PERCENT/100,1),k.sReportCol("Normal Contributions at RETIRE_PLAN_PERCENT",1)),sFormat:"COLSPAN="+(a?"2":"3")},{sCell:KJE._sHeadingUnderline,sContent:KJE.replace("RETIRE_PLAN_PERCENT",j.percent(this.RETIRE_PLAN_PERCENT/100,1),k.sReportCol("Contribution Accelerator Starting at RETIRE_PLAN_PERCENT",2)),sFormat:"COLSPAN="+(a?"2":"4")});k.addHeader(k.sReportCol("Age",3),k.sReportCol("Your Contributions",4),(a?null:k.sReportCol("Employer Match",5)),k.sReportCol("Ending Balance",6),k.sReportCol("Your Contributions",4),(a?null:k.sReportCol("Employer Match",5)),k.sReportCol("Ending Balance",6));k.addRepeat("&nbsp;","&nbsp;",(a?null:"&nbsp;"),j.dollars(d),"&nbsp;",(a?null:"&nbsp;"),j.dollars(d))}for(var r=0;r<p;r++){n[r]=""+((r+o));if(t){k.addRepeat(r+o,j.dollars(f[0].DR_CONTRIBUTE[r]),(a?null:j.dollars(f[0].DR_MATCH[r])+(this.SMART_CALC?" ("+KJE.nbr(f[0].DR_MATCH_PERC[r]*100,1,KJE.sPP,KJE.sPS,false,false)+")":"")),j.dollars(f[0].DR_BALANCE[r]),j.dollars(f[1].DR_CONTRIBUTE[r]),(a?null:j.dollars(f[1].DR_MATCH[r])+(this.SMART_CALC?" ("+KJE.nbr(f[1].DR_MATCH_PERC[r]*100,1,KJE.sPP,KJE.sPS,false,false)+")":"")),j.dollars(f[1].DR_BALANCE[r]))}}this.EMPLOYER_MATCH=f[0].MATCH_PERC};KJE.AccelPayrollSavingsCalc.prototype.formatReport=function(c){var d=KJE;var b=this.RSC[0];var a=this.RSC[1];var e=c;e=KJE.replace("MSG_EMPLOYER_MATCH_DESC",this.MSG_EMPLOYER_MATCH_DESC,e);e=KJE.replace("GROSS_EARNINGS",d.dollars(this.GROSS_EARNINGS),e);e=KJE.replace("CONTRIBUTE_MAXIMUM",d.dollars(this.CONTRIBUTE_MAXIMUM)+"*",e);e=KJE.replace("ANNUAL_SALARY",d.dollars(this.ANNUAL_SALARY),e);e=KJE.replace("RETIRE_PLAN_PERCENT",d.percent(this.RETIRE_PLAN_PERCENT/100,2),e);e=KJE.replace("SMART_PLAN_STOP",d.percent(this.SMART_PLAN_STOP/100),e);e=KJE.replace("SMART_PLAN",d.percent(this.SMART_PLAN/100,2),e);e=KJE.replace("YEARS_UNTIL_RETIREMENT",d.number(this.YEARS_UNTIL_RETIREMENT,0),e);e=KJE.replace("CURRENT_AGE",d.number(this.CURRENT_AGE,0),e);e=KJE.replace("AGE_OF_RETIREMENT",d.number(this.AGE_OF_RETIREMENT,0),e);e=KJE.replace("EMPLOYER_MATCH",d.percent(this.EMPLOYER_MATCH,0),e);e=KJE.replace("CONTRIBUTE_DOLLARS2",d.dollars(a.CONTRIBUTE_DOLLARS,2),e);e=KJE.replace("CONTRIBUTE_ANNUAL2",d.dollars(a.CONTRIBUTE_ANNUAL,2),e);e=KJE.replace("CONTRIBUTE_PERIODIC2",d.dollars(a.CONTRIBUTE_PERIODIC,2),e);e=KJE.replace("CONTRIBUTE_TOTAL2",d.dollars(a.CONTRIBUTE_TOTAL,2),e);e=KJE.replace("CONTRIBUTE_PERIODIC_TOTAL2",d.dollars(a.CONTRIBUTE_PERIODIC+a.EMPLOYER_PERIODIC,2),e);e=KJE.replace("EMPLOYER_ANNUAL2",d.dollars(a.EMPLOYER_ANNUAL,2),e);e=KJE.replace("EMPLOYER_PERIODIC2",d.dollars(a.EMPLOYER_PERIODIC,2),e);e=KJE.replace("TOTAL_AMOUNT_EMPLOYER_PAID_IN2",d.dollars(a.TOTAL_AMOUNT_EMPLOYER_PAID_IN,2),e);e=KJE.replace("TOTAL_AMOUNT_YOU_HAVE_PAID_IN2",d.dollars(a.TOTAL_AMOUNT_YOU_HAVE_PAID_IN,2),e);e=KJE.replace("TOTAL_AT_END_OF_INVESTMENT2",d.dollars(a.TOTAL_AT_END_OF_INVESTMENT),e);e=KJE.replace("NOMATCH_AT_END_OF_INVESTMENT2",d.dollars(a.NOMATCH_AT_END_OF_INVESTMENT),e);e=KJE.replace("CONTRIBUTE_DOLLARS",d.dollars(b.CONTRIBUTE_DOLLARS,2),e);e=KJE.replace("CONTRIBUTE_ANNUAL",d.dollars(b.CONTRIBUTE_ANNUAL,2),e);e=KJE.replace("CONTRIBUTE_PERIODIC",d.dollars(b.CONTRIBUTE_PERIODIC,2),e);e=KJE.replace("CONTRIBUTE_TOTAL",d.dollars(b.CONTRIBUTE_TOTAL,2),e);e=KJE.replace("CONTRIBUTE_PERIODIC_TOTAL",d.dollars(b.CONTRIBUTE_PERIODIC+b.EMPLOYER_PERIODIC,2),e);e=KJE.replace("EMPLOYER_ANNUAL",d.dollars(b.EMPLOYER_ANNUAL,2),e);e=KJE.replace("EMPLOYER_PERIODIC",d.dollars(b.EMPLOYER_PERIODIC,2),e);e=KJE.replace("TOTAL_AMOUNT_EMPLOYER_PAID_IN",d.dollars(b.TOTAL_AMOUNT_EMPLOYER_PAID_IN,2),e);e=KJE.replace("TOTAL_AMOUNT_YOU_HAVE_PAID_IN",d.dollars(b.TOTAL_AMOUNT_YOU_HAVE_PAID_IN,2),e);e=KJE.replace("TOTAL_AT_END_OF_INVESTMENT",d.dollars(b.TOTAL_AT_END_OF_INVESTMENT),e);e=KJE.replace("NOMATCH_AT_END_OF_INVESTMENT",d.dollars(b.NOMATCH_AT_END_OF_INVESTMENT),e);e=KJE.replace("SALARY_INCREASE",d.percent(this.SALARY_INCREASE/100,1),e);e=KJE.replace("DIFF_AT_END_OF_INVESTMENT",d.dollars(a.TOTAL_AT_END_OF_INVESTMENT-b.TOTAL_AT_END_OF_INVESTMENT),e);e=KJE.replace("STARTING_AMOUNT",d.dollars(this.STARTING_AMOUNT),e);e=KJE.replace("PAY_LABEL",KJE.Default.PAY_PERIODS[this.PAY_PERIOD],e);e=KJE.replace("RATE_OF_RETURN",d.percent(this.RATE_OF_RETURN/100,2),e);e=KJE.replace("PLAN_YEAR_MAX",d.dollars(this.PLAN_YEAR_MAX),e);e=KJE.replace("PLAN_YEAR_50PLUS",d.dollars(this.PLAN_YEAR_50PLUS),e);e=KJE.replace("PLAN_YEAR_TOTALMAX",d.dollars(this.PLAN_YEAR_TOTALMAX),e);e=KJE.replace("PLAN_YEAR",this.PLAN_YEAR,e);e=e.replace("**REPEATING GROUP**",this.sSchedule.getRepeat());this.sSchedule.clearRepeat();return e};KJE.Default.PAY_WEEKLY=0;KJE.Default.PAY_BIWEEKLY=1;KJE.Default.PAY_BIMONTHLY=2;KJE.Default.PAY_MONTHLY=3;KJE.Default.PAY_ANNUAL=4;KJE.Default.PAY_PERIOD_IDs=[KJE.Default.PAY_WEEKLY,KJE.Default.PAY_BIWEEKLY,KJE.Default.PAY_BIMONTHLY,KJE.Default.PAY_MONTHLY,KJE.Default.PAY_ANNUAL];KJE.Default.PAY_PERIODS=["Weekly","Every other week","Twice a month","Monthly","Annually"];KJE.Default.PAY_FREQUENCY=[52,26,24,12,1];KJE.Default.getPayPeriodDrop=function(b,a,c){return KJE.getDropBox(b,KJE.parameters.get(b,(!a?KJE.Default.PAY_BIWEEKLY:a)),KJE.Default.PAY_PERIOD_IDs,KJE.Default.PAY_PERIODS,c)};KJE.CalcName="Retirement Account Contribution Accelerator";KJE.CalcType="AccelPayrollSavings";KJE.CalculatorTitle="Retirement Account Contribution Accelerator";KJE.parseInputs=function(a){a=KJE.replace("**PAY_PERIOD**",KJE.Default.getPayPeriodDrop("PAY_PERIOD",KJE.Default.PAY_MONTHLY),a);return a};KJE.initialize=function(){KJE.CalcControl=new KJE.AccelPayrollSavingsCalc();KJE.GuiControl=new KJE.AccelPayrollSavings(KJE.CalcControl)};KJE.AccelPayrollSavings=function(j){var d=KJE;var c=KJE.gLegend;var f=KJE.inputs.items;this.GRAPH_LABEL_2=KJE.parameters.get("MSG_GRAPH_LABEL_2","Without CA");this.GRAPH_LABEL_3=KJE.parameters.get("MSG_GRAPH_LABEL_3","With CA");var h=KJE.parameters.get("RETIRE_PLAN_DECIMALS",1);KJE.PercentSlider("RETIRE_PLAN_PERCENT","Current employee contributions",KJE.parameters.get("RETIRE_PLAN_PERCENT_MIN",1),KJE.parameters.get("RETIRE_PLAN_PERCENT_MAX",50),h);KJE.PercentSlider("SMART_PLAN_STOP","Contribution accelerator stops",KJE.parameters.get("SMART_PLAN_STOP_MIN",1),KJE.parameters.get("SMART_PLAN_STOP_MAX",50),h,1);KJE.DollarSlider("GROSS_EARNINGS","Gross pay",1,1000000);KJE.PercentSlider("SALARY_INCREASE","Annual salary increase",-12,12,1);KJE.DollarSlider("STARTING_AMOUNT","Current account balance",0,1000000);KJE.InvestRateSlider("RATE_OF_RETURN","Annual rate of return");KJE.NumberSlider("AGE_OF_RETIREMENT","Age at retirement",20,90,0);KJE.NumberSlider("CURRENT_AGE","Current age",20,90,0);KJE.DropBox("PAY_PERIOD","Pay period");KJE.PercentSlider("SMART_PLAN","Contribution accelerator",KJE.parameters.get("SMART_PLAN_MIN",0),KJE.parameters.get("SMART_PLAN_MAX",6),h,1);KJE.PercentSlider("EMPLOYER_MAX","Employer maximum",0,100,2,1);KJE.PercentSlider("EMPLOYER_MATCH","Employer match",0,400,2,1);KJE.Label("EMPLOYER_MATCH_LBL","Employer match");var g=KJE.gNewGraph(KJE.gLINE,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_TITLE","Accelerated contributions could increase your retirement savings by KJE3."));g._legend._iOrientation=(c.TOP_RIGHT);g._showItemLabel=false;g._showItemLabelOnTop=true;var b=KJE.parameters.get("MSG_DROPPER_TITLE","401(k) Employee Savings Plan:");KJE.addDropper(new KJE.Dropper("INPUTS",true,b,b),KJE.colorList[0]);var a=KJE.parameters.get("MSG_DROPPER3_TITLE","401(k) Contribution Accelerator:");KJE.addDropper(new KJE.Dropper("INPUTS3",true,a,a),KJE.colorList[0]);if(KJE.DropperDefined("INPUTS2")){var k=KJE.parameters.get("MSG_DROPPER2_TITLE","401(k) Employer Match:");var e=KJE.parameters.get("MSG_DROPPER_CLOSETITLE","Employer match of KJE1 up to KJE2 of your salary.");var i=function(){return k+KJE.subText(KJE.getKJEReplaced(e,f.EMPLOYER_MATCH.getFormatted(),f.EMPLOYER_MAX.getFormatted()),"KJECenter")};KJE.addDropper(new KJE.Dropper("INPUTS2",false,k,i),KJE.colorList[0])}};KJE.AccelPayrollSavings.prototype.setValues=function(b){var a=KJE.inputs.items;b.SMART_PLAN=a.SMART_PLAN.getValue();b.SMART_PLAN_STOP=a.SMART_PLAN_STOP.getValue();b.STARTING_AMOUNT=a.STARTING_AMOUNT.getValue();b.AGE_OF_RETIREMENT=a.AGE_OF_RETIREMENT.getValue();b.CURRENT_AGE=a.CURRENT_AGE.getValue();b.RATE_OF_RETURN=a.RATE_OF_RETURN.getValue();b.RETIRE_PLAN_PERCENT=a.RETIRE_PLAN_PERCENT.getValue();b.SALARY_INCREASE=a.SALARY_INCREASE.getValue();b.GROSS_EARNINGS=a.GROSS_EARNINGS.getValue();b.PAY_PERIOD=a.PAY_PERIOD.getValue();b.EMPLOYER_MAX=a.EMPLOYER_MAX.getValue();b.EMPLOYER_MATCH=a.EMPLOYER_MATCH.getValue()};KJE.AccelPayrollSavings.prototype.refresh=function(e){var d=KJE;var c=KJE.gLegend;var b=KJE.inputs.items;var a=KJE.gGraphs[0];a.removeAll();a.setGraphCategories(e.cats);a.add(new KJE.gGraphDataSeries(e.DS_BALANCE2,this.GRAPH_LABEL_3,a.getColor(2)," "+d.dollars(e.RSC[1].TOTAL_AT_END_OF_INVESTMENT)));a.add(new KJE.gGraphDataSeries(e.DS_BALANCE,this.GRAPH_LABEL_2,a.getColor(1)," "+d.dollars(e.RSC[0].TOTAL_AT_END_OF_INVESTMENT)));a.setTitleTemplate(d.percent(e.RETIRE_PLAN_PERCENT[0]/100,1),d.percent(e.RETIRE_PLAN_PERCENT[1]/100,1),d.dollars(e.DOLLARS_DIFFERENCE));a.paint();if(b.EMPLOYER_MATCH_LBL){b.EMPLOYER_MATCH_LBL.setText(d.percent(e.RSC[0].EMPLOYER_MATCH_PERCENT,2))}};KJE.InputScreenText=" <div id=KJE-D-INPUTS3><div id=KJE-P-INPUTS3>Input information:</div></div> <div id=KJE-E-INPUTS3 > <div id='KJE-C-RETIRE_PLAN_PERCENT'><input id='KJE-RETIRE_PLAN_PERCENT' /></div> <div id='KJE-C-SMART_PLAN'><input id='KJE-SMART_PLAN' /></div> <div id='KJE-C-SMART_PLAN_STOP'><input id='KJE-SMART_PLAN_STOP' /></div> <div style=\"height:10px\"></div> </div> <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Input information:</div></div> <div id=KJE-E-INPUTS > <div id='KJE-C-GROSS_EARNINGS'><input id='KJE-GROSS_EARNINGS' /></div> <div id='KJE-C-PAY_PERIOD'>**PAY_PERIOD**</div> <div id='KJE-C-SALARY_INCREASE'><input id='KJE-SALARY_INCREASE' /></div> <div id='KJE-C-CURRENT_AGE'><input id='KJE-CURRENT_AGE' /></div> <div id='KJE-C-AGE_OF_RETIREMENT'><input id='KJE-AGE_OF_RETIREMENT' /></div> <div id='KJE-C-STARTING_AMOUNT'><input id='KJE-STARTING_AMOUNT' /></div> <div id='KJE-C-RATE_OF_RETURN'><input id='KJE-RATE_OF_RETURN' /></div> <div style=\"height:10px\"></div> </div> <div id=KJE-D-INPUTS2><div id=KJE-P-INPUTS2>Input information:</div></div> <div id=KJE-E-INPUTS2 > <div id='KJE-C-EMPLOYER_MATCH'><input id='KJE-EMPLOYER_MATCH' /></div> <div id='KJE-C-EMPLOYER_MAX'><input id='KJE-EMPLOYER_MAX' /></div> <div style=\"height:10px\"></div> </div> **GRAPH1** ";KJE.DefinitionText=" <div><dt>Annual contribution limits</dt><dd>Your total contribution for one year is based on your annual salary times the percent you contribute. While increasing your retirement account savings does lower your take home pay, it also lowers your Federal income tax withholding. The impact on your paycheck might be less than you think. While your plan may not have a deferral percentage limit, this calculator limits deferrals to 80% to account for FICA (Social Security and Medicare) taxes. Please note that your 401(k) or 403(b) plan contributions may be limited to less than 80% of your income. Check with your plan administrator for details. **PLAN_CONTRIBUTION_MAX**</p> <p>It is important to note that some employees are subject to another form of contribution limitations. Employees classified as 'Highly Compensated' may be subject to contribution limits based on their employer's overall participation. **PLAN_HIGHLY_COMPENSATED** Participants in 403(b) and 457(b) plans may also be able to make additional special contributions.</dd></div> <div id='KJE-D-GROSS_EARNINGS' ><dt>Gross pay</dt><dd>This is your gross pay, before any deductions, for the pay period. Please enter a dollar amount from $1 to $1,000,000.</dd></div> <div id='KJE-D-PAY_PERIOD' ><dt>Pay period</dt><dd>This is how often you are paid. Your selections are: Weekly (52 paychecks per year), Bi-week (26 paychecks per year), Semi-monthly (24 paychecks per year), Monthly (12 paychecks per year) and Annually (1 paycheck per year).</dd></div> <div id='KJE-D-STARTING_AMOUNT' ><dt>Current account balance</dt><dd>The current balance of this account.</dd></div> <div id='KJE-D-RATE_OF_RETURN' ><dt>Annual rate of return</dt><dd>The annual rate of return for your account. This calculator assumes that your return is compounded annually and your deposits are made monthly. **ROR_DEFINITION**</dd></div> <div id='KJE-D-CURRENT_AGE' ><dt>Current age</dt><dd>Your current age.</dd></div> <div id='KJE-D-AGE_OF_RETIREMENT' ><dt>Age at retirement</dt><dd>Age you wish to retire. This calculator assumes that the year you retire, you do not make any contributions. So if you retire at age 65, your last contribution occurs when you are actually 64.</dd></div> <div id='KJE-D-SALARY_INCREASE' ><dt>Expected annual salary increase</dt><dd>The annual percentage you expect your salary to increase. We assume that your salary will continue to increase at this rate until you retire.</dd></div> <div id='KJE-D-RETIRE_PLAN_PERCENT' ><dt>Current contribution rate</dt><dd>This is the percent of your gross income you put into a taxable deferred retirement account such as a 401(k), 403(b) or 457. While increasing your retirement account savings does lower your take home pay, it may also lower your Federal income tax withholding. <p>While your plan may not have a deferral percentage limit, this calculator limits deferrals to 80% to account for FICA (Social Security and Medicare) taxes. Please note that your plan's contributions may be limited to less than 80% of your income. Check with your plan administrator for details. **PLAN_CONTRIBUTION_MAX**</dd></div> <div id='KJE-D-SMART_PLAN' ><dt>Contribution Accelerator percentage</dt><dd>This is amount that we will increase your employee contribution percentage each year. The annual increase will continue until you have reached your plan's specified maximum percent, or the annual contribution limit (see below).</dd></div> <div id='KJE-D-SMART_PLAN_STOP' ><dt>Contribution Accelerator percentage stops</dt><dd>This is the maximum contribution that your plan allows Contribution Accelerator to increase your contribution rate. If your plan caps Contribution Accelerator at 10%, example, enter this number and your contribution rate will not increase beyond 10% as a result of Contribution Accelerator.</dd></div> <div id='KJE-D-EMPLOYER_MATCH' ><dt>Employer match</dt><dd>An employer match is in addition to your annual contributions. <!--SALARY_MATCH-->It is based on a percentage of your annual contributions. This range can be anywhere from 0% to 100%. <p>For example, let's assume the employer matches 50% of the employee's contributions up to 6% of their salary. The employee earns $100,000 per year and contributes 10%. The results would be: <UL> <li>$10,000 from the employee <li>$3,000 from the employer (which is 50% of $6,000 or 6% of the annual salary) <li><strong>Total: $13,000</strong> </UL> <p>Please read the definition for 'Employer maximum' for a detailed description of maximum employer matching contributions. It is also important to note employer contributions do not affect the maximum amount allowed to be contributed by an employee. Matching contributions can be subject to a vesting schedule. See your plan information for details.</dd></div> <div id='KJE-D-EMPLOYER_MAX' ><dt>Employer maximum</dt><dd>This is the maximum percent of your salary matched by your employer regardless of the amount you decide to contribute. For example, let's assume your employer has a 50% match, up to a maximum of 6% of your annual salary. If you have an annual salary of $25,000 and contribute 6%, your annual contribution is $1,500. With a 50% match, your employer will add another $750 to your 401(k) account. If you increase your contribution to 10%, your annual contribution is $2,500 per year. Your employer match, however, is limited to the first 6% of your salary and remains at $750. <!--SALARY_MATCH_END--></dd></div> ";KJE.ReportText=' <!--HEADING "Contribution Accelerator Calculator" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>Contribution Accelerator can increase your final balance by DIFF_AT_END_OF_INVESTMENT</h2> Your contributions start at RETIRE_PLAN_PERCENT per year and increase by SMART_PLAN per year until they reach a maximum of SMART_PLAN_STOP. In addition to the automatic annual escalation, you can also initiate increases of your own, at any time, to further accelerate your account growth.* By escalating your contributions, your final balance increases from TOTAL_AT_END_OF_INVESTMENT to TOTAL_AT_END_OF_INVESTMENT2 at your retirement.<p>**GRAPH**<p> <div class=KJEReportTableDiv><table class=KJEReportTable> <caption class=\'KJEHeaderRow KJEHeading\'>Results Summary</caption> <thead class=\'KJEReportTHeader\'> <tr class=KJEHeaderRow><th class=KJEHeading>&nbsp;</th><th class=KJEHeading scope=\'col\'>Normal Contributions</th><th class=KJEHeading scope=\'col\'>With Contribution Accelerator</th></tr> </thead> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total at age AGE_OF_RETIREMENT </th><td class="KJECellStrong KJECellBorder">TOTAL_AT_END_OF_INVESTMENT</td><td class="KJECellStrong">TOTAL_AT_END_OF_INVESTMENT2</td></tr> </tfoot> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell40" scope=\'row\'>Gross pay per period</th><td class="KJECell KJECellBorder KJECell30">GROSS_EARNINGS</td><td class="KJECell KJECell30">GROSS_EARNINGS</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Pay period</th><td class="KJECell KJECellBorder">PAY_LABEL</td><td class="KJECell">PAY_LABEL</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Annual salary </th><td class="KJECell KJECellBorder">ANNUAL_SALARY</td><td class="KJECell">ANNUAL_SALARY</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Current account balance </th><td class="KJECell KJECellBorder">STARTING_AMOUNT </td><td class="KJECell">STARTING_AMOUNT </td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Annual rate of return </th><td class="KJECell KJECellBorder">RATE_OF_RETURN </td><td class="KJECell">RATE_OF_RETURN </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Current age </th><td class="KJECell KJECellBorder">CURRENT_AGE</td><td class="KJECell">CURRENT_AGE</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Age at retirement </th><td class="KJECell KJECellBorder">AGE_OF_RETIREMENT</td><td class="KJECell">AGE_OF_RETIREMENT </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Years to retirement </th><td class="KJECell KJECellBorder">YEARS_UNTIL_RETIREMENT </td><td class="KJECell">YEARS_UNTIL_RETIREMENT </td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Expected annual salary increase </th><td class="KJECell KJECellBorder" valign=TOP> SALARY_INCREASE</td><td class="KJECell" valign=TOP> SALARY_INCREASE</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Current employee contributions </th><td class="KJECell KJECellBorder" > RETIRE_PLAN_PERCENT</td><td class="KJECell">RETIRE_PLAN_PERCENT</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>&nbsp; </th><td class="KJECell KJECellBorder" >&nbsp;</td><td class="KJECell">with a SMART_PLAN Contribution Accelerator annual increases up to a maximum of SMART_PLAN_STOP*</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Your first year contribution* </th><td class="KJECell KJECellBorder"> CONTRIBUTE_ANNUAL</td><td class="KJECell"> CONTRIBUTE_ANNUAL2</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total you will contribute </th><td class="KJECell KJECellBorder"> TOTAL_AMOUNT_YOU_HAVE_PAID_IN </td><td class="KJECell"> TOTAL_AMOUNT_YOU_HAVE_PAID_IN2 </td></tr> </tbody> </table> </div> <div class="KJEInset"> <P class=KJEFooter>*The annual maximum for PLAN_YEAR is PLAN_YEAR_MAX. Employees 50 or over can deposit an additional PLAN_YEAR_50PLUS \'catch-up\' contribution into their account. The calculator will only allow contributions by the employee up to this limit. It is also important to note that employer contributions do not affect an employee\'s maximum annual contribution limit. The maximum contributions and "catch-up" provisions are automatically included in your results. This is the total for the first year only, expected salary changes and Contribution Accelerator percentage increases will change your annual contributions.</P> </div> <h2 class=\'KJEScheduleHeader KJEFontHeading\'>Account Balance by Year</h2> **REPEATING GROUP** ';
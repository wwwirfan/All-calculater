KJE.DatePeriods=function(){this.ERROR_MSG1=KJE.parameters.get("ERROR_DATE_PERIOD_MSG1","Future value date must be after present value date");this.ERROR_MSG2=KJE.parameters.get("ERROR_DATE_PERIOD_MSG2","Present date required");this.ERROR_MSG3=KJE.parameters.get("ERROR_DATE_PERIOD_MSG3","Future date required");this.PRESENT_DATE=new Date();this.FUTURE_DATE=new Date();this.PERIOD_FREQUENCY=KJE.DatePeriods.PERIOD_MONTHLY;this.days=0;this.months=0;this.years=0;this.total_days=0;this.period_extra_days=0;this.period_extra_months=0;this.bNoAdditionalDays=false;this.whole_periods=0;this.periods=0};KJE.DatePeriods.prototype.calculate=function(){if(this.PRESENT_DATE==null){throw this.ERROR_MSG2}if(this.FUTURE_DATE==null){throw this.ERROR_MSG3}var e=KJE.DatePeriods.getDays(this.PRESENT_DATE,this.FUTURE_DATE);if(e<=0){throw this.ERROR_MSG1}var i=this.FUTURE_DATE.getFullYear();var k=this.PRESENT_DATE.getFullYear();var n=this.FUTURE_DATE.getMonth();var o=this.PRESENT_DATE.getMonth();var c=this.FUTURE_DATE.getDate();var d=this.PRESENT_DATE.getDate();var q=c-d+1;var b=n-o;var g=i-k;var h=0;var m=0;var f=0;var a=0;var p=this.PERIOD_FREQUENCY;var l=(new Date(k,o+1,0)).getDate();var j=(new Date(i,n+1,0)).getDate();if(d==1&&c==j){q=0;b++}else{if(q<=0){if(c==j){q=l-d+1;if(q>=j){b++;q-=j}}else{b--;q=l-d+c+1;if(q>=j){b++;q-=j}}}}if(b<0){g--;b=12+b}if(b>=12){g++;b-=12}if(KJE.DatePeriods.bPeriodActualDays[p]){m=Math.floor(e/KJE.DatePeriods.iPeriodDays[p]);f=e%KJE.DatePeriods.iPeriodDays[p];a=0;h=(f>0?m+1:m);if(p==KJE.DatePeriods.PERIOD_DAILY){m=e+1;f=0;a=0;h=e+1}}else{if(p==KJE.DatePeriods.PERIOD_YEAR){m=g;f=q;a=b;h=((a+f)>0?m+1:m)}else{m=g*KJE.DatePeriods.iPeriods[p]+Math.floor(b/(12/KJE.DatePeriods.iPeriods[p]));f=q;a=b%Math.floor(12/KJE.DatePeriods.iPeriods[p]);h=((a+f)>0?m+1:m)}f=q}this.days=q;this.months=b;this.years=g;this.periods=m;this.period_extra_days=f;this.period_extra_months=a;this.whole_periods=h;this.bNoAdditionalDays=(h==this.periods);this.total_days=e};KJE.DatePeriods.prototype.getYearsLabel=function(){var b=(this.years>0?KJE.number(this.years)+" "+(this.years>1?KJE.DatePeriods.sPeriodsLabel[KJE.DatePeriods.PERIOD_YEAR]:KJE.DatePeriods.sPeriodLabel[KJE.DatePeriods.PERIOD_YEAR]):"");var a=(this.months>0?KJE.number(this.months)+" "+(this.months>1?KJE.DatePeriods.sPeriodsLabel[KJE.DatePeriods.PERIOD_MONTHLY]:KJE.DatePeriods.sPeriodLabel[KJE.DatePeriods.PERIOD_MONTHLY]):"");var c=(this.days>0?KJE.number(this.days)+" "+(this.days>1?KJE.DatePeriods.sPeriodsLabel[KJE.DatePeriods.PERIOD_DAILY]:KJE.DatePeriods.sPeriodLabel[KJE.DatePeriods.PERIOD_DAILY]):"");b=b+" "+a+" "+c;if(b.indexOf("'")==0){b=b.substring(1,b.length)}return b.trim()};KJE.DatePeriods.prototype.getPeriodsLabel=function(){var b=(this.periods>0?KJE.number(this.periods)+" "+(this.periods>1?KJE.DatePeriods.sPeriodsLabel[this.PERIOD_FREQUENCY]:KJE.DatePeriods.sPeriodLabel[this.PERIOD_FREQUENCY]):"");var a=(this.period_extra_months>0?KJE.number(this.period_extra_months)+" "+(this.period_extra_months>1?KJE.DatePeriods.sPeriodsLabel[KJE.DatePeriods.PERIOD_MONTHLY]:KJE.DatePeriods.sPeriodLabel[KJE.DatePeriods.PERIOD_MONTHLY]):"");var c=(this.period_extra_days>0?KJE.number(this.period_extra_days)+" "+(this.period_extra_days>1?KJE.DatePeriods.sPeriodsLabel[KJE.DatePeriods.PERIOD_DAILY]:KJE.DatePeriods.sPeriodLabel[KJE.DatePeriods.PERIOD_DAILY]):"");b=b+" "+a+" "+c;if(b.indexOf("'")==0){b=b.substring(1,b.length)}return b};KJE.DatePeriods.getDays=function(b,c){var a=(c.getTime()-b.getTime())/(1000*60*60);return Math.round(a/24)};KJE.DatePeriods.PERIOD_DAILY=0;KJE.DatePeriods.PERIOD_WEEKLY=1;KJE.DatePeriods.PERIOD_BIWEEKLY=2;KJE.DatePeriods.PERIOD_MONTHLY=3;KJE.DatePeriods.PERIOD_QUARTER=4;KJE.DatePeriods.PERIOD_SEMIANNUAL=5;KJE.DatePeriods.PERIOD_YEAR=6;KJE.DatePeriods.sPeriodsCompound=["Daily","Weekly","Bi-weekly","Monthly","Quarterly","Semi-annually","Annually"];KJE.DatePeriods.sPeriods=["Daily","Weekly","Bi-weekly","Monthly","Quarterly","Semi-annual","Annual"];KJE.DatePeriods.sPeriodLabel=["day","week","bi-week","month","quarter","semi-annual period","year"];KJE.DatePeriods.sPeriodsLabel=["days","weeks","bi-weeks","months","quarters","semi-annual periods","years"];KJE.DatePeriods.iPeriods=[365,52,26,12,4,2,1];KJE.DatePeriods.iPeriodDays=[1,7,14,30,120,180,365];KJE.DatePeriods.bPeriodActualDays=[true,true,true,false,false,false,false];KJE.DatePeriods.setDropdown=function(){KJE.DatePeriods.DEPOSIT_FREQ_SELECTIONS=[KJE.DatePeriods.sPeriods[KJE.DatePeriods.PERIOD_WEEKLY],KJE.DatePeriods.sPeriods[KJE.DatePeriods.PERIOD_BIWEEKLY],KJE.DatePeriods.sPeriods[KJE.DatePeriods.PERIOD_MONTHLY],KJE.DatePeriods.sPeriods[KJE.DatePeriods.PERIOD_QUARTER],KJE.DatePeriods.sPeriods[KJE.DatePeriods.PERIOD_SEMIANNUAL],KJE.DatePeriods.sPeriods[KJE.DatePeriods.PERIOD_YEAR]];KJE.DatePeriods.DEPOSIT_FREQ_INDEX=[KJE.DatePeriods.PERIOD_WEEKLY,KJE.DatePeriods.PERIOD_BIWEEKLY,KJE.DatePeriods.PERIOD_MONTHLY,KJE.DatePeriods.PERIOD_QUARTER,KJE.DatePeriods.PERIOD_SEMIANNUAL,KJE.DatePeriods.PERIOD_YEAR];KJE.DatePeriods.COMPOUND_FREQ_SELECTIONS=KJE.DatePeriods.DEPOSIT_FREQ_SELECTIONS;KJE.DatePeriods.COMPOUND_FREQ_INDEX=KJE.DatePeriods.DEPOSIT_FREQ_INDEX};KJE.FinFuncDatesCalc=function(){this.dates=new KJE.DatePeriods();this.dMaxRor=1200;this.bCALC_PV_GOAL=KJE.parameters.get("CALC_PV_GOAL",false);this.SHOW_IRR=KJE.parameters.get("SHOW_IRR",false);this.bCALC_ROR=KJE.parameters.get("CALC_ROR",false);this.bCALC_FV=KJE.parameters.get("CALC_FV",false);this.MSG_NONE=KJE.parameters.get("MSG_NONE","(none)");this.SHOW_BY_PERIOD_COUNT=KJE.parameters.get("SHOW_BY_PERIOD_COUNT",this.SHOW_BY_PERIOD_COUNT);this.IRR_TABLE_START="<h2 class='KJEScheduleHeader KJEFontHeading'>The calculation also includes includes the irregular payments and withdrawals shown below</h2>";this.IRR_COUNT=0;this.IRREGULAR_DEPOSIT_TOTAL=0;this.sExceeds=["more than","less than"];this.MSG_ROR="";this.FUTURE_VALUE=0;this.FUTURE_VALUE_DEPOSITS=0;this.FUTURE_VALUE_AMOUNT=0;this.PRESENT_VALUE_DEPOSITS=0;this.PRESENT_VALUE_AMOUNT=0;this.dMin=null;this.dMax=null;this.dPeriodInterestRate=0;this.dMonthlyInterestRate=0;this.dDailyInterestRate=0;this.FUTURE_VALUE_REMAINING=0;this.SHOW_BY_PERIOD_COUNT=3;this.PRESENT_VALUE=0;this.PERIODIC_DEPOSIT=0;this.DEPOSIT_FREQUENCY=0;this.YEARS=0;this.PERIODS=0;this.RATE_OF_RETURN=0;this.COMPOUND_INTEREST=0;this.PAYMENTS_AT_START=true;this.MSG_PERIOD_YEARS="";this.PRESENT_DATE=null;this.FUTURE_DATE=null;this.IRR_COUNT_MAX=30;this.DATE_IRREGULAR=new Array(this.IRR_COUNT_MAX);this.NUMBER_IRREGULAR=KJE.FloatArray(this.IRR_COUNT_MAX);this.irr_dates=new Array(this.IRR_COUNT_MAX);this.dIRRFVCalculated=0;this.sPeriodSelected2="";this.sFmtYears="";this.DD_BALANCE=KJE.FloatArray(3);this.cats=new Array(3);this.catsbold=["","",""];if(this.bCALC_ROR){this.cats[0]=KJE.parameters.get("MSG_CAT_LABEL1","Future value of initial deposit");this.cats[1]=KJE.parameters.get("MSG_CAT_LABEL2","Future value of periodic deposits");this.cats[2]=KJE.parameters.get("MSG_CAT_LABEL3","Total Future Value")}else{this.cats[0]=KJE.parameters.get("MSG_CAT_LABEL1","Present value of this.future amount");this.cats[1]=KJE.parameters.get("MSG_CAT_LABEL2","Present value of periodic deposits");this.cats[2]=KJE.parameters.get("MSG_CAT_LABEL3","Total Present Value")}this.sSchedule=new KJE.Repeating()};KJE.FinFuncDatesCalc.prototype.clear=function(){};KJE.FinFuncDatesCalc.prototype.calculate=function(d){var e=KJE.DatePeriods;var f=this.EnteredDates=new KJE.DatePeriods();if(this.PRESENT_DATE==null&&!d){return}if(this.FUTURE_DATE==null&&!d){return}if(d&&this.PRESENT_DATE==null){d=false;throw ("Present value date must be entered.")}if(d&&this.FUTURE_DATE==null){d=false;throw ("Future value date must be entered.")}this.sPeriodSelected2=e.sPeriodLabel[this.DEPOSIT_FREQUENCY];if(this.FUTURE_DATE!=null&&this.PRESENT_DATE!=null){f.FUTURE_DATE=this.FUTURE_DATE;f.PRESENT_DATE=this.PRESENT_DATE;if(this.PERIODIC_DEPOSIT==0&&(this.bCALC_FV||this.bCALC_ROR)){f.PERIOD_FREQUENCY=this.COMPOUND_INTEREST}else{f.PERIOD_FREQUENCY=this.DEPOSIT_FREQUENCY}f.calculate()}this.IRREGULAR_DEPOSIT_TOTAL=0;this.IRR_COUNT=0;if(this.SHOW_IRR){if(d){var b=this.sSchedule;b.clearRepeat();b.addHeader(b.sReportCol("&nbsp;",1),b.sReportCol("Date",2),b.sReportCol("Amount",3))}var a=this.irr_dates;for(var c=0;c<this.DATE_IRREGULAR.length;c++){a[c]=null;if(this.DATE_IRREGULAR[c]!=null&&this.NUMBER_IRREGULAR[c]){if(KJE.DatePeriods.getDays(this.DATE_IRREGULAR[c],this.FUTURE_DATE)<=0){throw ("Date "+(c+1)+" must be before "+KJE.dateFormat(this.FUTURE_DATE))}if(KJE.DatePeriods.getDays(this.PRESENT_DATE,this.DATE_IRREGULAR[c])<0){throw ("Date "+(c+1)+" must be after "+KJE.dateFormat(this.PRESENT_DATE))}a[c]=new KJE.DatePeriods();a[c].PRESENT_DATE=this.DATE_IRREGULAR[c];a[c].FUTURE_DATE=this.FUTURE_DATE;a[c].PERIOD_FREQUENCY=f.PERIOD_FREQUENCY;a[c].calculate();if(d){b.addRepeat("Deposit (Withdrawal) "+(c+1)+" ",KJE.dateFormat(this.DATE_IRREGULAR[c]),KJE.dollars(this.NUMBER_IRREGULAR[c],2))}this.IRREGULAR_DEPOSIT_TOTAL+=this.NUMBER_IRREGULAR[c];this.IRR_COUNT++}else{a[c]=null}}if(d&&this.IRR_COUNT>0){b.addRepeat(b.sReportCol("<strong>Total</strong>:",1),"&nbsp;","<strong>"+KJE.dollars(this.IRREGULAR_DEPOSIT_TOTAL,2)+"</strong>")}}this.YEARS=f.years;this.PERIODS=(f.whole_periods%e.iPeriods[this.DEPOSIT_FREQUENCY]);if(this.PERIODS>0){this.MSG_PERIOD_YEARS=KJE.number(f.whole_periods/e.iPeriods[this.DEPOSIT_FREQUENCY],1)}else{this.MSG_PERIOD_YEARS=KJE.number(this.YEARS)}this.sFmtYears="";if(this.YEARS>0){this.sFmtYears=KJE.number(this.YEARS)+" "+(this.YEARS==1?KJE.MSG_YEAR_LBL:KJE.MSG_YEARS_LBL)}if(this.PERIODS>0){this.sFmtYears+=(this.sFmtYears.length>0?" "+KJE.MSG_AND_LBL+" ":"")+KJE.number(this.PERIODS)+" "+this.sPeriodSelected2}this.TOTAL_AMOUNT_YOU_HAVE_PAID_IN=(this.PERIODIC_DEPOSIT*(this.PAYMENTS_AT_START?f.whole_periods:f.periods))+this.IRREGULAR_DEPOSIT_TOTAL;if(this.bCALC_ROR){if(this.FUTURE_VALUE==0&&this.PRESENT_VALUE+this.PERIODIC_DEPOSIT+this.IRREGULAR_DEPOSIT_TOTAL!=0&&this.PERIODIC_DEPOSIT>=0&&this.IRREGULAR_DEPOSIT_TOTAL>=0){throw ("Future value must be greater than 0.")}else{if((this.PRESENT_VALUE+this.FUTURE_VALUE+this.PERIODIC_DEPOSIT+this.IRREGULAR_DEPOSIT_TOTAL)!=0){this.RATE_OF_RETURN=this.getRateofReturn(0,0.5)*100;if(this.RATE_OF_RETURN>=90){this.RATE_OF_RETURN=this.getRateofReturn(2,1)*100}else{if(KJE.round(this.RATE_OF_RETURN,1)<=-100){this.RATE_OF_RETURN=-100}}}else{this.RATE_OF_RETURN=0}}if(this.PERIODIC_DEPOSIT==0&&this.IRREGULAR_DEPOSIT_TOTAL==0){this.FUTURE_VALUE_DEPOSITS=0;this.PRESENT_VALUE_DEPOSITS=0;this.FUTURE_VALUE_AMOUNT=this.FUTURE_VALUE;this.PRESENT_VALUE_AMOUNT=this.PRESENT_VALUE}else{if(this.PRESENT_VALUE==0&&this.IRREGULAR_DEPOSIT_TOTAL==0){this.FUTURE_VALUE_DEPOSITS=this.FUTURE_VALUE;this.PRESENT_VALUE_DEPOSITS=KJE.FinFuncDatesCalc.getNPV(this.FUTURE_VALUE_DEPOSITS,this.dDailyInterestRate,this.dMonthlyInterestRate,this.dPeriodInterestRate,f);this.FUTURE_VALUE_AMOUNT=0;this.PRESENT_VALUE_AMOUNT=0}else{this.FUTURE_VALUE_DEPOSITS=(this.PRESENT_VALUE==0?this.FUTURE_VALUE:this.getFVDeposits()+this.dIRRFVCalculated);this.PRESENT_VALUE_DEPOSITS=KJE.FinFuncDatesCalc.getNPV(this.FUTURE_VALUE_DEPOSITS,this.dDailyInterestRate,this.dMonthlyInterestRate,this.dPeriodInterestRate,f);this.FUTURE_VALUE_AMOUNT=(this.PRESENT_VALUE==0?0:(this.FUTURE_VALUE-this.FUTURE_VALUE_DEPOSITS))}}}else{if(this.bCALC_FV){this.setInterestRates(this.RATE_OF_RETURN/100,(this.PERIODIC_DEPOSIT==0?e.iPeriods[this.COMPOUND_INTEREST]:e.iPeriods[this.DEPOSIT_FREQUENCY]),e.iPeriods[this.COMPOUND_INTEREST]);this.FUTURE_VALUE_DEPOSITS=this.getFVDeposits();this.FUTURE_VALUE_AMOUNT=KJE.FinFuncDatesCalc.getFV(this.PRESENT_VALUE,this.dDailyInterestRate,this.dMonthlyInterestRate,this.dPeriodInterestRate,0,this.PAYMENTS_AT_START,f);this.FUTURE_VALUE=this.FUTURE_VALUE_AMOUNT+this.FUTURE_VALUE_DEPOSITS}else{if(this.bCALC_PV_GOAL){this.setInterestRates(this.RATE_OF_RETURN/100,e.iPeriods[this.DEPOSIT_FREQUENCY],e.iPeriods[this.COMPOUND_INTEREST]);this.FUTURE_VALUE_DEPOSITS=this.getFVDeposits();this.FUTURE_VALUE_REMAINING=this.FUTURE_VALUE-this.FUTURE_VALUE_DEPOSITS;this.PRESENT_VALUE=KJE.FinFuncDatesCalc.getNPV(this.FUTURE_VALUE_REMAINING,this.dDailyInterestRate,this.dMonthlyInterestRate,this.dPeriodInterestRate,f);this.PRESENT_VALUE_DEPOSITS=KJE.FinFuncDatesCalc.getNPV(this.FUTURE_VALUE_DEPOSITS,this.dDailyInterestRate,this.dMonthlyInterestRate,this.dPeriodInterestRate,f);this.PRESENT_VALUE_AMOUNT=KJE.FinFuncDatesCalc.getNPV(this.FUTURE_VALUE,this.dDailyInterestRate,this.dMonthlyInterestRate,this.dPeriodInterestRate,f)}else{this.setInterestRates(this.RATE_OF_RETURN/100,e.iPeriods[this.DEPOSIT_FREQUENCY],e.iPeriods[this.COMPOUND_INTEREST]);this.FUTURE_VALUE_DEPOSITS=this.getFVDeposits();this.PRESENT_VALUE_DEPOSITS=KJE.FinFuncDatesCalc.getNPV(this.FUTURE_VALUE_DEPOSITS,this.dDailyInterestRate,this.dMonthlyInterestRate,this.dPeriodInterestRate,f);this.PRESENT_VALUE_AMOUNT=KJE.FinFuncDatesCalc.getNPV(this.FUTURE_VALUE,this.dDailyInterestRate,this.dMonthlyInterestRate,this.dPeriodInterestRate,f);this.FUTURE_VALUE_REMAINING=this.FUTURE_VALUE+this.FUTURE_VALUE_DEPOSITS;this.PRESENT_VALUE=KJE.FinFuncDatesCalc.getNPV(this.FUTURE_VALUE_REMAINING,this.dDailyInterestRate,this.dMonthlyInterestRate,this.dPeriodInterestRate,f)}}}if(this.bCALC_FV||this.bCALC_ROR){this.DD_BALANCE[0]=this.FUTURE_VALUE_AMOUNT;this.DD_BALANCE[1]=this.FUTURE_VALUE_DEPOSITS;this.DD_BALANCE[2]=this.FUTURE_VALUE}else{this.DD_BALANCE[0]=this.PRESENT_VALUE_AMOUNT;this.DD_BALANCE[1]=this.PRESENT_VALUE_DEPOSITS;this.DD_BALANCE[2]=this.PRESENT_VALUE}for(var c=0;c<this.DD_BALANCE.length;c++){this.catsbold[c]=" "+KJE.dollars(this.DD_BALANCE[c],2)}if(KJE.round(this.RATE_OF_RETURN/100,3)>=this.dMaxRor){throw ("Calculated rate of return exceeds "+KJE.percent(this.dMaxRor/100))}else{if(KJE.round(this.RATE_OF_RETURN/100,3)<=(-1)){throw ("Calculated rate of return is minus 100%")}else{this.MSG_ROR=KJE.percent(this.RATE_OF_RETURN/100,3)}}};KJE.FinFuncDatesCalc.prototype.formatReport=function(a){var b=KJE;var c=a;c=KJE.replace("INDEX_COMPOUND_INTEREST",b.input(this.COMPOUND_INTEREST),c);c=KJE.replace("INDEX_DEPOSIT_FREQUENCY",b.input(this.DEPOSIT_FREQUENCY),c);c=KJE.replace("DEPOSIT_TYPE",(this.PAYMENTS_AT_START?"at the start of each period":"at the end of each period"),c);c=KJE.replace("PERIODIC_DEPOSIT",b.dollars(this.PERIODIC_DEPOSIT,2),c);c=KJE.replace("DEPOSIT_FREQUENCY_LOWER",KJE.DatePeriods.sPeriods[this.DEPOSIT_FREQUENCY].toLowerCase(),c);c=KJE.replace("COMPOUND_INTEREST_LOWER",KJE.DatePeriods.sPeriodsCompound[this.COMPOUND_INTEREST].toLowerCase(),c);c=KJE.replace("DEPOSIT_FREQUENCY",KJE.DatePeriods.sPeriods[this.DEPOSIT_FREQUENCY],c);c=KJE.replace("PERIODS_LABEL",this.EnteredDates.getPeriodsLabel(),c);c=KJE.replace("YEARS",this.MSG_PERIOD_YEARS,c);c=KJE.replace("TOTAL_TIME",this.EnteredDates.getYearsLabel(),c);c=KJE.replace("RATE_OF_RETURN",b.percent(this.RATE_OF_RETURN/100,3),c);c=KJE.replace("MSG_ROR",this.MSG_ROR,c);c=KJE.replace("COMPOUND_INTEREST",KJE.DatePeriods.sPeriodsCompound[this.COMPOUND_INTEREST],c);c=KJE.replace("FUTURE_VALUE_DEPOSITS",b.dollars(this.FUTURE_VALUE_DEPOSITS,2),c);c=KJE.replace("FUTURE_VALUE_REMAINING",b.dollars(this.FUTURE_VALUE_REMAINING,2),c);c=KJE.replace("PRESENT_VALUE_DEPOSITS",b.dollars(this.PRESENT_VALUE_DEPOSITS,2),c);c=KJE.replace("PRESENT_VALUE_AMOUNT",b.dollars(this.PRESENT_VALUE_AMOUNT,2),c);c=KJE.replace("TOTAL_AMOUNT_YOU_HAVE_PAID_IN",b.dollars(this.TOTAL_AMOUNT_YOU_HAVE_PAID_IN,2),c);c=KJE.replace("FUTURE_DATE",this.FUTURE_DATE==null?KJE.Default.MSG_NA:KJE.dateFormat(this.FUTURE_DATE),c);c=KJE.replace("PRESENT_DATE",this.PRESENT_DATE==null?KJE.Default.MSG_NA:KJE.dateFormat(this.PRESENT_DATE),c);c=KJE.replace("DEPOSITS",(this.PERIODIC_DEPOSIT==0?this.MSG_NONE:b.number(this.getPeriods())),c);c=KJE.replace("PRESENT_VALUE",b.dollars(this.PRESENT_VALUE,2),c);c=KJE.replace("FUTURE_VALUE_AMOUNT",b.dollars(this.FUTURE_VALUE_AMOUNT,2),c);c=KJE.replace("FUTURE_VALUE",b.dollars(this.FUTURE_VALUE,2),c);c=KJE.replace("IRREGULAR_DEPOSIT_TOTAL",b.dollars(this.IRREGULAR_DEPOSIT_TOTAL,2),c);if(this.SHOW_IRR&&this.IRR_COUNT>0){c=c.replace("**PAYMENT_GRID**",this.IRR_TABLE_START+this.sSchedule.getRepeat())}else{c=KJE.replace("**PAYMENT_GRID**","",c)}this.sSchedule.clearRepeat();return c};KJE.FinFuncDatesCalc.prototype.getPeriods=function(){return(this.PAYMENTS_AT_START?this.EnteredDates.whole_periods:this.EnteredDates.periods)};KJE.FinFuncDatesCalc.prototype.getDepositCount=function(){return(this.PERIODIC_DEPOSIT==0?0:this.getPeriods())+this.IRR_COUNT};KJE.FinFuncDatesCalc.getNPV=function(d,b,a,f,e){var c=d;if(e.period_extra_months!=0){c=KJE.NPV_AMT(a,1,c)}if(e.period_extra_days!=0){c=KJE.NPV_AMT(b,1,c)}c=KJE.NPV_AMT(f,e.periods,c);return c};KJE.FinFuncDatesCalc.prototype.setInterestRates=function(a,e,f){var d=f;if(f==52){d=365/7}else{if(f==26){d=365/14}}var b=e;if(e==52){b=365/7}else{if(e==26){b=365/14}}var c=(f==1?a:1/Math.pow((1+a/d),(-1*d))-1);if(f==e){this.dPeriodInterestRate=(a/b)}else{this.dPeriodInterestRate=Math.pow(1+(c),1/b)-1}this.dMonthlyInterestRate=Math.pow(1+(c),1/(12/this.EnteredDates.period_extra_months))-1;this.dDailyInterestRate=Math.pow(1+(c),1/(365/this.EnteredDates.period_extra_days))-1;return c};KJE.FinFuncDatesCalc.prototype.getFVDeposits=function(){return KJE.FinFuncDatesCalc.getFV(0,this.dDailyInterestRate,this.dMonthlyInterestRate,this.dPeriodInterestRate,this.PERIODIC_DEPOSIT,this.PAYMENTS_AT_START,this.EnteredDates)};KJE.FinFuncDatesCalc.getFV=function(e,f,h,g,d,b,a){var k=KJE;if(e==0&&d==0){return 0}var c=0;if(d!=0){if(b){c=k.FV_BEGIN(g,a.periods,d)}else{c=k.FV(g,a.periods,d)}}if(e!=0){c+=k.FV_AMT(g,a.periods,e)}var j=0;var i=0;if(!a.bNoAdditionalDays){if(b){c+=d}if(a.period_extra_months!=0){i=k.round(h*c,2);c+=i}if(a.period_extra_days!=0){j=k.round(f*c,2);c+=j}}return c};KJE.FinFuncDatesCalc.prototype.getRateofReturn=function(b,q){var l=0;var e=0;var f=0;var o=(this.PERIODIC_DEPOSIT==0?KJE.DatePeriods.iPeriods[this.COMPOUND_INTEREST]:KJE.DatePeriods.iPeriods[this.DEPOSIT_FREQUENCY]);var c=KJE.DatePeriods.iPeriods[this.COMPOUND_INTEREST];var j=this.NUMBER_IRREGULAR;var m=this.DATE_IRREGULAR;for(var a=1;a<25;a++){f=this.setInterestRates(b,o,c);l=this.getFVDeposits();var k=0;var r=this.irr_dates;if(this.SHOW_IRR){for(var h=0;h<j.length;h++){if(m[h]!=null&&r[h]!=null){var p=Math.pow(1+(f),1/(12/r[h].period_extra_months))-1;var g=Math.pow(1+(f),1/(365/r[h].period_extra_days))-1;k+=KJE.FinFuncDatesCalc.getFV(j[h],g,p,this.dPeriodInterestRate,0,false,r[h])}}}e=this.FUTURE_VALUE-l-k;var d=KJE.FinFuncDatesCalc.getNPV(e,this.dDailyInterestRate,this.dMonthlyInterestRate,this.dPeriodInterestRate,this.EnteredDates);this.dIRRFVCalculated=k;if(d==this.PRESENT_VALUE){return b}else{if(d>this.PRESENT_VALUE){b+=q}else{b-=q}}q=q/2}return b};KJE.Default.MSG_NA="N/A";KJE.CalcName="Lump Sum Annual Return Calculator";KJE.CalcType="AnnualReturnAmount";KJE.CalculatorTitleTemplate="KJE1";KJE.parseInputs=function(b){KJE.DatePeriods.setDropdown();var a=KJE.getDropBox("COMPOUND_INTEREST",KJE.parameters.get("COMPOUND_INTEREST",KJE.DatePeriods.PERIOD_MONTHLY),KJE.DatePeriods.COMPOUND_FREQ_INDEX,KJE.DatePeriods.COMPOUND_FREQ_SELECTIONS);b=KJE.replace("**COMPOUND_INTEREST**",a,b);a=KJE.getDropBox("DEPOSIT_FREQUENCY",KJE.parameters.get("DEPOSIT_FREQUENCY",KJE.DatePeriods.PERIOD_MONTHLY),KJE.DatePeriods.DEPOSIT_FREQ_INDEX,KJE.DatePeriods.DEPOSIT_FREQ_SELECTIONS);b=KJE.replace("**DEPOSIT_FREQUENCY**",a,b);return b};KJE.initialize=function(){KJE.CalcControl=new KJE.FinFuncDatesCalc();KJE.GuiControl=new KJE.FinFuncDates(KJE.CalcControl)};KJE.FinFuncDates=function(r){var g=KJE;var c=KJE.gLegend;var j=KJE.inputs.items;this.AMOUNT_ONLY=KJE.parameters.get("AMOUNT_ONLY",false);this.sRESULT=KJE.parameters.get("MSG_RESULT","Calculation Results:");KJE.Checkbox("PAYMENTS_AT_START","Deposits at beginning",false,"Check here to make deposits at the beginning of each period.");KJE.Date("PRESENT_DATE","Start date");KJE.Date("FUTURE_DATE","End date");KJE.DropBox("COMPOUND_INTEREST","Compound interest");KJE.DollarSlider("PERIODIC_DEPOSIT","Periodic deposit (withdrawal)",-10000000,10000000,0,0,2);KJE.DropBox("DEPOSIT_FREQUENCY","Deposit frequency");KJE.Label("YEARS","Total time covered");KJE.Label("PERIODS","Number of deposits");KJE.Label("TOTAL_AMOUNT_YOU_HAVE_PAID_IN","Total deposits (withdrawals)");KJE.Label("CALC_OF_RETURN","Calculated IRR");if(this.AMOUNT_ONLY){j.PERIODIC_DEPOSIT.hide();j.DEPOSIT_FREQUENCY.hide()}if(r.bCALC_ROR||r.bCALC_FV){KJE.DollarSlider("PRESENT_VALUE","Initial deposit amount",-10000000,10000000,0,0,2)}if(r.bCALC_ROR||!r.bCALC_FV){KJE.DollarSlider("FUTURE_VALUE","Future value",-10000000,10000000,0,0,2)}if(!r.bCALC_ROR){KJE.InvestRateSlider("RATE_OF_RETURN","Rate of return")}var k=KJE.gNewGraph(KJE.gCATEGORIES,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_TITLE","Future Values of Deposits"));k._legend._iOrientation=(c.TOP_RIGHT);k._titleXAxis.setText("");k._axisX.setVisible(false);k._axisY.setVisible(true);k._showItemLabel=true;if(this.AMOUNT_ONLY){k._legend.setVisible(false)}var f=0;if(r.SHOW_IRR){for(var o=0;o<r.IRR_COUNT_MAX;o++){KJE.Date("DATE_IRREGULAR"+(o+1),"Date "+(o+1),"TODAY");KJE.DollarSlider("NUMBER_IRREGULAR"+(o+1),KJE.parameters.get("MSG_AMOUNT_LBL","Amount")+" "+(o+1),-10000000,10000000,0,0,2)}}var b=KJE.parameters.get("MSG_DROPPER_TITLE","Internal Rate of Return (IRR) Inputs:");KJE.addDropper(new KJE.Dropper("INPUTS",true,b,b),KJE.colorList[0]);if(!this.AMOUNT_ONLY){var s=KJE.parameters.get("MSG_DROPPER2_TITLE","Calculation results:");var h=KJE.parameters.get("MSG_DROPPER2_CLOSETITLE","Time covered: KJE1, Number of Deposits: KJE2, Total Deposits (withdrawals): KJE3 ");var q=function(){return s+KJE.subText(KJE.getKJEReplaced(h,(r.EnteredDates?r.EnteredDates.getYearsLabel():r.MSG_NONE),KJE.FinFuncDates.getPeriodText(r),g.dollars(r.TOTAL_AMOUNT_YOU_HAVE_PAID_IN)),"KJECenter")};KJE.addDropper(new KJE.Dropper("INPUTS2",false,s,q),KJE.colorList[0])}if(r.SHOW_IRR){var a=KJE.parameters.get("MSG_DROPPER3_TITLE","Irregular Payments & Withdrawals");var e=KJE.parameters.get("MSG_DROPPER3_CLOSETITLE","Total: KJE1");var m=function(){return a+"|"+KJE.subText(KJE.getKJEReplaced(e,g.dollars(r.IRREGULAR_DEPOSIT_TOTAL,2)),"KJERightBold")};KJE.addDropper(new KJE.Dropper("INPUTS3",false,m,m),KJE.colorList[0]);var p=KJE.parameters.get("MSG_DROPPER3_TITLE","Additional Irregular Payments & Withdrawals");KJE.addDropper(new KJE.Dropper("INPUTS4",false,p,p),KJE.colorList[0]);var d=KJE.parameters.get("MSG_DROPPER3_TITLE","Additional Irregular Payments & Withdrawals");KJE.addDropper(new KJE.Dropper("INPUTS5",false,d,d),KJE.colorList[0])}};KJE.FinFuncDates.prototype.setValues=function(c){var a=KJE.inputs.items;c.PAYMENTS_AT_START=a.PAYMENTS_AT_START.getValue();c.COMPOUND_INTEREST=Math.round(a.COMPOUND_INTEREST.getValue());if(this.AMOUNT_ONLY){c.DEPOSIT_FREQUENCY=KJE.DatePeriods.PERIOD_MONTHLY;c.PERIODIC_DEPOSIT=0}else{c.DEPOSIT_FREQUENCY=Math.round(a.DEPOSIT_FREQUENCY.getValue());c.PERIODIC_DEPOSIT=a.PERIODIC_DEPOSIT.getValue()}if(c.bCALC_ROR){c.FUTURE_VALUE=a.FUTURE_VALUE.getValue();c.PRESENT_VALUE=a.PRESENT_VALUE.getValue()}else{if(c.bCALC_FV){c.PRESENT_VALUE=a.PRESENT_VALUE.getValue();c.RATE_OF_RETURN=a.RATE_OF_RETURN.getValue()}else{c.FUTURE_VALUE=a.FUTURE_VALUE.getValue();c.RATE_OF_RETURN=a.RATE_OF_RETURN.getValue()}}c.PRESENT_DATE=a.PRESENT_DATE.getValue();c.FUTURE_DATE=a.FUTURE_DATE.getValue();c.PAYMENTS_AT_START=a.PAYMENTS_AT_START.getValue();if(c.SHOW_IRR){for(var b=0;b<c.IRR_COUNT_MAX;b++){c.DATE_IRREGULAR[b]=a["DATE_IRREGULAR"+(b+1)].getValue();c.NUMBER_IRREGULAR[b]=a["NUMBER_IRREGULAR"+(b+1)].getValue();if(c.NUMBER_IRREGULAR[b]!=0&&c.DATE_IRREGULAR[b]==null){throw new NumberFormatException("Payments and withdrawals require a valid date")}}}};KJE.FinFuncDates.prototype.refresh=function(h){var g=KJE;var c=KJE.gLegend;var b=KJE.inputs.items;var a=KJE.gGraphs[0];KJE.setTitleTemplate(KJE.replace("RATE_OF_RETURN",h.MSG_ROR,KJE.replace("PRESENT_VALUE",g.dollars(h.PRESENT_VALUE),KJE.replace("FUTURE_VALUE",g.dollars(h.FUTURE_VALUE),this.sRESULT))));a.removeAll();a._sGraphCatagoriesBold=h.catsbold;a.setGraphCategories(h.cats);if(this.AMOUNT_ONLY){var d=[h.cats[2]];var e=[h.DD_BALANCE[2]];a.setGraphCategories(d)}a.add(new KJE.gGraphDataSeries((this.AMOUNT_ONLY?e:h.DD_BALANCE),this.GRAPH_LABEL_2,a.getColor(1)));a._axisY._bAutoMinimum=(h.dMin<0);a.paint();b.TOTAL_AMOUNT_YOU_HAVE_PAID_IN.setText(g.dollars(h.TOTAL_AMOUNT_YOU_HAVE_PAID_IN));b.YEARS.setText(h.EnteredDates.getYearsLabel());b.PERIODS.setText(KJE.FinFuncDates.getPeriodText(h));b.CALC_OF_RETURN.setText(h.MSG_ROR)};KJE.FinFuncDates.getPeriodText=function(a){return(a.PERIODIC_DEPOSIT==0&&a.IRR_COUNT==0?a.MSG_NONE:a.IRR_COUNT==0?KJE.number(a.getPeriods())+" "+KJE.DatePeriods.sPeriods[a.DEPOSIT_FREQUENCY].toLowerCase():KJE.number(a.getDepositCount())).trim()};KJE.InputScreenText=" <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Input information:</div></div> <div id=KJE-E-INPUTS > <div id='KJE-C-PRESENT_DATE'><input id='KJE-PRESENT_DATE' /></div> <div id='KJE-C-FUTURE_DATE'><input id='KJE-FUTURE_DATE' /></div> <div id='KJE-C-PRESENT_VALUE'><input id='KJE-PRESENT_VALUE' /></div> <div id='KJE-C-FUTURE_VALUE'><input id='KJE-FUTURE_VALUE' /></div> <div id='KJE-C-PERIODIC_DEPOSIT'><input id='KJE-PERIODIC_DEPOSIT' /></div> <div id='KJE-C-YEARS'><div id='KJE-YEARS'></div></div> </div> **GRAPH1** ";KJE.DefinitionText=" <div id='KJE-D-PRESENT_VALUE' ><dt>Initial deposit amount</dt><dd>Amount of your initial deposit, or account balance, as of the present value date.</dd></div> <div id='KJE-D-FUTURE_VALUE' ><dt>Future value</dt><dd>Total future value of the initial deposit amount. This includes the compounding of interest at the calculated rate on an annual basis.</dd></div> <div id='KJE-D-PRESENT_DATE' ><dt>Start date</dt><dd>Date to calculate the present value.</dd></div> <div id='KJE-D-FUTURE_DATE' ><dt>End date</dt><dd>Date your investment or account will be worth the entered future value.</dd></div> <div><dt>Calculated rate of return</dt><dd>The calculated rate of return for this investment or account. **ROR_DEFINITION**</dd></div> ";KJE.ReportText=' <!--HEADING "Lump Sum Annual Rate of Return Calculator" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>Calculated annual rate of return is RATE_OF_RETURN. </h2>**GRAPH** <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Results Summary</caption> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder">Calculated rate of return </th><td class="KJECellStrong"> RATE_OF_RETURN compounded COMPOUND_INTEREST_LOWER</td></tr> </tfoot> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Initial amount </th><td class="KJECell KJECell40"> PRESENT_VALUE as of PRESENT_DATE </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Future value </th><td class="KJECell"> FUTURE_VALUE as of FUTURE_DATE </td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Start date </th><td class="KJECell"> PRESENT_DATE </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>End date </th><td class="KJECell"> FUTURE_DATE </td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Dates span a period of </th><td class="KJECell" > TOTAL_TIME</td></tr> </tbody> </table> </div> ';
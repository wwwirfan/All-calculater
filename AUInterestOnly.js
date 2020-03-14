KJE.Default.PAY_WEEKLY=0;KJE.Default.PAY_ACCEL_WEEK=1;KJE.Default.PAY_ACCEL_BI=2;KJE.Default.PAY_BIWEEKLY=3;KJE.Default.PAY_2XMONTHLY=4;KJE.Default.PAY_MONTHLY=5;KJE.Default.PAY_QUARTERLY=6;KJE.Default.PAY_SEMIANNUAL=7;KJE.Default.PAY_ANNUAL=8;KJE.Default.getPayDrop=function(c,b,g){KJE.Default.PAY_PERIOD_IDs=KJE.parameters.get("ARRAY_PAY_PERIODS_IDS",[KJE.Default.PAY_ACCEL_WEEK,KJE.Default.PAY_ACCEL_BI,KJE.Default.PAY_MONTHLY]);KJE.Default.PAY_PERIODS=KJE.parameters.get("ARRAY_PAY_PERIODS",["normal weekly","weekly","fortnightly","bi-weekly","semi-monthly","monthly","quarterly","semi-annual","annual"]);KJE.Default.PAY_PERIODS_TITLE=KJE.parameters.get("ARRAY_PAY_PERIODS_TITLE",["Normal weekly","Weekly","Fortnightly","Bi-weekly","Semi-monthly","Monthly","Quarterly","Semi-annual","Annual"]);KJE.Default.PAY_FREQUENCY=[52,12,12,26,24,12,4,2,1];KJE.Default.PAY_FREQUENCY_ACCELERATED=[52,52,26,26,24,12,4,2,1];KJE.Default.PAY_ACCELERATED=[false,true,true,false,false,false,false,false,false];var a=KJE.Default.PAY_PERIOD_IDs;var f=a.length;var e=KJE.Default.PAY_PERIODS;var d=new Array(f);for(i=0;i<f;i++){d[i]=e[a[i]]}return KJE.getDropBox(c,KJE.parameters.get(c,(!b?KJE.Default.PAY_MONTHLY:b)),a,d,g)};KJE.Default.InflationRate=3;KJE.Default.TaxRate=40;KJE.Default.TaxRateRetire=15;KJE.definitions.set("**INFLATION_DEFINITION**","What you expect for the average long-term inflation rate.");KJE.definitions.set("**ROR_DEFINITION**","The actual rate of return is largely dependent on the type of investments you select. Savings accounts may pay as little as 2% or less.  It is important to remember that future rates of return can't be predicted with certainty and that investments that pay higher rates of return are subject to higher risk and volatility. The actual rate of return on investments can vary widely over time, especially for long-term investments. This includes the potential loss of principal on your investment.");KJE.parameters.set("INTEREST_ONLY",true);KJE.getAUTermChoice=function(){var b=KJE.Default.IO_ITEMS=new Array();var d=KJE.Default.IO_ID=new Array();var c=KJE.Default.IO_TERMS=new Array();var a=KJE.Default.IO_AMORTS=new Array();for(var e=0;e<=29;e++){b[e]=(e+1)+" "+(e==0?KJE.MSG_YEAR_LBL:KJE.MSG_YEARS_LBL);c[e]=e+1;d[e]=e;a[e]=0}};KJE.getAUTermChoice();KJE.CAMortgageLoanCalc=function(){this.bUSE_CAMORTGAGE=KJE.parameters.get("USE_CAMORTGAGE",true);this.MSG_PREPAY_TERM_BALANCE=KJE.parameters.get("MSG_PREPAY_TERM_BALANCE","PREPAY_BALANCE_TERM_END");this.MSG_TERM_ERROR1=KJE.parameters.get("MSG_TERM_ERROR1","Term must be less than or equal to KJE1 years.");this.MSG_TERM_ERROR2=KJE.parameters.get("MSG_TERM_ERROR2","Term must be greater than or equal to 1 month.");this.MSG_POP_PRINCIPAL=KJE.parameters.get("MSG_POP_PRINCIPAL","Total Principal for");this.MSG_POP_INTEREST=KJE.parameters.get("MSG_POP_INTEREST","Total Interest for");this.MSG_PRINCIPAL=KJE.parameters.get("MSG_PRINCIPAL","Principal");this.MSG_INTEREST=KJE.parameters.get("MSG_INTEREST","Interest");this.MSG_PRINCIPAL_BALANCE=KJE.parameters.get("MSG_PRINCIPAL_BALANCE","Principal Balance");this.MSG_POP_PRINCIPAL_NORMAL=KJE.parameters.get("MSG_POP_PRINCIPAL_NORMAL","Principal Balance for Normal Payments Year");this.MSG_POP_PRINCIPAL_PREPAY=KJE.parameters.get("MSG_POP_PRINCIPAL_PREPAY","Principal Balance for Prepayments Year");this.MSG_ERROR2=KJE.parameters.get("MSG_ERROR2","Prepayment amount must not be more than the loan amount.");this.MSG_ERROR3=KJE.parameters.get("MSG_ERROR3","Purchase price must be more than the entered loan amount.");this.bIO=KJE.parameters.get("INTEREST_ONLY",false);this.bEND_BALANCE=KJE.parameters.get("END_BALANCE",false);this.IO_TERM=0;this.MSG_RETURN1=KJE.parameters.get("MSG_RETURN1","A KJE1 payment of MONTHLY_PI at INTEREST_RATE for TERM years will give you a mortgage amount of LOAN_AMOUNT.");this.MSG_RETURN2=KJE.parameters.get("MSG_RETURN2","A loan amount of LOAN_AMOUNT at INTEREST_RATE for TERM years will give you a KJE1 payment (PI) of MONTHLY_PI.");this.MSG_PREPAY_MESSAGE=KJE.parameters.get("MSG_PREPAY_MESSAGE","Your planned prepayment(s) will shorten your mortgage by PREPAY_SHORTEN_TERM.");this.MSG_RETURN_AMOUNT=KJE.parameters.get("MSG_RETURN_AMOUNT","A monthly payment of MONTHLY_PI at INTEREST_RATE for TERM years will give you a mortgage amount of LOAN_AMOUNT.");this.MSG_PREPAYMENTS=KJE.parameters.get("MSG_PREPAYMENTS","Prepayments");this.MSG_NORMAL_PAYMENTS=KJE.parameters.get("MSG_NORMAL_PAYMENTS","Normal");this.PREPAY_PAYOFF_MESSAGE=KJE.parameters.get("PREPAY_PAYOFF_MESSAGE","<br>PREPAY_PAYOFF years with prepayments");this.PAYMENT_CALC=1;this.LOAN_PAYMENT=0;this.MORTGAGE_YRS_LEFT=0;this.bMORTGAGE_INSURANCE=false;this.sSchedule=new KJE.Repeating()};KJE.CAMortgageLoanCalc.prototype.clear=function(){this.INTEREST_RATE=0;this.TERM=0;this.ENTERED_MONTHS=0;this.LOAN_AMOUNT=0;this.PREPAY_AMOUNT=0;this.PREPAY_STARTS_WITH=1;this.PREPAY_TYPE=KJE.Default.PREPAY_NONE;this.PAYMENT_TYPE=KJE.Default.PAY_MONTHLY;this.PURCHASE_PRICE=0;this.DISCOUNT_POINTS_PERCENT=0;this.ORIGINATION_FEES_PERCENT=0;this.OTHER_FEES=0;this.ADJUSTABLE_RATE_CAP=0;this.ADJUSTABLE_RATE_INCR=0;this.ADJUSTABLE_RATE=0;this.ADJUSTABLE_RATE_FEQ=12;this.MORTGAGE_INSURANCE_PREMIUM=0;this.LOAN_TERM_END=KJE.Default.MortgageTermEnds;this.BY_YEAR=1};KJE.CAMortgageLoanCalc.prototype.calculate=function(e){var ao=KJE;var aC=this.INTEREST_RATE;var F=this.TERM;var C=this.ENTERED_MONTHS;var aD=this.LOAN_AMOUNT;var A=this.PREPAY_AMOUNT;var aI=this.PREPAY_STARTS_WITH;var h=this.PREPAY_TYPE;var N=this.PURCHASE_PRICE;var G=this.DISCOUNT_POINTS_PERCENT;var aa=this.ORIGINATION_FEES_PERCENT;var H=this.OTHER_FEES;var E=this.ADJUSTABLE_RATE_CAP;var x=this.ADJUSTABLE_RATE_INCR;var b=this.ADJUSTABLE_RATE;var av=this.ADJUSTABLE_RATE_FEQ;var T=this.BY_YEAR;var ar=this.PAYMENT_TYPE;var aJ=this.MORTGAGE_YRS_LEFT;var aU=KJE.Default.MortgageTermMax;var t=this.bEND_BALANCE;var D=this.LOAN_TERM_END;var g=0;var S=0;var ae=0;var aK=0;var f="";var ac=0;var B=0;var ay=0;var aM=0;var d=0;var af=0;var aB=0;var aQ="";var ag=0;var z=0;if(this.bIO){var J=F;this.TERM=F=KJE.Default.IO_TERMS[J]+KJE.Default.IO_AMORTS[J];this.IO_TERM=KJE.Default.IO_TERMS[J]}var O=this.PAYMENTS_PER_YEAR=KJE.Default.PAY_FREQUENCY[ar];if(F*O+C>aU*O){throw (KJE.getKJEReplaced(this.MSG_TERM_ERROR1,ao.input(aU,0)))}if(F*O+C<=0){throw (this.MSG_TERM_ERROR2)}if(aJ!=0){this.PREPAY_STARTS_WITH=aI=1+(F-aJ)*O}var L=KJE.Default.PREPAY_FREQUENCY[h];var P=Math.floor(C==0?0:(C/12)*O);var aE=P;var aF=this.getPeriodRate(aC,O);var M=true;if(N==0){N=aD;M=false}else{if(N<aD){throw (this.MSG_ERROR3)}}var o=(G/100)*aD;var ap=(aa/100)*aD;var aV=o+ap+H;var al=1-(aD/N);var j=N-aD;var ax=(aD/N);if(KJE.Default.getCMHCRate){this.RATE_CMHC=KJE.Default.getCMHCRate(aD,j,N,false,F);this.TOTAL_ACTUAL_CMHC=aD*this.RATE_CMHC;this.RATE_CMHC=(this.bMORTGAGE_INSURANCE?this.RATE_CMHC:0);this.TOTAL_CMHC=aD*this.RATE_CMHC;aD=aD+this.TOTAL_CMHC}if(this.PAYMENT_CALC==0){if(this.bIO){aD=Math.round(KJE.PV(aF,F*O+P,g))}else{aD=Math.round(g/aF)}this.sReturnMessage=KJE.getKJEReplaced(this.MSG_RETURN1,KJE.Default.PAY_PERIODS[ar])}else{if(KJE.Default.PAY_ACCELERATED[ar]){if(this.bIO){g=ao.round(aD*aF,2)}else{g=ao.round(KJE.PMT(aF,F*O+P,aD),2)}this.PAYMENTS_PER_YEAR=O=KJE.Default.PAY_FREQUENCY_ACCELERATED[ar];P=Math.floor(C==0?0:(C/12)*O);aF=this.getPeriodRate(aC,O);g=ao.round(((g*13)/O),2)}else{if(this.bIO){g=ao.round(aD*aF,2)}else{g=ao.round(KJE.PMT(aF,F*O+P,aD),2)}}this.sReturnMessage=KJE.getKJEReplaced(this.MSG_RETURN2,KJE.Default.PAY_PERIODS[ar])}if(A>aD){throw (KJE.replace("LOAN_AMOUNT",ao.dollars(aD),this.MSG_ERROR2))}var Q=ao.round(aD*aF,2);var ai=g-Q;var aN=KJE.APR(F*O+P,g,aF,aD,aV)*O;var aL=ao.round(KJE.PMT(aF,F*O+P,aD+aV),2);var c=aD+aV;var am=Math.round(F)+1;if(F<4){am=Math.round(F*O+P)+1}else{if(P>0){am+=1}}var ah=0;var aq=this.DS_PRINCIPAL_BAL=KJE.FloatArray(am);var aj=this.DS_PREPAY_PRINCIPAL_BAL=KJE.FloatArray(am);var y=this.DS_PREPAY_INTEREST=KJE.FloatArray(am);var ak=this.DS_NORMAL_INTEREST=KJE.FloatArray(am);var l=this.cats=KJE.FloatArray(am);if(P!=0){if(F>4){l[am-1]=ao.number(F+1)}else{l[am-1]=ao.number(F*12+P)}}var k=true;var aP=aD;var az=0;var an=0;var aS=0;var p=0;var Z=0;var aA=g;var aO=0;var v=0;var aw=aD;var ad=0;var Y=0;var m=0;var aT=0;var w=0;var I=g;if(h==KJE.Default.PREPAY_NONE){k=false}if(aI==0){aI=1}var X=0;l[X]="0";aj[X]=(aD);aq[X]=(aD);y[X]=(0);ak[X]=(0);X+=1;if(e){var U=this.sSchedule;U.clearRepeat();if(k){U.addHeader("&nbsp;",{sCell:KJE._sHeadingUnderline,sContent:U.sReportCol("Regular Payment Schedule",1),sFormat:"COLSPAN=3"},{sCell:KJE._sHeadingUnderline,sContent:U.sReportCol("Prepayment Payment Schedule",2),sFormat:"COLSPAN=3"})}if((!T||F<4)&&k){U.addHeader(U.sReportCol("Nbr",3),U.sReportCol("Payment",4),U.sReportCol("Interest",6),U.sReportCol("Ending Principal Balance",7),U.sReportCol("Payment",4),U.sReportCol("Interest",6),U.sReportCol("Ending Principal Balance",7))}else{if((!T||F<4)&&!k){U.addHeader(U.sReportCol("Nbr",3),U.sReportCol("Payment",4),U.sReportCol("Principal",5),U.sReportCol("Interest",6),U.sReportCol("Ending Principal Balance",7))}else{if(T&&k){U.addHeader(U.sReportCol("Yr ",8),U.sReportCol("Total Payments",9),U.sReportCol("Interest Paid",10),U.sReportCol("Ending Principal Balance",7),U.sReportCol("Total Payments",9),U.sReportCol("Interest Paid",10),U.sReportCol("Ending Principal Balance",7))}else{U.addHeader(U.sReportCol("Year",8),U.sReportCol("Total Payments",9),U.sReportCol("Principal Paid",11),U.sReportCol("Interest Paid",10),U.sReportCol("Ending Principal Balance",7))}}}if(k){U.addRepeat("&nbsp;","&nbsp;","&nbsp;",ao.dollars(aw,2),(h==KJE.Default.PREPAY_ONETIME&&aI==0?ao.dollars(A,2):""),"&nbsp;","&nbsp;",ao.dollars(aP,2))}else{U.addRepeat("&nbsp;","&nbsp;","&nbsp;","&nbsp;",ao.dollars(aw,2))}}var aG=g;var au=g;var K=g;var aR=aC/100;var W=aC/100;if(b&&x!=0){if(this.sAdjSchedule==null){this.sAdjSchedule=new KJE.Repeating()}var u=this.sAdjSchedule;u.clearRepeat();u.addHeader(u.sReportCol("Payment Number",12),u.sReportCol("Interest Rate",13),u.sReportCol("Monthly Payment",14));u.addRepeat("1",ao.percent(W,2),ao.dollars(g,2))}for(var ab=1;ab<=(F*O+P);ab++){ah=ab-1;if(((ah%av)==0&&ab!=1&&b==1&&ab!=(F*O+P)&&x!=0)||(this.bIO&&this.IO_TERM*O==ab-1)){W+=x/100;if(W>E/100&&E!=0){W=E/100}if(W<0.02){W=0.02}if(W!=aR||this.bIO){aR=W;aF=(Math.pow(1+(W/2),(1/(O/2)))-1);K=ao.round(KJE.PMT(aF,(F*O+P)+1-ab,aw),2);au=ao.round(KJE.PMT(aF,(F*O+P)+1-ab,aP),2);if(aG<K){aG=K}if(b&&x!=0){u.addRepeat(ab,ao.percent(W,2),ao.dollars(K,2))}}}aA=au;I=K;aO=0;if(k&&(aI<=ab)){if(h==KJE.Default.PREPAY_ONETIME&&aI==ab){aO=A}else{if(h==KJE.Default.PREPAY_YEARLY){if(((ab-aI)%O)==0){aO=A}}else{if(h==KJE.Default.PREPAY_NONE){}else{aO=(O==L?A:(A*KJE.Default.PREPAY_FREQUENCY[h])/O)}}}aO=ao.round(aO,2)}ad=ao.round(aF*aw,2);Y=I-ad;aw-=Y;if(aw<0){I+=aw;aw=0;Y=I-ad}if((F*O+P)==ab){if(t){}else{if(aw>0.005){I+=aw;aw=0;Y=I-ad}else{aw=0}}}az=ao.round(aF*aP,2);an=aA+aO-az;aP-=an;if(aP<0){aO+=aP;if(aO<0){aA+=aO;aO=0}aP=0;an=aA+aO-az}if((F*O+P)==ab){if(t){}else{if(aP>0.005){aA+=aP;aP=0;an=aA+aO-az}else{aP=0}}}if(D*O==ab){ag=aP;z=aw}if(aP==0&&ay==0){ay=ab}if(aw==0&&af==0){af=ab}aS+=az;p+=an;Z+=aA;v+=aO;ac+=aA+aO;B+=az;m+=ad;aT+=Y;w+=I;ae+=I;S+=ad;if(!T&&e){if(k){U.addRepeat(ao.number(ab),ao.dollars(I,2),ao.dollars(ad,2),ao.dollars(aw,2),ao.dollars(aO+aA,2),ao.dollars(az,2),ao.dollars(aP,2))}else{U.addRepeat(ao.number(ab),ao.dollars(I,2),ao.dollars(Y,2),ao.dollars(ad,2),ao.dollars(aw,2))}}if((ab%O)==0||(F<4)||(ab==(F*O+P)&&P>0)){l[X]=""+X;aj[X]=aP;aq[X]=aw;y[X]=B;ak[X]=S;X+=1;if(T&&e){var aH=(F<4?ab:(ab/O+(ab==F*O+P&&P>0?1:0)));if(k){U.addRepeat(ao.number(aH),ao.dollars(w,2),ao.dollars(m,2),ao.dollars(aw,2),ao.dollars(Z+v,2),ao.dollars(aS,2),ao.dollars(aP,2))}else{U.addRepeat(ao.number(aH),ao.dollars(w,2),ao.dollars(aT,2),ao.dollars(m,2),ao.dollars(aw,2))}}m=0;aT=0;w=0;aS=0;p=0;Z=0;v=0}}if(b&&x!=0){f=u.getRepeat();u.clearRepeat()}if(af==0){af=(F*O+P)}var V=1;if(k){V=2}var at=this.DS_INTEREST=KJE.FloatArray(V);var a=this.DS_PRINCIPAL=KJE.FloatArray(V);var R=this.totalpaid_cats=new Array(V);at[0]=S;a[0]=aD;a[0]=(t?ae-S:aD);R[0]=this.MSG_NORMAL_PAYMENTS;if(k){at[1]=B;a[1]=(t?ac-B:aD);R[1]=this.MSG_PREPAYMENTS;aB=S-B}this.MONTHLY_PI=g;this.INTEREST_PAID=S;this.TOTAL_OF_PAYMENTS=ae;this.FIRST_MONTH_INTEREST=Q;this.FIRST_MONTH_PRINCIPAL=ai;this.PERCENT_DOWNPAYMENT=al;this.DOWNPAYMENT_AMOUNT=j;this.LOAN_TO_VALUE=ax;this.TOTAL_CLOSING_COSTS=aV;this.DISCOUNT_POINTS_AMT=o;this.ORIGINATION_FEES_AMT=ap;this.FIRST_YEAR_INTEREST=aK;this.ADJUSTABLE_PAYMENT_AMTS=f;this.ADJUSTABLE_RATE_HIGHEST=aG;this.PREPAY_TOTAL_OF_PAYMENTS=ac;this.PREPAY_INTEREST_PAID=B;this.PREPAY_SHORTEN_MONTHS=ay;this.PREPAY_SHORTEN_YEARS=aM;this.PREPAY_FIRST_YEAR_INTEREST=d;this.ACCEL_SHORTEN_MONTHS=af;this.PREPAY_INTEREST_SAVINGS=aB;this.PREPAY_MESSAGE=aQ;this.LOAN_APR=aN;this.LOAN_APR_PAYMENT=aL;this.LOAN_APR_AMOUNT=c;this.PAYOFF_SHORTEN_YEARS=ao.round(((af-ay)/O),1);this.PREPAY_PAYOFF=ao.round((F+P/O),1)-this.PAYOFF_SHORTEN_YEARS;this.LOAN_AMOUNT_CMHC=aD;this.PREPAY_BALANCE_TERM_END=ag;this.BALANCE_TERM_END=z};KJE.CAMortgageLoanCalc.prototype.formatReport=function(c){var f=KJE;var a=this.iDecimal;var g=c;var e=this.PAYMENTS_PER_YEAR;g=KJE.replace("IO_TERM",f.number(this.IO_TERM,0)+" "+KJE.MSG_YEARS_LBL,g);g=KJE.replace("IO_REMAINING_TERM",f.number(this.TERM-this.IO_TERM,0)+" "+KJE.MSG_YEARS_LBL,g);g=KJE.replace("PAYOFF_SHORTEN_YEARS",f.number(this.PAYOFF_SHORTEN_YEARS,1),g);g=KJE.replace("MONTHLY_PI_AMOUNT",f.dollars(this.MONTHLY_PI,2),g);var d=KJE.Default.PAY_PERIODS[this.PAYMENT_TYPE];g=KJE.replace("MONTHLY_PI",f.dollars(this.MONTHLY_PI,2)+" "+d,g);g=KJE.replace("PAYMENT_TYPE",(d?d.toLowerCase():""),g);g=KJE.replace("RESULT_MESSAGE",this.sReturnMessage,g);g=KJE.replace("TOTAL_CLOSING_COSTS",f.dollars(this.TOTAL_CLOSING_COSTS,2),g);g=KJE.replace("TERM_LBL",KJE.getTermLabel(Math.ceil(this.TERM*12+this.ENTERED_MONTHS),false),g);g=KJE.replace("PAYMENTS_LBL",KJE.getTermLabel(Math.ceil((this.ACCEL_SHORTEN_MONTHS/this.PAYMENTS_PER_YEAR)*12),false),g);g=KJE.replace("PURCHASE_PRICE",f.dollars(this.PURCHASE_PRICE,2),g);g=KJE.replace("ADJUSTABLE_RATE_FEQ",f.number(this.ADJUSTABLE_RATE_FEQ),g);g=KJE.replace("ADJUSTABLE_RATE_INCR",f.percent(this.ADJUSTABLE_RATE_INCR/100,2),g);g=KJE.replace("ADJUSTABLE_RATE_CAP",f.percent(this.ADJUSTABLE_RATE_CAP/100,3),g);g=KJE.replace("ADJUSTABLE_PAYMENT_AMTS",this.ADJUSTABLE_PAYMENT_AMTS,g);g=KJE.replace("ADJUSTABLE_RATE_HIGHEST",f.dollars(this.ADJUSTABLE_RATE_HIGHEST,2),g);g=KJE.replace("ADJUSTABLE_RATE",f.yesno(this.ADJUSTABLE_RATE),g);var b=KJE.Default.PREPAY_PERIODS[this.PREPAY_TYPE];if(this.PREPAY_TYPE==KJE.Default.PREPAY_NONE){g=KJE.replace("PREPAY_TYPE",b,g);g=KJE.replace("PREPAY_TOTAL_OF_PAYMENTS","",g);g=KJE.replace("PREPAY_STARTS_WITH","",g);g=KJE.replace("PREPAY_MESSAGE","",g);g=KJE.replace("PREPAY_INTEREST_SAVINGS","",g);g=KJE.replace("PREPAY_INTEREST_PAID","",g);g=KJE.replace("PREPAY_FIRST_YEAR_INTEREST","",g);g=KJE.replace("PREPAY_AMOUNT","",g);g=KJE.replace("PREPAY_PAYOFF_MESSAGE","",g);g=KJE.replace("PREPAY_PAYOFF","",g);g=KJE.replace("PREPAY_TERM_BALANCE","",g);g=KJE.replace("PREPAY_BALANCE_TERM_END","",g)}else{g=KJE.replace("PREPAY_PAYOFF_MESSAGE",this.PREPAY_PAYOFF_MESSAGE,g);g=KJE.replace("PREPAY_PAYOFF",f.number(this.PREPAY_PAYOFF,1),g);g=KJE.replace("PREPAY_TYPE",b,g);g=KJE.replace("PREPAY_TOTAL_OF_PAYMENTS",f.dollars(this.PREPAY_TOTAL_OF_PAYMENTS,2),g);g=KJE.replace("PREPAY_STARTS_WITH",f.number(this.PREPAY_STARTS_WITH),g);g=KJE.replace("PREPAY_MESSAGE",this.PREPAY_MESSAGE,g);g=KJE.replace("PREPAY_INTEREST_SAVINGS",f.dollars(this.PREPAY_INTEREST_SAVINGS,2),g);g=KJE.replace("PREPAY_INTEREST_PAID",f.dollars(this.PREPAY_INTEREST_PAID,2),g);g=KJE.replace("PREPAY_FIRST_YEAR_INTEREST",f.dollars(this.PREPAY_FIRST_YEAR_INTEREST,2),g);g=KJE.replace("PREPAY_AMOUNT",f.dollars(this.PREPAY_AMOUNT,2),g);g=KJE.replace("PREPAY_TERM_BALANCE",this.MSG_PREPAY_TERM_BALANCE,g);g=KJE.replace("PREPAY_BALANCE_TERM_END",f.dollars(this.PREPAY_BALANCE_TERM_END,2),g)}g=KJE.replace("LOAN_TERM_END",f.number(this.LOAN_TERM_END,0),g);g=KJE.replace("BALANCE_TERM_END",f.dollars(this.BALANCE_TERM_END,2),g);g=KJE.replace("PERCENT_DOWNPAYMENT",f.percent(this.PERCENT_DOWNPAYMENT,2),g);g=KJE.replace("DOWNPAYMENT_AMOUNT",f.dollars(this.DOWNPAYMENT_AMOUNT,2),g);g=KJE.replace("TOTAL_CMHC",f.dollars(this.TOTAL_CMHC,2),g);g=KJE.replace("OTHER_FEES",f.dollars(this.OTHER_FEES,2),g);g=KJE.replace("ORIGINATION_FEES_PERCENT",f.percent(this.ORIGINATION_FEES_PERCENT/100,2),g);g=KJE.replace("ORIGINATION_FEES_AMT",f.dollars(this.ORIGINATION_FEES_AMT,2),g);g=KJE.replace("LOAN_TO_VALUE",f.percent(this.LOAN_TO_VALUE,2),g);g=KJE.replace("LOAN_APR_PAYMENT",f.dollars(this.LOAN_APR_PAYMENT,2),g);g=KJE.replace("LOAN_APR_AMOUNT",f.dollars(this.LOAN_APR_AMOUNT,2),g);g=KJE.replace("LOAN_APR",f.percent(this.LOAN_APR,3),g);g=KJE.replace("LOAN_AMOUNT_CMHC",f.dollars(this.LOAN_AMOUNT_CMHC,2),g);g=KJE.replace("LOAN_AMOUNT",f.dollars(this.LOAN_AMOUNT,2),g);g=KJE.replace("INTEREST_RATE",f.percent(this.INTEREST_RATE/100,3),g);g=KJE.replace("INTEREST_PAID",f.dollars(this.INTEREST_PAID,2),g);g=KJE.replace("FIRST_YEAR_INTEREST",f.dollars(this.FIRST_YEAR_INTEREST,2),g);g=KJE.replace("FIRST_MONTH_PRINCIPAL",f.dollars(this.FIRST_MONTH_PRINCIPAL,2),g);g=KJE.replace("FIRST_MONTH_INTEREST",f.dollars(this.FIRST_MONTH_INTEREST,2),g);g=KJE.replace("DISCOUNT_POINTS_PERCENT",f.percent(this.DISCOUNT_POINTS_PERCENT/100,2),g);g=KJE.replace("DISCOUNT_POINTS_AMT",f.dollars(this.DISCOUNT_POINTS_AMT,2),g);g=KJE.replace("TOTAL_OF_PAYMENTS",f.dollars(this.TOTAL_OF_PAYMENTS,2),g);g=KJE.replace("MORTGAGE_YRS_LEFT",f.number((this.TERM+this.ENTERED_MONTHS/e)-(this.PREPAY_STARTS_WITH/e)),g);g=KJE.replace("TERM",f.number(this.TERM),g);g=g.replace("**REPEATING GROUP**",this.sSchedule.getRepeat());this.sSchedule.clearRepeat();return g};KJE.CAMortgageLoanCalc.prototype.getAmountPaidCategories=function(){return this.totalpaid_cats};KJE.Default.PREPAY_NONE=0;KJE.Default.PREPAY_WEEKLY=1;KJE.Default.PREPAY_BIWEEKLY=2;KJE.Default.PREPAY_2XMONTHLY=3;KJE.Default.PREPAY_MONTHLY=4;KJE.Default.PREPAY_YEARLY=5;KJE.Default.PREPAY_ONETIME=6;KJE.Default.PREPAY_FREQUENCY=[0,52,26,24,12,1,0];KJE.Default.getPrepayDrop=function(c,b,g){KJE.Default.PREPAY_PERIOD_IDs=KJE.parameters.get("ARRAY_PREPAY_PERIOD_ID",[KJE.Default.PREPAY_NONE,KJE.Default.PREPAY_WEEKLY,KJE.Default.PREPAY_BIWEEKLY,KJE.Default.PREPAY_2XMONTHLY,KJE.Default.PREPAY_MONTHLY,KJE.Default.PREPAY_YEARLY,KJE.Default.PREPAY_ONETIME]);KJE.Default.PREPAY_PERIODS=KJE.parameters.get("ARRAY_PREPAY_PERIODS",["None","Weekly","Bi-weekly","Semi-monthly","Monthly","Yearly","One-time"]);var a=KJE.Default.PREPAY_PERIOD_IDs;var f=a.length;var e=KJE.Default.PREPAY_PERIODS;var d=new Array(f);for(i=0;i<f;i++){d[i]=e[a[i]]}return KJE.getDropBox(c,KJE.parameters.get(c,(!b?KJE.Default.PAY_LOAN_IDs:b)),a,d,g)};KJE.CAMortgageLoanCalc.prototype.getPeriodRate=function(a,b){if(this.bUSE_CAMORTGAGE){return(Math.pow(1+(a/200),(1/(b/2)))-1)}return(a/b)/100};KJE.CalcName="Interest Only Loan Calculator (Australian)";KJE.CalcType="AUInterestOnly";KJE.CalculatorTitleTemplate="Mortgage Loan Calculator";KJE.parameters.set("PAYMENT_TYPE",KJE.Default.PAY_MONTHLY);KJE.parseInputs=function(b){if(KJE.Default.getPayDrop){b=KJE.replace("**PAYMENT_TYPE**",KJE.Default.getPayDrop("PAYMENT_TYPE",KJE.Default.PAY_MONTHLY),b)}if(KJE.Default.getPrepayDrop){b=KJE.replace("**PREPAY_TYPE**",KJE.Default.getPrepayDrop("PREPAY_TYPE",KJE.Default.PREPAY_NONE),b)}var a=KJE.parameters.get("INTEREST_ONLY",false);if(a){b=KJE.replace("**TERM**",KJE.getDropBox("TERM",KJE.parameters.get("TERM",0),KJE.Default.IO_ID,KJE.Default.IO_ITEMS),b)}else{b=KJE.replace("**TERM**",KJE.getMortgageTermDrop("TERM",KJE.Default.MortgageTerm),b);b=KJE.replace("**LOAN_TERM_END**",KJE.getMortgageTermDrop("LOAN_TERM_END",KJE.Default.MortgageTermEnds),b)}return b};KJE.initialize=function(){KJE.CalcControl=new KJE.CAMortgageLoanCalc();KJE.GuiControl=new KJE.CAMortgageLoan(KJE.CalcControl)};KJE.CAMortgageLoan=function(k){var e=KJE;var h=KJE.inputs.items;this.MSG_GRAPHTOTAL_SUBTITLE1=KJE.parameters.get("MSG_GRAPHTOTAL_SUBTITLE1","Total Interest KJE1");this.MSG_GRAPHTOTAL_SUBTITLE2=KJE.parameters.get("MSG_GRAPHTOTAL_SUBTITLE2","Prepayment Interest Savings KJE1");this.MSG_GRAPHPAYMENTS_SUBTITLE1=KJE.parameters.get("MSG_GRAPHPAYMENTS_SUBTITLE1","Principal Balances by Year");this.MSG_GRAPHPAYMENTS_SUBTITLE2=KJE.parameters.get("MSG_GRAPHPAYMENTS_SUBTITLE2","Prepayment Term KJE1");KJE.MortgageAmtSlider("LOAN_AMOUNT","Mortgage amount");if(k.bIO){KJE.DropBox("TERM","Mortgage amortization")}else{KJE.MortgageTermDropBoxSlider("TERM","Mortgage amortization");KJE.MortgageTermDropBoxSlider("LOAN_TERM_END","Mortgage term")}KJE.MortgageRateSlider("INTEREST_RATE","Interest rate");KJE.DropBox("PREPAY_TYPE","Prepayment type");KJE.Label("MONTHLY_PAYMENT","Mortgage payment",null,null,"KJEBold");KJE.NumberSlider("PREPAY_STARTS_WITH","Start with payment",0,KJE.Default.MortgageTermMax*12);KJE.Slider("PREPAY_AMOUNT","Prepayment amount",0,10000000,0,e.FMT_DOLLARS,0,KJE.s_label[0],KJE.useScale(0));KJE.Radioboxes("BY_YEAR","Report amortization",true,"Annually","By period");KJE.DropBox("PAYMENT_TYPE","Payment type");var a=KJE.parameters.get("MSG_DROPPER_TITLE","Loan information: ");var c=KJE.parameters.get("MSG_DROPPER_CLOSETITLE","KJE1 loan for KJE2 years at KJE3");var m=KJE.parameters.get("MSG_PREPAY_IMMEDIATE","starting immediately");var f=KJE.parameters.get("MSG_DROPPER_PREPAYMENTS","Prepayments:");var b=KJE.parameters.get("MSG_DROPPER_PREPAYMENTSCLOSE","KJE1");var d=function(){return a+KJE.subText(KJE.getKJEReplaced(c,e.dollars(k.LOAN_AMOUNT),e.number(k.TERM),e.percent(k.INTEREST_RATE/100,3)),"KJECenter")};KJE.addDropper(new KJE.Dropper("INPUTS",true,a,d),KJE.colorList[0]);var n=function(){if(k.PREPAY_TYPE==KJE.Default.PREPAY_NONE){return f+KJE.subText(KJE.Default.PREPAY_PERIODS[KJE.Default.PREPAY_NONE],"KJECenter")}else{var l=h.PREPAY_STARTS_WITH.getFormatted();return f+KJE.subText(h.PREPAY_AMOUNT.getFormatted()+" "+h.PREPAY_TYPE.getFormatted().toLowerCase()+" "+(h.PREPAY_STARTS_WITH.getValue()<1?m:h.PREPAY_STARTS_WITH.getName().toLowerCase()+" "+h.PREPAY_STARTS_WITH.getFormatted()),"KJECenter")}};KJE.addDropper(new KJE.Dropper("PREPAY",false,f,n),KJE.colorList[0]);var g=KJE.gNewGraph(KJE.gSTACKED,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_TITLE1","Total Payments KJE1<div class=KJESubTitle>KJE2</div>"));g._legend._iOrientation=(KJE.gLegend.TOP_RIGHT);g._titleYAxis.setText(KJE.sCurrency);g._showItemLabel=false;var j=KJE.gNewGraph(KJE.gCOLUMN,"GRAPH2",true,true,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_TITLE2","Mortgage Term KJE1<div class=KJESubTitle>KJE2</div>"));j._legend._iOrientation=KJE.parameters.get("GRAPH2_LEGEND",KJE.gLegend.GRID_TOP_RIGHT);j._iArea=KJE.gGraphLine.AREA_ALL};KJE.CAMortgageLoan.prototype.setValues=function(b){var a=KJE.inputs.items;b.LOAN_AMOUNT=a.LOAN_AMOUNT.getValue();b.TERM=a.TERM.getValue();b.PAYMENT_TYPE=a.PAYMENT_TYPE.getValue();b.INTEREST_RATE=a.INTEREST_RATE.getValue();b.PREPAY_TYPE=a.PREPAY_TYPE.getValue();b.PREPAY_AMOUNT=a.PREPAY_AMOUNT.getValue();b.PREPAY_STARTS_WITH=a.PREPAY_STARTS_WITH.getValue();b.BY_YEAR=a.BY_YEAR.getValue();if(b.PREPAY_TYPE==KJE.Default.PREPAY_NONE){a.PREPAY_AMOUNT.disable();a.PREPAY_STARTS_WITH.disable()}else{a.PREPAY_AMOUNT.enable();a.PREPAY_STARTS_WITH.enable()}if(a.LOAN_TERM_END){b.LOAN_TERM_END=a.LOAN_TERM_END.getValue()}};KJE.CAMortgageLoan.prototype.refresh=function(e){var b=KJE.inputs.items;var d=KJE;var a=KJE.gGraphs[0];var c=KJE.gGraphs[1];KJE.setTitleTemplate(d.dollars(e.SHOW_PITI?e.MONTHLY_PITI:e.MONTHLY_PI,2));a.removeAll();a.setGraphCategories(e.getAmountPaidCategories());if(e.PREPAY_TYPE==KJE.Default.PREPAY_NONE){a.setTitleTemplate(d.dollars(e.TOTAL_OF_PAYMENTS),KJE.getKJEReplaced(this.MSG_GRAPHTOTAL_SUBTITLE1,d.dollars(e.INTEREST_PAID)));a._axisX.setVisible(false)}else{a.setTitleTemplate(d.dollars(e.TOTAL_OF_PAYMENTS),KJE.getKJEReplaced(this.MSG_GRAPHTOTAL_SUBTITLE2,d.dollars(e.PREPAY_INTEREST_SAVINGS)));a._axisX.setVisible(true)}a.add(new KJE.gGraphDataSeries(e.DS_INTEREST,e.MSG_INTEREST,a.getColor(1),"",e.MSG_POP_INTEREST));a.add(new KJE.gGraphDataSeries(e.DS_PRINCIPAL,e.MSG_PRINCIPAL,a.getColor(2),"",e.MSG_POP_PRINCIPAL));a.paint();c.removeAll();c._titleXAxis.setText(e.MSG_YEAR_NUMBER);c.setGraphCategories(e.cats);if(e.PREPAY_TYPE==KJE.Default.PREPAY_NONE){c.add(new KJE.gGraphDataSeries(e.DS_PRINCIPAL_BAL,e.MSG_NORMAL_PAYMENTS,c.getColor(1),"",e.MSG_POP_PRINCIPAL_NORMAL+" "));c.setTitleTemplate(KJE.getTermLabel(Math.ceil((e.ACCEL_SHORTEN_MONTHS/e.PAYMENTS_PER_YEAR)*12),false),this.MSG_GRAPHPAYMENTS_SUBTITLE1);c._legend.setVisible(false)}else{c.add(new KJE.gGraphDataSeries(e.DS_PRINCIPAL_BAL,e.MSG_NORMAL_PAYMENTS,c.getColor(1),"",e.MSG_POP_PRINCIPAL_NORMAL+" "));c.add(new KJE.gGraphDataSeries(e.DS_PREPAY_PRINCIPAL_BAL,e.MSG_PREPAYMENTS,c.getColor(2),"",e.MSG_POP_PRINCIPAL_PREPAY+" "));c.setTitleTemplate(KJE.getTermLabel(Math.ceil((e.ACCEL_SHORTEN_MONTHS/e.PAYMENTS_PER_YEAR)*12),false),KJE.getKJEReplaced(this.MSG_GRAPHPAYMENTS_SUBTITLE2,KJE.getTermLabel(Math.ceil((e.PREPAY_SHORTEN_MONTHS/e.PAYMENTS_PER_YEAR)*12),false)));c._legend.setVisible(true)}c.paint();b.MONTHLY_PAYMENT.setText(d.dollars(e.MONTHLY_PI,2));if(e.SHOW_PITI){b.MONTHLY_PITI.setText(d.dollars(e.MONTHLY_PITI,2))}};KJE.Default.MortgageAmt=200000;KJE.Default.HomePrice=220000;KJE.Default.MortgageMin=0;KJE.Default.MortgageMax=10000000;KJE.Default.MortgageTerm=30;KJE.Default.MortgageTermMin=1;KJE.Default.MortgageTermMax=35;KJE.Default.MortgageTermIncrement=5;KJE.Default.MortgageShowAll=true;KJE.Default.MortgageShowAllMax=25;KJE.Default.MortgageRateMin=1;KJE.Default.MortgageRateMax=25;KJE.Default.RateFix15=4;KJE.Default.RateFix30=4.5;KJE.Default.RateAdj=4;KJE.parameters.set("TITLE_TEMPLATE","Interest Only Loan Calculator");KJE.parameters.set("MSG_GRAPH_TITLE1","Total Repayments KJE1<div class=KJESubTitle>KJE2</div>");KJE.parameters.set("MSG_GRAPH_TITLE2","Loan Term KJE1<div class=KJESubTitle>KJE2</div>");KJE.parameters.set("MSG_GRAPHTOTAL_SUBTITLE1","Total Interest KJE1");KJE.parameters.set("MSG_GRAPHTOTAL_SUBTITLE2","Extra repayment interest savings KJE1");KJE.parameters.set("MSG_GRAPHPAYMENTS_SUBTITLE1","Principal Balances by Year");KJE.parameters.set("MSG_GRAPHPAYMENTS_SUBTITLE2","Extra repayment term KJE1");KJE.parameters.set("MSG_LOAN_AMOUNT","Loan amount");KJE.parameters.set("MSG_TERM","Term in years");KJE.parameters.set("MSG_PAYMENT_TYPE","Repayment frequency");KJE.parameters.set("MSG_MONTHLY_PAYMENT","Repayment");KJE.parameters.set("MSG_PREPAY_TYPE","Extra repayment type");KJE.parameters.set("MSG_PREPAY_AMOUNT","Extra amount");KJE.parameters.set("MSG_PREPAY_STARTS_WITH","Start with repayment");KJE.parameters.set("MSG_DROPPER_PREPAYMENTS","Extra repayments:");KJE.parameters.set("ARRAY_PREPAY_PERIODS",["none","weekly","fortnightly","semi-monthly","monthly","yearly","one-time"]);KJE.parameters.set("USE_CAMORTGAGE",false);KJE.parameters.set("MSG_PREPAYMENTS","Extra repayments");KJE.parameters.set("PREPAY_PAYOFF_MESSAGE","<br>PREPAY_PAYOFF years with extra repayments");KJE.parameters.set("MSG_REPORT_COL1","Regular Repayment Schedule");KJE.parameters.set("MSG_REPORT_COL2","Extra Repayment Schedule");KJE.parameters.set("MSG_REPORT_COL4","Repayment");KJE.parameters.set("MSG_REPORT_COL9","Total Repayments");KJE.parameters.set("GRAPH2_LEGEND",KJE.gLegend.TOP_RIGHT);KJE.parameters.set("END_BALANCE",true);KJE.parameters.set("ARRAY_PAY_PERIODS_IDS",[KJE.Default.PAY_WEEKLY,KJE.Default.PAY_BIWEEKLY,KJE.Default.PAY_MONTHLY,KJE.Default.PAY_ANNUAL]);KJE.parameters.set("ARRAY_PAY_PERIODS",["weekly","accelerated weekly","accelerated fortnightly","fortnightly","semi-monthly","monthly","quarterly","semi-annual","annual"]);KJE.parameters.set("ARRAY_PAY_PERIODS_TITLE",["weekly","Accelerated Weekly","Accelerated Fortnightly","Fortnightly","Semi-monthly","Monthly","Quarterly","Semi-annual","Annual"]);KJE.InputScreenText=' <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Loan information:</div></div> <div id=KJE-E-INPUTS > <div id="KJE-C-LOAN_AMOUNT"><input id="KJE-LOAN_AMOUNT" /></div> <div id="KJE-C-TERM">**TERM**</div> <div id="KJE-C-PAYMENT_TYPE">**PAYMENT_TYPE**</div> <div id="KJE-C-INTEREST_RATE"><input id="KJE-INTEREST_RATE" /></div> <div id="KJE-C-MONTHLY_PAYMENT"><div id="KJE-MONTHLY_PAYMENT"></div></div> <div id="KJE-C-BY_YEAR"><fieldset id=\'KJE-FS-BY_YEAR\'><input id="KJE-BY_YEAR1" type=radio name=BY_YEAR /><input id="KJE-BY_YEAR2" type=radio name=BY_YEAR /></fieldset></div> <div style="height:10px"></div> </div> <div id=KJE-D-PREPAY><div id=KJE-P-PREPAY>Prepayment information</div></div> <div id=KJE-E-PREPAY > <div id="KJE-C-PREPAY_TYPE">**PREPAY_TYPE**</div> <div id="KJE-C-PREPAY_AMOUNT"><input id="KJE-PREPAY_AMOUNT" /></div> <div id="KJE-C-PREPAY_STARTS_WITH"><input id="KJE-PREPAY_STARTS_WITH" /></div> <div style="height:10px"></div> </div> **GRAPH1** **GRAPH2** ';KJE.DefinitionText=" <div id='KJE-D-LOAN_AMOUNT' ><dt>Loan amount</dt><dd>Original or expected balance for your loan.</dd></div> <div id='KJE-D-INTEREST_RATE' ><dt>Interest rate</dt><dd>Annual interest rate for this loan.</dd></div> <div id='KJE-D-TERM' ><dt>Term</dt><dd>The number of years over which you will repay this loan.</dd></div> <div id='KJE-D-PAYMENT_TYPE'><dt>Repayment type</dt><dd>Your choices are weekly (52 payments per year), fortnightly (26 payments per year), monthly or annually.</dd></div> <div id='KJE-D-' ><dt>Total repayments</dt><dd>Total of all monthly repayments over the full term of the loan. This total repayment amount assumes that there are no extra repayments of principal.</dd></div> <div id='KJE-D-' ><dt>Total interest</dt><dd>Total of all interest paid over the full term of the loan. This total interest amount assumes that there are no extra repayments of principal.</dd></div> <div id='KJE-D-PREPAY_TYPE' ><dt>Extra repayment type</dt><dd>The frequency of extra repayments. The options are none, weekly, fortnightly, monthly, yearly and one-time.</dd></div> <div id='KJE-D-PREPAY_AMOUNT' ><dt>Extra repayment amount</dt><dd>Amount that will be prepaid on your loan. This amount will be applied to the loan principal balance, based on the extra repayment type.</dd></div> <div id='KJE-D-PREPAY_STARTS_WITH' ><dt>Start with repayment</dt><dd>This is the repayment number that your extra repayments will begin with. For one-time repayment, this is the repayment number that the single extra repayment will be included in. All extra repayments are assumed to be received by your lender in time to be included in the following month's interest calculation.</dd></div> <div id='KJE-D-' ><dt>Savings</dt><dd>Total amount of interest you will save with extra repayments.</dd></div> ";KJE.ReportText=' <!--HEADING "Loan Calculator Results" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>Your repayment is MONTHLY_PI for a rate of INTEREST_RATE.</h2> **GRAPH** **GRAPH** <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Loan Summary</caption> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total interest</th><td class="KJECell" >INTEREST_PAID</td></tr> </tfoot> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Loan amount</th><td class="KJECell KJECell40">LOAN_AMOUNT</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Term</th><td class="KJECell">TERM years</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Interest rate</th><td class="KJECell" >INTEREST_RATE</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Repayment</th><td class="KJECell" >MONTHLY_PI</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total repayments</th><td class="KJECell" >TOTAL_OF_PAYMENTS</td></tr> </tbody> </table> </div> <h2 class=\'KJEReportHeader KJEFontHeading\'>Extra repayment results</h2>Extra principal repayments on your loan can save you a great deal of interest. They can also shorten the time it takes to pay off your loan, assuming the interest rate does not change during the repayment period. PREPAY_MESSAGE <p> <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Extra Repayment Summary</caption> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Amount</th><td class="KJECell KJECell40">PREPAY_AMOUNT PREPAY_TYPE</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Start with repayment</th><td class="KJECell">PREPAY_STARTS_WITH&nbsp;</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total repayments</th><td class="KJECell">PREPAY_TOTAL_OF_PAYMENTS&nbsp;</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total interest</th><td class="KJECell">PREPAY_INTEREST_PAID&nbsp;</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Interest savings</th><td class="KJECell">PREPAY_INTEREST_SAVINGS&nbsp;</td></tr> </tbody> </table> </div> <h2 class=\'KJEScheduleHeader KJEFontHeading\'>Repayment schedule</h2> **REPEATING GROUP** ';
/*
   *  babacalc.js v2.1.1
   *  Copyright (c) 2025 Chris Tomlinson<chris@babaviva.net>
   *  MIT Licence
*/
var last_result='';
var saved_result='';
var last_input='';
var last_printed=''
var transfertext='';
var modifying_history=false;
var history_index=1;
torad = new Decimal(3.1415926535898/180);
undostack = [];
undocaret = [];
calc_history = [];
var history_item=0;
var addtostack=true;
var stackcount=99;
var afterequals=false;
var regex_HexDigit='(?:[0-9a-fA-F])';
var regex_Digit='(?:[0-9])';
var regex_OctalDigit='(?:[0-7])';
var regex_NonZeroDigit='(?:[1-9])';
var regex_Sign='(?:[\+]|[\-])';
var regex_DecimalNum='(?:(?:[0]|'+regex_NonZeroDigit+regex_Digit+'*))';
var regex_OctalNum='(?:[0]'+regex_OctalDigit+'*)';
var regex_HexNum='(?:[0](?:[x]|[X])'+regex_HexDigit+'+)';
var regex_SignedInt='(?:'+regex_Sign+'?'+regex_Digit+'+)';
var regex_Expo='(?:[e]|[E])';
var regex_ExponentPart='(?:'+regex_Expo+regex_SignedInt+')';
var regex_Float1='(?:'+regex_Digit+'+[\.]'+regex_Digit+'*'+regex_ExponentPart+'?)';
var regex_Float2='(?:[\.]'+regex_Digit+'+'+regex_ExponentPart+'?)';
var regex_Float3='(?:'+regex_Digit+'+'+regex_ExponentPart+')';
var regex_Float4='(?:'+regex_Digit+'+)';
var regex_Float='(?:'+regex_Float1+'|'+regex_Float2+'|'+regex_Float3+'|'+regex_Float4+')';
var regex_ZeroFloat1='(?:[0]+[\.][0]*'+regex_ExponentPart+'?)';
var regex_ZeroFloat2='(?:[\.][0]+'+regex_ExponentPart+'?)';
var regex_ZeroFloat3='(?:[0]+'+regex_ExponentPart+')';
var regex_ZeroFloat4='(?:[0]+)';
var regex_ZeroFloat='(?:'+regex_ZeroFloat1+'|'+regex_ZeroFloat2+'|'+regex_ZeroFloat3+'|'+regex_ZeroFloat4+')';
var regex_Space='(?:[\n\ \t])';
var regex_Operands='(?:[\(\)\+\-\/\*\|\&\,\~\^]|\<\<|\>\>|\>\>\>|\%)'
var regex_MathStuff='(?:E|LN10|LN2|LOG10E|LOG2E|PI|SQRT1_2|SQRT2|abs|acos|asin|atan2|atan|ceil|cos|exp|floor|log|log10|max|min|pow|random|round|sin|sqrt|tan)'
var regex_Functions='(?:(?:Math[\.]'+regex_MathStuff+')|'+regex_MathStuff+')';
var regex_allowable=new RegExp(
	regex_HexNum+'|'+regex_OctalNum+'|'+regex_Float+'|'+regex_DecimalNum+'|'+
	regex_ZeroFloat+'|'+regex_Space+'|'+regex_Operands+'|'+regex_Functions+'|Ans','g'
);
var caretposition=0;
var lastcaretpos=0;
var numchars="0123456789.";
var numchars2="0123456789.)";
var numchars3="0123456789. ";
var numchars4="0123456789";
var prime=[];
prime[1]=2;
prime[2]=3;
prime[3]=5;
prime[4]=7;
prime[5]=11;
prime[6]=13;
prime[7]=17;
prime[8]=19;
prime[9]=23;
prime[10]=29;
prime[11]=31;
prime[12]=37;
prime[13]=41;
prime[14]=43;
prime[15]=47;
prime[16]=53;
prime[17]=59;
prime[18]=61;
prime[19]=67;
prime[20]=71;
prime[21]=73;
prime[22]=79;
prime[23]=83;
prime[24]=89;
prime[25]=97;

prime[26]=101;
prime[27]=103;
prime[28]=107;
prime[29]=109;
prime[30]=113;
prime[31]=127;
prime[32]=131;
prime[33]=137;
prime[34]=139;
prime[35]=149;
prime[36]=151;
prime[37]=157;
prime[38]=163;
prime[39]=167;
prime[40]=173;
prime[41]=179;
prime[42]=181;
prime[43]=191;
prime[44]=193;
prime[45]=197;
prime[46]=199;


prime[47]=211;
prime[48]=223;
prime[49]=227;
prime[50]=229;
prime[51]=233;
prime[52]=239;
prime[53]=241;
prime[54]=251;
prime[55]=257;
prime[56]=263;
prime[57]=269;
prime[58]=271;
prime[59]=277;
prime[60]=281;
prime[61]=283;
prime[62]=293;

prime[63]=307;
prime[64]=311;
prime[65]=313;
prime[66]=317;
prime[67]=331;
prime[68]=337;
prime[69]=347;
prime[70]=349;
prime[71]=353;
prime[72]=359;
prime[73]=367;
prime[74]=373;
prime[75]=379;
prime[76]=383;
prime[77]=389;
prime[78]=397;

prime[79]=401;
prime[80]=409;
prime[81]=419;
prime[82]=421;
prime[83]=431;
prime[84]=433;
prime[85]=439;
prime[86]=443;
prime[87]=449;
prime[88]=457;
prime[89]=461;
prime[90]=463;
prime[91]=467;
prime[92]=479;
prime[93]=487;
prime[94]=491;
prime[95]=499;

prime[96]=503;
prime[97]=509;
prime[98]=521;
prime[99]=523;
prime[100]=541;
prime[101]=547;
prime[102]=557;
prime[103]=563;
prime[104]=569;
prime[105]=571;
prime[106]=577;
prime[107]=587;
prime[108]=593;
prime[109]=599;

prime[110]=601;
prime[111]=607;
prime[112]=613;
prime[113]=617;
prime[114]=619;
prime[115]=631;
prime[116]=641;
prime[117]=643;
prime[118]=647;
prime[119]=653;
prime[120]=659;
prime[121]=661;
prime[122]=673;
prime[123]=677;
prime[124]=683;
prime[125]=691;

prime[126]=701;
prime[127]=709;
prime[128]=719;
prime[129]=727;
prime[130]=733;
prime[131]=739;
prime[132]=743;
prime[133]=751;
prime[134]=757;
prime[135]=761;
prime[136]=769;
prime[137]=773;
prime[138]=787;
prime[139]=797;

prime[140]=809;
prime[141]=811;
prime[142]=821;
prime[143]=823;
prime[144]=827;
prime[145]=829;
prime[146]=839;
prime[147]=853;
prime[148]=857;
prime[149]=859;
prime[150]=863;
prime[151]=877;
prime[152]=881;
prime[153]=883;
prime[154]=887;

prime[155]=907;
prime[156]=911;
prime[157]=919;
prime[158]=929;
prime[159]=937;
prime[160]=941;
prime[161]=947;
prime[162]=953;
prime[163]=967;
prime[164]=971;
prime[165]=977;
prime[166]=983;
prime[167]=991;
prime[168]=997;

var partialpro=false;
var shifton=false;
//firefox
var mkey=173;
var pkey=61;

var mkey2=189;
var pkey2=187;
var ansext=' ';
var mynumerator=0;
var mydenominator=0;
var mydecimal=0;
var mydeclen=15;
var E=Math.E;
var LN10=Math.LN10;
var LN2=Math.LN2;
var LOG10E=Math.LOG10E;
var LOG2E=Math.LOG2E;
var PI=Math.PI;
var SQRT1_2=Math.SQRT1_2;
var SQRT2=Math.SQRT2;
function abs(x){return Math.abs(x);}
function acos(x){x2 = new Decimal(x); x3= new Decimal(x2); b = Decimal.acos(x3); b1=Decimal(b/torad); c = b1.toDP(7);return parseFloat(c);}
function asin(x){x2 = new Decimal(x); x3= new Decimal(x2); b = Decimal.asin(x3); b1=Decimal(b/torad); c = b1.toDP(7);return parseFloat(c);}
function atan(x){x2 = new Decimal(x); x3= new Decimal(x2); b = Decimal.atan(x3); b1=Decimal(b/torad); c = b1.toDP(7);return parseFloat(c);}
function atan2(x,y){return Math.atan2(x,y);}
function ceil(x){return Math.ceil(x);}
//function cos(x){return Math.cos(x*0.01745329252);}
function cos(x){x2 = new Decimal(x); x3= new Decimal(torad*x2); b = Decimal.cos(x3); c = b.toDP(7);return parseFloat(c);}
function exp(x){return Math.exp(x);}
function floor(x){return Math.floor(x);}
function log(x){return Math.log(x);}
function max(x,y){return Math.max(x,y);}
function min(x,y){return Math.min(x,y);}
function pow(x,y){return Math.pow(x,y);}
function random(){return Math.random();}
function round(x){return Math.round(x);}
//function sin(x){return Math.sin(x*0.01745329252 );}
function sin(x){x2 = new Decimal(x); x3= new Decimal(torad*x2); b = Decimal.sin(x3); c = b.toDP(7);return parseFloat(c);}


function sqrt(x){return Math.sqrt(x);}
//function tan(x){return Math.tan(x*0.01745329252);}
function tan(x){x2 = new Decimal(x); x3= new Decimal(torad*x2); b = Decimal.tan(x3); c = b.toDP(7);return parseFloat(c);}

function log10(x){return Math.log(x)/Math.LN10;}

function replace_binary(s){
	var r=new RegExp("^((?:[a]|[^a])*)0[bB]([01]{1,32})((?:[a]|[^a])*)$");
	while(r.exec(s)){
		s=RegExp.$1+" "+from_bin(RegExp.$2)+" "+RegExp.$3;
	}
	return s;
}

function replace_Ans(s){
	var r=new RegExp("^((?:[a]|[^a])*)Ans((?:[a]|[^a])*)$");
	while(r.exec(s)){
		s=RegExp.$1+" "+saved_result+" "+RegExp.$2;
	}
        return s;
}

function do_calculation(){
	var current_calc=document.calculator.line.value;
	var mod_calc=replace_Ans(current_calc);
	mod_calc=replace_binary(mod_calc);
	if(mod_calc!=last_printed&&mod_calc!=last_input&&!modifying_history){
		var not_allowed=mod_calc.split(regex_allowable);
		var num_badTokens=0;
		for(var k=0;k<not_allowed.length;k++){
			if(not_allowed[k].length!=0){
				num_badTokens++;
			}
		}
 			try{
				var calc_result=''+eval(mod_calc);
                                if(calc_result!=undefined){
                                        if (partialpro==true)
                                        {
                                          return calc_result;
                                        }
                                        last_result=calc_result;
					saved_result=calc_result;
					last_input='';
                                        display_result();
					add_toHistory(current_calc);
					save_calc();
					ansext='Ans ';
				}
			}catch(ex){
				last_input=document.calculator.line.value;
                                document.calculator.line.value='Error';
				calcdisplay(document.calculator.line.value);
			}
		}else{
			last_input=document.calculator.line.value;
   			document.calculator.line.value='Syntax Error';
			calcdisplay(document.calculator.line.value);

		}
}
function line_change(){
	if(last_printed!=document.calculator.line.value){
		last_result='';
	}
}
function display_result(){
	if(last_result!=''){
		var should_display=document.calculator.display.selectedIndex;
                var int_val=parseInt(last_result);
		var float_val=parseFloat(last_result);
		var to_print='';
		if(''+float_val!='NaN'&&should_display==1){
			to_print=to_sci(last_result,false);
		}else if(''+float_val!='NaN'&&should_display==2){
			to_print=to_sci(last_result,true);
		}else if(''+int_val!='NaN'&&should_display==3){
			to_print=to_hex(int_val);
		}else if(''+int_val!='NaN'&&should_display==4){
			to_print=to_octal(int_val);
		}else if(''+int_val!='NaN'&&should_display==5){
			to_print=to_bin(int_val);
		}else{
			to_print=round_extra_sf(float_val);
		}


                e1=to_print.indexOf('e+');
                if (e1>0)
                {
                  epower=to_print.substr(e1+2);
                  to_print=to_print.substr(0,e1)+"&nbsp;&times;&nbsp;10<sup name='pwn'>&nbsp;<span>"+epower+"</span></sup>";
                  // replace e+ with x 10 to power
                 }
                 e1=to_print.indexOf('e-');
                if (e1>0)
                {
                  epower=to_print.substr(e1+2);
                  to_print=to_print.substr(0,e1)+"&nbsp;&times;&nbsp;10<sup name='pwn'>&nbsp;<span>-"+epower+"</span></sup>";
                  // replace e- with x 10 to power
                 }

                last_printed=to_print;
		document.calculator.line.value=to_print;
                console.log('res: '+to_print);
                calcdisplay(document.calculator.line.value);
		history_index=1;

		document.calculator.line.style.backgroundColor='#aacc99';
	}else{
		document.calculator.line.style.backgroundColor='#cccc99';
	}

}
function round_extra_sf(f){
    var s=f.toPrecision(14);
	s=s.replace(/^([\+\-0-9\\.]*[1-9\.])0+((?:e[0-9\+\-]+)?)$/g,'$1$2');
	s=s.replace(/\.((?:e[0-9\+\-]+)?)$/g,'$1');
    return s;
}
function to_sci(s,eng){
	var the_exp=0;
	var is_negative=false;
	if(s.length>0&&s.charAt(0)=='-'){
		is_negative=true;
		s=s.substring(1,s.length);
	}
	var regex_splitter=s.split(new RegExp('[eE]'));
	if(regex_splitter.length>1){
		the_exp=parseInt(regex_splitter[1]);
		s=regex_splitter[0];
	}
	regex_splitter=s.split(/[\.]/);
	if(regex_splitter.length>1){
		s=regex_splitter[0]+regex_splitter[1];
		the_exp+=regex_splitter[0].length-1;
	}else{
		the_exp+=s.length-1;
	}
	var leading_zeros=0;
	for(leading_zeros=0;leading_zeros<s.length&&s.charAt(leading_zeros)=='0';leading_zeros++){
		the_exp=the_exp-1;
	}
	s=s.substring(leading_zeros,s.length);
	var move_dec;
	if(eng){
		if(the_exp>=0){
			move_dec=(the_exp%3)+1;
		}else{
			move_dec=4-((-the_exp)%3);
			if(move_dec==4){
				move_dec=1;
			}
		}
		the_exp-=(move_dec-1);
	}else{
		move_dec=1;
	}
	var trailing_zeros='';
	for(var i=s.length;i<move_dec;i++){
		trailing_zeros+='0';
	}
	return(
		(is_negative?'-':'')+
		((s.length==0)?'0':s.substring(0,move_dec))+
		((s.length<=move_dec)?trailing_zeros:('.'+s.substring(move_dec,s.length)))+
		((s.length==0||the_exp==0)?'':('e'+the_exp))
	);
}
var digit_array=new Array('0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f');
function to_hex(n){
	var hex_result=''
	var the_start=true;
	for(var i=32;i>0;){
		i-=4;
		var one_digit=(n>>i)&0xf;
		if(!the_start||one_digit!=0){
			the_start=false;
			hex_result+=digit_array[one_digit];
		}
	}
	return '0x'+(hex_result==''?'0':hex_result);
}

function to_octal(n){
	var oct_result=''
	var the_start=true;
	for(var i=33;i>0;){
		i-=3;
		var one_digit=(n>>i)&0x7;
		if(!the_start||one_digit!=0){
			the_start=false;
			oct_result+=digit_array[one_digit];
		}
	}
	return '0'+(oct_result==''?'0':oct_result);
}

function to_bin(n){
	var bin_result=''
	var the_start=true;
 for(var i=32;i>0;){
		i-=1;
		var one_digit=(n>>i)&0x1;
		if(!the_start||one_digit!=0){
			the_start=false;
			bin_result+=digit_array[one_digit];
		}
	}
	return '0b'+(bin_result==''?'0':bin_result);
}

function from_bin(s){
	var bin_result=0;
	var the_place=0;
	var i=s.length-1;
	while(i>=0&&the_place<32){
		if(s.charAt(i)=='1'){
			bin_result|=1<<the_place;
		}
		the_place++;
		i-=1;
	}
	return bin_result;
}

function set_calc(s){
	if(!modifying_history&&s!=''){
		last_result='';
		last_input=s;
		document.calculator.line.value=s;
		calcdisplay(document.calculator.line.value);
		last_input='';
		last_printed='';
		history_index=1;
		document.calculator.line.style.backgroundColor='#cccc99';
	}
}
function append_calc(s,replaceLast){
	if(!modifying_history&&s!=''){
		last_result='';
		var new_contents
		if(replaceLast==0&&document.calculator.line.value==last_printed){
			new_contents=s;
		}else if(replaceLast==1&&document.calculator.line.value==last_printed){
			new_contents='Ans '+s;
		}else{
			new_contents=document.calculator.line.value+s;
		}
		last_input=new_contents;
		document.calculator.line.value=new_contents;
		calcdisplay(document.calculator.line.value);
		last_input='';
		last_printed='';
		history_index=1;
		document.calculator.line.style.backgroundColor='#cccc99';
    disp=document.getElementById('cdisplay');
    var cp = disp.innerHTML.length;

	}
}
function clear_calc(){
	document.calculator.line.value='';
	calcdisplay(document.calculator.line.value);
	history_index=1;
	undostack = [];
	undocaret = [];
 	stackcount=99;
   	if (shifton===true){shift();}
	document.calculator.line.style.backgroundColor='#cccc99';
	document.getElementById('cdisplay').focus();
}
function dofocus()
{
  document.getElementById('cdisplay').focus();
}
function setfocus(t)
{
        transfertext=t;
        var i =transfertext.lastIndexOf("=");
        if (i>0)
        {
           transfertext=transfertext.substr(0,i);
        }
        transfertext=preprocess(transfertext);
        if (transfertext=='&nbsp;')
        {
           transfertext='';
        }
        document.calculator.line.value=transfertext;

	calcdisplay(document.calculator.line.value);
        caretposition =transfertext.length;
        SetCaretPosition(disp, caretposition);
	document.getElementById('cdisplay').focus();
	if (i>0)
        {
           pre_calculation();
           var d=document.getElementById('cdisplay').innerText;
           parent.insertcalc(d);


        }
}
function preprocess(tbx)
{
    //alert(tbx);
    var tbx2="";
    var mysup= document.getElementById('superscripts');
          var usechars=mysup.innerText;
          console.log(usechars);
          console.log(tbx);
          var superdiv=usechars.substr(14,1);
          var superon=false;
          for (var i=0;i<tbx.length;i++)
          {
              var testchar=tbx.substr(i,1);

              isup=usechars.indexOf(testchar);
              if  (isup>=0)
              {

                  if (superon==false)
                  {
                    tbck=tbx.substr(i-3,3);
                    // test for preceeding sin, cos or tan
                    if ((tbck=='sin')||(tbck=='cos')||(tbck=='tan'))
                    {
                      tbx2=tbx2+'<sup><span>';
                    }
                    else
                    {
                      tbx2=tbx2+'<sup name="pwn"><span>';
                    }



                    superon=true;
                  }
                  if (isup==11)
                  {
                   tbx2=tbx2+'-</span>';
                  }
                  else if (isup==10)
                  {
                   tbx2=tbx2+'+</span>';
                  }
                  else if (isup==14)
                  {
                   tbx2=tbx2+'/</span>';
                  }
                  else
                  {
                     tbx2=tbx2+isup+'</span>';
                  }

              }
              else
              {
                if (superon==true)
                {
                   tbx2=tbx2+'</sup>';
                   superon=false;
                   if (testchar!='=')
                   {
                      tbx2=tbx2+'<span>';
                      tbx2=tbx2+testchar+'</span>';
                      console.log(tbx2);
                   }
                   else
                   {
                      tbx2=tbx2+testchar;

                   }
                }
                else
                {
                      if (testchar!=' ')
                      {
                        tbx2=tbx2+'<span>'+testchar+'</span>';
                      }
                }

              }

          }
          tbx2=tbx2+'&nbsp;';
      //    alert(tbx2);
          return(tbx2);
}
function add_toHistory(s){
	modifying_history=true;
	var is_found=false;
	var the_last=s;
	var next_history;
	var history_elements=document.calculator.history.options;
	for(var i=1;i<history_elements.length&&!is_found;i++){
		next_history=history_elements[i].text;
		history_elements[i].text=the_last;
		if(next_history==s){
			is_found=true;
		}
		the_last=next_history;
	}
	document.calculator.history.selectedIndex=0;
	modifying_history=false;
}
function load_calc(){
	modifying_history=true;
	var history_elements=document.calculator.history.options;
	var calc_cookie=get_cookie('calculatorState');
	if(calc_cookie!=null&&calc_cookie.length>1){
		var history_part=calc_cookie.substring(1,calc_cookie.length);
		if(history_part!=null){
			var history_split=history_part.split('\n');
			for(var i=1;i<history_elements.length&&i<history_split.length+1;i++){
				history_elements[i].text=history_split[i-1];
			}
		}
		document.calculator.display.selectedIndex=parseInt(calc_cookie.charAt(0));
	}
	modifying_history=false;

}
function save_calc(){
	var history_elements=document.calculator.history.options;
	var calc_cookie=document.calculator.display.selectedIndex;
	for(var i=1;i<history_elements.length;i++){
		calc_cookie+=history_elements[i].text+'\n';
	}
	var expires_date=new Date();
	// cookie expires in one year
	expires_date.setTime(expires_date.getTime()+365*24*60*60*1000);
	document.calc_cookie=(
		'calculatorState'+'='+
		escape(calc_cookie)+
		';expires='+expires_date.toGMTString()
	);
}
function get_cookie(name){
        var cookie_prefix=name+"=";

	var cookie_begin=document.cookie.indexOf(";"+cookie_prefix);
	if(cookie_begin==-1){
		cookie_begin=document.cookie.indexOf(cookie_prefix);
		if(cookie_begin!=0)return null;
	}else{
		cookie_begin+=2;
	}
	var cookie_end=document.cookie.indexOf(";",cookie_begin);
	if(cookie_end==-1)cookie_end=document.cookie.length;
	return unescape(document.cookie.substring(cookie_begin+cookie_prefix.length,cookie_end));
}
function display_nextHistory(){
	var history_elements=document.calculator.history.options;
	var next_history="";
	if(history_index>=history_elements.length||history_elements[history_index].text==""){
		history_index=1;
	}
	if(history_elements[history_index].text!=""){
		var temp_history=history_index;
		set_calc(history_elements[history_index].text);
		history_index=temp_history;
		document.calculator.history.selectedIndex=history_index;
		history_index++;
	}
 }
function next_display_method(){
	var d=document.calculator.display;
	var s=d.selectedIndex;
	s++;
	if(s>=d.options.length)s=0;
	display_method(s)
}
function display_method(index){
	document.calculator.display.selectedIndex=index;
	display_result();
	save_calc();
}

function keycheck(e)
{
disp=document.getElementById('cdisplay');
     var txkey = e.which ||e.keyCode;
     var d=document.getElementById('cdisplay').innerText;
     if (d==last_result)
     {
       //set ans
       var anson=true;
       ansext='Ans ';
     }
     else
     {
        var anson=false;
        ansext=' ';
     }

     if (txkey==192)
     {
       e.preventDefault();
       var d=document.getElementById('cdisplay').innerHTML;
     }

     if (txkey==13)
     {
       e.preventDefault();
       pre_calculation();
       return;
     }
     if (txkey==27)
     {
       e.preventDefault();
       clear_calc();
       return;
     }

     if ((e.ctrlKey)&&(!e.Key)&&(!e.altKey))
     {
        if (txkey==45)
        {
         e.preventDefault();
         if (afterequals==true)
         {
            var d=document.getElementById('cdisplay').innerText;
            parent.insertcalc(d);
         }
         return;
        }
     }

     if ((e.ctrlKey)&&(!e.shiftKey))
     {
       if (txkey==67)
       {
         //ctrl-C
       }
       if (txkey==86)
       {
           //ctrl-V
         return;
       }
     }
     if (txkey==45)
     {
         e.preventDefault();
          if (afterequals==true)
         {
            var d=document.getElementById('cdisplay').innerText;
            parent.insertcalc(d);
         }
         return;
     }

     if ((txkey==9)||(txkey==35)||(txkey==36))
     {
         e.preventDefault();
         return;
     }
     if (txkey==38)
     {
         //Up
         e.preventDefault();
         historyforward();
         return;
     }
        if (txkey==40)
     {
         //Down
         e.preventDefault();
         historyback();
         return;
     }
     if (txkey==34)
     {
         //PgUp
         e.preventDefault();
         historystart();
         return;
     }
     if (txkey==33)
     {
         //PgUp
         e.preventDefault();
         historyend();
         return;
     }


     if ((txkey==8)||(txkey==46))
     {
          el2=document.getElementById('cdisplay');
          caretposition=getCaretCharacterOffsetWithin(el2);
          el2.focus();
          stitem=undostack.length;
          undostack[stitem]=el2.innerHTML;
          undocaret[stitem]=caretposition;
     }

     if ((!e.altKey)&&(!e.shiftKey)&&(!e.ctrlKey))
     {
        if ((txkey>47)&&(txkey<58))
        {
          tykey=txkey-48;
          pasteHtmlAtCaret('<span>'+tykey+'</span>',e);
        }
        if ((txkey>95)&&(txkey<106))
        {
          tykey=txkey-96;
          pasteHtmlAtCaret('<span>'+tykey+'</span>',e);
        }
        switch (txkey) {
        case pkey:
        case pkey2:
          e.preventDefault();
          txkey=0;
          pre_calculation();
          break;
         case 220:
           pasteHtmlAtCaret('<span>'+ansext+'&divide;&nbsp;</span>',e);
          break;
         case 191:
         //pasteHtmlAtCaret('<span>'+ansext+'&divide;&nbsp;</span>',e);
          pasteHtmlAtCaret('<span>'+ansext+'/&nbsp;</span>',e);
          break;
        case 106:
          pasteHtmlAtCaret('<span>'+ansext+'&times;&nbsp;</span>',e);
          break;
        case 111:
          //pasteHtmlAtCaret('<span>'+ansext+'&divide;&nbsp;</span>',e);
          pasteHtmlAtCaret('<span>'+ansext+'/&nbsp;</span>',e);
          break;
        case 107:
          pasteHtmlAtCaret('<span>'+ansext+'+&nbsp;</span>',e);
          break;
        case 109:
            pasteHtmlAtCaret('<span>'+ansext+'-&nbsp;</span>',e);
          break;

        case mkey:
        case mkey2:
          pasteHtmlAtCaret('<span>'+ansext+'-&nbsp;</span>',e);
          break;

        case 190:
          pasteHtmlAtCaret('<span>.</span>',e);
          break;
        case 110:
          pasteHtmlAtCaret('<span>.</span>',e);
          break;


        }

      }
      if ((!e.altKey)&&(e.shiftKey)&&(!e.ctrlKey))
     {
        switch (txkey) {
        case 56:
           pasteHtmlAtCaret('<span>'+ansext+'&times;&nbsp;</span>',e);
          break;
        case 57:
           pasteHtmlAtCaret('<span>(</span>',e);
          break;
        case 48:
           pasteHtmlAtCaret('<span>)</span>',e);
          break;
        case pkey:
        case pkey2:
          pasteHtmlAtCaret('<span>'+ansext+'+&nbsp;</span>',e);
          break;
       }

     }
     anson=false;
     ansext=' ';
}

function getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    } else if ( (sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}
function pre_calculation()
{
  if (shifton===true){shift();}
  var spec=window.document.getElementById('specialchars');
  usechars=spec.innerText;
  var spec2=window.document.getElementById('specialchars2');
  usechars2=spec2.innerText;
  myPi=usechars.substr(9,1);
  //alert(last_result);

   var d=document.getElementById('cdisplay').innerHTML;
   console.log(d);
   var calcitem=calc_history.length;
   calc_history[calcitem]=d;
   history_item=calcitem;
   d=d.replace(/\<span>*/g, '');
   d=d.replace(/<\/span>*/g, '');
   d=d.replace(/\&nbsp;*/g, '');
   d=d.replace(/\<br>*/g, '');
   d=d.replace(/\%/g, "/100");
   d=d.replace(/\Ans*/g, last_result);

   console.log("Pre: "+d);


   addchar=usechars.substr(2,1); //times
   d=d.replace('Ans ',last_result);
   d='+'+d+'+0';  ///fix for 1st position issue
   i1=0;
   i2=d.indexOf(myPi,i1);
   while (i2>=0)
   {
     dleft=d.substr(0,i2).trim();
     dchar=dleft.substr(dleft.length-1,1);

     if (usechars2.indexOf(dchar)>=0)
     {
       var addmult="*";
     }
     else
     {
       var addmult="";
     }

     d = d.substr(0,i2)+addmult+PI+d.substr(i2+1);
     i1=i2+2;
     i2=d.indexOf(myPi,i1);
   }

   i1=0;
   i2=d.indexOf(addchar,i1);
   while (i2>=0)
   {
     d = d.substr(0,i2)+'*'+d.substr(i2+1);
     i1=i2+1;
     i2=d.indexOf(addchar,i1);
   }

   i1=0;
   i2=d.indexOf('/',i1);
   if (i2>=0)
   {
     isup=d.substr(i2,4);
   }
   if (i2>0)
   {
     frtest=d.substr(i2-1,1);
     if (frtest==' ')
     {
       frtest=d.substr(i2-2,1);
     }

     j1=usechars.indexOf(frtest);
     if (j1<0)
     i2=-1; // not a numeric fraction
   }
   if (i2>0)
   {
     //j2=numchars4.indexOf(d.substr(i2+1,1));
     j2=usechars.indexOf(d.substr(i2+1,1));
     if (j2<0)
     {
     i2=-1;// not a numeric fraction
     }
   }

   while ((i2>=0)&&(isup!='/sup'))
   {
     i3=i2-1
     i4=numchars3.indexOf(d.substr(i3,1));
     while (i4>=0)
     {
       i3=i3-1;
       i4=numchars3.indexOf(d.substr(i3,1));
     }
     //alert(i4 +'  '+ i3+'  '+i2);
     //alert(d.substr(0,i3+1)+'xxx'+d.substr(i3+1));
       d=d.substr(0,i3+1)+'{'+d.substr(i3+1);
     //alert("BBB:"+d);
     i6=i2+2;
     i5=numchars3.indexOf(d.substr(i6,1));
     while (i5>=0)
     {
      i6=i6+1;
      i5=numchars3.indexOf(d.substr(i6,1));
     }
     d=d.substr(0,i6)+'}'+d.substr(i6);
     i1=i2+2; // 2 because of extra character
     i2=d.indexOf('/',i1);

     if (i2>=0)
     {
        isup=d.substr(i2,4);
     }
   }

    //alert("DDD:"+d);
   i1=0;
   i2=d.indexOf('(',i1);
   while (i2>=0)
   {

     var prechar=d.substr(0,i2).trim();
     var prechar2=prechar.substr(prechar.length-1,1);
      if (prechar.indexOf('sin<sup>-1</sup>')>=0)
      {
        prechar2="x";
      }
      if (prechar.indexOf('cos<sup>-1</sup>')>=0)
      {
        prechar2="x";
      }
      if (prechar.indexOf('tan<sup>-1</sup>')>=0)
      {
        prechar2="x";
      }
     i3=usechars2.indexOf(prechar2);
     if (i3>=0)
     {
         if (i2>0)
         {
           d = d.substr(0,i2)+'*'+d.substr(i2);
         }
     }
     i1=i2+2;
     i2=d.indexOf('(',i1);

   }
   addchar=usechars.substr(3,1); //divide
   i1=0;
   i2=d.indexOf(addchar,i1);
   while (i2>=0)
   {
     d = d.substr(0,i2)+'/'+d.substr(i2+1);
     i1=i2+1;
     i2=d.indexOf(addchar,i1);
   }

   addchar=usechars.substr(6,1); //squareroot
   i1=0;
   i2=d.indexOf(addchar,i1);
   while (i2>=0)
   {

     var nc =d.substr(i2-1,1);
     if (numchars.indexOf(nc)>=0)
     {
        d = d.substr(0,i2)+'*'+d.substr(i2);
        i2=i2+1;
     }
     d = d.substr(0,i2)+'sqrt'+d.substr(i2+1);
     i1=i2+1;
     i2=d.indexOf(addchar,i1);
   }
   i1=0;
   i2=d.indexOf('<sup name="pwn">',i1);

   console.log("DD "+d);
   while (i2>=0)
   {
     d1 = d.substr(0,i2);
     var bracket=false;
     console.log("d1: "+d1);
     console.log("BR: "+ d1.substr(i2-1,1));
     if (d1.substr(i2-1,1)==')')
     //if (d1.indexOf(')')>0)
     {
       bracket=true;
       rtbrcount=0;
       lfbrcount=0;
       rtbpos=0;
       ltbpos=0;
       lfpos=-1;
      for(var k=d1.length-1;k>=0;k--)
      {
         if (d1.substr(k,1)==')')
         {
           rtbrcount=rtbrcount+1;
           rtbpos=k;
         }
         if (d1.substr(k,1)=='(')
         {
           lfbrcount=lfbrcount+1;
           ltbpos=k;
         }
         if (rtbrcount==lfbrcount)
         {
            if (lfpos==-1)
            {
               //lfpos=k;
               lfpos=ltbpos;
            }
         }
      var lfcheck=lfpos-1;
      console.log("pos:"+lfpos+'  '+d1.substr(lfpos,1)+'  '+d1);
      if(d1.substr(lfpos,1)==')')
      {
        console.log('L:'+d1.lastIndexOf('(',lfpos));
      }

      }
     // alert(d1+'  '+lfpos+'  '+d1.substr(0,lfpos)+'  '+rtbrcount+'  '+lfbrcount+'  '+k);
      i3=d.indexOf('</sup>',i2);
     if (i3>=0)
     {
        d = d1.substr(0,lfpos)+'pow['+d1.substr(lfpos)+','+ d.substr(i2+16,i3-i2-16)+']'+d.substr(i3+6);
     }

     }
     else
     {
     d2='';
     d4='';
     k1=-1;
     for(var k=d1.length;k>0;k--){
      if (k>1)
      {
        kchar=d1.substr(k-1,1);
        k1=numchars.indexOf(kchar);
        if (k1<0)
        {
           if(d2=='')
           {
              d2=d1.substr(k,d1.length-k);
              d4= d1.substr(0,k);
           }
        }
      }
      else
      {
           if(d2=='')
           {
              d2=d1.substr(0,d1.length);
           }
      }
     }
     d = d4+d.substr(0,i2-d1.length)+'pow['+d2+','+d.substr(i2+16);
     i3=d.indexOf('</sup>',i2);
     if (i3>=0)
     {
        d = d.substr(0,i3)+']'+d.substr(i3+6);
     }
     }
     i1=i2+1;
     i2=d.indexOf('<sup name="pwn">',i1);
   }

   // end of powers
   i1=0;
   i2=d.indexOf('sin<sup>-1</sup>',i1);
   while (i2>=0)
   {
     var nc =d.substr(i2-1,1);
     if (numchars.indexOf(nc)>=0)
     {
        d = d.substr(0,i2)+'*'+d.substr(i2);
        i2=i2+1;
     }
     d = d.substr(0,i2)+'asin'+d.substr(i2+16);
     i1=i2+4;
     i2=d.indexOf('sin<sup>-1</sup>',i1);
   }
      i1=0;
   i2=d.indexOf('cos<sup>-1</sup>',i1);
   while (i2>=0)
   {
     var nc =d.substr(i2-1,1);
     if (numchars.indexOf(nc)>=0)
     {
        d = d.substr(0,i2)+'*'+d.substr(i2);
        i2=i2+1;
     }
     d = d.substr(0,i2)+'acos'+d.substr(i2+16);
     i1=i2+4;
     i2=d.indexOf('cos<sup>-1</sup>',i1);
   }
  i1=0;
   i2=d.indexOf('tan<sup>-1</sup>',i1);
   while (i2>=0)
   {
       var nc =d.substr(i2-1,1);
     if (numchars.indexOf(nc)>=0)
     {
        d = d.substr(0,i2)+'*'+d.substr(i2);
        i2=i2+1;
     }
     d = d.substr(0,i2)+'atan'+d.substr(i2+16);
     i1=i2+4;
     i2=d.indexOf('tan<sup>-1</sup>',i1);
   }
   i1=0;
   i2=d.indexOf('sin',i1);
   while (i2>0)
   {
      var nc =d.substr(i2-1,1);
     if (numchars.indexOf(nc)>=0)
     {
        d = d.substr(0,i2)+'*'+d.substr(i2);
        i2=i2+1;
     }
     i1=i2+4;
     i2=d.indexOf('sin',i1);
   }
   i1=0;
   i2=d.indexOf('cos',i1);
   while (i2>0)
   {
     var nc =d.substr(i2-1,1);
     if (numchars.indexOf(nc)>=0)
     {
        d = d.substr(0,i2)+'*'+d.substr(i2);
        i2=i2+1;
     }
     i1=i2+4;
     i2=d.indexOf('cos',i1);
   }
   i1=0;
   i2=d.indexOf('tan',i1);
   while (i2>0)
   {
     var nc =d.substr(i2-1,1);
     if (numchars.indexOf(nc)>=0)
     {
        d = d.substr(0,i2)+'*'+d.substr(i2);
        i2=i2+1;
     }
     i1=i2+4;
     i2=d.indexOf('tan',i1);
   }
   addchar=usechars.substr(9,1); //pi
   i1=0;
   i2=d.indexOf(addchar,i1);
   while (i2>=0)
   {
     d = d.substr(0,i2)+'PI'+d.substr(i2+1);
     i1=i2+1;
     i2=d.indexOf(addchar,i1);
   }
   i1=0;
   i2=d.indexOf('PI',i1);
   while (i2>=0)
   {
     var prechar=d.substr(i2-1,1);

     i3=numchars2.indexOf(prechar);
     if (i3>=0)
     {
         d = d.substr(0,i2)+'*'+d.substr(i2);

     }
     i1=i2+2;
     i2=d.indexOf('PI',i1);

   }

   var cuberoot=1/3;
   addchar=usechars.substr(7,1);
   i1=0;
   i2=d.indexOf(addchar,i1);
   while (i2>=0)
   {
     d = d.substr(0,i2)+'pow'+d.substr(i2+1);

       rtbrcount=0;
       lfbrcount=0;
       lfpos=-1;
      for(var k=i2+3 ;k<=d.length-1;k++)
      {

         if (d.substr(k,1)==')')
         {
           rtbrcount=rtbrcount+1;
         }
         if (d.substr(k,1)=='(')
         {
           lfbrcount=lfbrcount+1;
         }
         if (rtbrcount==lfbrcount)
         {
            if (lfpos==-1)
            {
               lfpos=k;
            }
         }
      }
     d = d.substr(0,lfpos)+','+cuberoot+d.substr(lfpos);
     i1=i2+1;
     i2=d.indexOf(addchar,i1);
   }

   addchar=usechars.substr(8,1);
   searchchar='<sup>-</sup>'+addchar;
   i1=0;
   i2=d.indexOf(searchchar,i1);
   while (i2>=0)
   {
      d = d.substr(0,i2)+d.substr(i2+13);
     i3=i2-1;
     i4=0;
     while (i3>=0)
     {
       digit=d.substr(i3,1);
       if (numchars.indexOf(digit)>=0)
       {
         i3=i3-1;
       }
       else
       {
         i4=i3;
         i3=-1;
       }
     }
      if (i4>0)
     {
       d = d.substr(0,i4)+'1 /'+d.substr(i4);
     }
     else
     {
       d = '1 / '+d.substr(i4);
     }
     i1=i2+1;
     i2=d.indexOf(searchchar,i1);
   }
   var dsp=d;
   d='';
   for (var id=0;id<dsp.length;id++)
   {
      if (dsp.substr(id,1)!=' ')
      {
        d = d+dsp.substr(id,1);
      }
   }
   // process double minus
   i1=0;
   i2=d.indexOf('--',i1);
   while (i2>=0)
   {
     d = d.substr(0,i2)+'+'+d.substr(i2+2);
     i1=i2+2;
     i2=d.indexOf('--',i1);
   }


   if (d.substr(0,2)=='++')
   {
     d = d.substr(1);
   }
   console.log('SemiFinal: '+d);

    d=d.replace(/\[/g, '(');
    d=d.replace(/\]/g, ')');
    d=d.replace(/\{/g, '(');
    d=d.replace(/\}/g, ')');

   var dsp=d;
   d='';
   for (var id=0;id<dsp.length;id++)
   {
      if (dsp.substr(id,1)=='(')
      {
         if (numchars2.indexOf(dsp.substr(id-1,1))>=0)
         {
           d=d+'*';
         }
      }
      d = d+dsp.substr(id,1);
   }
var dsp=d;
   d='';
   for (var id=0;id<dsp.length;id++)
   {
      if (dsp.substr(id,2)=='PI')
      {
         if (numchars2.indexOf(dsp.substr(id-1,1))>=0)
         {
           d=d+'*';
         }
      }
      d = d+dsp.substr(id,1);
   }
   d=d.replace(/\log/g, 'log10');
   console.log('Final: '+d);
//   alert(d);
   document.calculator.line.value=d;
   afterequals=true;
   do_calculation();
}

function powerpro(d1, p, n)
{
   addchar=usechars.substr(p,1);
   i1=0;
   i4=0;
   i2=d1.indexOf(addchar,i1);
   while (i2>=0)
   {

     d1 = d1.substr(0,i2)+','+n+')'+d1.substr(i2+1);
     i3=i2-1;
     i4=0;
     while (i3>=0)
     {
       digit=d1.substr(i3,1);
       if (numchars.indexOf(digit)>=0)
       {
         i3=i3-1;
       }
       else
       {
         i4=i3;
         i3=-1;
       }
     }
     if (i4>0)
     {
       d1 = d1.substr(0,i4)+'pow('+d1.substr(i4+1);
     }
     else
     {
       d1 = 'pow('+d1.substr(i4);
     }
     i1=i2+1;
     i2=d1.indexOf(addchar,i1);
   }
   return d1;
}


function calcdisplay(d)
{
    disp=document.getElementById('cdisplay');
    disp.innerHTML=d;
}


function pasteHtmlAtCaret(html,e) {
  e.preventDefault();
  if (shifton===true){shift();}
  var d=document.getElementById('cdisplay').innerText;
  ansext=' ';
  if (document.activeElement.id!='cdisplay')
  {
    return;
  }
    el1=document.getElementById('cdisplay');
    if (afterequals==true)
    {
      el1.innerHTML='';
      afterequals=false;
    }
    lastcaretpos=getCaretCharacterOffsetWithin(el1);
    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            // Range.createContextualFragment() would be useful here but is
            // only relatively recently standardized and is not supported in
            // some browsers (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }

        }
    } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
    }
     setdisplay();
     el2.focus();
     stitem=undostack.length;
     if (addtostack==true)
     {
       undostack[stitem]=el2.innerHTML;
       undocaret[stitem]=caretposition;
     }
     addtostack=true;
}
function delitem(e)
{
  disp=document.getElementById('cdisplay');
  if (stackcount==99)
  {
     stackcount=undostack.length - 2;
  }
  else
  {
    stackcount=stackcount-1;
  }
  if (stackcount>=0)
  {

    var  newhtml=undostack[stackcount];

    disp.innerHTML='';
    disp.focus();
    if (newhtml!=undefined)
    {
       addtostack=false;
       pasteHtmlAtCaret(newhtml,e);
       SetCaretPosition(disp,undocaret[stackcount]);
    }
  }
  else
  {
    stackcount=-1;
    disp.innerHTML='';
    disp.focus();
  }
}
function restoreitem(e)
{
  disp=document.getElementById('cdisplay');
  if (stackcount!==99)
  {
     stackcount=stackcount+1;
  }
 if (stackcount<+undostack.length)
 {
    var  newhtml=undostack[stackcount];

    disp.innerHTML='';
    disp.focus();
    if (newhtml!=undefined)
    {
       addtostack=false;
       pasteHtmlAtCaret(newhtml,e);
       SetCaretPosition(disp,undocaret[stackcount]);
    }
  }
  else
  {
    stackcount=99;
    disp.focus();
  }
}

function SetCaretPosition(el, pos){

    // Loop through all child nodes
    for(var node of el.childNodes){
        if(node.nodeType == 3){ // we have a text node
            if(node.length >= pos){
                // finally add our range
                var range = document.createRange(),
                    sel = window.getSelection();
                range.setStart(node,pos);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
                return -1; // we are done
            }else{
                pos -= node.length;
            }
        }else{
            pos = SetCaretPosition(node,pos);
            if(pos == -1){
                return -1; // no need to finish the for loop
            }
        }
    }
    return pos; // needed because of recursion stuff
}
function refocus(e)
{
 if (document.activeElement.id=='cdisplay')
  {
    el2=document.getElementById('cdisplay');
    caretposition=getCaretCharacterOffsetWithin(el2);
    return;
  }
  else
  {
     e.preventDefault();
     disp=document.getElementById('cdisplay');
     disp.focus();
     SetCaretPosition(disp, caretposition);

   }
}
function historyback()
{
     disp=document.getElementById('cdisplay');
     disp.innerHTML=calc_history[history_item];
     if (history_item>0)
     {
        history_item=history_item-1;
     }
     afterequals=false;
     if (shifton===true){shift();}
     disp.focus();
}
function historyforward()
{
     disp=document.getElementById('cdisplay');
     if (history_item<calc_history.length-1)
     {
        history_item=history_item+1;
     }
     disp.innerHTML=calc_history[history_item];
     afterequals=false;
     if (shifton===true){shift();}
     disp.focus();
}
function historystart()
{
     disp=document.getElementById('cdisplay');
     history_item=0;
     disp.innerHTML=calc_history[history_item];
     afterequals=false;
     if (shifton===true){shift();}
     disp.focus();
}
function historyend()
{
     disp=document.getElementById('cdisplay');
     history_item=calc_history.length-1;
     disp.innerHTML=calc_history[history_item];
     afterequals=false;
     if (shifton===true){shift();}
     disp.focus();
}
function goleft()
{
    el2=document.getElementById('cdisplay');
    caretposition=getCaretCharacterOffsetWithin(el2);
  if (caretposition>0)
  {
    caretposition=caretposition-1;
    SetCaretPosition(el2, caretposition);
    lastcaretpos=caretposition;
  }
  if (shifton===true){shift();}
  setdisplay();
}
function goright()
{
    el2=document.getElementById('cdisplay');
    caretposition=getCaretCharacterOffsetWithin(el2);
    var ctext=el2.innerText;
    if (caretposition<=ctext.length)
    {
      caretposition=caretposition+1;
      SetCaretPosition(el2, caretposition);
      lastcaretpos=caretposition;
    }
     if (((caretposition-1)==el2.innerText.length)&&(el2.scrollWidth>255))
     {
        //el2.scrollLeft=el2.scrollWidth-255;
     }
     if (shifton===true){shift();}
     setdisplay();
}
function setdisplay()
{
     el2=document.getElementById('cdisplay');
     caretposition=getCaretCharacterOffsetWithin(el2);
     xl2=document.getElementById('xdisplay');
     xl2.innerHTML=el2.innerText.substr(0,caretposition)
     xl2width=xl2.clientWidth;
     if (xl2width>250)
     {
        el2.scrollLeft=xl2width-250;
     }
     else
     {
        el2.scrollLeft=0;
     }
}
function convert()
{
     myfrac=document.getElementById("cdisplay")
     var mydeccheck=myfrac.innerHTML;
     pre_calculation();
     mydeci=document.calculator.line.value;
     if (mydeccheck.indexOf('/')>0)
     {
        myfrac.innerHTML=mydeci;
        return;
     }

     if (mydeci.length<mydeclen)
     {
        terminate();
     }
     else
     {
        recurr();
     }
}
function terminate()
{
     mydecimal=mydeci=document.calculator.line.value;
     var dd1=mydecimal.indexOf('.');
     if (dd1>=0)
     {
       dd2=mydecimal.length-dd1-1;
       mynumerator=Math.round(parseFloat(mydecimal)*Math.pow(10,dd2));
       mydenominator=(10**dd2);
       simplify();
     }
     else
     {
       //do nothing - no decimal point
       myfrac=document.getElementById("cdisplay")
       myfrac.innerHTML=mydecimal;
     }
}
function recurr()
{
     mydecimal=mydeci=document.calculator.line.value;
     mydec2=parseFloat(mydecimal);
     var dd1=mydecimal.indexOf('.');
     if (dd1>=0)
     {
      var dd2=dd1+1;
      dd3=0;


      while ((dd3<=0)&&(dd2<mydeclen))
      {
        myrec=mydecimal.substr(dd2,2);
        var dd3=mydecimal.indexOf(myrec,dd2+1)
        if (dd3>0)
        {
        // found
          d6=dd2-dd1-1;
          myleft=mydecimal.substr(0,dd2);
          dd5=dd3-dd2;
          dd4 = dd3-(dd1+1);
          myrec2=mydecimal.substr(dd2,(dd3-dd2));
          myrectest=myleft;
          while(myrectest.length<mydecimal.length)
          {
            myrectest=myrectest+myrec2;
          }
          mln=mydecimal.length
          myrectest=myrectest.substr(0,mydecimal.length);
          ldd1=parseInt(myrectest.substr(mln-1,1));
          ldd2=parseInt(mydecimal.substr(mln-1,1))          ;

          if ((myrectest.substr(0,mln-1)==mydecimal.substr(0,mln-1))&&((ldd2-ldd1)==1)||(ldd2-ldd1)==0)
          {
            mynumerator=parseInt(mydec2*Math.pow(10,dd4))-parseInt(mydec2*Math.pow(10,d6));
            mydenominator=(10**dd5-1)*10**(dd4-dd5);
            console.log('Fr: '+mynumerator+'  '+mydenominator);
            simplify();
          }
          else
          {
            dd2=16; //not recurring
            myfrac=document.getElementById("cdisplay")
            myfrac.innerHTML=mydecimal;

          }
        }
        else
        {
          dd2=dd2+1;
        }
      }
     }
     else
     {
       //do nothing - no decimal point
       myfrac=document.getElementById("cdisplay")
       myfrac.innerHTML=mydecimal;
     }
}
function simplify()
{
   var mynum2=mynumerator;
   var mydenom2=mydenominator;

   var ds1=parseInt(mydenominator/2)

   if (ds1<50000000000000)
   {
      for(var i=1;i<=prime.length;i++){
         ds2=prime[i];
         while ((mynum2/ds2==parseInt(mynum2/ds2))&&(mydenom2/ds2==parseInt(mydenom2/ds2)))
         {
            mynum2=mynum2/ds2;
            mydenom2=mydenom2/ds2;
         }
      }
      myfrac=document.getElementById("cdisplay")
      myfrac.innerHTML=mynum2+'/'+mydenom2;
  }
  else
  {
        myfrac=document.getElementById("cdisplay")
        myfrac.innerHTML=mydecimal;
  }
}
function shift()
{

    for(var b=1;b<=5;b++)
    {
        mytopbut=document.getElementById("topbut"+b)
        mybotbut=document.getElementById("botbut"+b)
        if (shifton===false)
        {
           mytopbut.style.visibility="hidden";
           mytopbut.style.height="1px";
           mybotbut.style.height="32px";
           mybotbut.style.visibility="visible";

        }
        else
        {
           mytopbut.style.visibility="visible";
           mytopbut.style.height="32px";
           mybotbut.style.height="1px";
           mybotbut.style.visibility="hidden";

        }
    }
    if (shifton===false)
    {
       shifton=true;
    }
    else
    {
       shifton=false;
    }


}

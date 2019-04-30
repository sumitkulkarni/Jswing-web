(function(){/*
 Long.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
 Released under the Apache License, Version 2.0
 see: https://github.com/dcodeIO/Long.js for details
*/
(function(q){function b(a,b,d){this.low=a|0;this.high=b|0;this.unsigned=!!d}b.isLong=function(a){return!0===(a&&a instanceof b)};var r={},s={};b.fromInt=function(a,c){var d;if(c){a>>>=0;if(0<=a&&256>a&&(d=s[a]))return d;d=new b(a,0>(a|0)?-1:0,!0);0<=a&&256>a&&(s[a]=d)}else{a|=0;if(-128<=a&&128>a&&(d=r[a]))return d;d=new b(a,0>a?-1:0,!1);-128<=a&&128>a&&(r[a]=d)}return d};b.fromNumber=function(a,c){c=!!c;return isNaN(a)||!isFinite(a)?b.ZERO:!c&&a<=-t?b.MIN_VALUE:!c&&a+1>=t?b.MAX_VALUE:c&&a>=u?b.MAX_UNSIGNED_VALUE:
0>a?b.fromNumber(-a,c).negate():new b(a%4294967296|0,a/4294967296|0,c)};b.fromBits=function(a,c,d){return new b(a,c,d)};b.fromString=function(a,c,d){if(0===a.length)throw Error("number format error: empty string");if("NaN"===a||"Infinity"===a||"+Infinity"===a||"-Infinity"===a)return b.ZERO;"number"===typeof c&&(d=c,c=!1);d=d||10;if(2>d||36<d)throw Error("radix out of range: "+d);var e;if(0<(e=a.indexOf("-")))throw Error('number format error: interior "-" character: '+a);if(0===e)return b.fromString(a.substring(1),
c,d).negate();e=b.fromNumber(Math.pow(d,8));for(var f=b.ZERO,g=0;g<a.length;g+=8){var k=Math.min(8,a.length-g),l=parseInt(a.substring(g,g+k),d);8>k?(k=b.fromNumber(Math.pow(d,k)),f=f.multiply(k).add(b.fromNumber(l))):(f=f.multiply(e),f=f.add(b.fromNumber(l)))}f.unsigned=c;return f};b.fromValue=function(a){return"number"===typeof a?b.fromNumber(a):"string"===typeof a?b.fromString(a):b.isLong(a)?a:new b(a.low,a.high,a.unsigned)};var u=4294967296*4294967296,t=u/2,v=b.fromInt(16777216);b.ZERO=b.fromInt(0);
b.UZERO=b.fromInt(0,!0);b.ONE=b.fromInt(1);b.UONE=b.fromInt(1,!0);b.NEG_ONE=b.fromInt(-1);b.MAX_VALUE=b.fromBits(-1,2147483647,!1);b.MAX_UNSIGNED_VALUE=b.fromBits(-1,-1,!0);b.MIN_VALUE=b.fromBits(0,-2147483648,!1);b.prototype.toInt=function(){return this.unsigned?this.low>>>0:this.low};b.prototype.toNumber=function(){return this.unsigned?4294967296*(this.high>>>0)+(this.low>>>0):4294967296*this.high+(this.low>>>0)};b.prototype.toString=function(a){a=a||10;if(2>a||36<a)throw RangeError("radix out of range: "+
a);if(this.isZero())return"0";var c;if(this.isNegative()){if(this.equals(b.MIN_VALUE)){c=b.fromNumber(a);var d=this.div(c);c=d.multiply(c).subtract(this);return d.toString(a)+c.toInt().toString(a)}return"-"+this.negate().toString(a)}d=b.fromNumber(Math.pow(a,6),this.unsigned);c=this;for(var e="";;){var f=c.div(d),g=(c.subtract(f.multiply(d)).toInt()>>>0).toString(a);c=f;if(c.isZero())return g+e;for(;6>g.length;)g="0"+g;e=""+g+e}};b.prototype.getHighBits=function(){return this.high};b.prototype.getHighBitsUnsigned=
function(){return this.high>>>0};b.prototype.getLowBits=function(){return this.low};b.prototype.getLowBitsUnsigned=function(){return this.low>>>0};b.prototype.getNumBitsAbs=function(){if(this.isNegative())return this.equals(b.MIN_VALUE)?64:this.negate().getNumBitsAbs();for(var a=0!=this.high?this.high:this.low,c=31;0<c&&0==(a&1<<c);c--);return 0!=this.high?c+33:c+1};b.prototype.isZero=function(){return 0===this.high&&0===this.low};b.prototype.isNegative=function(){return!this.unsigned&&0>this.high};
b.prototype.isPositive=function(){return this.unsigned||0<=this.high};b.prototype.isOdd=function(){return 1===(this.low&1)};b.prototype.isEven=function(){return 0===(this.low&1)};b.prototype.equals=function(a){b.isLong(a)||(a=b.fromValue(a));return this.unsigned!==a.unsigned&&1===this.high>>>31&&1===a.high>>>31?!1:this.high===a.high&&this.low===a.low};b.prototype.notEquals=function(a){b.isLong(a)||(a=b.fromValue(a));return!this.equals(a)};b.prototype.lessThan=function(a){b.isLong(a)||(a=b.fromValue(a));
return 0>this.compare(a)};b.prototype.lessThanOrEqual=function(a){b.isLong(a)||(a=b.fromValue(a));return 0>=this.compare(a)};b.prototype.greaterThan=function(a){b.isLong(a)||(a=b.fromValue(a));return 0<this.compare(a)};b.prototype.greaterThanOrEqual=function(a){return 0<=this.compare(a)};b.prototype.compare=function(a){if(this.equals(a))return 0;var b=this.isNegative(),d=a.isNegative();return b&&!d?-1:!b&&d?1:this.unsigned?a.high>>>0>this.high>>>0||a.high===this.high&&a.low>>>0>this.low>>>0?-1:1:
this.subtract(a).isNegative()?-1:1};b.prototype.negate=function(){return!this.unsigned&&this.equals(b.MIN_VALUE)?b.MIN_VALUE:this.not().add(b.ONE)};b.prototype.add=function(a){b.isLong(a)||(a=b.fromValue(a));var c=this.high>>>16,d=this.high&65535,e=this.low>>>16,f=a.high>>>16,g=a.high&65535,k=a.low>>>16,l;l=0+((this.low&65535)+(a.low&65535));a=0+(l>>>16);a+=e+k;e=0+(a>>>16);e+=d+g;d=0+(e>>>16);d=d+(c+f)&65535;return b.fromBits((a&65535)<<16|l&65535,d<<16|e&65535,this.unsigned)};b.prototype.subtract=
function(a){b.isLong(a)||(a=b.fromValue(a));return this.add(a.negate())};b.prototype.multiply=function(a){if(this.isZero())return b.ZERO;b.isLong(a)||(a=b.fromValue(a));if(a.isZero())return b.ZERO;if(this.equals(b.MIN_VALUE))return a.isOdd()?b.MIN_VALUE:b.ZERO;if(a.equals(b.MIN_VALUE))return this.isOdd()?b.MIN_VALUE:b.ZERO;if(this.isNegative())return a.isNegative()?this.negate().multiply(a.negate()):this.negate().multiply(a).negate();if(a.isNegative())return this.multiply(a.negate()).negate();if(this.lessThan(v)&&
a.lessThan(v))return b.fromNumber(this.toNumber()*a.toNumber(),this.unsigned);var c=this.high>>>16,d=this.high&65535,e=this.low>>>16,f=this.low&65535,g=a.high>>>16,k=a.high&65535,l=a.low>>>16;a=a.low&65535;var n,h,m,p;p=0+f*a;m=0+(p>>>16);m+=e*a;h=0+(m>>>16);m=(m&65535)+f*l;h+=m>>>16;m&=65535;h+=d*a;n=0+(h>>>16);h=(h&65535)+e*l;n+=h>>>16;h&=65535;h+=f*k;n+=h>>>16;h&=65535;n=n+(c*a+d*l+e*k+f*g)&65535;return b.fromBits(m<<16|p&65535,n<<16|h,this.unsigned)};b.prototype.div=function(a){b.isLong(a)||(a=
b.fromValue(a));if(a.isZero())throw Error("division by zero");if(this.isZero())return this.unsigned?b.UZERO:b.ZERO;var c,d,e;if(this.equals(b.MIN_VALUE)){if(a.equals(b.ONE)||a.equals(b.NEG_ONE))return b.MIN_VALUE;if(a.equals(b.MIN_VALUE))return b.ONE;c=this.shiftRight(1).div(a).shiftLeft(1);if(c.equals(b.ZERO))return a.isNegative()?b.ONE:b.NEG_ONE;d=this.subtract(a.multiply(c));return e=c.add(d.div(a))}if(a.equals(b.MIN_VALUE))return this.unsigned?b.UZERO:b.ZERO;if(this.isNegative())return a.isNegative()?
this.negate().div(a.negate()):this.negate().div(a).negate();if(a.isNegative())return this.div(a.negate()).negate();e=b.ZERO;for(d=this;d.greaterThanOrEqual(a);){c=Math.max(1,Math.floor(d.toNumber()/a.toNumber()));for(var f=Math.ceil(Math.log(c)/Math.LN2),f=48>=f?1:Math.pow(2,f-48),g=b.fromNumber(c),k=g.multiply(a);k.isNegative()||k.greaterThan(d);)c-=f,g=b.fromNumber(c,this.unsigned),k=g.multiply(a);g.isZero()&&(g=b.ONE);e=e.add(g);d=d.subtract(k)}return e};b.prototype.modulo=function(a){b.isLong(a)||
(a=b.fromValue(a));return this.subtract(this.div(a).multiply(a))};b.prototype.not=function(){return b.fromBits(~this.low,~this.high,this.unsigned)};b.prototype.and=function(a){b.isLong(a)||(a=b.fromValue(a));return b.fromBits(this.low&a.low,this.high&a.high,this.unsigned)};b.prototype.or=function(a){b.isLong(a)||(a=b.fromValue(a));return b.fromBits(this.low|a.low,this.high|a.high,this.unsigned)};b.prototype.xor=function(a){b.isLong(a)||(a=b.fromValue(a));return b.fromBits(this.low^a.low,this.high^
a.high,this.unsigned)};b.prototype.shiftLeft=function(a){b.isLong(a)&&(a=a.toInt());return 0===(a&=63)?this:32>a?b.fromBits(this.low<<a,this.high<<a|this.low>>>32-a,this.unsigned):b.fromBits(0,this.low<<a-32,this.unsigned)};b.prototype.shiftRight=function(a){b.isLong(a)&&(a=a.toInt());return 0===(a&=63)?this:32>a?b.fromBits(this.low>>>a|this.high<<32-a,this.high>>a,this.unsigned):b.fromBits(this.high>>a-32,0<=this.high?0:-1,this.unsigned)};b.prototype.shiftRightUnsigned=function(a){b.isLong(a)&&(a=
a.toInt());a&=63;if(0===a)return this;var c=this.high;return 32>a?b.fromBits(this.low>>>a|c<<32-a,c>>>a,this.unsigned):32===a?b.fromBits(c,0,this.unsigned):b.fromBits(c>>>a-32,0,this.unsigned)};b.prototype.toSigned=function(){return this.unsigned?new b(this.low,this.high,!1):this};b.prototype.toUnsigned=function(){return this.unsigned?this:new b(this.low,this.high,!0)};"function"===typeof require&&"object"===typeof module&&module&&"object"===typeof exports&&exports?module.exports=b:"function"===typeof define&&
define.amd?define(function(){return b}):(q.dcodeIO=q.dcodeIO||{}).Long=b})(this);})();

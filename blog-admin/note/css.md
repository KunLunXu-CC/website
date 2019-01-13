# css

```css
/******* RESETS */
body {
  line-height: 1.3;
}

/******* DISPLAY */

*, *::before, *::after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing:    border-box;
  box-sizing:         border-box;
}
* {
  -webkit-tap-highlight-color:rgba(0,0,0,0);
  -moz-tap-highlight-color:rgba(0,0,0,0);
  tap-highlight-color:rgba(0,0,0,0);
  font-family:"Microsoft YaHei",serif;
}

.gwd-lightbox {
  border: none !important;
}

/******* STYLING */

/* Shadows */
.box-shadow {
  -moz-box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
}

.box-shadow-item {
  -moz-box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
}

.box-shadow-cta {
  -moz-box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
}

.box-shadow-details {
  -moz-box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
}

.text-shadow {
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
}


/******* TRANSITIONS */

.transition-opacity {
  -moz-transition: opacity, 0.3s, ease;
  transition: opacity, 0.3s, ease;
}
.transition-opacity-fast {
  -moz-transition: opacity, 0.2s, ease;
  transition: opacity, 0.2s, ease;
}


/*Other*/
.font-family-css{
  font-family: 'Lato', sans-serif; 
  /*Note: When specifying a web font in a CSS style, always list at least one fallback web-safe font in order to avoid unexpected behaviors. 
  In particular, add a CSS generic font name like serif or sans-serif to the end of the list, so the browser can fall back to its default fonts if need be.
   /*for Japanese templates > "ãƒ’ãƒ©ã‚®ãƒŽè§’ã‚´ Pro W3","Hiragino Kaku Gothic Pro","ãƒ¡ã‚¤ãƒªã‚ª","MS PGothic",Verdana,Helvetica,sans-serif;*/
}

/****** Navigation Dots for square ********/
#gallerynavigation-items .button-container .button .frame-dot {
  width: 8px;
  height: 8px;
  border-radius:4px;
  background-color: #000000;
  box-shadow:none;
}

#gallerynavigation-items .button-container .button.active .frame-dot {
  width: 20px;
  height: 4px;
  border-radius:0px;
  background-color: #ec1c1c;
  box-shadow:none;
}

#gallerynavigation-items .button-container .button:hover .frame-dot {
 width: 20px;
  height: 4px;
  border-radius:0px;
  background-color: #ec1c1c;
  box-shadow:none;

}
gwd-gallerynavigation .button-container .button.active{
  top:-2px;

}
#gallerynavigation-items .button-container .button:hover {
  top:-2px;

}
.arrow-holder .arrow-icon-svg {
    position: absolute;
    height: 25px;
    width: 25px;
    fill: #e11d1a;
    z-index: 30
}
/****** Navigation Dots for mobile 320x100 ********/

/*é€‚é…å¯¼èˆª*/
.search-select .search-val { -webkit-box-sizing: content-box; box-sizing: content-box;}

input { border: none; border-radius: 0;}
input:focus {box-shadow:none; border: none;}

.search_nav{margin:30px 0 15px;height:40px;}
.search_navcon{/*width:620px;*/display:table;margin:0 auto;}
.search_navleft{border:1px solid #b8c4ce;border-top-left-radius:2px;border-bottom-left-radius:2px;border-right:0;float:left;/*width:470px;*/height:40px;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing: border-box;}
.search_navleft input{width:369px;height:38px;padding: 0 10px;border:0;outline:none;float:left;-webkit-box-sizing: border-box;box-sizing: border-box;}
.search_navright{width:100px;float:left;width:150px;line-height:40px;text-align:center;border-radius:2px;}
.search_navright input{background:#3498db;border-radius: 0; border-top-right-radius:2px;border-bottom-right-radius:2px;color:#fff;font-size:14px; outline:none; cursor:pointer;width:100%;border:0;height:40px;}
.search_navright input:hover{background:#3da2e3;}
/*ä¸‹æ‹‰*/
.select-box{position:relative;width: 110px;height:40px;float:left;border: 1px solid #d7dcde; margin: 0 10px; border-radius: 2px; }
.insearch-tab .tab-box .cont .create{display: inline-block;width: 100px;height: 30px;color: white;background-color: #4f97d5;line-height: 30px;margin-left: 22px;font-size: 14px;margin-top: 6px;text-align: center;border-radius: 5px;font-weight: bold}
.insearch-tab .tab-box .cont .create{display: inline-block;width: 100px;height: 30px;color: white;background-color: #4f97d5;line-height: 30px;margin-left: 22px;font-size: 14px;margin-top: 6px;text-align: center;border-radius: 5px;font-weight: bold}
.select-box.max { width: 150px; }
.select-box span{height:38px; overflow:hidden; cursor:pointer;color:#bdc3c7;font-size:14px;display:block;line-height:38px;padding-left:17px;padding-right:30px;background-color: #fff; }
.select-box span.on {color:#34495e;}
.select-box .icon-down{position:absolute;color:#19bd9b;top:0;right:10px;line-height:40px;font-size:12px;}
.select-option{padding:5px 0;background:#fff;border:#d7dcde 1px solid;border-bottom-left-radius: 2px;border-bottom-right-radius: 2px;position:absolute; top:38px;left:-1px;right:-1px; z-index:10;}
.select-option a{height:40px;padding:0 10px; overflow:hidden;line-height:40px;display:block;background:#fff;font-size:14px;color:#7f8c8d;}
.select-option a.on{background:#ecf0f1;}
.select-option a:hover{background:#ecf0f1; transition:all 0.3s;}
.select-box + .space { float: left; height: 20px; margin: 10px 15px; border-left: 1px solid #d7dcde; }
/*æœç´¢æ ä¸‹æ‹‰*/
.select-box-ser {width:99px; min-width: 99px; height: 38px; border: none; border-right:1px solid #b8c4ce;border-radius: 0;margin: 0; /*margin-right:10px;*/}
.select-box-ser span { padding-left: 10px; }
.select-box-ser .select-option a { height: 40px; line-height: 40px; font-size: 14px; }

/*æœç´¢å¯¼èˆªåˆ†ç±»*/
.insearch-tab .tab-bar { display: table; max-width: 1180px; margin: 0 auto; }
.insearch-tab .tab-bar li { float: left; padding: 0 15px; font-size: 14px; }
.insearch-tab .tab-bar li.on a { position: relative; color: #3498db; }
.insearch-tab .tab-bar li.on a:before { opacity: 1; visibility: visible; content: ""; position: absolute; bottom: -1px; left: 50%; margin-left: -8px; width: 16px; height: 9px; background: url("../img/arrow-ser.png") no-repeat center center; background-size: 16px;}
.insearch-tab .tab-bar a { display: inline-block; height: 50px; line-height: 50px; }
.insearch-tab .tab-bar span { color: #b8c4ce; }

.insearch-tab .tab-box { width: 100%; height: 80px; background-color: #f8f9fa; border-top: 1px solid #d7dcde; border-bottom: 1px solid #d7dcde; }
.insearch-tab .tab-box .cont { float: left; margin: 20px -10px;}

/*.insearch-tab .tab-bar.fixed { margin-bottom: 80px; }*/
/*.insearch-tab .tab-bar.fixed li.on a:before { opacity: 0; visibility: hidden; transition: opacity .2s;}*/
.insearch-tab .tab-box.fixed { position: fixed; top: 0; z-index: 100;
	-webkit-animation: fixedshow .3s;
	   -moz-animation: fixedshow .3s;
	     -o-animation: fixedshow .3s;
			animation: fixedshow .3s;
		}
@-webkit-keyframes fixedshow
{
	from { opacity: 0; transform: translateY(-80px); }
	to { opacity: 1; transform: translateY(0); }
}
@-moz-keyframes fixedshow
{
	from { opacity: 0; transform: translateY(-80px); }
	to { opacity: 1; transform: translateY(0); }
}
@-o-keyframes fixedshow
{
	from { opacity: 0; transform: translateY(-80px); }
	to { opacity: 1; transform: translateY(0); }
}
@keyframes fixedshow
{
	from { opacity: 0; transform: translateY(-80px); }
	to { opacity: 1; transform: translateY(0); }
}

/*åœ¨ç»“æžœä¸­æœç´¢*/
.insearch-ser { position: relative; float: right; width: 200px;height: 22px; margin: 20px 0; padding: 8px 20px; border: 1px solid #ccc; border-radius: 30px; background-color: #fff; }
.insearch-ser input { font-size: 14px; height: 22px; line-height: 22px; background-color: transparent;}
.insearch-ser input::-moz-placeholder { color: #b8c4ce;}
.insearch-ser input::-ms-input-placeholder { color: #b8c4ce;}
.insearch-ser input::-webkit-input-placeholder { color: #b8c4ce;}
.insearch-ser input:placeholder { color: #b8c4ce;}
.insearch-ser button { position: absolute; right: 10px; top: 10px; border: none; background-color: transparent; }

/*æ›´å¤š*/
.inser-more-tit { height: 35px; margin-top: 30px; font-size: 14px; line-height: 35px; border-bottom: 1px solid #f5f5f5; }
.inser-more-tit a { float: right; }
/*çµæ„Ÿæ›´å¤š*/
.idea-list { margin-left: -20px; }
.idea-list li { float: left; margin-left: 20px; }
.idea-list li a { display: block; width: 280px; height: 210px; overflow: hidden; }
.idea-list li a:hover img { opacity: .9; filter:alpha(opacity=90); }
/*è®¾è®¡å¸ˆåˆ—è¡¨*/
.author-list li {width: 100%; height: 160px; padding: 20px 0; border-bottom: 1px solid #f5f5f5; }
.author-list li:last-child { border-bottom: none; }
.author-list-cont { float: left; width: 640px; overflow: hidden; margin: 10px 0; }
.author-list-cont .info { margin-left: 20px; }
.author-list-cont .info .name { display: inline-block; vertical-align: middle; font-size: 18px; }
.author-list-cont .info .medal img { margin-left: 5px; width: 26px; }
.author-list-cont .info .num { height: 30px; line-height: 30px; margin-bottom: 7px; }
.author-list-cont .info .num span { margin-right: 10px; font-size: 14px; }
.author-list-cont .info .user-btn {}
.author-list-show { float: right; max-width: 540px; height: 120px; overflow: hidden; }
.author-list-show a { float: right; display: block; width: 160px; height: 120px; margin-left: 20px; }
/*è¯é¢˜åˆ—è¡¨*/
.talk-list li { padding: 14px 0; border-bottom: 1px solid #eff2f5; min-height: 80px; }
.talk-list li:last-child { border-bottom: none; }
.talk-list li .num,
.talk-list li .zan { float: left; width: 60px; line-height: 30px; text-align: center; margin-right: 20px; background-color: #ecf0f1; border-radius: 2px; }
.talk-list li .num { position: relative; }
.talk-list li .num.green { background-color: #1abc9c; }
.talk-list li .num.blue { background-color: #3498db; color: #fff; }
.talk-list li .num.green a,
.talk-list li .num.blue a { color: #fff; }
.talk-list li .num .dot { position: absolute; top: -3px; right: -3px; width: 10px; height: 10px; border-radius: 5px; background-color: #fcab2b; }
.talk-list li .num a { display: inline-block; font-weight: bold; letter-spacing: 1px; color: #34495e; }
.talk-list li .zan i { color: #505f69; margin-right: 5px; }
.talk-list li .zan.active i { color: #3498db; }
.talk-list li .zan:hover { background-color: #3498db; color: #fff;}
.talk-list li .zan:hover i { color: #fff; }
.talk-list li .li-cont { float: left; width: 1100px; }

.li-cont h1 { font-size: 20px; line-height: 30px; }
.li-cont h2 { font-size: 16px; line-height: 30px; }
.li-cont .info { font-size: 12px; color: #bdc3c7; line-height: 26px; }
.li-cont .info span { margin-right: 20px; }
.li-cont .info span.fold { margin-right: 0; }
.li-cont .info span a { color: #bdc3c7; }
.li-cont .info span a.toggle.active, 
.li-cont .info span a:hover, 
.li-cont .info span a:hover i { color: #3498db; }
.li-cont .info span.user { font-weight: bold; }
.li-cont .info span.info-hide { display: none; }
.li-cont .info span.info-hide a { color: #3498db; margin-right: 20px; }
.li-cont .info span.info-hide a:hover { text-decoration: underline; }

.li-cont .li-t p { line-height: 26px; }
.li-cont .li-t p.summary { width: 980px; }
.li-cont .li-t img.preview { position: absolute; top: 6px; right: 0; width: 100px; height: 70px; }
.li-cont .li-t-open { display: none;}
.li-cont .li-t img,
/*.li-cont .li-t-open img { max-width: 760px; }*/
/*åˆ—è¡¨å±•å¼€/æ”¶èµ·*/
.unfold { font-size: 12px; color: #4090d7; background-color: #ecf0f1; height: 16px; padding: 2px 5px; white-space: nowrap; border-radius: 2px; cursor: pointer; }
.fold { cursor: pointer; float: right; }
.fold i.icon-retract { font-style: normal; } /*é˜»æ­¢ç¼–è¾‘å™¨é»˜è®¤æ ·å¼å†²çª*/

/*æœç´¢ä¸ºç©º*/
.insearch-kong { display: table; margin: 80px auto 40px; padding: 35px 0 0 115px; height: 120px; background: url("../img/serch-null.png") no-repeat 0 0; background-size: 100px; } 
.insearch-kong h5 { font-size: 20px; color: #8fafc6; font-weight: bold; }
.insearch-kong p { font-size: 14px; color: #bdc3c7; font-weight: bold; }
.team li.line{
	width: 100%;
	height: 1px;
	background-color: #e4e4e4;
	margin: 40px auto;
}
.team>li:last-of-type{
	display: none;
}
.team li.cl{
	padding: 40px 50px;
	box-sizing: border-box;
	overflow: hidden;
}
.team li.cl:last-of-type{
	margin-bottom: 40px;
	border-bottom: none;
}
.team li.cl:hover{
	background-color: #ffffff;
}
.team li.cl .team-left{
	width: 180px;
	margin-right: 30px;
	margin-top: 7px;
}
.team li .logo{
	width: 180px;
    height: 135px;
	display: block;
}
.team li .attention{
	width: 80px;
	height: 30px;
	background-color:#3498db;
	border-radius: 2px;
	color: white;
	text-align: center;
	line-height: 30px;
	font-size: 14px; 
	font-weight: bold;
	display: block;
	margin: 8px auto 0;
}
.team li .attention.on{
	background-color: #48b074;
}
.team li .attention.unfollow{
	background-color: #ee3b3b;
}
.team li .attention i{
	color: white;
	margin-right: 2px;
	font-size: 14px;
}
.team li .attention i:before {
    content: "\e6cf";
}
.team li .havefollow i:before {
	content: "\e6d1";
}
.team .team-middle{
	width: 320px;
}
.team .team-name{
	color: #34495e;
    font-size: 18px;
    display: block;
    margin-top: 14px;
    width: 305px;
    line-height: 25px;
    font-weight: bold;
    height: 25px;
}
.team .team-name span.z:first-of-type{
	max-width: 205px;
	display: inline-block;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	vertical-align: middle;
}
.team .team-name span.z:last-of-type{
	display: inline-block;
	padding-left: 5px;
	height: 16px;
	border-left: 1px solid #becad3;
	color: #becad3;
	font-size: 14px;
	line-height: 14px;
	margin-left: 5px;
	vertical-align: middle;
	margin-top: 5px;
}
.team .team-middle>p{
    width: 305px;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #34495e;
    font-size: 16px;
	margin: 8px 0;
	height: 24px;
    font-weight: bold;
}
.team .team-middle>p.signature{
	font-size: 14px;
}
.team .team-middle>p span{
	display: inline-block;
	margin-right: 20px;
}
.team .team-middle div{
    height: 42px;
    line-height: 42px;
    font-size: 14px;
    color: #34495e;
}
.team .team-middle div span {
    display: inline-block;
	vertical-align: middle;
	font-weight: bold;
}
.team .team-middle div p {
    display: inline-block;
    height: 42px;
    width: 240px;
    vertical-align: middle;
}
.team .team-middle div p img {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin-top: 3px;
    display: inline-block;
	vertical-align: top;
	border:2px solid #fff;
	position: relative;
	margin-left: -7px;
}
.team .team-middle div p.few img:first-of-type{
    width: 38px;
    height: 38px;
	margin-top: 0;
	z-index: 6;
	margin-left: 0;
}
.team .team-middle div p.few img:nth-of-type(2){
	z-index: 5;
}
.team .team-middle div p.few img:nth-of-type(3){
	z-index: 4;
}
.team .team-middle div p.few img:nth-of-type(4){
	z-index: 3;
}
.team .team-middle div p.few img:nth-of-type(5){
	z-index: 2;
}
.team .team-middle div p.cl {
    padding-right: 9px;
    box-sizing: border-box;
}
.team .team-middle div p.cl a.y {
    display: block;
    right: 0;
    width: 25px;
    height: 40px;
    background: url(../img/dian2.png) no-repeat center;
}
.team .team-middle div p.cl img {
    margin-left: -7px;
}
.team .team-middle div p.cl img:last-of-type {
    margin-left: 0;
    width: 40px;
    height: 40px;
    margin-top: 0;
}
.team .team_right {
    width: 540px;
}
.team .team_right h4 {
    color: #33495f;
    margin-top: 14px;
	font-size: 16px;
	font-weight: bold;
}
.team .team_right p {
    height: 135px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 5px;
    line-height: 1.5;
    font-size: 14px;
	color: #33495f;
	text-align: justify;
}
.team h3 {
    color: #33495f;
    font-size: 16px;
    margin-top: 40px;
	margin-bottom: 14px;
	font-weight: bold;
}
.team .team_work_list li{
    float: left;
    margin-right: 12px;
}
.team .team_work_list li:last-of-type{
	margin-right: 0;
}
.team .team_work_list li a {
    display: block;
}
.team .team_work_list li a img {
    width: 260px;
    height: auto;
}
.team .y li{
	margin-left: 30px;
}
.team .y li a{
	display: block;
	width: 160px;
	height: 120px;
}
.team .y li a img{
	width: 100%;
	height: 100%;
}
.fixed-pop{
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 12;
	background-color: rgba(0,0,0,.3);
	display: none;
}
.fixed-pop .con{
	width: 600px;
	/* height: 720px; */
	background-color: white;
	border-radius: 10px;
	margin: 65px auto;
	padding-top: 30px;
	box-sizing: border-box;
}
.fixed-pop .con div{
	height: 55px;
	border-bottom: 1px solid #e0e7eb;
	width: 555px;
	margin: 0 auto;
	line-height: 55px;
	font-size: 16px;
	padding: 0 20px;
	box-sizing: border-box;
	font-weight: bold; 
	color: #33495f;
}
.fixed-pop .con div.h3{
	font-size: 22px;
}
.fixed-pop .con div label{
	font-size: 16px;
}
.fixed-pop .con input{
	height: 30px;
	display: inline-block;
	border: none;
	outline: none;
	font-size: 14px;
	color: #33495f;
	width: 360px;
	font-weight: bold;
}
.fixed-pop .con .team-style p{
	display: inline-block;
	margin-right: 20px;
	cursor: pointer;
}
.fixed-pop .con .team-style p .radius{
	display: inline-block;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	/* padding: 1px; */
	box-sizing: border-box;
	border: 1px solid #384e63;
}
.fixed-pop .con .team-style p.on .radius em{
	background-color: #384e63;
	display: block;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	position: absolute;
	left: 1px;
	top: 1px;
}
.fixed-pop .con .team-simple-intro{
	height: 217px;
	border-bottom: 1px solid #e0e7eb;
	width: 555px;
	margin: 0 auto;
	font-size: 16px;
	padding: 0 20px;
	box-sizing: border-box;
	font-weight: bold; 
	padding-top: 15px;
}
.fixed-pop .con .team-simple-intro textarea{
	width: 100%;
	height: 132px;
	padding: 10px 15px;
	font-size: 12px;
	color: #34495e;
	display: block;
	background-color:#eaeef1;
	box-sizing: border-box;
	outline: none;
	border: none;
	line-height: 1.5;
}
.fixed-pop .con .team-simple-intro p:first-of-type{
	font-size: 16px;
	margin-bottom: 10px;
}
.fixed-pop .tel-code p{
	font-size: 16px;
	margin-top: 20px;
}
.fixed-pop .tel-code p img{
	width: 120px;
	height: 37px;
}
.fixed-pop .con .team-simple-intro p:last-of-type{
	font-size: 12px;
	margin-top: 10px;
	color: #c1cbd3;
}
.fixed-pop .tel-code p input.right_tip{
	background: url(../img/right1.png) no-repeat 95% center;
}
.fixed-pop .tel-code p input.error_tip{
	background: url(../img/error.png) no-repeat 95% center;
}
.fixed-pop .con .team-simple-intro p:last-of-type span{ 
	color: #f1aa58;
}
.fixed-pop .con .tel-code{
	border-bottom: none;
	height: auto;
}
.fixed-pop .con .tel-code input{
	width: 108px;
	margin-right: 5px;
}
.fixed-pop .con .tel-code input[name="verify"]{
	width: 130px;
}
.fixed-pop .con .tel-code a{
	display: inline-block;
	width: 78px;
	height: 20px;
	line-height: 20px;
	color: white;
	text-align: center;
	background-color:#3598db;
	border-radius: 5px; 
	font-size: 12px;
	font-weight: normal;
}
.fixed-pop .con .btn-group{
	font-size: 0;
	text-align: center;
	border-bottom: 10px;
	margin-top: 15px;
}
.fixed-pop .con .btn-group a{
	display: inline-block;
	width: 88px;
	height: 30px;
	text-align: center;
	line-height: 30px;
	color: #c1cbd3;
	font-size: 14px;
}
.fixed-pop .con .btn-group a:last-of-type{
	color: white;
	background-color: #3598db;
	border-radius: 5px;
	margin-left: 20px;
}
.fixed-pop .error{
	color: #e65d54;
	font-size: 12px;
	position: absolute;
	right: 0;
	top: 0;
	display: none
} 
.fixed-pop .error5{
	color: #e65d54;
	font-size: 12px;
	position: absolute;
	left: 75px;
	top: 0;
	display: none
}
.fixed-pop .error6{
	color: #e65d54;
	font-size: 12px;
	position: absolute;
	left: 215px;
	top: 10px;
	display: inline-block;
	line-height: 14px;
	display: none;
}
.fixed-pop .error7{
	color: #e65d54;
	font-size: 12px;
	position: absolute;
	left: 298px;
	top: 38px;
	display: inline-block;
	line-height: 14px;
	display: none;
}
.fixed-pop .error8{
	color: #e65d54;
	font-size: 12px;
	position: absolute;
	left: 90px;
	top: -12px;
	display: inline-block;
	line-height: 14px;
	display: none;
}

/*
 * Copyright @ UI.CN 
 * Data: 2015-03-02
 */

/* ==========================================================================
   CSS Normalize Styles
   ========================================================================== */


/** {
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}
*:before,
*:after {
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}*/
html {
	-webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
}
body {
	margin: 0;
	font-family: "Microsoft Yahei", "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-size: 12px;
	line-height: 1.5;
	color: #34495e;   /*é»‘è“è‰²*/
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	-moz-font-feature-settings: "liga","kern";
}
article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary {
	display: block;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
td,th {
	padding: 0;
}
ul,ol,li,dl,dd {
	margin: 0;
	padding: 0;
}
ul,ol {
	list-style: none outside none;
}
a {
	color: #34495e;   /*é»‘è“è‰²*/
	outline: medium none;
	text-decoration: none;
	background: transparent;
	star:expression(this.onFocus=this.blur());
	transition: all 0.2s ease-in-out;
}
a:hover {
	color: #3498db;   /*æµ…è“è‰²*/
}
figure {
  margin: 0;
}
img {
	border: 0;
	vertical-align: middle;
	width: inherit;
	height: inherit;
}
b,strong {
	font-weight: normal;
}
i, cite, em, var, address, dfn {
	font-style: normal;
}

abbr[title],
abbr[data-original-title] {          /*æ ‡è®°ç¼©å†™*/
	cursor: help;
	border-bottom: 1px dotted;
}
mark {                /*é«˜äº®æ–‡æœ¬*/
	background: #ff0;
	color: #000;
}
small {               /*æ ‡è®°å°å­—*/
	font-size: 80%;
}
hr {
	-moz-box-sizing: content-box;
	box-sizing: content-box;
	height: 0;
	margin-top: 20px;
	margin-bottom: 20px;
	border: 0;
	border-top: 1px solid #eee;
}

button,input,optgroup,select,textarea {
	margin: 0;
	color: inherit;
	font: inherit;
}

button {
	overflow: visible;
}

button,select {
	text-transform: none;
}

button,html input[type="button"],input[type="reset"],input[type="submit"] {
	cursor: pointer;
	-webkit-appearance: button;
}

button[disabled],html input[disabled] {
	cursor: default;
}

button::-moz-focus-inner,input::-moz-focus-inner {
	padding: 0;
	border: 0;
}

input, button, select, textarea {
	font-family: inherit;
	font-size: inherit;
	line-height: inherit;
}

input::-ms-clear {
    display: none;
}

input[type="checkbox"],input[type="radio"] {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	padding: 0;
}

input[type="number"]::-webkit-inner-spin-button,input[type="number"]::-webkit-outer-spin-button {
	height: auto;
}

input[type="search"] {
	-webkit-box-sizing: content-box;
       -moz-box-sizing: content-box;
            box-sizing: content-box;
    -webkit-appearance: textfield;
}

input[type="search"]::-webkit-search-cancel-button,input[type="search"]::-webkit-search-decoration {
	-webkit-appearance: none;
}

fieldset {
	margin: 0 2px;
	padding: .35em .625em .75em;
	border: 1px solid #c0c0c0;
}

legend {
	padding: 0;
	border: 0;
}

textarea {
	overflow: hidden;
	resize: none;
}

optgroup {
	font-weight: bold;
}

input::-moz-placeholder,textarea::-moz-placeholder {
	color: #bdc3c7;
}

input:-ms-input-placeholder,textarea:-ms-input-placeholder {
	color: #bdc3c7;
}

input::-webkit-input-placeholder,textarea::-webkit-input-placeholder {
	color: #bdc3c7;
}

object { outline: none;}

/* ==========================================================================
   CSS Base Styles
   ========================================================================== */

/* æµ®åŠ¨ */
.z { float: left !important; }
.y { float: right !important; }

/* æ¸…é™¤æµ®åŠ¨ */
.cl:before, .cl:after{content:" ";display: table;}
.cl:after { clear: both }
.cl { *zoom: 1 }

/* æ˜¾ç¤º/éšè— */
.show { display: block !important; }
.hide { display: none !important; }

/* ç›¸å¯¹å®šä½ */
.pos { position: relative; }

/*å—çº§å…ƒç´ */
.block { display: block; margin-left: auto; margin-right: auto; }
.inblock { display: inline-block; }

/*å•è¡Œæ–‡æœ¬æº¢å‡ºæ–‡æœ¬æ˜¾ç¤ºçœç•¥å·*/
.ellipsis {
	display: block; 
	overflow: hidden; 
	white-space: nowrap; 
	text-overflow: ellipsis; 
}

/* ç°è‰² */
.grays { 
    filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale"); /* Firefox 3.5+ */ 
    -webkit-filter: grayscale(100%); /* chrome+ */ 
    filter: grayscale(100%); /* æœªæ¥æµè§ˆå™¨ */ 
    filter: gray; /* ie6-8 */ 
    filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);/*ie6-9 */
    opacity: 0.5;
    filter: opacity(50);
}

/*é¡µé¢é€‰ä¸­æ—¶èƒŒæ™¯é¢œè‰²*/
::selection{background:#3498db;color:#fff;}
::-moz-selection{background:#3498db;color:#fff;}

/* é€šç”¨å®¹å™¨ï¼Œå®šä¹‰é¡µé¢å®½åº¦ å…·æœ‰äº”ä¸ªçº§åˆ« */
.wps { width: 880px; margin: 0 auto; }
.wpu { width: 940px; margin: 0 auto; }
.wpn { width: 1180px; margin: 0 auto; }  	/* 4 åˆ— * 300 */
.wpm { width: 1480px; margin: 0 auto; }  	/* 5 åˆ— * 300 */
.wpw { width: 1780px; margin: 0 auto; } 	/* 6 åˆ— * 300 */
.wpv { width: 0px; margin: 0 auto; }
.wpx { width: 0px; margin: 0 auto; }

/* å¤–è¾¹è·æ ·å¼ï¼Œä½œç”¨äºŽå…ƒç´ çš„ä¸Šä¸‹å¤–è¾¹è·ï¼Œä¸Šä¸‹å„å…·æœ‰ n, m, w ä¸‰ä¸ªçº§åˆ« */
.mtn { margin-top: 5px !important; }
.mtm { margin-top: 10px !important; }
.mtw { margin-top: 20px !important; }
.mtv { margin-top: 30px !important; }

.mbn { margin-bottom: 5px !important; }
.mbm { margin-bottom: 10px !important; }
.mbw {margin-bottom: 20px !important;}
.mbv { margin-bottom: 30px !important; }

.mrn { margin-right: 5px !important; }
.mrm { margin-right: 10px !important; }
.mrw { margin-right: 20px !important; }
.mrv { margin-right: 30px !important; }

.mln { margin-left: 5px !important; }
.mlm { margin-left: 10px !important; }
.mlw { margin-left: 20px !important; }
.mlv { margin-left: 30px !important; }

.mtbn { margin: 5px 0 !important; }
.mtbm { margin: 10px 0 !important; }
.mtbw { margin: 20px 0 !important; }
.mtbv { margin: 30px 0 !important; }

.mlrn { margin: 0 5px !important; }
.mlrm { margin: 0 10px !important; }
.mlrw { margin: 0 20px !important; }
.mlrv { margin: 0 30px !important; }


/* å†…è¾¹è·æ ·å¼ï¼Œä½œç”¨äºŽå…ƒç´ çš„ä¸Šä¸‹å†…è¾¹è·ï¼Œä¸Šä¸‹å„å…·æœ‰ n, m, w ä¸‰ä¸ªçº§åˆ« */
.ptn { padding-top: 5px !important; }
.ptm { padding-top: 10px !important; }
.ptw { padding-top: 20px !important; }
.ptv { padding-top: 30px !important; }

.prn { padding-right: 5px !important; }
.prm { padding-right: 10px !important; }
.prw { padding-right: 20px !important; }
.prv { padding-right: 30px !important; }

.pln { padding-left: 5px !important; }
.plm { padding-left: 10px !important; }
.plw { padding-left: 20px !important; }
.plv { padding-left: 30px !important; }

.pbn { padding-bottom: 5px !important; }
.pbm { padding-bottom: 10px !important; }
.pbw { padding-bottom: 20px !important; }
.pbv { padding-bottom: 30px !important; }

.ptbn { padding: 5px 0 !important; }
.ptbm { padding: 10px 0 !important; }
.ptbw {padding: 20px 0 !important;/* box-sizing:  border-box; */}
.ptbv { padding: 30px 0 !important; }

.plrn { padding: 0 5px !important; }
.plrm { padding: 0 10px !important; }
.plrw { padding: 0 20px !important; }
.plrv { padding: 0 30px !important; }




/* æ–‡æœ¬å±žæ€§ï¼šæ ‡é¢˜ å­—å·ã€æ ·å¼ã€é¢œè‰²ã€èƒŒæ™¯é¢œè‰² */
h1,h2,h3,h4,h5,h6,
.h1,.h2,.h3,.h4,.h5,.h6 {
	color: inherit;
	font-family: inherit;
	font-weight: normal;
	line-height: 1.5;
	margin: 0;
}
h1,.h1 { font-size:24px }
h2,.h2 { font-size:18px; line-height:1.5555556 }
h3,.h3 { font-size:16px }
h4,.h4 { font-size:14px; line-height:1.5714285 }
h5,.h5 { font-size:12px }

p { margin: 0; font-size: 14px; line-height: 1.57142858; color: #34495e; word-wrap:break-word; word-break: break-word; }

/* å­—å· */
.f12 { font-size: 12px !important; }
.f14 { font-size: 14px !important; }
.f16 { font-size: 16px !important; }
.f22 { font-size: 22px !important; }
.f26 { font-size: 26px !important; }

/*æ–‡æœ¬æ ·å¼*/
.txt-left { text-align: left }
.txt-right { text-align: right }
.txt-center { text-align: center }
.txt-bold { font-weight: bold }

/*æ–‡æœ¬é¢œè‰²*/
.txt-primary { color: #3498db; }
a.txt-primary:hover {color: #3498db; text-decoration: underline; transition: all 0.2s ease-in-out; }

.txt-gray { color: #b8c4ce; }
a.txt-gray:hover { color: #34495e; }

/*èƒŒæ™¯é¢œè‰²*/
/*.bg-primary { background-color: #3499da !important; color: #fff !important; }*/
.bg-gray { background-color: #b8c4ce !important; color: #fff !important; }
.bg-nature { background-color: transparent !important; color: #2c3e50 !important; }
.bg-orange { background-color: #ff8d41 !important; color: #fff !important; }
.bg-blue { background-color: #3498db!important; color: #fff !important; }
.bg-green { background-color: #1abc9c !important; color: #fff !important; }
.bg-purple { background-color: #9b59b6!important; color: #fff !important; }

/*å®½åº¦*/
.col-n { width: 280px !important; }
.col-m { width: 520px !important; }
.col-w { width: 580px !important; }
.col-v { width: 880px !important; }
.col-x { width: 1180px !important; }

/*é«˜åº¦*/
.hei-n { height: 100px; }
.hei-m { height: 520px; }
.hei-w { height: 720px; }

/**
 * æŒ‰é’® Buttons 
 **/
.btn {
	display: inline-block;
	padding: 10px 20px;
	/*height: 40px;*/
	/*height: 20px;*/
	/*line-height: 1.42857143;*/
	line-height: 20px;
	letter-spacing: 1px;
	font-size: 14px;
	text-align: center;
	white-space: nowrap;
	vertical-align: middle;
	cursor: pointer;
	-webkit-user-select: none;   /*ç¦æ­¢é€‰æ‹©æ–‡å­—*/
	   -moz-user-select: none;
	    -ms-user-select: none;
	        user-select: none;
	/*background-image: none;*/
	border: none;
	/*border-radius: 2px;*/
}
.btn:hover { transition: background-color 0.2s ease-in-out; color: #fff; }
.btn:focus, .btn:active:focus { outline: none; }

/*ç¦ç”¨æŒ‰é’®*/
.btn.disabled {
  pointer-events: none;
  cursor: not-allowed;
  filter: alpha(opacity=60);
  -webkit-box-shadow: none;
          box-shadow: none;
  opacity: .60;
}

/*è“è‰²æŒ‰é’®*/
.btn-primary { color: #fff; background-color: #3498db; }
.btn-primary:hover{ color: #fff; background-color: #3da2e3; }
.btn-primary:active{ background-color: #298fd3; }

/*ç°è‰²æŒ‰é’®*/
.btn-gray { color: #fff; background-color: #b8c4ce; }

/*æ— èƒŒæ™¯æŒ‰é’®*/
.btn-nature { color: #2c3e50; background-color: transparent; }
.btn-nature:hover { color: #fff; color: #3498db; }

/*æ©™è‰²æŒ‰é’®-å°ç±³ä¸»é¢˜ç«™*/
.btn-orange { color: #fff; background-color: #ff7920; }
.btn-orange:hover { color: #fff; background-color: #ff8d41; }
.btn-orange:active { background-color: #ee6f1a; }

/*å®šä¹‰æŒ‰é’®é«˜åº¦*/
.btn-mini { /*height: 30px;*/ padding: 5px 20px; }
.btn-big { /*height: 50px; line-height: 1.5;*/ padding: 15px 30px; font-size: 16px; }

/*å®šä¹‰æŒ‰é’®å®½åº¦*/
.btn-fixed-n { width: 80px; padding-left: 0; padding-right: 0; }
.btn-fixed-m { width: 120px; padding-left: 0; padding-right: 0; }
.btn-fixed-w { width: 160px; padding-left: 0; padding-right: 0; }
.btn-block { display: block; width: 100%; padding-left: 0; padding-right: 0; }


/*ç”¨æˆ·å¤´åƒ*/
.avatar-xs { display: inline-block; width: 32px; height: 32px; }
.avatar-sm { display: inline-block; width: 60px; height: 60px; }
.avatar-md { display: inline-block; width: 100px; height: 100px; }
.avatar-lg { display: inline-block; width: 148px; height: 148px; }
.avatar img,
.avatar-xs img, 
.avatar-sm img, 
.avatar-md img,
.avatar-lg img { width: 100%; height: 100%; border-radius: 50%; }

/*ç¼©ç•¥å›¾*/
.thumb img { width: 100%; height: 100%; }

/**
 * è¡¨å• Form 
 **/

input,
textarea {border: 1px solid #b8c4ce;border-radius: 2px;}

input:focus,
textarea:focus {
	outline: none;
	border-color: #3498db;
    box-shadow: 0 0 4px rgba(41, 128, 185, 0.4);
    -webkit-transition: border-color ease-in-out .2s, -webkit-box-shadow ease-in-out .2s;
         -o-transition: border-color ease-in-out .2s, box-shadow ease-in-out .2s;
            transition: border-color ease-in-out .2s, box-shadow ease-in-out .2s;
}

.control-input {
	display: block;
	width: 100%;
	padding: 13px 15px;
	font-size: 14px;
	height: 50px;
	line-height: 1.5;
	color: #5d6d7e;
	background-color: #fff;
	background-image: none;
	border: 1px solid #b8c4ce;
}

textarea.control-input { height: auto; }

.control-label { display: block; font-size: 16px; line-height: 40px; }

/* å•é€‰æ¡†ã€å¤é€‰æ¡† */
.checkbox {
	position: relative;
	font-size: 14px;
	height: 30px;
	line-height: 30px;
	margin: 20px 0;
}
.checkbox input[type="checkbox"] {
	cursor: pointer;
	display: block;
	height: 100%;
	left: 0;
	margin: 0;
	position: absolute;
	top: 0;
	width: 100%;
	opacity: 0;
}
.checkbox input[type="checkbox"] + label .icon-ok-sign {
	display: inline-block;
	background-color: #b8c4ce;
	border-radius: 2px;
	font-size: 12px;
	text-align: center;
	line-height: 16px;
	height: 16px;
	width: 16px;
	float: left;
	margin: 7px 7px 7px 0;
}
.checkbox input[type="checkbox"]:checked + label .icon-ok-sign {
	background-color: #3498db;
	color: #fff;
}

/*message æé†’æ¶ˆæ¯*/
#ajax-hook{ position:fixed; top:0; z-index:99999; width:100%;}
.globalInfoTip {z-index: 20; height: 60px;width: 100%;position: relative;cursor: pointer;}
.globalInfoTip p {text-align: center;font-size: 16px;height: 30px;line-height: 30px;padding: 15px 0;color: #FFF;position: relative;}
.globalInfoTip .infoTipBack {position: absolute;top: 0;left: 0;right: 0;bottom: 0;background: #3498db;box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);opacity: 0.8;filter:alpha(opacity=80);-moz-opacity: 0.8;-khtml-opacity: 0.8;}

/* æœç´¢ä¸ºç©ºå›¾ç‰‡å ä½ */
.kong{width:100%;background:url("../../img/serch-null.png") no-repeat center center;height:400px;}

/*ç‚¹å‡»æŒ‰é’®åŽæ˜¾ç¤ºæ­£åœ¨åŠ è½½çŠ¶æ€*/
.loading{background-image:url("../../img/global/loading.gif")!important;background-color:#3499DA !important;background-repeat:no-repeat;background-position:center center;background-size:20px;} 

/*å­—ä½“å›¾æ ‡*/
.iconfont, [class^="icon-"], [class*=" icon-"] {
  font-family:"iconfont" !important;
  font-size:16px;
  color: #b8c4ce;
  font-style:normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  /*  -webkit-font-smoothing: none;
  -webkit-text-stroke-width: initial;
  -moz-osx-font-smoothing: initial;*/
}
/*ç½‘ç«™æ•´ä½“ç°è‰²èƒŒæ™¯*/
body,
.body-gray { background-color: #eff3f5; }
/*éƒ¨åˆ†ç™½è‰²èƒŒæ™¯*/
.bg-white {background-color: #fff;}
.logo-hd .icon {
	width: 60px;
	height: 70px;
	text-align: center;
	fill: currentColor;
	overflow: hidden;
}


```
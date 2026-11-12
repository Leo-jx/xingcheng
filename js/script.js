
/* ========== 数据 ========== */
var PROVINCES = ["北京","天津","上海","重庆","河北","山西","辽宁","吉林","黑龙江","江苏","浙江","安徽","福建","江西","山东","河南","湖北","湖南","广东","海南","四川","贵州","云南","陕西","甘肃","青海","中国台湾","内蒙古","广西","西藏","宁夏","新疆","中国香港","中国澳门"];

var SPOTS = [
 {id:1,name:"橘子洲",tag:"湘江江心洲",img:"img-juzizhou",stars:5,hot:true,
  desc:"五公里长的江心洲，洲头一座青年毛泽东艺术雕塑，高 32 米。",
  detail:"橘子洲是湘江中的冲积沙洲，长约 5 公里。1925 年毛泽东重游长沙写下《沁园春·长沙》，“独立寒秋，湘江北去，橘子洲头”说的就是这里。洲头的青年毛泽东艺术雕塑 2009 年落成，高 32 米、长 83 米。春看江雾、夏看焰火、秋看橘柚，是本地人的固定节目。"},
 {id:2,name:"岳麓山 · 爱晚亭",tag:"城中之山",img:"img-yuelu",stars:5,hot:true,
  desc:"海拔三百米的城中之山，深秋枫叶红时，爱晚亭最好看。",
  detail:"岳麓山主峰海拔约 300 米，是少见的紧贴城区的山。爱晚亭始建于清乾隆五十七年（1792），原名红叶亭，后取杜牧“停车坐爱枫林晚”句意改名。亭为重檐八柱，与滁州醉翁亭、杭州湖心亭、北京陶然亭并称中国四大名亭。"},
 {id:3,name:"岳麓书院",tag:"千年学府",img:"img-shuyuan",stars:5,hot:true,
  desc:"北宋开宝九年创建，中国四大书院之一，至今仍在讲学。",
  detail:"岳麓书院创建于北宋开宝九年（976），是古代四大书院之一。大门对联“惟楚有材，于斯为盛”，讲堂悬“实事求是”匾。书院历经宋元明清，1926 年在此基础上设立湖南大学，书声至今未断。"},
 {id:4,name:"湖南博物院",tag:"马王堆宝藏",img:"img-museum",stars:5,hot:true,
  desc:"马王堆汉墓、辛追夫人、仅 49 克的素纱襌衣都在这里。",
  detail:"湖南博物院 1956 年开馆，院藏马王堆汉墓出土文物是镇馆之本：辛追夫人遗体、T 形帛画、仅 49 克的素纱襌衣。新馆由矶崎新设计，常设“长沙马王堆汉墓陈列”与“湖南人”两大展。参观需提前预约，周一闭馆。"},
 {id:5,name:"太平老街",tag:"青石板上的市井",img:"img-taiping",stars:5,hot:true,
  desc:"贾谊故居所在的老街，白天看老宅，夜里吃小吃。",
  detail:"太平街是长沙古城保留原有街巷格局最完整的一条街，长约 370 米。街内有贾谊故居、长怀井、干益升粮栈等老建筑，也有臭豆腐、糖油粑粑的摊子。石板路被踩得发亮，是本城最热闹的市井切片。"},
 {id:6,name:"天心阁",tag:"古城墙上的楼阁",img:"img-tianxin",stars:4,hot:false,
  desc:"长沙古城墙仅存的一段，三层阁楼压着明代城砖。",
  detail:"天心阁始建于明万历年间，坐落于长沙古城墙东南角。现存城墙长约 250 米，是长沙古城墙仅存遗址。阁楼在 1938 年“文夕大火”中焚毁，1983 年按原貌重建，三层重檐，登阁可俯瞰老城。"},
 {id:7,name:"杜甫江阁",tag:"湘江边的夜灯",img:"img-dufu",stars:5,hot:true,
  desc:"为纪念杜甫寓居长沙而建，入夜整座楼阁亮成金色。",
  detail:"杜甫晚年两度寓居长沙（768—770 年），留下《江南逢李龟年》等诗篇。杜甫江阁 2005 年建成，临湘江而立，主体为仿唐风格。入夜灯光亮起，江风、船影与楼阁同框，是拍湘江夜景的常规机位。"},
 {id:8,name:"五一广场 · IFS",tag:"不夜城中心",img:"img-ifs",stars:4,hot:false,
  desc:"长沙夜经济的十字路口，国金中心塔楼压着整片人流。",
  detail:"五一广场是长沙的商业原点，黄兴路步行街、太平街、坡子街在此交汇。国金中心 T1 塔楼高 452 米，顶层平台有大型艺术装置。入夜后灯光、直播与人流叠在一起，是“夜长沙”最直白的注脚。"},
 {id:9,name:"超级文和友",tag:"八十年代老长沙",img:"img-wenheyou",stars:4,hot:false,
  desc:"把整条旧街搬进商场，霓虹灯牌下吃口味虾。",
  detail:"文和友起于 2011 年的路边摊，海信广场店把上世纪八十年代的长沙街巷整体复原：水泥墙、防盗窗、录像厅、理发店招牌全都留着。排队号常以千计，口味虾与猪油拌饭是必点。"},
 {id:10,name:"铜官窑古镇",tag:"唐代窑火",img:"img-tongguan",stars:4,hot:false,
  desc:"长沙窑釉下多彩的发源地，一河两岸的唐风建筑群。",
  detail:"铜官窑（长沙窑）是唐代重要的外销瓷窑，首创釉下多彩，产品经“黑石号”沉船远抵西亚。古镇沿湘江而建，复建了窑址、衙门、会馆与客栈，夜间的打铁花与火龙表演值得留到天黑。"},
 {id:11,name:"开福寺",tag:"湘江畔的千年古刹",img:"img-kaifu",stars:4,hot:false,
  desc:"后唐天成二年始建，红墙内藏着北宋十六罗汉的故事。",
  detail:"开福寺始建于后唐天成二年（927），是长沙现存最古老的佛寺之一，历史上与杭州灵隐、南京清凉寺齐名。寺内舍利塔、碧浪湖与五百罗汉堂依次展开，北宋名家所绘十六罗汉像曾长期供奉于此。每逢初一十五，湘江边的香火与市声混在一起，是老长沙最日常的信仰切片。"},
 {id:12,name:"湖南第一师范",tag:"城南书院旧址",img:"img-diyifan",stars:4,hot:false,
  desc:"青砖拱廊的西式校舍，青年毛泽东在此求学五年。",
  detail:"湖南第一师范的前身是南宋张栻创办的城南书院，1903 年改立师范。现存校舍为 1912 年后建成的中西合璧建筑群，青砖拱券长廊围出一方庭院。1913—1918 年毛泽东在此就读，第八班教室、阅报室与水井均按原貌保留，现为全国重点文物保护单位与纪念馆。"},
 {id:13,name:"长沙简牍博物馆",tag:"三国吴简出土处",img:"img-jiandu",stars:4,hot:false,
  desc:"1996 年走马楼一口古井，出土十万余枚三国吴简。",
  detail:"1996 年，长沙走马楼街一口三国时期的古井中出土十余万枚孙吴简牍，数量超过此前全国发现简牍的总和，内容涉及赋税、户籍、司法与书信，被称为二十世纪最重要的三国史料之一。博物馆 2007 年开放，展陈以简牍为主，兼及长沙窑与青铜器。"},
 {id:14,name:"靖港古镇",tag:"湘江西岸的水乡老镇",img:"img-jinggang",stars:4,hot:false,
  desc:"昔日湘江四大米市之一，麻石街与吊脚楼还在。",
  detail:"靖港位于湘江西岸，因唐代李靖驻军得名，明清时是湘江四大米市之一，商号林立、舟楫相接。古镇保存了麻石街、吊脚楼、宏泰坊与杨泗庙，还有皮影、香干、杠子面等老行当。距市区约半小时车程，适合留半天慢慢走。"},
 {id:15,name:"谢子龙影像艺术馆",tag:"洋湖边的清水混凝土",img:"img-xiezilong",stars:4,hot:false,
  desc:"一道长阶通向白盒子，光影本身就是展品。",
  detail:"谢子龙影像艺术馆 2017 年开馆，由魏春雨设计，以清水混凝土的几何体块与一条直抵水面的长阶著称，是国内少见的摄影专题美术馆。建筑本身常比展览更早上镜：正午的斜切光、雨后的镜面水池，都是常被拍到的画面。相邻的李自健美术馆可一并安排。"},
 {id:16,name:"火宫殿",tag:"坡子街的庙会烟火",img:"img-huogongdian",stars:4,hot:true,
  desc:"火神庙里长出一座小吃城，臭豆腐的原点。",
  detail:"火宫殿始建于明万历五年（1577），本为祭祀火神的庙宇，因庙会逐渐聚成小吃集市。1938 年毁于文夕大火，1941 年重建，牌楼、戏台与古井留存至今。臭豆腐、糖油粑粑、姊妹团子都从这里走向全国；每年庙会仍有舞龙、花鼓与祭火仪式。"},
 {id:17,name:"潮宗街",tag:"老城新生的街区",img:"img-chaozong",stars:4,hot:false,
  desc:"麻石路、老公馆与独立咖啡馆挤在一条街上。",
  detail:"潮宗街是长沙古城保存较好的历史街区之一，麻石路面、民国公馆与旧仓库连成一片。近年一批独立咖啡、买手店与小型展进驻老屋，白天是 Citywalk 的热门段，夜里门牌灯一亮又换了副面孔。老墙不拆、新店照开，是长沙「新旧叠在一起」最直观的样本。"},
 {id:18,name:"梅溪湖国际文化艺术中心",tag:"湘江西岸的曲线建筑",img:"img-meixi",stars:4,hot:false,
  desc:"扎哈留下的三朵花瓣，落在梅溪湖边。",
  detail:"梅溪湖国际文化艺术中心由扎哈·哈迪德建筑事务所设计，三座流线型单体像花瓣落在湖岸，2017 年陆续启用，含大剧院与艺术馆。夜景照明沿曲面流动，与湖面倒影连成一片；从市区乘地铁 2 号线约半小时可达，常与洋湖一带的展馆排在同一天。"}
];

var HERITAGE = [
 {name:"湘绣",img:"img-xiu",brief:"以针代笔，以线晕色",level:"国家级 · 2006",
  text:"中国四大名绣之一，讲究“平、齐、亮、细”。独创的鬅毛针专绣狮虎毛色，能在丝线上分出毛发的方向与光泽，一幅大作常需数月穿针。"},
 {name:"长沙花鼓戏",img:"img-huaguxi",brief:"从田埂唱进剧场",level:"国家级 · 2008",
  text:"由民间小调与地花鼓发展而来，唱腔活泼、念白用长沙方言。《刘海砍樵》《打铜锣》是最为外乡人熟悉的两出，锣鼓一起，台下就跟着哼。"},
 {name:"浏阳花炮制作技艺",img:"img-firework",brief:"一城烟火，照亮夜空",level:"国家级 · 2006",
  text:"浏阳是花炮之乡。一组礼花弹从裁纸、装药到组盆，手工工序有七十多道。近年流行无人机陪衬的焰火秀，老手艺换了新舞台。"},
 {name:"长沙窑铜官陶瓷烧制技艺",img:"img-tongguan",brief:"釉下多彩的起点",level:"国家级 · 2011",
  text:"唐代长沙窑首创釉下多彩，把褐、绿、红绘在釉下再高温烧成，还把诗句题在器物上。产品经“黑石号”沉船出海，是海上陶瓷之路的早期主角。"},
 {name:"火宫殿臭豆腐制作技艺",img:"img-tofu",brief:"黑得发亮，脆得作响",level:"省级非遗",
  text:"卤水以香菇、豆豉、冬笋等养出，豆腐在其中浸到通体乌黑。下锅炸至外壳起脆、内里成蜂窝，浇上辣椒油与蒜水，才是本地人认的那一口。"},
 {name:"湘剧",img:"img-xiangju",brief:"高腔一唱，满堂皆有回响",level:"国家级 · 2006",
  text:"湖南地方大戏，含高腔、低牌子、昆腔与弹腔四大声腔，其中高腔的帮腔与锣鼓最有辨识度。《琵琶记》《拜月记》是常演的传统剧目，唱念之间夹着长沙官话特有的顿挫。"},
 {name:"长沙弹词",img:"img-danci",brief:"一人一月琴，唱尽古今",level:"国家级 · 2008",
  text:"旧时艺人抱月琴走街串巷，一人分饰数角，说唱相间，用长沙方言铺陈故事。传统长篇有《岳飞传》《水浒》，短段多取材市井笑话，被称为「长沙的评弹」。"},
 {name:"浏阳菊花石雕",img:"img-juhua",brief:"两亿年前的一朵石菊",level:"国家级 · 2008",
  text:"浏阳河底出产一种含方解石结晶的灰岩，断面天然呈现菊花状白色纹理。匠人依花形走势凿去多余石料，让「花」浮出石面，一石一形，无法复制。清代已成贡品，题材从文房摆件扩展到大型屏雕。"},
 {name:"望城剪纸",img:"img-jianzhi",brief:"一剪刀的花鸟鱼虫",level:"湖南省级",
  text:"湘中民间剪纸的一支，多用于窗花、喜花与灯彩。不讲底稿，折纸后直接下剪，讲究「千剪不落、万剪不断」，对称团花与连环纹最常见，红纸一展开便是整幅吉祥图景。"},
 {name:"火宫殿庙会",img:"img-miaohui",brief:"从祭火神到一城小吃",level:"国家级 · 2008",
  text:"围绕坡子街火神庙形成的民俗集会，源于明代祭火酬神，逐渐融进舞龙、狮舞、花鼓戏、皮影与各色摊食。庙会期间庙内唱戏、庙外设摊，火宫殿臭豆腐与糖油粑粑正是在这里成了长沙味道的名片。"},
 {name:"长沙棕叶编",img:"img-zongbian",brief:"一片棕叶编出虫鱼",level:"湖南省级",
  text:"取新鲜棕叶撕成细条，不借一针一线，靠穿插与折压编出蚱蜢、蜻蜓、鱼虾与花篮。讲究趁叶未干时一气呵成，编成后叶色由青转褐，反倒更像标本。旧时是庙会上一毛钱一只的孩童玩意。"}
];

var ROUTES = [
 {title:"一日经典",img:"img-juzizhou",dur:"6—8 小时 · 步行 + 摆渡车", stops:[0,1,2,4],
  text:"橘子洲看江 → 岳麓山爱晚亭 → 岳麓书院 → 傍晚回太平老街吃小吃。第一次来长沙，这条线最省心。"},
 {title:"两日深度",img:"img-shuyuan",dur:"两天 · 河东河西各一日", stops:[5,4,7,0,1,2,6],
  text:"D1 河东：天心阁、太平街、五一广场、文和友；D2 河西：岳麓山、书院、橘子洲、杜甫江阁夜景。文化与烟火各占一半。"},
 {title:"夜游长沙",img:"img-dufu",dur:"17:00 之后 · 全程地铁", stops:[6,7,8,4],
  text:"杜甫江阁看日落 → 五一广场看灯 → 文和友取号 → 坡子街宵夜。长沙的夜生活从九点才开始热。"},
 {title:"文博半日",img:"img-museum-night",dur:"4—5 小时 · 雨天备选", stops:[3,9],
  text:"湖南博物院看马王堆（需预约，周一闭馆）→ 车行至铜官窑古镇，看窑址与陶瓷手作，适合下雨天。"},
 {title:"吃遍老城",img:"img-taiping",dur:"半天 · 边走边吃", stops:[4,8,5],
  text:"早上一碗米粉 → 太平街臭豆腐 → 坡子街糖油粑粑 → 文和友口味虾。中间留出排队时间，别把行程排满。"},
 {title:"亲子慢游",img:"img-ifs",dur:"半天 · 室内为主 · 少爬坡", stops:[3,0,7,8],
  text:"湖南博物院看马王堆 → 橘子洲坐摆渡车 → 五一广场歇脚 → 文和友吃一餐。带老人小孩时最省力的一条。"}
];

/* 观光线站点：与 SPOTS 顺序一一对应，坐标为手绘示意画布位置（非真实地理坐标） */
var RAIL_POINTS = [
 {x:105,y:360,short:"橘子洲",   note:"湘江江心洲"},
 {x:205,y:288,short:"岳麓山",   note:"爱晚亭赏枫"},
 {x:305,y:225,short:"岳麓书院", note:"千年学府"},
 {x:405,y:270,short:"湖南博物院",note:"马王堆"},
 {x:500,y:335,short:"太平老街", note:"青石板市井"},
 {x:595,y:378,short:"天心阁",   note:"古城墙"},
 {x:690,y:315,short:"杜甫江阁", note:"湘江夜灯"},
 {x:780,y:248,short:"五一广场", note:"不夜城"},
 {x:868,y:288,short:"文和友",   note:"老长沙"},
 {x:950,y:200,short:"铜官窑",   note:"唐代窑火"}
];

var FOODS = [
 {name:"臭豆腐",     emoji:"🧆", kind:"街头小吃 · 现炸", desc:"外脆内蜂窝，浇一勺蒜水辣椒油，趁烫吃。", photo:"../images/tofu.jpg"},
 {name:"口味虾",     emoji:"🦞", kind:"夜宵 · 河鲜",     desc:"紫苏与剁椒同炒，剥壳剥到手指发烫。", photo:"../images/shrimp.jpg"},
 {name:"糖油粑粑",   emoji:"🍡", kind:"甜点 · 街头",     desc:"糖汁裹着糯米，趁热咬开一层焦香。", photo:"../images/tangyou.jpg"},
 {name:"长沙米粉",   emoji:"🍜", kind:"粉面 · 过早",     desc:"扁粉盖码，酸豆角一碟，汤要喝到底。", photo:"../images/noodle.jpg"},
 {name:"剁椒鱼头",   emoji:"🐟", kind:"湘菜 · 正餐",     desc:"双色剁椒铺满，鲜辣顺着鱼脑化开。"},
 {name:"辣椒炒肉",   emoji:"🌶️", kind:"湘菜 · 家常",     desc:"螺丝椒配五花肉，一锅锅气最下饭。"},
 {name:"糖油坨坨",   emoji:"🫓", kind:"甜点 · 街头",     desc:"糖油粑粑的小个子，一口一个刚好。"},
 {name:"刮凉粉",     emoji:"🍧", kind:"小吃 · 消暑",     desc:"刮成细条，酸辣蒜水一拌就清爽。"},
 {name:"白粒丸",     emoji:"🥣", kind:"小吃 · 汤食",     desc:"米浆小丸浮在清汤里，撒把葱花。"},
 {name:"葱油粑粑",   emoji:"🥞", kind:"早点 · 现炸",     desc:"米浆拌葱花，油锅炸出满面蜂窝。"},
 {name:"捆鸡",       emoji:"🍢", kind:"卤味 · 冷盘",     desc:"豆皮卷紧卤透，切片再淋一勺香油。"},
 {name:"口味蛇",     emoji:"🐍", kind:"湘菜 · 重口",     desc:"姜辣爆炒，越啃越上头的一道硬菜。"},
 {name:"腊味合蒸",   emoji:"🍲", kind:"湘菜 · 蒸菜",     desc:"腊鱼腊肉腊鸡同蒸，油润咸香。"},
 {name:"毛氏红烧肉", emoji:"🍖", kind:"湘菜 · 正餐",     desc:"不用酱油上色，慢煨到入口即化。"},
 {name:"德园包子",   emoji:"🥟", kind:"早点 · 老字号",   desc:"老面发酵，一口咬开先吸汤汁。"},
 {name:"双燕楼馄饨", emoji:"🥟", kind:"粉面 · 老字号",   desc:"皮薄如纸，清汤能一眼见到碗底。"},
 {name:"杨裕兴面",   emoji:"🍝", kind:"粉面 · 老字号",   desc:"鸡蛋面配现炒码子，百年的老味道。"},
 {name:"和记米粉",   emoji:"🍜", kind:"粉面 · 过早",     desc:"牛肉码子盖满，起得早才吃得到。"},
 {name:"向群锅饺",   emoji:"🥟", kind:"小吃 · 现煎",     desc:"底部煎得焦脆，蘸一点醋最妙。"},
 {name:"姊妹团子",   emoji:"🍡", kind:"甜点 · 老字号",   desc:"一甜一咸成双上桌，糯米软而不粘。"},
 {name:"绿豆沙",     emoji:"🥤", kind:"饮品 · 消暑",     desc:"熬到起沙，冰镇一碗正好解辣。"},
 {name:"甜酒冲蛋",   emoji:"🍶", kind:"饮品 · 早点",     desc:"长乐甜酒冲开蛋花，微甜又暖胃。"},
 {name:"嗦螺",       emoji:"🐚", kind:"夜宵 · 河鲜",     desc:"紫苏炒螺，嗦一口汤汁才算到位。"},
 {name:"荷兰粉",     emoji:"🍜", kind:"粉面 · 老味道",   desc:"宽粉配骨头汤，老长沙才懂的叫法。"},
 {name:"猪脚",       emoji:"🍖", kind:"卤味 · 夜宵",     desc:"卤到脱骨，胶质黏嘴，配啤酒最好。"},
 {name:"卤香豆干",   emoji:"🫘", kind:"卤味 · 零嘴",     desc:"卤水浸透每一层，越嚼越香。"},
 {name:"酱板鸭",     emoji:"🦆", kind:"卤味 · 伴手礼",   desc:"风干再酱卤，撕着吃最过瘾。"},
 {name:"香辣蟹",     emoji:"🦀", kind:"夜宵 · 河鲜",     desc:"干锅爆香，连壳都舍不得丢。"},
 {name:"烤牛油",     emoji:"🥩", kind:"夜宵 · 烧烤",     desc:"一粒一口，奶香里混着孜然与辣。"},
 {name:"茶颜悦色",   emoji:"🧋", kind:"饮品 · 打卡",     desc:"幽兰拿铁，碧根果碎撒在奶盖上。"}
];
function foodPic(i){ return "../images/foods/" + String(i+1).padStart(2,"0") + ".svg"; }
function foodImage(i){ return FOODS[i].photo || foodPic(i); }

var SLIDES = [
 {img:"img-juzizhou",name:"橘子洲",sub:"湘江北去 · 洲头独立"},
 {img:"img-yuelu",name:"岳麓山 · 爱晚亭",sub:"停车坐爱枫林晚"},
 {img:"img-dufu",name:"杜甫江阁",sub:"一江灯火 · 半城倒影"},
 {img:"img-tianxin",name:"天心阁",sub:"城砖压着三百年"},
 {img:"img-tongguan",name:"铜官窑古镇",sub:"唐风 · 窑火 · 湘江"},
 {img:"img-taiping",name:"太平老街",sub:"石板路与小吃摊"}
];

/* ========== 氛围卷：氛围切片 / 六种氛围 / 时刻表 / 星城特调 ========== */
var PHOTO_WALL = [
 {pic:"night-street", cap:"霓虹街口", sub:"十点，灯才刚醒"},
 {pic:"live-laser",   cap:"音乐节",   sub:"声浪压过蝉鸣"},
 {pic:"live-gold",    cap:"舞台金光", sub:"全场一起举手"},
 {pic:"live-stage",   cap:"烟雾追光", sub:"前排的空气是热的"},
 {pic:"live-crowd",   cap:"一起喊出声", sub:"认识不认识都无所谓"},
 {pic:"night-cheers", cap:"碰一下杯", sub:"和刚坐同桌的人"},
 {pic:"night-beer",   cap:"一杯就够", sub:"话比酒长"},
 {pic:"coffee-latte", cap:"午后拉花", sub:"靠窗那个位置"},
 {pic:"cafe-sign",    cap:"巷口咖啡馆", sub:"木门后面别有洞天"},
 {pic:"boutique",     cap:"慢慢逛的店", sub:"不买也看得高兴"},
 {pic:"arcade",       cap:"下雨也能逛", sub:"玻璃顶下的街"},
 {pic:"art-mural",    cap:"一整面墙", sub:"把想象涂在墙上"},
 {pic:"craft-pottery",cap:"两手沾泥", sub:"两小时只做一只碗"},
 {pic:"craft-paint",  cap:"颜色先到", sub:"动手之前先挑色"},
 {pic:"city-dusk",    cap:"天台最后一点光", sub:"不急着回家"}
];
var VIBES = [
 {no:"01",name:"不夜街 · 解放西",meta:"河东 · 21:00 之后 · 最喧闹",photo:"night-neon",
  text:"从司门口到湘江中路，几百米的坡路挤进夜店、Livehouse 与露天大屏。长沙「不夜城」的名号大半由这里撑起：午夜过后人声仍不散，街头合唱与霓虹一起亮到天明。第一次体验长沙的夜，多半从这里开始。",
  tags:["霓虹","街头合唱","人气最旺"]},
 {no:"02",name:"声浪现场 · Livehouse",meta:"河东 / 河西 · 按演出表 · 最上头",photo:"night-party",
  text:"长沙的演出密度在全国排得上号，从解放西周边的老牌场地到洋湖一带的新型空间，民谣、摇滚、说唱与电子各有人守。票价常比一线城市友好，散场后一伙人转去宵夜摊，才算一整晚。",
  tags:["Livehouse","乐队","散场宵夜"]},
 {no:"03",name:"老巷清吧 · 化龙池",meta:"老城 · 20:00—01:00 · 最安静",photo:"night-bar",
  text:"一条不足两百米的麻石老巷，两侧是低矮老屋改成的清吧与小酒馆，门口摆几张小桌，一杯能坐半晚。想说话、想听隔壁桌聊长沙旧事，来这里比去解放西合适。",
  tags:["清吧","精酿","麻石老巷"]},
 {no:"04",name:"咖啡与慢坐",meta:"全城 · 14:00—19:00 · 最松弛",photo:"coffee-brew",
  text:"潮宗街、丰盈西里、白果园一带的老房子里藏着一批独立咖啡馆，天井、旧木窗与手冲台搭在一起。年轻人带着电脑、相机或一本没翻几页的书来，把下午坐成一段没有目的的时间。",
  tags:["独立咖啡","老宅改造","Citywalk"]},
 {no:"05",name:"展览与艺术空间",meta:"洋湖 / 谢子龙 · 白天 · 最好拍",photo:"craft-vase",
  text:"清水混凝土的长阶、白盒子展厅、临时快闪与市集，构成了长沙另一半的年轻面孔。看展常常只占一半时间，另一半留给建筑的光、水池的倒影和楼梯上排队拍照的人。",
  tags:["看展","快闪","建筑打卡"]},
 {no:"06",name:"夜色 Citywalk",meta:"湘江两岸 · 19:00 起 · 最开阔",photo:"night-tunnel",
  text:"从杜甫江阁沿江往北，过橘子洲大桥的灯，再折回潮宗街。一路是江风、楼群、桥影与路边唱歌的人。不设终点，走累了就找个台阶坐下——这是最不花钱、也最像长沙的一种氛围。",
  tags:["江风","桥影","零预算"]}
];
var NIGHT_HOURS = [
 {t:"15:00",b:"老巷咖啡",s:"天井里的一杯手冲，先把下午坐慢"},
 {t:"19:00",b:"江阁亮灯",s:"湘江边看一场日落，整座楼阁亮成金色"},
 {t:"21:00",b:"声浪起来",s:"解放西人流汇拢，或去 Livehouse 排队入场"},
 {t:"00:00",b:"街口收尾",s:"一碗米粉或一碟口味虾，给今天落个款"}
];
var COCKTAILS = [
 {name:"湘江北去",base:"金酒 · 清爽柑橘",abv:"含酒精",pic:"../images/night/01.svg",photo:"night-pour",
  flavor:"清冽、微苦、气泡细密，入口像一阵江风。",
  muse:"灵感来自「湘江北去」：一江清水向北，杯里只留干净的柑橘与苏打。",
  recipe:"金酒 45ml · 君度 15ml · 鲜青柠汁 20ml · 苏打水补满 · 青柠片与迷迭香",
  method:"高球杯加满冰，倒入金酒、君度与青柠汁轻轻提拉，苏打补满，以青柠片与拍醒的迷迭香收尾。"},
 {name:"橘子洲头",base:"伏特加 · 微苦回甘",abv:"含酒精",pic:"../images/night/02.svg",photo:"night-twins",
  flavor:"血橙的酸甜打头，尾段留一点草本微苦。",
  muse:"洲头秋来橘柚满枝，把那一抹橙红与枝叶气一起压进杯里。",
  recipe:"伏特加 45ml · 血橙汁 60ml · 干味美思 10ml · 迷迭香糖浆 5ml · 血橙片",
  method:"材料加冰摇至杯壁结霜，双重滤入冰镇碟形杯，贴一片血橙，迷迭香轻拍后置于杯口。"},
 {name:"岳麓枫晚",base:"威士忌 · 木质微甜",abv:"含酒精",pic:"../images/night/03.svg",photo:"night-oldfashion",
  flavor:"枫糖与红茶的温甜，尾韵是橙皮与橡木。",
  muse:"取「停车坐爱枫林晚」的霜叶色，把岳麓山的秋天兑成一杯慢酒。",
  recipe:"威士忌 45ml · 枫糖浆 10ml · 冷萃红茶 30ml · 安格仕苦精 2 滴 · 橙皮",
  method:"古典杯放一块大冰，依次倒入材料搅冷 20 秒，橙皮朝杯口挤油后沿杯沿抹一圈再投入。"},
 {name:"火宫殿",base:"白朗姆 · 姜辣辛香",abv:"含酒精",pic:"../images/night/04.svg",photo:"night-red",
  flavor:"姜的辛、青柠的酸、一线辣椒甜，收口带热。",
  muse:"火神庙会里的锣鼓、辣椒油与炸臭豆腐的铁锅，一起翻进铜杯。",
  recipe:"白朗姆 45ml · 姜汁 20ml · 青柠汁 15ml · 辣椒糖浆 5ml · 姜片",
  method:"材料加冰摇匀滤入装冰的铜杯，姜片拍香贴杯口；不能吃辣可把辣椒糖浆减半或省去。"},
 {name:"星城不夜",base:"龙舌兰 · 紫苏草本",abv:"含酒精",pic:"../images/night/05.svg",photo:"night-trio",
  flavor:"青柠明快，紫苏带一点清凉草本，杯口有咸边。",
  muse:"口味虾里那把紫苏，是长沙夜宵最容易被忽略的主角。",
  recipe:"龙舌兰 45ml · 紫苏糖浆 20ml · 青柠汁 20ml · 橙味利口酒 10ml · 盐边",
  method:"杯口用青柠擦一圈沾薄盐，其余材料加冰摇匀滤入，紫苏叶轻拍后浮在液面。"},
 {name:"少年橘洲",base:"无酒精 · 茉莉蜜橙",abv:"无酒精",pic:"../images/night/06.svg",photo:"night-mojito",
  flavor:"鲜橙的甜、茉莉的香、苏打的轻，清爽不腻。",
  muse:"一杯谁都能点的特调：看夜色这件事，本来就不必分年龄。",
  recipe:"鲜橙汁 90ml · 茉莉冷泡茶 60ml · 蜂蜜 10ml · 苏打水补满 · 橙片",
  method:"玻璃罐加冰，倒入橙汁、茉莉茶与蜂蜜搅匀，苏打补满，插吸管并以橙片与茉莉花点缀。"}
];

/* ========== 本地状态 ========== */
var KEY = "cswf_";
var user = null, likes = [], saves = [], spotDone = {}, foodDone = {}, diary = [];

function loadState(){
  try{
    var u = localStorage.getItem(KEY+"user");
    user = u ? JSON.parse(u) : null;
    likes = JSON.parse(localStorage.getItem(KEY+"likes") || "[]");
    saves = JSON.parse(localStorage.getItem(KEY+"saves") || "[]");
    spotDone = JSON.parse(localStorage.getItem(KEY+"spotDone") || "{}");
    foodDone = JSON.parse(localStorage.getItem(KEY+"foodDone") || "{}");
    diary = JSON.parse(localStorage.getItem(KEY+"diary") || "[]");
  }catch(e){}
}
function saveState(){
  try{
    localStorage.setItem(KEY+"user", JSON.stringify(user));
    localStorage.setItem(KEY+"likes", JSON.stringify(likes));
    localStorage.setItem(KEY+"saves", JSON.stringify(saves));
    localStorage.setItem(KEY+"spotDone", JSON.stringify(spotDone));
    localStorage.setItem(KEY+"foodDone", JSON.stringify(foodDone));
    localStorage.setItem(KEY+"diary", JSON.stringify(diary.slice(0,20)));
  }catch(e){}
}

/* ========== 小工具 ========== */
var __STUB__=document.createElement("div");
__STUB__.getTotalLength=function(){return 0;};
__STUB__.getPointAtLength=function(){return {x:0,y:0};};
__STUB__.files=[];
function $(s){var n=null;try{n=document.querySelector(s);}catch(e){}return n||__STUB__;}
function el(tag,cls,html){var n=document.createElement(tag);if(cls)n.className=cls;if(html!=null)n.innerHTML=html;return n;}
var toastTimer;
function toast(msg){
  var t=$("#toast"); t.textContent=msg; t.classList.add("on");
  clearTimeout(toastTimer); toastTimer=setTimeout(function(){t.classList.remove("on");},2200);
}
var ICON = {
  heart:'<svg viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.6-7.5-9.4a4.2 4.2 0 0 1 7.5-2.6 4.2 4.2 0 0 1 7.5 2.6c0 4.8-7.5 9.4-7.5 9.4z"/></svg>',
  mark:'<svg viewBox="0 0 24 24"><path d="M6 3h12v18l-6-4.2L6 21z"/></svg>',
  tick:'<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
};

/* ========== 轮播 ========== */
var carIdx = 0, carTimer = null;
function buildCarousel(){
  var track=$("#carTrack"), dots=$("#carDots");
  if(!track.children.length){
    SLIDES.forEach(function(s){
      var d=el("div","car-slide bg-img "+s.img);
      d.innerHTML='<div class="car-cap">'+s.name+'<span>'+s.sub+'</span></div>';
      track.appendChild(d);
    });
  }
  var ds=dots.querySelectorAll("i");
  for(var k=0;k<ds.length;k++){
    (function(idx){ ds[idx].addEventListener("click",function(){goCar(idx);}); })(k);
  }
  goCar(0);
}
function goCar(i){
  carIdx=(i+SLIDES.length)%SLIDES.length;
  $("#carTrack").style.transform="translateX(-"+carIdx*100+"%)";
  var ds=document.querySelectorAll("#carDots i");
  for(var k=0;k<ds.length;k++) ds[k].className = (k===carIdx? "on":"");
  restartCar();
}
function restartCar(){
  clearInterval(carTimer);
  carTimer=setInterval(function(){goCar(carIdx+1);},4500);
}

/* ========== 景点卡片 ========== */
function stars(n){
  var s="";
  for(var i=0;i<5;i++) s += (i<n? "★":"☆");
  return '<span class="stars">'+s+'</span>';
}
function spotCard(sp){
  var card=el("div","spot");
  var media=el("div","spot-media bg-img "+sp.img);
  media.innerHTML='<span class="spot-no">No.'+(sp.id<10?"0":"")+sp.id+'</span>'+(sp.hot?'<span class="spot-honor">热门</span>':"");
  media.addEventListener("click",function(){openModal(sp);});
  var body=el("div","spot-body");
  body.innerHTML='<h3 class="spot-name">'+sp.name+stars(sp.stars)+'</h3><p class="spot-desc">'+sp.desc+'</p>';
  var acts=el("div","spot-acts");
  var like=el("button","act"+(likes.indexOf(sp.id)>-1?" liked":""), ICON.heart+'<span>点赞</span>');
  var save=el("button","act"+(saves.indexOf(sp.id)>-1?" saved":""), ICON.mark+'<span>收藏</span>');
  like.addEventListener("click",function(e){e.stopPropagation();
    if(likes.indexOf(sp.id)>-1){likes=likes.filter(function(x){return x!==sp.id;});toast("已取消点赞");}
    else{likes.push(sp.id);toast("已点赞 · "+sp.name);}
    saveState(); renderAll();
  });
  save.addEventListener("click",function(e){e.stopPropagation();
    if(saves.indexOf(sp.id)>-1){saves=saves.filter(function(x){return x!==sp.id;});toast("已取消收藏");}
    else{saves.push(sp.id);toast("已收入收藏夹");}
    saveState(); renderAll();
  });
  acts.appendChild(like); acts.appendChild(save);
  body.appendChild(acts);
  card.appendChild(media); card.appendChild(body);
  return card;
}
function renderSpotGrid(){
  var g=$("#spotGrid"); g.innerHTML="";
  SPOTS.forEach(function(sp){g.appendChild(spotCard(sp));});
}
function renderHomeSpots(){
  var g=$("#homeSpots"); g.innerHTML="";
  SPOTS.filter(function(s){return s.hot;}).slice(0,6).forEach(function(sp){g.appendChild(spotCard(sp));});
}

/* ========== 今日缘分 ========== */
function renderLuck(){
  var sp=SPOTS[Math.floor(Math.random()*SPOTS.length)];
  $("#luckImg").className="luck-img bg-img "+sp.img;
  $("#luckName").textContent=sp.name+" · "+sp.tag;
  $("#luckDesc").textContent=sp.desc;
  $("#luckImg").onclick=function(){openModal(sp);};
}

/* ========== 详情弹窗 ========== */
function openModal(sp){
  $("#modalImg").className="modal-img bg-img "+sp.img;
  $("#modalTag").textContent="No."+(sp.id<10?"0":"")+sp.id+" / "+sp.tag;
  $("#modalName").textContent=sp.name;
  $("#modalText").textContent=sp.detail;
  $("#modal").classList.add("on");
}

/* ========== 非遗 ========== */
function renderHeritage(){
  var box=$("#accList"); box.innerHTML="";
  HERITAGE.forEach(function(h,i){
    var item=el("div","acc-item"+(i===0?" open":""));
    var head=el("button","acc-head");
    head.innerHTML='<div class="acc-thumb bg-img '+h.img+'"></div>'+
      '<div class="acc-t"><h3>'+h.name+'</h3><p>'+h.brief+'</p></div><span class="acc-plus">+</span>';
    var body=el("div","acc-body");
    body.innerHTML='<div class="acc-body-in">'+h.text+'<div class="acc-meta"><span>'+h.level+'</span><span>长沙</span></div></div>';
    head.addEventListener("click",function(){
      var open=item.classList.contains("open");
      var all=document.querySelectorAll(".acc-item");
      for(var k=0;k<all.length;k++) all[k].classList.remove("open");
      if(!open) item.classList.add("open");
    });
    item.appendChild(head); item.appendChild(body);
    box.appendChild(item);
  });
}

/* ========== 氛围卷：照片墙 / 六种氛围 / 时刻表 / 特调 ========== */
function renderPhotoWall(){
  var g=$("#photoWall"); if(!g) return;
  g.innerHTML=PHOTO_WALL.map(function(p,i){
    return '<figure class="pw-item"><img src="../images/photos/'+p.pic+'.jpg" alt="'+p.cap+'实景照片" loading="lazy">'+
      '<figcaption><b>'+p.cap+'</b><span>'+p.sub+'</span></figcaption>'+
      '<em>'+(i<9?"0":"")+(i+1)+'</em></figure>';
  }).join("");
}
function renderBars(){
  var g=$("#barList"); if(!g) return;
  g.innerHTML=VIBES.map(function(b){
    return '<article class="bar-card"><div class="bar-photo"><img src="../images/photos/'+b.photo+'.jpg" alt="'+b.name+'实景照片" loading="lazy"></div>'+
      '<span class="bar-no">'+b.no+' / VIBE SPOT</span>'+
      '<h4>'+b.name+'</h4><div class="bar-meta">'+b.meta+'</div><p>'+b.text+'</p>'+
      '<div class="bar-tags">'+b.tags.map(function(t){return '<span>'+t+'</span>';}).join("")+'</div></article>';
  }).join("");
}
function renderNightRail(){
  var g=$("#nightRail"); if(!g) return;
  g.innerHTML=NIGHT_HOURS.map(function(h){
    return '<div class="night-stop"><div class="night-dot"></div><div class="night-time">'+h.t+
      '</div><b>'+h.b+'</b><span>'+h.s+'</span></div>';
  }).join("");
}
function renderCocktails(){
  var g=$("#cockList"); if(!g) return;
  g.innerHTML=COCKTAILS.map(function(k,i){
    return '<article class="cock-card" data-idx="'+i+'" tabindex="0" role="button" aria-expanded="false">'+
      '<div class="cock-photo"><img src="../images/photos/'+k.photo+'.jpg" alt="'+k.name+'特调实景照片" loading="lazy">'+
      '<img class="cock-stamp" src="'+k.pic+'" alt=""><span class="cock-no">No.'+(i<9?"0":"")+(i+1)+'</span></div>'+
      '<div class="cock-head"><div class="cock-tt"><div class="cock-name">'+k.name+'</div>'+
      '<div class="cock-sub">'+k.base+'</div></div><span class="cock-abv">'+k.abv+'</span></div>'+
      '<div class="cock-body"><p class="cock-flavor"><b>风味 · </b>'+k.flavor+'</p>'+
      '<p class="cock-muse">'+k.muse+'</p>'+
      '<div class="cock-recipe"><div class="cock-recipe-in"><h6>配方 / RECIPE</h6><p>'+k.recipe+'</p>'+
      '<h6 style="margin-top:8px">做法 / METHOD</h6><p>'+k.method+'</p></div></div>'+
      '<div class="cock-more">▸ 展开配方与做法</div></div></article>';
  }).join("");
  g.onclick=function(e){var c=railClosest(e,"cock-card");if(c)toggleCocktail(c);};
  g.onkeydown=function(e){
    if(e.key!=="Enter" && e.key!==" ") return;
    var c=railClosest(e,"cock-card");
    if(c){e.preventDefault();toggleCocktail(c);}
  };
}
function toggleCocktail(c,forceOpen){
  var all=document.querySelectorAll(".cock-card"), wasOn=c.classList.contains("on");
  for(var i=0;i<all.length;i++){
    all[i].classList.remove("on"); all[i].setAttribute("aria-expanded","false");
    var m=all[i].querySelector(".cock-more"); if(m) m.textContent="▸ 展开配方与做法";
  }
  if(!wasOn || forceOpen){
    c.classList.add("on"); c.setAttribute("aria-expanded","true");
    var t=c.querySelector(".cock-more"); if(t) t.textContent="▾ 收起配方";
  }
}
var shakeTimer=null;
function shakeDrink(){
  var box=$("#shakeResult"); if(!box) return;
  var img=$("#shakeImg"), name=$("#shakeName"), desc=$("#shakeDesc");
  box.classList.add("on","shaking");
  if(shakeTimer){clearInterval(shakeTimer);shakeTimer=null;}
  var n=0;
  shakeTimer=setInterval(function(){
    var k=COCKTAILS[Math.floor(Math.random()*COCKTAILS.length)];
    img.src="../images/photos/"+k.photo+".jpg"; name.textContent=k.name; desc.textContent="摇杯中 · 让签筒替你决定…";
    if(++n>7){
      clearInterval(shakeTimer); shakeTimer=null;
      box.classList.remove("shaking");
      var idx=Math.floor(Math.random()*COCKTAILS.length), pick=COCKTAILS[idx];
      img.src="../images/photos/"+pick.photo+".jpg"; img.alt=pick.name+" 特调实景照片";
      name.textContent=pick.name+" · "+pick.base;
      desc.textContent=pick.flavor+" "+pick.muse+"（"+pick.abv+"）";
      var cards=document.querySelectorAll(".cock-card");
      for(var i=0;i<cards.length;i++){
        if(Number(cards[i].getAttribute("data-idx"))===idx){toggleCocktail(cards[i],true);break;}
      }
      toast("今晚这杯 · "+pick.name);
    }
  },110);
}
/* 湘绣纹样开关：状态仅存本机，刷新保留 */
function initXiuToggle(){
  var btn=$("#xiuToggle"), txt=$("#xiuToggleText"); if(!btn) return;
  var off=false;
  try{ off=localStorage.getItem(KEY+"xiuOff")==="1"; }catch(e){}
  function apply(){
    document.body.classList.toggle("no-xiu",off);
    btn.setAttribute("aria-pressed",off?"false":"true");
    if(txt) txt.textContent=off?"绣纹 · 关":"绣纹 · 开";
  }
  apply();
  btn.addEventListener("click",function(){
    off=!off;
    try{ localStorage.setItem(KEY+"xiuOff",off?"1":"0"); }catch(e){}
    apply(); toast(off?"已收起湘绣纹样":"已铺上湘绣纹样");
  });
}

/* ========== 攻略：行程卡片 ========== */
function renderRoutes(){
  var box=$("#routeList"); box.innerHTML="";
  ROUTES.forEach(function(r){
    var row=el("div","route");
    var chips=(r.stops||[]).map(function(i){
      return '<button class="route-stop" data-idx="'+i+'" title="让小火车开往'+RAIL_POINTS[i].short+'">🚂 '+RAIL_POINTS[i].short+'</button>';
    }).join("");
    row.innerHTML='<div class="route-img bg-img '+r.img+'"></div><div class="route-body"><h3>'+r.title+
      '</h3><p>'+r.text+'</p><span class="dur">'+r.dur+'</span>'+
      (chips?'<div class="route-stops">'+chips+'</div>':'')+'</div>';
    box.appendChild(row);
  });
  box.onclick=function(e){
    var b=railClosest(e,"route-stop");
    if(b) focusRailStop(Number(b.getAttribute("data-idx")));
  };
}

/* ========== 攻略：行前清单（勾选状态仅存本机） ========== */
function renderPack(){
  var box=$("#packList"); if(!box) return;
  var items=box.querySelectorAll(".pack-item"), total=items.length, done={};
  try{ done=JSON.parse(localStorage.getItem(KEY+"pack")||"{}"); }catch(e){}
  function paint(){
    var n=0;
    for(var i=0;i<items.length;i++){
      var on=!!done[i];
      items[i].classList.toggle("on",on);
      items[i].setAttribute("aria-pressed",on?"true":"false");
      if(on) n++;
    }
    var t=$("#packText"); if(t) t.textContent="已备 "+n+" / "+total;
    var bar=$("#packBar"); if(bar) bar.style.width=(n/total*100)+"%";
  }
  box.onclick=function(e){
    var b=railClosest(e,"pack-item"); if(!b) return;
    var i=Number(b.getAttribute("data-pack"));
    if(done[i]) delete done[i]; else done[i]=1;
    try{ localStorage.setItem(KEY+"pack",JSON.stringify(done)); }catch(err){}
    paint();
  };
  paint();
}

/* ========== 攻略：星城观光线 · 小火车手绘示意地图 ========== */
var railReady=false, railTotal=0, railTrainT=0, railAnim=null;
var railTourOn=false, railTourTimer=null, railCur=0;

function railClosest(e,cls){
  return (e.target && e.target.closest) ? e.target.closest("."+cls) : null;
}
/* Catmull-Rom 转三次贝塞尔：曲线精确穿过每个站点 */
function smoothRailPath(pts){
  var d="M "+pts[0].x+" "+pts[0].y;
  for(var i=0;i<pts.length-1;i++){
    var p0=pts[i-1]||pts[i], p1=pts[i], p2=pts[i+1], p3=pts[i+2]||p2;
    var c1x=p1.x+(p2.x-p0.x)/6, c1y=p1.y+(p2.y-p0.y)/6;
    var c2x=p2.x-(p3.x-p1.x)/6, c2y=p2.y-(p3.y-p1.y)/6;
    d+=" C "+c1x.toFixed(2)+" "+c1y.toFixed(2)+" "+c2x.toFixed(2)+" "+c2y.toFixed(2)+" "+p2.x+" "+p2.y;
  }
  return d;
}
function initRailMap(){
  if(railReady) return;
  var track=$("#railTrack");
  if(!track) return;
  var d=smoothRailPath(RAIL_POINTS);
  ["railTrackBed","railTrackTies","railTrackLine","railTrackProgress","railTrack"].forEach(function(id){
    var n=document.getElementById(id); if(n) n.setAttribute("d",d);
  });
  railTotal=track.getTotalLength();
  if(!railTotal) return;   /* 页面隐藏时几何可能不可用，切到攻略页会重试 */
  railReady=true;

  var prog=$("#railTrackProgress");
  prog.style.strokeDasharray=railTotal+" "+railTotal;
  prog.style.strokeDashoffset=railTotal;

  /* 一次性采样，找出每个站点在路径上的弧长位置 */
  var samples=[];
  for(var k=0;k<=900;k++){
    var t=railTotal*k/900, pt=track.getPointAtLength(t);
    samples.push({t:t,x:pt.x,y:pt.y});
  }
  RAIL_POINTS.forEach(function(p){
    var best=0,bd=Infinity;
    for(var i=0;i<samples.length;i++){
      var dx=samples[i].x-p.x, dy=samples[i].y-p.y, dd=dx*dx+dy*dy;
      if(dd<bd){bd=dd;best=samples[i].t;}
    }
    p.t=best;
  });

  /* 绘制站点（标签上下交错，避免互相压字） */
  $("#railStations").innerHTML=RAIL_POINTS.map(function(p,i){
    var up=(i%2===0), y1=up?-60:44, y2=up?-44:60, l1=up?-16:16, l2=up?-34:34;
    return '<g class="rail-stop'+(i===0?" active":"")+'" data-idx="'+i+'" transform="translate('+p.x+','+p.y+')" tabindex="0" role="button" aria-label="第 '+(i+1)+' 站 '+p.short+'">'+
      '<g class="rail-station"><circle class="station-ring" r="21"/><circle class="station-dot" r="12"/>'+
      '<text class="station-num" y="4" text-anchor="middle">'+(i+1)+'</text></g>'+
      '<line class="station-leader" x1="0" y1="'+l1+'" x2="0" y2="'+l2+'"/>'+
      '<text class="station-name" x="0" y="'+y1+'" text-anchor="middle">'+p.short+'</text>'+
      '<text class="station-note" x="0" y="'+y2+'" text-anchor="middle">'+p.note+'</text>'+
      '<circle class="station-hit" r="34"/></g>';
  }).join("");

  $("#railStops").innerHTML=RAIL_POINTS.map(function(p,i){
    return '<button class="rail-chip'+(i===0?" active":"")+'" data-idx="'+i+'"><b>'+(i<9?"0":"")+(i+1)+'</b>'+p.short+'</button>';
  }).join("");

  var stationLayer=$("#railStations");
  stationLayer.addEventListener("click",function(e){
    var n=railClosest(e,"rail-stop");
    if(n){stopRailTour();selectRailStop(Number(n.getAttribute("data-idx")),true);}
  });
  stationLayer.addEventListener("keydown",function(e){
    if(e.key!=="Enter" && e.key!==" ") return;
    var n=railClosest(e,"rail-stop");
    if(n){e.preventDefault();stopRailTour();selectRailStop(Number(n.getAttribute("data-idx")),true);}
  });
  $("#railStops").addEventListener("click",function(e){
    var b=railClosest(e,"rail-chip");
    if(b){stopRailTour();selectRailStop(Number(b.getAttribute("data-idx")),true);}
  });
  $("#railPrevBtn").addEventListener("click",function(){
    stopRailTour();selectRailStop((railCur-1+RAIL_POINTS.length)%RAIL_POINTS.length,true);
  });
  $("#railNextBtn").addEventListener("click",function(){
    stopRailTour();selectRailStop((railCur+1)%RAIL_POINTS.length,true);
  });
  $("#railTourBtn").addEventListener("click",toggleRailTour);
  $("#railDetailBtn").addEventListener("click",function(){openModal(SPOTS[railCur]);});

  /* 小火车置于站点下层：到站时站点放大、金晕与站名仍完整可见 */
  var stLayer=$("#railStations"), trNode=$("#railTrain");
  if(stLayer && trNode && stLayer.parentNode) stLayer.parentNode.insertBefore(trNode,stLayer);

  selectRailStop(0,false);
}

/* 火车沿轨道取点，车头随切线轻微倾斜；同时推进金色已行段 */
function placeRailTrain(t){
  var track=$("#railTrack");
  var a=Math.max(0,Math.min(railTotal,t)), b=Math.max(0,Math.min(railTotal,t+4));
  var p=track.getPointAtLength(a), q=track.getPointAtLength(b);
  var ang=Math.atan2(q.y-p.y,q.x-p.x)*180/Math.PI;
  if(ang>16)ang=16; if(ang<-16)ang=-16;
  $("#railTrain").setAttribute("transform","translate("+p.x.toFixed(2)+" "+(p.y-15).toFixed(2)+") rotate("+ang.toFixed(2)+") scale(.85)");
  $("#railTrackProgress").style.strokeDashoffset=(railTotal-a);
}
function moveRailTrain(to){
  if(railAnim) clearTimeout(railAnim);
  var from=railTrainT, dist=Math.abs(to-from);
  if(dist<1){ $("#railEta").textContent="· 已到站"; return; }
  var dur=Math.max(650,Math.min(1900,dist/railTotal*2800+380));
  var frames=Math.max(1,Math.round(dur/16)), step=0;
  var train=$("#railTrain");
  train.classList.add("moving");
  $("#railEta").textContent="· 行驶中";
  /* 用定时器逐帧取路径点：曲线运动无法用 CSS 过渡表达，定时器在后台/无头环境同样可靠 */
  function frame(){
    step++;
    var k=Math.min(1,step/frames);
    var e=k<.5 ? 4*k*k*k : 1-Math.pow(-2*k+2,3)/2;
    railTrainT=from+(to-from)*e;
    placeRailTrain(railTrainT);
    if(k<1){ railAnim=setTimeout(frame,16); }
    else{
      railAnim=null; railTrainT=to; placeRailTrain(to);
      train.classList.remove("moving");
      $("#railEta").textContent="· 已到站 · "+RAIL_POINTS[railCur].short;
      if(!railTourOn) toast("🚂 小火车抵达「"+SPOTS[railCur].name+"」");
    }
  }
  railAnim=setTimeout(frame,16);
}
function selectRailStop(idx,animate){
  if(!railReady) initRailMap();
  if(!railReady) return;
  idx=(idx+RAIL_POINTS.length)%RAIL_POINTS.length;
  railCur=idx;
  var stops=document.querySelectorAll("#railStations .rail-stop");
  for(var i=0;i<stops.length;i++) stops[i].classList.toggle("active",i===idx);
  var chips=document.querySelectorAll("#railStops .rail-chip");
  for(var j=0;j<chips.length;j++) chips[j].classList.toggle("active",j===idx);
  var sp=SPOTS[idx];
  $("#railInfoNo").textContent=(idx<9?"0":"")+(idx+1);
  $("#railInfoName").textContent=sp.name;
  $("#railInfoDesc").textContent=sp.desc;
  $("#railInfoMeta").innerHTML='<span>'+sp.tag+'</span><span>'+new Array(sp.stars+1).join("★")+'</span><span>观光线第 '+(idx+1)+' 站</span>';
  $("#railNow").textContent="第 "+(idx+1)+" 站 / 共 "+RAIL_POINTS.length+" 站";
  var hint=$("#railHint"); if(hint) hint.classList.add("gone");
  if(animate) moveRailTrain(RAIL_POINTS[idx].t);
  else{ railTrainT=RAIL_POINTS[idx].t; placeRailTrain(railTrainT); $("#railEta").textContent="· 停靠中"; }
}
function stopRailTour(){
  railTourOn=false;
  if(railTourTimer){clearTimeout(railTourTimer);railTourTimer=null;}
  var b=$("#railTourBtn");
  if(b){b.classList.remove("touring");b.textContent="🚂 环线巡游";}
}
function toggleRailTour(){
  if(railTourOn){ stopRailTour(); toast("环线巡游已暂停"); return; }
  railTourOn=true;
  var b=$("#railTourBtn"); b.classList.add("touring"); b.textContent="⏸ 暂停巡游";
  var i=(railCur+1)%RAIL_POINTS.length, count=0;
  function step(){
    if(!railTourOn) return;
    selectRailStop(i,true);
    count++;
    if(count>=RAIL_POINTS.length){
      railTourTimer=setTimeout(function(){
        if(railTourOn){ stopRailTour(); toast("🚂 环线巡游完成，山水洲城欢迎再来！"); }
      },1900);
      return;
    }
    i=(i+1)%RAIL_POINTS.length;
    railTourTimer=setTimeout(step,1750);
  }
  step();
}
/* 行程卡片里的「🚂 站点」快捷跳转 */
function focusRailStop(idx){
  if(!railReady) initRailMap();
  selectRailStop(idx,true);
  var m=$("#railmap");
  if(m && m.scrollIntoView) m.scrollIntoView({behavior:"smooth",block:"start"});
}

/* ========== 打卡 ========== */
function renderCheck(){
  var sc=$("#spotCheck"), fc=$("#foodCheck");
  sc.innerHTML=""; fc.innerHTML="";
  var doneS=0;
  SPOTS.forEach(function(sp){
    var on=!!spotDone[sp.id]; if(on) doneS++;
    var row=el("div","check-row"+(on?" done":""));
    row.innerHTML='<span class="box">'+ICON.tick+'</span><span class="nm">'+sp.name+'</span><span class="st">'+(on?"已打卡":"未打卡")+'</span>';
    row.addEventListener("click",function(){
      if(spotDone[sp.id]) delete spotDone[sp.id]; else spotDone[sp.id]=1;
      saveState(); renderCheck(); renderMeStats();
    });
    sc.appendChild(row);
  });
  var doneF=0;
  FOODS.forEach(function(f,i){
    var on=!!foodDone[i]; if(on) doneF++;
    var row=el("div","check-row"+(on?" done":""));
    row.innerHTML='<span class="box">'+ICON.tick+'</span><span class="nm">'+f.name+'</span><span class="st">'+(on?"已吃过":"未吃")+'</span>';
    row.addEventListener("click",function(){
      if(foodDone[i]) delete foodDone[i]; else foodDone[i]=1;
      saveState(); renderCheck(); renderMeStats();
    });
    fc.appendChild(row);
  });
  var sp=$("#spotBar"), fb=$("#foodBar");
  sp.style.width=(doneS/SPOTS.length*100)+"%";
  fb.style.width=(doneF/FOODS.length*100)+"%";
  $("#spotStat").textContent=doneS+" / "+SPOTS.length;
  $("#foodStat").textContent=doneF+" / "+FOODS.length;
}

/* ========== 美食签筒：开奖卡 ========== */
var drawIdx=-1, drawBusy=false, drawTimer=null;
function renderFoods(){
  var g=$("#foodGrid"); g.innerHTML="";
  FOODS.forEach(function(f,idx){
    var c=el("button","food-cell", '<span class="ico">'+f.emoji+'</span><span>'+f.name+'</span>');
    c.addEventListener("click",function(){showPick(idx,false);});
    g.appendChild(c);
  });
}
/* 把某一味填进开奖卡：对应图片 + 名字 + 编号 + 介绍 */
function renderDraw(idx){
  drawIdx=idx;
  var f=FOODS[idx], box=$("#foodDraw");
  $("#drawImg").src=foodImage(idx);
  $("#drawImg").alt=f.name+" · 星城食签";
  $("#drawBadge").textContent="第 "+String(idx+1).padStart(2,"0")+" 签";
  $("#drawName").textContent=f.name;
  $("#drawKind").textContent=f.kind;
  $("#drawDesc").textContent=f.desc;
  $("#drawTip").textContent=f.photo
    ? "📷 实拍 · 去坡子街、太平街一带找找它 🏮"
    : "🎋 手绘食签 · 去坡子街、太平街一带找找它 🏮";
  var ck=$("#drawCheck");
  ck.textContent=foodDone[idx] ? "✓ 已打卡" : "✓ 记一笔打卡";
  ck.classList.toggle("checked",!!foodDone[idx]);
  box.classList.add("on");
  var cells=document.querySelectorAll(".food-cell");
  for(var i=0;i<cells.length;i++) cells[i].classList.toggle("on",i===idx);
}
function scrollDraw(){
  var box=$("#foodDraw");
  if(box && box.scrollIntoView) box.scrollIntoView({behavior:"smooth",block:"center"});
}
/* animate=true 时先摇签快速换图，再定格到结果并滚动过去 */
function showPick(idx,animate){
  if(drawBusy) return;
  var box=$("#foodDraw"), btn=$("#pickBtn"), hint=$("#pickResult");
  if(!animate){
    renderDraw(idx);
    hint.style.display="none";
    scrollDraw();
    toast("已选中："+FOODS[idx].name+"　"+FOODS[idx].kind);
    return;
  }
  drawBusy=true;
  btn.disabled=true; btn.textContent="🎲 摇签中…";
  hint.style.display="inline-block";
  hint.textContent="🎋 签筒摇晃中，湘江的风正在挑…";
  box.classList.add("on","shuffling");
  var steps=0, total=11;
  var tick=function(){
    var r=Math.floor(Math.random()*FOODS.length), rf=FOODS[r];
    $("#drawImg").src=foodImage(r);
    $("#drawImg").alt=rf.name;
    $("#drawBadge").textContent="第 "+String(r+1).padStart(2,"0")+" 签";
    $("#drawName").textContent=rf.name;
    $("#drawKind").textContent=rf.kind;
    steps++;
    if(steps<total){ drawTimer=setTimeout(tick,85); }
    else{
      box.classList.remove("shuffling");
      renderDraw(idx);
      hint.style.display="none";
      btn.disabled=false; btn.textContent="🎲 再抽一次 · 换个口味";
      drawBusy=false;
      scrollDraw();
      toast("今日食运 · "+FOODS[idx].name+"　"+FOODS[idx].kind);
    }
  };
  tick();
}
function randomDraw(){
  showPick(Math.floor(Math.random()*FOODS.length),true);
}
$("#loginSkip").addEventListener("click",function(){
  $("#login").classList.add("hide");
  showPage("home");
  toast("不登录也能逛，数据只存在本机");
});

/* ========== 我的 ========== */
function renderMe(){
  var av=$("#meAvatar");
  if(user && user.avatar){
    av.className="avatar bg-img";
    av.textContent="";
    av.style.backgroundImage='url("'+user.avatar+'")';
  }else{
    av.className="avatar";
    av.style.backgroundImage="none";
    av.style.background="linear-gradient(135deg,#C3272B,#8E1C1C)";
    av.textContent = user ? user.name.slice(0,1) : "客";
  }
  if(user){
    $("#meName").textContent=user.name;
    $("#meMeta").textContent=(user.gender||"保密")+" · "+user.phone+" · 来自"+user.province;
  }else{
    $("#meName").textContent="未登录";
    $("#meMeta").textContent="登录后记录点赞、收藏与打卡";
  }
  renderMeStats();
  renderDiary();
}
function renderMeStats(){
  $("#statLike").textContent=likes.length;
  $("#statSave").textContent=saves.length;
  $("#statCheck").textContent=Object.keys(spotDone).length;
}
function renderDiary(){
  var box=$("#diaryList"); box.innerHTML="";
  if(!diary.length){
    box.innerHTML='<p style="font-size:13px;color:#6C6057;">还没有日记。写下第一段，就留在这台机器上。</p>';
    return;
  }
  diary.forEach(function(d){
    var item=el("div","diary-item");
    var pics=(d.pics||[]).map(function(src){return '<img src="'+src+'" alt="旅途照片">';}).join("");
    item.innerHTML='<p>'+(d.text||"")+'</p>'+(pics?'<div class="pics">'+pics+'</div>':"")+'<small>'+d.time+'</small>';
    box.appendChild(item);
  });
}

/* ========== 登录与头像 ========== */
var pendingAvatar=null;
function buildProvinces(){
  var sel=$("#fProvince");
  PROVINCES.forEach(function(p){
    var o=document.createElement("option"); o.value=p; o.textContent=p; sel.appendChild(o);
  });
  sel.value="湖南";
}
$("#avaPreview").addEventListener("click",function(){$("#avaFile").click();});
$("#avaFile").addEventListener("change",function(e){
  var f=e.target.files[0]; if(!f) return;
  var r=new FileReader();
  r.onload=function(ev){
    pendingAvatar=ev.target.result;
    $("#avaPreview").style.backgroundImage='url("'+pendingAvatar+'")';
    $("#avaPreview").style.backgroundSize="cover";
  };
  r.readAsDataURL(f);
});
$("#loginGo").addEventListener("click",function(){
  var name=$("#fName").value.trim();
  var phone=$("#fPhone").value.trim();
  if(!name){toast("请填写姓名");return;}
  if(!/^1\d{10}$/.test(phone)){toast("请填写 11 位手机号");return;}
  user={name:name,gender:$("#fGender").value,phone:phone,province:$("#fProvince").value,avatar:pendingAvatar||""};
  saveState();
  $("#login").classList.add("hide");
  showPage("home");
  toast("欢迎来到长沙，"+name);
});

/* ========== 本机数据：退出登录 / 清空 ========== */
function clearLocalData(onlyUser){
  try{
    var keys=[];
    for(var i=0;i<localStorage.length;i++){
      var k=localStorage.key(i);
      if(k && k.indexOf(KEY)===0 && (!onlyUser || k===KEY+"user")) keys.push(k);
    }
    keys.forEach(function(k){ localStorage.removeItem(k); });
  }catch(e){}
  toast(onlyUser ? "已退出登录，其余记录仍留在本机" : "本机数据已清空，即将回到封面");
  setTimeout(function(){ location.reload(); }, 800);
}
$("#logoutBtn").addEventListener("click",function(){ clearLocalData(true); });
$("#clearDataBtn").addEventListener("click",function(){
  if(window.confirm("确定清空本机保存的登录资料、点赞、收藏、打卡、清单与日记吗？此操作不可撤销，但不会改动网页文件。")) clearLocalData(false);
});

/* ========== 页面切换 ========== */
var FOOTER_VOLUMES={
  home:"卷一 · 山水洲城", spots:"卷二 · 十八处必到", heritage:"卷三 · 指尖上的长沙",
  routes:"卷四 · 行程建议", check:"卷五 · 打卡清单", food:"美食签 · 30 味星城",
  night:"氛围卷 · 年轻人的氛围世界",
  me:"卷六 · 我的星城",
  outfit:"卷七 · 星城四季穿搭", stay:"卷八 · 住在星城"
};
var PAGE_FILE={home:"index.html",spots:"spots.html",heritage:"heritage.html",routes:"routes.html",check:"check.html",food:"food.html",night:"night.html",outfit:"outfit.html",stay:"stay.html",me:"me.html"};
function showPage(id,keepScroll){
  if(!PAGE_FILE[id]) id="home";
  if(window.__CURRENT__ && id!==window.__CURRENT__){
    location.href=PAGE_FILE[id]; return;
  }
  var pages=document.querySelectorAll(".page");
  for(var i=0;i<pages.length;i++) pages[i].classList.remove("on");
  var p=document.getElementById("page-"+id); if(p) p.classList.add("on");
  var fc=$("#footerCurrent"); if(fc) fc.textContent=FOOTER_VOLUMES[id]||"长沙 · 星城风物志";
  var fl=document.querySelectorAll(".footer-links a");
  for(var m=0;m<fl.length;m++) fl[m].classList.toggle("on",fl[m].getAttribute("data-page")===id);
  if(id==="routes") initRailMap();
  if(!keepScroll) window.scrollTo({top:0,behavior:"smooth"});
}
function bindNav(){
  var navs=document.querySelectorAll(".nav-item");
  for(var i=0;i<navs.length;i++){
    navs[i].addEventListener("click",function(){
      showPage(this.getAttribute("data-page"));
    });
  }
  var jumps=document.querySelectorAll("[data-page]");
  for(var k=0;k<jumps.length;k++){
    if(jumps[k].classList.contains("nav-item")) continue;
    jumps[k].addEventListener("click",function(){showPage(this.getAttribute("data-page"));});
  }
}

/* ========== 日记发布 ========== */
$("#postBtn").addEventListener("click",function(){
  var text=$("#diaryText").value.trim();
  var files=$("#diaryFile").files;
  if(!text && (!files || !files.length)){toast("先写点什么，或选一张照片");return;}
  if(!user){toast("请先在封面登录，才能留下日记");$("#login").classList.remove("hide");return;}
  var chosen=Array.prototype.slice.call(files||[]).slice(0,3);
  Promise.all(chosen.map(function(f){
    return new Promise(function(res){
      var r=new FileReader();
      r.onload=function(e){res(e.target.result);};
      r.onerror=function(){res("");};
      r.readAsDataURL(f);
    });
  })).then(function(pics){
    diary.unshift({text:text,pics:pics.filter(Boolean),time:new Date().toLocaleString("zh-CN")});
    saveState(); renderMeStats(); renderDiary();
    $("#diaryText").value=""; $("#diaryFile").value="";
    toast("日记已留在此机");
  });
});

/* ========== 封面与入口 ========== */
$("#enterBtn").addEventListener("click",function(){
  $("#cover").classList.add("hide");
  if(user){showPage("home"); toast("欢迎回来，"+user.name);}
  else{ $("#login").classList.remove("hide"); }
});
function backCover(){ $("#cover").classList.remove("hide"); }
["#backCover1","#backCover2","#backCover3","#backCover4","#backCover5","#backCover6","#backCover7","#backCover9"].forEach(function(sel){
  var b=$(sel); if(b) b.addEventListener("click",backCover);
});

/* ========== 攻略扩展：本卷速览 / 时辰表 / 街巷表 / 方言卡 / 卷末图带 ========== */
function guideJump(id){
  var t=document.getElementById(id);
  if(t && t.scrollIntoView) t.scrollIntoView({behavior:"smooth",block:"start"});
}
function bindGuideExtras(){
  /* 本卷速览：页内定位 + 当前项高亮 */
  var idx=$("#guideIndex");
  if(idx) idx.onclick=function(e){
    var b=railClosest(e,"guide-jump"); if(!b) return;
    var all=idx.querySelectorAll(".guide-jump");
    for(var i=0;i<all.length;i++) all[i].classList.remove("on");
    b.classList.add("on");
    guideJump(b.getAttribute("data-jump"));
  };
  /* 卷末图带等处的通用跳转按钮 */
  var jumps=document.querySelectorAll("[data-jump]:not(.guide-jump)");
  for(var j=0;j<jumps.length;j++){
    jumps[j].addEventListener("click",function(){guideJump(this.getAttribute("data-jump"));});
  }
  /* 十二时辰 / 街巷速览：点站名让小火车开过去 */
  var hours=$("#hoursRail");
  if(hours) hours.onclick=function(e){
    var b=railClosest(e,"hour-stop");
    if(b) focusRailStop(Number(b.getAttribute("data-idx")));
  };
  var lanes=$("#laneTable");
  if(lanes) lanes.onclick=function(e){
    var b=railClosest(e,"lane-go");
    if(b) focusRailStop(Number(b.getAttribute("data-idx")));
  };
  /* 长沙话小词典：点过记住，状态仅存本机 */
  var dial=$("#dialectList");
  if(dial){
    var learn={};
    try{ learn=JSON.parse(localStorage.getItem(KEY+"dialect")||"{}"); }catch(err){}
    var items=dial.querySelectorAll(".dialect-item");
    function paintDialect(){
      var n=0;
      for(var i=0;i<items.length;i++){
        var on=!!learn[i];
        items[i].classList.toggle("on",on);
        items[i].setAttribute("aria-pressed",on?"true":"false");
        if(on) n++;
      }
      var c=$("#dialectCount"); if(c) c.textContent="学会 "+n+" / "+items.length;
    }
    dial.onclick=function(e){
      var b=railClosest(e,"dialect-item"); if(!b) return;
      var i=Number(b.getAttribute("data-word"));
      if(learn[i]) delete learn[i]; else learn[i]=1;
      try{ localStorage.setItem(KEY+"dialect",JSON.stringify(learn)); }catch(err){}
      paintDialect();
    };
    paintDialect();
  }
  /* 卷末：一键开启环线巡游并回到地图 */
  var bt=$("#bannerTour");
  if(bt) bt.addEventListener("click",function(){
    var r=$("#railTourBtn"); if(r) r.click();
    guideJump("railmap");
  });
}
/* 支持从根目录入口直接跳进某一卷，例如 html/index.html#routes */
function handleHash(){
  var h=(location.hash||"").replace(/^#/,"");
  if(!h) return false;
  var known=["home","spots","heritage","routes","check","food","night","me","outfit","stay"];
  if(known.indexOf(h)<0) return false;
  $("#cover").classList.add("hide");
  var lg=$("#login"); if(lg) lg.classList.add("hide");
  showPage(h,true);
  return true;
}

/* ========== 渲染全部 ========== */
function renderAll(){
  renderSpotGrid();
  renderHomeSpots();
  renderCheck();
  renderMeStats();
}
function init(){
  loadState();
  buildProvinces();
  buildCarousel();
  renderSpotGrid();
  renderHomeSpots();
  renderLuck();
  renderHeritage();
  renderRoutes();
  renderPack();
  renderCheck();
  renderFoods();
  renderMe();
  renderPhotoWall();
  renderBars();
  renderNightRail();
  renderCocktails();
  initXiuToggle();
  bindNav();
  /* 全站页脚：动态年份、回顶部、回封面（快速入口由 bindNav 统一绑定） */
  var fy=$("#footerYear"); if(fy) fy.textContent=new Date().getFullYear();
  $("#footerToTop").addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"});});
  $("#footerToCover").addEventListener("click",backCover);
  $("#luckAgain").addEventListener("click",renderLuck);
  $("#carPrev").addEventListener("click",function(){goCar(carIdx-1);});
  $("#carNext").addEventListener("click",function(){goCar(carIdx+1);});
  $("#pickBtn").addEventListener("click",randomDraw);
  $("#drawAgain").addEventListener("click",randomDraw);
  $("#shakeBtn").addEventListener("click",shakeDrink);
  $("#drawCheck").addEventListener("click",function(){
    if(drawIdx<0) return;
    if(foodDone[drawIdx]) delete foodDone[drawIdx]; else foodDone[drawIdx]=1;
    saveState(); renderCheck(); renderMeStats();
    var on=!!foodDone[drawIdx];
    this.textContent=on?"✓ 已打卡":"✓ 记一笔打卡";
    this.classList.toggle("checked",on);
    toast(on?"已记入美食打卡 · "+FOODS[drawIdx].name:"已取消打卡");
  });
  $("#modalClose").addEventListener("click",function(){$("#modal").classList.remove("on");});
  $("#modal").addEventListener("click",function(e){ if(e.target===$("#modal")) this.classList.remove("on"); });
  document.addEventListener("keydown",function(e){ if(e.key==="Escape") $("#modal").classList.remove("on"); });
  /* 若几何在隐藏页面不可用，切到攻略页时 initRailMap 会自动重试 */
  setTimeout(initRailMap,0);
  bindGuideExtras();
  handleHash();
  window.addEventListener("hashchange",handleHash);
}
init();

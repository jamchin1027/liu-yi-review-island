const EXTRA_QUESTIONS=[];
function addExtra(id,lessonId,q,right,wrong,explain){
  const lesson=LESSONS.find(l=>l.id===lessonId);
  if(!lesson)throw Error(`Unknown lesson ${lessonId}`);
  const choices=[right,...wrong].map(String);
  if(choices.length!==4||new Set(choices).size!==4)throw Error(`Invalid choices ${id}`);
  const offset=[...id].reduce((sum,c)=>sum+c.charCodeAt(0),0)%4;
  const options=[...choices.slice(offset),...choices.slice(0,offset)];
  EXTRA_QUESTIONS.push({id,lessonId,subject:lesson.subject,q,options,answer:options.indexOf(String(right)),explain});
}
const number=n=>n.toLocaleString('en-US');
const mixed=(whole,part,den)=>`${whole} 又 ${part}/${den}`;
function addPair(id,lessonId,first,second,right,wrong,explain){
  addExtra(`${id}-a`,lessonId,first,right,wrong,explain);
  addExtra(`${id}-b`,lessonId,second,right,wrong,explain);
}

for(let i=0;i<5;i++){
  const digit=i+2,place=[10000000,1000000,100000,10000,1000][i],n=digit*place+3241;
  addExtra(`ex-math-1-place-${i}`,'math-1',`${number(n)} 中的 ${digit} 代表多少？`,number(digit*place),[number(digit*place/10),number(digit*place*10),number(digit)],`${digit} 位於${['千萬','百萬','十萬','萬','千'][i]}位，代表 ${number(digit*place)}。`);
  const a=12000000+i*731000,b=a+100000+i*1000,c=a-10000,d=a+1000;
  addExtra(`ex-math-1-compare-${i}`,'math-1',`與 ${number(a)} 比較，下列哪個數最大？`,number(b),[number(a),number(c),number(d)],'先比較最高位，相同時逐位往右比較。');
  const tenMillions=i+1,millions=i+2,tenThousands=i+3,ones=i+4,value=tenMillions*10000000+millions*1000000+tenThousands*10000+ones;
  addExtra(`ex-math-1-compose-${i}`,'math-1',`${tenMillions} 個千萬、${millions} 個百萬、${tenThousands} 個萬和 ${ones} 個一，合起來是多少？`,number(value),[number(value+100000),number(value-10000),number(value+1000)],'把各個位值代表的量相加，空位要補 0。');
  const start=23450000+i*100000;
  addExtra(`ex-math-1-step-${i}`,'math-1',`${number(start)} 再增加 10 萬，會變成多少？`,number(start+100000),[number(start+10000),number(start+1000000),number(start-100000)],'10 萬是 100,000，只改變十萬位並檢查進位。');
}
for(let i=0;i<5;i++){
  const a=27+i*7,b=13+i*3,product=a*b;
  addExtra(`ex-math-2-basic-${i}`,'math-2',`${a} × ${b} = ？`,number(product),[number(product+a),number(product-a),number(a+b)],`${a} × ${b} = ${a} × 10 + ${a} × ${b-10} = ${product}。`);
  const c=123+i*31,d=21+i*4,p=c*d;
  addExtra(`ex-math-2-three-${i}`,'math-2',`${c} × ${d} = ？`,number(p),[number(p+c),number(p-c),number(c+d)],`把 ${d} 拆成 ${Math.floor(d/10)*10} 和 ${d%10}，分別乘 ${c} 再相加。`);
  const boxes=12+i*3,each=24+i*5,total=boxes*each;
  addExtra(`ex-math-2-story-${i}`,'math-2',`每盒 ${each} 枝筆，${boxes} 盒共有多少枝？`,number(total),[number(total+each),number(total-each),number(boxes+each)],`每盒 ${each} 枝，共 ${boxes} 盒，用 ${each} × ${boxes} = ${total}。`);
  const count=16+i*4,price=35+i*6,cost=count*price;
  addExtra(`ex-math-2-cost-${i}`,'math-2',`一本練習簿 ${price} 元，買 ${count} 本要付多少元？`,number(cost),[number(cost+price),number(cost-price),number(count+price)],`單價乘數量：${price} × ${count} = ${cost} 元。`);
}
for(let i=0;i<5;i++){
  const angle=[25,55,90,125,180][i],type=['銳角','銳角','直角','鈍角','平角'][i];
  addExtra(`ex-math-3-type-${i}`,'math-3',`${angle} 度的角屬於哪一種？`,type,['銳角','直角','鈍角','平角'].filter(x=>x!==type).slice(0,3),`${angle} 度要和 90 度、180 度比較。`);
  const first=20+i*10;
  addExtra(`ex-math-3-right-${i}`,'math-3',`兩個角合成一個直角，其中一角是 ${first} 度，另一角是多少度？`,`${90-first} 度`,[`${first} 度`,`${90+first} 度`,`${180-first} 度`],`直角是 90 度，90 − ${first} = ${90-first} 度。`);
  const part=35+i*15;
  addExtra(`ex-math-3-straight-${i}`,'math-3',`平角是 180 度，已經轉了 ${part} 度，還差多少度？`,`${180-part} 度`,[`${part} 度`,`${90+part} 度`,`${180+part} 度`],`180 − ${part} = ${180-part} 度。`);
  const turn=40+i*25;
  addExtra(`ex-math-3-full-${i}`,'math-3',`轉一整圈是 360 度，轉了 ${turn} 度後，還差多少度？`,`${360-turn} 度`,[`${turn} 度`,`${180-turn+10} 度`,`${360+turn} 度`],`整圈是 360 度，360 − ${turn} = ${360-turn} 度。`);
}
for(let i=0;i<5;i++){
  const den=3+i,num=den*2+2+i%2,whole=Math.floor(num/den),part=num%den;
  addExtra(`ex-math-4-to-mixed-${i}`,'math-4',`${num}/${den} 可以寫成哪個帶分數？`,mixed(whole,part,den),[mixed(whole-1,part,den),mixed(whole,part+1,den),mixed(whole+1,part,den)],`${num} ÷ ${den} = ${whole} 餘 ${part}，所以是 ${mixed(whole,part,den)}。`);
  const w=i+1,p=1+i%2,d=4+i,n=w*d+p;
  addExtra(`ex-math-4-to-improper-${i}`,'math-4',`${mixed(w,p,d)} 等於哪個假分數？`,`${n}/${d}`,[`${n-1}/${d}`,`${n+1}/${d}`,`${d}/${n}`],`${w} 個完整單位是 ${w*d}/${d}，加 ${p}/${d} 得 ${n}/${d}。`);
  const denominator=5+i,a=denominator+1,b=denominator+3;
  addExtra(`ex-math-4-compare-${i}`,'math-4',`分母都是 ${denominator}，${a}/${denominator} 和 ${b}/${denominator} 哪個比較大？`,`${b}/${denominator}`,[`${a}/${denominator}`,`${denominator}/${b}`,`${denominator}/${a}`],'分母相同時，分子越大，分數越大。');
  const pieces=denominator*3+2;
  addExtra(`ex-math-4-pieces-${i}`,'math-4',`每 ${denominator} 塊拼成 1 個完整圖形，${pieces} 塊可拼成幾個完整圖形，還剩幾塊？`,`3 個，剩 2 塊`,[`2 個，剩 3 塊`,`3 個，剩 1 塊`,`4 個，剩 2 塊`],`${pieces} ÷ ${denominator} = 3 餘 2。`);
}
for(let i=0;i<5;i++){
  const km=i+2,m=125+i*110,total=km*1000+m;
  addExtra(`ex-math-5-to-m-${i}`,'math-5',`${km} 公里 ${m} 公尺等於多少公尺？`,`${number(total)} 公尺`,[`${number(total+1000)} 公尺`,`${number(km*100+m)} 公尺`,`${number(total-100)} 公尺`],`1 公里是 1000 公尺，${km} 公里加 ${m} 公尺是 ${number(total)} 公尺。`);
  const meters=(i+3)*1000+250+i*90;
  addExtra(`ex-math-5-to-km-${i}`,'math-5',`${number(meters)} 公尺是幾公里幾公尺？`,`${i+3} 公里 ${250+i*90} 公尺`,[`${i+2} 公里 ${250+i*90} 公尺`,`${i+3} 公里 ${350+i*90} 公尺`,`${i+4} 公里 ${250+i*90} 公尺`],`每 1000 公尺換成 1 公里，餘下 ${250+i*90} 公尺。`);
  const a=1200+i*300,b=750+i*140;
  addExtra(`ex-math-5-add-${i}`,'math-5',`第一段走 ${number(a)} 公尺，第二段走 ${number(b)} 公尺，兩段共幾公尺？`,`${number(a+b)} 公尺`,[`${number(a+b+100)} 公尺`,`${number(a+b-100)} 公尺`,`${number(a-b)} 公尺`],`同樣是公尺，直接相加：${a} + ${b} = ${a+b}。`);
  const goal=3000+i*500,walked=850+i*120;
  addExtra(`ex-math-5-left-${i}`,'math-5',`全程 ${number(goal)} 公尺，已走 ${number(walked)} 公尺，還剩多少公尺？`,`${number(goal-walked)} 公尺`,[`${number(goal+walked)} 公尺`,`${number(goal-walked+100)} 公尺`,`${number(goal-walked-100)} 公尺`],`全程減已走：${goal} − ${walked} = ${goal-walked}。`);
}

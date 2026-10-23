#!/usr/bin/env node
// Joint Finder maturity-priority regression checks. Run: node finder.test.cjs
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const src=fs.readFileSync(require('node:path').join(__dirname,'index.html'),'utf8');
const from=src.indexOf('function recommend(){');
const to=src.indexOf("$('#recommend').onclick=recommend;",from);
assert(from>=0&&to>from,'Finder implementation is present');
const fn=src.slice(from,to);
const els={
 '#goal':{value:'reuse'},'#filament':{value:'PLA'},'#access':{value:'slide'},
 '#rtitle':{textContent:''},'#rankings':{innerHTML:''}
};
const context={
 $:k=>els[k],
 joints:[
 {id:0,name:'Unbuilt twist coupling',apps:['Modular'],material:['PLA'],print:5,lock:5,ease:5,reuse:true,family:'Keys & locks',mode:'printed mechanical lock',readiness:'planned',printUse:'unbuilt'},
 {id:1,name:'Sliding dovetail',apps:['Modular'],material:['PLA'],print:4,lock:4,ease:3,reuse:true,family:'Dovetail & slide',mode:'sliding interlock',readiness:'good',printUse:'usable rail',printRisk:'Need end stop'},
 {id:2,name:'Cross-key prototype',apps:['Modular'],material:['PLA'],print:5,lock:5,ease:4,reuse:true,family:'Keys & locks',mode:'key',readiness:'prototype',printUse:'test pair'}
 ],
 purpose:'Modular',
 escapeHtml:s=>String(s).replace(/[&<>"]/g,''),
};
vm.createContext(context);
vm.runInContext(fn+';recommend();',context);
const html=els['#rankings'].innerHTML;
const rows=[...html.matchAll(/data-joint="(\d+)"/g)].map(m=>Number(m[1]));
assert.deepEqual(rows,[1,2,0],'maturity takes precedence over optimistic scores');
assert(html.includes('href="generator.html"'),'working dovetail links to existing STL generator');
assert(!html.includes('href="bayonet.html"'),'unbuilt concepts do not receive fictitious generator links');
context.joints=context.joints.map(x=>({...x,material:['PETG']}));
vm.runInContext('recommend();',context);
assert(els['#rankings'].innerHTML.includes('No candidate matches'),'empty eligible results are clear');
console.log('PASS: maturity ranking, generator link, no invented links, empty results');

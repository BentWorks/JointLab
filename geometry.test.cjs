#!/usr/bin/env node
// Dependency-free regression checks for the browser-side Fit Lab geometry.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const html = fs.readFileSync(path.join(__dirname, 'dist/fit-lab.html'), 'utf8');
const source = html.split('<script>')[1]?.split('</script>')[0];
assert(source, 'Fit Lab script exists');
const state = {center: 0.30, spread: 0.10, peg: 8, thickness: 4};
const context = vm.createContext({document:{querySelector:id=>({get value(){return state[id.slice(1)]}})}});
vm.runInContext(source.slice(0,source.indexOf('ids.forEach(id=>')),context);
function checkMesh(tris,label){
  assert(tris.length>12,`${label}: triangles exist`);
  const edges=new Map();
  for(const tri of tris){
    assert.equal(tri.length,3);
    const [a,b,c]=tri;
    const cross=[(b[1]-a[1])*(c[2]-a[2])-(b[2]-a[2])*(c[1]-a[1]),(b[2]-a[2])*(c[0]-a[0])-(b[0]-a[0])*(c[2]-a[2]),(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])];
    assert(Math.hypot(...cross)>1e-8,`${label}: nondegenerate triangle`);
    for(let i=0;i<3;i++){
      const key=[tri[i].join(','),tri[(i+1)%3].join(',')].sort().join('|');
      edges.set(key,(edges.get(key)||0)+1);
    }
  }
  assert([...edges.values()].every(n=>n===2),`${label}: closed mesh`);
}
let runs=0;
for(const center of [.15,.30,.60])for(const spread of [.05,.10,.15])for(const peg of [6,8,12])for(const thickness of [3,4,6]){
  Object.assign(state,{center,spread,peg,thickness});
  for(const part of ['male','female'])checkMesh(vm.runInContext(`build('${part}')`,context),`${part} ${JSON.stringify(state)}`);
  runs++;
}
console.log(`PASS: ${runs} parameter combinations, ${runs*2} closed meshes`);

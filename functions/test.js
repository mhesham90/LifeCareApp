var inside = require('point-in-polygon');
var polygon = [[0,0],[2,0],[3,1],[2.5,2],[1,4]];

if(inside([1,1], [[0,0],[2,0],[3,1],[2.5,2],[1,4]])){
    console.log('trueeeeeeeeee');
  }

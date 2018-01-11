var matrixizer = function(){
    var self = this; 
    self.matrix = []; 
    self.num = 0; 
    self.width = 0; 
    self.height = 0; 
    self.randoms = []; 
    self.newMatrix = function(num, width, height){
        self.num = num; 
        self.width = width; 
        self.height = height; 
        self.randoms = self.newRandoms(); 
        return self.genMatrix(); 
    }
    self.newRandoms = function(){
        var arr = []; 
        var safe = 0; 
        whileLoop: 
        while (arr.length < self.num){
            safe ++; 
            if (safe > 1000){
                break whileLoop; 
            }
            var xy = self.getOneRandom(); 
            if (arr.indexOf(xy) == -1){
                arr.push(xy); 
            }
        }
        return arr; 
    }
    self.getOneRandom = function(){
        var x = Math.floor(Math.random() * self.width); 
        var y = Math.floor(Math.random() * self.height); 
        var xy = x + '-' + y; 
        return xy; 
    }
    self.genMatrix = function(){
        for (var x=0; x<self.width; x++){
            self.matrix[x] = []; 
            for (var y=0; y<self.height; y++){
                var tf = (self.randoms.indexOf(x + '-' + y) > -1) ? true : false; 
                self.matrix[x][y] = tf; 
            }
        }
        return self.matrix; 
    }
}

var mm = new matrixizer(); 
var rand = mm.newMatrix(5,10,10); 
//console.log(mm); 
console.log(mm); 

function pencil(self)
{
    self.b_context.moveTo(self.mouse_x,self.mouse_y);
    self.b_context.lineTo(self.new_mouse_x,self.new_mouse_y);
    self.b_context.strokeStyle = "#000";
    self.b_context.stroke();
}

function circle(self)
{
    var SIZE = 10;
    self.b_context.beginPath();
    self.b_context.strokeStyle = "#000";
    self.b_context.arc(self.new_mouse_x, self.new_mouse_y, SIZE, 0, Math.PI*2, true); 
    self.b_context.closePath();
    self.b_context.fill();
}

function square(self)
{
    var SIZE = 30;
    var xmin, xmax, ymin, ymax; // constants defining bounding points of the rectangle we are about to draw 
    xmin = self.new_mouse_x-SIZE/2;
    ymin = self.new_mouse_y-SIZE/2;

    self.b_context.moveTo(self.mouse_x,self.mouse_y);
    self.b_context.beginPath();
    self.b_context.strokeStyle = "#000";
    self.b_context.rect(xmin,ymin,SIZE,SIZE);
    //self.b_context.rect(xmin,ymin,xmax,ymax);
    //self.b_context.closePath();
    self.b_context.fill();

}


$(function(){
    $("body").data("drawable",true).keydown(function(){
        $(this).data("drawable",false);
    }).keyup(function(){
        $(this).data("drawable",true);
    });
});

function drawable(id){
    this.mouse_x = -1;
    this.mouse_y = -1;
    this.raw_data = [];
    this.b_canvas = document.getElementById(id);
    this.b_context = this.b_canvas.getContext("2d");
    this.new_mouse_x = 0;
    this.new_mouse_y = 0;
    this.max_height = 1200;
    this.max_width  = 1600;

    this.init = function(){
    var self = this;
    console.log(self.raw_data);
    $('#'+id).mousemove(function(e){
        self.new_mouse_x = e.offsetX
        self.new_mouse_y = e.offsetY
        if( self.mouse_x != -1){
            //pencil(self);
            if($('body').data('drawable')){
                square(self);
                self.raw_data.push(self.new_mouse_x+":"+ self.new_mouse_y);
            }
        }
        self.mouse_y = self.new_mouse_y;
        self.mouse_x = self.new_mouse_x;
    });

    $('#'+id).bind('click',function(){
        //alert(self.raw_data);
        var r=prompt("Enter your name and click Ok in order to Save.",'');
        if (r!=null)
          {
            //
           $.post("save.php","name="+escape(r)+"&data="+self.raw_data,function(data){
                
                alert('Thanks, '+r+' your drawing was saved.');
            });
          }
          else
        {
            alert("Drawing not saved");
        }
        return;
    });
    }
    this.append_raw_data = function(additional_data)
    {
        this.raw_data = additional_data.concat(this.raw_data);

    }
}

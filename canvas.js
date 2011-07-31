
function drawable(id){
    this.mouse_x = -1;
    this.mouse_y = -1;
    this.raw_data = [];
    this.b_canvas = document.getElementById(id);
    this.b_context = this.b_canvas.getContext("2d");
    this.new_mouse_x = 0;
    this.new_mouse_y = 0;
    this.init = function(){
    var self = this;
    console.log(self.raw_data);
    $('#'+id).mousemove(function(e){
        self.new_mouse_x = e.offsetX
        self.new_mouse_y = e.offsetY
        if( self.mouse_x != -1){
            self.b_context.moveTo(self.mouse_x,self.mouse_y);
            self.b_context.lineTo(self.new_mouse_x,self.new_mouse_y);
            self.b_context.strokeStyle = "#000";
            self.b_context.stroke();
            self.raw_data.push(self.new_mouse_x+":"+ self.new_mouse_y);
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

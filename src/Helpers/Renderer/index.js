export default class Renderer {

	 text(str, x, y, size, ctx, color= "white") {
      ctx.strokeStyle = color
      ctx.font = size+"px Comic Sans MS";
      ctx.strokeText(str, x, y);
    }

    img(img, x,y, width, height, ctx) {
        ctx.drawImage(img.img, 
                      img.pos.x,
                      img.pos.y, 
                      img.pos.width, 
                      img.pos.height,
                      x,
                      y,
                      width,
                      height
                    );
       

    }

    image(img, pos, ctx) {
        ctx.drawImage(img.img, 
                      img.x,
                      img.y, 
                      img.width, 
                      img.height,
                      pos.x,
                      pos.y,
                      pos.width,
                      pos.height
                    );
       

    }

  
    rect(obj, ctx, color = "red") {
     
      if (!color) {
        color = "red"
      }
      ctx.fillStyle = color
      ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
    }

     fillRect(obj, color, ctx) {
      ctx.fillStyle = color;
      ctx.fillRect(obj.body.pos.x, obj.body.pos.y, obj.body.size.x, obj.body.size.y);
    }

    outlineRect(obj, ctx, color, offset) {
      if (!offset) {
        offset = {
          x: 0,
          y: 0,
        }
      }

      let {size, pos} = obj.body;
      this.rect({x: pos.x + offset.x, y: pos.y + offset.y, width: size.x, height:2}, ctx, color) //top
      this.rect({x: pos.x + offset.x + size.x, y: pos.y + offset.y, width: 2, height: size.y}, ctx, color) //right
      this.rect({x: pos.x + offset.x, y: pos.y + offset.y + size.y, width: size.x, height: 2}, ctx, color) //bottom
      this.rect({x: pos.x + offset.x, y: pos.y + offset.y, width:2, height: size.y}, ctx, color) //left
    }

    button(obj, ctx) {
      ctx.beginPath();
      ctx.strokeStyle = "white"
      ctx.rect(obj.button.body.pos.x, obj.button.body.pos.y, obj.button.body.size.x, obj.button.body.size.y);
      ctx.stroke();
      this.label(obj, ctx);
    }

    imgButton(obj, ctx) {
      this.img(obj, obj.body.pos.x, obj.body.pos.y, obj.body.size.x, obj.body.size.y, ctx)
      this.label(obj, ctx)
    }

    label(obj, ctx) {
      ctx.strokeStyle = "white"
      ctx.font = obj.label.fontSize + "px Comic Sans MS";
      let xOffset = 0;
      if (obj.label.label.length) {
        let lines = obj.label.label.split('\n');

        for (var i = 0; i < lines.length; i++) {
          if (lines[i].length > 6) {
            xOffset = -4
          } else {
            xOffset = 0;
          }

          ctx.strokeText(lines[i], obj.label.body.pos.x + xOffset, obj.label.body.pos.y + i*15);
        } 
      }

        if (obj.label2) {
          if (obj.label2.label.length) {
          let lines = obj.label2.label.split('\n');

          for (i = 0; i < lines.length; i++) {
            ctx.strokeText(lines[i], obj.label2.body.pos.x, obj.label2.body.pos.y + i*15);
          } 
        }
      }
    }
}
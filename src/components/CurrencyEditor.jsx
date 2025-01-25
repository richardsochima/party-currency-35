import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";

export function CurrencyEditor({ currencyImage, onClose }) {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [celebrationText, setCelebrationText] = useState("Happy Birthday!");
  const [currencyName, setCurrencyName] = useState("Party Currency");
  const [eventId, setEventId] = useState("1A3Bc5674F89djfnk");

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new fabric.fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 400,
    });

    // Load the template image
    fabric.fabric.Image.fromURL(currencyImage, (img) => {
      img.scaleToWidth(fabricCanvas.width);
      fabricCanvas.setBackgroundImage(img, fabricCanvas.renderAll.bind(fabricCanvas));
    });

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, [currencyImage]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      fabric.fabric.Image.fromURL(event.target.result, (img) => {
        // Create oval clip path
        const clipPath = new fabric.fabric.Ellipse({
          rx: 100,
          ry: 120,
          originX: 'center',
          originY: 'center'
        });

        img.set({
          left: 150,
          top: 150,
          clipPath: clipPath
        });
        
        img.scaleToWidth(200);
        canvas.add(img);
        canvas.renderAll();
      });
    };
    reader.readAsDataURL(file);
  };

  const updateText = (type, value) => {
    if (!canvas) return;

    const objects = canvas.getObjects();
    const existingText = objects.find(obj => obj.type === 'text' && obj.textType === type);
    
    if (existingText) {
      existingText.set('text', value);
    } else {
      const textObject = new fabric.fabric.Text(value, {
        left: type === 'celebration' ? 400 : type === 'currency' ? 200 : 600,
        top: type === 'celebration' ? 200 : type === 'currency' ? 300 : 350,
        fontFamily: type === 'celebration' ? 'Playfair Display' : 'Montserrat',
        fontSize: type === 'celebration' ? 40 : 24,
        fill: '#334495',
        originX: 'center',
        originY: 'center',
        textType: type
      });
      canvas.add(textObject);
    }
    
    canvas.renderAll();
  };

  const handleSave = () => {
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL({
      format: 'png',
      quality: 1
    });
    
    toast.success("Currency customization saved!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Customize Currency</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <canvas ref={canvasRef} className="border border-gray-200 rounded-lg" />
          </div>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="celebration">Celebration Text</Label>
              <Input
                id="celebration"
                value={celebrationText}
                onChange={(e) => {
                  setCelebrationText(e.target.value);
                  updateText('celebration', e.target.value);
                }}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="currency">Currency Name</Label>
              <Input
                id="currency"
                value={currencyName}
                onChange={(e) => {
                  setCurrencyName(e.target.value);
                  updateText('currency', e.target.value);
                }}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="eventId">Event ID*</Label>
              <Input
                id="eventId"
                value={eventId}
                onChange={(e) => {
                  setEventId(e.target.value);
                  updateText('eventId', e.target.value);
                }}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="image">Upload Portrait Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-1"
              />
            </div>
            
            <Button onClick={handleSave} className="w-full bg-green-500 hover:bg-green-600 text-white">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
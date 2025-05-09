import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DndContext, DragEndEvent, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { HexColorPicker } from 'react-colorful';
import { 
  Type, Image, Bold, Italic, AlignLeft, AlignCenter, AlignRight,
  Plus, Minus, RotateCcw, Download, ShoppingCart
} from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../contexts/CartContext';
import { mockProducts } from '../data/mockData';

interface DesignElement {
  id: string;
  type: 'text' | 'image';
  content: string;
  style: {
    x: number;
    y: number;
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    textAlign?: 'left' | 'center' | 'right';
    bold?: boolean;
    italic?: boolean;
  };
}

const DesignStudioPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const [elements, setElements] = useState<DesignElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<DesignElement | null>(null);
  const [color, setColor] = useState("#000000");
  const [showColorPicker, setShowColorPicker] = useState(false);
  
  const product = productId ? mockProducts.find(p => p.id === productId) : null;
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const addTextElement = () => {
    const newElement: DesignElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      content: 'Double click to edit',
      style: {
        x: 50,
        y: 50,
        fontSize: 16,
        fontFamily: 'Inter',
        color: '#000000',
        textAlign: 'left',
      },
    };
    setElements([...elements, newElement]);
    setSelectedElement(newElement);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newElement: DesignElement = {
          id: `image-${Date.now()}`,
          type: 'image',
          content: e.target?.result as string,
          style: {
            x: 50,
            y: 50,
          },
        };
        setElements([...elements, newElement]);
        setSelectedElement(newElement);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    setElements(elements.map(el => {
      if (el.id === active.id) {
        return {
          ...el,
          style: {
            ...el.style,
            x: el.style.x + delta.x,
            y: el.style.y + delta.y,
          },
        };
      }
      return el;
    }));
  };

  const updateElementStyle = (property: string, value: any) => {
    if (!selectedElement) return;
    
    setElements(elements.map(el => {
      if (el.id === selectedElement.id) {
        return {
          ...el,
          style: {
            ...el.style,
            [property]: value,
          },
        };
      }
      return el;
    }));
    
    setSelectedElement({
      ...selectedElement,
      style: {
        ...selectedElement.style,
        [property]: value,
      },
    });
  };

  const handleTextEdit = (element: DesignElement, newContent: string) => {
    setElements(elements.map(el => {
      if (el.id === element.id) {
        return { ...el, content: newContent };
      }
      return el;
    }));
  };

  const addToCartWithDesign = () => {
    if (!product) return;
    
    const designData = {
      elements,
      productId,
      timestamp: Date.now(),
    };
    
    // In a real app, we would save the design to the backend
    // and get a design ID back
    const designId = `design-${Date.now()}`;
    
    addToCart({
      productId: product.id,
      productName: product.name,
      variantId: product.variants[0].id,
      variantName: product.variants[0].name,
      price: product.variants[0].price,
      quantity: 1,
      image: product.featuredImage,
      designId,
    });
    
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tools Panel */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Design Tools</h2>
            
            {/* Add Elements */}
            <div className="space-y-4 mb-8">
              <Button
                variant="outline"
                fullWidth
                onClick={addTextElement}
                icon={<Type size={16} />}
              >
                Add Text
              </Button>
              
              <label className="block">
                <Button
                  variant="outline"
                  fullWidth
                  icon={<Image size={16} />}
                >
                  Upload Image
                </Button>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            
            {/* Text Controls */}
            {selectedElement && selectedElement.type === 'text' && (
              <div className="space-y-4">
                <h3 className="font-medium mb-2">Text Properties</h3>
                
                {/* Font Controls */}
                <div className="space-y-2">
                  <select
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring focus:ring-brand-200"
                    value={selectedElement.style.fontFamily}
                    onChange={(e) => updateElementStyle('fontFamily', e.target.value)}
                  >
                    <option value="Inter">Inter</option>
                    <option value="Montserrat">Montserrat</option>
                  </select>
                  
                  <div className="flex space-x-2">
                    <button
                      className={`p-2 rounded ${
                        selectedElement.style.bold ? 'bg-brand-100 text-brand-600' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => updateElementStyle('bold', !selectedElement.style.bold)}
                    >
                      <Bold size={16} />
                    </button>
                    <button
                      className={`p-2 rounded ${
                        selectedElement.style.italic ? 'bg-brand-100 text-brand-600' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => updateElementStyle('italic', !selectedElement.style.italic)}
                    >
                      <Italic size={16} />
                    </button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      className={`p-2 rounded ${
                        selectedElement.style.textAlign === 'left' ? 'bg-brand-100 text-brand-600' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => updateElementStyle('textAlign', 'left')}
                    >
                      <AlignLeft size={16} />
                    </button>
                    <button
                      className={`p-2 rounded ${
                        selectedElement.style.textAlign === 'center' ? 'bg-brand-100 text-brand-600' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => updateElementStyle('textAlign', 'center')}
                    >
                      <AlignCenter size={16} />
                    </button>
                    <button
                      className={`p-2 rounded ${
                        selectedElement.style.textAlign === 'right' ? 'bg-brand-100 text-brand-600' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => updateElementStyle('textAlign', 'right')}
                    >
                      <AlignRight size={16} />
                    </button>
                  </div>
                </div>
                
                {/* Font Size */}
                <div className="flex items-center space-x-2">
                  <button
                    className="p-2 rounded hover:bg-gray-100"
                    onClick={() => updateElementStyle('fontSize', (selectedElement.style.fontSize || 16) - 1)}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-medium">{selectedElement.style.fontSize}px</span>
                  <button
                    className="p-2 rounded hover:bg-gray-100"
                    onClick={() => updateElementStyle('fontSize', (selectedElement.style.fontSize || 16) + 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                {/* Color Picker */}
                <div className="relative">
                  <button
                    className="w-full p-2 rounded border flex items-center space-x-2"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                  >
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: selectedElement.style.color }}
                    />
                    <span>Color</span>
                  </button>
                  
                  {showColorPicker && (
                    <div className="absolute z-10 mt-2">
                      <HexColorPicker
                        color={selectedElement.style.color}
                        onChange={(color) => {
                          updateElementStyle('color', color);
                          setColor(color);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Design Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div
                ref={canvasRef}
                className="w-full aspect-[4/3] bg-gray-50 rounded-lg relative overflow-hidden"
              >
                <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                  {elements.map((element) => (
                    <div
                      key={element.id}
                      style={{
                        position: 'absolute',
                        left: element.style.x,
                        top: element.style.y,
                        cursor: 'move',
                      }}
                      onClick={() => setSelectedElement(element)}
                      className={`${
                        selectedElement?.id === element.id ? 'ring-2 ring-brand-500' : ''
                      }`}
                    >
                      {element.type === 'text' ? (
                        <div
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => handleTextEdit(element, e.currentTarget.textContent || '')}
                          style={{
                            fontSize: `${element.style.fontSize}px`,
                            fontFamily: element.style.fontFamily,
                            color: element.style.color,
                            textAlign: element.style.textAlign,
                            fontWeight: element.style.bold ? 'bold' : 'normal',
                            fontStyle: element.style.italic ? 'italic' : 'normal',
                          }}
                        >
                          {element.content}
                        </div>
                      ) : (
                        <img
                          src={element.content}
                          alt="Design element"
                          className="max-w-[200px] max-h-[200px]"
                        />
                      )}
                    </div>
                  ))}
                </DndContext>
              </div>
              
              {/* Canvas Controls */}
              <div className="flex justify-between mt-6">
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setElements([])}
                    icon={<RotateCcw size={16} />}
                  >
                    Reset
                  </Button>
                  <Button
                    variant="outline"
                    icon={<Download size={16} />}
                  >
                    Save Design
                  </Button>
                </div>
                
                <Button
                  variant="primary"
                  onClick={addToCartWithDesign}
                  icon={<ShoppingCart size={16} />}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignStudioPage;
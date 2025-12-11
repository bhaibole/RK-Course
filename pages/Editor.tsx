import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Upload, Sliders, Type, Layers, Download, Share2, Undo, Check } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { EditorState, Template } from '../types';
import { DEFAULT_EDITOR_STATE } from '../constants';

export const Editor: React.FC = () => {
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // State
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [editorState, setEditorState] = useState<EditorState>(DEFAULT_EDITOR_STATE);
  const [activeTab, setActiveTab] = useState<'adjust' | 'text'>('adjust');
  const [processing, setProcessing] = useState(false);

  // Check if template was passed via navigation
  useEffect(() => {
    if (location.state && location.state.template) {
      const t = location.state.template as Template;
      setEditorState(t.filters);
    }
  }, [location.state]);

  // Handle File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageSrc(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Render Canvas
  useEffect(() => {
    if (!imageSrc || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      // Set canvas dimensions to match image but limit max width for performance
      const maxWidth = 1200;
      const scale = maxWidth / img.width;
      const width = Math.min(img.width, maxWidth);
      const height = img.height * (width / img.width);

      canvas.width = width;
      canvas.height = height;

      // Filter Logic
      ctx.filter = `
        brightness(${editorState.brightness}%) 
        contrast(${editorState.contrast}%) 
        saturate(${editorState.saturation}%) 
        sepia(${editorState.sepia}%)
      `;

      ctx.drawImage(img, 0, 0, width, height);

      // Text Overlay Logic
      if (editorState.overlayText) {
        ctx.filter = 'none'; // Reset filter for text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 48px sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'black';
        ctx.shadowBlur = 10;
        ctx.fillText(editorState.overlayText, width / 2, height / 2);
      }
    };
  }, [imageSrc, editorState]);

  const updateFilter = (key: keyof EditorState, value: number | string) => {
    setEditorState(prev => ({ ...prev, [key]: value }));
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    setProcessing(true);
    setTimeout(() => {
      const link = document.createElement('a');
      link.download = `editflow_${Date.now()}.png`;
      link.href = canvasRef.current!.toDataURL('image/png');
      link.click();
      setProcessing(false);
    }, 500); // Simulate processing delay
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 pb-16">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4 border-b border-slate-800">
        <button onClick={() => setEditorState(DEFAULT_EDITOR_STATE)} className="text-slate-400">
          <Undo size={20} />
        </button>
        <div className="flex gap-2">
           <button className="text-primary font-bold text-sm" onClick={handleDownload}>
             {processing ? 'Saving...' : 'Export'}
           </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex items-center justify-center overflow-hidden bg-slate-900 relative">
        {!imageSrc ? (
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="text-slate-400" />
            </div>
            <p className="text-slate-300 mb-4">Upload a photo to start editing</p>
            <Button onClick={() => fileInputRef.current?.click()}>Select Image</Button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <canvas ref={canvasRef} className="max-w-full max-h-full object-contain shadow-2xl" />
        )}
      </div>

      {/* Tools Panel */}
      {imageSrc && (
        <div className="bg-card border-t border-slate-800 p-4 pb-20 safe-area-bottom">
          {/* Tabs */}
          <div className="flex gap-4 mb-4 border-b border-slate-700 pb-2">
            <button 
              onClick={() => setActiveTab('adjust')} 
              className={`text-sm font-medium pb-2 ${activeTab === 'adjust' ? 'text-primary border-b-2 border-primary' : 'text-slate-400'}`}
            >
              Adjust
            </button>
            <button 
              onClick={() => setActiveTab('text')} 
              className={`text-sm font-medium pb-2 ${activeTab === 'text' ? 'text-primary border-b-2 border-primary' : 'text-slate-400'}`}
            >
              Text
            </button>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            {activeTab === 'adjust' && (
              <>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Brightness</span>
                    <span>{editorState.brightness}%</span>
                  </div>
                  <input 
                    type="range" min="0" max="200" 
                    value={editorState.brightness} 
                    onChange={(e) => updateFilter('brightness', Number(e.target.value))}
                    className="w-full accent-primary h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Contrast</span>
                    <span>{editorState.contrast}%</span>
                  </div>
                  <input 
                    type="range" min="0" max="200" 
                    value={editorState.contrast} 
                    onChange={(e) => updateFilter('contrast', Number(e.target.value))}
                    className="w-full accent-primary h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Saturation</span>
                    <span>{editorState.saturation}%</span>
                  </div>
                  <input 
                    type="range" min="0" max="200" 
                    value={editorState.saturation} 
                    onChange={(e) => updateFilter('saturation', Number(e.target.value))}
                    className="w-full accent-primary h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </>
            )}

            {activeTab === 'text' && (
              <div className="space-y-2">
                <label className="text-xs text-slate-400">Overlay Text</label>
                <input 
                  type="text"
                  value={editorState.overlayText}
                  onChange={(e) => updateFilter('overlayText', e.target.value)}
                  placeholder="Enter text..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
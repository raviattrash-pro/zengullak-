import React, { useState } from 'react';
import { sounds } from '../utils/audio';
import RealisticIceBlock from './RealisticIceBlock';
import { PRESET_SHOPPING_IMAGES, getShoppingImage } from '../utils/shoppingImages';
import { Snowflake, Plus, Sparkles, Upload, Link2, Check, Image as ImageIcon } from 'lucide-react';

export default function ImpulseFreezer({ items, onFreezeItem, onResolveItem, totalShielded }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');

  const QUICK_TEMPLATES = [
    { title: 'Zara Jacket 🧥', price: 1500, img: PRESET_SHOPPING_IMAGES.zara },
    { title: 'Nike Sneakers 👟', price: 2499, img: PRESET_SHOPPING_IMAGES.sneakers },
    { title: 'Midnight Swiggy Biryani 🍛', price: 340, img: PRESET_SHOPPING_IMAGES.biryani },
    { title: 'Wireless AirPods 🎧', price: 1999, img: PRESET_SHOPPING_IMAGES.airpods },
    { title: 'Domino’s Pizza 🍕', price: 420, img: PRESET_SHOPPING_IMAGES.pizza },
  ];

  const handleSelectTemplate = (tmpl) => {
    sounds.playTap();
    setTitle(tmpl.title);
    setAmount(tmpl.price.toString());
    setImageUrlInput(tmpl.img);
    setUploadedImage('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result);
        setImageUrlInput('');
        sounds.playTap();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFreeze = (e) => {
    e.preventDefault();
    if (!title.trim() || !amount) return;

    sounds.playIceCrack();
    onFreezeItem({
      title: title.trim(),
      amount: parseInt(amount, 10),
      imageUrl: uploadedImage || imageUrlInput.trim() || getShoppingImage(title),
    });

    setTitle('');
    setAmount('');
    setImageUrlInput('');
    setUploadedImage('');
    setShowAddForm(false);
  };

  const previewImage = uploadedImage || imageUrlInput.trim() || (title ? getShoppingImage(title) : PRESET_SHOPPING_IMAGES.zara);

  return (
    <div className="space-y-4 select-none">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-br from-cyan-950 via-stone-900 to-stone-950 border border-cyan-800/50 rounded-3xl p-5 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-cyan-800/40">
          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-cyan-400 flex items-center gap-1.5 font-mono">
              <Snowflake className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
              Mottainai Impulse Shield (もったいない)
            </span>
            <h3 className="text-xl font-black text-white mt-0.5">
              24h Cooling Icebox
            </h3>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block font-mono">
              Shielded Wealth
            </span>
            <span className="text-xl font-black text-cyan-300 font-mono">
              ₹{totalShielded.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <p className="text-xs text-stone-300 mt-2">
          Freeze your Swiggy, Zara, or Amazon urge inside crystal-clear ice. If you still want it in 24h, buy it. If not, shatter the ice and keep the cash!
        </p>

        {/* Add Button */}
        {!showAddForm && (
          <button
            onClick={() => {
              sounds.playTap();
              setShowAddForm(true);
            }}
            className="mt-3.5 w-full py-3 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-xs sm:text-sm rounded-2xl active:scale-[0.98] transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/60 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Freeze an Urge (Upload Image or Paste URL)</span>
          </button>
        )}
      </div>

      {/* Add New Impulse Modal / Drawer */}
      {showAddForm && (
        <form
          onSubmit={handleFreeze}
          className="p-5 bg-stone-900 border border-cyan-700/60 rounded-3xl shadow-2xl space-y-3.5 animate-in fade-in"
        >
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-mono">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Trap Product Inside 3D Ice Cube
            </h4>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-xs text-stone-400 hover:text-white"
            >
              Close
            </button>
          </div>

          {/* Quick 1-Tap Presets */}
          <div>
            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-1.5 font-mono">
              Quick Shortcuts:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_TEMPLATES.map((tmpl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectTemplate(tmpl)}
                  className="px-2.5 py-1 text-xs font-semibold rounded-xl bg-stone-800 hover:bg-stone-700 text-cyan-200 border border-cyan-800/50 active:scale-95 transition cursor-pointer"
                >
                  {tmpl.title} (₹{tmpl.price})
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-1 font-mono">
              Item Name:
            </label>
            <input
              type="text"
              placeholder="e.g. Zara jacket, Nike Dunks, Swiggy Biryani"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-stone-800 border border-stone-700 rounded-xl text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-1 font-mono">
              Price (₹):
            </label>
            <input
              type="number"
              placeholder="e.g. 1500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-stone-800 border border-stone-700 rounded-xl text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          {/* Image Options: Paste URL OR Upload File */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block font-mono">
              Product Image (Paste URL or Upload Photo):
            </label>

            {/* Paste Image URL */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                <input
                  type="url"
                  placeholder="Paste image URL (https://...)"
                  value={imageUrlInput}
                  onChange={(e) => {
                    setImageUrlInput(e.target.value);
                    setUploadedImage('');
                  }}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-stone-800 border border-stone-700 rounded-xl text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              {/* Upload Screenshot / Image button */}
              <label className="flex items-center gap-1.5 py-2 px-3 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-xl text-xs font-semibold text-cyan-300 cursor-pointer active:scale-95 transition">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            {uploadedImage && (
              <p className="text-[10px] text-emerald-400 font-mono">✓ Custom image uploaded successfully</p>
            )}
          </div>

          {/* LIVE 3D REAL ICE CUBE PREVIEW */}
          <div className="pt-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-1 font-mono">
              Live 3D Ice Cube Preview:
            </span>
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border-2 border-cyan-400/40 shadow-2xl bg-stone-950 flex items-center justify-center">
              {/* Product Image behind ice (Vivid & Visible) */}
              <div
                className="w-36 h-36 rounded-xl overflow-hidden shadow-xl z-10"
                style={{
                  clipPath: 'polygon(50% 3%, 97% 25%, 97% 75%, 50% 97%, 3% 75%, 3% 25%)',
                }}
              >
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover brightness-105 contrast-105"
                  onError={(e) => {
                    e.currentTarget.src = PRESET_SHOPPING_IMAGES.sneakers;
                  }}
                />
              </div>

              {/* Real 3D Ice Cube PNG Layer with Center Window Mask */}
              <img
                src="/ice-cube.png"
                alt="Real Ice Cube"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20"
                style={{
                  mixBlendMode: 'screen',
                  filter: 'brightness(1.15) contrast(1.2)',
                  maskImage: 'radial-gradient(ellipse at 50% 48%, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.2) 35%, rgba(0,0,0,0.9) 65%, black 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at 50% 48%, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.2) 35%, rgba(0,0,0,0.9) 65%, black 100%)',
                }}
              />

              <div className="absolute bottom-2 left-2 right-2 z-30 flex items-center justify-between bg-stone-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-cyan-400/40">
                <span className="text-xs font-bold text-white truncate max-w-[200px]">
                  {title || 'Your Product Here'}
                </span>
                <span className="text-xs font-mono font-bold text-cyan-300">
                  ₹{amount || '0'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-xs sm:text-sm rounded-2xl active:scale-95 transition shadow-lg shadow-cyan-950 cursor-pointer"
            >
              Lock in 3D Ice Cube for 24h ❄️
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="py-3 px-4 text-xs bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-2xl cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* List of 3D Frosted Ice Blocks with Real Shopping Items Inside */}
      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-cyan-800/60 rounded-3xl bg-cyan-950/20 p-6">
            <Snowflake className="w-10 h-10 mx-auto text-cyan-400/60 mb-2" />
            <h4 className="text-sm font-bold text-white">Your Icebox is Empty</h4>
            <p className="text-xs text-stone-400 mt-1">
              Next time you open Swiggy, Zara, or Amazon, freeze your urge here first!
            </p>
          </div>
        ) : (
          items.map((item) => (
            <RealisticIceBlock
              key={item.id}
              item={item}
              onResolve={onResolveItem}
            />
          ))
        )}
      </div>
    </div>
  );
}

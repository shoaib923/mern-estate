import React from "react";

const CreatingListing = () => {
  return (
    <div className="min-h-screen bg-[var(--color-brand-dark)] text-[var(--color-text-on-dark)] p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            Create Listing
          </h1>
          <div className="w-16 h-1 bg-[var(--color-brand-primary)] mx-auto rounded"></div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* LEFT SECTION - Property Details */}
          <div className="bg-[var(--color-surface-2)] rounded-2xl p-6 lg:p-8 h-fit">
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-[var(--color-border)] pb-3">
              Property Details
            </h2>
            
            {/* Basic Info */}
            <div className="space-y-5 mb-8">
              <input
                type="text"
                placeholder="Property Name"
                id="name"
                maxLength="62"
                minLength="10"
                required
                className="w-full h-12 bg-[var(--color-input-bg)] text-[var(--color-text-on-dark)] placeholder-[var(--color-text-muted)] border border-[var(--color-border)] focus:border-[var(--color-brand-primary)] focus:ring-0 outline-none px-4 rounded-lg transition"
              />
              <textarea
                placeholder="Description"
                id="description"
                required
                rows="3"
                className="w-full bg-[var(--color-input-bg)] text-[var(--color-text-on-dark)] placeholder-[var(--color-text-muted)] border border-[var(--color-border)] focus:border-[var(--color-brand-primary)] focus:ring-0 outline-none px-4 py-3 rounded-lg transition resize-none"
              />
              <input
                type="text"
                placeholder="Address"
                id="address"
                required
                className="w-full h-12 bg-[var(--color-input-bg)] text-[var(--color-text-on-dark)] placeholder-[var(--color-text-muted)] border border-[var(--color-border)] focus:border-[var(--color-brand-primary)] focus:ring-0 outline-none px-4 rounded-lg transition"
              />
            </div>

            {/* Property Features */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Features</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {["Sell", "Rent", "Parking", "Furnished", "Offer"].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 p-3 bg-[var(--color-input-bg)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-brand-primary)] transition cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      id={item.toLowerCase()}
                      className="w-4 h-4 accent-[var(--color-brand-primary)]"
                    />
                    <span className="text-sm font-medium">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Room Details */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Room Details</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: "bedrooms", label: "Beds", min: 1, max: 10 },
                  { id: "bathrooms", label: "Baths", min: 1, max: 10 }
                ].map((field) => (
                  <div key={field.id}>
                    <label className="text-sm text-[var(--color-text-muted)] mb-2 block uppercase tracking-wide">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      id={field.id}
                      min={field.min}
                      max={field.max}
                      required
                      className="w-full h-12 bg-[var(--color-input-bg)] text-[var(--color-text-on-dark)] border border-[var(--color-border)] focus:border-[var(--color-brand-primary)] focus:ring-0 outline-none px-4 rounded-lg transition"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SECTION - Pricing & Images */}
          <div className="space-y-8">
            
            {/* Pricing Card */}
            <div className="bg-[var(--color-surface-2)] rounded-2xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-[var(--color-border)] pb-3">
                Pricing
              </h2>
              <div className="space-y-5">
                {[
                  { id: "regularPrice", label: "Regular Price", note: "($ / months)" },
                  { id: "discountPrice", label: "Discounted Price", note: "($ / months)" }
                ].map((field) => (
                  <div key={field.id}>
                    <label className="text-sm text-[var(--color-text-muted)] mb-2 block uppercase tracking-wide">
                      {field.label} <span className="text-xs">{field.note}</span>
                    </label>
                    <input
                      type="number"
                      id={field.id}
                      min="1"
                      max="10000"
                      required
                      className="w-full h-12 bg-[var(--color-input-bg)] text-[var(--color-text-on-dark)] border border-[var(--color-border)] focus:border-[var(--color-brand-primary)] focus:ring-0 outline-none px-4 rounded-lg transition"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Images Card */}
            <div className="bg-[var(--color-surface-2)] rounded-2xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-[var(--color-border)] pb-3">
                Images
              </h2>
              <div className="space-y-4">
                <p className="text-sm text-[var(--color-text-muted)]">
                  First image will be cover (max 6)
                </p>
                
                <label className="w-full flex flex-col items-center justify-center py-8 px-6 bg-[var(--color-brand-accent)] text-[var(--color-brand-dark)] rounded-xl border-2 border-dashed border-[var(--color-brand-primary)] cursor-pointer hover:bg-yellow-400 transition-all duration-300">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[var(--color-brand-dark)] rounded-full flex items-center justify-center">
                      <span className="text-xl">📸</span>
                    </div>
                    <span className="font-semibold block mb-1">Select Images</span>
                    <span className="text-sm opacity-75">or drag & drop</span>
                  </div>
                  <input
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                </label>

                <div className="flex gap-3">
                  <button 
                    type="button"
                    className="relative group overflow-hidden bg-[var(--color-brand-secondary)] text-white font-semibold py-3 px-6 rounded-lg uppercase flex-1"
                  >
                    <span className="absolute inset-0 bg-[var(--color-brand-primary)] w-0 group-hover:w-full transition-all duration-500 ease-in-out"></span>
                    <span className="relative z-10">Upload</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="bg-[var(--color-surface-2)] rounded-2xl p-6 lg:p-8">
              <button className="relative group overflow-hidden bg-[var(--color-brand-secondary)] text-white font-bold py-4 px-8 rounded-xl uppercase w-full text-lg">
                <span className="absolute inset-0 bg-[var(--color-brand-primary)] w-0 group-hover:w-full transition-all duration-500 ease-in-out"></span>
                <span className="relative z-10">Create Listing</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatingListing;
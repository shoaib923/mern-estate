import React, { useState } from "react";
import axios from "axios";

const CreatingListing = () => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  // Handle file selection + preview
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length + previews.length + imageUrls.length > 6) return;

    setFiles((prev) => [...prev, ...selectedFiles]);

    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  // Delete preview before upload
  const handleDeletePreview = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Delete uploaded image (from imageUrls)
  const handleDeleteUploaded = (url) => {
    setImageUrls((prev) => prev.filter((img) => img !== url));
  };

  // Upload images to backend
  const handleImageSubmit = async () => {
    if (files.length === 0) return;

    try {
      setUploading(true);

      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const res = await axios.post("/api/image/upload-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        return res.data.url;
      });

      const urls = await Promise.all(uploadPromises);

      setImageUrls((prev) => [...prev, ...urls]);
      console.log("Uploaded URLs:", urls);

      // clear previews after upload
      setFiles([]);
      setPreviews([]);
    } catch (err) {
      console.error("Image upload failed:", err.response?.data || err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imageUrls.length === 0) return;

    const formData = {
      name: e.target.name.value,
      description: e.target.description.value,
      address: e.target.address.value,
      sell: e.target.sell.checked,
      rent: e.target.rent.checked,
      parking: e.target.parking.checked,
      furnished: e.target.furnished.checked,
      offer: e.target.offer.checked,
      bedrooms: e.target.bedrooms.value,
      bathrooms: e.target.bathrooms.value,
      regularPrice: e.target.regularPrice.value,
      discountPrice: e.target.discountPrice.value,
      images: imageUrls,
    };

    console.log("Listing created:", formData);
  };

  return (
    <div className="min-h-screen bg-[var(--color-brand-dark)] text-[var(--color-text-on-dark)] p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Create Listing
          </h1>
          <div className="w-16 h-1 bg-[var(--color-brand-primary)] mx-auto rounded"></div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
        >
          {/* LEFT - Property Details */}
          <div className="bg-[var(--color-surface-2)] rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-5 border-b border-[var(--color-border)] pb-3">
              Property Details
            </h2>

            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Property Name"
                name="name"
                maxLength="62"
                minLength="10"
                required
                className="w-full h-11 bg-[var(--color-input-bg)] text-[var(--color-text-on-dark)] placeholder-[var(--color-text-muted)] border border-[var(--color-border)] focus:border-[var(--color-brand-primary)] px-3 rounded-lg transition"
              />
              <textarea
                placeholder="Description"
                name="description"
                required
                rows="3"
                className="w-full bg-[var(--color-input-bg)] text-[var(--color-text-on-dark)] placeholder-[var(--color-text-muted)] border border-[var(--color-border)] focus:border-[var(--color-brand-primary)] px-3 py-2 rounded-lg transition resize-none"
              />
              <input
                type="text"
                placeholder="Address"
                name="address"
                required
                className="w-full h-11 bg-[var(--color-input-bg)] text-[var(--color-text-on-dark)] placeholder-[var(--color-text-muted)] border border-[var(--color-border)] focus:border-[var(--color-brand-primary)] px-3 rounded-lg transition"
              />
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Features</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {["Sell", "Rent", "Parking", "Furnished", "Offer"].map(
                  (item) => (
                    <label
                      key={item}
                      className="flex items-center gap-2 p-2 bg-[var(--color-input-bg)] rounded-lg cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        name={item.toLowerCase()}
                        className="w-4 h-4 accent-[var(--color-brand-primary)]"
                      />
                      <span className="text-sm">{item}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Rooms</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "bedrooms", label: "Beds" },
                  { name: "bathrooms", label: "Baths" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="text-sm text-[var(--color-text-muted)] mb-2 block">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      name={field.name}
                      min="1"
                      max="10"
                      required
                      className="w-full h-11 bg-[var(--color-input-bg)] text-[var(--color-text-on-dark)] border border-[var(--color-border)] focus:border-[var(--color-brand-primary)] px-3 rounded-lg transition"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT - Pricing & Images */}
          <div className="space-y-6">
            {/* Pricing */}
            <div className="bg-[var(--color-surface-2)] rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-5 border-b border-[var(--color-border)] pb-3">
                Pricing
              </h2>
              <div className="space-y-4">
                {[
                  { name: "regularPrice", label: "Regular Price" },
                  { name: "discountPrice", label: "Discounted Price" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="text-sm text-[var(--color-text-muted)] mb-2 block">
                      {field.label} <span className="text-xs">($ / month)</span>
                    </label>
                    <input
                      type="number"
                      name={field.name}
                      min="1"
                      max="10000"
                      required
                      className="w-full h-11 bg-[var(--color-input-bg)] text-[var(--color-text-on-dark)] border border-[var(--color-border)] focus:border-[var(--color-brand-primary)] px-3 rounded-lg transition"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Images */}
            <div className="bg-[var(--color-surface-2)] rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-5 border-b border-[var(--color-border)] pb-3">
                Images
              </h2>

              <label className="w-full flex flex-col items-center py-6 bg-[var(--color-brand-accent)] text-[var(--color-brand-dark)] rounded-lg border-2 border-dashed border-[var(--color-brand-primary)] cursor-pointer hover:bg-yellow-400 transition mb-4">
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 bg-[var(--color-brand-dark)] rounded-full flex items-center justify-center">
                    <span>📸</span>
                  </div>
                  <span className="font-semibold">Select Images</span>
                  <span className="text-sm opacity-75">Max 6 images</span>
                </div>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
              </label>

              {/* Previews before upload */}
              {previews.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {previews.map((url, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={url}
                        alt={`preview-${idx}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeletePreview(idx)}
                        className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Uploaded images */}
              {imageUrls.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {imageUrls.map((url, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={url}
                        alt={`uploaded-${idx}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteUploaded(url)}
                        className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {files.length > 0 && (
                <button
                  type="button"
                  onClick={handleImageSubmit}
                  disabled={uploading}
                  className="w-full mt-4 py-2 px-4 bg-[var(--color-brand-primary)] text-white font-semibold rounded-lg disabled:opacity-50 flex items-center justify-center"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    "Upload Images"
                  )}
                </button>
              )}
            </div>

            {/* Submit */}
            <div className="bg-[var(--color-surface-2)] rounded-2xl p-6">
              <button
                type="submit"
                className="relative group overflow-hidden bg-[var(--color-brand-secondary)] text-white font-bold py-4 px-6 rounded-xl uppercase w-full"
              >
                <span className="absolute inset-0 bg-[var(--color-brand-primary)] w-0 group-hover:w-full transition-all duration-500"></span>
                <span className="relative z-10">Create Listing</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatingListing;

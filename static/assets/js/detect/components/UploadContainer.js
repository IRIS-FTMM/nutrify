// UploadContainer.js
function UploadContainer() {
    return React.createElement(
        "div", 
        // Style dengan Tailwind
        { className: "upload-container bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 text-center flex flex-col items-center justify-center shadow-sm hover:border-blue-500 transition-all", id: "upload-container" },
        React.createElement("i", { "data-lucide": "upload-cloud", className: "w-16 h-16 text-gray-400 mb-4" }),
        React.createElement("h3", { className: "text-xl font-semibold text-gray-700 mb-2" }, "Unggah Gambar Makanan"),
        React.createElement("p", { className: "text-gray-500 mb-4" }, "Pilih gambar Anda atau tempel dari halaman informasi makanan (Ctrl+V)"),
        React.createElement("input", { type: "file", id: "file-input", accept: "image/*", className: "hidden" }),
        React.createElement("button", { className: "btn bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors", id: "upload-btn" },
            React.createElement("i", { "data-lucide": "folder-open", className: "w-5 h-5 mr-2 inline-block" }), 
            "Pilih File"
        )
    );
}
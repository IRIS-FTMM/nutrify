// CameraControls.js
function CameraControls() {
    return React.createElement(
        "div", 
        // Style dengan Tailwind
        { className: "camera-controls flex flex-col md:flex-row gap-4 justify-center p-4 bg-white rounded-lg shadow-lg", id: "camera-controls" },
        React.createElement("button", { className: "btn flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-lg", id: "capture-btn" },
            React.createElement("i", { "data-lucide": "camera", className: "w-6 h-6 mr-2" }), 
            "Ambil Gambar" // Terjemahan
        ),
        React.createElement("button", { className: "btn flex-1 bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center text-lg", id: "switch-camera" },
            React.createElement("i", { "data-lucide": "refresh-cw", className: "w-6 h-6 mr-2" }), 
            "Ganti Kamera" // Terjemahan
        )
    );
}
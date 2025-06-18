// CameraContainer.js
function CameraContainer() {
    return React.createElement(
        "div", 
        // Style dengan Tailwind
        { className: "camera-container bg-black rounded-lg shadow-lg overflow-hidden relative aspect-video", id: "camera-container" },
        // Perbaikan atribut: autoplay -> autoPlay, playsinline -> playsInline
        React.createElement("video", { id: "camera-feed", autoPlay: true, playsInline: true, className: "w-full h-full object-cover" }),
        React.createElement("div", { className: "camera-overlay absolute inset-0 flex items-center justify-center pointer-events-none" },
            React.createElement("div", { className: "overlay-circle border-4 border-dashed border-white/50 rounded-full w-64 h-64" })
        )
    );
}
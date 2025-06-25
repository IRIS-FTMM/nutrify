/**
 * app.js - Skrip Utama Aplikasi Deteksi Makanan
 * Versi 6: Tampilan Hasil Detail per Item (Model Daftar)
 * - Merombak `ResultsSection` untuk menampilkan kartu detail untuk setiap item yang terdeteksi.
 * - Setiap kartu hasil memiliki input ukuran saji (serving size) sendiri.
 * - Menjaga fungsionalitas timer kamera dan penanganan bounding box.
 */

// Pastikan skrip ini berjalan setelah elemen #root tersedia di DOM.
document.addEventListener('DOMContentLoaded', () => {
    // Pastikan komponen dari file lain sudah tersedia
    if (typeof Header === 'undefined' || typeof Footer === 'undefined') {
        console.error("Fatal Error: Komponen 'Header' atau 'Footer' tidak ditemukan. Pastikan file components/Header.js dan components/Footer.js sudah dimuat sebelum app.js.");
        return;
    }

    const container = document.getElementById('root');
    if (!container) {
        console.error("Fatal Error: Elemen dengan id 'root' tidak ditemukan.");
        return;
    }
    const root = ReactDOM.createRoot(container);

    // =========================================================================
    // == KOMPONEN-KOMPONEN UI LOKAL ==
    // =========================================================================

    function LoadingOverlay() {
        return React.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center z-[100]" },
            React.createElement("div", { className: "loader border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full w-12 h-12 animate-spin" }),
            React.createElement("p", { className: "text-white text-lg mt-4" }, "Menganalisis Makanan...")
        );
    }

    function ErrorModal({ message, onClose }) {
        React.useEffect(() => {
            lucide.createIcons();
        }, []);
        return React.createElement("div", {
            className: "fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[101] transition-opacity duration-300",
            onClick: onClose
        },
            React.createElement("div", {
                className: "bg-white rounded-lg shadow-2xl p-6 md:p-8 text-center max-w-sm mx-4 transform transition-all scale-100 opacity-100",
                onClick: e => e.stopPropagation()
            },
                React.createElement("div", { className: "mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4" },
                    React.createElement("i", { "data-lucide": "x-circle", className: "w-10 h-10 text-red-600" })
                ),
                React.createElement("h3", { className: "text-2xl font-bold text-gray-800" }, "Terjadi Kesalahan"),
                React.createElement("p", { className: "text-gray-600 my-4" }, message),
                React.createElement("button", {
                    onClick: onClose,
                    className: "btn bg-red-600 text-white px-8 py-2 rounded-lg hover:bg-red-700 transition-colors w-full"
                }, "Tutup")
            )
        );
    }

    // DetectHero.js
    function DetectHero() {
        React.useEffect(() => {
            lucide.createIcons();
        }, []);

        return React.createElement(
            "section",
            { className: "hero-bg min-h-[40vh] flex items-center relative overflow-hidden" },
            React.createElement("div", { className: "absolute inset-0 bg-black bg-opacity-20" }),
            React.createElement("div", { className: "container mx-auto px-6 py-16 relative z-10 text-center" },
                React.createElement("h1", { className: "text-4xl md:text-5xl font-bold mb-4 text-white" }, "Deteksi Makanan"),
                React.createElement("p", { className: "text-lg text-gray-200 max-w-xl mx-auto mb-6" },
                    "Temukan nilai gizi makanan Anda hanya dengan memindai atau mengunggah gambar. Informasi akurat secara instan!"
                ),
                React.createElement(
                    "div",
                    { className: "mt-6 flex flex-wrap gap-4 justify-center" },
                    // Group 1 (YOLO, Roboflow) - First row
                    React.createElement("span", { className: "inline-flex items-center gap-1 bg-red-600 text-white rounded-full px-4 py-2 text-lg font-medium" },
                        React.createElement("i", { "data-lucide": "camera", className: "w-5 h-5 mr-2" }),
                        "YOLOv12 (Deteksi Gambar)"
                    ),
                    React.createElement("span", { className: "inline-flex items-center gap-1 bg-purple-600 text-white rounded-full px-4 py-2 text-lg font-medium" },
                        React.createElement("i", { "data-lucide": "zap", className: "w-5 h-5 mr-2" }),
                        "Roboflow (Model Training & Deployment)"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "flex flex-wrap gap-4 justify-center mt-4" }, // Group 2 (FatSecret, Gemini AI) - Second row
                    React.createElement("span", { className: "inline-flex items-center gap-1 bg-green-600 text-white rounded-full px-4 py-2 text-lg font-medium" },
                        React.createElement("i", { "data-lucide": "bar-chart-3", className: "w-5 h-5 mr-2" }),
                        "FatSecret (Info Nutrisi)"
                    ),
                    React.createElement("span", { className: "inline-flex items-center gap-1 bg-blue-600 text-white rounded-full px-4 py-2 text-lg font-medium" },
                        React.createElement("i", { "data-lucide": "sparkles", className: "w-5 h-5 mr-2" }),
                        "Gemini AI (Nasihat Gizi)"
                    )
                )
            )
        );
    }




    function ScanSection({ onCameraSelect, onUploadSelect }) {
        return React.createElement("section", { className: "pt-16 pb-8" },
            React.createElement("div", { className: "container mx-auto px-6 text-center max-w-xl" },
                React.createElement("h3", { className: "text-2xl font-bold text-gray-800 mb-4" }, "Mulai Deteksi"),
                React.createElement("p", { className: "text-gray-600 mb-6" }, "Pilih salah satu mode di bawah ini untuk memulai analisis nutrisi."),
                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
                    React.createElement("div", { onClick: onCameraSelect, className: "flex flex-col items-center bg-white p-6 rounded-lg shadow hover:shadow-lg hover:scale-105 transition-all cursor-pointer" }, React.createElement("div", { className: "w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg mb-3" }, React.createElement("i", { "data-lucide": "camera", className: "w-6 h-6 text-blue-600" })), React.createElement("h4", { className: "text-lg font-semibold text-gray-800 mb-1 text-center" }, "Pindai dengan Kamera"), React.createElement("p", { className: "text-gray-600 text-sm text-center" }, "Gunakan kamera perangkat Anda.")),
                    React.createElement("div", { onClick: onUploadSelect, className: "flex flex-col items-center bg-white p-6 rounded-lg shadow hover:shadow-lg hover:scale-105 transition-all cursor-pointer" }, React.createElement("div", { className: "w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg mb-3" }, React.createElement("i", { "data-lucide": "image", className: "w-6 h-6 text-blue-600" })), React.createElement("h4", { className: "text-lg font-semibold text-gray-800 mb-1 text-center" }, "Unggah Gambar"), React.createElement("p", { className: "text-gray-600 text-sm text-center" }, "Pilih foto dari perangkat Anda."))
                )
            )
        );
    }

    function UploadContainer({ onFileSelect }) {
        const fileInputRef = React.useRef(null);
        const handleButtonClick = () => fileInputRef.current.click();
        const handleFileChange = (e) => { if (e.target.files && e.target.files[0]) onFileSelect(e.target.files[0]); };
        React.useEffect(() => {
            const handlePaste = (e) => {
                const items = (e.clipboardData || window.clipboardData).items;
                for (let i = 0; i < items.length; i++) {
                    if (items[i].type.indexOf('image') !== -1) {
                        onFileSelect(items[i].getAsFile());
                        break;
                    }
                }
            };
            document.addEventListener('paste', handlePaste);
            return () => document.removeEventListener('paste', handlePaste);
        }, [onFileSelect]);
        return React.createElement("div", { className: "upload-container bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 text-center flex flex-col items-center justify-center shadow-sm hover:border-blue-500 transition-all" },
            React.createElement("i", { "data-lucide": "upload-cloud", className: "w-16 h-16 text-gray-400 mb-4" }),
            React.createElement("h3", { className: "text-xl font-semibold text-gray-700 mb-2" }, "Unggah atau Tempel Gambar"),
            React.createElement("p", { className: "text-gray-500 mb-4" }, "Pilih file atau tempel dari clipboard (Ctrl+V)"),
            React.createElement("input", { type: "file", ref: fileInputRef, onChange: handleFileChange, accept: "image/*", className: "hidden" }),
            React.createElement("button", { onClick: handleButtonClick, className: "btn bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors" }, React.createElement("i", { "data-lucide": "folder-open", className: "w-5 h-5 mr-2 inline-block" }), "Pilih File")
        );
    }

    function CameraInterface({ onAnalyze }) {
        const videoRef = React.useRef(null);
        const [facingMode, setFacingMode] = React.useState('environment');
        const [isDetecting, setIsDetecting] = React.useState(false);
        const [countdown, setCountdown] = React.useState(5);
        const detectionTimerRef = React.useRef(null);
        const countdownIntervalRef = React.useRef(null);

        const startCamera = async () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facingMode, width: 1280, height: 720 } });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
            } catch (error) {
                console.error("Error mengakses kamera:", error);
            }
        };

        React.useEffect(() => {
            startCamera();
            return () => {
                if (videoRef.current && videoRef.current.srcObject) {
                    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
                }
                clearInterval(countdownIntervalRef.current);
                clearTimeout(detectionTimerRef.current);
            };
        }, [facingMode]);

        const captureFrame = () => {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            return new Promise(resolve => canvas.toBlob(blob => resolve(blob), 'image/jpeg'));
        };

        const startDetectionProcess = async () => {
            if (isDetecting) return;

            setIsDetecting(true);
            setCountdown(3);

            countdownIntervalRef.current = setInterval(() => {
                setCountdown(prev => prev > 1 ? prev - 1 : 0);
            }, 1000);

            detectionTimerRef.current = setTimeout(async () => {
                clearInterval(countdownIntervalRef.current);
                const imageBlob = await captureFrame();
                onAnalyze(imageBlob);
                setIsDetecting(false);
            }, 3000);
        };

        const handleSwitchCamera = () => {
            setFacingMode(prev => (prev === 'environment' ? 'user' : 'environment'));
        };

        return React.createElement("div", { className: "space-y-4" },
            React.createElement("div", { className: "camera-container bg-black rounded-lg shadow-lg overflow-hidden relative aspect-video" },
                React.createElement("video", { ref: videoRef, autoPlay: true, playsInline: true, className: "w-full h-full object-cover" }),
                isDetecting && React.createElement("div", { className: "absolute inset-0 flex items-center justify-center bg-black bg-opacity-50" },
                    React.createElement("div", { className: "text-white text-6xl font-bold" }, countdown)
                ),
                React.createElement("div", { className: "camera-overlay absolute inset-0 flex items-center justify-center pointer-events-none" },
                    !isDetecting && React.createElement("div", { className: "overlay-circle border-4 border-dashed border-white/50 rounded-full w-64 h-64" })
                )
            ),
            React.createElement("div", { className: "camera-controls flex flex-col md:flex-row gap-4 justify-center" },
                React.createElement("button", { onClick: startDetectionProcess, disabled: isDetecting, className: "btn flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-lg disabled:bg-gray-400" }, React.createElement("i", { "data-lucide": "scan-line", className: "w-6 h-6 mr-2" }), isDetecting ? "Mendeteksi..." : "Mulai Deteksi"),
                React.createElement("button", { onClick: handleSwitchCamera, disabled: isDetecting, className: "btn flex-1 bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center text-lg disabled:bg-gray-400" }, React.createElement("i", { "data-lucide": "refresh-cw", className: "w-6 h-6 mr-2" }), "Ganti Kamera")
            )
        );
    }

    function DetectionResultItem({ detection }) {
        const nutrition = detection.nutrition || {};

        // Ambil basis perhitungan dari backend
        const baseAmount = parseFloat(nutrition.base_amount) || (nutrition.serving_unit === 'gram' ? 100 : 1);
        const [servingAmount, setServingAmount] = React.useState(baseAmount);

        const baseCalories = parseFloat(nutrition.calories) || 0;
        const baseProtein = parseFloat(nutrition.protein) || 0;
        const baseCarbs = parseFloat(nutrition.carbohydrates) || 0;
        const baseFat = parseFloat(nutrition.fat) || 0;

        const servingUnit = nutrition.serving_unit || 'satuan';
        const displayUnit = nutrition.serving_description || 'per sajian';

        let displayUnitLabel = `Jumlah (${nutrition.display_unit || servingUnit})`;
        if (servingUnit === 'gram') {
            displayUnitLabel = 'Ukuran Saji (gram)';
        }

        // Kalkulasi rasio yang lebih pintar
        const ratio = servingAmount / baseAmount;

        // ... sisa dari komponen (bagian return) tetap sama seperti sebelumnya ...
        // Pastikan input `onChange` dan `value` menggunakan `servingAmount`
        // Dan labelnya menggunakan `displayUnitLabel`
        return React.createElement("div", { className: "bg-white p-6 rounded-lg shadow-md border border-gray-200" },
            React.createElement("div", { className: "flex justify-between items-start mb-2" },
                React.createElement("h4", { className: "text-xl font-bold text-gray-800 capitalize" }, detection.label),
                React.createElement("span", { className: "text-sm font-medium text-white bg-blue-500 px-3 py-1 rounded-full" }, `Akurasi: ${(detection.confidence * 100).toFixed(0)}%`)
            ),
            React.createElement("p", { className: "text-xs text-gray-500 mb-4" }, `Info nutrisi berdasarkan: ${displayUnit}`),
            React.createElement("table", { className: "nutrition-table w-full text-gray-700" },
                React.createElement("tbody", null,
                    React.createElement("tr", { className: "border-b" }, React.createElement("td", { className: "py-2" }, "Kalori"), React.createElement("td", { className: "font-bold text-right" }, (baseCalories * ratio).toFixed(0))),
                    React.createElement("tr", { className: "border-b" }, React.createElement("td", { className: "py-2" }, "Protein"), React.createElement("td", { className: "text-right" }, `${(baseProtein * ratio).toFixed(1)}g`)),
                    React.createElement("tr", { className: "border-b" }, React.createElement("td", { className: "py-2" }, "Karbohidrat"), React.createElement("td", { className: "text-right" }, `${(baseCarbs * ratio).toFixed(1)}g`)),
                    React.createElement("tr", { className: "border-b" }, React.createElement("td", { className: "py-2" }, "Lemak"), React.createElement("td", { className: "text-right" }, `${(baseFat * ratio).toFixed(1)}g`)),
                    React.createElement("tr", null,
                        React.createElement("td", { className: "py-2" }, displayUnitLabel),
                        React.createElement("td", { className: "text-right" },
                            React.createElement("input", {
                                type: "number",
                                min: "1",
                                value: servingAmount,
                                onChange: (e) => setServingAmount(Number(e.target.value) > 0 ? Number(e.target.value) : 1),
                                className: "w-24 text-right p-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            })
                        )
                    )
                )
            )
        );
    }

    function TotalNutritionSummary({ totalNutrition }) {
        if (!totalNutrition) return null;

        // Komponen kecil untuk setiap kartu nutrisi
        const StatCard = ({ label, value, unit, icon, colorClass }) => {
            React.useEffect(() => { lucide.createIcons(); }, []);
            return React.createElement("div", { className: `bg-white p-4 rounded-lg shadow-md border-l-4 ${colorClass}` },
                React.createElement("div", { className: "flex items-center" },
                    React.createElement("i", { "data-lucide": icon, className: "w-6 h-6 mr-3" }),
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-sm text-gray-600" }, label),
                        React.createElement("p", { className: "text-xl font-bold text-gray-800" }, `${value} ${unit}`)
                    )
                )
            );
        };
        
        return React.createElement("div", { className: "mt-12" },
            React.createElement("h3", { className: "text-2xl font-bold text-gray-800 border-b pb-2 mb-4" }, "Ringkasan Nutrisi Total"),
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" },
                React.createElement(StatCard, { label: "Total Kalori", value: totalNutrition.calories.toFixed(0), unit: "kkal", icon: "flame", colorClass: "border-red-500" }),
                React.createElement(StatCard, { label: "Total Protein", value: totalNutrition.protein.toFixed(1), unit: "g", icon: "beef", colorClass: "border-blue-500" }),
                React.createElement(StatCard, { label: "Total Karbohidrat", value: totalNutrition.carbohydrates.toFixed(1), unit: "g", icon: "send-to-back", colorClass: "border-yellow-500" }),
                React.createElement(StatCard, { label: "Total Lemak", value: totalNutrition.fat.toFixed(1), unit: "g", icon: "droplets", colorClass: "border-orange-500" })
            )
        );
    }

    // Ganti fungsi AiRecommendationsSection lama Anda dengan yang ini di app.js

    function AiRecommendationsSection({ recommendations }) {
        // --- BARU: State untuk mengontrol animasi loading ---
        const [isRevealing, setIsRevealing] = React.useState(false);

        // --- BARU: Komponen kecil untuk animasi loading ---
        const LoadingAI = () => {
            React.useEffect(() => { lucide.createIcons(); }, []);
            return React.createElement("div", { className: "flex flex-col items-center justify-center space-y-3 text-slate-500 py-8" },
                React.createElement("i", { "data-lucide": "brain-circuit", className: "w-10 h-10 text-indigo-400 animate-pulse" }),
                React.createElement("p", { className: "text-sm font-medium" }, "Gemini sedang meracik saran untukmu...")
            );
        };

        React.useEffect(() => {
            // Jangan jalankan efek jika tidak ada rekomendasi
            if (!recommendations || recommendations.length === 0) return;
            
            // --- BARU: Efek timer untuk menunda tampilan hasil ---
            // Atur ulang state setiap kali ada rekomendasi baru
            setIsRevealing(false); 

            // Atur timer untuk menampilkan hasil setelah 1.5 detik
            const timer = setTimeout(() => {
                setIsRevealing(true);
                // Panggil createIcons lagi setelah konten baru muncul
                setTimeout(() => lucide.createIcons(), 50); 
            }, 1500); // 1.5 detik delay

            // Bersihkan timer jika komponen di-unmount
            return () => clearTimeout(timer);
        }, [recommendations]);


        // Jangan render apapun jika tidak ada rekomendasi
        if (!recommendations || recommendations.length === 0) {
            return null;
        }

        // --- BARU: Tampilkan loading jika hasil belum siap ditampilkan ---
        if (!isRevealing) {
            return React.createElement("div", { className: "mt-12" },
                React.createElement("div", { className: "rounded-xl border border-slate-200 bg-slate-50 p-6" },
                    React.createElement(LoadingAI)
                )
            );
        }

        // Logika lama Anda untuk menampilkan hasil (sedikit dimodifikasi)
        const isError = recommendations[0].toLowerCase().includes("gagal") || recommendations[0].toLowerCase().includes("tidak dapat");
        const title = isError ? "Informasi Tambahan" : "Rekomendasi AI untuk Hidanganmu";
        const icon = isError ? "alert-triangle" : "brain-circuit";
        const themeClasses = isError ? "border-amber-300 bg-amber-50 text-amber-800" : "border-indigo-200 bg-indigo-50 text-slate-700";
        const iconColor = isError ? "text-amber-500" : "text-indigo-500";
        const checkIcon = isError ? "alert-circle" : "check-circle-2";

        return React.createElement("div", { className: "mt-12 animate-fade-in" },
            React.createElement("h3", { className: "text-2xl font-bold text-gray-800 flex items-center gap-3 border-b pb-2 mb-4" },
                React.createElement("i", { "data-lucide": icon, className: `w-7 h-7 ${iconColor}` }),
                title
            ),
            React.createElement("div", { className: `rounded-xl border p-6 ${themeClasses}` },
                React.createElement("ul", { className: "space-y-3" },
                    recommendations.map((tip, index) =>
                        React.createElement("li", { key: index, className: "flex items-start gap-3" },
                            React.createElement("i", { "data-lucide": checkIcon, className: `h-5 w-5 flex-shrink-0 mt-1 ${iconColor}` }),
                            React.createElement("span", null, tip)
                        )
                    )
                )
            )
        );
    }

    // Ganti fungsi ResultsSection Anda yang lama dengan yang ini

    function ResultsSection({ resultsData, onNewScan }) {
        if (!resultsData || !resultsData.detections || resultsData.detections.length === 0) {
            return null;
        }
    
        // <-- BARU: Ekstrak data baru dari resultsData
        const mainImage = resultsData.image_with_boxes;
        const allDetections = resultsData.detections;
        const totalNutrition = resultsData.total_nutrition;
        const aiRecommendations = resultsData.ai_recommendations;
    
        return React.createElement("section", { className: "results-section mt-12" },
            React.createElement("div", { className: "flex justify-between items-center mb-6" },
                React.createElement("h2", { className: "text-3xl font-bold text-gray-800" }, "Hasil Analisis"),
                React.createElement("button", { onClick: onNewScan, className: "btn bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center" }, 
                    React.createElement("i", { "data-lucide": "scan-line", className: "w-5 h-5 mr-2" }), 
                    "Pindai Baru"
                )
            ),
            
            React.createElement("div", { className: "mb-8 mx-auto max-w-lg" },
                React.createElement("img", { 
                    src: mainImage, 
                    alt: "Makanan yang dipindai dengan bounding box", 
                    className: "rounded-lg w-full h-auto object-cover shadow-lg"
                })
            ),
    
            React.createElement("div", { className: "space-y-6" },
                React.createElement("h3", {className: "text-2xl font-bold text-gray-800 border-b pb-2"}, `Ditemukan ${allDetections.length} Makanan`),
                allDetections.map((item, index) => React.createElement(DetectionResultItem, { key: index, detection: item }))
            ),

            // <-- BARU: Panggil komponen Total Nutrition Summary
            React.createElement(TotalNutritionSummary, { totalNutrition: totalNutrition }),

            // <-- BARU: Panggil komponen Rekomendasi AI
            React.createElement(AiRecommendationsSection, { recommendations: aiRecommendations })
        );
    }

    // =========================================================================
    // == KOMPONEN UTAMA APLIKASI (PENGATUR STATE DAN LOGIKA) ==
    // =========================================================================
    function App() {
        const [displayMode, setDisplayMode] = React.useState('selection');
        const [activeInterface, setActiveInterface] = React.useState('none');
        const [resultsData, setResultsData] = React.useState(null);
        const [isLoading, setIsLoading] = React.useState(false);
        const [errorMessage, setErrorMessage] = React.useState(null);

        const handleAnalyze = async (imageBlob) => {
            if (!imageBlob) {
                setErrorMessage("Tidak ada gambar yang dipilih untuk dianalisis.");
                return;
            }
            setIsLoading(true);
            setErrorMessage(null);
            const formData = new FormData();
            formData.append("file", imageBlob, "capture.jpg");

            try {
                const response = await fetch("/detect/image/", { method: "POST", body: formData });

                if (!response.ok) {
                    const errData = await response.json().catch(() => ({
                        detail: `Terjadi masalah di server. (Error: ${response.status})`
                    }));
                    if (errData.detail && errData.detail.includes("Tidak ada makanan yang terdeteksi")) {
                        throw new Error("Analisis Gagal: Tidak ada makanan yang dapat kami kenali pada gambar tersebut. Coba lagi dengan gambar yang lebih jelas.");
                    }
                    throw new Error(errData.detail || "Terjadi kesalahan yang tidak diketahui.");
                }

                const data = await response.json();

                if (!data.detections || data.detections.length === 0) {
                    throw new Error("Analisis Selesai: Namun, tidak ada jenis makanan yang cocok dalam database kami.");
                }

                setResultsData(data);
                setDisplayMode('results');

            } catch (error) {
                console.error("Error saat analisis:", error);
                setErrorMessage(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        const handleNewScan = () => {
            setDisplayMode('selection');
            setActiveInterface('none');
            setResultsData(null);
            setErrorMessage(null);
        };

        const handleInterfaceToggle = (interfaceName) => {
            setActiveInterface(prev => prev === interfaceName ? 'none' : interfaceName);
        };

        React.useEffect(() => {
            lucide.createIcons();
            if (typeof window.animateOnScroll === 'function') {
                window.animateOnScroll();
            }
        }, [displayMode, activeInterface, resultsData]);

        const renderMainContent = () => {
            if (displayMode === 'results') {
                return React.createElement(ResultsSection, { resultsData: resultsData, onNewScan: handleNewScan });
            }
            return React.createElement(React.Fragment, null,
                React.createElement(ScanSection, {
                    onCameraSelect: () => handleInterfaceToggle('camera'),
                    onUploadSelect: () => handleInterfaceToggle('upload'),
                }),
                React.createElement("div", { className: "mt-8 max-w-xl mx-auto mb-16" },
                    activeInterface === 'camera' && React.createElement(CameraInterface, { onAnalyze: handleAnalyze }),
                    activeInterface === 'upload' && React.createElement(UploadContainer, { onFileSelect: handleAnalyze })
                )
            );
        };

        return React.createElement(
            React.Fragment, null,
            isLoading && React.createElement(LoadingOverlay),
            errorMessage && React.createElement(ErrorModal, {
                message: errorMessage,
                onClose: () => setErrorMessage(null)
            }),
            React.createElement(Header, null),
            React.createElement("main", { className: "main-content" },
                React.createElement(DetectHero, null),
                React.createElement("div", { className: "container mx-auto px-6 pb-24" }, renderMainContent())
            ),
            React.createElement(Footer, null)
        );
    }

    // =========================================================================
    // == RENDER APLIKASI REACT KE DALAM DOM ==
    // =========================================================================
    root.render(React.createElement(App));
});
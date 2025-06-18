document.addEventListener('DOMContentLoaded', function () {
    const cameraOption   = document.getElementById('camera-option');
    const uploadOption   = document.getElementById('upload-option');
    const cameraContainer= document.getElementById('camera-container');
    const uploadContainer= document.getElementById('upload-container');
    const cameraControls = document.getElementById('camera-controls');
    const resultsSection = document.getElementById('results-section');
    const fileInput      = document.getElementById('file-input');
    const uploadBtn      = document.getElementById('upload-btn');
    const captureBtn     = document.getElementById('capture-btn');
    const switchCameraBtn= document.getElementById('switch-camera');
    const newScanBtn     = document.getElementById('new-scan-btn');
    const cameraFeed     = document.getElementById('camera-feed');
    const resultImage    = document.getElementById('result-image');
    let capturedBlob     = null;
    let stream           = null;
    let facingMode       = 'environment';

    let nutritionBase    = null;
    let servingBase      = 100;
    let servingInput     = null;

    // --- INITIAL STATE ---
    function resetToInitialState() {
        [cameraOption, uploadOption].forEach(el => el.classList.remove('active'));
        [cameraContainer, uploadContainer].forEach(el => el.classList.remove('active'));
        cameraControls.style.display = 'none';
        resultsSection.classList.remove('active');
        resultImage.src = "https://via.placeholder.com/400x400";
        ['food-name','food-description','calories','protein','carbs','fats'].forEach(id => {
            document.getElementById(id).textContent = id==='calories'?'-':'-';
        });
        servingInput = document.getElementById('serving-input');
        if(servingInput) servingInput.value = 100;
        if (stream) { stream.getTracks().forEach(track => track.stop()); stream = null; }
        capturedBlob = null;
    }
    resetToInitialState();

    // --- TOGGLE CAMERA / UPLOAD ---
    cameraOption.addEventListener('click', () => {
        cameraOption.classList.add('active');
        uploadOption.classList.remove('active');
        cameraContainer.classList.add('active');
        uploadContainer.classList.remove('active');
        cameraControls.style.display = 'flex';
        resultsSection.classList.remove('active');
        if (!stream) initCamera();
    });

    uploadOption.addEventListener('click', () => {
        uploadOption.classList.add('active');
        cameraOption.classList.remove('active');
        uploadContainer.classList.add('active');
        cameraContainer.classList.remove('active');
        cameraControls.style.display = 'none';
        resultsSection.classList.remove('active');
        if (stream) { stream.getTracks().forEach(track => track.stop()); stream = null; }
    });

    // --- UPLOAD BUTTON & FILE INPUT ---
    uploadBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
        if (!e.target.files.length) return;
        capturedBlob = e.target.files[0];
        const reader = new FileReader();
        reader.onload = event => {
            resultImage.src = event.target.result;
            analyzeFood();
        };
        reader.readAsDataURL(capturedBlob);
    });

    // --- PASTE SUPPORT ---
    document.addEventListener('paste', function(e) {
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') === 0) {
                capturedBlob = items[i].getAsFile();
                const url = URL.createObjectURL(capturedBlob);
                resultImage.src = url;
                analyzeFood();
                e.preventDefault();
                break;
            }
        }
    });

    // --- CAMERA INIT / SWITCH / CAPTURE ---
    function initCamera() {
        navigator.mediaDevices.getUserMedia({ video: { facingMode }}).then(s => { 
            stream = s; cameraFeed.srcObject = s;
        }).catch(err => { alert("Camera error: " + err); });
    }
    switchCameraBtn.addEventListener('click', () => {
        facingMode = facingMode === 'user' ? 'environment' : 'user';
        if (stream) { stream.getTracks().forEach(t => t.stop()); stream = null; }
        initCamera();
    });
    captureBtn.addEventListener('click', () => {
        const canvas = document.createElement('canvas');
        canvas.width = cameraFeed.videoWidth;
        canvas.height = cameraFeed.videoHeight;
        canvas.getContext('2d').drawImage(cameraFeed, 0, 0);
        canvas.toBlob(blob => {
            capturedBlob = blob;
            resultImage.src = URL.createObjectURL(blob);
            analyzeFood();
        }, 'image/jpeg');
    });

    // --- NEW SCAN ---
    newScanBtn.addEventListener('click', resetToInitialState);

    // --- DRAW BOUNDING BOXES FUNCTION ---
    function drawBoundingBoxes(detections, imageElement) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = imageElement.width;
        canvas.height = imageElement.height;

        detections.forEach(det => {
            // Ensure bounding_box exists before drawing
            if (det.bounding_box) {
                const { x, y, width, height } = det.bounding_box;
                ctx.strokeStyle = 'green';
                ctx.lineWidth = 2;
                ctx.strokeRect(x, y, width, height);  // Draw bounding box

                // Display label and confidence
                ctx.font = '16px Arial';
                ctx.fillStyle = 'green';
                // Kesalahan: Kurang tanda kutip pada string template
                ctx.fillText(`${det.label} ${Math.round(det.confidence * 100)}%`, x, y - 10);  // Display label
            } else {
                console.warn("Bounding box not found for:", det);
            }
        });

        imageElement.parentElement.appendChild(canvas);  // Add canvas on top of the image
    }

    // --- ANALYZE FOOD FUNCTION ---
    // This function is triggered once the image is uploaded or captured
    async function analyzeFood() {
        const formData = new FormData();
        const capturedBlob = fileInput.files[0];
        if (!capturedBlob) return;
    
        formData.append("file", capturedBlob);
    
        try {
            const response = await fetch("/detect-food/", { method: "POST", body: formData });
            if (!response.ok) throw new Error("API error");
    
            const data = await response.json();
            if (!data.detections || data.detections.length === 0) {
                alert("No food detected.");
                return;
            }
    
            const detections = data.detections;
            const best = detections[0];
    
            // Update the results section with food info
            document.getElementById("food-name").textContent = best.label || "Unknown Food";
            document.getElementById("food-description").textContent = `Confidence: ${(best.confidence * 100).toFixed(1)}%`;
    
            // Nutrition and tips can be displayed as usual
            const nutrition = best.nutrition || {};
            document.getElementById('calories').textContent = nutrition.calories ? nutrition.calories + " kcal" : "Not available";
            document.getElementById('protein').textContent = nutrition.protein ? nutrition.protein + "g" : "Not available";
            document.getElementById('carbs').textContent = nutrition.carbohydrates ? nutrition.carbohydrates + "g" : "Not available";
            document.getElementById('fats').textContent = (nutrition.fats || nutrition.fat) ? (nutrition.fats || nutrition.fat) + "g" : "Not available";
    
            // Update the result image source with the path to the image with bounding boxes
            resultImage.src = data.image_with_boxes;  // This is the path to the image with bounding boxes
    
            resultsSection.classList.add('active');
        } catch (error) {
            alert("Error analyzing food: " + error.message);
        }
    }
    

    
});
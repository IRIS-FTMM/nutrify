function CalorieForm() {
  const [hasil, setHasil] = React.useState(null);
  const [tips, setTips] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const formRef = React.useRef(null);
  const resultRef = React.useRef(null);

  React.useEffect(() => {
      if (hasil && resultRef.current) {
          resultRef.current.scrollIntoView({ behavior: "smooth" });
          setTimeout(() => {
              if (window.lucide) {
                  lucide.createIcons();
              }
              if (window.animateOnScroll) {
                  animateOnScroll();
              }
          }, 150);
      }
  }, [hasil]);

  function hitungKalori(e) {
      e.preventDefault();
      setLoading(true);
      setHasil(null);
      setTips([]);

      const fd = new FormData(e.target);
      const gender = fd.get('gender');
      const age = Number(fd.get('age'));
      const height = Number(fd.get('height'));
      const weight = Number(fd.get('weight'));
      const activity = Number(fd.get('activity'));
      const goal = fd.get('goal');

      if (isNaN(age) || age < 1 || age > 120) {
          alert("Usia harus antara 1-120 tahun");
          setLoading(false);
          return;
      }
      if (isNaN(height) || height < 50 || height > 250) {
          alert("Tinggi badan harus antara 50-250 cm");
          setLoading(false);
          return;
      }
      if (isNaN(weight) || weight < 10 || weight > 300) {
          alert("Berat badan harus antara 10-300 kg");
          setLoading(false);
          return;
      }
      
      let bmr;
      if (gender === 'male') {
          bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      } else {
          bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      }
      
      const tdee = bmr * activity;
      let goalCalories = tdee;
      let goalTitle = '';
      // 'goalDesc' dihapus dari sini agar tidak dikirim ke CalorieResult

      if (goal === 'lose') {
          goalCalories = tdee - 500;
          goalTitle = "Turun Berat Badan";
      } else if (goal === 'gain') {
          goalCalories = tdee + 500;
          goalTitle = "Naik Berat Badan";
      } else {
          goalTitle = "Pertahankan Berat Badan";
      }

      const hasilPerhitungan = {
          bmr: Math.round(bmr),
          tdee: Math.round(tdee),
          goalCalories: Math.round(goalCalories),
          goalTitle
      };
      setHasil(hasilPerhitungan);

      fetch("/generate-calorie-tips/", {
          method: "POST",
          headers: { 
              "Content-Type": "application/json",
              "X-CSRFToken": document.cookie.match(/csrftoken=([^;]+)/)?.[1] || ""
          },
          body: JSON.stringify({
              gender, age, height, weight, activity, goal,
              tdee: hasilPerhitungan.tdee,
              goal_calories: hasilPerhitungan.goalCalories
          })
      })
      .then(res => res.json())
      .then(data => setTips(data.tips || []))
      .catch(error => {
          console.error("Fetch error:", error);
          setTips(["Gagal memuat tips. Silakan coba lagi nanti."]);
      })
      .finally(() => setLoading(false));
  }

  function resetForm() {
      setHasil(null);
      setTips([]);
      if (formRef.current) formRef.current.reset();
  }

  return React.createElement(
      "section", { className: "py-12 bg-blue-50" },
      React.createElement("div", { className: "container mx-auto px-6 max-w-2xl" },
          React.createElement("form", { 
              className: "bg-white rounded-xl shadow-lg p-8 space-y-6 fade-in", 
              onSubmit: hitungKalori, 
              ref: formRef 
          },
              React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
                  React.createElement("div", null,
                      React.createElement("label", { className: "block mb-2 font-semibold" }, "Jenis Kelamin"),
                      React.createElement("select", { name: "gender", className: "w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent", required: true },
                          React.createElement("option", { value: "" }, "Pilih..."),
                          React.createElement("option", { value: "male" }, "Laki-laki"),
                          React.createElement("option", { value: "female" }, "Perempuan")
                      )
                  ),
                  React.createElement("div", null,
                      React.createElement("label", { className: "block mb-2 font-semibold" }, "Usia (tahun)"),
                      React.createElement("input", { type: "number", name: "age", className: "w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent", min: 1, max: 120, required: true, placeholder: "Masukkan usia" })
                  ),
                  React.createElement("div", null,
                      React.createElement("label", { className: "block mb-2 font-semibold" }, "Tinggi Badan (cm)"),
                      React.createElement("input", { type: "number", name: "height", className: "w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent", min: 50, max: 250, required: true, placeholder: "Masukkan tinggi" })
                  ),
                  React.createElement("div", null,
                      React.createElement("label", { className: "block mb-2 font-semibold" }, "Berat Badan (kg)"),
                      React.createElement("input", { type: "number", name: "weight", className: "w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent", min: 10, max: 300, required: true, placeholder: "Masukkan berat" })
                  ),
                  React.createElement("div", { className: "md:col-span-2" },
                      React.createElement("label", { className: "block mb-2 font-semibold" }, "Aktivitas Harian"),
                      React.createElement("select", { name: "activity", className: "w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent", required: true },
                          React.createElement("option", { value: "" }, "Pilih tingkat aktivitas..."),
                          React.createElement("option", { value: "1.2" }, "Sangat ringan (jarang olahraga)"),
                          React.createElement("option", { value: "1.375" }, "Ringan (1-3x/minggu)"),
                          React.createElement("option", { value: "1.55" }, "Cukup (3-5x/minggu)"),
                          React.createElement("option", { value: "1.725" }, "Berat (6-7x/minggu)"),
                          React.createElement("option", { value: "1.9" }, "Sangat berat (kerja fisik/olahraga intens tiap hari)")
                      )
                  ),
                  React.createElement("div", { className: "md:col-span-2" },
                      React.createElement("label", { className: "block mb-2 font-semibold" }, "Tujuan"),
                      React.createElement("select", { name: "goal", className: "w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent", required: true },
                          React.createElement("option", { value: "" }, "Pilih tujuan..."),
                          React.createElement("option", { value: "lose" }, "Turun berat badan"),
                          React.createElement("option", { value: "maintain" }, "Pertahankan berat badan"),
                          React.createElement("option", { value: "gain" }, "Naik berat badan")
                      )
                  )
              ),
              React.createElement("div", { className: "flex gap-4 justify-center" },
                  React.createElement("button", { type: "submit", className: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md flex items-center", disabled: loading },
                      loading ? 
                          React.createElement(React.Fragment, null, React.createElement("i", { "data-lucide": "loader", className: "w-5 h-5 mr-2 animate-spin" }), "Menghitung...")
                      : 
                          React.createElement(React.Fragment, null, React.createElement("i", { "data-lucide": "calculator", className: "w-5 h-5 mr-2" }), "Hitung Kalori")
                  ),
                  React.createElement("button", { type: "button", className: "bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-all", onClick: resetForm }, "Reset")
              )
          ),
          hasil && React.createElement(CalorieResult, { hasil, tips, loading, resultRef })
      )
  );
}
document.addEventListener("DOMContentLoaded", () => {
    const calendarDays = document.getElementById("calendarDays");
    const monthYearText = document.getElementById("calendarMonthYear");
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");
    const facilityCards = document.querySelectorAll(".facility-card");
    const searchInput = document.getElementById("searchFacility");
    const kategoriSelect = document.getElementById("kategori");

    let currentDate = new Date();
    let selectedFacilityId = null; 

    // TANGKAP DATA DENGAN AMAN
    const metaTag = document.getElementById('jadwal-data');
    let bookedDates = {};
    
    try {
        if (metaTag) {
            const rawData = metaTag.getAttribute('data-booking');
            bookedDates = rawData ? JSON.parse(rawData) : {};
            
            // TAMBAHKAN BARIS INI UNTUK DEBUGGING
            console.log("Data Booking dari Server:", bookedDates);
        }
    } catch (error) {
        console.error("Gagal membaca data jadwal dari Laravel:", error);
        bookedDates = {}; // Fallback aman jika terjadi error
    }

    // 2. INISIALISASI AWAL: Otomatis pilih fasilitas paling atas saat halaman dimuat
    if (facilityCards.length > 0) {
        selectedFacilityId = facilityCards[0].getAttribute("data-id");
        facilityCards[0].classList.remove("border-sipborder", "bg-sipbg");
        facilityCards[0].classList.add("border-sipblue", "bg-sipblue/5");
    }

    // 3. FUNGSI MENGGAMBAR KALENDER
    function renderCalendar(date) {
        calendarDays.innerHTML = "";
        
        const year = date.getFullYear();
        const month = date.getMonth();
        const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        
        monthYearText.textContent = `${monthNames[month]} ${year}`;

        let firstDay = new Date(year, month, 1).getDay();
        firstDay = firstDay === 0 ? 6 : firstDay - 1; // Senin = 0

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        
        // Ambil daftar tanggal merah khusus untuk fasilitas yang sedang dipilih
        const currentFacilityBookings = selectedFacilityId ? (bookedDates[selectedFacilityId] || []) : [];

        // Buat kotak kosong untuk hari sebelum tanggal 1
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement("div");
            emptyDiv.className = "h-12 md:h-16 rounded-xl bg-transparent border border-transparent";
            calendarDays.appendChild(emptyDiv);
        }

        // Buat kotak tanggal
        for (let i = 1; i <= daysInMonth; i++) {
            const dayDiv = document.createElement("div");
            dayDiv.className = "h-12 md:h-16 rounded-xl flex flex-col items-center justify-center text-sm font-semibold transition-all border relative cursor-pointer";

            // Format tanggal (YYYY-MM-DD) agar cocok dengan database Laravel
            const currentCellDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const isPast = new Date(year, month, i) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
            
            let statusHTML = "";

            if (isPast) {
                // TANGGAL SUDAH LEWAT
                dayDiv.classList.add("bg-sipbg/50", "text-gray-600", "border-transparent", "cursor-not-allowed");
            } else {
                // CEK APAKAH TANGGAL INI ADA DI DATABASE
                if (currentFacilityBookings.includes(currentCellDate)) {
                    // PENUH / BOOKED (MERAH)
                    dayDiv.classList.add("bg-sipred/10", "text-white", "border-sipred/50");
                    statusHTML = `<span class="w-1.5 h-1.5 rounded-full bg-sipred absolute bottom-2 shadow-[0_0_5px_#DE2828]"></span>`;
                    dayDiv.title = "Fasilitas Penuh / Diblokir";
                    
                    // Alert seperti di script lama Anda
                    dayDiv.addEventListener('click', () => {
                        alert("Maaf, fasilitas pada tanggal ini sudah penuh/diblokir oleh Admin.");
                    });
                } else {
                    // TERSEDIA (HIJAU)
                    dayDiv.classList.add("bg-[#00AE1C]/10", "text-white", "border-[#00AE1C]/50");
                    statusHTML = `<span class="w-1.5 h-1.5 rounded-full bg-[#00AE1C] absolute bottom-2 shadow-[0_0_5px_#00AE1C]"></span>`;
                    dayDiv.title = "Tersedia untuk dipinjam";
                }
            }

            // Highlight biru khusus hari ini
            if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
                dayDiv.classList.add("ring-2", "ring-sipblue");
            }

            dayDiv.innerHTML = `<span>${i}</span> ${statusHTML}`;
            calendarDays.appendChild(dayDiv);
        }
    }

    // 4. NAVIGASI BULAN
    prevMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    // 5. EFEK KLIK PADA KARTU FASILITAS
    facilityCards.forEach(card => {
        card.addEventListener("click", function() {
            // Hapus efek aktif dari semua kartu
            facilityCards.forEach(c => {
                c.classList.remove("border-sipblue", "bg-sipblue/5");
                c.classList.add("border-sipborder", "bg-sipbg");
            });

            // Berikan efek aktif ke kartu yang diklik
            this.classList.remove("border-sipborder", "bg-sipbg");
            this.classList.add("border-sipblue", "bg-sipblue/5");

            // SIMPAN ID DAN PERBARUI KALENDER SECARA INSTAN!
            selectedFacilityId = this.getAttribute("data-id");
            renderCalendar(currentDate);
        });
    });

    // 6. FITUR PENCARIAN & FILTER KATEGORI
    function filterFacilities() {
        const searchTerm = searchInput.value.toLowerCase();
        const categoryTerm = kategoriSelect.value.toLowerCase();
        let firstVisibleCard = null; // Menyimpan kartu pertama yang muncul

        facilityCards.forEach(card => {
            const name = card.getAttribute("data-nama");
            const category = card.getAttribute("data-kategori");
            
            const matchName = name.includes(searchTerm);
            const matchCategory = categoryTerm === "semua" || category === categoryTerm;

            if (matchName && matchCategory) {
                card.style.display = "flex";
                if (!firstVisibleCard) firstVisibleCard = card;
            } else {
                card.style.display = "none";
            }
        });

        // Fitur canggih: Otomatis klik kartu teratas hasil pencarian
        if (firstVisibleCard && !firstVisibleCard.classList.contains("border-sipblue")) {
            firstVisibleCard.click();
        }
    }

    searchInput.addEventListener("keyup", filterFacilities);
    kategoriSelect.addEventListener("change", filterFacilities);

    // 7. JALANKAN KALENDER PERTAMA KALI SAAT HALAMAN DIBUKA
    renderCalendar(currentDate);
});
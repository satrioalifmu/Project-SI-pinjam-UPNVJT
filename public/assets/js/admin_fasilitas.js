// Logika Konfirmasi Hapus Fasilitas
function konfirmasiHapus(button) {
    Swal.fire({
        title: 'Hapus Fasilitas?',
        text: "Data yang sudah dihapus tidak bisa dikembalikan!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DE2828',
        confirmButtonText: '<i class="fas fa-trash mr-1"></i> Ya, Hapus!',
        cancelButtonText: 'Batal',
        background: '#16181e',
        color: '#fff',
        customClass: {
            confirmButton: 'rounded-xl font-bold px-6 py-2.5',
            cancelButton: 'rounded-xl font-bold px-6 py-2.5',
            popup: 'rounded-3xl border border-gray-700'
        }
    }).then((result) => {
        if (result.isConfirmed) button.closest('form').submit();
    });
}

// Logika Buka Modal Edit dengan Desain UI yang Lebih Baik
function bukaModalEdit(id, nama, kategori, kapasitas, ikon) {
    Swal.fire({
        title: 'Edit Fasilitas',
        background: '#16181e',
        color: '#fff',
        width: '600px',
        html: `
            <form id="formEdit" method="POST" action="${window.updateFasilitasUrl}" enctype="multipart/form-data" class="text-left space-y-5 mt-4">
                <input type="hidden" name="_token" value="${window.csrfToken}">
                <input type="hidden" name="id_edit" value="${id}">
                
                <div>
                    <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Nama Fasilitas</label>
                    <input type="text" name="nama" value="${nama}" class="w-full bg-[#2d3240] border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#009EF7] transition-all text-sm">
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Kategori</label>
                        <select name="kategori" class="w-full bg-[#2d3240] border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#009EF7] transition-all text-sm">
                            <option value="gsg" ${kategori == 'gsg' ? 'selected' : ''}>GSG</option>
                            <option value="lab" ${kategori == 'lab' ? 'selected' : ''}>Lab</option>
                            <option value="kelas" ${kategori == 'kelas' ? 'selected' : ''}>Kelas</option>
                            <option value="rapat" ${kategori == 'rapat' ? 'selected' : ''}>Ruang Rapat</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Kapasitas</label>
                        <input type="number" name="kapasitas" value="${kapasitas}" class="w-full bg-[#2d3240] border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#009EF7] transition-all text-sm">
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Ganti Foto (Opsional)</label>
                    <div class="relative bg-[#2d3240] border border-dashed border-gray-500 hover:border-[#009EF7] rounded-xl p-3 transition-all">
                        <input type="file" name="foto_baru" class="w-full text-sm text-gray-400 
                            file:cursor-pointer file:mr-4 file:py-2.5 file:px-5 
                            file:rounded-lg file:border-0 file:text-xs file:font-bold 
                            file:bg-[#009EF7]/10 file:text-[#009EF7] 
                            hover:file:bg-[#009EF7] hover:file:text-white transition-all">
                    </div>
                </div>
            </form>
        `,
        showCancelButton: true,
        confirmButtonText: '<i class="fas fa-save mr-1"></i> Simpan Perubahan',
        confirmButtonColor: '#009EF7',
        cancelButtonText: 'Batal',
        cancelButtonColor: '#3f4254',
        customClass: {
            confirmButton: 'rounded-xl font-bold px-6 py-2.5',
            cancelButton: 'rounded-xl font-bold px-6 py-2.5',
            popup: 'rounded-3xl border border-gray-700'
        },
        preConfirm: () => document.getElementById('formEdit').submit()
    });
}

// Logika Filter Tombol Kategori
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Ubah gaya tombol aktif
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('bg-sipblue', 'text-white', 'border-sipblue');
                b.classList.add('bg-sipbg', 'text-siptext', 'border-sipborder');
            });
            btn.classList.remove('bg-sipbg', 'text-siptext');
            btn.classList.add('bg-sipblue', 'text-white', 'border-sipblue');

            // Filter item
            document.querySelectorAll('.fasilitas-item').forEach(item => {
                item.style.display = (filter === 'semua' || item.dataset.kategori === filter) ? 'flex' : 'none';
            });
        });
    });
});

// ==========================================
// SWEETALERT KONFIRMASI UNTUK SEMUA PROSES
// ==========================================

// 1. Konfirmasi Buka Blokir
function konfirmasiBukaBlokir(button) {
    Swal.fire({
        title: 'Buka Blokir Jadwal?',
        text: "Fasilitas ini akan kembali tersedia untuk dipinjam pada tanggal tersebut.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#009EF7',
        confirmButtonText: '<i class="fas fa-lock-open mr-1"></i> Ya, Buka!',
        cancelButtonText: 'Batal',
        background: '#16181e',
        color: '#fff',
        customClass: {
            confirmButton: 'rounded-xl font-bold px-6 py-2.5',
            cancelButton: 'rounded-xl font-bold px-6 py-2.5',
            popup: 'rounded-3xl border border-gray-700'
        }
    }).then((result) => {
        if (result.isConfirmed) button.closest('form').submit();
    });
}

document.addEventListener('DOMContentLoaded', () => {

    // 2. Konfirmasi Tambah Fasilitas
    const formTambah = document.getElementById('formTambahFasilitas');
    if (formTambah) {
        formTambah.addEventListener('submit', function(e) {
            e.preventDefault(); // Tahan pengiriman form
            Swal.fire({
                title: 'Simpan Fasilitas Baru?',
                text: "Pastikan nama dan kapasitas sudah benar.",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#009EF7',
                confirmButtonText: 'Simpan',
                cancelButtonText: 'Periksa Lagi',
                background: '#16181e',
                color: '#fff',
                customClass: { confirmButton: 'rounded-xl', cancelButton: 'rounded-xl', popup: 'rounded-3xl border border-gray-700' }
            }).then((result) => {
                if (result.isConfirmed) this.submit();
            });
        });
    }

    // 3. Konfirmasi Blokir Jadwal
    const formBlokir = document.getElementById('formBlokirJadwal');
    if (formBlokir) {
        formBlokir.addEventListener('submit', function(e) {
            e.preventDefault();
            Swal.fire({
                title: 'Blokir Rentang Tanggal Ini?',
                text: "Pengguna tidak akan bisa meminjam fasilitas ini di tanggal yang dipilih.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DE2828', // Warna merah
                confirmButtonText: '<i class="fas fa-ban mr-1"></i> Ya, Blokir',
                cancelButtonText: 'Batal',
                background: '#16181e',
                color: '#fff',
                customClass: { confirmButton: 'rounded-xl', cancelButton: 'rounded-xl', popup: 'rounded-3xl border border-gray-700' }
            }).then((result) => {
                if (result.isConfirmed) this.submit();
            });
        });
    }

    // ==========================================
    // LOGIKA PENCARIAN & FILTER TABEL BLOKIR
    // ==========================================
    const searchBlokir = document.getElementById('searchBlokir');
    const filterKategoriBlokir = document.getElementById('filterKategoriBlokir');
    const blokirRows = document.querySelectorAll('.blokir-row');

    function jalankanFilterBlokir() {
        if (!searchBlokir) return;
        
        const keyword = searchBlokir.value.toLowerCase();
        const kategori = filterKategoriBlokir.value.toLowerCase();

        blokirRows.forEach(row => {
            const nama = row.getAttribute('data-nama');
            const alasan = row.getAttribute('data-alasan');
            const kat = row.getAttribute('data-kategori');

            // Cek kecocokan teks dan kategori
            const textMatch = nama.includes(keyword) || alasan.includes(keyword);
            const catMatch = kategori === 'semua' || kat === kategori;

            if (textMatch && catMatch) {
                row.style.display = ''; // Tampilkan
            } else {
                row.style.display = 'none'; // Sembunyikan
            }
        });
    }

    if (searchBlokir && filterKategoriBlokir) {
        searchBlokir.addEventListener('keyup', jalankanFilterBlokir);
        filterKategoriBlokir.addEventListener('change', jalankanFilterBlokir);
    }
});
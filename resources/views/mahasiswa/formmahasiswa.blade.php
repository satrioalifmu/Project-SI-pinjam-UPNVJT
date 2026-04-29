<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ajukan Peminjaman - Mahasiswa SI-PINJAM</title>
    <link rel="icon" type="image/png" href="{{ asset('assets/images/Logo-SI-Pinjam.png') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    
    @vite('resources/css/app.css')
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body class="bg-sipbg text-white font-sans antialiased overflow-hidden selection:bg-sipblue selection:text-white">

    <div class="flex h-screen w-full">

        <nav class="w-72 bg-sipdark border-r border-sipborder flex flex-col shrink-0 transition-all duration-300">
            <div class="p-8 border-b border-sipborder">
                <h3 class="text-2xl font-bold tracking-wide mb-1">SI-PINJAM</h3>
                <p class="text-xs font-bold text-sipblue uppercase tracking-widest">Panel Mahasiswa</p>
            </div>

            <ul class="flex-1 py-6 px-4 space-y-2 overflow-y-auto [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-sipborder">
                <li>
                    <a href="{{ route('mahasiswa.dashboard') }}" class="flex items-center gap-4 px-4 py-3 rounded-xl bg-sipblue/10 text-sipblue font-semibold border border-sipblue/20 transition-all">
                        <i class="fas fa-home text-lg"></i> Dashboard
                    </a>
                </li>
                <li>
                    <a href="{{ url('/jadwal-fasilitas') }}" class="flex items-center gap-4 px-4 py-3 rounded-xl text-siptext hover:bg-sipborder/50 hover:text-white font-medium transition-all group">
                        <i class="fas fa-search text-lg group-hover:text-sipblue transition-colors"></i> Cari Fasilitas
                    </a>
                </li>
                <li>
                    <a href="{{ route('mahasiswa.pinjam.form') }}" class="flex items-center gap-4 px-4 py-3 rounded-xl text-siptext hover:bg-sipborder/50 hover:text-white font-medium transition-all group">
                        <i class="fas fa-calendar-plus text-lg group-hover:text-[#00AE1C] transition-colors"></i> Buat Jadwal Pinjam
                    </a>
                </li>
                <li>
                    <a href="#" class="flex items-center gap-4 px-4 py-3 rounded-xl text-siptext hover:bg-sipborder/50 hover:text-white font-medium transition-all group">
                        <i class="fas fa-history text-lg group-hover:text-sipblue transition-colors"></i> Riwayat Saya
                    </a>
                </li>
            </ul>

            <div class="p-4 border-t border-sipborder">
                <a href="{{ route('logout') }}" class="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-sipred/50 text-sipred bg-sipred/5 hover:bg-sipred hover:text-white font-semibold transition-all shadow-[0_0_15px_rgba(222,40,40,0.1)]">
                    <i class="fas fa-sign-out-alt"></i> Keluar
                </a>
            </div>
        </nav>

        <main class="flex-1 flex flex-col h-screen overflow-hidden bg-gradient-to-br from-sipbg to-[#15181f]">
            
            <header class="h-20 border-b border-sipborder flex items-center justify-between px-8 bg-sipdark/50 backdrop-blur-md shrink-0">
                <div>
                    <h4 class="text-xl font-bold text-white mb-0.5">Form Pengajuan Peminjaman</h4>
                    <div class="text-sm font-medium text-siptext">Isi formulir di bawah ini untuk mengajukan peminjaman fasilitas kampus.</div>
                </div>
                <div>
                    <a href="{{ url('/') }}" class="inline-flex items-center gap-2 text-sm font-semibold text-siptext hover:text-white transition-colors border border-sipborder px-4 py-2 rounded-lg bg-sipdark">
                        <i class="fas fa-external-link-alt"></i> Ke Halaman Utama
                    </a>
                </div>
            </header>

            <div class="flex-1 overflow-y-auto p-8">
                
                <div class="max-w-3xl mx-auto">
                    
                    @if(session('error'))
                        <div class="bg-sipred/10 text-sipred border border-sipred/30 px-5 py-4 rounded-2xl mb-6 flex items-start gap-4 shadow-lg">
                            <i class="fas fa-exclamation-triangle text-xl mt-0.5"></i> 
                            <div>
                                <h3 class="font-bold text-sm mb-1">Pengajuan Gagal</h3>
                                <p class="text-xs">{{ session('error') }}</p>
                            </div>
                        </div>
                    @endif

                    @if(session('success'))
                        <div class="bg-[#00AE1C]/10 text-[#00AE1C] border border-[#00AE1C]/30 px-5 py-4 rounded-2xl mb-6 flex items-start gap-4 shadow-lg">
                            <i class="fas fa-check-circle text-xl mt-0.5"></i>
                            <div>
                                <h3 class="font-bold text-sm mb-1">Berhasil!</h3>
                                <p class="text-xs">{{ session('success') }}</p>
                            </div>
                        </div>
                    @endif

                    <div class="bg-sipdark border border-sipborder rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden">
                        <div class="absolute top-0 left-0 w-1 h-full bg-sipblue"></div>
                        
                        <h2 class="text-xl font-bold mb-8 flex items-center gap-3">
                            <i class="fas fa-file-signature text-sipblue"></i> Detail Peminjaman
                        </h2>

                        <form action="{{ route('mahasiswa.pinjam.store') }}" method="POST" id="formPinjam">
                            @csrf
                            
                            <div class="space-y-6">
                                <div>
                                    <label class="block text-xs font-bold text-siptext uppercase tracking-widest mb-2">Fasilitas yang Dipinjam <span class="text-sipred">*</span></label>
                                    <div class="relative">
                                        <i class="fas fa-building absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
                                        <select name="id_fasilitas" required class="w-full bg-sipbg border border-sipborder rounded-xl pl-12 pr-4 py-3.5 text-white text-sm appearance-none focus:outline-none focus:border-sipblue transition-all cursor-pointer">
                                            <option value="" disabled selected>-- Pilih Fasilitas Kampus --</option>
                                            @foreach($fasilitas as $f)
                                                <option value="{{ $f->id_fasilitas }}">{{ $f->nama_fasilitas }} (Kapasitas: {{ $f->kapasitas }} Org)</option>
                                            @endforeach
                                        </select>
                                        <i class="fas fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-xs"></i>
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-xs font-bold text-siptext uppercase tracking-widest mb-2">Tanggal Penggunaan <span class="text-sipred">*</span></label>
                                    <div class="relative">
                                        <input type="date" name="tanggal_pinjam" required min="{{ date('Y-m-d') }}" class="w-full bg-sipbg border border-sipborder rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-sipblue transition-all [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert cursor-pointer">
                                    </div>
                                    <p class="text-[10px] text-gray-500 mt-2"><i class="fas fa-info-circle mr-1"></i> Pastikan tanggal yang dipilih tidak bentrok di halaman "Cari Fasilitas".</p>
                                </div>

                                <div>
                                    <label class="block text-xs font-bold text-siptext uppercase tracking-widest mb-2">Keperluan / Nama Acara <span class="text-sipred">*</span></label>
                                    <textarea name="keperluan" required rows="4" placeholder="Contoh: Rapat Evaluasi BEM Fasilkom, Pelatihan Jaringan Komputer, dll..." class="w-full bg-sipbg border border-sipborder rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-sipblue transition-all placeholder-gray-600 resize-none"></textarea>
                                </div>

                                <div class="bg-sipblue/5 border border-sipblue/20 rounded-xl p-4 flex gap-3 text-sm">
                                    <i class="fas fa-shield-alt text-sipblue mt-1"></i>
                                    <div class="text-gray-300">
                                        <strong class="text-sipblue block mb-1">Penting!</strong>
                                        Pengajuan Anda akan divalidasi terlebih dahulu oleh sistem. Jika jadwal tersedia, status akan menjadi <b>Menunggu Admin (Pending)</b>. Silakan pantau secara berkala di menu Riwayat Saya.
                                    </div>
                                </div>

                                <div class="pt-4 border-t border-sipborder/50">
                                    <button type="submit" id="btnSubmit" class="w-full bg-sipblue hover:bg-sipbluehover text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-sipblue/30 active:scale-95 flex justify-center items-center gap-2 text-sm">
                                        <i class="fas fa-paper-plane"></i> Ajukan Peminjaman Fasilitas
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>

            </div>
        </main>
    </div>

    <script>
        document.getElementById('formPinjam').addEventListener('submit', function(e) {
            const btn = document.getElementById('btnSubmit');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memvalidasi Sistem...';
            btn.classList.add('opacity-70', 'cursor-not-allowed');
            // Form akan lanjut submit ke server
        });
    </script>
</body>
</html>
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Fasilitas;
use App\Models\Peminjaman;
use Illuminate\Support\Facades\Auth;

class MahasiswaController extends Controller
{
    public function index()
    {
        // Di masa depan, kita bisa mengambil data peminjaman terakhir user di sini
        // $riwayat_terakhir = Peminjaman::where('id_user', Auth::id())->latest()->first();
        
        return view('mahasiswa.dashboard'); // Mengarahkan ke file dashboard.blade.php
    }
    public function storePeminjaman(Request $request)
    {
        // 1. Validasi Input Dasar
        $request->validate([
            'id_fasilitas' => 'required',
            'tanggal_pinjam' => 'required|date|after_or_equal:today', // Tidak boleh pinjam tanggal yang sudah lewat
            'keperluan' => 'required|string',
            // 'dokumen' => 'nullable|file|mimes:pdf|max:2048' // Buka komentar ini jika nanti butuh upload surat/proposal
        ]);

        // 2. [VALIDASI SISTEM] Cek Bentrok Jadwal!
        // Memastikan tidak ada yang berstatus 'pending', 'disetujui', atau 'diblokir' di tanggal yang sama
        $cek_bentrok = Peminjaman::where('id_fasilitas', $request->id_fasilitas)
            ->where('tanggal_pinjam', $request->tanggal_pinjam)
            ->whereIn('status', ['pending', 'disetujui', 'diblokir'])
            ->exists();

        if ($cek_bentrok) {
            return back()->with('error', 'Validasi Sistem Gagal: Maaf, fasilitas ini sudah dipesan atau diblokir pada tanggal tersebut. Silakan pilih tanggal lain.');
        }

        // 3. Simpan Data Peminjaman (Status otomatis: pending)
        Peminjaman::create([
            'id_fasilitas' => $request->id_fasilitas,
            'id_user' => Auth::id(), // ID Mahasiswa yang sedang login
            'tanggal_pinjam' => $request->tanggal_pinjam,
            'keperluan' => $request->keperluan,
            'status' => 'pending' // Sesuai alur: Menunggu Admin
        ]);

        // 4. Arahkan kembali dengan pesan sukses
        return redirect()->back()->with('success', 'Pengajuan berhasil dikirim! Silakan tunggu validasi dari Admin.');
        
        // Catatan: Jika Anda punya halaman riwayat, bisa diubah menjadi:
        // return redirect()->route('mahasiswa.riwayat')->with('success', '...');
    }

    // Method untuk menampilkan halaman form pengajuan
    public function formPinjam()
    {
        // Ambil semua fasilitas untuk dimasukkan ke dropdown form
        $fasilitas = \App\Models\Fasilitas::orderBy('nama_fasilitas', 'asc')->get();
        
        return view('mahasiswa.formmahasiswa', compact('fasilitas'));
    }
    

}
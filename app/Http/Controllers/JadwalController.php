<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Fasilitas;
use App\Models\Peminjaman; // Pastikan Mas sudah punya Model Peminjaman

class JadwalController extends Controller
{
    public function index()
    {
        // 1. Ambil semua data fasilitas untuk ditampilkan di menu samping (Sidebar)
        $data_fasilitas = Fasilitas::all();
        
        // 2. Ambil data jadwal yang sudah di-booking (status: disetujui atau pending)
        $peminjaman = Peminjaman::whereIn('status', ['disetujui', 'pending', 'diblokir', 'blokir'])->get();

        // 3. Kelompokkan tanggal yang sudah di-booking berdasarkan ID Fasilitas
        // Hasilnya nanti seperti ini: { "1": ["2026-04-29", "2026-04-30"], "2": ["2026-05-05"] }
        $jadwal_booking = [];
        foreach ($peminjaman as $p) {
            $id = $p->id_fasilitas;
            $tanggal = date('Y-m-d', strtotime($p->tanggal_pinjam));
            
            // Masukkan tanggal ke dalam "keranjang" ID fasilitas yang sesuai
            $jadwal_booking[$id][] = $tanggal;
        }

        // 4. Lempar datanya ke file jadwal_fasilitas.blade.php
        return view('jadwal_fasilitas', compact('data_fasilitas', 'jadwal_booking'));
    }
}
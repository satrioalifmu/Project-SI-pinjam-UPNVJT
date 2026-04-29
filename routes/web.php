<?php

use Illuminate\Support\Facades\Route;

// --- IMPORT SEMUA CONTROLLER ---
use App\Http\Controllers\FasilitasController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DosenController;
use App\Http\Controllers\MahasiswaController;
use App\Http\Controllers\JadwalController;

/*
|--------------------------------------------------------------------------
| Web Routes - SI-PINJAM UPNVJT
|--------------------------------------------------------------------------
*/

// --- 1. JALUR UMUM (BISA DIAKSES SIAPA SAJA) ---
Route::get('/', [App\Http\Controllers\FasilitasController::class, 'index'])->name('home');
Route::get('/jadwal-fasilitas', [JadwalController::class, 'index'])->name('jadwal.index');

Route::get('/fasilitas', [FasilitasController::class, 'index'])->name('fasilitas.index');
Route::get('/fasilitas/{id}', [FasilitasController::class, 'show'])->name('fasilitas.detail');


// --- 2. JALUR AUTENTIKASI (LOGIN & REGISTER) ---
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'processLogin'])->name('login.post');

Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'processRegister'])->name('register.post');

Route::get('/logout', [AuthController::class, 'logout'])->name('logout');


// --- 3. JALUR PROTEKSI (WAJIB LOGIN) ---
Route::middleware(['auth'])->group(function () {

    // --- AREA ADMIN ---
    // Dashboard Utama (Statistik)
    Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    
    // Kelola Fasilitas (Halaman CRUD)
    Route::get('/admin/fasilitas', [AdminController::class, 'fasilitas'])->name('admin.fasilitas');
    Route::post('/admin/fasilitas/store', [AdminController::class, 'storeFasilitas'])->name('admin.fasilitas.store');
    Route::post('/admin/fasilitas/update', [AdminController::class, 'updateFasilitas'])->name('admin.fasilitas.update');
    Route::post('/admin/fasilitas/delete', [AdminController::class, 'destroyFasilitas'])->name('admin.fasilitas.delete');
    
    // Blokir Jadwal
    Route::post('/admin/block', [AdminController::class, 'blockSchedule'])->name('admin.block');
    Route::post('/admin/unblock-bulk', [App\Http\Controllers\AdminController::class, 'bulkUnblockJadwal'])->name('admin.unblock.bulk');
    Route::post('/admin/unblock-range', [App\Http\Controllers\AdminController::class, 'unblockRange'])->name('admin.unblock.range');


    // --- AREA DOSEN & TENDIK ---
    Route::get('/dashboard/dosen', [DosenController::class, 'index'])->name('dosen.dashboard');


    // --- AREA MAHASISWA ---
    Route::get('/dashboard/mahasiswa', [MahasiswaController::class, 'index'])->name('mahasiswa.dashboard');

});
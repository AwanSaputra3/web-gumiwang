import React, { useState, useEffect } from 'react';
import GenericCrud from '../../components/admin/GenericCrud';

export const KelolaBerita = () => (
  <GenericCrud
    title="Kelola Berita"
    endpoint="berita"
    columns={[
      { key: 'judul', label: 'Judul' },
      { key: 'tanggal', label: 'Tanggal' },
    ]}
    formFields={[
      { name: 'judul', label: 'Judul', required: true },
      { name: 'tanggal', label: 'Tanggal', required: true },
      { name: 'ringkasan', label: 'Ringkasan', type: 'textarea', required: true },
      { name: 'isiLengkap', label: 'Isi Lengkap', type: 'textarea', required: true },
      { name: 'image', label: 'Gambar', type: 'image_upload' },
    ]}
  />
);

export const KelolaWisata = () => (
  <GenericCrud
    title="Kelola Wisata"
    endpoint="wisata"
    columns={[
      { key: 'nama', label: 'Nama Destinasi' },
      { key: 'hargaFormatted', label: 'Harga' },
    ]}
    formFields={[
      { name: 'nama', label: 'Nama', required: true },
      { name: 'deskripsiSingkat', label: 'Deskripsi Singkat', type: 'textarea', required: true },
      { name: 'deskripsiLengkap', label: 'Deskripsi Lengkap', type: 'textarea', required: true },
      { name: 'harga', label: 'Harga (Angka)', type: 'number' },
      { name: 'hargaFormatted', label: 'Harga Format (Contoh: Rp 15.000)' },
      { name: 'whatsapp', label: 'Nomor WhatsApp (Contoh: 6281234567890)', type: 'text' },
      { name: 'jamOperasional', label: 'Jam Operasional' },
      { name: 'fasilitas', label: 'Fasilitas (Masukkan satu per baris)', type: 'array_text' },
      { name: 'image', label: 'Gambar', type: 'image_upload' },
    ]}
  />
);

export const KelolaUmkm = () => (
  <GenericCrud
    title="Kelola Komoditas"
    endpoint="umkm"
    columns={[
      { key: 'nama', label: 'Nama Komoditas' },
      { key: 'kategori', label: 'Kategori' },
      { key: 'whatsapp', label: 'Nomor WhatsApp' },
    ]}
    formFields={[
      { name: 'nama', label: 'Nama Komoditas (UMKM / Kelompok Tani / dll)', required: true },
      { 
        name: 'kategori', 
        label: 'Kategori', 
        type: 'select', 
        options: [
          { value: 'umkm', label: 'UMKM' },
          { value: 'perikanan', label: 'Perikanan' },
          { value: 'pertanian', label: 'Pertanian' }
        ],
        required: true 
      },
      { name: 'deskripsi', label: 'Deskripsi Usaha', type: 'textarea' },
      { name: 'whatsapp', label: 'Nomor WhatsApp (Contoh: 6281234567890)' },
      { name: 'logo', label: 'Logo / Foto Komoditas', type: 'image_upload' },
    ]}
  />
);

export const KelolaKomoditas = () => {
  const [umkmOptions, setUmkmOptions] = useState([]);

  useEffect(() => {
    async function fetchUmkms() {
      try {
        const res = await fetch('/api/umkm');
        if (res.ok) {
          const data = await res.json();
          if (data.data) {
            const options = data.data.map(u => ({ value: u.id, label: u.nama }));
            setUmkmOptions(options);
          }
        }
      } catch (e) {
        console.error('Error fetching umkms', e);
      }
    }
    fetchUmkms();
  }, []);

  return (
    <GenericCrud
      title="Kelola Produk"
      endpoint="komoditas"
      filterConfig={{
        key: 'umkm_id',
        options: [{ value: '', label: 'Semua Usaha / Komoditas' }, ...umkmOptions]
      }}
      columns={[
        { key: 'nama', label: 'Nama Komoditas' },
        { key: 'umkm', label: 'Nama Usaha', render: (val, item) => item.umkm ? item.umkm.nama : '-' },
        { key: 'hargaFormatted', label: 'Harga' },
      ]}
      formFields={[
        { name: 'nama', label: 'Nama Komoditas', required: true },
        {
          name: 'umkm_id',
          label: 'Pilih Komoditas Pemilik (UMKM/Tani/Nelayan)',
          type: 'select',
          options: umkmOptions
        },
        { name: 'deskripsi', label: 'Deskripsi', type: 'textarea', required: true },
        { name: 'harga', label: 'Harga (Angka)', type: 'number' },
        { name: 'hargaFormatted', label: 'Harga Format (Contoh: Rp 15.000)' },
        { name: 'satuan', label: 'Satuan' },
        { name: 'image', label: 'Gambar', type: 'image_upload' },
      ]}
    />
  );
};


export const KelolaSettings = ({ title }) => (
  <GenericCrud
    title={title || "Pengaturan Umum"}
    endpoint="settings"
    columns={[
      { key: 'key', label: 'Nama Pengaturan' },
      { key: 'value', label: 'Nilai (JSON)' },
    ]}
    formFields={[
      { name: 'key', label: 'Key', required: true },
      { name: 'value', label: 'Value (Format JSON, wajib)', type: 'json', required: true },
    ]}
  />
);

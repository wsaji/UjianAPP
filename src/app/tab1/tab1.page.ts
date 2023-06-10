import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  form = {
    nik: '',
    nama: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    alamat: '',
    agama: '',
    status_perkawinan: '',
    pekerjaan: '',
    kewarganegaraan: '',
    berlaku_hingga: '',
  };

  constructor(private router: Router) {}

  SubmitData() {
    Object.entries(this.form).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  }

  sendFormDataToWhatsApp() {
    const nomorTelepon = '6289652171098'; // Ganti dengan nomor telepon tujuan Anda
    this.SubmitData(); // Simpan data ke local storage sebelum mengirim ke WhatsApp
    const pesan = this.generateMessage();
    const url = `https://wa.me/${nomorTelepon}?text=${encodeURIComponent(
      pesan
    )}`;

    window.open(url, '_blank');
  }

  generateMessage(): string {
    const form = {
      nik: localStorage.getItem('nik') || '',
      nama: localStorage.getItem('nama') || '',
      tempat_lahir: localStorage.getItem('tempat_lahir') || '',
      tanggal_lahir: localStorage.getItem('tanggal_lahir') || '',
      jenis_kelamin: localStorage.getItem('jenis_kelamin') || '',
      alamat: localStorage.getItem('alamat') || '',
      agama: localStorage.getItem('agama') || '',
      status_perkawinan: localStorage.getItem('status_perkawinan') || '',
      pekerjaan: localStorage.getItem('pekerjaan') || '',
      kewarganegaraan: localStorage.getItem('kewarganegaraan') || '',
      berlaku_hingga: localStorage.getItem('berlaku_hingga') || '',
    };

    let pesan = 'Data Ujian:\n';
    Object.entries(form).forEach(([key, value]) => {
      pesan += `${key}: ${value}\n`;
    });

    return pesan;
  }

  sendFormDataToTelegram() {
    const botToken = '6279321249:AAGPh1WKSS0IG2QQ4rdd1rf-AAh9Z7ZYOsc'; // Ganti dengan token akses bot Anda
    const chatId = '1027772636'; // Ganti dengan ID obrolan tujuan Anda
    const message = this.generateMessage();
    const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
      message
    )}`;

    window.open(telegramUrl, '_blank');
  }

  sendFormDataViaEmail() {
    const recipientEmail = 'wahyusetioaji775@gmail.com'; // Ganti dengan alamat email tujuan
    const subject = 'Data Ujian';
    const message = this.generateMessage();

    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`;

    // Simpan data ke Local Storage
    Object.entries(this.form).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });

    // Buka aplikasi email default dengan URL "mailto"
    window.open(mailtoUrl);
  }
}

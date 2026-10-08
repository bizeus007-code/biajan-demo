import { Conversation, CapabilityItem, StructuredAiResponse } from '../types';

export const DEMO_CAPABILITIES: CapabilityItem[] = [
  {
    id: 'planning',
    title: 'İş Planlama',
    icon: 'CalendarClock',
    description: 'Aylık periyodik beyanname, SGK bildirgeleri ve kapanış takvimlerini ofis kapasitesine göre otonom sıralar.',
    samplePrompt: 'Bu haftaki kritik işleri göster',
    badge: 'Otonom'
  },
  {
    id: 'clients',
    title: 'Mükellef Yönetimi',
    icon: 'Building2',
    description: '42 mükellefin vergi dairesi, sicil, banka ve e-dönüşüm entegrasyonlarını anlık izler.',
    samplePrompt: 'Bu ay bütün mükelleflerimi hazırla',
    badge: '42 Aktif'
  },
  {
    id: 'doc-analysis',
    title: 'Belge Analizi',
    icon: 'FileSearch',
    description: 'Fatura, banka ekstresi ve Z-raporlarını VUK 227 standartlarında OCR ile ayrıştırıp eksikleri tespit eder.',
    samplePrompt: "Ahmet Market'in eksik evraklarını çıkar",
    badge: 'VUK 227'
  },
  {
    id: 'risk-analysis',
    title: 'Risk Analizi',
    icon: 'AlertTriangle',
    description: 'KDV matrah tutarsızlıkları, 7.000 TL üzeri nakit hareketleri ve ters bakiye veren hesapları önceden uyarır.',
    samplePrompt: 'Beyanname öncesi riskleri kontrol et',
    badge: 'Erken Uyarı'
  },
  {
    id: 'calendar',
    title: 'Takvim & Yasal Süreler',
    icon: 'CalendarDays',
    description: 'GİB vergi takvimi ve SGK son bildirim günlerini otomatik takip eder, gecikme faizi riskini sıfırlar.',
    samplePrompt: 'Yaklaşan yasal beyanname takvimini özetle'
  },
  {
    id: 'legislation',
    title: 'Mevzuat Takibi',
    icon: 'BookOpen',
    description: 'Resmi Gazete, VUK genel tebliğleri ve Gelir İdaresi özelgelerini tarayarak mükellef bazında etki analizi yapar.',
    samplePrompt: 'Son Resmi Gazete değişikliklerinin mükelleflerime etkisini analiz et'
  },
  {
    id: 'banking',
    title: 'Banka İş Akışları',
    icon: 'Landmark',
    description: 'Banka MT940 ve Excel ekstrelerini 102 banka hesaplarına tek tıkla otomatik yevmiyeleştirir.',
    samplePrompt: 'İş Bankası ekstrelerindeki mutabakatsızlıkları çöz'
  },
  {
    id: 'sgk',
    title: 'SGK / Personel',
    icon: 'Users',
    description: 'İşe giriş-çıkış bildirgeleri, kıdem-ihbar tazminatları ve asgari ücret teşvik kontrollerini yürütür.',
    samplePrompt: 'Bu ayki SGK bordro ve teşvik kontrollerini tamamla'
  },
  {
    id: 'legal-docs',
    title: 'Dilekçe / Belge Hazırlama',
    icon: 'FileSignature',
    description: 'Vergi mahkemesi, uzlaşma, izahat ve adres değişikliği resmi dilekçelerini otomatik taslaklandırır.',
    samplePrompt: 'Vergi dairesi izahat yazısı taslağı hazırla'
  }
];

export const RESPONSE_ALL_CLIENTS: StructuredAiResponse = {
  summaryTitle: 'Portföy Aylık Tarama Sonucu',
  headline: '42 mükellefi tarıyorum.',
  pipeline: [
    { label: 'ANALİZ EDİLİYOR', status: 'completed' },
    { label: 'ÖNCELİKLENDİRİLİYOR', status: 'completed' },
    { label: 'İŞLER HAZIRLANIYOR', status: 'completed' },
    { label: 'SİZİN ONAYINIZA SUNULUYOR', status: 'completed' }
  ],
  workItems: [
    { count: 8, label: 'kritik yaklaşan iş', severity: 'critical' },
    { count: 13, label: 'eksik belge', severity: 'warning' },
    { count: 4, label: 'yüksek öncelikli risk', severity: 'critical' },
    { count: 7, label: 'bekleyen müşteri yanıtı', severity: 'warning' },
    { count: 10, label: 'normal öncelikli iş', severity: 'normal' }
  ],
  detailedItems: [
    {
      id: 'dt-1',
      title: 'KDV-1 Ön Kontrol & Matrah Mutabakatı',
      description: '8 mükellefte KDV matrah hesaplamaları tamamlandı, 2 mükellef ekstre bekliyor.',
      tag: 'KDV',
      status: 'Onay Bekliyor'
    },
    {
      id: 'dt-2',
      title: 'Muhtasar & Prim Hizmet Beyannamesi',
      description: 'SGK bildirge bordroları hazırlandı, teşvik oranları %5 hazine desteği uygulandı.',
      tag: 'SGK / Muhtasar',
      status: 'Taslak Hazır'
    },
    {
      id: 'dt-3',
      title: '13 Eksik Evrak İçin Bildirim Listesi',
      description: 'Ahmet Market, Doğan Lojistik ve Kaya Tekstil için WhatsApp/E-posta talep taslakları.',
      tag: 'Evrak Takibi',
      status: 'Gönderime Hazır'
    }
  ],
  nextSteps: [
    { label: 'Mükelleflere WhatsApp ile Evrak Hatırlatması Yap', actionId: 'send_whatsapp' },
    { label: 'Kritik Riskli 4 Mükellefin Raporunu Aç', actionId: 'open_risks' },
    { label: 'Hazır Olan 12 İşi Toplu Onayla', actionId: 'approve_batch' }
  ],
  conclusionNote: '12 iş incelemeniz için hazırlandı.',
  isDemoData: true
};

export const RESPONSE_AHMET_MARKET: StructuredAiResponse = {
  summaryTitle: 'Ahmet Market Gıda A.Ş. — Evrak Denetimi',
  headline: 'Ahmet Market A.Ş. 2026/09-10 dönemi evrak ve banka hareketlerini tarıyorum.',
  pipeline: [
    { label: 'ANALİZ EDİLİYOR', status: 'completed' },
    { label: 'ÖNCELİKLENDİRİLİYOR', status: 'completed' },
    { label: 'İŞLER HAZIRLANIYOR', status: 'completed' },
    { label: 'SİZİN ONAYINIZA SUNULUYOR', status: 'completed' }
  ],
  workItems: [
    { count: 3, label: 'Eksik Banka Ekstresi (Akbank Ticari)', severity: 'critical' },
    { count: 4, label: 'Eksik Shell Akaryakıt Z-Raporu', severity: 'warning' },
    { count: 1, label: 'Eksik Demirbaş Faturası (Arçelik)', severity: 'warning' },
    { count: 5, label: 'İşlenmeye Hazır E-Arşiv Fatura', severity: 'normal' }
  ],
  detailedItems: [
    {
      id: 'am-1',
      title: 'Akbank Ticari Hesap — Eylül 2026 Sonu',
      description: 'Ekstrede 24 Eylül sonrası hareketler eksik. 102 hesap bakiyesi 84.320 TL mutabakatsız.',
      tag: 'Banka Ekstresi',
      status: 'Eksik'
    },
    {
      id: 'am-2',
      title: 'Taşıt Yakıt Gider Fişleri',
      description: 'Kredi kartı slip özetinde 4 adet akaryakıt alımı var ancak Z-raporu fişleri sisteme yüklenmedi.',
      tag: 'Gider Belgesi',
      status: 'Eksik'
    },
    {
      id: 'am-3',
      title: 'Soğutucu Dolap Alımı (Demirbaş)',
      description: 'Banka çıkışı 120.000 TL görünüyor, 253 Tesis Cihaz faturası dosyada bulunamadı.',
      tag: 'Demirbaş',
      status: 'Kritik Eksik'
    }
  ],
  nextSteps: [
    { label: 'Örnek Mükellefe WhatsApp Evrak Talep Şablonu Oluştur', actionId: 'am_msg' },
    { label: 'GİB İnteraktif Vergi Dairesinden E-Faturaları Çek', actionId: 'am_gib' },
    { label: 'Mevcut Evraklarla Geçici KDV Taslağı Çıkar', actionId: 'am_draft' }
  ],
  conclusionNote: '3 kritik evrak temin edilmeden KDV beyannamesi verilmesi matrah riski taşır.',
  isDemoData: true
};

export const RESPONSE_RISKS: StructuredAiResponse = {
  summaryTitle: 'Beyanname Öncesi Çapraz Risk Taraması',
  headline: 'Aktif mükelleflerin beyan öncesi VUK, KDV ve Ba-Bs çapraz kontrolleri tamamlandı.',
  pipeline: [
    { label: 'ANALİZ EDİLİYOR', status: 'completed' },
    { label: 'ÖNCELİKLENDİRİLİYOR', status: 'completed' },
    { label: 'İŞLER HAZIRLANIYOR', status: 'completed' },
    { label: 'SİZİN ONAYINIZA SUNULUYOR', status: 'completed' }
  ],
  workItems: [
    { count: 4, label: 'yüksek öncelikli yasal risk', severity: 'critical' },
    { count: 2, label: 'KDV matrah uyumsuzluğu', severity: 'critical' },
    { count: 1, label: 'VUK 459 Nakit Limit Aşımı (>7.000 TL)', severity: 'warning' },
    { count: 3, label: 'Ters Bakiye Veren 320/120 Hesap', severity: 'warning' }
  ],
  detailedItems: [
    {
      id: 'rk-1',
      title: 'Demir Çelik Ltd. — 120 Alıcılar Ters Bakiye',
      description: '120.01 hesabında 142.500 TL alacak bakiyesi mevcut. 340 Alınan Avanslar hesabına virman gerektirir.',
      tag: 'Muhasebe Standardı',
      status: 'Düzeltme Gerekli'
    },
    {
      id: 'rk-2',
      title: 'Marmara Lojistik — 7.000 TL Nakit Ödeme (VUK 459)',
      description: 'Tedarikçiye 28.500 TL elden tediye makbuzu ile ödenmiş. Özel usulsüzlük cezası riski.',
      tag: 'VUK 459 Ceza Riski',
      status: 'Kritik Risk'
    },
    {
      id: 'rk-3',
      title: 'Kaya Tekstil — E-Arşiv & KDV-1 Hasılat Farkı',
      description: 'GİB e-Arşiv hasılat toplamı ile mizan 600 hesabı arasında 18.200 TL fark tespit edildi.',
      tag: 'KDV Matrah Uyumsuzluğu',
      status: 'İnceleme Bekliyor'
    }
  ],
  nextSteps: [
    { label: 'Ters Bakiye Hesapları Otomatik Virmanla', actionId: 'risk_virman' },
    { label: 'Marmara Lojistik İçin Banka Dekontu Talep Et', actionId: 'risk_banka' },
    { label: 'Detaylı Risk Denetim Raporunu PDF Olarak Al', actionId: 'risk_pdf' }
  ],
  conclusionNote: '4 risk alanı için otomatik düzeltme fişleri hazırlandı.',
  isDemoData: true
};

export const RESPONSE_URGENT_JOBS: StructuredAiResponse = {
  summaryTitle: 'Haftalık Yasal Süreler & Acil İş Akışı',
  headline: 'Bu hafta tamamlanması gereken yasal beyan ve bildirimler sıralandı.',
  pipeline: [
    { label: 'ANALİZ EDİLİYOR', status: 'completed' },
    { label: 'ÖNCELİKLENDİRİLİYOR', status: 'completed' },
    { label: 'İŞLER HAZIRLANIYOR', status: 'completed' },
    { label: 'SİZİN ONAYINIZA SUNULUYOR', status: 'completed' }
  ],
  workItems: [
    { count: 6, label: 'Acil KDV-1 Beyannamesi (Son 3 Gün)', severity: 'critical' },
    { count: 4, label: 'SGK Aylık Prim & Hizmet Onayı', severity: 'warning' },
    { count: 2, label: 'E-Defter Berat Yükleme Kontrolü', severity: 'warning' },
    { count: 8, label: 'Rutin Banka Ekstre Entegrasyonu', severity: 'normal' }
  ],
  detailedItems: [
    {
      id: 'uj-1',
      title: 'KDV-1 Beyannamesi — 6 Mükellef',
      description: 'Tahakkuk fişleri hazırlanacak. 4 mükellefte ödeme çıkıyor, 2 mükellefte sonraki döneme devreden KDV var.',
      tag: 'Vergi Takvimi',
      status: 'Son 72 Saat'
    },
    {
      id: 'uj-2',
      title: 'SGK Muhtasar & Prim Hizmet Beyanı',
      description: 'Eksik gün bildirimi olan 3 mükellefin rapor ve puantajları sisteme işlendi.',
      tag: 'SGK Bildirge',
      status: 'İnceleme Hazır'
    }
  ],
  nextSteps: [
    { label: 'KDV Tahakkuk Fişlerini Toplu İndir', actionId: 'dl_tahakkuk' },
    { label: 'Ödeme Çıkan Mükelleflere Bilgi Notu Gönder', actionId: 'notify_tax' }
  ],
  conclusionNote: 'Yasal gecikme cezası riski taşıyan 6 iş önceliklendirildi.',
  isDemoData: true
};

export const RESPONSE_NEW_COMPANY: StructuredAiResponse = {
  summaryTitle: 'Yeni Limited Şirket Kuruluş Süreci',
  headline: 'Yeni kuruluş talebi için MERSİS ana sözleşme ve potansiyel vergi kimlik akışı hazırlandı.',
  pipeline: [
    { label: 'ANALİZ EDİLİYOR', status: 'completed' },
    { label: 'ÖNCELİKLENDİRİLİYOR', status: 'completed' },
    { label: 'İŞLER HAZIRLANIYOR', status: 'completed' },
    { label: 'SİZİN ONAYINIZA SUNULUYOR', status: 'completed' }
  ],
  workItems: [
    { count: 1, label: 'MERSİS Ana Sözleşme Taslağı', severity: 'normal' },
    { count: 1, label: 'Potansiyel Vergi No & Banka Bloke Yazısı', severity: 'normal' },
    { count: 1, label: 'Ticaret Odası Randevu Evrak Paketi', severity: 'normal' },
    { count: 2, label: 'Kurucu Kimlik & İmza Beyanı Kontrolü', severity: 'warning' }
  ],
  detailedItems: [
    {
      id: 'nc-1',
      title: 'NACE Kodu & Faaliyet Konusu Analizi',
      description: '62.01 (Bilgisayar Programlama) NACE kodu ve standart ana sözleşme maddeleri oluşturuldu.',
      tag: 'MERSİS',
      status: 'Taslak Hazır'
    },
    {
      id: 'nc-2',
      title: 'Sermaye Blokaj & Harç Hesaplama',
      description: 'Rekabet Kurumu payı (on binde 4) ve tescil harçları otomatik hesaplandı.',
      tag: 'Maliyet Tablosu',
      status: 'Hesaplandı'
    }
  ],
  nextSteps: [
    { label: 'MERSİS Başvuru Metnini Kopyala', actionId: 'mersis_copy' },
    { label: 'Müşteriye Gerekli Evrak Listesini WhatsApp’tan İlet', actionId: 'send_reqs' }
  ],
  conclusionNote: 'Kuruluş dosyası Ticaret Odası onayına hazırlandı.',
  isDemoData: true
};

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    title: 'Bu ay bütün mükelleflerimi hazırla',
    date: 'Bugün',
    messages: [
      {
        id: 'm1',
        sender: 'user',
        timestamp: '10:14',
        text: 'Bu ay bütün mükelleflerimi hazırla.'
      },
      {
        id: 'm2',
        sender: 'biajan',
        timestamp: '10:14',
        structured: RESPONSE_ALL_CLIENTS
      }
    ]
  },
  {
    id: 'conv-2',
    title: 'Ahmet Market eksik evrakları',
    date: 'Dün',
    messages: [
      {
        id: 'm3',
        sender: 'user',
        timestamp: '14:20',
        text: "Ahmet Market'in eksik evraklarını çıkar."
      },
      {
        id: 'm4',
        sender: 'biajan',
        timestamp: '14:20',
        structured: RESPONSE_AHMET_MARKET
      }
    ]
  },
  {
    id: 'conv-3',
    title: 'Beyanname öncesi riskler',
    date: 'Dün',
    messages: [
      {
        id: 'm5',
        sender: 'user',
        timestamp: '16:45',
        text: 'Beyanname öncesi riskleri kontrol et.'
      },
      {
        id: 'm6',
        sender: 'biajan',
        timestamp: '16:45',
        structured: RESPONSE_RISKS
      }
    ]
  },
  {
    id: 'conv-4',
    title: 'Geciken işler',
    date: 'Bu Hafta',
    messages: [
      {
        id: 'm7',
        sender: 'user',
        timestamp: '09:30',
        text: 'Geciken işleri ve bu haftaki kritik işleri göster.'
      },
      {
        id: 'm8',
        sender: 'biajan',
        timestamp: '09:30',
        structured: RESPONSE_URGENT_JOBS
      }
    ]
  },
  {
    id: 'conv-5',
    title: 'Yeni şirket kuruluşu',
    date: 'Bu Hafta',
    messages: [
      {
        id: 'm9',
        sender: 'user',
        timestamp: '11:15',
        text: 'Yeni bir limited şirket kuruluşu için gerekli evrakları ve süreci hazırla.'
      },
      {
        id: 'm10',
        sender: 'biajan',
        timestamp: '11:15',
        structured: RESPONSE_NEW_COMPANY
      }
    ]
  }
];

export const QUICK_PROMPTS = [
  'Bu ay bütün mükelleflerimi hazırla',
  "Ahmet Market'in eksik evraklarını çıkar",
  'Bu haftaki kritik işleri göster',
  'Beyanname öncesi riskleri kontrol et'
];

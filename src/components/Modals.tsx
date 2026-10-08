import React from 'react';
import { X, User, Shield, CheckCircle, Layers } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-[#121824] border border-[#2A364F] rounded-2xl shadow-2xl p-6 text-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white">SMMM Kullanıcı Profili</h3>
              <p className="text-xs text-slate-400">Doğrulanmış Mali Müşavir Hesabı</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3.5 text-xs">
          <div className="bg-[#182030] p-3 rounded-xl border border-slate-800/80">
            <div className="text-slate-400 mb-1">Mali Müşavir</div>
            <div className="text-sm font-semibold text-white">Demo SMMM</div>
            <div className="text-slate-400 mt-1">Ruhsat No: <span className="text-teal-400 font-mono">DEMO-SMMM-2026 (TÜRMOB Demo)</span></div>
            <div className="text-slate-400 mt-1">Bağlı Ofis: <span className="text-slate-200">Demo SMMM Ofisi</span></div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-[#182030] p-3 rounded-xl border border-slate-800/80">
              <div className="text-slate-400 mb-1">Bağlı Oda</div>
              <div className="font-medium text-slate-200">İSMMMO</div>
            </div>
            <div className="bg-[#182030] p-3 rounded-xl border border-slate-800/80">
              <div className="text-slate-400 mb-1">Portföy Büyüklüğü</div>
              <div className="font-medium text-teal-400">42 Mükellef (Aktif)</div>
            </div>
          </div>

          <div className="bg-[#182030] p-3 rounded-xl border border-slate-800/80 space-y-2">
            <div className="font-medium text-slate-300">Entegrasyon & Güvenlik</div>
            <div className="flex items-center justify-between text-slate-400">
              <span>GİB E-Beyanname Entegrasyonu</span>
              <span className="text-emerald-400 flex items-center"><CheckCircle className="w-3.5 h-3.5 mr-1" /> Bağlı</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>SGK Portal & E-Bildirge</span>
              <span className="text-emerald-400 flex items-center"><CheckCircle className="w-3.5 h-3.5 mr-1" /> Bağlı</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Banka MT940 Gateway</span>
              <span className="text-emerald-400 flex items-center"><CheckCircle className="w-3.5 h-3.5 mr-1" /> 4 Banka</span>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};

export const SettingsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-[#121824] border border-[#2A364F] rounded-2xl shadow-2xl p-6 text-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Ayarlar & AI Tercihleri</h3>
              <p className="text-xs text-slate-400">SMMM Otonom Kuralları</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3 text-xs">
          <div className="bg-[#182030] p-3 rounded-xl border border-slate-800/80 flex items-center justify-between">
            <div>
              <div className="font-medium text-slate-200">VUK 227 Standartlarında Katı Denetim</div>
              <div className="text-[11px] text-slate-400">Eksik tevsik belgelerinde beyannameyi blokla</div>
            </div>
            <input type="checkbox" defaultChecked className="accent-teal-500 w-4 h-4 rounded" />
          </div>

          <div className="bg-[#182030] p-3 rounded-xl border border-slate-800/80 flex items-center justify-between">
            <div>
              <div className="font-medium text-slate-200">7.000 TL Nakit Kuralı Uyarısı</div>
              <div className="text-[11px] text-slate-400">VUK 459 limit aşımında anlık alarm ver</div>
            </div>
            <input type="checkbox" defaultChecked className="accent-teal-500 w-4 h-4 rounded" />
          </div>

          <div className="bg-[#182030] p-3 rounded-xl border border-slate-800/80 flex items-center justify-between">
            <div>
              <div className="font-medium text-slate-200">Otonom WhatsApp Bildirim Taslakları</div>
              <div className="text-[11px] text-slate-400">Eksik evraklarda mükellefe taslak mesaj hazırla</div>
            </div>
            <input type="checkbox" defaultChecked className="accent-teal-500 w-4 h-4 rounded" />
          </div>

          <div className="bg-[#182030] p-3 rounded-xl border border-slate-800/80 flex items-center justify-between">
            <div>
              <div className="font-medium text-slate-200">AI Muhakeme Düzeyi</div>
              <div className="text-[11px] text-slate-400">Derin mevzuat ve çapraz risk analizi</div>
            </div>
            <span className="text-[11px] font-semibold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
              Yüksek (Uzman)
            </span>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-xs font-medium text-white transition-colors"
          >
            Kaydet & Kapat
          </button>
        </div>
      </div>
    </div>
  );
};

export const AboutModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-[#121824] border border-[#2A364F] rounded-2xl shadow-2xl p-6 text-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white">BİAJAN Hakkında</h3>
              <p className="text-xs text-slate-400">Mali Müşavirler İçin Otonom AI Sistemi</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3 text-xs leading-relaxed text-slate-300">
          <p>
            <strong className="text-white">BİAJAN</strong>, Serbest Muhasebeci Mali Müşavirlerin (SMMM) operasyonel yükünü hafifletmek, beyanname öncesi riskleri sıfırlamak ve evrak süreçlerini otonomlaştırmak için tasarlanmış yeni nesil AI çalışma alanıdır.
          </p>
          <div className="bg-[#182030] p-3 rounded-xl border border-slate-800/80 space-y-1.5">
            <div className="font-semibold text-teal-400">Ürün Temel İlkeleri:</div>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li>Klasik chatbot değil, iş hazırlayan otonom ajan mimarisi.</li>
              <li>VUK 227, TTK ve GİB mevzuatlarına tam deterministik uyum.</li>
              <li>Mükellef bazlı veri izolasyonu ve KVKK uyumlu tasarım.</li>
            </ul>
          </div>
          <p className="text-[11px] text-slate-400">
            Bu ekran, BİAJAN'ın bağımsız ön yüz konsept demosu olup Anthropic ve iş ortakları değerlendirmesi için hazırlanmıştır.
          </p>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800 flex justify-between items-center">
          <span className="text-[11px] text-slate-400 font-mono">v1.0.0-demo</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};

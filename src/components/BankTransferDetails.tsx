'use client'

import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

interface BankTransferDetailsProps {
  name: string;
  accountNumber: string;
  address: string;
  city: string;
  purpose: string;
  amount: string;
  language?: 'sr' | 'en';
}

const translations = {
  sr: {
    title: 'Detalji plaćanja',
    name: 'Ime',
    account: 'Račun',
    address: 'Adresa',
    city: 'Mesto',
    purpose: 'Svrha uplate',
    amount: 'Iznos',
    afterPayment: 'Nakon uplate, pošaljite potvrdu o plaćanju na naš',
    or: 'ili',
    downloadSlip: 'Preuzmi uplatnicu',
    copied: 'kopirano'
  },
  en: {
    title: 'Payment Details',
    name: 'Name',
    account: 'Account',
    address: 'Address',
    city: 'City',
    purpose: 'Payment Purpose',
    amount: 'Amount',
    afterPayment: 'After payment, please send the payment confirmation to our',
    or: 'or',
    downloadSlip: 'Download Payment Slip',
    copied: 'copied'
  }
}

export default function BankTransferDetails({
  name,
  accountNumber,
  address,
  city,
  purpose,
  amount,
  language = 'en'
}: BankTransferDetailsProps) {
  const t = translations[language]

  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value)
    toast.success(`${label} ${t.copied}`, {
      style: {
        background: '#1A1A1A',
        color: '#fff',
        border: '1px solid rgba(139, 92, 246, 0.2)',
      },
      duration: 2000,
    })
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full p-6 rounded-2xl bg-[#0A0A0A] border border-violet-500/20 backdrop-blur-sm"
    >
      <div className="space-y-6">
        <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-400">{t.title}</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: t.name, value: name },
            { label: t.account, value: accountNumber, isMono: true },
            { label: t.city, value: city },
            { label: t.address, value: address },
            { label: t.purpose, value: purpose, fullWidth: true },
            { label: t.amount, value: `${amount} RSD` }
          ].map((field, i) => (
            <div 
              className={`${field.fullWidth ? 'col-span-2' : 'col-span-1'} group relative`} 
              key={i}
            >
              <div className="absolute -top-3 left-4 px-2 bg-[#0A0A0A] text-sm font-medium text-violet-400">
                {field.label}
              </div>
              <div 
                className={`flex items-center justify-between p-4 rounded-xl bg-[#111] border border-violet-500/20 hover:border-violet-500/40 hover:bg-violet-500/5 transition-all duration-300 cursor-pointer ${field.isMono ? 'font-mono' : ''}`}
                onClick={() => copyToClipboard(field.value, field.label)}
              >
                <span className="font-medium text-white/90">{field.value}</span>
                <i className="fa-solid fa-copy text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 text-violet-400 translate-x-2 group-hover:translate-x-0"></i>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-xl bg-[#111] border border-violet-500/20">
          <div className="flex items-start gap-3 text-white/60">
            <i className="fa-solid fa-triangle-exclamation text-violet-400 mt-1"></i>
            <p className="text-sm">
              {t.afterPayment}{" "}
              <a href="https://instagram.com/ghostforce.studio" className="text-violet-400 hover:text-violet-300 transition-colors">Instagram</a>
              {" "}{t.or}{" "}
              <a href="mailto:ghostforce.studio@gmail.com" className="text-violet-400 hover:text-violet-300 transition-colors">e-mail</a>
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <a 
            href="/assets/uplatnica.pdf" 
            download 
            className="group relative px-8 py-4 rounded-xl overflow-hidden bg-violet-600 text-white font-medium"
          >
            <div className="absolute inset-0 w-full h-full transition-all duration-300 bg-gradient-to-r from-violet-600 via-violet-500 to-violet-600 bg-[length:200%_100%] group-hover:bg-[position:100%_0]" />
            <div className="relative flex items-center gap-2">
              <span>{t.downloadSlip}</span>
              <i className="fa-solid fa-arrow-down text-white/90 transition-colors duration-300"></i>
            </div>
          </a>
        </div>
      </div>
    </motion.div>
  )
} 
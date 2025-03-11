'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { mentors, type Mentor } from '../constants' // Importujemo i tip Mentor
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import type { Toast } from 'react-hot-toast'
import BankTransferDetails from '@/components/BankTransferDetails'

const cryptoAddresses = {
  BTC: 'bc1q9zfy2egw023fss76pdj4x0fr9q96yxgrvpcqc6',
  ETH: '0xd49Bb11Ab7e69987E48AbeCBB9E448CA58c05219',
  USDT: 'TVzKgDQpY5YYQQxe5bBuarqZLwZhR48bkV'
}

// Dodaj bankAccount objekat sa podacima
const bankAccount = {
  name: 'Ognjen Blažić',
  account: '325930070737220207',
  address: 'Vuka Karadžića 83a',
  city: 'Obrenovac',
  purpose: 'Online kurs'
}

const translations = {
  sr: {
    back: 'Nazad na planove',
    title: 'Kompletiranje narudžbine',
    selectedPackage: 'Odabrani paket',
    plan: 'Plan',
    duration: 'Trajanje',
    price: 'Cena',
    month: 'mesec',
    months: 'meseci',
    paymentMethod: 'Način plaćanja',
    cardPayment: 'Kreditna kartica',
    bankTransfer: 'Bankovna uplatnica',
    cryptoPayment: 'Crypto plaćanje',
    comingSoon: 'Uskoro dostupno',
    cardComingSoonText: 'Plaćanje karticama će biti omogućeno u narednih nekoliko dana. U međuvremenu možete koristiti neku od drugih ponuđenih opcija plaćanja.',
    name: 'Ime',
    iban: 'IBAN',
    address: 'Adresa',
    city: 'Mesto',
    purpose: 'Svrha uplate',
    amount: 'Iznos',
    downloadSlip: 'Preuzmi uplatnicu',
    afterPayment: 'Nakon uplate, pošaljite potvrdu o plaćanju na naš',
    or: 'ili',
    copied: 'je kopiran',
    addressCopied: 'adresa je kopirana',
    onlySerbiaText: 'Samo iz Srbije',
  },
  en: {
    back: 'Back to plans',
    title: 'Complete your order',
    selectedPackage: 'Selected package',
    plan: 'Plan',
    duration: 'Duration',
    price: 'Price',
    month: 'month',
    months: 'months',
    paymentMethod: 'Payment method',
    cardPayment: 'Credit Card',
    bankTransfer: 'Bank transfer',
    cryptoPayment: 'Crypto payment',
    comingSoon: 'Coming soon',
    cardComingSoonText: 'Card payments will be enabled in the next few days. In the meantime, you can use one of the other payment options.',
    name: 'Name',
    iban: 'IBAN',
    address: 'Address',
    city: 'City',
    purpose: 'Payment purpose',
    amount: 'Amount',
    downloadSlip: 'Download payment slip',
    afterPayment: 'After payment, please send the payment confirmation to our',
    or: 'or',
    copied: 'copied',
    addressCopied: 'address copied',
    onlySerbiaText: 'Serbia only',
  }
}

function CheckoutPage() {
  const searchParams = useSearchParams()
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'crypto' | 'paypal'>('card')
  const [selectedCrypto, setSelectedCrypto] = useState<keyof typeof cryptoAddresses | null>(null)
  const [language, setLanguage] = useState<'en' | 'sr'>('en')
  const t = translations[language]
  
  const planName = searchParams.get('plan')
  const mentorId = searchParams.get('mentor')
  
  const selectedMentor = mentors.find((m: Mentor) => m.id === mentorId)
  
  const getPlanPrice = () => {
    if (!selectedMentor || !planName) return '0'
    switch(planName) {
      case 'Basic Mentorship':
        return selectedMentor.pricing.basic
      case 'Pro Mentorship':
        return selectedMentor.pricing.pro
      case 'Elite Mentorship':
        return selectedMentor.pricing.elite
      default:
        return '0'
    }
  }

  const price = getPlanPrice()
  
  // Dobijanje RSD cene na osnovu EUR (približna vrednost)
  const getRsdPrice = () => {
    return (parseInt(price) * 117).toLocaleString('sr-RS')
  }

  const paymentMethods = [
    {
      id: 'card',
      name: { en: 'Credit Card', sr: 'Kreditna kartica' },
      icon: (
        <svg className="w-7 h-7 text-violet-400" viewBox="0 0 576 512">
          <path fill="currentColor" d="M64 32C28.7 32 0 60.7 0 96v32H576V96c0-35.3-28.7-64-64-64H64zM576 224H0V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V224zM112 352h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16H368c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16z"/>
        </svg>
      )
    },
    {
      id: 'bank',
      name: { en: 'Bank Transfer', sr: 'Bankovna uplatnica' },
      subtext: { en: 'Serbia only', sr: 'Samo iz Srbije' },
      icon: (
        <svg className="w-7 h-7 text-violet-400" viewBox="0 0 512 512">
          <path fill="currentColor" d="M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8.1-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224z"/>
        </svg>
      )
    },
    {
      id: 'crypto',
      name: 'Crypto',
      subtext: 'BTC, ETH, USDT',
      icon: (
        <svg className="w-7 h-7 text-violet-400" viewBox="0 0 512 512">
          <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zm-141.651-35.33c4.937-32.999-20.191-50.739-54.55-62.573l11.146-44.702-27.213-6.781-10.851 43.524c-7.154-1.783-14.502-3.464-21.803-5.13l10.929-43.81-27.213-6.781-11.153 44.686c-5.922-1.349-11.735-2.682-17.377-4.084l.031-.14-37.53-9.37-7.239 29.062s20.191 4.627 19.765 4.913c11.022 2.751 13.014 10.044 12.68 15.825l-12.696 50.925c.76.194 1.744.473 2.829.907-.907-.225-1.876-.473-2.876-.713l-17.796 71.338c-1.349 3.348-4.767 8.37-12.471 6.464.271.395-19.78-4.937-19.78-4.937l-13.51 31.147 35.414 8.827c6.588 1.651 13.045 3.379 19.4 5.006l-11.262 45.213 27.182 6.781 11.153-44.733a1038.209 1038.209 0 0 0 21.687 5.627l-11.115 44.523 27.213 6.781 11.262-45.128c46.404 8.781 81.299 5.239 95.986-36.727 11.836-33.79-.589-53.281-25.004-65.991 17.78-4.098 31.174-15.792 34.747-39.949zm-62.177 87.179c-8.41 33.79-65.308 15.523-83.755 10.943l14.944-59.899c18.446 4.603 77.6 13.717 68.811 48.956zm8.417-87.667c-7.673 30.736-55.031 15.12-70.393 11.292l13.548-54.327c15.363 3.828 64.836 10.973 56.845 43.035z"/>
        </svg>
      )
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: (
        <svg className="w-7 h-7 text-violet-400" viewBox="0 0 384 512">
          <path fill="currentColor" d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4.7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9.7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"/>
        </svg>
      )
    }
  ]

  const cryptoIcons = {
    BTC: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <g clipPath="url(#clip0_btc)">
          <path d="M31.3914 19.9644C29.2112 28.6071 20.3627 33.7829 11.7199 31.5914C3.07717 29.4112 -2.09859 20.5627 0.0816071 11.9199C2.27467 3.27717 11.1232 -1.89859 19.766 0.291607C28.4087 2.47467 33.5716 11.3232 31.3914 19.9644Z" fill="#F7931A"/>
          <path d="M22.9462 13.7645C23.2279 11.6151 21.5743 10.4929 19.3243 9.74895L20.0779 6.9373L18.2029 6.44895L17.4743 9.17395C17.0201 9.05729 16.5529 8.94895 16.0857 8.84062L16.8201 6.09062L14.9451 5.60229L14.1915 8.41395C13.8087 8.32395 13.4315 8.23395 13.0654 8.13729L13.0679 8.12895L10.4829 7.46729L9.96789 9.46729C9.96789 9.46729 11.3515 9.77395 11.3179 9.79062C12.0379 9.97395 12.1679 10.4596 12.1457 10.8485L11.2904 14.0373C11.3404 14.0485 11.4043 14.0651 11.4737 14.0929L11.2879 14.0485L10.0932 18.5151C9.99789 18.7485 9.77289 19.0985 9.27289 18.9707C9.29789 18.9929 7.92289 18.6429 7.92289 18.6429L6.94789 20.7929L9.39789 21.4207C9.81789 21.5262 10.2268 21.6373 10.6301 21.7429L9.86789 24.5873L11.7429 25.0762L12.4962 22.2651C12.9679 22.3929 13.4287 22.5096 13.8787 22.6207L13.1287 25.4207L15.0037 25.9096L15.7654 23.0707C18.8515 23.6485 21.1904 23.4207 22.1904 20.6485C23.0029 18.4207 22.1737 17.1985 20.5904 16.3985C21.7404 16.1485 22.6154 15.3485 22.9462 13.7645ZM18.8404 19.3485C18.2654 21.5762 14.4404 20.3485 13.2404 20.0485L14.2404 16.2985C15.4404 16.5985 19.4404 17.0429 18.8404 19.3485ZM19.4154 13.7429C18.8904 15.7707 15.7154 14.7151 14.7154 14.4651L15.6154 11.0429C16.6154 11.2929 19.9654 11.6429 19.4154 13.7429Z" fill="white"/>
        </g>
        <defs>
          <clipPath id="clip0_btc">
            <rect width="32" height="32" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    ),
    ETH: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <g clipPath="url(#clip0_eth)">
          <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" fill="#627EEA"/>
          <path d="M16.498 4V12.87L23.995 16.22L16.498 4Z" fill="white" fillOpacity="0.602"/>
          <path d="M16.498 4L9 16.22L16.498 12.87V4Z" fill="white"/>
          <path d="M16.498 21.968V27.995L24 17.616L16.498 21.968Z" fill="white" fillOpacity="0.602"/>
          <path d="M16.498 27.995V21.967L9 17.616L16.498 27.995Z" fill="white"/>
          <path d="M16.498 20.573L23.995 16.22L16.498 12.872V20.573Z" fill="white" fillOpacity="0.2"/>
          <path d="M9 16.22L16.498 20.573V12.872L9 16.22Z" fill="white" fillOpacity="0.602"/>
        </g>
        <defs>
          <clipPath id="clip0_eth">
            <rect width="32" height="32" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    ),
    USDT: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#26A17B"/>
        <path d="M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117" fill="#fff"/>
      </svg>
    )
  }

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.custom((t: Toast) => (
        <div className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-[#1A1A1A] shadow-lg rounded-xl pointer-events-auto flex items-center justify-between p-4 gap-3 border border-violet-500/20`}>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center">
              <i className="fa-solid fa-check text-lg text-violet-400"></i>
            </div>
            <p className="text-sm font-medium text-white">
              {label} adresa je kopirana!
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex-shrink-0 rounded-lg p-1.5 hover:bg-white/5 transition-colors"
          >
            <i className="fa-solid fa-xmark text-white/50"></i>
          </button>
        </div>
      ), { duration: 3000 })
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const copyBankDetail = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value)
      toast.success(`${label} ${language === 'sr' ? 'je kopiran' : 'copied'}`, {
        style: {
          background: '#1A1A1A',
          color: '#fff',
          border: '1px solid rgba(139, 92, 246, 0.2)',
        },
        duration: 2000,
      })
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white py-20">
      {/* Background gradijenti */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(98,0,255,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <Link href="/mentorship" className="inline-flex items-center text-violet-400 hover:text-violet-300 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t.back}
          </Link>

          <div className="flex items-center gap-2 bg-white/5 rounded-xl p-1">
            <button
              onClick={() => setLanguage('en')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                language === 'en' 
                  ? 'bg-violet-500/20 text-violet-400' 
                  : 'hover:bg-white/5 text-white/70'
              }`}
            >
              <img src="/assets/flags/en.svg" alt="English" className="w-5 h-5 rounded-sm" />
              <span className="text-sm font-medium">EN</span>
            </button>
            <button
              onClick={() => setLanguage('sr')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                language === 'sr' 
                  ? 'bg-violet-500/20 text-violet-400' 
                  : 'hover:bg-white/5 text-white/70'
              }`}
            >
              <img src="/assets/flags/sr.svg" alt="Serbian" className="w-5 h-5 rounded-sm" />
              <span className="text-sm font-medium">SR</span>
            </button>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-300">
          {t.title}
        </h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Leva strana - Detalji paketa */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0A0A0A] rounded-2xl p-8 border border-violet-500/20 shadow-xl shadow-violet-500/5"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center mr-3 text-violet-400">1</span>
                {t.selectedPackage}
              </h2>
              
              {/* Mentor info */}
              {selectedMentor && (
                <div className="flex items-center gap-4 mb-6 p-4 bg-white/5 rounded-xl">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-violet-500/30">
                    <Image
                      src={selectedMentor.image}
                      alt={selectedMentor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{selectedMentor.name}</h3>
                    <p className="text-violet-400">{selectedMentor.role}</p>
                  </div>
                </div>
              )}

              {/* Plan details */}
              <div className="space-y-4 bg-violet-500/5 p-5 rounded-xl">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-white/70">{t.plan}</span>
                  <span className="font-medium text-white">{planName}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-white/70">{t.duration}</span>
                  <span className="font-medium text-white">
                    {planName?.includes('Basic') ? '1 mesec' : 
                     planName?.includes('Pro') ? '3 meseca' : '6 meseci'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">{t.price}</span>
                  <div className="flex flex-col items-end">
                    <span className="font-semibold text-xl text-white">€{price}</span>
                    <span className="text-sm text-white/50">~{getRsdPrice()} RSD</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Method Selection */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
              className="bg-[#0A0A0A] rounded-2xl p-8 border border-violet-500/20 shadow-xl shadow-violet-500/5"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center mr-3 text-violet-400">2</span>
                {t.paymentMethod}
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`relative p-6 rounded-xl border transition-all duration-300 ${
                      paymentMethod === method.id
                        ? 'border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                        {method.icon}
                      </div>
                      <span className="font-medium text-center">
                        {typeof method.name === 'object' ? method.name[language] : method.name}
                      </span>
                      {method.subtext && (
                        <span className="text-xs text-violet-400 -mt-2">
                          {typeof method.subtext === 'object' ? method.subtext[language] : method.subtext}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Desna strana - Payment Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            key={paymentMethod}
            transition={{ duration: 0.3 }}
            className="bg-[#0A0A0A] rounded-2xl p-8 border border-violet-500/20 shadow-xl shadow-violet-500/5 lg:sticky lg:top-8"
          >
            {paymentMethod === 'bank' ? (
              <BankTransferDetails
                name={bankAccount.name}
                accountNumber={bankAccount.account}
                address={bankAccount.address}
                city={bankAccount.city}
                purpose={bankAccount.purpose}
                amount={getRsdPrice()}
                language={language}
              />
            ) : paymentMethod === 'card' ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center mr-3 text-violet-400">3</span>
                  {t.cardPayment}
                </h2>
                
                <div className="p-8 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 rounded-2xl border border-violet-500/20">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                      <i className="fa-solid fa-triangle-exclamation text-violet-400"></i>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">{t.comingSoon}</h3>
                      <p className="text-white/70 leading-relaxed">
                        {t.cardComingSoonText}
                      </p>
                      <div className="flex gap-2 mt-4">
                        <div className="w-10 h-6 rounded bg-white/10"></div>
                        <div className="w-10 h-6 rounded bg-white/10"></div>
                        <div className="w-10 h-6 rounded bg-white/10"></div>
                        <div className="w-10 h-6 rounded bg-white/10"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : paymentMethod === 'crypto' ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center mr-3 text-violet-400">3</span>
                  {t.cryptoPayment}
                </h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(cryptoIcons).map(([coin, icon]) => (
                      <button
                        key={coin}
                        onClick={() => setSelectedCrypto(coin as keyof typeof cryptoAddresses)}
                        className={`p-4 rounded-xl border transition-colors ${
                          selectedCrypto === coin 
                            ? 'border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/10' 
                            : 'border-white/10 hover:border-violet-500/50 bg-black/20'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          {icon}
                          <span className="font-medium">{coin}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {selectedCrypto && (
                    <div className="p-6 bg-violet-500/10 rounded-xl border border-violet-500/20">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-white/70">{t.amount}</span>
                        <span className="font-medium">€{price}</span>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm text-white/70">Wallet address</span>
                        <button 
                          onClick={() => copyToClipboard(cryptoAddresses[selectedCrypto], selectedCrypto)}
                          className="w-full flex items-center justify-between p-4 rounded-xl bg-black/40 border border-violet-500/20 hover:border-violet-500/40 transition-colors group"
                        >
                          <code className="font-mono text-sm">{cryptoAddresses[selectedCrypto]}</code>
                          <div className="p-1.5 rounded-lg group-hover:bg-white/5 transition-colors">
                            <i className="fa-solid fa-triangle-exclamation text-violet-400"></i>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 p-4 bg-violet-500/10 rounded-xl text-sm text-white/80">
                    <i className="fa-solid fa-triangle-exclamation text-violet-400"></i>
                    <p>{t.afterPayment}{' '}
                      <a href="https://www.instagram.com/ghostforcedesign/" 
                        className="text-violet-400 hover:text-violet-300 transition-colors"
                      >
                        Instagram
                      </a>{' '}
                      {t.or}{' '}
                      <a href="mailto:ghostforcestudio@gmail.com" 
                        className="text-violet-400 hover:text-violet-300 transition-colors"
                      >
                        e-mail
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ) : paymentMethod === 'paypal' ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center mr-3 text-violet-400">3</span>
                  PayPal Checkout
                </h2>
                
                <div className="p-6 bg-violet-500/10 rounded-xl border border-violet-500/20">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-white/70">{t.amount}</span>
                    <span className="font-medium">€{price}</span>
                  </div>
                  
                  <button className="w-full h-14 bg-[#FFC439] hover:bg-[#F2BA36] rounded-xl font-medium transition-colors flex items-center justify-center gap-2 relative group overflow-hidden">
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <svg className="h-6" viewBox="0 0 101 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M 12.237 2.8 L 4.437 2.8 C 3.937 2.8 3.437 3.2 3.337 3.7 L 0.237 23.7 C 0.137 24.1 0.437 24.4 0.837 24.4 L 4.537 24.4 C 5.037 24.4 5.537 24 5.637 23.5 L 6.437 18.1 C 6.537 17.6 6.937 17.2 7.537 17.2 L 10.037 17.2 C 15.137 17.2 18.137 14.7 18.937 9.8 C 19.237 7.7 18.937 6 17.937 4.8 C 16.837 3.5 14.837 2.8 12.237 2.8 Z M 13.137 10.1 C 12.737 12.9 10.537 12.9 8.537 12.9 L 7.337 12.9 L 8.137 7.7 C 8.137 7.4 8.437 7.2 8.737 7.2 L 9.337 7.2 C 10.737 7.2 12.037 7.2 12.737 8 C 13.137 8.4 13.337 9.1 13.137 10.1 Z" fill="#253B80"/>
                      <path d="M 35.437 10 L 31.737 10 C 31.437 10 31.137 10.2 31.137 10.5 L 30.937 11.5 L 30.637 11.1 C 29.837 9.9 28.037 9.5 26.237 9.5 C 22.137 9.5 18.637 12.6 17.937 17 C 17.537 19.2 18.037 21.3 19.337 22.7 C 20.437 24 22.137 24.5 24.037 24.5 C 27.337 24.5 29.237 22.5 29.237 22.5 L 29.037 23.5 C 28.937 23.9 29.237 24.3 29.637 24.3 L 33.037 24.3 C 33.537 24.3 34.037 23.9 34.137 23.4 L 36.037 10.7 C 36.137 10.3 35.837 10 35.437 10 Z M 30.337 17.2 C 29.937 19.3 28.337 20.8 26.137 20.8 C 25.037 20.8 24.237 20.5 23.637 19.9 C 23.037 19.3 22.837 18.4 23.037 17.4 C 23.337 15.3 25.137 13.8 27.237 13.8 C 28.337 13.8 29.137 14.1 29.737 14.7 C 30.337 15.3 30.537 16.2 30.337 17.2 Z" fill="#253B80"/>
                      <path d="M 55.337 10 L 51.637 10 C 51.237 10 50.937 10.2 50.737 10.5 L 43.537 21.7 L 40.337 11.2 C 40.237 10.8 39.837 10.5 39.437 10.5 L 35.837 10.5 C 35.437 10.5 35.037 10.9 35.237 11.3 L 40.937 23.5 L 35.437 31.4 C 35.137 31.8 35.437 32.4 35.937 32.4 L 39.637 32.4 C 40.037 32.4 40.337 32.2 40.537 31.9 L 55.837 11 C 56.137 10.6 55.837 10 55.337 10 Z" fill="#253B80"/>
                      <path d="M 67.737 2.8 L 59.937 2.8 C 59.437 2.8 58.937 3.2 58.837 3.7 L 55.737 23.7 C 55.637 24.1 55.937 24.4 56.337 24.4 L 60.337 24.4 C 60.737 24.4 61.037 24.1 61.137 23.8 L 61.937 18.1 C 62.037 17.6 62.437 17.2 63.037 17.2 L 65.537 17.2 C 70.637 17.2 73.637 14.7 74.437 9.8 C 74.737 7.7 74.437 6 73.437 4.8 C 72.337 3.5 70.337 2.8 67.737 2.8 Z M 68.637 10.1 C 68.237 12.9 66.037 12.9 64.037 12.9 L 62.837 12.9 L 63.637 7.7 C 63.637 7.4 63.937 7.2 64.237 7.2 L 64.837 7.2 C 66.237 7.2 67.537 7.2 68.237 8 C 68.637 8.4 68.837 9.1 68.637 10.1 Z" fill="#179BD7"/>
                      <path d="M 90.937 10 L 87.237 10 C 86.937 10 86.637 10.2 86.637 10.5 L 86.437 11.5 L 86.137 11.1 C 85.337 9.9 83.537 9.5 81.737 9.5 C 77.637 9.5 74.137 12.6 73.437 17 C 73.037 19.2 73.537 21.3 74.837 22.7 C 75.937 24 77.637 24.5 79.537 24.5 C 82.837 24.5 84.737 22.5 84.737 22.5 L 84.537 23.5 C 84.437 23.9 84.737 24.3 85.137 24.3 L 88.537 24.3 C 89.037 24.3 89.537 23.9 89.637 23.4 L 91.537 10.7 C 91.637 10.3 91.337 10 90.937 10 Z M 85.737 17.2 C 85.337 19.3 83.737 20.8 81.537 20.8 C 80.437 20.8 79.637 20.5 79.037 19.9 C 78.437 19.3 78.237 18.4 78.437 17.4 C 78.737 15.3 80.537 13.8 82.637 13.8 C 83.737 13.8 84.537 14.1 85.137 14.7 C 85.737 15.3 85.937 16.2 85.737 17.2 Z" fill="#179BD7"/>
                      <path d="M 95.337 3.3 L 92.137 23.6 C 92.037 24 92.337 24.3 92.737 24.3 L 95.937 24.3 C 96.437 24.3 96.937 23.9 97.037 23.4 L 100.237 3.5 C 100.337 3.1 100.037 2.8 99.637 2.8 L 96.037 2.8 C 95.737 2.8 95.437 3 95.337 3.3 Z" fill="#179BD7"/>
                    </svg>
                  </button>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-violet-500/10 rounded-xl text-sm text-white/80">
                  <i className="fa-solid fa-triangle-exclamation text-violet-400"></i>
                  <p>{t.afterPayment}{' '}
                    <a href="https://www.instagram.com/ghostforcedesign/" 
                      className="text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      Instagram
                    </a>{' '}
                    {t.or}{' '}
                    <a href="mailto:ghostforcestudio@gmail.com" 
                      className="text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      e-mail
                    </a>
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Plaćanje karticom</h2>
                <p className="p-4 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 rounded-xl text-white/80 border border-violet-500/20">
                  {t.cardComingSoonText}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  )
}

// Create a wrapper component
export default function CheckoutPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutPage />
    </Suspense>
  )
} 
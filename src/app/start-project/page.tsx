"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Feature component for timeline cards
const Feature = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex items-center gap-3 text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">
    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-400 to-fuchsia-400 bg-opacity-10 flex items-center justify-center">
      <i className={`${icon} text-xs`} />
    </span>
    <span>{text}</span>
  </div>
);

// AnimatedBackground component for client-side only animations
const AnimatedBackground = () => {
  const [lines, setLines] = useState<Array<{ left: string; top: string }>>([]);

  useEffect(() => {
    // Generate random positions only on the client side
    const newLines = Array.from({ length: 40 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }));
    setLines(newLines);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {lines.map((position, i) => (
        <motion.div
          key={i}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent w-full"
          style={{ 
            top: position.top,
            left: position.left
          }}
          animate={{
            x: ["-100%", "100%"],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default function StartProjectPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [selectedTimeline, setSelectedTimeline] = useState<string | null>(null);

  const services = [
    {
      id: "design",
      title: "Graphic Design",
      icon: "fas fa-palette",
      description: "Brand identity, logos, marketing materials",
      gradient: "from-violet-600 to-fuchsia-600",
      features: [
        { text: "Brand Identity Design", icon: "fas fa-fingerprint" },
        { text: "Logo Creation", icon: "fas fa-pen-fancy" },
        { text: "Marketing Materials", icon: "fas fa-bullhorn" },
        { text: "Social Media Graphics", icon: "fas fa-hashtag" }
      ]
    },
    {
      id: "video",
      title: "Video Editing",
      icon: "fas fa-video",
      description: "Professional video editing and motion graphics",
      gradient: "from-cyan-600 to-blue-600",
      features: [
        { text: "Motion Graphics", icon: "fas fa-film" },
        { text: "Video Post-Production", icon: "fas fa-cut" },
        { text: "Color Grading", icon: "fas fa-palette" },
        { text: "Sound Design", icon: "fas fa-music" }
      ]
    },
    {
      id: "web",
      title: "Web Development",
      icon: "fas fa-code",
      description: "Custom websites and web applications",
      gradient: "from-purple-600 to-indigo-600",
      features: [
        { text: "Custom Development", icon: "fas fa-code-branch" },
        { text: "Responsive Design", icon: "fas fa-mobile-alt" },
        { text: "Performance Optimization", icon: "fas fa-tachometer-alt" },
        { text: "SEO Integration", icon: "fas fa-search" }
      ]
    }
  ];

  const budgetRanges = [
    {
      id: "starter",
      title: "Starter",
      range: "$250 - $500",
      description: "Perfect for small projects and basic needs",
      icon: "fas fa-seedling"
    },
    {
      id: "professional",
      title: "Professional",
      range: "$500 - $1,000",
      description: "Ideal for established businesses and complex projects",
      icon: "fas fa-briefcase"
    },
    {
      id: "enterprise",
      title: "Enterprise",
      range: "$5,000+",
      description: "For large-scale projects and custom solutions",
      icon: "fas fa-building"
    }
  ];

  const timelines = [
    {
      id: "standard",
      title: "Standard",
      duration: "2-3 weeks",
      description: "Regular development pace with thorough quality checks",
      icon: "fas fa-clock"
    },
    {
      id: "express",
      title: "Express",
      duration: "1-2 weeks",
      description: "Accelerated timeline for urgent projects",
      icon: "fas fa-rocket"
    },
    {
      id: "custom",
      title: "Custom",
      duration: "Flexible",
      description: "Tailored timeline based on project requirements",
      icon: "fas fa-calendar-alt"
    }
  ];

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return selectedService !== null;
      case 2:
        return selectedBudget !== null;
      case 3:
        return selectedTimeline !== null;
      default:
        return false;
    }
  };

  const getStepProgress = () => {
    let progress = 0;
    if (selectedService) progress += 33.33;
    if (selectedBudget) progress += 33.33;
    if (selectedTimeline) progress += 33.34;
    return progress;
  };

  const FloatingElement = ({ delay = 0, children }: { delay: number; children: React.ReactNode }) => (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        y: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay
        },
        opacity: {
          duration: 0.4,
          delay
        }
      }}
    >
      {children}
    </motion.div>
  );

  return (
    <main className="min-h-screen bg-black text-white relative" ref={containerRef}>
      {/* Enhanced Background Effects - Now applied to entire page */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(98,0,255,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        
        {/* Animated gradient orbs */}
        <motion.div 
          style={{ y, opacity }}
          className="absolute top-20 -left-4 w-96 h-96 bg-violet-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"
        />
        <motion.div 
          style={{ y, opacity }}
          className="absolute top-20 -right-4 w-96 h-96 bg-violet-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"
        />

        {/* Client-side only animated lines */}
        <AnimatedBackground />
      </div>

      {/* Hero Section with Progress Bar */}
      <section className="relative py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block"
            >
              <motion.span 
                className="inline-block px-4 py-1.5 bg-violet-600/10 rounded-full text-violet-400 text-sm font-medium mb-6 border border-violet-500/20"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <i className="fas fa-rocket mr-2" />
                START YOUR JOURNEY
              </motion.span>
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-400 to-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Let's Build Your
              <br />
              <span className="text-violet-400">Dream Project</span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Transform your vision into reality with our expert team
            </motion.p>
          </div>

          {/* Progress Bar */}
          <div className="max-w-3xl mx-auto mb-20">
            <div className="h-2 bg-violet-900/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-600"
                initial={{ width: "0%" }}
                animate={{ width: `${getStepProgress()}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {[1, 2, 3].map((step) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: step * 0.1 }}
                  className={`text-center ${
                    isStepComplete(step) ? "text-violet-400" : "text-white/40"
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center border-2 ${
                      isStepComplete(step)
                        ? "border-violet-400 bg-violet-400/20"
                        : "border-white/20 bg-black"
                    }`}
                  >
                    {isStepComplete(step) ? (
                      <motion.i 
                        className="fas fa-check text-sm"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      />
                    ) : (
                      <span>{step}</span>
                    )}
                  </motion.div>
                  <span className="text-sm font-medium">
                    {step === 1 ? "Service" : step === 2 ? "Budget" : "Timeline"}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Step 1: Choose Service */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              1. Choose Your Service
            </motion.h2>
            <motion.p 
              className="text-lg text-white/60 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Select the service that best matches your project needs
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <motion.button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className={`group relative p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 text-left ${
                  selectedService === service.id
                    ? `bg-gradient-to-b ${service.gradient} border-transparent`
                    : "bg-violet-600/5 border-violet-500/10 hover:border-violet-500/20"
                }`}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-10 blur-xl`} />
                </div>

                <div className="relative z-10">
                  {/* Icon container with gradient border */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-full h-full rounded-xl bg-black/40 flex items-center justify-center backdrop-blur-xl">
                      <i className={`${service.icon} text-2xl group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                  </div>

                  {/* Title and description */}
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-violet-200 transition-all duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/60 mb-6">{service.description}</p>
                  
                  {/* Features grid */}
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-3 text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300"
                      >
                        <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${service.gradient} bg-opacity-10 flex items-center justify-center`}>
                          <i className={`${feature.icon} text-xs`} />
                        </span>
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selection Indicator */}
                {selectedService === service.id && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400 flex items-center justify-center"
                  >
                    <i className="fas fa-check text-sm" />
                  </motion.div>
                )}

                {/* Hover border gradient */}
                <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-b from-transparent via-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Step 2: Choose Budget */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              2. Select Your Budget
            </motion.h2>
            <motion.p 
              className="text-lg text-white/60 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Choose a budget range that works for your project
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {budgetRanges.map((budget) => (
              <motion.button
                key={budget.id}
                onClick={() => setSelectedBudget(budget.id)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className={`group relative p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 text-left ${
                  selectedBudget === budget.id
                    ? "bg-gradient-to-b from-violet-600 to-violet-800 border-transparent"
                    : "bg-violet-600/5 border-violet-500/10 hover:border-violet-500/20"
                }`}
              >
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-400 to-fuchsia-400 p-0.5 mb-6">
                    <div className="w-full h-full rounded-xl bg-black/40 flex items-center justify-center">
                      <i className={`${budget.icon} text-2xl`} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{budget.title}</h3>
                  <p className="text-violet-400 font-bold mb-4">{budget.range}</p>
                  <p className="text-white/60">{budget.description}</p>
                </div>

                {/* Selection Indicator */}
                {selectedBudget === budget.id && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400 flex items-center justify-center">
                    <i className="fas fa-check text-sm" />
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Step 3: Choose Timeline */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              3. Choose Your Timeline
            </motion.h2>
            <motion.p 
              className="text-lg text-white/60 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Select how quickly you need your project completed
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {timelines.map((timeline) => (
              <motion.button
                key={timeline.id}
                onClick={() => setSelectedTimeline(timeline.id)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className={`group relative p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 text-left ${
                  selectedTimeline === timeline.id
                    ? "bg-gradient-to-b from-violet-900/80 to-violet-800/80 border-violet-400 shadow-lg shadow-violet-500/25"
                    : "bg-violet-600/5 border-violet-500/10 hover:border-violet-500/20"
                }`}
              >
                {/* Background Effects */}
                <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${
                  selectedTimeline === timeline.id ? 'opacity-20' : 'group-hover:opacity-10'
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-fuchsia-400 blur-xl" />
                </div>

                <div className="relative z-10">
                  {/* Icon with animated container */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-violet-400 to-fuchsia-400 p-0.5 mb-6 transform transition-all duration-300 ${
                    selectedTimeline === timeline.id ? 'scale-110 shadow-lg shadow-violet-500/50' : 'group-hover:scale-110'
                  }`}>
                    <div className={`w-full h-full rounded-xl flex items-center justify-center backdrop-blur-xl ${
                      selectedTimeline === timeline.id ? 'bg-violet-500/20' : 'bg-black/40'
                    }`}>
                      <i className={`${timeline.icon} text-2xl ${
                        selectedTimeline === timeline.id ? 'text-white' : 'text-violet-400'
                      }`} />
                    </div>
                  </div>

                  {/* Title and Duration */}
                  <div className="mb-4">
                    <h3 className={`text-2xl font-bold transition-colors duration-300 ${
                      selectedTimeline === timeline.id 
                        ? 'text-white'
                        : 'text-violet-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-violet-200'
                    }`}>{timeline.title}</h3>
                    <p className={`text-xl font-semibold mt-2 transition-colors duration-300 ${
                      selectedTimeline === timeline.id ? 'text-violet-200' : 'text-violet-400'
                    }`}>{timeline.duration}</p>
                  </div>

                  {/* Description with enhanced styling */}
                  <p className={`transition-colors duration-300 ${
                    selectedTimeline === timeline.id ? 'text-violet-100' : 'text-white/60'
                  }`}>{timeline.description}</p>

                  {/* Features specific to timeline */}
                  <div className="mt-6 space-y-3">
                    {timeline.id === 'standard' && (
                      <>
                        <Feature icon="fas fa-check" text="Thorough Quality Assurance" />
                        <Feature icon="fas fa-users" text="Full Team Collaboration" />
                        <Feature icon="fas fa-comments" text="Regular Progress Updates" />
                      </>
                    )}
                    {timeline.id === 'express' && (
                      <>
                        <Feature icon="fas fa-bolt" text="Accelerated Development" />
                        <Feature icon="fas fa-clock" text="Priority Support" />
                        <Feature icon="fas fa-tasks" text="Streamlined Process" />
                      </>
                    )}
                    {timeline.id === 'custom' && (
                      <>
                        <Feature icon="fas fa-calendar" text="Flexible Milestones" />
                        <Feature icon="fas fa-handshake" text="Tailored Approach" />
                        <Feature icon="fas fa-chart-line" text="Adaptive Planning" />
                      </>
                    )}
                  </div>
                </div>

                {/* Selection Indicator */}
                {selectedTimeline === timeline.id && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400 flex items-center justify-center shadow-lg"
                  >
                    <i className="fas fa-check text-sm text-white" />
                  </motion.div>
                )}

                {/* Hover border gradient */}
                <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-b from-transparent via-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Summary & CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(98,0,255,0.2),transparent_70%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto">
            {selectedService && selectedBudget && selectedTimeline ? (
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-8 p-8 rounded-2xl bg-gradient-to-b from-violet-600/10 via-violet-500/5 to-violet-600/10 border border-violet-500/20 backdrop-blur-sm relative overflow-hidden group"
                >
                  {/* Background Effects */}
                  <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6"
                    >
                      <i className="fas fa-check-circle text-violet-400" />
                      Ready to Launch
                    </motion.div>
                    
                    <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">Project Summary</h3>
                    
                    <div className="space-y-6 text-left max-w-lg mx-auto">
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-6 p-4 rounded-xl bg-violet-500/5 border border-violet-500/10 hover:border-violet-500/20 transition-colors group/item"
                      >
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-400 to-fuchsia-400 p-0.5">
                          <div className="w-full h-full rounded-lg bg-black/40 flex items-center justify-center">
                            <i className="fas fa-palette text-lg" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-white/60 text-sm mb-1">Service</p>
                          <p className="font-medium text-lg">{services.find(s => s.id === selectedService)?.title}</p>
                        </div>
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-6 p-4 rounded-xl bg-violet-500/5 border border-violet-500/10 hover:border-violet-500/20 transition-colors group/item"
                      >
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-400 to-fuchsia-400 p-0.5">
                          <div className="w-full h-full rounded-lg bg-black/40 flex items-center justify-center">
                            <i className="fas fa-wallet text-lg" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-white/60 text-sm mb-1">Budget Range</p>
                          <p className="font-medium text-lg">{budgetRanges.find(b => b.id === selectedBudget)?.range}</p>
                        </div>
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-6 p-4 rounded-xl bg-violet-500/5 border border-violet-500/10 hover:border-violet-500/20 transition-colors group/item"
                      >
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-400 to-fuchsia-400 p-0.5">
                          <div className="w-full h-full rounded-lg bg-black/40 flex items-center justify-center">
                            <i className="fas fa-clock text-lg" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-white/60 text-sm mb-1">Timeline</p>
                          <p className="font-medium text-lg">{timelines.find(t => t.id === selectedTimeline)?.duration}</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <a
                    href="https://calendly.com/ghostforcestudio/30min?month=2025-02"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-600 rounded-xl font-medium text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/25"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Schedule Your Free Consultation
                      <i className="fas fa-arrow-right transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 opacity-0 group-hover:opacity-100 blur transition-all duration-300 -z-10" />
                  </a>
                </motion.div>
              </div>
            ) : (
              <div className="text-center">
                <motion.h2 
                  className="text-3xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Complete All Steps to Continue
                </motion.h2>
                <motion.p 
                  className="text-white/60"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Please select your preferences for service, budget, and timeline above
                </motion.p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
} 
"use client";
import { motion } from "framer-motion";
import { GiArtificialIntelligence, GiLightningSpanner, GiMoebiusStar } from "react-icons/gi";
import { FiCheckCircle, FiCloudLightning, FiUploadCloud } from "react-icons/fi";
import { BsGear, BsPlugin, BsRobot } from "react-icons/bs";
import Heading from "./Heading";

const FutureFeatures = () => {
  const currentFeatures = [
    {
      title: "Instant Creation",
      description: "Build your AI chatbot in seconds with intuitive interface",
      icon: <FiCloudLightning className="h-8 w-8" />,
      gradient: "from-green-500 to-cyan-400",
    },
    {
      title: "Personalized AI",
      description: "Tailor-made chatbot personality and appearance",
      icon: <BsRobot className="h-8 w-8" />,
      gradient: "from-blue-500 to-sky-400",
    },
    {
      title: "Instant Deployment",
      description: "One-click deployment to any platform",
      icon: <FiUploadCloud className="h-8 w-8" />,
      gradient: "from-purple-500 to-pink-400",
    },
  ];

  const futureFeatures = [
    {
      title: "Advanced Customization",
      description: "Granular control over every aspect of your AI",
      icon: <BsGear className="h-8 w-8" />,
      gradient: "from-purple-600 to-pink-500",
    },
    {
      title: "Multi-Platform Integration",
      description: "Connect with all major platforms and services",
      icon: <BsPlugin className="h-8 w-8" />,
      gradient: "from-indigo-600 to-blue-400",
    },
    {
      title: "Voice Interface",
      description: "Natural voice interaction capabilities",
      icon: <GiMoebiusStar className="h-8 w-8" />,
      gradient: "from-rose-600 to-orange-400",
    },
  ];

  return (
    <section className="relative min-h-[100vh] overflow-hidden pb-5 pt-20">
      {/* Background Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        className="absolute left-1/3 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-500/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <Heading variant="secondary">Today & Tomorrow</Heading>
          <p className="mt-4 text-lg text-slate-300">Redefining AI interaction capabilities</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Current Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3">
              <FiCheckCircle className="h-8 w-8 text-cyan-400" />
              <h3 className="text-2xl font-bold text-white">Current Features</h3>
            </div>

            {currentFeatures.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="cursor-default rounded-xl border border-slate-700/50 bg-slate-800/30 p-6 backdrop-blur-lg transition-all hover:border-white/40 hover:bg-white/10"
              >
                <div className="flex items-start gap-4">
                  <div className={`rounded-lg bg-gradient-to-r ${feature.gradient} p-3`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white">{feature.title}</h4>
                    <p className="mt-2 text-slate-400">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Future Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3">
              <GiLightningSpanner className="h-8 w-8 text-purple-400" />
              <h3 className="text-2xl font-bold text-white">Coming Soon</h3>
            </div>

            {futureFeatures.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="cursor-default rounded-xl border border-slate-700/50 bg-slate-800/30 p-6 backdrop-blur-lg transition-all hover:border-white/40 hover:bg-white/10"
              >
                <div className="flex items-start gap-4">
                  <div className={`rounded-lg bg-gradient-to-r ${feature.gradient} p-3`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white">{feature.title}</h4>
                    <p className="mt-2 text-slate-400">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating AI Icon */}
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="flex justify-center pt-32"
        >
          <GiArtificialIntelligence className="h-16 w-16 text-cyan-400/30" />
        </motion.div>
      </div>
    </section>
  );
};

export default FutureFeatures;

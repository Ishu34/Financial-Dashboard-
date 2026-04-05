import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Particles } from '@/components/magicui/particles';
import { ShimmerButton } from '@/components/magicui/shimmer-button';
import { BlurFade } from '@/components/magicui/blur-fade';

export function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Particles Background */}
      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        ease={60}
        color="#3B82F6"
        staticity={40}
        size={0.5}
      />
      
      <BlurFade delay={0} inView>
        <div className="flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.34, 1.56, 0.64, 1], // spring-like
              type: 'spring',
              stiffness: 100,
              damping: 15
            }}
          >
            <motion.span
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="block text-[8rem] sm:text-[10rem] font-bold leading-none bg-gradient-to-br from-primary via-primary-hover to-primary bg-clip-text text-transparent select-none"
            >
              404
            </motion.span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.15, 
              duration: 0.5,
              type: 'spring',
              stiffness: 100,
              damping: 15
            }}
            className="mt-4 text-2xl sm:text-3xl font-semibold text-foreground"
          >
            Page not found
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.25, 
              duration: 0.5,
              type: 'spring',
              stiffness: 100,
              damping: 15
            }}
            className="mt-3 text-muted max-w-md mx-auto text-sm sm:text-base leading-relaxed"
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.35, 
              duration: 0.5,
              type: 'spring',
              stiffness: 100,
              damping: 15
            }}
            className="mt-8 flex flex-col sm:flex-row items-center gap-3"
          >
            <Link to="/" className="cursor-pointer">
              <ShimmerButton
                shimmerColor="#3B82F6"
                background="linear-gradient(135deg, #3B82F6, #2563EB)"
                borderRadius="12px"
                shimmerDuration="2.5s"
                className="px-6 py-3 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className="inline-flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Go to Dashboard
                </span>
              </ShimmerButton>
            </Link>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoBack}
              className="cursor-pointer inline-flex items-center gap-2 bg-surface text-foreground border border-border rounded-xl px-6 py-3 text-sm font-medium shadow-sm hover:bg-surface-hover hover:border-border-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.5, 
              duration: 0.5,
              type: 'spring',
              stiffness: 100,
              damping: 15
            }}
            className="mt-12"
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-8 h-px bg-border" />
              <span>Need help?</span>
              <span className="w-8 h-px bg-border" />
            </div>
            <p className="mt-2 text-xs text-muted">
              Check your URL or navigate using the sidebar menu
            </p>
          </motion.div>
        </div>
      </BlurFade>
    </div>
  );
}

export default NotFoundPage;

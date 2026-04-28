'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnimatedTooltip } from '@/components/ui/animated-tooltip'
import { Label } from '@/components/ui/label'
import { Section } from '@/components/ui/section'
import { GradientText } from '@/components/ui/gradient-text'
import { teamMembers } from '@/constants/team'
import { EASE } from '@/lib/animations'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

export function Team() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section>
      {/* Aurora */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse, var(--color-geko-purple-a09) 0%, var(--color-geko-blue-a04) 50%, transparent 70%)',
          }}
        />
      </div>

      <div className="section-container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial={prefersReduced ? false : 'hidden'}
          animate={prefersReduced ? 'visible' : isInView ? 'visible' : 'hidden'}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <Label color="purple">Nuestro equipo</Label>
          </motion.div>

          {/* Heading */}
          <motion.div variants={itemVariants} className="text-center mb-14 max-w-2xl">
            <h2 className="font-heading font-bold text-balance text-white leading-[1.1] mb-5 text-4xl md:text-5xl lg:text-[3.5rem]">
              Personas reales.{' '}
              <GradientText variant="accent">Resultados reales.</GradientText>
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-white/50">
              Un equipo compacto y especializado: estrategia, diseño, desarrollo y comunidad
              trabajando como uno solo para hacer crecer tu negocio.
            </p>
          </motion.div>

          {/* AnimatedTooltip — círculos con hover */}
          <motion.div variants={itemVariants} className="flex justify-center items-center mb-14">
            <AnimatedTooltip items={teamMembers} />
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants}>
            <Link
              href="/nosotros"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/45 hover:text-white transition-colors duration-200 group"
            >
              Conoce más sobre nosotros
              <ArrowRight
                size={15}
                strokeWidth={1.5}
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}

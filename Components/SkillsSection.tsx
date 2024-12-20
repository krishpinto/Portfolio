'use client'

import { motion } from 'framer-motion'
import { SiHtml5, SiCss3, SiJavascript, SiReact, SiNextdotjs, SiExpress, SiNodedotjs, SiMongodb, SiPrisma, SiTailwindcss, SiGit, SiPostgresql } from 'react-icons/si'

interface Skill {
  name: string
  icon: React.ReactNode
  color: string
}

const skills: Skill[] = [
  { name: 'HTML', icon: <SiHtml5 className="w-12 h-12" />, color: 'text-orange-500' },
  { name: 'CSS', icon: <SiCss3 className="w-12 h-12" />, color: 'text-blue-500' },
  { name: 'JavaScript', icon: <SiJavascript className="w-12 h-12" />, color: 'text-yellow-400' },
  { name: 'React', icon: <SiReact className="w-12 h-12" />, color: 'text-cyan-400' },
  { name: 'Next.js', icon: <SiNextdotjs className="w-12 h-12" />, color: 'text-white' },
  { name: 'Express.js', icon: <SiExpress className="w-12 h-12" />, color: 'text-gray-400' },
  { name: 'Node.js', icon: <SiNodedotjs className="w-12 h-12" />, color: 'text-green-500' },
  { name: 'MongoDB', icon: <SiMongodb className="w-12 h-12" />, color: 'text-green-400' },
  { name: 'Prisma', icon: <SiPrisma className="w-12 h-12" />, color: 'text-blue-400' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-12 h-12" />, color: 'text-teal-400' },
  { name: 'Git', icon: <SiGit className="w-12 h-12" />, color: 'text-orange-600' },
  { name: 'SQL', icon: <SiPostgresql className="w-12 h-12" />, color: 'text-blue-300' },
]

export function SkillsSection() {
  return (
    <section className="py-24 text-white">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-16 text-center">My Skills</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-12">
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              className="flex flex-col items-center justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className={`${skill.color} mb-4`}>{skill.icon}</div>
              <span className="text-lg font-semibold text-center">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


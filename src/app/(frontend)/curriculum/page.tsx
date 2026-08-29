import type { Metadata } from 'next'
import { CurriculumSystems } from '@/components/curriculum/CurriculumSystems'
import { curriculumCourses } from '@/lib/cms-courses'
import { getSiteSettings } from '@/lib/site'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '课程体系',
  description: '星球学院课程体系：兴趣体系、融合体系、拔创体系。',
}

export default async function CurriculumPage() {
  const [courses, site] = await Promise.all([curriculumCourses(), getSiteSettings()])

  return (
    <>
      <section className="container-wide pb-16 pt-14 md:pt-20">
        <h1 className="sr-only">课程体系</h1>
        <article className="curriculum-map">
          <img src="/samples/curriculum-system.png" alt="课程体系：以人工智能为中心的跨学科图谱" />
        </article>
      </section>
      <CurriculumSystems courses={courses} flipMode={site.interaction.cardFlip} />
    </>
  )
}

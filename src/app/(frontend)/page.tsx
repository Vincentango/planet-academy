import { CourseFlipCard } from '@/components/courses/CourseFlipCard'
import { CmsPage } from '@/components/site/CmsPage'
import { VideoQuotePlayer } from '@/components/site/VideoQuotePlayer'
import { featuredCourses } from '@/lib/cms-courses'
import { getSiteSettings } from '@/lib/site'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const site = await getSiteSettings()
  const courses = await featuredCourses(4)
  const fallback = (
    <>
      <section className="container-wide pb-8 pt-8 md:pt-12">
        <article className="gsd-split">
          <div className="gsd-split__media gsd-split__media--hero">
            <span className="gsd-split__caption chip-yellow">CRADLE-X</span>
            <p className="headline text-6xl text-white md:text-7xl">星球学院</p>
          </div>
          <div className="gsd-split__copy">
            <p className="kicker">星球学院 · CRADLE-X</p>
            <h1 className="headline mt-6 text-5xl md:text-7xl lg:text-8xl">无边界未来学校</h1>
            <p className="hero-en">BORDERLESS FUTURE SCHOOL</p>
          </div>
        </article>
      </section>
      <section className="container-wide py-8 md:py-14">
        <article className="panel intro-ed">
          <div className="intro-ed__grid">
            <h2 className="intro-ed__en">
              <span>Driving Interdisciplinary</span>
              <span>Integration with</span>
              <span>Emergent Technology</span>
            </h2>
            <div className="intro-ed__zh">
              <p>以前沿科技构建跨学科融合课程体系</p>
              <p>以真实世界问题驱动项目制学习方式</p>
            </div>
          </div>
        </article>
      </section>
      <section className="container-wide py-6">
        <VideoQuotePlayer
          src="/samples/home-quote.mp4"
          english="Committed to Educational Sharing and Equity"
          chinese="推动课程内容到基础设施再到运营模式的多维度升级"
        />
      </section>
      <section id="featured" className="container-wide py-16 pb-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="section-head" style={{ margin: 0 }}>课程精选</h2>
          <Link href="/curriculum" className="btn-ghost no-underline">了解更多</Link>
        </div>
        <div className="course-grid course-grid--projects mt-10">
          {courses.slice(0, 4).map((course, i) => (
            <CourseFlipCard key={course.slug} course={course} tone={i} mode={site.interaction.cardFlip} face="photo" />
          ))}
        </div>
      </section>
    </>
  )

  return <CmsPage slug="home" fallback={fallback} interaction={site.interaction} courses={courses} />
}

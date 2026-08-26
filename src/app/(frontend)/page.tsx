import { CourseFlipCard } from '@/components/courses/CourseFlipCard'
import { CmsPage } from '@/components/site/CmsPage'
import { featuredCourses } from '@/lib/cms-courses'
import { getSiteSettings } from '@/lib/site'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const site = await getSiteSettings()
  const courses = await featuredCourses(4)
  const fallback = (
    <>
      <section className="container-wide pb-6 pt-6 md:pt-8">
        <article className="gsd-split">
          <div className="gsd-split__media gsd-split__media--hero">
            <span className="gsd-split__caption chip-yellow">CRADLE-X</span>
            <p className="headline text-5xl text-white md:text-6xl">星球学院</p>
          </div>
          <div className="gsd-split__copy">
            <p className="kicker">星球学院 · CRADLE-X</p>
            <h1 className="headline mt-5 text-4xl md:text-6xl">无边界未来学校</h1>
            <p className="hero-en">BORDERLESS FUTURE SCHOOL</p>
          </div>
        </article>
      </section>
      <section className="container-wide py-6">
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
      <section className="container-wide py-2">
        <article className="video-quote">
          <video src="/samples/sample-01.mp4" autoPlay muted loop playsInline />
          <div className="video-quote__veil" />
          <div className="video-quote__copy">
            <p className="video-quote__en">Committed to Educational Sharing and Equity</p>
            <p className="video-quote__zh">推动课程内容到基础设施再到运营模式的多维度升级</p>
          </div>
        </article>
      </section>
      <section className="container-wide py-6">
        <article className="panel diagram-panel">
          <img src="/samples/five-pillars.png" alt="pedagogy · space · technology · evaluation · operation" />
        </article>
      </section>
      <section id="featured" className="container-wide py-10 pb-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <p className="kicker">课程精选</p>
          <Link href="/scenes" className="text-sm font-semibold no-underline">进入资源库</Link>
        </div>
        <div className="course-grid mt-8">
          {courses.slice(0, 4).map((course, i) => (
            <CourseFlipCard key={course.slug} course={course} tone={i} mode={site.interaction.cardFlip} />
          ))}
        </div>
      </section>
    </>
  )

  return <CmsPage slug="home" fallback={fallback} interaction={site.interaction} courses={courses} />
}

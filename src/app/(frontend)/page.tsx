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
      <section className="nuvu-hero">
        <div className="container-wide nuvu-hero__band">
          <div className="nuvu-hero__copy">
            <h1 className="headline nuvu-hero__title">无边界未来学校</h1>
            <p className="hero-en">BORDERLESS FUTURE SCHOOL</p>
          </div>
          <div className="nuvu-hero__stage">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/samples/home-stage.jpg" alt="" />
          </div>
        </div>
      </section>
      <section className="nuvu-pair">
        <div className="container-wide nuvu-pair__grid">
          <article className="nuvu-pair__cell nuvu-pair__cell--copy">
            <h2 className="intro-ed__en">
              <span>Driving Interdisciplinary</span>
              <span>Integration with</span>
              <span>Emergent Technology</span>
            </h2>
            <div className="intro-ed__zh">
              <p>以前沿科技构建跨学科融合课程体系</p>
              <p>以真实世界问题驱动项目制学习方式</p>
            </div>
          </article>
          <article className="nuvu-pair__cell nuvu-pair__cell--media">
            <VideoQuotePlayer
              src="/samples/home-quote.mp4"
              english="Committed to Educational Sharing and Equity"
              chinese="推动课程内容到基础设施再到运营模式的多维度升级"
            />
          </article>
        </div>
      </section>
      <section id="featured" className="container-wide nuvu-studios">
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

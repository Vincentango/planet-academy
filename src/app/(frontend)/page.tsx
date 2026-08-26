import { CourseFlipCard } from '@/components/courses/CourseFlipCard'
import { SampleVideo } from '@/components/site/SampleVideo'
import { CmsPage } from '@/components/site/CmsPage'
import { featuredCourses } from '@/lib/cms-courses'
import { getSiteSettings } from '@/lib/site'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const CLIPS = [
  { src: '/samples/sample-01.mp4', label: '示例影像 01', title: '项目现场', body: '占位影像。待替换为项目现场与学生工作过程。' },
  { src: '/samples/sample-02.mp4', label: '示例影像 02', title: '项目推进', body: '占位影像。待替换为提出问题、做出东西、用证据说话的过程。' },
  { src: '/samples/sample-03.mp4', label: '示例影像 03', title: '无边界校园', body: '占位影像。待替换为学习发生在世界里的真实片段。' },
]

const LINES = [
  { tone: 'highlighter--yellow', text: 'Committed to Educational\nSharing and Equity\n推动课程内容到基础设施再到\n运营模式的多维度升级' },
  { tone: 'highlighter--charcoal', text: '以研究室项目推进学习：提出问题、做出东西、用证据说话，而不是只完成一份作业。' },
]

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
            <h1 className="headline mt-5 text-4xl md:text-6xl">未来无边界学校</h1>
          </div>
        </article>
      </section>
      <section className="container-wide py-6">
        <article className="panel intro-ed">
          <div className="intro-ed__grid">
            <h2 className="intro-ed__en">
              <span>Driving Interdisciplinary</span>
              <span className="intro-ed__soft">Integration with</span>
              <span>Emergent Technology</span>
            </h2>
            <div className="intro-ed__zh">
              <p>以前沿科技构建跨学科融合课程体系</p>
              <p>以真实世界问题驱动项目制学习方式</p>
            </div>
          </div>
        </article>
      </section>
      <section className="container-wide">
        <div className="mosaic">
          <article className="mosaic__tile mosaic__tile--v1">
            <SampleVideo src={CLIPS[0].src} label={CLIPS[0].label} title={CLIPS[0].title} caption={CLIPS[0].body} autoplay={site.interaction.videoAutoplay} />
          </article>
          <aside className="mosaic__tile mosaic__tile--t1 highlighter highlighter--yellow"><p className="whitespace-pre-line">{LINES[0].text}</p></aside>
          <article className="mosaic__tile mosaic__tile--v2">
            <SampleVideo src={CLIPS[1].src} label={CLIPS[1].label} title={CLIPS[1].title} caption={CLIPS[1].body} autoplay={site.interaction.videoAutoplay} />
          </article>
          <article className="mosaic__tile mosaic__tile--t2">
            <div className="mosaic__media mosaic__media--diagram">
              <img src="/samples/five-pillars.png" alt="pedagogy · space · technology · evaluation · operation" />
            </div>
          </article>
          <article className="mosaic__tile mosaic__tile--v3">
            <SampleVideo src={CLIPS[2].src} label={CLIPS[2].label} title={CLIPS[2].title} caption={CLIPS[2].body} autoplay={site.interaction.videoAutoplay} />
          </article>
          <aside className="mosaic__tile mosaic__tile--t3 highlighter highlighter--charcoal"><p className="whitespace-pre-line">{LINES[1].text}</p></aside>
        </div>
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

import GitHubStars from './components/github-stars'
import { LenisWrapper } from './components/lenis-wrapper'
import NavClient from './components/nav-client'
import Blogs from './components/sections/blogs'
import Features from './components/sections/features'
import Footer from './components/sections/footer'
import Hero from './components/sections/hero'
import Integrations from './components/sections/integrations'
import Testimonials from './components/sections/testimonials'


export default function Landing() {
  return (
    <main className="bg-[#0C0C0C] relative overflow-x-hidden font-geist-sans">
      <LenisWrapper>
        <NavClient>
          <GitHubStars />
        </NavClient>

        <Hero/>
        <Features/>
        <Integrations/>
        <Testimonials/>
        <Blogs/>

        {/* Footer */}
        <Footer/>
      </LenisWrapper>
    </main>
  )
}

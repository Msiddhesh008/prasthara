import { motion } from 'framer-motion'
import { ParallaxLayer } from '../components/ParallaxLayer'

export function StoryPage() {
  return (
    <div className="page-story">
      <section className="story-hero section">
        <ParallaxLayer speed={0.2} className="story-hero__texture" />
        <div className="section__inner story-hero__content">
          <p className="eyebrow">Our story</p>
          <h1>What we throw away often still holds value</h1>
          <p className="section__lead">
            Prasthara was born from a simple belief: usable clothes and fabrics
            deserve another chapter.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__inner story-copy">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            While some clothes are no longer wanted but still have plenty of
            life left in them, many usable fabrics — including offcuts from
            tailor shops — are often discarded. We at Prasthara see an
            opportunity to change that.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Through textile thrifting, we help clothes find new homes. Through
            textile upcycling, we transform discarded fabrics into handmade
            products such as aprons, bags, and other useful items.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The name Prasthara means spreading. Through our work, we hope to
            inspire people in making more sustainable choices.
          </motion.p>
        </div>
      </section>

      <section className="section timeline-section">
        <div className="section__inner">
          <p className="eyebrow">Why it matters</p>
          <h2>A second life for textiles</h2>
          <ol className="timeline">
            <li>
              <h3>See value</h3>
              <p>
                Textiles are often discarded long before their potential is fully
                used.
              </p>
            </li>
            <li>
              <h3>Thrift or transform</h3>
              <p>
                Choose a pre-loved garment, or create something new from
                discarded fabric.
              </p>
            </li>
            <li>
              <h3>Spread the practice</h3>
              <p>
                Every new owner and every remade offcut is one less textile
                thrown away.
              </p>
            </li>
          </ol>
        </div>
      </section>
    </div>
  )
}

import React from 'react';
import { motion } from 'framer-motion';
import { TimelineItem } from '../components/Common';

const Strategy = () => {
  return (
    <motion.div
      key="strategy"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h1 style={{ marginBottom: '1.5rem' }}>NetZero 2050 Roadmap</h1>
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3>Strategic Milestones</h3>
        <div style={{ position: 'relative', paddingLeft: '2rem', marginTop: '2rem' }}>
          <div style={{ position: 'absolute', left: 4, top: 0, bottom: 0, width: 2, background: 'var(--glass-border)' }}></div>

          <TimelineItem year="2024" title="Baseline Audit" desc="Complete comprehensive audit of all scope 1, 2, and 3 emissions." status="Complete" />
          <TimelineItem year="2026" title="Energy Transition" desc="Switch 40% of global operations to 100% renewable sources." status="In Progress" />
          <TimelineItem year="2030" title="Supply Chain NetZero" desc="Work with top 200 suppliers to normalize sustainability reporting." status="Scheduled" />
          <TimelineItem year="2045" title="Carbon Neutrality" desc="Achieve operational carbon neutrality across all geographic sites." status="Future" />
        </div>
      </div>
    </motion.div>
  );
};

export default Strategy;

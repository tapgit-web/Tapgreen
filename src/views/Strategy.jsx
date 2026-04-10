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
      <h1 className="mb-15">NetZero 2050 Roadmap</h1>
      <div className="glass-card card-padding-lg mb-2">
        <h3>Strategic Milestones</h3>
        <div className="relative mt-2" style={{ paddingLeft: '2rem' }}>
          <div className="absolute" style={{ left: 4, top: 0, bottom: 0, width: 2, background: 'var(--glass-border)' }}></div>

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

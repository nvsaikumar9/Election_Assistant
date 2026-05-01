'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { motion } from 'framer-motion';
import { UpcomingElection } from '@/data/electionWatch';
import { Language } from '@/data/electionProcess';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const GeoJSON = dynamic(() => import('react-leaflet').then(mod => mod.GeoJSON), { ssr: false });

export function ElectionMap({ ongoing, lang }: { ongoing: UpcomingElection[], lang: Language }) {
  const [geoData, setGeoData] = React.useState<any>(null);

  React.useEffect(() => {
    fetch('https://raw.githubusercontent.com/Subhash9325/GeoJson-Data-of-Indian-States/master/Indian_States')
      .then(res => res.json())
      .then(data => setGeoData(data));
  }, []);

  const ongoingStates = ongoing.map(e => {
    if (e.title.en.includes('West Bengal')) return 'West Bengal';
    if (e.title.en.includes('Kerala')) return 'Kerala';
    if (e.title.en.includes('Tamil Nadu')) return 'Tamil Nadu';
    if (e.title.en.includes('Punjab')) return 'Punjab';
    if (e.title.en.includes('Uttar Pradesh')) return 'Uttar Pradesh';
    return '';
  }).filter(Boolean);

  const style = (feature: any) => {
    const isOngoing = ongoingStates.includes(feature.properties.NAME_1 || feature.properties.st_nm);
    return {
      fillColor: isOngoing ? '#d9372b' : '#ffffff',
      weight: 1,
      opacity: 1,
      color: '#727785',
      fillOpacity: isOngoing ? 0.6 : 0.2,
    };
  };

  return (
    <div className="relative w-full aspect-square md:aspect-auto md:h-[460px] bg-white rounded border border-outline-variant overflow-hidden flex flex-col"
      style={{ boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}
    >
      <div className="flex-1 w-full relative z-0">
        <MapContainer 
          center={[20.5937, 78.9629]} 
          zoom={4} 
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
            attribution='&copy; Google Maps'
          />
          {geoData && (
            <GeoJSON 
              data={geoData} 
              style={style}
              onEachFeature={(feature, layer) => {
                const stateName = feature.properties.NAME_1 || feature.properties.st_nm;
                layer.bindPopup(stateName);
              }}
            />
          )}
        </MapContainer>
        
        <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2 pointer-events-none">
           <div className="ds-chip ds-chip-red shadow-sm border border-secondary-container/20 pointer-events-auto bg-white/90 backdrop-blur">
              <div className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
              <span>{lang === 'en' ? 'Live Ongoing Map' : 'लाइव नक्शा'}</span>
           </div>
        </div>
      </div>

      <div className="p-4 bg-surface-container-low border-t border-outline-variant flex flex-wrap gap-3 z-10">
        <span className="text-[11px] font-bold uppercase tracking-widest text-outline flex items-center">
          Ongoing States:
        </span>
        {ongoing.map(election => (
          <div key={election.id} className="ds-chip ds-chip-red text-[10px]">
             {election.title[lang]}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ElectionTree({ upcoming, lang }: { upcoming: UpcomingElection[], lang: Language }) {
  const years = Array.from(new Set(upcoming.map(u => u.year))).sort();

  return (
    <div className="space-y-10 relative py-6 px-4">
      {/* Vertical Line */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-outline-variant" />

      {years.map((year) => (
        <div key={year} className="relative pl-12">
          {/* Year Node */}
          <div className="absolute left-[18px] top-[2px] w-3 h-3 rounded-full bg-primary-container border-[3px] border-white z-10" />

          <h4 className="text-[24px] font-medium text-on-surface mb-5">{year}</h4>

          <div className="space-y-3">
            {upcoming.filter(u => u.year === year).map((election) => (
              <motion.div
                key={election.id}
                whileHover={{ x: 6 }}
                className="ds-card p-4 flex items-center justify-between group cursor-default"
              >
                <div>
                  <p className="text-[14px] font-medium text-on-surface group-hover:text-primary-container transition-colors">
                    {election.title[lang]}
                  </p>
                  <p className="text-[12px] text-outline mt-1">
                    {election.date[lang]}
                  </p>
                </div>
                <span className={`ds-chip ${
                  election.type === 'General' ? 'ds-chip-blue' :
                  election.type === 'Assembly' ? 'ds-chip-red' :
                  'ds-chip-green'
                }`}>
                  {election.type}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

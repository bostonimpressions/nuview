import React from 'react';
import TextHeading from '@/components/ui/TextHeading';
import List from '@/components/ui/List';

const listItems = [
    {
      heading: [
        {
          _type: 'block',
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              text: 'Threat Complexity',
              marks: [],
            },
          ],
        },
      ],
      body: [
        {
          _type: 'block',
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              text: 'Ransomware, phishing, and identity compromise',
              marks: [],
            },
          ],
        },
      ],
    },
{
  heading: [
    {
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          text: 'Threat Complexity',
          marks: [],
        },
      ],
    },
  ],
    body: [
  {
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        text: 'Ransomware, phishing, and identity compromise',
        marks: [],
      },
    ],
  },
],
},
{
  heading: [
    {
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          text: 'Executive Strategy, Fractional Cost',
          marks: [],
        },
      ],
    },
  ],
    body: [
  {
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        text: 'CIO/CISO insight without full-time overhead. Compliance built in, not bolted on.',
        marks: [],
      },
    ],
  },
],
},
]
function SectionTest() {
  return (

    <section className="p-10">
      <div className="container">
      {/*heading*/}
      <TextHeading level={'h2'}>Client Snapshots</TextHeading>

      <div className="panel w-full bg-perano-200 p-14 mb-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="flex flex-col justify-start">
            <span className="text-sm font-medium text-gray-700 mb-2">About client</span>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Healthcare System</h3>
            <p className="text-gray-800">HIPAA Resilience & Audit Readiness</p>
          </div>

          {/* Right Column */}
          <div>
            <List
              columns={1}
              theme="snapshot"
              items={listItems}
            />
          </div>
        </div>
      </div>

    </div>
  </section>
  );
}

export default SectionTest;
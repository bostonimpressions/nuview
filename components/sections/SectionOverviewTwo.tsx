import React from 'react';
import List from '@/components/ui/List/List';
function SectionOverviewTwo() {
  return (
    <section className="p-10">
      <div className="container">

        {/*grid*/}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">

          <div className="lg:col-span-1">
          </div>

          <div className="lg:col-span-2">
          </div>
        </div>

        {/*list*/}
        <h2>Your challenges may include</h2>
        <List
          theme="flags"
          columns={3}
          items={[
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
                      marks: []
                    }
                  ]
                }
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
                      marks: []
                    }
                  ]
                }
              ]
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
                      marks: []
                    }
                  ]
                }
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
                      marks: []
                    }
                  ]
                }
              ]
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
                      marks: []
                    }
                  ]
                }
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
                      marks: []
                    }
                  ]
                }
              ]
            },
          ]}
        />

      </div>
    </section>
  );
}

export default SectionOverviewTwo;

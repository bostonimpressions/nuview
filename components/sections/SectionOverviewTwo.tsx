import React from 'react';
import List from '@/components/ui/List/List';
import Image from 'next/image';
import TextHeading from '@/components/ui/TextHeading';
function SectionOverviewTwo() {
  return (
    <section className="p-10">
      <div className="container">

        {/*grid*/}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-20 items-center">

          <div className="lg:col-span-1">
            <div className="relative w-full h-auto aspect-[3/2]">
              <Image
                src="/images/services-challenge.png"
                alt="illustration"
                fill
                className="object-contain"
              />
            </div>

          </div>

          <div className="lg:col-span-2">
            <TextHeading level={'h2'}>The Business IT Challenge</TextHeading>
            <div className="body-content">
              <h4>The Landscape Has Changed</h4>
              <p>
                Organizations face mounting compliance requirements, evolving cyber threats, and higher expectations for uptime and efficiency. nuview helps teams stay compliant, secure, and productive without sacrificing performance or predictability.
              </p>
            </div>
          </div>
        </div>

        {/*list*/}
        <h3>Your challenges may include</h3>
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

        <div className="call-to-action mt-8">
          <h3>Our solution</h3>
          <div className="flex bg-sapphire-500 text-white p-10 rounded-lg items-center gap-8">
            <Image src={'/images/icon-check-green.png'} alt={'check'} width={67} height={67}/>

            <p>
              <strong>We embed security, compliance, and reliability</strong> into a single managed ecosystem—so risk decreases while performance and audit readiness increase.
            </p>
          </div>
        </div>

      </div>


    </section>
  );
}

export default SectionOverviewTwo;

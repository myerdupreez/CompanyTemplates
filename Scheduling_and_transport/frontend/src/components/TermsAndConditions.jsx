/**
 * Terms and Conditions Component
 * 
 * Dedicated page for Falcon Bus Service terms and conditions
 */

import { ArrowLeft } from 'lucide-react';

const TermsAndConditions = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 mb-6 hover:text-red-500 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Terms and Conditions
            </h1>
            <p className="text-xl text-gray-300">
              Falcon Bus Service & Beyers Busdiens / Bus Service Amalgamated
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="prose prose-lg max-w-none text-gray-800">
              
              <p className="text-lg mb-8 text-center text-gray-600 bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                Please read and understand our terms and conditions before booking your journey
              </p>

              <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-gray-200 pb-2">1. EXCLUSION OF LIABILITY</h2>
              <p className="mb-3"><strong>1.1.</strong> All persons entering a Falcon Bus Service vehicle under its control do so entirely at their own risk.</p>
              <p className="mb-6"><strong>1.2.</strong> Falcon Bus Service is not liable for any loss or damages (including consequential, special damages or loss of profits), loss of life, bodily injury, or damage to or loss of property of whatsoever nature and howsoever caused, and whether or not caused by Falcon Bus Service, its directors, its employee, agents or any other person acting on behalf of or under the control of Falcon Bus Service arising out of or connected in any way with the transportation or non-transportation by Falcon Bus Service of any passenger or persons and/or their property.</p>

              <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-gray-200 pb-2">2. BOOKING</h2>
              <p className="mb-3"><strong>2.1.</strong> The successful payment is proof of the agreement of transport between Falcon Bus Service, the purchaser of the booking and the passenger (the Parties). These terms and conditions apply to the issue of such booking/s and together constitute the entire agreement between the Parties.</p>
              <p className="mb-3"><strong>2.2.</strong> It is the passengers' responsibility to ensure that the correct information is provided to Falcon Bus Service.</p>
              <p className="mb-6"><strong>2.3.</strong> Bookings are transferrable to another person only if arranged 24 hours and more before departure with Falcon Bus Service.</p>

              <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-gray-200 pb-2">3. TIMETABLES AND SCHEDULES</h2>
              <p className="mb-3"><strong>3.1.</strong> Passengers are requested to be at the applicable terminal or pick-up point 15 minutes before departure. Should a passenger be late for the scheduled departure time, a new ticket will have to be purchased.</p>
              <p className="mb-3"><strong>3.2.</strong> Whilst Falcon Bus Service will make all reasonable efforts to keep to its scheduled timetables, Falcon Bus Service does not guarantee any arrival or departure times, and it does not accept any liability for any loss including consequential loss or damage incurred by any passenger, or inconvenience experienced by any person, due to a delay or cancellation of any service for whatsoever reason.</p>
              <p className="mb-6"><strong>3.3.</strong> Falcon Bus Service reserves the right to cancel any of its services for bona fide reason without prior notice. Falcon Bus Service is not liable for any loss, consequential or otherwise, or damage incurred by passengers because of such cancellation.</p>

              <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-gray-200 pb-2">4. TRANSPORTING OF PASSENGERS</h2>
              <p className="mb-3"><strong>4.1.</strong> No unaccompanied children under the age of 12 years will be transported. Falcon Bus Service reserves the right to refuse the transport of any minor child or person and shall not be held liable for its refusal; Falcon Bus Service is further indemnified against any apparent loss, consequential loss or damages of whatever nature as a result of such a refusal.</p>
              <p className="mb-3"><strong>4.2.</strong> Children will pay the adult fare. Proof of the child's age is required at the time of the booking and boarding the bus.</p>
              <p className="mb-3"><strong>4.3.</strong> Falcon Bus Service reserves the right to refuse to transport sick passengers and pregnant women visibly in their advanced stages of pregnancy (generally 7 months and over).</p>
              <p className="mb-3"><strong>4.4.</strong> Passengers that have a medical condition including a chronic condition must consult their medical practitioner prior to travel. Passengers with any special needs are required to inform Falcon Bus Service during their booking and inform the Falcon Bus Service representative on the day of departure of their specific condition prior to travelling with Falcon Bus Service.</p>
              <p className="mb-3"><strong>4.5.</strong> Passengers with disabilities or in a wheelchair must inform Falcon Bus Service prior to their booking.</p>
              <p className="mb-6"><strong>4.6.</strong> The wearing of seat belts is always compulsory. Adults are to ensure that their children are always secured whilst travelling with Falcon bus service. Falcon Bus Service will not be held liable for any injury, disability or death as a result of any passengers' negligence prior to, during or at the end of a journey.</p>

              <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-gray-200 pb-2">5. CANCELLATION POLICY</h2>
              <p className="mb-2">A booking may be cancelled subject to the following:</p>
              <p className="mb-3"><strong>5.1.</strong> More than 24 hours before departure, a refund or re-schedule is permitted and an R50.00 admin fee applies. Please note that Falcon Bus Services office is closed between 20h00 and 8h00. Any cancellation during that time will not be credited or re-scheduled.</p>
              <p className="mb-3"><strong>5.2.</strong> No refund or rescheduling will be permitted within 24 hours of scheduled departure.</p>
              <p className="mb-3"><strong>5.3.</strong> With any "reschedule", any increase in fare at the time of the re-booking being actioned will also be for the account of the Passenger. Any change to a booking requires a new booking to be issued by Falcon Bus Service and it does not guarantee the availability of a similar booking.</p>
              <p className="mb-3"><strong>5.4.</strong> Once a ticket has been re-scheduled it cannot be rescheduled or cancelled.</p>
              <p className="mb-6"><strong>5.5.</strong> If you are not on the bus at departure time, you forfeit your money.</p>

              <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-gray-200 pb-2">6. LUGGAGE</h2>
              <p className="mb-3"><strong>6.1.</strong> A maximum of 2 item of personal luggage not exceeding total volume of 80cm X 60cm X 30cm in size and total mass not exceeding 30Kg that will be carried in the trailer towed by the bus will be allowed.</p>
              <p className="mb-3"><strong>6.2.</strong> Falcon Bus Service will not be held responsible for any lost or damaged baggage/luggage or any loss of personal items or valuables.</p>
              <p className="mb-6"><strong>6.3.</strong> Baggage/luggage must not include fragile, valuable or perishable items in Checked Baggage. These also include artwork, money, debit/credit cards, jewellery, computers/laptops, personal electronic devices, cellular telephones, photographic equipment, medical equipment, audio and video equipment including, but not limited to, televisions, radios, iPods, GPS equipment, stereo equipment, specialized equipment, crockery, valuable business documents, passports and other identification documents, any keys, dangerous goods, as well as flammable liquid transported in any container.</p>

              <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-gray-200 pb-2">7. PETS</h2>
              <p className="mb-3"><strong>7.1.</strong> Only a trained guide dog that is certified to provide the required service to its owner may be permitted on board within specific guidelines and at Falcon Bus Service's discretion. A certificate may be requested for the guide dog.</p>
              <p className="mb-6"><strong>7.2.</strong> Except for 7.1 above, no pets or animals will be allowed on any Falcon Bus Service bus.</p>

              <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-gray-200 pb-2">8. SMOKING, USE OF DRUGS & ALCOHOL</h2>
              <p className="mb-3"><strong>8.1.</strong> Falcon Bus Service reserves the right to refuse to undertake the conveyance of any passenger/s found to be intoxicated, using drugs or smoking on board. Any passenger may be DENIED boarding should they be deemed as intoxicated or inebriated.</p>
              <p className="mb-6"><strong>8.2.</strong> Any person found in breach of Falcon Bus Service's terms and conditions regarding the consumption of alcohol, use of drugs or smoking will be DISEMBARKED immediately at the NEXT SAFE AREA and no compensation, refund or rescheduling of service requests will be entertained. In addition, should the need arise, legal action may be initiated against the perpetrator that is found in breach of this or any other specified terms and conditions of carriage.</p>

              <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-gray-200 pb-2">9. BREAKDOWNS, DELAYS AND CANCELLATION OF SERVICES</h2>
              <p className="mb-3"><strong>9.1.</strong> No refunds will be paid in the event of a breakdown or a delay.</p>
              <p className="mb-3"><strong>9.2.</strong> In the event of a breakdown or delay Falcon Bus Service will not be held liable for connecting services, scheduled meetings, free refreshments, accommodation or any form of transportation or compensation.</p>
              <p className="mb-3"><strong>9.3.</strong> Services may be cancelled due to adverse operational conditions including but not limited to force majeure, man-made impediments including strike action or mass looting, etc.</p>
              <p className="mb-3"><strong>9.4.</strong> No refunds will be issued if a service is cancelled due to weather or any adverse conditions that are beyond Falcon Bus Service's control.</p>
              <p className="mb-3"><strong>9.5.</strong> All passengers will be rebooked for an alternative date and time as per the passenger's request.</p>
              <p className="mb-6"><strong>9.6.</strong> Falcon Bus Service reserves the right to shuttle passengers between stops.</p>

              <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-gray-200 pb-2">10. INSURANCE</h2>
              <p className="mb-6"><strong>10.1.</strong> Falcon Bus Service does not offer general insurance cover for its passengers, their property or luggage. It is the responsibility of the passenger to ensure that he/she is adequately insured.</p>

              <h2 className="text-2xl font-bold text-black mb-4 border-b-2 border-gray-200 pb-2">11. GENERAL</h2>
              <p className="mb-3"><strong>11.1.</strong> Falcon Bus Service does not provide specific seating or guarantee sitting together in a case of more than one passenger. The right of admission is reserved.</p>
              <p className="mb-3"><strong>11.2.</strong> Fares are subject to change without prior notice from Falcon Bus Service.</p>
              <p className="mb-3"><strong>11.3.</strong> Should you have a complaint concerning Falcon Bus Service, you should inform Falcon Bus Service as soon as possible within 7 days of the incident. Falcon Bus Service will not consider any complaints after 7 days. Any complaints should be emailed to falconbusservice@gmail.com</p>
              <p className="mb-3"><strong>11.4.</strong> Falcon Bus Service reserves the right to inspect luggage, goods, packages and parcels of any passenger. Falcon Bus Service reserves the right to refuse to transport or continue to transport, any passenger/s or their luggage or goods for a bona fide reason.</p>
              <p className="mb-8"><strong>11.5.</strong> The terms and conditions as detailed in the conditions of carriage shall be severable of each other. Should any of these terms and conditions be found to be invalid, the said term or condition shall not affect the validity of the remaining or any other terms and conditions of carriage.</p>

              <div className="bg-gradient-to-r from-black to-gray-900 text-white p-6 rounded-lg text-center mb-8">
                <p className="font-bold text-lg mb-2">FOR ANY QUERIES, PLEASE CONTACT FALCON BUS SERVICE AT:</p>
                <p className="text-xl text-red-500">falconbusservice@gmail.com / 064 686 6963</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;

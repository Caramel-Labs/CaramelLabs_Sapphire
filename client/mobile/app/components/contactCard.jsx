import Image from 'next/image';

export default function ContactCard({ telephone, web, email }) {
  return (
    <div className="w-[328px] mx-auto text-gray-900 ">
      <h2 className="text-base font-semibold mb-4">Get in Touch</h2>

      {/* Telephone and Web Sections Side by Side */}
      <div className="flex justify-between mb-4">
        <div>
          <p className="text-xs font-semibold text-black">Telephone</p>
          <p className="text-xs">{telephone}</p>
        </div>

        <div className="ml-[57px]">
          <p className="text-xs font-semibold text-black">Web</p>
          <p className="text-xs">{web}</p>
        </div>
      </div>


      {/* Email Section */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-black">Email</p>
        <p className="text-xs">{email}</p>
      </div>

      

      {/* Image Section */}
      <div className="mt-4 flex justify-center">
        <Image 
          src="/images/headerImg.png" 
          alt="contact" 
          width={328} 
          height={200} 
          className="rounded-lg object-cover"
        />
        
      </div>
      
    </div>
  );
}
